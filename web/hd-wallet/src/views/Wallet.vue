<template>
  <div class="Wallet">
    <div class="mnemonic">
      <button  @click="getMnemonic">获取助记词</button>
      <textarea v-model="mnemonicContent" rows="10" cols="30">
      我是一个文本框。
      </textarea>
    </div>
    <h1>well come to wallet!</h1>
  </div>
</template>

<script lang="ts">
import * as bip39 from 'bip39';
import { ethers } from 'ethers';
import { defineComponent, reactive,ref,computed } from 'vue'


export default defineComponent({
  name: 'WalletPage',
    //用于初始化属性值
    data() {
    return {
      mnemonicContent: null
    };
  },


 //setup(){
//  },  
  
  //函数在这里,就可以在模板中引用了
  methods:{
   getMnemonic():void {
     console.log(bip39);
      this.mnemonicContent = bip39.generateMnemonic();
   }
  }
})
</script>

<style scoped lang="scss">
.mnemonic{
  float:left;
  display: flex;/*flex容器当中, 项目的排列方式默认是row(水平的). 可以使用flex-direction属性进行更改*/
  flex-direction: column;  /* 按照列column(垂直方向)排列*/
  }

.mnemonic textarea{
  margin-top:10px;
}

</style>
