const { expect } = require("chai");

function getEventByName(events, eventName) {
    for (const i = 0; i < events.length; i++) {
        const event = events[i];
        if (eventName == event.event) {
            return event;
        }
    }
}

let owner;
let deployEventDemo;

describe("EventDemo test", function () {

    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        console.log(">>> owner address:%s", owner.address);

        //部署EventDemo.sol
        const EventDemo = await ethers.getContractFactory("EventDemo");
        deployEventDemo = await EventDemo.deploy();
        await deployEventDemo.deployed();
        console.log(">>> deployEventDemo address:%s", deployEventDemo.address);

    });

    it(">>>>>> event emit test", async function () {
        //测试参数
        const value = 111;

        //事件验证
        await expect(deployEventDemo.change(value))
            .to.emit(deployEventDemo, 'changeCall')
            .withArgs(owner.address, value);
    });

    it(">>>>>> event filter test", async function () {
        //测试参数
        const value = 111;

        //打印日志
        const changeTransaction = await deployEventDemo.change(value);
        const transactionReceipt = await changeTransaction.wait();

        //事件获取方案一：简单粗暴，直接从交易回执解析出日志
        const changeCallEvent = getEventByName(transactionReceipt.events, "changeCall");

        const senderAddress = changeCallEvent.args[0].toString();
        const _value = changeCallEvent.args[1];
        console.log("senderAddress:", senderAddress);
        console.log("_value:", _value);


        //事件获取方案二：https://learnblockchain.cn/docs/ethers.js/api-contract.html#contract-filter
        //监听方法一：监听从0到当前最新区块的事件
        deployEventDemo.queryFilter(deployEventDemo.filters.changeCall(), 0, 'latest')
            .then(rsp => {
                console.log("ether =====all event count:", rsp.length);
            })
            .catch(err => console.error("error:", err));

        //校验
        expect(value).to.equal(_value);
    });
});