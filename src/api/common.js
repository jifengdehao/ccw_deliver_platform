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
  return ax.p('/User/login', params)
}

export const getCode = (params) => {
  return ax.g('/User/phoneCode', params)
}

export const logout = (params) => {
  return ax.g('/User/logout', params)
}

export const getIndeData = (params) => {
  return ax.g('/User/index', params)
}

// 用户登录，获取验证码，首页 退出登录 end

/**
 * @author: Zeng FanLu
 * components: 骑士管理
 */

 // 骑士管理 获取相关省区/deployManager/index
 export const getDeployManager = () => {
   return ax.g('/deployManager/index')
 }
 
 // 骑士管理 获取相关市区 /deployManager/province/
 export const getProvinceIndex = (id) => {
   return ax.g(`/deployManager/province/${id}`)
 }

 // 骑士管理 获取相关区域/deployManager/city/
 export const getCityManager = (id) => {
   return ax.g(`/deployManager/city/${id}`)
 }

 // 骑士管理 获取相关菜市场/deployManager/areaMarket/
 export const getAreaMarket = (id) => {
   return ax.g(`/deployManager/areaMarket/${id}`)
 }

 // 未提交资料/deliverManager/unverified
 export const getDeliverManager = (params) => {
   return ax.g('/deliverManager/unverified', params)
 }

 // 删除未提交资料/deliverManager/unverified/
 export const deleteUnverified = (id) => {
   return ax.d(`/deliverManager/unverified/${id}`)
 }

 // 导出未提交资料数据/deliverManager/unverified/POI
 export const exportUnverified = (params) => {
   return ax.g('/deliverManager/unverified/POI', params)
 }

 // 骑士审核列表数据/deliverManager/audit
 export const getAuditManager = (params) => {
   return ax.g('/deliverManager/audit', params)
 }