/**
 * 2017/10/31
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: api
 */
import * as ax from './instrance'

// 上传地址
export const uploadUrl = ax.uploadUrl

// 用户登录，获取验证码，首页 退出登录 start

export const login = (params) => {
  return ax.g('/User/login', params)
}

export const getCode = (params) => {
  return ax.g('/User/phoneCode', params)
}

export const logout = (params) => {
  return ax.p('/User/logout', params)
}

export const getIndeData = (params) => {
  return ax.g('/User/index', params)
}
// 用户登录，获取验证码，首页 退出登录 end

// 配置设置   胡上军   start  ********************************************************
// 获取目前有菜市场的省份列表
export const getShengs = () => {
  return ax.g('/deployManager/index')
}
// 获取市级列表
export const getCitys = (provinceId) => {
  return ax.g(`/deployManager/province/${provinceId}`)
}
// 获取大区列表
export const getQus = (cityId) => {
  return ax.g(`/deployManager/city/${cityId}`)
}
// 获取菜市场列表
export const getMarkets = (areaId) => {
  return ax.g(`/deployManager/areaMarket/${areaId}`)
}
// 查询区域详情
export const getQuInfo = (areaId) => {
  return ax.g(`/deployManager/area/${areaId}`)
}
// 查询菜市场信息
export const getMarketInfo = (marketId) => {
  return ax.g(`/deployManager/market/${marketId}`)
}
// 删除区域信息
export const delQu = (areaId) => {
  return ax.d(`/deployManager/area/${areaId}`)
}
// 删除菜市场
export const delMarket = (marketId) => {
  return ax.d(`/deployManager/market/${marketId}`)
}
// 修改城市详情
export const modfiyCityMessage = (cityId, params) => {
  return ax.p(`/deployManager/city/${cityId}`, params)
}
// 修改或新增区域
export const addQu = (areaId, params) => {
  return ax.p(`/deployManager/area/${areaId}`, params)
}
// 修改或新增Market
export const addMarket = (marketId, params) => {
  return ax.p(`/deployManager/market/${marketId}`, params)
}
// 配置设置  end   *******************************************************
