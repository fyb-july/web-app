<template>
    <div class="f-box">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="f-ff">
       <van-notice-bar
       left-icon="volume-o"
        :text='text'
        mode="closeable"
        background='#F21B27'
        color='#ffffff'
        scrollable
        >
       </van-notice-bar>
       <!-- 搜索框写死,点击跳转搜索页面 -->
       <van-search
            shape="round"
            background="#F21B27"
            disabled
            show-action
            :placeholder="pText"
         >
         <!-- 组件插槽放置登录-->
         <template #action>
            <div class="login" @touchstart="ToLogin">登录</div>
        </template>
       </van-search>
       <!-- 轮播图的循环渲染 -->
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="item in imgArr" :key="item.id">
                <img v-lazy="item.url"/>
            </van-swipe-item>
        </van-swipe>
        <div class="imgH" >
            <van-image width="100%" height="" src="//img12.360buyimg.com/img/s750x70_jfs/t1/124583/37/16524/12470/5f9bc181E48c91215/cac00c52cb0b2fa4.png" />
        </div>
        <div class="f-list">
            <!-- 热销的商品调接口渲染 -->
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
                    <van-cell v-for="item in list" :key="item._id" :title="item.name" class="f-cell" @click='skipTodetail(item._id)'>
                        <img :src="$img.isBaseUrl+item.img" :alt="item.name">
                    </van-cell>
                </van-list>
           

        </div>
    </van-pull-refresh  >
        <div class="box3">
            <Bottom :aa="1">

            </Bottom>
        </div>
    </div>
</template>

<script>

import {    NoticeBar,
            Swipe,
            SwipeItem,
            Image,
            Search,
            List, 
            Cell,
            PullRefresh 
        } from 'vant'
import {Bottom} from '../index'

export default {
    components:{
        Bottom,
        [NoticeBar.name]:NoticeBar,
        [Swipe.name]:Swipe,
        [SwipeItem.name]:SwipeItem,
        [Image.name]: Image,
        [Search.name]:Search,
        [List.name]:List,
        [Cell.name]:Cell,
        [PullRefresh.name]:PullRefresh
    },
    data(){
        return{
            text:'技术是开发它的的技术是开发它的人的同灵魂。',
            imgArr:[
                {id:1,url:'//m.360buyimg.com/mobilecms/s700x280_jfs/t1/139252/6/13093/165885/5fa119b3Ee33c98ec/eeb7feca847ad5e8.jpg!q70.jpg.dpg'},
                {id:2,url:'//m.360buyimg.com/mobilecms/s700x280_jfs/t1/120852/20/10143/75777/5f3e7132Ef1cc95d4/ed0deadd9e9328dd.jpg!cr_1125x445_0_171!q70.jpg.dpg'},
                {id:3,url:'//m.360buyimg.com/mobilecms/s700x280_jfs/t1/141855/11/5982/101447/5f3e6b08E5b839492/f8d78f1e21cd29e3.jpg!cr_1125x445_0_171!q70.jpg.dpg'},
                {id:4,url:'//m.360buyimg.com/mobilecms/s700x280_jfs/t1/120852/20/10143/75777/5f3e7132Ef1cc95d4/ed0deadd9e9328dd.jpg!cr_1125x445_0_171!q70.jpg.dpg'}
            ],
            inputArr:[
                {id:1,text:'云南白药'},
                {id:2,text:'云南白药1'},
                {id:3,text:'云南白药2'},
                {id:4,text:'云南白药3'},
                {id:5,text:'云南白药4'}
            ],
            list:[],
            refreshing:false,
            loading:false,
            finished:false,
            page:1,
            hot:true,
            size:6,
            total:0
        }
    },
    computed:{
        pText(){
            return this.inputArr[Math.floor(Math.random()*5)].text
        }
        
    },
    mounted(){
        this.getGoodlist()
    },
    methods:{
        
        getGoodlist(){
            let params = {
                size: this.size,
                page: this.page,
                hot: this.hot
            }
            this.$http.fetchGoodList(params).then(res=>{
                console.log(res)
                if(this.page==1){
                     this.total=res.total
                    this.list=res.list
                    this.refreshing=false
                    this.finished = false
                    this.loading = false
                }else{
                    this.list=[...this.list,...res.list]
                    this.loading=false
                }
        })
        },
        onRefresh(){
            this.page=1
            this.getGoodlist()
        },
        onLoad(){
            if(this.list.length<this.total){
                this.page++
                this.finished=false
                  this.getGoodlist()      
            }else{
                console.log('aa')
                this.finished=true
            }
        },
        skipTodetail(val){
            console.log(val)
            this.$router.push('/detail/'+val)
        },
        ToLogin(){
            this.$router.push('/login')
        }
    }

}
</script>

<style lang="scss" scoped>
   
    .van-search{
        width: 100%;
    
    }
    .imgH{
        margin-top: 0.25rem;
    }
    .f-cell{
        display: inline-block;
        width: 50%;
        text-align: center;
        height: 4rem;
        img{
            width: 100%;
            height: 4rem;
        }
    }
     .f-ff{
         padding-bottom: 1.6rem
     }   
    .login{
        color:white;
    }
</style>