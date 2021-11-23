const { expect } = require("chai");
const {
    time,
    BN,           // Big Number support
    constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events-----------------TODO Waffle 测试失败
    expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');

let deployedTestHelpersDemo: any;
let owner: any;


describe(">>>>>>>>>> TestHelpersDemo test", function () {
    const defaultValue = "Bob";
    beforeEach(async function () {
        [owner] = await ethers.getSigners();

        const TestHelpersDemo = await ethers.getContractFactory("TestHelpersDemo");
        deployedTestHelpersDemo = await TestHelpersDemo.deploy(defaultValue);
        await deployedTestHelpersDemo.deployed();
        console.log(">>>>> deployedTestHelpersDemo address:%s", deployedTestHelpersDemo.address);
    });

    it(">>>>>> defaultValuetest", async function () {
        await deployedTestHelpersDemo.storageValue().then(function (result: any) {
            console.log('>>> defaultValue:', result);
            expect(defaultValue).to.equal(result);
        });
    });

    it(">>>>>> advance test", async function () {
        let startBlock = await time.latestBlock();
        console.log(">>> startBlock:%s", startBlock.toString());
        let advanceBlock = '99';
        await time.advanceBlockTo(advanceBlock);

        let endBlock = await time.latestBlock();
        console.log(">>> endBlock:%s", endBlock.toString());
        expect(advanceBlock).to.equal(endBlock.toString());
    });

    it(">>>>>> expectRevert test", async function () {
        let divResult = await deployedTestHelpersDemo.div(20, 10);
        console.log("success:20/10=%s", divResult.toString());

        await expectRevert(
            deployedTestHelpersDemo.div(20, 0),
            'Division or modulo division by zero',
        );
    });


});



export { };

