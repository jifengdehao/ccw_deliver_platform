import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import Router from 'vue-router'
import Iview from 'iview'
Vue.use(Iview)
import '../../node_modules/iview/dist/styles/iview.css'
import '../../node_modules/iview/dist/iview.js'
Vue.use(Router)

import Login from '@/components/login/login' //登录页
import home from '@/page/home/home.vue' //主页
import order from '@/page/order/order.vue' //订单管理
import o_checkorder from '@/page/order/o_checkorder.vue' //查看订单信息
import cavalier from '@/page/cavalier/cavalier.vue' //骑士管理
import cAuditing from '@/page/cavalier/c_auditing.vue' //骑士审核
import c_message from '@/page/cavalier/c_message.vue' //查看骑士信息
import cPersonal from '@/page/cavalier/c_personal.vue' //骑士-人员管理
import cTrain from '@/page/cavalier/c_train.vue' //培训管理
import courseTrain from '@/page/cavalier/courseTrain.vue' //培训管理-课程管理
import addcourse from '@/page/cavalier/addcourse.vue' //培训管理-课程管理-增加
import courseinfo from '@/page/cavalier/courseinfo.vue' //培训管理-课程管理=查看

import courseAudit from '@/page/cavalier/courseAudit.vue' //培训管理-课程审核
import cA_pass from '@/page/cavalier/cA_pass.vue' //培训管理-课程审核-通过
import cA_notpass from '@/page/cavalier/cA_notpass.vue' //培训管理-课程审核-未通过
import cA_pendingAudit from '@/page/cavalier/cA_pendingAudit.vue' //培训管理-课程审核-待审核

import configuration from '@/page/configuration/configuration.vue' //配置设置
import addregion from '@/page/configuration/addregion.vue' //配置设置-增加区域
import addmarket from '@/page/configuration/addmarket.vue' //配置设置-增加菜市场
import shengInfo from '@/page/configuration/shengInfo.vue' //配置设置-查看省
import marketInfo from '@/page/configuration/marketInfo.vue' //配置设置-查看市场
import cityInfo from '@/page/configuration/cityInfo.vue' //配置设置-查看城市
import quInfo from '@/page/configuration/quInfo.vue' //配置设置-查看区
import d_peisong from '@/page/dateCenter/d_peisong.vue' //数据中心-配送员数据
import dateCenter from '@/page/dateCenter/dateCenter.vue' //数据中心
import s_platform from '@/page/settings/s_platform.vue' //平台用户
import cUncommitted from '@/page/cavalier/c_Uncommitted_data.vue' //骑士-未提交资料
import adduser from '@/page/settings/adduser.vue' //设置-增加用户
import userinfo from '@/page/settings/userinfo.vue' //设置-用户信息
import s_rbac from '@/page/settings/s_rbac.vue' //设置-权限管理
import s_rbac_chakan from '@/page/settings/s_rbac_chakan.vue' //设置-查看权限
import settings from '@/page/settings/settings.vue' //设置
import s_rolelist from '@/page/settings/s_rolelist.vue' //设置-角色列表
import addrole from '@/page/settings/addrole.vue' //设置-添加角色
import roleinfo from '@/page/settings/roleinfo.vue' //设置-角色信息
import s_operation from '@/page/settings/s_operation.vue' //设置-操作日志
import s_operation_info from '@/page/settings/s_operation_info.vue' //设置-操作日志-查看日志信息
import s_message from '@/page/settings/s_message.vue' //设置-消息管理
import addmessage from '@/page/settings/addmessage.vue' //设置-消息管理-新增消息
import d_extend from '@/page/DRP/d_extend.vue' //推广列表
import d_list from '@/page/DRP/d_list.vue' //分销列表
import extendinfo from '@/page/DRP/extendinfo.vue' //分销列表
import DRP_info from '@/page/DRP/DRP_info.vue' //分销列表

export default new Router({
  routes: [{
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/o_checkorder',
      name: 'o_checkorder',
      component: o_checkorder
    },
    {
      path: '/cavalier',
      name: 'cavalier',
      component: cavalier
    },
    {
      path: '/cAuditing',
      name: 'cAuditing',
      component: cAuditing
    },
    {
      path: '/c_message',
      name: 'c_message',
      component: c_message
    },
    {
      path: '/cPersonal',
      name: 'cPersonal',
      component: cPersonal
    },
    {
      path: '/cTrain',
      name: 'cTrain',
      component: cTrain
    },
    {
      path: '/courseTrain',
      name: 'courseTrain',
      component: courseTrain
    },
    {
      path: '/addcourse',
      name: 'addcourse',
      component: addcourse
    }, {
      path: '/courseinfo',
      name: 'courseinfo',
      component: courseinfo
    },
    {
      path: '/cA_pass',
      name: 'cA_pass',
      component: cA_pass
    },
    {
      path: '/cA_notpass',
      name: 'cA_notpass',
      component: cA_notpass
    },
    {
      path: '/cA_pendingAudit',
      name: 'cA_pendingAudit',
      component: cA_pendingAudit
    },
    {
      path: '/courseAudit',
      name: 'courseAudit',
      component: courseAudit
    },
    {
      path: '/cUncommitted',
      name: 'cUncommitted',
      component: cUncommitted
    },
    {
      path: '/configuration',
      name: 'configuration',
      component: configuration
    },
    {
      path: '/addregion',
      name: 'addregion',
      component: addregion
    },
    {
      path: '/addmarket',
      name: 'addmarket',
      component: addmarket
    },
    {
      path: '/marketInfo',
      name: 'marketInfo',
      component: marketInfo
    },
    {
      path: '/cityInfo',
      name: 'cityInfo',
      component: cityInfo
    },
    {
      path: '/shengInfo',
      name: 'shengInfo',
      component: shengInfo
    },
    {
      path: '/quInfo',
      name: 'quInfo',
      component: quInfo
    },
    {
      path: '/d_peisong',
      name: 'd_peisong',
      component: d_peisong
    },
    {
      path: '/s_platform',
      name: 's_platform',
      component: s_platform
    },
    {
      path: '/settings',
      name: 'settings',
      component: settings
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: userinfo
    },
    {
      path: '/adduser',
      name: 'adduser',
      component: adduser
    },
    {
      path: '/s_rbac',
      name: 's_rbac',
      component: s_rbac
    },
    {
      path: '/s_rbac_chakan',
      name: 's_rbac_chakan',
      component: s_rbac_chakan
    },
    {
      path: '/s_rolelist',
      name: 's_rolelist',
      component: s_rolelist
    },
    {
      path: '/addrole',
      name: 'addrole',
      component: addrole
    },
    {
      path: '/roleinfo',
      name: 'roleinfo',
      component: roleinfo
    },
    {
      path: '/s_operation',
      name: 's_operation',
      component: s_operation
    },
    {
      path: '/s_operation_info',
      name: 's_operation_info',
      component: s_operation_info
    },
    {
      path: '/s_message',
      name: 's_message',
      component: s_message
    },
    {
      path: '/addmessage',
      name: 'addmessage',
      component: addmessage
    },
    {
      path: '/d_extend',
      name: 'd_extend',
      component: d_extend
    },
    {
      path: '/extendinfo',
      name: 'extendinfo',
      component: extendinfo
    },
    {
      path: '/d_list',
      name: 'd_list',
      component: d_list
    },
    {
      path: '/DRP_info',
      name: 'DRP_info',
      component: DRP_info
    },

  ]
})
