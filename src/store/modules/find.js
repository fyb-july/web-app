import { fetchGoodList } from '@/utils/api'
export default{
    namespaced:true,
    state:{
        Goodobj:[]
    },
    mutations:{
        updateGoodobj(state,payload){
                state.Goodobj[payload.k]=payload.v
                // 深复制
                console.log(state.Goodobj)
                state.Goodobj=JSON.parse(JSON.stringify(state.Goodobj))
        },
        clearGoodobj(state){
            state.Goodobj={}
        }
    },
    actions:{
        seaGood(store,params){
            fetchGoodList(params).then(res=>{
                let payload = {
                k: params.index,
                v: res.list
              }
              store.commit('updateGoodobj',payload)
            })
            
        }

        

        
    },
}