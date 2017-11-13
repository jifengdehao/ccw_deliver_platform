<template>
  <div id="s_operation_info" class="main" :class="{'isShow':show}">
    <main-header :title="title">
      <!-- <span slot="h3">操作日志</span> -->
    </main-header>
    <section class="s_operation_infolist">
      <p>用户ID： Ca1234</p>
      <p>姓名： 应浦和</p>
      <p>性别： 男</p>
      <p>联系方式： 12345678</p>
      <p>邮箱地址： 1234567@163.com</p>
      <p>角色名称：站长</p>
      <p>所属市区：广州市</p>
      <p>所属省区：广东省</p>
      <p>所属菜市场：番禺菜市场</p>
      <p>所属区域：番禺区</p>
      <p>本次登陆时间：2017-08-03 8:47:30</p>
      <p>上次登陆时间：2017-08-02 8:47:30</p>
      <p>在线时长：5分钟</p>
      <p>上次登陆时长：1小时</p>
      <p>本次登录IP：121.11.61.210（广东省广州市）</p>
      <p>上次登录IP：121.11.61.210（广东省广州市）</p>
      <p>本次登录设备：W的Mac（Mac版）</p>
      <p>上次登录设备：W的Mac（Mac版）</p>
      <p>操作时间：2017-08-03 11:35:40</p>
      <div class="s_operation_info_record fl">
        操作记录：
        <p>
          <Breadcrumb>
            <BreadcrumbItem>订单管理</BreadcrumbItem>
            <BreadcrumbItem>新订单</BreadcrumbItem>
            <BreadcrumbItem>重抛</BreadcrumbItem>
            <BreadcrumbItem>（订单号）</BreadcrumbItem>
          </Breadcrumb>

          <span>时间：2017-08-03 11:35:40</span>
        </p>
      </div>
    </section>

  </div>
</template>
<script>
import mainHeader from '../../components/header/main_header.vue'
export default {
  components: { mainHeader },
  data() {
    return {
      title:'日志详情'
    }
  },
  computed: {
    show() {
      return this.$store.state.show
    }
  },
  methods: {
    getCurrentDate() {
      return new Date().toLocaleDateString()
    }
  }
}
</script>
<style lang="less" scoped>
#s_operation_info {
  .s_operation_infolist {
    width: 66.6%;
    padding-left: 20px;
    p {
      width: 50%;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      float: left;
      text-align: left;
      &:last-of-type {
        float: right;
      }
    }
  }
  .s_operation_info_record {
    font-size: 16px;
    padding-left: 30px;
    padding-top: 30px;
    p {
      width: 520px;
      height: 210px;
      border: 1px solid #aaa;
      padding-left: 10px;
    }
  }
}
</style>
