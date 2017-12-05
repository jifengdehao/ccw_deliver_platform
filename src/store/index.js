/**
 * 2017/10/16
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: vuex 状态管理
 */
import Vue from 'vue'
import Vuex from 'vuex'
import orderList from './modules/orderList'
import user from './modules/user'
import selectMarkets from './modules/selectMarket'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    orderList,
    user,
    selectMarkets
  }
})

