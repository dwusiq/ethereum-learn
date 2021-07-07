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
        <li>私钥：{{privateKey}}</li>  
        <li>公钥：{{publicKey}} </li>
        <li>地址：{{address}}</li>
        <li>path：{{path}} </li>
      </ul>
      <ul class="buttonBlock">
        <button class="button"  @click="validateMnemonic">校验</button>
        <button class="button"  @click="cleanInputedMnemonic">清空</button>
        <button class="button" v-show="validateMnemonicSuccess"  @click="hideValidateMnemonicResult">隐藏</button>
      </ul>

    </div>
  </div>
</template>



<script lang="ts">
import { ethers } from 'ethers';
import { defineComponent} from 'vue'


export default defineComponent({
  name: 'WalletPage',
    //用于初始化属性值
    data() {
    return {
      validateMnemonicSuccess:false,
      mnemonicContent: "",
      inputMmonicContent:"",
      privateKey: "",
      publicKey: "",
      address: "",
      path: "",
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
</style>
