<template>
 <div class="app">
   <keep-alive>
   <router-view name="alive"></router-view>
   </keep-alive>
   <router-view></router-view>
 </div>
 
</template>

<script>

// import {mapState} from 'vuex'
export default {
  name: 'App',
  computed:{
    // ...mapState('Text',['msg'])
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
  html,body,.app{
    width: 100%;
    height: 100%;
  }
</style>
