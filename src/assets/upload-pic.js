/*
 * @Author: ZengFanlu
 * @Date: 2017-11-13 15:46:12
 * DeveloperMailbox:   zengfanlu@ccw163.com
 * FunctionPoint: 上传图片封装
 */
export function uploadpic(file) {
  var client = {}
  var ossInfo
  // 获取guid 生成不同链接地址
  function guid() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    )
  }

  function Ajax() {
    var xmlHttpReq = null // 声明一个空对象用来装入XMLHttpRequest
    if (window.ActiveXObject) {
      // IE5 IE6是以ActiveXObject的方式引入XMLHttpRequest的
      xmlHttpReq = new XMLHttpRequest()
    } else if (window.XMLHttpRequest) {
      // 除IE5 IE6 以外的浏览器XMLHttpRequest是window的子对象
      xmlHttpReq = new XMLHttpRequest() // 实例化一个XMLHttpRequest
    }
    if (xmlHttpReq != null) {
      // 如果对象实例化成功
      xmlHttpReq.open(
        'GET',
        'http://gateway.caichengwang.com/oss/stsToken/roleSessionName',
        false
      ) // 调用open()方法并采用异步方式
      xmlHttpReq.setRequestHeader(
        'Content-type',
        'application/json;charset=UTF-8'
      )
      xmlHttpReq.onreadystatechange = RequestCallBack // 设置回调函数
      xmlHttpReq.send(null) // 因为使用get方式提交，所以可以使用null参调用
    }

    function RequestCallBack() {
      // 一旦readyState值改变，将会调用这个函数
      if (xmlHttpReq.readyState === 4) {
        if (xmlHttpReq.status === 200) {
          // 将xmlHttpReq.responseText的值赋给ID为 resText 的元素
          ossInfo = JSON.parse(xmlHttpReq.response).data
        }
      }
    }
  }
  Ajax()

  // 初始化数据
  var OSS = require('ali-oss')
  // 上传图片初始化
  client = new OSS.Wrapper({
    region: 'oss-cn-shenzhen',
    accessKeyId: ossInfo.accessKeyId,
    accessKeySecret: ossInfo.accessKeySecret,
    stsToken: ossInfo.securityToken,
    bucket: 'ccw-tech-test'
  })
  // 根据guid命名图片的名字
  var imgName = guid()
  var storeAs = '/images/' + imgName + '.' + file.name.split('.').splice(-1)
  // 限制图片大小 2097152 2GB
  if (file.type.indexOf('image/') > -1 && file.size < 5242880) {
    // 上传图片
    return client
      .multipartUpload(storeAs, file)
      .then(result => {
        return result.res.requestUrls
      })
      .catch(function(err) {
        return err
      })
  } else if (file.name.lastIndexOf('.apk') > 0 && file.size < 5242880 * 20) {
    return client
      .multipartUpload(storeAs, file)
      .then(result => {
        return result.res.requestUrls
      })
      .catch(function(err) {
        return err
      })
  } else {
    alert('上传图片大小在5MB以内')
    return false
  }
}
