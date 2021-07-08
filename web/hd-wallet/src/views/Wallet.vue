<template>
  <div class="Wallet">
    <div class="outBlock">
      <h1>场景一：生成助记词</h1>
      <textarea class="textarea" v-model="mnemonicContent" rows="4" cols="30"></textarea>
      <ul class="buttonBlock">
        <button class="button"  @click="generateMnemonic">获取</button>
        <button class="button"  @click="cleanMnemonic">清空</button>
      </ul>
    </div>
    <div class="outBlock">
      <h1>场景二：校验助记词</h1>
      <textarea class="textarea" v-model="inputMmonicContent" placeholder="embody;father;fashion;lemon;sheriff;gospel;suffer;smoke;finish;bus;way;dizzy" rows="4" cols="30"></textarea>
      <ul  v-show="validateMnemonicSuccess">
        <h1>当前钱包信息</h1>
        <li>助记词：{{inputMmonicContent}}</li>
        <li>私钥：{{privateKey}}</li>  
        <li>公钥：{{publicKey}} </li>
        <li>地址：{{address}}</li>
        <li>种子：{{seed}}</li>
        <li>链码：{{chainCode}} </li>
        <li>扩展键：{{extendedKey}} </li>
        <li>path：{{path}} </li>
      </ul>
      <ul class="buttonBlock">
        <button class="button"  @click="validateMnemonic">校验</button>
        <button class="button"  @click="cleanInputedMnemonic">清空</button>
      </ul>
    </div>
    <div class="outBlock">
      <h1>场景三：生成子私钥</h1>
      <ul>
        <table class="generateSubsidiaryKey">
          <tr>
            <td>父私钥初始化参数类型：</td>
            <td> 
              <input type="radio" id="mnemonic" value="0" v-model="parentkeyInitType">
              <label for="mnemonic">助记词</label>
              <input type="radio" id="seed" value="1" v-model="parentkeyInitType">
              <label for="seed">种子</label>
              <input type="radio" id="extendedKey" value="2" v-model="parentkeyInitType">
              <label for="extendedKey">扩展键</label>
            </td>
          </tr>
          <tr>
             <td>父私钥初始化参数：</td>
            <td> 
              <textarea class="textarea" v-model="parentkeyInitParam"  rows="2" cols="40"></textarea>
            </td>
          </tr>
          <tr>
            <td>币种(coin)：</td>
            <td> 
              　<select v-model="coinType" @change="buildSubNodePath">
    　        　  <option v-for="item in coinTypeList" v-bind:key="item.value" v-bind:value="item.value">{{item.name}} - {{item.value}}</option>
　　            </select>
            </td>
          </tr>
          <tr>
            <td>账号(Account)：</td>
            <td> 
              　<input type="number" v-model="account" @change="buildSubNodePath" style="width:50px;"/>
            </td>
          </tr>
          <tr>
            <td>可见性(change)：</td>
            <td> 
              　<select v-model="changeType" @change="buildSubNodePath">
    　        　  <option v-for="item in changeTypeList" v-bind:key="item.value" v-bind:value="item.value">{{item.name}} - {{item.value}}</option>
　　            </select>
            </td>
          </tr>
          <tr>
            <td>地址索引(addressIndex)：</td>
            <td> 
              　<input type="number" v-model="addressIndex" @change="buildSubNodePath" style="width:50px;"/>
            </td>
          </tr>
          <tr>
            <td>子私钥地址：</td>
            <td><span>{{subNodePath}}  </span></td>
          </tr>
        </table>
      </ul>
      <ul class="buttonBlock">
        <button class="button"  @click="generateSubsidiaryKey">确认</button>
      </ul>
      <ul>
        子私钥地址：{{newKeyAddress}}
      </ul>
    </div>
  </div>
</template>



<script lang="ts">
import { ethers } from 'ethers';
import { computed, defineComponent } from 'vue';


enum ParentkeyInitTypeEnum {
  Mnemonic,
  Seed,
  ExtendedKey
}



