<template>
  <Menu theme="dark" @on-select="route" width="auto" :active-name="activeName" accordion>
    <MenuItem name="home">
      <Icon type="home" :size="iconSize"></Icon>
      <span class="layout-text">首页</span>
    </MenuItem>
    <!-- <Submenu name="">
      <template slot="title">
        <Icon type="ios-paper" :size="iconSize"></Icon>
        <span class="layout-text">订单管理</span>
      </template>
      <MenuItem name="order">订单管理</MenuItem>
    </Submenu> -->
    <MenuItem name="order">
      <Icon type="ios-paper" :size="iconSize"></Icon>
      <span class="layout-text">订单管理</span>
    </MenuItem>
    <Submenu name="">
      <template slot="title">
        <Icon type="ios-people" :size="iconSize"></Icon>
        <span class="layout-text">骑士管理</span>
      </template>
      <MenuItem name="cUncommitted">未提交资料</MenuItem>
      <MenuItem name="cAuditing">骑士审核</MenuItem>
      <!-- <MenuItem name="cTrain">培训管理</MenuItem> -->
      <MenuItem name="cPersonal">人员管理</MenuItem>
    </Submenu>
    <!-- <Submenu name="">
      <template slot="title">
        <Icon type="ios-gear" :size="iconSize"></Icon>
        <span class="layout-text">配置设置</span>
      </template>
      <MenuItem name="configuration">配置设置</MenuItem>
    </Submenu> -->
    <MenuItem name="configuration">
      <Icon type="ios-gear" :size="iconSize"></Icon>
      <span class="layout-text">配置设置</span>
    </MenuItem>

    <Submenu name="">
      <template slot="title">
        <Icon type="stats-bars" :size="iconSize"></Icon>
        <span class="layout-text">数据管理</span>
      </template>
      <MenuItem name="dataCenter">数据中心</MenuItem>
      <MenuItem name="dataDeliver">配送员数据</MenuItem>
    </Submenu>
    <Submenu name="">
      <template slot="title">
        <Icon type="settings" :size="iconSize"></Icon>
        <span class="layout-text">设置中心</span>
      </template>
      <MenuItem name="s_platform">平台用户</MenuItem>
      <MenuItem name="s_rbac">权限管理</MenuItem>
      <MenuItem name="s_rolelist">角色列表</MenuItem>
      <MenuItem name="s_operation">操作日志</MenuItem>
      <MenuItem name="s_message">消息管理</MenuItem>
      <MenuItem name="setting_message">消息</MenuItem>
    </Submenu>
    <Submenu name="">
      <template slot="title">
        <Icon type="person-stalker" :size="iconSize"></Icon>
        <span class="layout-text">分销管理</span>
      </template>
      <MenuItem name="d_extend">推广列表</MenuItem>
      <MenuItem name="d_list">分销列表</MenuItem>
    </Submenu>
    <!-- <Submenu name="">
      <template slot="title">
        <Icon type="person-stalker" :size="iconSize"></Icon>
        <span class="layout-text">财务对账</span>
      </template>
      <MenuItem name="finance">财务对账</MenuItem>
    </Submenu> -->
    <MenuItem name="finance">
      <Icon type="person-stalker" :size="iconSize"></Icon>
      <span class="layout-text">财务对账</span>
    </MenuItem>

  </Menu>
</template>
<script type='text/ecmascript-6'>
  export default {
    props: {
      spanLeft: {
        type: Number,
        default: 3
      }
    },
    computed: {
      activeName() {
        return this.$route.path.split('/')[1]
      },
      iconSize() {
        return this.spanLeft === 3 ? 14 : 24
      }
    },
    methods: {
      route(name) {
        console.debug(name)
        this.$router.push('/' + name)
      }
    }
  }
</script>
<style lang="css" scoped>

</style>
