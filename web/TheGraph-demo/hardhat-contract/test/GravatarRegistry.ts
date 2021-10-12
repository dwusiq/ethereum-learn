import { ethers } from 'hardhat';

// import { ethers, deployments, getNamedAccounts } from 'hardhat';

describe("GravatarRegistry test", function () {
    it("deploy GravatarRegistry and test function", async function () {

        //获取测试账号(第一个是管理员)
        const [Owner, Alice, Bob] = await ethers.getSigners();

        //部署合约
        const GravatarRegistry = await ethers.getContractFactory("GravatarRegistry");
        const gravatarRegistry = await GravatarRegistry.deploy();
        await gravatarRegistry.deployed();

        //触发事件NewGravatar
        // gravatarRegistry.on("NewGravatar", (id, owner, displayName, imageUrl) => {
        //     console.log("new:",id, owner, displayName, imageUrl);
        // });
        let url = "https://seopic.699pic.com/photo/40167/7548.jpg_wh1200.jpg";
        await gravatarRegistry.createGravatar("studyGirl", url);
        gravatarRegistry.queryFilter(gravatarRegistry.filters.NewGravatar(), 0, 'latest')
        .then(rsp => {
            console.log("ether =====all NewGravatar event count:", rsp.length,"rsp:",rsp);
        })
        .catch(err => console.error("error:", err));


        //触发事件updateGravatarName
        await gravatarRegistry.updateGravatarName("playComputer");

        gravatarRegistry.queryFilter(gravatarRegistry.filters.UpdatedGravatar(), 0, 'latest')
        .then(rsp => {
            console.log("ether =====all UpdatedGravatar event count:", rsp.length,"rsp:",rsp);
        })
        .catch(err => console.error("error:", err));
    });
});