/**
 * 2017/11/14
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 路由懒加载
 */

// 登录
const Login = resolve => {
  import('@/page/login/login').then(module => {
    resolve(module)
  })
}
// 404
const NotFound = resolve => {
  import('@/page/404').then(module => {
    resolve(module)
  })
}
// 主体
const Layout = resolve => {
  import('@/components/layout/layout').then(module => {
    resolve(module)
  })
}
// 首页
const Home = resolve => {
  import('@/page/home/home').then(module => {
    resolve(module)
  })
}
// 订单管理
const Order = resolve => {
  import('@/page/order/order').then(module => {
    resolve(module)
  })
}
// 订单详情
const OrderDetails = resolve => {
  import('@/page/order/orderDetails').then(module => {
    resolve(module)
  })
}
// 财务对账
const Finance = resolve => {
  import('@/page/finance/finance').then(module => {
    resolve(module)
  })
}
// 财务对账详情
const FinanceDetails = resolve => {
  import('@/page/finance/FinanceDetails').then(module => {
    resolve(module)
  })
}
// 分销列表
const d_list = resolve => {
  import('@/page/DRP/d_list').then(module => {
    resolve(module)
  })
}
// 分销详情
const DRP_info = resolve => {
  import('@/page/DRP/DRP_info').then(module => {
    resolve(module)
  })
}
// 推广列表
const d_extend = resolve => {
  import('@/page/DRP/d_extend').then(module => {
    resolve(module)
  })
}
// 推广详情
const extendinfo = resolve => {
  import('@/page/DRP/extendinfo').then(module => {
    resolve(module)
  })
}
// 数据中心
const dataCenter = resolve => {
  import('@/page/data/dataCenter').then(module => {
    resolve(module)
  })
}
// 配送员数据列表
const dataDeliver = resolve => {
  import('@/page/data/dataDeliver').then(module => {
    resolve(module)
  })
}
// 配送员数据详情
const dataDeliverDetails = resolve => {
  import('@/page/data/dataDeliverDetails').then(module => {
    resolve(module)
  })
}
// 骑士管理 -未提交资料
const cUncommitted = resolve => {
  import('@/page/cavalier/c_Uncommitted_data').then(module => {
    resolve(module)
  })
}
// 骑士管理 - 骑士审核
const cAuditing = resolve => {
  import('@/page/cavalier/c_auditing').then(module => {
    resolve(module)
  })
}
// 骑士管理 - 培训管理
const cTrain = resolve => {
  import('@/page/cavalier/c_train').then(module => {
    resolve(module)
  })
}
// 骑士管理 - 人员管理
const cPersonal = resolve => {
  import('@/page/cavalier/c_personal').then(module => {
    resolve(module)
  })
}
// 骑士管理 - 人员管理 -查看
const SeePersonal = resolve => {
  import ('@/page/cavalier/see_personal').then(module => {
    resolve(module)
  })
}

// 配置设置
const configuration = resolve => {
  import('@/page/configuration/configuration').then(module => {
    resolve(module)
  })
}
//配置设置-增加区域
const addregion = resolve => {
  import('@/page/configuration/addregion').then(module => {
    resolve(module)
  })
}
//配置设置-增加菜市场
const addmarket = resolve => {
  import('@/page/configuration/addmarket').then(module => {
    resolve(module)
  })
}
//配置设置-查看省
const shengInfo = resolve => {
  import('@/page/configuration/shengInfo').then(module => {
    resolve(module)
  })
}
//配置设置-查看市场
const marketInfo = resolve => {
  import('@/page/configuration/shengInfo').then(module => {
    resolve(module)
  })
}
//配置设置-查看城市
const cityInfo = resolve => {
  import('@/page/configuration/cityInfo').then(module => {
    resolve(module)
  })
}
//配置设置-查看区
const quInfo = resolve => {
  import('@/page/configuration/quInfo').then(module => {
    resolve(module)
  })
}
// 设置中心 - 平台用户
const s_platform = resolve => {
  import('@/page/settings/s_platform').then(module => {
    resolve(module)
  })
}
// 设置中心 - 平台用户 -新增用户
const adduser = resolve => {
  import('@/page/settings/adduser').then(module => {
    resolve(module)
  })
}
// 设置中心 - 平台用户 -查看用户详情
const userinfo = resolve => {
  import('@/page/settings/userinfo').then(module => {
    resolve(module)
  })
}
// 设置中心 - 权限管理
const s_rbac = resolve => {
  import('@/page/settings/s_rbac').then(module => {
    resolve(module)
  })
}
// 设置中心 - 查看用户权限
const s_rbac_chakan = resolve => {
  import('@/page/settings/s_rbac_chakan').then(module => {
    resolve(module)
  })
}
// 设置中心 - 角色列表
const s_rolelist = resolve => {
  import('@/page/settings/s_rolelist').then(module => {
    resolve(module)
  })
}
// 设置中心 - 查看角色信息
const roleinfo = resolve => {
  import('@/page/settings/roleinfo').then(module => {
    resolve(module)
  })
}
// 设置中心 - 新增角色
const addrole = resolve => {
  import('@/page/settings/addrole').then(module => {
    resolve(module)
  })
}

