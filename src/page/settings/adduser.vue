/*
 * @Author: WuFengliang
 * @Date: 2017-11-03 16:25:45
 * DeveloperMailbox:   wufengliang@ccw163.com
 * FunctionPoint: 添加用户
 */
<template>
  <div id="adduser" class="main" :class="{'isShow':show}">
    <div class="header">
      <h2>用户管理</h2>
    </div>
    <section class="userinfo_list">
      <ul>
        <li><span>姓名</span><input type="text" v-model="params.userName"></li>
        <li><span>性别</span><Select v-model="params.sex" style="width:168px;height:30px;"
                                   >
                                   <Option value="1">男</Option>
                                   <Option value="0">女</Option>
                                   </Select></li>
        <li><span>联系方式</span><input type="text" v-model="params.mobileno"></li>
        <li><span>邮箱地址</span><input type="text" v-model="params.email"></li>
        <li><span>角色名称</span><Select v-model="params.role" style="width:168px;"
                                   >
                                   <Option v-for="role in roleArray" :value="role.roleId" :key="role.roleName">{{ role.roleName }}</Option> 
                                   </Select></li>
        <li><span>所属省区</span>
          <Select v-model="params.provinceId"  style="width:168px;height:30px;" @on-change="chooseProvince">
            <Option v-for="item in provinceList" :value="item.provinceId" :key="item.provinceId">{{ item.provinceName }}</Option>
          </Select>
        </li>
        <li><span>所属市区</span>
          <Select v-model="params.cityId"  style="width:168px;height:30px;" @on-change="chooseCity">
            <Option v-for="item in cityList" :value="item.cityId" :key="item.cityId">{{ item.cityName }}</Option>
          </Select>
        </li>
        <li><span>所属区域</span>
          <Select v-model="params.areaId"  style="width:168px;height:30px;" @on-change="chooseArea">
          <Option v-for="item in areaList" :value="item.areaId" :key="item.areaId">{{ item.areaName }}</Option>
        </Select>
        </li>
        <li><span>所属菜市场</span>
          <Select v-model="params.marketId"  style="width:168px;height:30px;">
          <Option v-for="item in marketList" :value="item.marketId" :key="item.marketId">{{ item.marketName }}</Option>
        </Select>
        </li>
      </ul>

    </section>
    <p class="btn-p">
      <Button type="ghost" size="large" @click="resetInfo">取消</Button>
      <Button type="ghost" size="large" @click="putUserInfo">确定</Button>
    </p>
  </div>
</template>
<script>
import * as http from '@/api/common'
export default {
  data() {
    return {
      params: {
        userName: '', //  姓名
        mobileno: '', //  联系方式
        email: '', //  邮件地址
        sex: '', //  性别
        role: '', //  角色
        provinceId: '', //  省
        cityId: '', //  市
        areaId: '', //  区域ID
        marketId: '' //  菜市场
      },
      provinceList: null, //  省区数据集合
      cityList: null, //  市区数据集合
      areaList: null, //  区域集合
      marketList: null, //  菜市场集合
      roleArray: null //  角色列表
    }
  },
  computed: {
    show() {
      return this.$store.state.show
    }
  },
  created() {
    this.getRoleList()
    this.getProvinceList()
  },
  methods: {
    //  获取角色列表
    getRoleList() {
      http.getRoleList({}).then(data => {
        this.roleArray = data.records
      })
    },
    //  获取省区
    getProvinceList() {
      http.getDeployManager().then(data => {
        this.provinceList = data
      })
    },
    //  选择省区
    chooseProvince(provinceId) {
      this.cityList = []
      http.getProvinceIndex(provinceId).then(data => {
        this.cityList = data
      })
    }, //  选择市区 获取区域集合
    chooseCity(cityId) {
      this.areaList = []
      http.getCityManager(cityId).then(data => {
        this.areaList = data
        this.marketList = []
      })
    },
    //  选择区域 获取菜市场集合
    chooseArea(areaId) {
      this.marketList = []
      http.getAreaMarket(areaId).then(data => {
        this.marketList = data
      })
    },
    resetInfo() {
      for (let i in this.params) {
        this.params[i] = ''
      }
    },
    putUserInfo() {
      http.addOrPutUserInfo(this.params).then(data => {
        this.$Modal.success({
          title: '提示',
          content: '添加成功',
          onOk: () => {
            this.$router.go(-1)
          }
        })
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

section > ul > li {
  margin: 15px auto;
  line-height: 40px;
}

ul:first-child li span {
  display: inline-block;
  width: 80px;
}

ul li input,
ul li select {
  width: 168px;
  height: 30px;
  text-indent: 10px;
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
