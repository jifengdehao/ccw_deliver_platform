// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store  from './vuex/store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import AMap from 'vue-amap'
Vue.use(AMap)
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
// 地图初始化
AMap.initAMapApiLoader({
  key: 'e563b2d92da0e671be2ad274eaa35752',
  plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'CircleEditor','DistrictSearch']
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})


