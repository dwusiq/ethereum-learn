// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

import "./PresaleToken.sol";
import "./dependency/TransferHelper.sol";

//预售平台合约
contract PresaleMarket is Ownable {
    using SafeMath for uint256;
    using Address for address;
    using Counters for Counters.Counter;
    Counters.Counter private termIdTracker; //预售期跟踪器

    uint256 public percentDec = 10000; //价格精度（分母）
    address public developer; //开发者地址，用于预售收款

    //预售期信息
    struct PresaleTerm {
        bool termActive; //预售期是否存活  true:预售中  false:无效预售期编号或预售结束
        address payToken; //用户购买债券需要支付的token
        address saleToken; //本期售卖的token
        uint256 salePrice; //saleToken的价格，分母是10000,如：2500表示0.25, 250000表示25。（购买presaleToken的步骤：1、支付份额由payout精度转为saleToken精度；2、转换精度后的份额/(salePrice/percentDec)）
        uint256 plannedSalesAmount; //计划销售的saleToken份额
        uint256 soldAmount; //已销售的saleToken份额
        uint256 startTimestamp; //预售开始时间戳
        uint256 finishTimestamp; //计划预售截止时间戳
    }

    mapping(uint256 => PresaleTerm) public PresaleTermInfo; //预售期详细信息
    mapping(uint256 => mapping(address => uint256)) public TermUserReward; //地址在指定预售期的购买saleToken份额 mapping(termId => mapping(address => saleTokenAmount))

    //事件
    event Purchase(
        uint256 indexed _termId,
        address indexed _payAddress,
        uint256 indexed _payAmount,
        uint256 _rewardAmount
    );
    event AddPresaleTerm(
        address indexed _sender,
        address indexed _payToken,
        address indexed _saleToken,
        uint256 _salePrice,
        uint256 _plannedSalesAmount,
        uint256 _startTimestamp,
        uint256 _finishTimestamp
    );
    event SetDeveloper(
        address indexed _sender,
        address indexed _oldDevelover,
        address indexed _newDeveloper
    );
    event CloseTerm(address indexed _sender, uint256 indexed _termId);
    event SetTerm(
        address indexed _sender,
        uint256 indexed _termId,
        uint256 indexed _salePrice,
        uint256 _plannedSalesAmount,
        uint256 _finishTimestamp
    );

    /**
     * @notice 构造函数
     * @param _developer 开发者地址，用于接收预售付款
     */
    constructor(address _developer) {
        require(address(0) != _developer, "check developer address");
        developer = _developer;
    }

    /**
     * @notice 发布预售期(同一时刻，只能存在一个预售中的合约)
     * @param _payToken 本期预售接收token
     * @param _saleToken 本期预售token
     * @param _salePrice 本期预售价格
     * @param _plannedSalesAmount 本次预售计划售卖saleToken总额
     * @param _startTimestamp 本次预售开始时间
     * @param _finishTimestamp 本次预售截止时间
     */
    function addPresaleTerm(
        address _payToken,
        address _saleToken,
        uint256 _salePrice,
        uint256 _plannedSalesAmount,
        uint256 _startTimestamp,
        uint256 _finishTimestamp
    ) external onlyOwner {
        uint256 _termId = termIdTracker.current();
        require(!PresaleTermInfo[_termId].termActive, "term is active");
        termIdTracker.increment();
        //添加新的预售期信息
        _termId = termIdTracker.current();
        PresaleTermInfo[_termId] = PresaleTerm({
            termActive: true,
            payToken: _payToken,
            saleToken: _saleToken,
            salePrice: _salePrice,
            plannedSalesAmount: _plannedSalesAmount,
            soldAmount: 0,
            startTimestamp: _startTimestamp,
            finishTimestamp: _finishTimestamp
        });

        emit AddPresaleTerm(
            msg.sender,
            _payToken,
            _saleToken,
            _salePrice,
            _plannedSalesAmount,
            _startTimestamp,
            _finishTimestamp
        );
    }

    /**
     * @notice 变更已发布的预售信息
     * @param _termId 预售期编号
     * @param _salePrice 本期预售价格
     * @param _plannedSalesAmount 本次预售计划售卖saleToken总额
     * @param _finishTimestamp 本次预售截止时间
     */
    function setTerm(
        uint256 _termId,
        uint256 _salePrice,
        uint256 _plannedSalesAmount,
        uint256 _finishTimestamp
    ) external onlyOwner {
        require(PresaleTermInfo[_termId].termActive, "term not active");
        PresaleTermInfo[_termId].salePrice = _salePrice;
        PresaleTermInfo[_termId].plannedSalesAmount = _plannedSalesAmount;
        PresaleTermInfo[_termId].finishTimestamp = _finishTimestamp;
        emit SetTerm(
            msg.sender,
            _termId,
            _salePrice,
            _plannedSalesAmount,
            _finishTimestamp
        );
    }

    /**
     * @notice 结束指定预售期
     * @param _termId 预售期编号
     */
    function closeTerm(uint256 _termId) external onlyOwner {
        require(PresaleTermInfo[_termId].termActive, "term not active");
        PresaleTermInfo[_termId].termActive = false;
        emit CloseTerm(msg.sender, _termId);
    }

    /**
     * @notice 购买presaleToken
     * @param _payAmount 本次购买花费的份额
     */
    function purchasea(uint256 _payAmount) external {
        //当前预售期信息
        uint256 _termId = termIdTracker.current();
        PresaleTerm memory term = PresaleTermInfo[_termId];
        //条件判断
        require(_payAmount > 0, "_payAmount too minimum");
        require(term.termActive, "term finished or invalid termId");
        require(
            block.timestamp > term.startTimestamp,
            "term has not yet start"
        );
        require(block.timestamp < term.finishTimestamp, "term finished");

        //将用户支付份额转为saleToken精度值
        uint256 payAmountWithSaleTokenDecimal = toSaleTokenDecimal(_payAmount);
        //根据购买份额计算用户应得份额
        uint256 rewardAmount = payoutFor(payAmountWithSaleTokenDecimal);

        //要求总售额不得超过计划销售份额
        uint256 totalSoldAmount = term.soldAmount.add(rewardAmount);
        require(
            term.plannedSalesAmount > totalSoldAmount,
            "totalSoldAmount bigger than plannedSalesAmount"
        );
        term.soldAmount = totalSoldAmount;

        //扣除用户费用
        TransferHelper.safeTransferFrom(
            term.payToken,
            msg.sender,
            developer,
            _payAmount
        );

        //铸币presaleToken
        PresaleToken(term.saleToken).mint(msg.sender, rewardAmount);

        //记录用户当期购买份额
        uint256 userRewardTotal = TermUserReward[_termId][msg.sender];
        TermUserReward[_termId][msg.sender] = userRewardTotal.add(rewardAmount);

        emit Purchase(_termId, msg.sender, _payAmount, rewardAmount);
    }

    /**
     * @notice 根据支付份额，计算能得到多少saleToken份额
     * @param _payAmount 支付的份额
     * @return payout_ 合约应付份额
     */
    function payoutFor(uint256 _payAmount)
        public
        view
        returns (uint256 payout_)
    {
        //当前预售期信息
        uint256 _termId = termIdTracker.current();
        uint256 salePrice = PresaleTermInfo[_termId].salePrice;
        payout_ = _payAmount.mul(percentDec).div(salePrice);
    }

    /**
     * @notice 指定预售期，将支付份额转为saleToken精度的份额
     * @param _payAmount 支付的份额
     */
    function toSaleTokenDecimal(uint256 _payAmount)
        public
        view
        returns (uint256 value_)
    {
        //当前预售期信息
        uint256 _termId = termIdTracker.current();
        //1单位saleToken字面数值/1单位payToken字面数值 = saleToken精度/payToken精度 = 10**IERC20(saleToken).decimals()/10**IERC20(_token).decimals()
        //例如，saleToken精度9，payToken精度18，则1单位saleToken字面数值/1单位payToken字面数值=1e9/1e18=1/1e9, 如果payToken的amount是10*1e18,则相对应saleToken的份额=10*1e18 * 1/1e9=10*1e9;
        address saleToken = PresaleTermInfo[_termId].saleToken;
        address payToken = PresaleTermInfo[_termId].payToken;
        value_ = _payAmount.mul(10**IERC20Metadata(saleToken).decimals()).div(
            10**IERC20Metadata(payToken).decimals()
        );
    }

    /**
     * @notice 变更开发者地址
     * @param _developer 新开发者地址
     */
    function setDeveloper(address _developer) external onlyOwner {
        address oldDeveloper = developer;
        developer = _developer;
        emit SetDeveloper(msg.sender, oldDeveloper, _developer);
    }

    /**
     * @notice 查询当前预售期编号（有效编号从1开始）
     * @return termId_ 返回当前预售期编号
     */
    function getCurrentTermId() external returns (uint256 termId_) {
        return termIdTracker.current();
    }
}
