<template>
    <div id="settings" class="main">
      <main-header>
        <span slot="h3">设置中心</span>
      </main-header>
      <section>
        <p style="height: 60px; line-height: 60px; font-size: 20px">版本号：Cc1.0</p>
          <div class="fl" style="margin-left: 30px;margin-top: 10px;">
            <div class="settings_this">
              <p>本次登陆时间：2017-08-03  8:47:30</p>
              <p>本次登陆时长：5分钟</p>
              <p>本次登陆IP：121.11.61.210（广东省广州市）</p>
              <p>本次登录设备：W的Mac（Mac版）</p>
            </div>
          </div >
          <div class="fl" style="margin-left: 30px;margin-top: 10px">
            <div class="settings_last">
              <p>上次登陆时间：2017-08-02  8:47:30</p>
              <p>上次登陆时长：1小时</p>
              <p>上次登陆IP：121.11.61.210（广东省广州市）</p>
              <p>上次登录设备：W的Mac（Mac版）</p>
            </div>
          </div>
      </section>
    </div>
</template>
<script>
  import mainHeader from '../../components/header/main_header.vue'
    export default {
        components: {mainHeader},
        data() {
            return {}
        },
        methods: {
            getCurrentDate() {
                return new Date().toLocaleDateString()
            }
        }
    }
</script>
<style lang="less" scoped>
  #settings{
    .settings_this,.settings_last{
      width: 480px;
      height: 235px;
      text-align: left;
      font-size: 16px;
      line-height: 33px;
      margin: 0 auto;
      padding: 20px 10px 0 20px;
      background-color: #fff;
    }
  }

</style>
