import Vue from 'vue'
import vueRouter from 'vue-router'

const Home = ()=> import ('@/components/home/home')
const Find = ()=> import ('@/components/find/find')
const Cate = ()=> import ('@/components/cate/cate')
const User = ()=> import ('@/components/user/user')
const Detail=()=> import ('@/components/home/detail')
const Login = ()=> import ('@/components/user/login')
const Register = ()=> import ('@/components/user/register')

Vue.use(vueRouter)
//路由守卫,全局导航守卫
//他的作用是阻止未登录用户进入需要权限的页面
const router=new vueRouter({
    mode: 'hash',
    routes:[
        {path:'/home',components:{
            alive:Home
        }},
        {path:'/find',component:Find},
        {path:'/cate',component:Cate},
        {path:'/user',component:User},
        {path:'/login',component:Login},
        {path:'/register',component:Register},
        {path:'/detail/:id',component:Detail},
        {path:'/*',redirect:'/home'}
    ]
    
})

router.beforeEach((to, from, next) => {
    console.log("to",to)
     console.log("from",from)
    let token=localStorage.getItem('token')
    let Arr=['/cart','/user']
    if(Arr.includes(to.path)){
                if(token){
                    next()
        
                }else{
                    next('/login')
                }
            }
            else{
                next()
            }
})

export default router 