// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

/**
* NFT合约。
*/
contract ERC20Demo is ERC20, Ownable {

    /// @notice 构造函数
    /// @param _totalAmount 总铸币数
    constructor(uint256 _totalAmount) ERC20("MyERC20Demo", "erc20 token demo"){
        _mint(msg.sender, _totalAmount);
    }
}