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
              <input type="radio" id="mnemonic" value="{{ParentkeyInitTypeEnum.Mnemonic}}" v-model="parentkeyInitType">
              <label for="mnemonic">助记词</label>
              <input type="radio" id="seed" value="{{ParentkeyInitTypeEnum.Seed}}" v-model="parentkeyInitType">
              <label for="seed">随机种子</label>
              <input type="radio" id="extendedKey" value="ExtendedKey" v-model="parentkeyInitType">
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
            <td>子私钥索引：</td>
            <td> 
              <input type="text" v-model="subsidiaryKeyIndex" style="width:50px;"/>
            </td>
          </tr>
        </table>
      </ul>
      <ul class="buttonBlock">
        <button class="button"  @click="generateSubsidiaryKey">确认</button>
      </ul>
    </div>
  </div>
</template>



<script lang="ts">
import { ethers } from 'ethers';
import { defineComponent} from 'vue'


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
      subsidiaryKeyIndex: null
    };
  },


 //setup(){
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
   generateSubsidiaryKey():void{
     console.log(ParentkeyInitTypeEnum.Mnemonic);
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
