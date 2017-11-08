/**
 * 2017/10/31
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: api
 */
import * as ax from './instrance'

// 上传地址
export const uploadUrl = ax.uploadUrl
/**
 * author: zhangwenlong
 * @param params
 */
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

// 配置设置   胡上军   start  ********************************************************
// 获取目前有菜市场的省份列表
export const getShengs = () => {
  return ax.g('/deployManager/indexAll')
}
// 获取市级列表
export const getCitys = (provinceId) => {
  return ax.g(`/deployManager/provinceAll/${provinceId}`)
}
// 获取大区列表
export const getQus = (cityId) => {
  return ax.g(`/deployManager/city/${cityId}`)
}
// 获取菜市场列表
export const getMarkets = (areaId) => {
  return ax.g(`/deployManager/areaMarket/${areaId}`)
}
// 查询城市详情
export const getCityInfo = (cityId) => {
  return ax.g(`/deployManager/cityInfo/${cityId}`)
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
export const modfiyCityMessage = ( params) => {
  return ax.p(`/deployManager/city`, params)
}
// 修改或新增区域
export const addQu = ( params) => {
  return ax.p(`/deployManager/area`, params)
}
// 修改或新增Market
export const addMarket = (params) => {
  return ax.p(`/deployManager/market`, params)
}
// 配置设置  end   *******************************************************
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

 // 骑士管理 获取表单数据/User/index
 export const getUserIndex = (params) => {
   return ax.g('/User/index', params)
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

 // 骑士审核通过/不通过/deliverManager/audit
 export const getDeliverAudit = (params) => {
   return ax.u('/deliverManager/audit', params)
 }

 // 骑士审核查看基本信息/deliverManager/audit/
 export const getSeeDeliver = (ID) => {
   return ax.g(`/deliverManager/audit/${ID}`)
 }

 // 配送人员列表数据GET /deliverManager/deliver
 export const getDeliverList = (params) => {
   return ax.g('/deliverManager/deliver', params)
 }

 // 配送人员导出数据/deliverManager/deliver/POI
 export const getDeliverPoi = (params) => {
   return ax.g('/deliverManager/deliver/POI', params)
 }

 // 配送人员冻结用户PUT /deliverManager/deliver/{deliverId}
 export const getDeliverId = (id) => {
   return ax.u(`/deliverManager/deliver/${id}`)
 }

 // 配送人员查看用户/deliverManager/deliver/
 export const getDeliverInfo = (id) => {
   return ax.g(`/deliverManager/deliver/${id}`)
 }

 /**
  * @author Zeng FanLu
  * components 财务对账
  */

  // 财务对账 查看列表/financial/financialShow
  export const getFinanceList = (params) => {
    return ax.g('/financial/financialShow', params)
  }

  // 财务对账 导出列表信息/financial/financialShow/POI
  export const getFinanceListExport = (params) => {
    return ax.g('/financial/financialShow/POI', params)
  }

  // 财务对账 导出快递员个人信息/financial/psDeliverOrderShow/POI
  export const getFinanceOrderExport = (params) => {
    return ax.g('/financial/psDeliverOrderShow/POI', params)
  }

  // 财务对账 查看快递员个人列表/financial/psDeliverOrderShow
  export const getFinanceOrderList = (params) => {
    return ax.g('/financial/psDeliverOrderShow', params)
  }
