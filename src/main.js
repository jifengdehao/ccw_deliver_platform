// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store  from './vuex/store'
import resource from 'vue-resource'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(resource)
Vue.use(iView)

/**
 * 路由验证是否已经登录
 */
router.beforeEach((to, from, next) => {
  let path = to.path.substr(1)
  let user = window.sessionStorage.getItem('user')
  if (path !== 'login') {
    if (!user) {
      next('/login')
      return false
    }
  } else {
    if (user) {
      next('/')
      return false
    }
  }
  iView.LoadingBar.start()
  next()
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
  iView.LoadingBar.finish()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})


