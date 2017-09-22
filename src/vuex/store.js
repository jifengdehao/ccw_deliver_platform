import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const  state = {
    username:'',
    show:false
}

export default new Vuex.Store({
  state,
  mutations,
})
