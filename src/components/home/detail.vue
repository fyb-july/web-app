<template>
  <div class="f-detail">
      <Navbar></Navbar>
        <div class="fg-name">
            {{good.name}}

        </div>
        <div class="fg-img">
            <img :src="$img.isBaseUrl+good.img" alt="">
        </div>
        <div class="fg-desc">
            {{good.desc}}<br>
            <span class="fg-price">{{good.price}}元</span>

        </div>
        <div class="f-hui">
            <van-goods-action>
                <van-goods-action-icon icon="chat-o" text="客服" dot />
                <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
                <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
                <van-goods-action-button type="warning" text="加入购物车" />
                <van-goods-action-button type="danger" text="立即购买"  @click="Tocate"></van-goods-action-button>
            </van-goods-action>

        </div>
  </div>
</template>

<script>
import{Navbar} from '../index'
import {GoodsAction, GoodsActionIcon, GoodsActionButton} from 'vant'
export default {
    components:{
            Navbar,
            [GoodsAction.name]:GoodsAction,
            [GoodsActionIcon.name]:GoodsActionIcon,
            [GoodsActionButton.name]:GoodsActionButton
    },
    data:function(){
        return{
            good:{}
        }
    },
    // 进入页面就调接口进行页面渲染
    mounted(){
        // console.log(this.$route.params.id)
       let id=this.$route.params.id
        this.$http.fetchGoodDetail({id}).then(res=>{
            console.log(res)
            this.good=res
        })
    },
    methods:{
        
        Tocate(){
            console.log(this.good._id)
           let data={
               good_id:this.good._id,
               num:1
           }
           this.$http.fetchGoodAddcate(data).then(res=>{
               if(res===1){
                   this.$router.push('/cate')
               }
           })
           
        }

    }
}
</script>

<style lang='scss' scoped>
.fg-name{
    padding-top: 1.333333rem;
    font-size: 0.666667rem;
    text-align: center;
}
.fg-img{
    padding: 0.266667rem;
    img{
        width: 100%;
    height: 8rem;
    }
}
.fg-desc{
    font-size: 0.4rem;
    color:#333
}
.fg-price{
    color:red;
    font-size: 0.8rem;
}

</style>