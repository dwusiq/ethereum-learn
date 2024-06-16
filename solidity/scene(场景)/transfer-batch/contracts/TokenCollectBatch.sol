pragma solidity ^0.8.24;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

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

contract TokenCollectBatch is Ownable(msg.sender), ReentrancyGuard {
    address public receiver;

    constructor(address _receiver) {
        receiver = _receiver;
    }

    /**
     * @notice Transfer a specified number of tokens from the user list
     * @param _token Token address
     * @param _amounts The amount corresponding to the user list
     * @param _users Transfer tokens from these user wallets
     */
    function batchTransferFrom(
        address _token,
        address[] memory _users,
        uint256[] memory _amounts
    ) external nonReentrant {
        require(_users.length == _users.length, "Size no match");
        for (uint256 i = 0; i < _users.length; i++) {
            TransferHelper.safeTransferFrom(
                _token,
                _users[i],
                receiver,
                _amounts[i]
            );
        }
    }

    /**
     * @notice Query balance
     * @param _token Token address
     * @param _users Address list
     */
    function getBalanceBatch(
        address _token,
        address[] memory _users
    ) external view returns (uint256[] memory balanceList_) {
        require(_users.length > 0, "Size zero");

        balanceList_ = new uint256[](_users.length);
        for (uint256 i = 0; i < _users.length; i++)
            balanceList_[i] = IERC20(_token).balanceOf(_users[i]);
    }

    /**
     * @notice Someone transferred tokens by mistake, and the owner can withdraw them
     * @param _token The token that needs to be transferred. If it is addressZero, then ETH is required.
     * @param _amount Transfer amount
     */
    function withdrawToken(
        address _token,
        uint256 _amount
    ) external onlyOwner nonReentrant {
        if (address(0) == _token) {
            TransferHelper.safeTransferETH(receiver, _amount);
        } else {
            TransferHelper.safeTransfer(_token, receiver, _amount);
        }
    }


        /**
     * @notice Change receiver
     * @param _receiver new receiver
     */
    function setReceiver(address _receiver) external onlyOwner {
        receiver = _receiver;
    }

}
