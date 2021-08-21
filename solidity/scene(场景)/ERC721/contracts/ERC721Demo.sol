// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

/**
* NFT合约。
*/
contract ERC721Demo is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private tokenIdCounter;//自增的拍卖单id

    constructor() ERC721("MyToken", "token of my"){}

    /// @notice 转让NFT给指定用户
    /// @param _receiver 接收者
    /// @param _tokenId 被转让的NFT编号
    function safeTransfer(address _receiver, uint256 _tokenId) public {
        safeTransferFrom(msg.sender, _receiver, _tokenId);
    }

    /// @notice 产生新的NFT给指定用户
    /// @return _tokenId 返回新NFT的id
    function mint(address _to) public onlyOwner returns (uint256 _tokenId){
        uint256 tokenId = _nextId();
        console.log("tokenId:%s", tokenId);
        _mint(_to, tokenId);
        return tokenId;
    }

    /// @notice id累加
    /// @return _newId 返回新的id
    function _nextId() private returns (uint256 _newId){
        tokenIdCounter.increment();
        return tokenIdCounter.current();
    }

    /// @notice 获取根NFT路径
    function _baseURI() internal view override returns (string memory) {
        return "https://creatures-api.opensea.io/api/creature/";
    }
}