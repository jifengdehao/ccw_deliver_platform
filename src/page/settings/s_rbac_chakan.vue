/*
 * @Author: WuFengliang 
 * @Date: 2017-11-03 15:49:25 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint: 权限管理查看 
 */
<template>
  <div>
    <div class="header">
      <h2>权限管理</h2>
    </div>
    <div v-if="data">
      <ul class="fl first">
      <li><span>用户ID:</span>{{data.user.psUserId}}</li>
      <li><span>性别:</span>{{data.user.sex}}</li>
      <li><span>邮箱地址:</span>{{data.user.email}}</li>
      <li><span>所属菜市场:</span>{{data.marketName}}</li>
      <li><span>姓名:</span>{{data.user.userName}}</li>
    </ul>
    <ul class="fl">
      <li><span>联系方式:</span>{{data.user.mobileno}}</li>
      <li><span>角色名称:</span>{{data.user.role}}</li>
      <li><span>所属省区:</span>{{data.user.provinceId}}</li>
      <li><span>所属市区:</span>{{data.user.cityId}}</li>
      <li><span>所属区域:</span>{{data.user.areaName}}</li>
    </ul>
    </div>
  </div>
</template>
<script>
import * as http from '@/api/common'
export default {
  name: 'authDetailLook',
  data() {
    return {
      data: null, //  数据集合
      params: {
        psUserId: null
      }
    }
  },
  computed: {
    show() {
      return this.$store.state.show
    }
  },
  created() {
    this.getUserInfoData()
  },
  methods: {
    //  获取用户信息
    getUserInfoData() {
      this.params.psUserId = this.$route.query.psUserId
      http.lookUser(this.params).then(data => {
        this.data = data
        console.log(data)
      })
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

.header h2 {
  float: left;
  color: #fff;
  margin-left: 20px;
}

ul {
  overflow: hidden;
  margin: 20px auto;
}

ul.first {
  margin: 20px 250px 20px 150px;
}

ul > li {
  line-height: 40px;
}

p.btn-p {
  clear: both;
  text-align: center;
  margin: 40px auto;
}

p.btn-p button {
  margin: 0 20px;
}
</style>
