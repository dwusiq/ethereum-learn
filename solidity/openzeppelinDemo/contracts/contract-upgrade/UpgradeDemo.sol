// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

//由于不能有构造函数，因此用一个外部函数来初始化合约，Initializable用于限制函数只能被调用一次
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol"; 

//可升级合约案例
//注意点一：不能有构造函数，另外定义一个其它函数来初始化合约,并且要控制这个函数只能被调用一次
//注意点二：可升级的合约，不能在定义存储变量的同时初始化。因为这样相当于构造函数初始化
//注意点三：虽然不可以在定义存储时初始化，但却可以在定义常量时直接初始化（constant 修饰的存储变量）
contract UpgradeDemo is Initializable {
    uint256 public value;
    address public owner;

    /// 因为未初始化的合约易被黑客攻击，因此定义一个构造函数并在合约初始化后直接标志为不能再调用(我们初始化合约时不调这个函数)
    // constructor() initializer {}

    //该函数替代构造函数用于初始化合约，默认initialize，但可改用其它名字，在部署时指明就可以
    function initialize(uint256 _defaultValue) public initializer {
        owner = msg.sender;
        value = _defaultValue;
    }

    function changeValue(uint256 _newValue) public {
        value = _newValue;
    }
}
