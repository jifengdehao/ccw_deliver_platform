<template>
  <div id="s_operation_info" class="main" :class="{'isShow':show}">
    <!-- 头部 -->
    <!--<div class="header">-->
      <!--<h2>操作日志</h2>-->
    <!--</div>-->
    <main-header :title="title"></main-header>
    <section class="s_operation_infolist">
      <p><span>用户ID&nbsp;&nbsp;:&nbsp;&nbsp;</span>Ca1234</p>
      <p><span>姓名&nbsp;&nbsp;:&nbsp;&nbsp;</span>应浦和</p>
      <p><span>性别&nbsp;&nbsp;:&nbsp;&nbsp;</span>男</p>
      <p><span>联系方式&nbsp;&nbsp;:&nbsp;&nbsp;</span>12345678</p>
      <p><span>邮箱地址&nbsp;&nbsp;:&nbsp;&nbsp;</span>1234567@163.com</p>
      <p><span>角色名称&nbsp;&nbsp;:&nbsp;&nbsp;</span>长</p>
      <p><span>所属市区&nbsp;&nbsp;:&nbsp;&nbsp;</span>州市</p>
      <p><span>所属省区&nbsp;&nbsp;:&nbsp;&nbsp;</span>东省</p>
      <p><span>所属菜市场&nbsp;&nbsp;:&nbsp;&nbsp;</span>禺菜市场</p>
      <p><span>所属区域&nbsp;&nbsp;:&nbsp;&nbsp;</span>禺区</p>
      <p><span>本次登陆时间&nbsp;&nbsp;:&nbsp;&nbsp;</span>017-08-03 8:47:30</p>
      <p><span>上次登陆时间&nbsp;&nbsp;:&nbsp;&nbsp;</span>017-08-02 8:47:30</p>
      <p><span>在线时长&nbsp;&nbsp;:&nbsp;&nbsp;</span>分钟</p>
      <p><span>上次登陆时长&nbsp;&nbsp;:&nbsp;&nbsp;</span>小时</p>
      <p><span>本次登录IP&nbsp;&nbsp;:&nbsp;&nbsp;</span>21.11.61.210（广东省广州市）</p>
      <p><span>上次登录IP&nbsp;&nbsp;:&nbsp;&nbsp;</span>21.11.61.210（广东省广州市）</p>
      <p><span>本次登录设备&nbsp;&nbsp;:&nbsp;&nbsp;</span>的Mac（Mac版）</p>
      <p><span>上次登录设备&nbsp;&nbsp;:&nbsp;&nbsp;</span>的Mac（Mac版）</p>
      <p><span>操作时间&nbsp;&nbsp;:&nbsp;&nbsp;</span>017-08-03 11:35:40</p>
      <div class="s_operation_info_record fl">
        <span>操作记录：</span>
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
<style lang="css" scoped>
.header {
  height: 40px;
  line-height: 40px;
  background-color: #363e54;
}

.main .header h2 {
  float: left;
  color: #fff;
  margin-left: 20px;
}

.s_operation_infolist {
  width: 66.6%;
  padding-left: 20px;
}
.s_operation_infolist p {
  width: 50%;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  float: left;
  text-align: left;
}

.s_operation_infolist > p > span {
  display: inline-block;
  width: 130px;
  text-align: right;
}

.s_operation_infolist p:last-of-type {
  float: right;
}

.s_operation_info_record {
  font-size: 16px;
  padding-top: 30px;
}

.s_operation_info_record > span {
  display: inline-block;
  width: 130px;
  text-align: right;
}

.s_operation_info_record p {
  width: 520px;
  height: 210px;
  border: 1px solid #aaa;
  padding-left: 10px;
}
</style>
