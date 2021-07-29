const {expect} = require("chai");

describe("ModifierDemo test",function(){
    it("test function of ModifierDemo.sol",async function(){
        
        //测试参数
        const [Alice,Bob] = await ethers.getSigners();
        const _value=123;


        //部署交易合约`ModifierDemo.sol`
        const ModifierDemo = await ethers.getContractFactory("ModifierDemo");
        const modifierdemo = await ModifierDemo.deploy();
        await modifierdemo.connect(Alice).deployed();
        console.log("address of modifierdemo:",modifierdemo.address);
        console.log("owner of modifierdemo:",await modifierdemo.owner());
       
    
        //触发失败调用
        await expect(modifierdemo.connect(Bob).change(_value)).to.be.revertedWith("just support owner request!");
       
        //触发成功调用
        await modifierdemo.connect(Alice).change(_value);
        const rsp_value=await modifierdemo.get();
        console.log("result of exec get:",rsp_value.toNumber());


        //校验
        expect(Alice.address).to.equal(await modifierdemo.owner());
        expect(_value).to.equal(await modifierdemo.get());
    });
});