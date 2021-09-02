const { expect } = require("chai");

function getEventByName(events, eventName) {
    for (const i = 0; i < events.length; i++) {
        const event = events[i];
        if (eventName == event.event) {
            return event;
        }
    }
}


describe("EventDemo test", function () {
    it("deploy EventDemo and test function", async function () {

        //测试参数
        const value = 111;

        //部署EventDemo.sol
        const EventDemo = await ethers.getContractFactory("EventDemo");
        const eventDemo = await EventDemo.deploy();
        await eventDemo.deployed();

        //打印合约地址
        console.log("eventDemo address：", eventDemo.address);

        //打印日志
        const changeTransaction = await eventDemo.change(value);
        const transactionReceipt = await changeTransaction.wait();
        //参考一：简单粗暴，直接从交易回执解析出日志
        const changeCallEvent = getEventByName(transactionReceipt.events, "changeCall");

        const senderAddress = changeCallEvent.args[0].toString();
        const _value = changeCallEvent.args[1];
        console.log("senderAddress:", senderAddress);
        console.log("_value:", _value);


        //参考二:https://learnblockchain.cn/docs/ethers.js/api-contract.html#contract-filter
        //监听方法一：监听从0到当前最新区块的事件
        eventDemo.queryFilter(eventDemo.filters.changeCall(), 0, 'latest')
            .then(rsp => {
                console.log("ether =====all event count:", rsp.length);
            })
            .catch(err => console.error("error:", err));

        //校验
        expect(value).to.equal(_value);
    });
});