export default defineComponent({
  name: 'WalletPage',
    //用于初始化属性值
    data() {
    return {
      //主节点属性
      validateMnemonicSuccess:false,
      mnemonicContent: "",
      inputMmonicContent:"",
      privateKey: "",
      publicKey: "",
      address: "",
      path: "",
      seed:"",
      chainCode:"",
      extendedKey:"",
      //其他
      parentkeyInitType:"Mnemonic",
      parentkeyInitParam:"",
      newKeyAddress:"",    
      coinType:"60",
      coinTypeList:[{ name: 'BTC', value: '0' },{ name: 'ETH', value: '60' }],
      account:"0",
      changeType:"0",
      changeTypeList:[{ name: '外部可见（收款地址）', value: '0' },{ name: '内部可见（找零地址）', value: '1' }],
      addressIndex:"0",
      subNodePath:"m/44'/60'/0'/0/0",
    };
  },


//  setup(){
//  },  
  
  //函数在这里,就可以在模板中引用了
  methods:{
   generateMnemonic():void {
      this.mnemonicContent = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16));
   },
    cleanMnemonic():void {
      this.mnemonicContent = "";
   },
   validateMnemonic():void{
    const realMnemonicContent = this.inputMmonicContent.replace(/;/g," ");
    if(ethers.utils.isValidMnemonic(realMnemonicContent)){
      const hdNode = ethers.utils.HDNode.fromMnemonic(realMnemonicContent);
      this.validateMnemonicSuccess=true;
      this.privateKey = hdNode.privateKey;
      this.publicKey = hdNode.publicKey;
      this.address = hdNode.address;
      this.path = hdNode.path;
      this.chainCode = hdNode.chainCode;
      this.extendedKey  = hdNode.extendedKey ;
      this.seed = ethers.utils.mnemonicToSeed(realMnemonicContent);
    }else{
        alert("请输入有效助记词");
    }
   },
   cleanInputedMnemonic():void{
      this.inputMmonicContent = "";
      this.validateMnemonicSuccess=false;
   },
   hideValidateMnemonicResult():void{
      this.validateMnemonicSuccess=false;
   },
   buildSubNodePath():void{
      this.subNodePath =  "m/44'/coinType'/account'/changeType/addressIndex"
      .replace("coinType",this.coinType)
      .replace("account",this.account)
      .replace("changeType",this.changeType)
      .replace("addressIndex",this.addressIndex);
   },
   generateSubsidiaryKey():void{
     let parentHdNode=null;
     if(ParentkeyInitTypeEnum.Mnemonic==this.parentkeyInitType){
       parentHdNode = ethers.utils.HDNode.fromMnemonic(this.parentkeyInitParam);
     }else if(ParentkeyInitTypeEnum.Seed==this.parentkeyInitType){
       parentHdNode = ethers.utils.HDNode.fromSeed(this.parentkeyInitParam);
     }else if(ParentkeyInitTypeEnum.ExtendedKey==this.parentkeyInitType){
      parentHdNode = ethers.utils.HDNode.fromExtendedKey(this.parentkeyInitParam);
     }else{
       alert("不支持的类型");
       return;
     }

     console.log(parentHdNode);
     console.log(parentHdNode.derivePath("m/44'/60'/1'/4/0"));
    //  let subsidiaryHdNode = parentHdNode.neuter().derivePath("m/44'/60'/0'/0/0");
    //  this.newKeyAddress = subsidiaryHdNode.address;
  //  m/44'/60'/0'/0/0 0xa14acead97951e2be70d5d305d93a37cabd474426765f7272d96fb4b452f8a31
   }
  }
})
</script>

<style scoped lang="scss">
.outBlock{
  float:left;
  display: flex;/*flex容器当中, 项目的排列方式默认是row(水平的). 可以使用flex-direction属性进行更改*/
  flex-direction: column;  /* 按照列column(垂直方向)排列*/
  border:10px solid rgba(4, 64, 68, 0.205);
  margin-left: 30px;
  margin-top: 30px; 
  }

.outBlock textarea{
  margin-top:10px;
}

.outBlock ul li{
  text-align:left;
}

.buttonBlock{
 display:block;
 margin:10 auto;
 padding: 0 0 0 0;
}
.buttonBlock button{
 width: 100px;
 height: 50px;
 margin: 5px;
}
.textarea{
  color:#070202;
  // font-family:黑体;
  font-size:30pt;
}
.generateSubsidiaryKey{
  text-align:left;
}
</style>
