/**
 * 2017/10/16
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: axios底层的封装
 */
import axios from 'axios'
import config from '../../config/config.js'
import qs from 'qs'
import iview from 'iview'
import * as ac from '../data/index.js'

var URI = config.apiDomain

var ax = axios.create({
  baseURL: URI,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    TOKEN: ''
  }
})

export const itr = (type, url, params) => {
  if (typeof params !== 'object') {
    params = {}
  }
  let arg = qs.stringify(params)
  if (Object.keys(params).length > 0) {
    url =
      type === 'get' || type === 'delete' || type === 'patch'
        ? url + '?' + arg
        : url
  }
  var userInfo = ac.getData('userInfo')
  var token = ''
  if (userInfo) {
    userInfo = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo
    token = userInfo.token ? userInfo.token : ''
  }
  ax.defaults.headers.TOKEN = token
  return ax[type](url, params)
}

export const g = (url, params) => {
  return base('get', url, params)
}

export const p = (url, params) => {
  return base('post', url, params)
}

export const d = (url, params) => {
  return base('delete', url, params)
}

export const u = (url, params) => {
  return base('put', url, params)
}
export const pa = (url, params) => {
  return base('patch', url, params)
}

export const op = (url, params) => {
  return base('options', url, params)
}
// 上传地址
export const uploadUrl = config.imgUpload

export function base(type, url, params) {
  return new Promise((resolve, reject) => {
    itr(type, url, params)
      .then(response => {
        if (response.data.code === 200) {
          resolve(response.data.data)
        } else {
          iview.Notice.error({
            title: '操作失败',
            desc: `<p><span style="color:#ff3300">${response.data
              .code}</span>&nbsp;&nbsp;${response.data.msg}</p>`
          })
          reject(response.data.msg)
        }
      })
      .catch(msg => {
        if (msg) {
          iview.Notice.error({
            title: '网络访问错误',
            desc: msg
          })
        }
        // reject(msg)
      })
  })
}
