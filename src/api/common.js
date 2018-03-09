/**
 * 2017/10/31
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: api
 */
import * as ax from './instrance'


// author: zhangwenlong start

/**
 * 修改个人密码
 * @param params
 */
export const modifyPass = params => {
  return ax.p('/User/updatePass', params)
}

/**
 * 修改个人信息
 * @param params
 */
export const modifyUserInfo = params => {
  return ax.p('/User/updateSelf', params)
}
/**
 * 登录
 * @param params
 */
export const login = params => {
  return ax.p('/User/login', params)
}
/**
 * 获取手机验证码
 * @param params
 */
export const getCode = params => {
  return ax.g('/User/phoneCode', params)
}
/***
 * 登出
 * @param params
 */
export const logout = params => {
  return ax.g('/User/logout', params)
}
/**
 * 获取首页数据
 * @param params =>{marketId}
 */
export const getIndeData = params => {
  return ax.g(`/User/index/${params}`)
}
/**
 * 订单管理
 * @param params
 */
export const getOrderData = params => {
  return ax.g('/orderManager', params)
}
/**
 * 导出订单列表
 * @param params
 */
export const exportOrderPoi = params => {
  return ax.g('/orderManager/poi', params)
}

/**
 * 订单指派
 * @param params
 */
export const getOrderDetails = params => {
  return ax.g(`/orderManager/${params}`)
}
/**
 * 订单详情
 * @param params
 */
export const getOrderDetailsTo = params => {
  return ax.g(`/orderManager/detail/${params}`)
}

/**
 * 指派配送员
 * @param params
 */
export const putDeliver = (orderId, params) => {
  return ax.u(`/orderManager/${orderId}/${params}`)
}

export const getMenu = params => {
  return ax.g('/User/menuList', params)
}

// author: zhangwenlong end

// 配置设置   胡上军   start  ********************************************************
// 获取目前有菜市场的省份列表
export const getShengs = () => {
  return ax.g('/deployManager/indexAll')
}
// 获取市级列表
export const getCitys = provinceId => {
  return ax.g(`/deployManager/provinceAll/${provinceId}`)
}
// 获取大区列表
export const getQus = cityId => {
  return ax.g(`/deployManager/city/${cityId}`)
}
// 获取菜市场列表
export const getMarkets = areaId => {
  return ax.g(`/deployManager/areaMarket/${areaId}`)
}
// 查询城市详情
export const getCityInfo = cityId => {
  return ax.g(`/deployManager/cityInfo/${cityId}`)
}
// 查询区域详情
export const getQuInfo = areaId => {
  return ax.g(`/deployManager/area/${areaId}`)
}
// 查询菜市场信息
export const getMarketInfo = marketId => {
  return ax.g(`/deployManager/market/${marketId}`)
}
// 删除区域信息
export const delQu = areaId => {
  return ax.d(`/deployManager/area/${areaId}`)
}
// 删除菜市场
export const delMarket = marketId => {
  return ax.d(`/deployManager/market/${marketId}`)
}
// 修改城市详情
export const modfiyCityMessage = params => {
  return ax.p(`/deployManager/city`, params)
}
// 修改或新增区域
export const addQu = params => {
  return ax.p(`/deployManager/area`, params)
}
// 修改或新增Market
export const addMarket = params => {
  return ax.p(`/deployManager/market`, params)
}

