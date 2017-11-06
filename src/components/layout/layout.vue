<template>
  <div id="layout">
    <m-header></m-header>
    <div class="layout-content">
      <Row type="flex" style="height: 100%;">
        <Col :span="spanLeft" :class="{'layout-hide-text': spanLeft < 3}" class="sidebar">
        <div class="close-menu" @click="toggleClick()">
          <Icon type="navicon-round" :size="iconSize"></Icon>
        </div>
        <Menu theme="dark" @on-select="route" width="auto" :active-name="activeName">
          <MenuItem name="home">
            <Icon type="home" :size="iconSize"></Icon>
            <span class="layout-text">首页</span>
          </MenuItem>
          <Submenu name="">
            <template slot="title">
              <Icon type="ios-paper" :size="iconSize"></Icon>
              <span class="layout-text">订单管理</span>
            </template>
            <MenuItem name="order">订单管理</MenuItem>
          </Submenu>
          <Submenu name="">
            <template slot="title">
              <Icon type="ios-people" :size="iconSize"></Icon>
              <span class="layout-text">骑士管理</span>
            </template>
            <MenuItem name="cavalier">骑士管理</MenuItem>
            <MenuItem name="cUncommitted">未提交资料</MenuItem>
            <MenuItem name="cAuditing">骑士审核</MenuItem>
            <MenuItem name="cPersonal">人员管理</MenuItem>
          </Submenu>
          <Submenu name="">
            <template slot="title">
              <Icon type="ios-gear" :size="iconSize"></Icon>
              <span class="layout-text">配置设置</span>
            </template>
            <MenuItem name="configuration">配置设置</MenuItem>
            <MenuItem name="3-5">查看</MenuItem>
          </Submenu>
          <Submenu name="">
            <template slot="title">
              <Icon type="stats-bars" :size="iconSize"></Icon>
              <span class="layout-text">数据中心</span>
            </template>
            <MenuItem name="d_peisong">配送员数据</MenuItem>
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
          </Submenu>
          <Submenu name="">
            <template slot="title">
              <Icon type="person-stalker" :size="iconSize"></Icon>
              <span class="layout-text">分销管理</span>
            </template>
            <MenuItem name="d_extend">推广列表</MenuItem>
            <MenuItem name="d_list">分销列表</MenuItem>
          </Submenu>
        </Menu>
        </Col>
        <Col :span="spanRight" style="overflow-y: scroll;padding: 40px;">
        <router-view></router-view>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
  import mHeader from '@/components/header/header'
  import mMenu from '@/components/menu/menu'

  export default {
    name: 'layout',
    data() {
      return {
        spanLeft: 3,
        spanRight: 21
      }
    },
    computed: {
      iconSize() {
        return this.spanLeft === 3 ? 14 : 24
      },
      activeName() {
        return this.$route.path.split('/')[1]
      }
    },
    methods: {
      toggleClick() {
        if (this.spanLeft === 3) {
          this.spanLeft = 1
          this.spanRight = 23
        } else {
          this.spanLeft = 3
          this.spanRight = 21
        }
      },
      route(name) {
        console.log(name)
        this.$router.push('/' + name);
      }
    },
    components: {
      mHeader,
      mMenu
    }
  }
</script>
<style lang="less" scoped type="text/less">
  #layout {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;

    .layout-content {
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .layout-hide-text {
      .layout-text,
      .ivu-menu-item-group-title {
        display: none;
      }
    }
    .ivu-menu-item,
    .ivu-menu-submenu {
      text-align: center;
    }

    .ivu-menu-item {
      padding: 14px 24px !important;
    }

    .ivu-menu-item > i,
    .ivu-menu-submenu-title > i {
      margin-right: 0;
    }

    .sidebar {
      background: #363e4f;
    }

    .ivu-col {
      transition: width .2s ease-in-out;
    }

    .close-menu {
      padding: 14px 24px;
      width: 100%;
      text-align: center;
      color: #fff;
      cursor: pointer;
      background: #495060;
    }

  }
</style>
