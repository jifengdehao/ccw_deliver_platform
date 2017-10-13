<template>
  <div id="header">
    <Row>
      <Col span="3">
          <div class="logo">菜城科技有限公司</div>
      </Col>
      <Col span="12">
      <div class="message">系统消息：2017-8-8 XXXXXX市场XXXX菜市场XXX暂时暂停配送</div>
      </Col>
      <Col span="3">
            <Icon type="android-person" :size="iconSize"></Icon>&nbsp;&nbsp;管理员：{{username}}
      </Col>
      <Col span="3">
          <Icon type="ios-chatboxes-outline" :size="iconSize"></Icon>&nbsp;&nbsp;消息
      </Col>
      <Col span="3" @click="loginout()">
          <Icon type="log-out" :size="iconSize"></Icon>&nbsp;&nbsp;安全退出
      </Col>
    </Row>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      iconSize:'18'
    }
  },
  computed: {
    username() {
      return JSON.parse(sessionStorage.getItem('user')).username
    }
  },
  methods: {
    loginout() {
      sessionStorage.removeItem('user')
      this.$router.push('/Login')
    }
  }
}
</script>
<style lang="less" scoped>
#header {
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  background: #495060;
  height: 60px;
  line-height: 60px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  .logo{
    font-size: 16px;
  }
}
</style>
