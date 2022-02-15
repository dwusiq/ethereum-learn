// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

//预售平台合约
contract PresaleMarket {
    uint256 public percentDec = 10000; //价格精度（分母）
    address public developer; //开发者地址，用于预售收款

    //预售期信息
    struct PresaleTerm {
        address payToken; //用户购买债券需要支付的token
        address saleToken; //本期售卖的token
        address salePrice; //saleToken的价格，分母是10000,如：2500表示0.25。（购买presaleToken的步骤：1、支付份额由payout精度转为saleToken精度；2、转换精度后的份额/(salePrice/percentDec)）
        uint256 plannedSalesAmount; //计划销售的saleToken份额
        uint256 soldAmount; //已销售的saleToken份额
        uint256 startBlock; //预售开始区块
        uint256 finishTimestamp; //计划预售结束时间戳
    }

    mapping(uint256 => PresaleTerm) public PresaleTermInfo;

    /**
     * @notice 购买presaleToken
     * @param _payAmount 本次购买花费的份额
     */
    function purchasea(uint256 _termId, uint256 _payAmount) external {
        //TODO 条件判断

        uint256 payout = payoutFor(_termId, _payAmount);
        uint256 payoutWithSaleTokenDecimal = toSaleTokenDecimal(
            _termId,
            payout
        );

        //扣除用户费用
        IERC20(PresaleTermInfo[_termId].payToken).transferFrom(
            msg.sender,
            developer,
            _payAmount
        );

        //铸币presaleToken
        IERC20(PresaleTermInfo[_termId].saleToken).mint(
            msg.sender,
            payoutWithSaleTokenDecimal
        );
    }

    /**
     * @notice 根据支付份额，计算能得到多少saleToken份额
     * @param _termId 预售期编号
     * @param _payValue 支付的份额
     * @return payout_ 合约应付份额
     */
    function payoutFor(uint256 _termId, uint256 _payAmount)
        public
        view
        returns (uint256 payout_)
    {
        uint256 salePrice = PresaleTermInfo[_termId].salePrice;
        payout_ = _payAmount.mul(percentDec).div(salePrice);
    }

    /**
     * @notice 指定预售期，将支付份额转为saleToken精度的份额
     * @param _termId 预售期编号
     * @param _payAmount 支付的份额
     */
    function toSaleTokenDecimal(uint256 _termId, uint256 _payAmount)
        public
        view
        returns (uint256 value_)
    {
        //1单位saleToken字面数值/1单位payToken字面数值 = saleToken精度/payToken精度 = 10**IERC20(saleToken).decimals()/10**IERC20(_token).decimals()
        //例如，saleToken精度9，payToken精度18，则1单位saleToken字面数值/1单位payToken字面数值=1e9/1e18=1/1e9, 如果payToken的amount是10*1e18,则相对应saleToken的份额=10*1e18 * 1/1e9=10*1e9;
        address saleToken = PresaleTermInfo[_termId].saleToken;
        address payToken = PresaleTermInfo[_termId].payToken;
        value_ = _amount.mul(10**IERC20(saleToken).decimals()).div(
            10**IERC20(payToken).decimals()
        );
    }
}