// 骑士管理-培训管理
// 获取所有课程
export const getCourseTrain = params => {
  return ax.g(`/deliverManager/course`,params)
}
// 查询指定课程
// /deliverManager/course/{psTrainCourseId}
export const getCourseInfo = psTrainCourseId => {
  return ax.g(`/deliverManager/course/${psTrainCourseId}`)
}
// 增加课程
export const addCourse = params => {
  return ax.p(`/deliverManager/course`,params)
}
// 增加课程
export const delCourse = psTrainCourseId => {
  return ax.d(`/deliverManager/course/${psTrainCourseId}`)
}
/**骑士管理-课程审核 */
// 审核的骑士列表
// /deliverManager/course/psDeliverTraining
export const getCourseAuditList = params => {
  return ax.g(`/deliverManager/course/psDeliverTraining`,params)
}
// 骑士课程审核
export const auditCourse = params => {
  return ax.u(`/deliverManager/course/audit`,params)
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
export const getProvinceIndex = id => {
  return ax.g(`/deployManager/province/${id}`)
}

// 骑士管理 获取相关区域/deployManager/city/
export const getCityManager = id => {
  return ax.g(`/deployManager/city/${id}`)
}

// 骑士管理 获取相关菜市场/deployManager/areaMarket/
export const getAreaMarket = id => {
  return ax.g(`/deployManager/areaMarket/${id}`)
}

// 骑士管理 获取表单数据/User/index
export const getUserIndex = params => {
  return ax.g('/User/index', params)
}

// 未提交资料/deliverManager/unverified
export const getDeliverManager = params => {
  return ax.g('/deliverManager/unverified', params)
}

// 删除未提交资料/deliverManager/unverified/
export const deleteUnverified = id => {
  return ax.d(`/deliverManager/unverified/${id}`)
}

// 导出未提交资料数据/deliverManager/unverified/POI
export const exportUnverified = params => {
  return ax.g('/deliverManager/unverified/POI', params)
}

// 骑士审核列表数据/deliverManager/audit
export const getAuditManager = params => {
  return ax.g('/deliverManager/audit', params)
}

// 骑士审核通过/不通过/deliverManager/audit
export const getDeliverAudit = params => {
  return ax.u('/deliverManager/audit', params)
}

// 骑士审核查看基本信息/deliverManager/audit/
export const getSeeDeliver = ID => {
  return ax.g(`/deliverManager/audit/${ID}`)
}

// 配送人员列表数据GET /deliverManager/deliver
export const getDeliverList = params => {
  return ax.g('/deliverManager/deliver', params)
}

// 配送人员导出数据/deliverManager/deliver/POI
export const getDeliverPoi = params => {
  return ax.g('/deliverManager/deliver/POI', params)
}

// 配送人员冻结用户PUT /deliverManager/deliver/{deliverId}
export const getDeliverId = (params) => {
  return ax.u(`/deliverManager/deliver/`, params)
}

// 配送人员查看用户/deliverManager/deliver/
export const getDeliverInfo = id => {
  return ax.g(`/deliverManager/deliver/${id}`)
}

// 配送人员 查看用户 修改数据/deliverManager/deliver/updateDeliver
export const getUpdateDeliver = params => {
  return ax.u('/deliverManager/deliver/updateDeliver', params)
}

/**
 * @author Zeng FanLu
 * components 财务对账
 */

// 财务对账 查看列表/financial/financialShow
export const getFinanceList = params => {
  return ax.g('/financial/financialShow', params)
}

// 财务对账 导出列表信息/financial/financialShow/POI
export const getFinanceListExport = params => {
  return ax.g('/financial/financialShow/POI', params)
}

// 财务对账 导出快递员个人信息/financial/psDeliverOrderShow/POI
export const getFinanceOrderExport = params => {
  return ax.g('/financial/psDeliverOrderShow/POI', params)
}

// 财务对账 查看快递员个人列表/financial/psDeliverOrderShow
export const getFinanceOrderList = params => {
  return ax.g('/financial/psDeliverOrderShow', params)
}

/**
 * @description 设置模块相关功能点
 * @author Create By WuFengliang
 */

/**
 * 获取平台用户列表
 */
export const getUsersList = params => {
  return ax.g(`/settingCentre/user`, params)
}

/**
 * 删除用户
 */
export const deleteUser = params => {
  return ax.d(`/settingCentre/user/${params.psUserId}`)
}

/**
 * 查看用户
 */
export const lookUser = params => {
  return ax.g(`/settingCentre/user/${params.psUserId}`)
}

/**
 * 更新 或 添加 平台用户信息
 */
export const addOrPutUserInfo = params => {
  return ax.p(`/settingCentre/user`, params)
}

/**
 * 获取角色列表
 */
export const getRoleList = params => {
  return ax.g(`/settingCentre/Auth/role`, params)
}

/**
 * 获取指定角色信息
 */
export const getRoleInfo = params => {
  return ax.g(`/settingCentre/Auth/getRole`, params)
}

/**
 * 修改角色权限
 */
export const putRoleInfo = params => {
  return ax.u(`/settingCentre/Auth/role/updateRolePermission`, params)
}

/**
 * 查询指定角色权限列表
 */
export const getUserRoleList = () => {
  return ax.g(`/settingCentre/Auth/getRole`)
}

/**
 * 新增角色
 */
export const addUserRole = params => {
  return ax.p(`/settingCentre/Auth/role`, params)
}

/**
 * 获取操作日志
 */
export const getOperationLog = params => {
  return ax.g(`/settingCentre/log`, params)
}

/**
 * 导出操作日志
 */
export const downLoadLog = params => {
  return ax.g(`/settingCentre/log/poi`, params)
}

/**
 * 查询消息列表(非管理员)
 */
export const getAccountMsgList = params => {
  return ax.g(`/settingCentre/info`, params)
}

/**
 * 查询消息列表(管理员)
 */
export const getManageMsgList = params => {
  return ax.g(`/settingCentre/info/Manager`, params)
}

/**
 * 删除单个信息
 */
export const delSingleInfo = params => {
  return ax.d(`/settingCentre/info/${params.smMssageId}`)
}

/**
 * 查询单个信息
 */
export const getSingleInfo = params => {
  return ax.g(`/settingCentre/info/${params.smMssageId}`)
}

/**
 * 添加消息信息
 */
export const addSingleInfo = params => {
  return ax.p(`/settingCentre/info`, params)
}

/**
 * 更新单个消息
 */
export const putSingleInfo = params => {
  return ax.u(`/settingCentre/info`, params.params)
}

/**
 * @description 设置模块相关功能点
 * @author Create By WuFengliang
 */
