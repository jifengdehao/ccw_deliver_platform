/**
 * 2017/10/16
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: cookie封装
 */
import Cookie from 'js-cookie'

export const setData = (key, values) => {
  Cookie.set(key, values)
}

export const getData = (key) => {
  return Cookie.get(key)
}

export const delData = (key) => {
  Cookie.remove(key)
}

export const userInfo = () => {
  let user = getData('userInfo')
  return JSON.parse(user)
}
