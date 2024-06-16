pragma solidity ^0.8.24;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

// helper methods for interacting with ERC20 tokens and sending ETH that do not consistently return true/false
library TransferHelper {
    function safeApprove(address token, address to, uint value) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSelector(0x095ea7b3, to, value)
        );
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            "TransferHelper: APPROVE_FAILED"
        );
    }

    function safeTransfer(address token, address to, uint value) internal {
        // bytes4(keccak256(bytes('transfer(address,uint256)')));
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSelector(0xa9059cbb, to, value)
        );
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            "TransferHelper: TRANSFER_FAILED"
        );
    }

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint value
    ) internal {
        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSelector(0x23b872dd, from, to, value)
        );
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            "TransferHelper: TRANSFER_FROM_FAILED"
        );
    }

    function safeTransferETH(address to, uint value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, "TransferHelper: ETH_TRANSFER_FAILED");
    }
}

contract TokenTransferBatch is Ownable(msg.sender), ReentrancyGuard {
    address public permitSender;

    constructor(address _permitSender) {
        permitSender = _permitSender;
    }

    /**
     * @notice Transfer a specified number of tokens to the user list
     * @param _token Token address
     * @param _amounts The amount transfer to the user list
     * @param _receivers Transfer tokens to these user wallets
     */
    function batchTransfer(
        address _token,
        address[] memory _receivers,
        uint256[] memory _amounts
    ) external nonReentrant {
        require(msg.sender == permitSender, "Require permit");
        require(_receivers.length > 0, "Users empty");
        for (uint256 i = 0; i < _receivers.length; i++) {
            TransferHelper.safeTransfer(_token, _receivers[i], _amounts[i]);
        }
    }

    /**
     * @notice Transfer a specified number of tokens to the user list
     * @param _token Token address
     * @param _amount The amount transfer to the user list
     * @param _users Transfer tokens to these user wallets
     */
    function batchTransferSameAmount(
        address _token,
        uint256 _amount,
        address[] memory _users
    ) external nonReentrant {
        require(msg.sender == permitSender, "Require permit");
        require(_users.length > 0, "users empty");
        require(_amount > 0, "check amount");
        for (uint256 i = 0; i < _users.length; i++) {
            TransferHelper.safeTransfer(_token, _users[i], _amount);
        }
    }

    /**
     * @notice Send different amounts of ETH to each user
     * @param _amounts All users will receive the difference amount of  eth
     * @param _users These users will receive ETH
     */
    function batchTransferEth(
        address[] memory _users,
        uint256[] memory _amounts
    ) external payable nonReentrant {
        require(msg.sender == permitSender, "Require permit");
        require(_users.length == _users.length, "Size no match");
        for (uint256 i = 0; i < _users.length; i++) {
            TransferHelper.safeTransferETH(_users[i], _amounts[i]);
        }
    }

    /**
     * @notice Send the same amount of ETH to all users
     * @param _amount All users will receive the same amount
     * @param _users These users will receive ETH
     */
    function batchTransferSameAmountEth(
        uint256 _amount,
        address[] memory _users
    ) external payable nonReentrant {
        require(msg.sender == permitSender, "Require permit");
        require(_users.length > 0, "users empty");
        require(_amount > 0, "check amount");
        for (uint256 i = 0; i < _users.length; i++)
            TransferHelper.safeTransferETH(_users[i], _amount);
    }

    /**
     * @notice Someone transferred tokens by mistake, and the owner can withdraw them
     * @param _token The token that needs to be transferred. If it is addressZero, then ETH is required.
     * @param _amount Transfer amount
     */
    function withdrawToken(
        address _token,
        uint256 _amount,
        address _receiver
    ) external onlyOwner nonReentrant {
        if (address(0) == _token) {
            TransferHelper.safeTransferETH(_receiver, _amount);
        } else {
            TransferHelper.safeTransfer(_token, _receiver, _amount);
        }
    }

    /**
     * @notice Change sender
     * @param _sender new sender
     */
    function setSender(address _sender) external onlyOwner {
        permitSender = _sender;
    }

    receive() external payable {}
}
