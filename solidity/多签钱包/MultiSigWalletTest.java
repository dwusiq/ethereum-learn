package com.webank.oracle.test.transaction.MultiSigWallet;

import com.webank.oracle.event.vo.BaseLogResult;
import com.webank.oracle.test.base.BaseTest;
import com.webank.oracle.test.transaction.bac.blindBox.CatBlindbox;
import lombok.extern.slf4j.Slf4j;
import org.fisco.bcos.web3j.protocol.Web3j;
import org.fisco.bcos.web3j.protocol.core.RemoteCall;
import org.fisco.bcos.web3j.protocol.core.methods.response.TransactionReceipt;
import org.fisco.bcos.web3j.utils.ByteUtil;
import org.junit.jupiter.api.Test;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.List;

import static com.webank.oracle.event.service.AbstractCoreService.dealWithReceipt;
import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 *
 */

@Slf4j
public class MultiSigWalletTest extends BaseTest {


    @Test
    public void testMultiSigWallet() throws Exception {

        int chainId = eventRegisterProperties.getEventRegisters().get(0).getChainId();
        int groupId = eventRegisterProperties.getEventRegisters().get(0).getGroup();
        Web3j web3j = getWeb3j(chainId, groupId);

        //所有需要签名的用户
        List<String> all_owners = Arrays.asList(credentials.getAddress(), David, Bob, Alice);

        //------------------------------------
        //步骤一：部署相关合约------------------
        //------------------------------------
        //部署token合约，被多个用户确认才能调该合约的函数
        Hello myToken = Hello.deploy(web3j, credentials, contractGasProvider).send();
        String myTokenAddress = myToken.getContractAddress();
        //部署多签合约
        MultiSigWallet multiSigWallet = MultiSigWallet.deploy(web3j, credentials, contractGasProvider, all_owners, BigInteger.valueOf(3)).send();
        String multiSigWalletAddress = multiSigWallet.getContractAddress();


        //------------------------------------
        //步骤二：管理员之一提交交易:设置value=11------------
        //------------------------------------
        //确认X1
        TransactionReceipt subResult = multiSigWallet.submitTransaction(myTokenAddress, BigInteger.ZERO, ByteUtil.hexStringToBytes("0x60fe47b1000000000000000000000000000000000000000000000000000000000000000b")).send();
        dealWithReceipt(subResult);
        Long txId = Long.parseLong(subResult.getOutput().replaceFirst("0x", ""), 10);
        //检查确认数X1
        BigInteger count = multiSigWallet.getConfirmationCount(BigInteger.valueOf(txId)).send();
        assertEquals(count, BigInteger.ONE);
        //检查结果：查询mytoken的value有无变化
        BigInteger value = myToken.get().send();
        assertEquals(value, BigInteger.ZERO);


        //------------------------------------
        //步骤三：管理员另外两个(根据合约的要求)确认交易------------
        //------------------------------------
        //确认X2
        MultiSigWallet multiSigWalletDavid = MultiSigWallet.load(multiSigWalletAddress, web3j, credentialsDavid, contractGasProvider);
        TransactionReceipt confirm1 = multiSigWalletDavid.confirmTransaction(BigInteger.valueOf(txId)).send();
        dealWithReceipt(confirm1);
        //检查确认数
        count = multiSigWallet.getConfirmationCount(BigInteger.valueOf(txId)).send();
        assertEquals(count, BigInteger.valueOf(2));
        //检查结果：查询mytoken的value有无变化
        value = myToken.get().send();
        assertEquals(value, BigInteger.ZERO);


        //确认X3
        MultiSigWallet multiSigWalletBob = MultiSigWallet.load(multiSigWalletAddress, web3j, credentialsBob, contractGasProvider);
        TransactionReceipt confirm2 = multiSigWalletBob.confirmTransaction(BigInteger.valueOf(txId)).send();
        dealWithReceipt(confirm2);
        //检查确认数
        count = multiSigWallet.getConfirmationCount(BigInteger.valueOf(txId)).send();
        assertEquals(count, BigInteger.valueOf(3));
        //检查结果：查询mytoken的value有无变化
        value = myToken.get().send();
        assertEquals(value, BigInteger.valueOf(11));
        System.out.println(count);
    }
}