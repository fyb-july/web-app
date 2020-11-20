<template>
 
        <van-tabbar route active-color='#F30F05'>
            <van-tabbar-item icon="home-o" to="/home" >首页</van-tabbar-item>
            <van-tabbar-item icon="search" to="/find">搜索</van-tabbar-item>
            <van-tabbar-item icon="friends-o" :badge="aa" to="/cate">购物车</van-tabbar-item>
            <van-tabbar-item icon="setting-o" :to='isLogin?"/user":"/login"'>
            {{isLogin?'用户中心':"登录"}}
            </van-tabbar-item>
        </van-tabbar>

</template>

<script>
import {Tabbar,TabbarItem} from 'vant'
export default {
    data:function(){
        return{
            isLogin:false
        }
    },
    props:['aa'],
    components:{
        [Tabbar.name]:Tabbar,
        [TabbarItem.name]:TabbarItem
    },
     mounted() {
    this.isLogin = localStorage.getItem('token')
  },
     // 当keep-alive激活我时
  activated() {
    this.isLogin = localStorage.getItem('token')
  }
}
</script>

<style lang='scss'>
.imgArr{
    height: 4rem;
}
     .van-swipe{
        height: 4rem;
            img{
                display: block;
                width: 100%;
                height: 100%;
            }
        width: 100%;
      
    }

</style>

