<template>
   <div class="f-register">
        <h1>注册</h1>
        <div class="f-form">
            <van-form @submit="onSubmit">
                <van-field
                    v-model="msg.username"
                    name="用户名"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                    v-model="msg.password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                <van-field
                    v-model="msg.password2"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请再次填写密码' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit" @touchstart="sub">
                    提交
                    </van-button>
                </div>
            </van-form>
            <div @touchstart='Tologin' class="aa">
                已有账号请登录
            </div>
        </div>
  </div>
</template>

<script>
import {Form,Field,Button} from 'vant'
export default {
        data(){
        return{
            msg:{
                password:'',
                username:'',
                password2:''
            }
           
        }
        
    },
    components:{
        [Form.name]:Form,
        [Field.name]:Field,
        [Button.name]:Button
    },
    methods:{
        onSubmit(){

        },
        sub(){
            this.$http.fetchRegist(this.msg).then(()=>{
               
                this.$router.replace('/login')
            })
            
        },
        Tologin(){
            this.$router.push('/login')
        }
    }

}


</script>

<style lang='scss' scoped>
h1{
    text-align: center;
}
    .aa{
        color: red;
        font-size: 0.533333rem;
        cursor: pointer;
        text-align: center;
    }
</style>