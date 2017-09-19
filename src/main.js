// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import resource from '../node_modules/vue-resource'
Vue.use(resource)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

Vue.http.interceptors.push((request,next)=>{
  next((response) => {
    if (!response.ok || response.resultCode != 0) {
      console.log("请求返回异常");
      vm.$router.push({name: 'error', query: {title: bizError}});
      return response;
    }
    return response
  });
})


