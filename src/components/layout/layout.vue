<template>
  <div id="layout">
    <m-header></m-header>
    <div class="layout-content">
      <Row type="flex" style="height: 100%;">
        <Col :class="{'layout-hide-text': spanLeft < 3}" class="sidebar" :xs="spanLeft" :sm="spanLeft" :md="spanLeft" :lg="spanLeft">
        <div class="close-menu" @click="toggleClick()">
          <Icon type="navicon-round" :size="iconSize"></Icon>
        </div>
        <m-menu :spanLeft="spanLeft"></m-menu>
        </Col>
        <Col style="overflow-y: scroll;padding: 40px;height:100%;" :xs="spanRight" :sm="spanRight" :md="spanRight" :lg="spanRight">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
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
  components: {
    mHeader,
    mMenu
  },
  computed: {
    iconSize() {
      return this.spanLeft === 3 ? 14 : 24
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
    }
  }
}
</script>
<style lang="less" type="text/less">
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
    .ivu-menu-item > i:first-child,
    .ivu-menu-submenu-title > i:first-child {
      margin-right: 0;
    }
    .ivu-menu-submenu-title > i:last-child {
      margin-right: 10px;
    }
    .ivu-menu-item,
    .ivu-menu-submenu {
      text-align: center;
    }
    .ivu-menu .ivu-menu-item {
      padding-left: 26px;
    }
  }
  .sidebar {
    background: #363e4f;
  }

  .sidebar {
    background: #363e4f;
  }

  .ivu-col {
    transition: width 0.2s ease-in-out;
  }

  .close-menu {
    height: 49px;
    line-height: 49px;
    width: auto;
    text-align: center;
    color: #fff;
    cursor: pointer;
    background: #495060;
  }
}
</style>
