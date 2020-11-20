<template >
    <div class="f-box2">
        <Navbar></Navbar>
        <Bottom />
        <div class="fc-top">
            <van-swipe-cell v-for='item in list' :key="item._id">
                <template #left>
                    <van-button square type="primary" text="收藏" style="height:100%"/>
                </template>
                <van-cell :border="false"  >
                    <template>
                        <div class="f-check">
                             <van-checkbox v-model="item.checked" @click="haclick"></van-checkbox>
                             <span class="f-color">{{item.good.price}}元</span>
                            <img :src="$img.isBaseUrl+item.good.img" alt="">
                            <div class="ff-b">
                                    <van-stepper :value="item.num" theme="round" button-size="22" disable-input @change="handChange($event,item._id)"/>
                            </div>   
                        </div>
                    </template>
                </van-cell>
                <template #right>
                    <van-button square type="danger" text="删除" style="height:100%" @touchstart="handDel(item)"/>
                </template>
            </van-swipe-cell>
            
        </div>
        <div class="f-bar">
            <van-submit-bar :price="ftotal" button-text="提交订单" @submit="onSubmit" :disabled='fsub'>
                <van-checkbox v-model="fullChecked" @click="handleClick">全选</van-checkbox>
                <template #tip>
                    你的收货地址不支持同城送, <span @click="onClickEditAddress">修改地址</span>
                </template>
            </van-submit-bar>
        </div>
    </div>
</template>

<script>
import{Navbar} from '../index'
import {Bottom} from '../index'
import {SwipeCell ,
        Button,
        Cell,
        Stepper,
        Checkbox,
        SubmitBar,
        Dialog,
        Toast


        } from 'vant' 
export default {
    name:"cate",
    components:{
        Bottom,
         Navbar,
        [SwipeCell.name]:SwipeCell,
        [Button.name]:Button,
        [Cell.name]:Cell,
        [Checkbox.name]:Checkbox,
        [Stepper.name]:Stepper,
        [SubmitBar.name]:SubmitBar

    },
    data(){
        return{
            fullChecked:false,
            list:[],
            fsub:true,
           
        }
    },
    computed:{
        ftotal(){
            let t=0
            this.list.map((ele)=>{
                if(ele.checked){
                 t+=ele.num*ele.good.price*100
             }
            })
        return t
        },
        Sub:function(){
            let arr=[]
             arr=this.list.filter(ele=>{
                  return ele.checked
            })
            return arr.length
        }
        
    },
    mounted(){
        this.init()
    },
  //利用监听属性,监听场上的事件变化,只要数据长度发生变化就进行判断
    watch:{
        Sub(n,v){
            console.log(n)
            console.log(v)
            if(n>0){
                this.fsub=false
            }else{
                this.fsub=true

            }

        }
           
    },
    methods:{
        onSubmit(){
                let goods = ''
                this.list.map(ele=>{
                if(ele.checked) goods += ';'+ele._id
            })
           
             this.$http.fetchSubmitCart({goods}).then(()=>{
                Toast('下单成功')
                this.timer = setTimeout(()=>{
                this.init()
               
                this.fullChecked=false
                }, 1000)
            })
            
        },
        // 封装一个刷新页面的方法,方便复用
        init(){
            this.$http.fetchCart({}).then(res=>{
            this.list=res
        })
        },
        onClickEditAddress(){
        },
        handleClick(){
                this.list.map((ele,index,arr)=>{
                    arr[index].checked=this.fullChecked
                })
            this.list=JSON.parse(JSON.stringify(this.list))
        },
        haclick(){
                
               this.list.filter(ele=>{
                   
                if(!ele.checked){
                    this.fullChecked=false
                    
                }else{
                    this.fullChecked=true
                    
                }
                 
            })
            
        },
        handChange(val,index){
            this.list.map((ele)=>{
                if(ele._id==index){
                    if(val>ele.num){
                            ele.num++
                    }else{
                        ele.num--
                    }
                }
                //添加一个产品
                 let data={
                            id:index,
                            num:ele.num 
                            }
                        this.$http.fetchUpdCart(data).then(res=>{
                            console.log(res)
                        })
            })
        },
        handDel(val){
        Dialog.confirm({
        title: '警告',
        message: `你确定要删除 ${val.good.name} 这个商品吗？`,
            }).then(() => {
                this.$http.fetchDelCart({id:val._id}).then(()=>{
                    //  let arrr=[]
                    this.list.filter(ele=>{
                       
                        if(!ele.checked){
                            this.fullChecked=false
                            this.fsub=true
                        }else{
                            this.fullChecked=true
                            this.fsub=false
                        }
                        // return ele.checked
                    })
                    //  if(arrr.length>0){
                    //     this.fsub=false
                    // }else{
                    //     this.fsub=true
                    // }
                    
                this.init()
                })
            })
            
        }
    }

}
</script>
<style lang="scss" scoped>
.van-checkbox{
    width: 1.333333rem;
    height: 100%;
}
.van-cell{
    img{
        width: 2.666667rem;
        height: 2.666667rem;
    }
}
.van-botton{
    height: 100%;
}
.f-check{
    display: flex;
    .van-checkbox{
        margin-top: 1.066667rem;
    }
}
.f-color{
    width: 2rem;
    display: block;
    color: red;
    margin-top: 2rem;
}
.ff-b{
    margin-top: 2rem;
}
</style>