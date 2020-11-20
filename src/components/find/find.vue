<template lang=''>
<div class="f-box1">
    <div class="f-left">
        <van-sidebar v-model="activeKey">
            <van-sidebar-item v-for="item in cateArr" v-text="item.cate_zh" :key="item.id"/>
            
        </van-sidebar>
    </div>
    <div class="f-right">
        <van-grid :border="false" :column-num="3">
            <van-grid-item v-for='index in Goodobj[activeKey]' :key='index._id'>
                <van-image :src="$img.isBaseUrl+index.img"/>
            </van-grid-item>
           
        </van-grid>
    </div>
    <div class="f-bb"> 
        <Bottom></Bottom>
    </div>
    
</div>

</template>

<script>

import{mapState,mapActions,mapMutations} from 'vuex'
import {Bottom} from '../index'
import { Sidebar, 
         SidebarItem,
         Grid, 
         GridItem,
         Image
        } from 'vant'

export default {
    components:{
        Bottom,
        [Sidebar.name]:Sidebar,
        [SidebarItem.name]:SidebarItem,
        [Grid.name]:Grid,
        [GridItem.name]:GridItem,
        [Image.name]:Image
    },
    data(){
        return {
            activeKey:0,
            cateArr:[]
        }
    },
    mounted(){
           this.init()
    },
    watch:{
        activeKey(){
            let arr=this.Goodobj[this.activeKey]
            if(!(arr&&arr.length>0)){
               let params = {
                        cate: this.cateArr[this.activeKey].cate,
                        size: 100000,
                        index: this.activeKey
                }
                this.seaGood(params)
                }   
        }

    },
    computed:{
        ...mapState('Good',['Goodobj'])
    },
    methods: {
        ...mapActions('Good',['seaGood']),
        ...mapMutations('Good',['clearGoodobj']),
        async init(){
           let  res= await this.$http.fetchAllCates({})
            this.cateArr=res.list
            let params={
                cate: this.cateArr[this.activeKey].cate,
                size: 100000,
                index: this.activeKey
            }
            this.seaGood(params)
        }
        
    },
     beforeDestroy() {
    // 触发mutaions方法，清除缓存
    this.clearGoodobj()
  }

}
</script>

<style lang="scss" scoped>
    .f-box1{
        width: 100%;
        height: 100%;
        position: relative;
        // overflow: hidden;
        
        .f-left{
            width: 2.133333rem;
            height: 100%;
            position: absolute;
            left: 0;
            bottom: 0;
            top: 0;
            background: #999;
             box-sizing: border-box;

         }
         .f-right{
             position: absolute;
             left: 2.133333rem;
             right: 0;
             top: 0;
             bottom: 0;
             background: white;
             width: 7.9rem;
             height: 100%;
             box-sizing: border-box;
         }
         .f-bb{
             position: fixed;
         }
    }
    
</style>