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
