const { expect } = require("chai");
 
 describe("AbiDemo test",function (){
     it("deploy AbiDemo and test function", async function() {

        //测试参数
        const param=3;

 
        //部署AbiDemo.sol
         const AbiDemo = await ethers.getContractFactory("AbiDemo");
         const abiDemo = await AbiDemo.deploy();
         await abiDemo.deployed();
 
        //打印合约地址
         console.log("abiDemo address：",abiDemo.address);
         
         //打印
         const getSelectorResult =await abiDemo.getSelector();
         console.log("getSelectorResult:",getSelectorResult);

         const getSelectorMultiResult =await abiDemo.getSelectorMulti();
         console.log("getSelectorMultiResult:",getSelectorMultiResult);
         expect(getSelectorMultiResult[0]).to.equal(getSelectorMultiResult[1]);
         
       
         const encodeValueResult =await abiDemo.encodeValue(param);
         console.log("encodeValueResult:",encodeValueResult);
         const abiCoder =new ethers.utils.AbiCoder()
         const codeOfParam =  abiCoder.encode(['uint256'],[param])
         console.log("codeOfParam:",codeOfParam);
         expect(codeOfParam).to.equal(encodeValueResult);


         const encodeWithSignatureResult =await abiDemo.encodeWithSignature(param);
         console.log("encodeWithSignatureResult:",encodeWithSignatureResult);
         expect(getSelectorResult+encodeValueResult.substring(2,encodeValueResult.length)).to.equal(encodeWithSignatureResult);

         
         const encodeWithSelectorResult =await abiDemo.encodeWithSelector(param);
         console.log("encodeWithSelectorResult:",encodeWithSelectorResult);
         expect(getSelectorResult+encodeValueResult.substring(2,encodeValueResult.length)).to.equal(encodeWithSignatureResult);


         const encodePackedResult =await abiDemo.encodePacked(param);
         console.log("encodePackedResult:",encodePackedResult);
         expect(encodeValueResult).to.equal(encodePackedResult);

         const encodePackedWithMultiValueResult =await abiDemo.encodePackedWithMultiValue(param,param);
         console.log("encodePackedWithMultiValueResult:",encodePackedWithMultiValueResult);
         expect(encodeValueResult+encodeValueResult.substring(2,encodeValueResult.length)).to.equal(encodePackedWithMultiValueResult);

     });
 });