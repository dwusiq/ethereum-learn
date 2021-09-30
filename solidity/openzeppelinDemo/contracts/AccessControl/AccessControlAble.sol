// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

//@brief 权限控制合约
contract AccessControlAble is AccessControlEnumerable {
    //角色  权限范围：OWNER_ROLE>MANAGER_ROLE
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE"); //合约拥有者(管理非业务相关-如变更合约拥有者、变更管理员)
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE"); //合约管理员(管理业务相关-如手续费相关配置、铸币等)
    bytes32[] rolesForOwner = [OWNER_ROLE]; //赋给合约拥有者的角色

    modifier onlyOwner() {
        require(hasRole(OWNER_ROLE, _msgSender()), "Caller is not the owner");
        _;
    }

    modifier onlyManager() {
        require(
            hasRole(MANAGER_ROLE, _msgSender()),
            "Caller is not the manager"
        );
        _;
    }

    modifier ownerOrManager() {
        bool isOwner = hasRole(OWNER_ROLE, _msgSender());
        bool isManager = hasRole(MANAGER_ROLE, _msgSender());
        require(isOwner || isManager, "Caller is not the manager nor owner");
        _;
    }

    //@brief 构造函数
    //@param _managerAddress  管理员账户地址
    constructor(address _managerAddress) {
        //添加用户的默认角色
        _setupRole(MANAGER_ROLE, _managerAddress);
        //设置各角色的管理员
        _initRoleAdmin();
        //给owner添加相关角色
        _initOwnerRoles(_msgSender());
    }

    //@brief 添加管理员
    //@param _users 新增用户
    function addManager(address _users) public onlyOwner {
        require(
            !hasRole(MANAGER_ROLE, _users),
            "The same address cannot be added"
        );
        _checkNewAddress(_users);

        grantRole(MANAGER_ROLE, _users);
    }

    //@brief 将某个用户移出管理员列表
    //@param _user 被移除的用户
    function removeManager(address _user) public onlyOwner {
        require(hasRole(MANAGER_ROLE, _user), "The address was not found");
        // require(
        //     getRoleMemberCount(MANAGER_ROLE) > 1,
        //     "cannot delete the last administrator"
        // );
        revokeRole(MANAGER_ROLE, _user);
    }

    //@brief 更改合约拥有者
    //@param _newOwner 新的合约拥有者
    function changeOwner(address _newOwner) public onlyOwner {
        address oldOwner = _msgSender();
        require(_newOwner != oldOwner, "This is an owner");
        //检查新地址
        _checkNewAddress(_newOwner);
        //给新owner添加相关角色
        _initOwnerRoles(_newOwner);
        //移除旧管理员的角色
        _removeAllRolesOfOldOwner(oldOwner);
    }

    //@brief
    //@param _newOwner 新的合约拥有者
    function _checkNewAddress(address addr) internal pure {
        require(address(0) != addr, "Zero address is not supported");
    }

    //@brief 初始化各个角色的管理员
    function _initRoleAdmin() private {
        //设置"管理员角色"的管理员
        _setRoleAdmin(MANAGER_ROLE, OWNER_ROLE);
    }

    //@brief 给owner添加相关角色
    function _initOwnerRoles(address _owner) private {
        for (uint256 i = 0; i < rolesForOwner.length; i++)
            _setupRole(rolesForOwner[i], _owner);
    }

    //@brief 移除旧owner用户的所有角色(只能移除调用者自己的角色)
    function _removeAllRolesOfOldOwner(address _owner) private {
        for (uint256 i = 0; i < rolesForOwner.length; i++)
            renounceRole(rolesForOwner[i], _owner);
    }
}
