<template>
  <div class="f-login">
        <h1>登录</h1>
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
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit" @touchstart="sub">
                    提交
                    </van-button>
                </div>
            </van-form>
            <div @touchstart='Toregister' class="aa">
                你还没有注册,请先注册
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
                username:''
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
            this.$http.fetchLogin(this.msg).then(res=>{
                localStorage.setItem('token', res.token)
            this.$router.back()
            
            })
        },
        Toregister(){
            this.$router.push('/register')
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