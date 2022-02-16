// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

/**
 * ERC20USDT合约。
 */
contract ERC20USDT is ERC20, Ownable {
    /// @notice 构造函数
    constructor() ERC20("USD Token", "USDT") {}
}
