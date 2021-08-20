// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./IWEth.sol";

import "hardhat/console.sol";
/***
* 通过拍卖合约简单的验证WETH的可用性。此合约没有严谨的安全控制，不能直接拿来生产使用。
*/
contract Market {

    struct Token {
        address owner;
        address bidder;
    }

    address public wEthAddress;//WEth合约地址
    mapping(address => uint256)public Balances;//map<userAddress,balance>
    mapping(uint256 => Token)public Tokens;//map<tokenId,Token>
    mapping(address => uint256)public bids;//map<bidder,tokenId> 用有户意向购买的token(只支持竞价一个token)

    IWEth private WEth;


    /// @notice 构造函数
    /// @param _wEthAddress WEth合约地址
    constructor(address _wEthAddress){
        WEth=IWEth(_wEthAddress);
    }

    /// @notice 添加token
    /// @param _tokenId token编号
    function addToken(uint256 _tokenId) public {
        require(Tokens[_tokenId].owner == address(0), "token already exist");
        Tokens[_tokenId].owner = msg.sender;
    }


    /// @notice 竞价
    /// @param _tokenId 想购买的token
    function bid(uint256 _tokenId) public payable{
        console.log("bid input value===%s",msg.value);
        require(Tokens[_tokenId].owner != address(0), "token not exist");
        require(bids[msg.sender] == 0, "you had already bid a token");
        require(msg.value > 0, "value can not be '0'");

        Balances[msg.sender] += msg.value;
        bids[msg.sender] = _tokenId;
        Tokens[_tokenId].bidder = msg.sender;
        //存入WEth合约
//        WEth.deposit{value : msg.value}();
    }


    /// @notice 取消竞价
    /// @param _tokenId 对应的tokenId
    function cancelBid(uint256 _tokenId) public {
        require(bids[msg.sender] > 0, "you had not bid this token");
        //从wEth退回eth
//        WEth.withdraw(Balances[msg.sender]);
        delete Tokens[_tokenId].bidder;
        delete Balances[msg.sender];
        delete bids[msg.sender];
    }

    /// @notice 接受买方的竞价
    /// @param _tokenId 对应的tokenId
    function accept(uint256 _tokenId) public {
        require(Tokens[_tokenId].owner == msg.sender, "just support owner accept");
        require(Tokens[_tokenId].bidder != address(0), "not found bidder");

        //转让eth
//        WEth.transfer(Tokens[_tokenId].bidder,Balances[msg.sender],Balances[Tokens[_tokenId].bidder]);
        //转让token
        Tokens[_tokenId].owner == Tokens[_tokenId].bidder;
        delete Tokens[_tokenId].bidder;
        delete bids[Tokens[_tokenId].bidder];
        delete Balances[Tokens[_tokenId].bidder];
    }

    receive() external payable {}
    fallback() external payable {}
}