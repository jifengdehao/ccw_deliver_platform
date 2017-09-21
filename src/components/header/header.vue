<template>
  <div id="header">
    <div class="layout-ceiling">
      <div class="H_left fl">
        <div class="logo fl"></div>
        <p class="fr">配送管理后台</p>
      </div>
      <div class="H_center fl"> 系统消息：2017-8-8 XXXXXX市场XXXX菜市场XXX暂时暂停配送</div>
      <div class="layout-ceiling-main">
        <span>
          <Icon class="H_icon" type="android-person"></Icon>管理员：
          <b>{{username}}</b>
        </span>
        <span>
          <Icon class="H_icon" type="ios-chatboxes-outline"></Icon>消息</span>
        <span @click="loginout()">
          <Icon class="H_icon" type="log-out" @click="loginout()"></Icon>安全退出</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {

  data() {
    return {

    }
  },

  computed: {
    username() {
      return this.$store.state.username
    },
  },
  mounted() {
    this.$store.commit("showusermane");

  },

  methods: {
    getCurrentDate() {
      return new Date().toLocaleDateString()
    },
    loginout() {
      sessionStorage.removeItem('userinfo');
      this.$router.push('/Login')
    }
  }
}

</script>
<style lang="less" scoped>
#header {
  border: 1px solid #d7dde4;
  position: relative;
  border-radius: 4px;
}

.layout-ceiling {
  height: 90px;
  line-height: 90px;
  background: rgba(181, 178, 179, 0.72);
  padding: 10px 0;
  overflow: hidden;
  .H_left {
    width: 20%;
    height: 100%;
    line-height: 70px;
    font-size: 16px;
    font-weight: 700;
    margin-left: 10px;
    padding: 5px;
    .logo {
      position: relative;
      width: 40%;
      height: 100%;
      border-right: 1px solid #ffffff;
    }
    p {
      width: 60%;
    }
  }
  .H_center {
    /*position: absolute;*/
    margin-top: 7px;
    margin-left: 20px;
    width: 30%;
    height: 55px;
    line-height: 55px;
    background-color: #fff;
    border-radius: 5px;
  }
}

.layout-ceiling-main {
  width: 40%;
  float: right;
  margin-right: 15px;
}

.layout-ceiling-main span {
  font-size: 16px;
  margin: 0 3.5%;
  color: rgb(28, 25, 29);
  .H_icon {
    font-size: 26px;
    margin-right: 5px;
  }
}
</style>
