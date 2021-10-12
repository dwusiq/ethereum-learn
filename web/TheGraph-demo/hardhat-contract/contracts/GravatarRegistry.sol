// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract GravatarRegistry {
    event NewGravatar(
        uint256 id,
        address owner,
        string displayName,
        string imageUrl
    );
    event UpdatedGravatar(
        uint256 id,
        address owner,
        string displayName,
        string imageUrl
    );

    struct Gravatar {
        address owner;
        string displayName;
        string imageUrl;
    }

    Gravatar[] public gravatars;

    mapping(uint256 => address) public gravatarToOwner;
    mapping(address => uint256) public ownerToGravatar;

    function createGravatar(string memory _displayName, string memory _imageUrl)
        public
    {
        require(ownerToGravatar[msg.sender] == 0);
        gravatars.push(Gravatar(msg.sender, _displayName, _imageUrl));

        uint256 id = gravatars.length-1;
        gravatarToOwner[id] = msg.sender;
        ownerToGravatar[msg.sender] = id;

        emit NewGravatar(id, msg.sender, _displayName, _imageUrl);
    }

    function updateGravatarName(string memory _displayName) public {
        require(msg.sender == gravatars[ownerToGravatar[msg.sender]].owner,"just support up by owner");

        uint256 id = ownerToGravatar[msg.sender];

        gravatars[id].displayName = _displayName;
        emit UpdatedGravatar(
            id,
            msg.sender,
            _displayName,
            gravatars[id].imageUrl
        );
    }
}
