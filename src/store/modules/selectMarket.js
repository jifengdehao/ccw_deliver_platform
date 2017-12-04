/**
 * 2017/12/4
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 选择菜市场状态
 */
import Vue from 'vue'
import * as api from '@/api/common'
import * as types from '../types'

const state = {
  provinceId: null,
  cityId: null,
  areaId: null,
  marketId: null,
  provinceData: [],
  cityData: [],
  areaData: [],
  marketData: []
}
const getters = {
  getProvince(state) {
    return state.provinceId
  },
  getCity(state) {
    return state.cityId
  },
  getArea(state) {
    return state.areaId
  },
  getMarket() {
    return state.marketId
  }
}
const mutations = {
  [types.GET_PROVINCE_DATA](state, res) {
    state.provinceData = res
  },
  [types.GET_CITY_DATA](state, res) {
    state.cityData = res
  },
  [types.GET_AREA_DATA](state, res) {
    state.areaData = res
  },
  [types.GET_MARKET_DATA](state, res) {
    state.marketData = res
  },
  [types.CHANG_PROVINCE](state, pro) {
    state.provinceId = pro
  },
  [types.CHANG_PROVINCE](state, proId) {
    state.provinceId = proId
  },
  [types.CHANG_CITY](state, cityId) {
    state.cityId = cityId
  },
  [types.CHANG_AREA](state, areaId) {
    state.areaId = areaId
  },
  [types.CHANG_MARKET](state, marketId) {
    state.marketId = marketId
  }
}
const actions = {
  getProvinceData({commit}) {
    api.getDeployManager().then((res) => {
      if (res) {
        commit(types.GET_PROVINCE_DATA, res)
      }
    })
  },
  getCityData({commit}, proId) {
    api.getProvinceIndex(proId).then((res) => {
      if (res) {
        commit(types.GET_CITY_DATA, res)
      }
    })
  },
  getAreaData({commit}, cityId) {
    api.getCityManager(cityId).then((res) => {
      if (res) {
        commit(types.GET_AREA_DATA, res)
      }
    })
  },
  getMarketData({commit}, areaId) {
    api.getAreaMarket(areaId).then((res) => {
      if (res) {
        commit(types.GET_MARKET_DATA, res)
      }
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
