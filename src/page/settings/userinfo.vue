<template>
  <div id="userinfo" class="main">
    <div class="header">
      <h2>用户管理</h2>
    </div>
    <section class="userinfo_list">
     <ul class="fl" v-if="data">
       <li><span>用户ID</span><input type="text" :value="data.user.psUserId" disabled></li>
       <li><span>姓名</span><input type="text" v-model="data.user.userName"></li>
       <li><span>性别</span><Select style="width:168px;height:30px;" v-model="data.user.sex"
                                   >
                                   <Option value="1">男</Option>
                                   <Option value="0">女</Option>
                                   </Select></li>
       <li><span>联系方式</span><input type="text" v-model="data.user.mobileno"></li>
       <li><span>邮箱地址</span><input type="text" v-model="data.user.email"></li>
       <li>
         <span>角色名称</span>
         <Select style="width:168px;" v-model="data.user.role">
            <Option v-for="role in roleArray" :value="role.roleId" :key="role.roleName">{{ role.roleName }}</Option>        
          </Select>
        </li>
      <li>
        <span>所属省区</span>
        <!-- data.user.provinceId -->
        <Select v-model="data.user.provinceId" style="width:168px;height:30px;" @on-change="chooseProvince">
          <Option v-for="item in provinceList" :value="item.provinceId" :key="item.provinceId">{{ item.provinceName }}</Option>
        </Select>
       </li>
       <li>
        <span>所属市区</span>
        <Select v-model="data.user.cityId"  style="width:168px;height:30px;" @on-change="chooseCity">
          <Option v-for="item in cityList" :value="item.cityId" :key="item.cityId">{{ item.cityName }}</Option>
        </Select>
      </li>
       <li>
        <span>所属区域</span>
        <Select v-model="data.user.areaId"  style="width:168px;height:30px;" @on-change="chooseArea">
          <Option v-for="item in areaList" :value="item.areaId" :key="item.areaId">{{ item.areaName }}</Option>
        </Select>
       </li>
       <li>
         <span>所属菜市场</span>
         <Select v-model="data.user.marketId"  style="width:168px;height:30px;">
          <Option v-for="item in marketList" :value="item.marketId" :key="item.marketId">{{ item.marketName }}</Option>
        </Select>
       </li>
     </ul>
     <ul class="fl" v-if="data">
       <li>上次登录时间<span>{{data.loginfo.lastlogintime}}</span></li>
       <!-- <li>上次登录时长<span>{{data.loginfo.thisloginduration}}</span></li> -->
       <li>上次登录IP<span>{{data.loginfo.lastloginip}}</span></li>
       <li>上次登录设备<span>{{data.loginfo.lastloginequipment}}</span></li>
       <li>本次登录时间<span>{{data.loginfo.thislogintime}}</span></li>
       <!-- <li>本次在线时长<span>{{data.loginfo.thisloginduration}}</span></li> -->
       <li>本次登录IP<span>{{data.loginfo.thisloginip}}</span></li>
       <li>本次登录设备<span>{{data.loginfo.thisloginequipment}}</span></li>
     </ul>
    </section>
    <p class="btn-p">
      <Button type="ghost" size="large" @click="getUserInfoData">重置</Button>
      <Button type="ghost" size="large" @click="putUserInfo">确定</Button>
    </p>
  </div>
</template>
<script>
import * as http from '@/api/common'
export default {
  name: 'userInfo',
  data() {
    return {
      params: {
        psUserId: null
      },
      data: '', //  数据集合
      provinceList: null, //  省区集合
      cityList: null, //  市区集合
      areaList: null, //  区域集合
      marketList: null, //  菜市场集合
      roleArray: null //  角色集合
    }
  },
  created() {
    this.getUserInfoData()
  },
  methods: {
    //  获取角色列表
    getRoleList() {
      http.getRoleList({}).then(data => {
        this.roleArray = data.records
      })
    },
    //  获取省区集合
    getProvinceList() {
      http.getDeployManager().then(data => {
        this.provinceList = data
        this.cityList = this.areaList = this.marketList = []
      })
    },
    //  选择省区 获取市区集合
    chooseProvince(provinceId, fn) {
      this.cityList = []
      if (!provinceId) {
        return
      }
      http.getProvinceIndex(provinceId).then(data => {
        this.cityList = data
        this.areaList = this.marketList = []
        fn && fn()
      })
    },
    //  选择市区 获取区域集合
    chooseCity(cityId, fn) {
      this.areaList = []
      if (!cityId) {
        return
      }
      http.getCityManager(cityId).then(data => {
        this.areaList = data
        this.marketList = []
        fn && fn()
      })
    },
    //  选择区域 获取菜市场集合
    chooseArea(areaId) {
      this.marketList = []
      if (!areaId) {
        return
      }

      http.getAreaMarket(areaId).then(data => {
        this.marketList = data
      })
    },
    //  获取用户信息  ||  重置
    getUserInfoData() {
      this.data = ''
      this.getRoleList()
      this.getProvinceList()
      this.params.psUserId = this.$route.params.psUserId
      if (!this.params.psUserId) {
        return
      }
      http.lookUser(this.params).then(data => {
        if (data.user.provinceId) {
          this.chooseProvince(String(data.user.provinceId), () => {
            if (data.user.cityId) {
              this.chooseCity(String(data.user.cityId), () => {
                if (data.user.areaId) {
                  this.chooseArea(String(data.user.areaId))
                }
              })
            }
          })
        }

        this.data = data
        //  获取市
        // this.chooseCity(this.data.user.cityId) //  获取区
        // this.chooseArea(this.data.user.areaId) //  获取菜市场
      })
    },
    //  更新用户信息
    putUserInfo() {
      let data = {}
      for (let i in this.data) {
        if (i === 'user') {
          for (let n in this.data[i]) {
            if (
              n !== 'cityName' &&
              n !== 'marketName' &&
              n !== 'provinceName' &&
              n !== 'roleName'
            ) {
              data[n] = this.data[i][n]
            }
          }
        }
      }
      http.addOrPutUserInfo(data).then(data => {
        this.$Modal.success({
          title: '提示',
          content: '更新成功',
          onOk: () => {
            this.getUserInfoData()
          }
        })
      })
    }
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal.path !== oldVal.path) {
        this.data = ''
        this.getUserInfoData()
      }
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

.userinfo_list {
  overflow: hidden;
}

.main .header h2 {
  float: left;
  color: #fff;
  margin-left: 20px;
}

ul:first-child {
  width: 300px;
  overflow: hidden;
  margin-right: 100px;
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

ul:nth-child(2) li span {
  margin-left: 20px;
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
