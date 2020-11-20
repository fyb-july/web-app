<template>
  <div class="f-navbar">
      <van-nav-bar
        
        left-text="返回"
       
        left-arrow
        @click-left="onClickLeft"
     
        />

  </div>
</template>

<script>
import {NavBar } from 'vant'
export default {
    components:{
        [NavBar.name]:NavBar
    },
    methods:{
        onClickLeft(){
            this.$router.back()
        },
       
    }

}
</script>

<style>

</style>