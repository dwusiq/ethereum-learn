// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

//由于不能有构造函数，因此用一个外部函数来初始化合约，Initializable用于限制函数只能被调用一次
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

//升级版合约案例
//关注点一：升级版合约可以新增或移除函数
//关注点二：升级版合约不能变更存储的个数
//关注点三：升级后原来的合约已销毁
contract UpgradeDemoV2 is Initializable {
    uint256 public value;
    address public owner;

    //该函数替代构造函数用于初始化合约，默认initialize，但可改用其它名字，在部署时指明就可以
    function initialize(uint256 _defaultValue) public initializer {
        owner = msg.sender;
        value = _defaultValue;
    }

    function changeValue(uint256 _newValue) public {
        value = _newValue;
    }

    function add(uint256 _value) public {
        value += _value;
    }
}
