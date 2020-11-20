import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import Text from './modules/text'
import Good from './modules/find'
export default new Vuex.Store({
    modules:{
        Text,
        Good
    }
})