// 设置中心 - 操作日志
const s_operation = resolve => {
  import('@/page/settings/s_operation').then(module => {
    resolve(module)
  })
}
// 设置中心 - 查看日志
const s_operation_info = resolve => {
  import('@/page/settings/s_operation_info').then(module => {
    resolve(module)
  })
}
// 设置中心 - 消息管理
const s_message = resolve => {
  import('@/page/settings/s_message').then(module => {
    resolve(module)
  })
}
// 设置中心 - 消息管理-新增消息
const addmessage = resolve => {
  import('@/page/settings/addmessage').then(module => {
    resolve(module)
  })
}
// 设置中心 - 消息
const setting_message = resolve => {
  import('@/page/settings/settingMessage').then(module => {
    resolve(module)
  })
}
// 设置中心 -消息 -详情
const settingMessageDetail = resolve => {
  import('@/page/settings/settingMessageDetail').then(module => {
    resolve(module)
  })
}

export default [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    component: NotFound
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: Home
      },
      {
        path: '/order',
        component: Order
      },
      {
        path: '/order/:id',
        component: OrderDetails
      },
      {
        path: '/finance',
        component: Finance
      },
      {
        path: '/finance/:id',
        component: FinanceDetails
      },
      {
        path: '/d_extend',
        component: d_extend
      },
      {
        path: '/d_extend/:id',
        component: extendinfo
      },
      {
        path: '/d_list',
        component: d_list
      },
      {
        path: '/d_list/:id',
        component: DRP_info
      },
      {
        path: '/dataCenter',
        component: dataCenter
      },
      {
        path: '/dataDeliver',
        component: dataDeliver
      },
      {
        path: '/dataDeliver/:id',
        component: dataDeliverDetails
      },
      {
        path: '/cUncommitted',
        component: cUncommitted
      },
      {
        path: '/cAuditing',
        component: cAuditing
      },
      {
        path: '/cTrain',
        component: cTrain
      },
      {
        path: '/cPersonal',
        component: cPersonal
      },
      {
        path: '/cPersonal/:id',
        component: SeePersonal
      },
      {
        path: '/configuration',
        component: configuration
      },
      {
        path: '/addregion',
        component: addregion
      },
      {
        path: '/addmarket',
        component: addmarket
      },
      {
        path: '/marketInfo',
        component: marketInfo
      },
      {
        path: '/cityInfo',
        component: cityInfo
      },
      {
        path: '/shengInfo',
        component: shengInfo
      },
      {
        path: '/quInfo',
        component: quInfo
      },
      {
        path: '/s_platform',
        component: s_platform
      },
      {
        path: '/adduser',
        component: adduser
      },
      {
        path: '/s_platform/:id',
        component: userinfo
      },
      {
        path: '/s_rbac',
        component: s_rbac
      },
      {
        path: '/s_rbac/:id',
        component: s_rbac_chakan
      },
      {
        path: '/s_rolelist',
        component: s_rolelist
      },
      {
        path: '/s_rolelist/roleinfo',
        component: roleinfo
      },
      {
        path: '/s_rolelist/addrole',
        component: addrole
      },
      {
        path: '/s_operation',
        component: s_operation
      },
      {
        path: '/s_operation/:id',
        component: s_operation_info
      },
      {
        path: '/s_message',
        component: s_message
      },
      {
        path: '/s_message/toEidt/:smMssageId',
        component: addmessage
      },
      {
        path: '/s_message/addmessage',
        component: addmessage
      },
      {
        path: '/setting_message',
        component: setting_message
      },
      {
        path: '/setting_message/:smMssageId',
        component: settingMessageDetail
      }
    ]
  }
]
