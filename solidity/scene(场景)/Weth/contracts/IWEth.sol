// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

/***
* WEth 使ETH可以像ERC20代币一样使用。
*/
interface IWEth{
    function deposit() external payable;
    function withdraw(uint wad) external;
    function transfer(address to, uint256 value) external returns (bool);
}