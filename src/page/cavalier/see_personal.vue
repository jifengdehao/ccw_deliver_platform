/*
 * @Author: ZengFanlu 
 * @Date: 2017-11-06 15:10:00 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 骑士管理 查看配送人员 
 */

<template>
  <div class="main">
    <!-- 头部 -->
    <div class="header">
      <h2>配送人员</h2>
    </div>
    <div class="content">
      <ul class="content1">
        <li v-if="DeliverInfo.psEmpno"><span>用户ID</span><span>{{ DeliverInfo.psEmpno }}</span></li>
        <li v-if="DeliverInfo.name"><span>姓名</span><span>{{ DeliverInfo.name }}</span></li>
        <li v-if="DeliverInfo.sexStr"><span>性别</span><span>{{ DeliverInfo.sexStr }}</span></li>
        <li v-if="DeliverInfo.mobileno"><span>联系方式</span><span>{{ DeliverInfo.mobileno }}</span></li>
        <li v-if="DeliverInfo.identityNo"><span>身份证号</span><span>{{ DeliverInfo.identityNo }}</span></li>
        <li><span>审核结果</span><span>通过</span></li>
        <li><span>新人培训结果</span><span>通过</span></li>
        <li><span>身份证正反面</span></li>
        <li><img :src="PositiveImg" alt=""><img :src="negativeImg" alt=""><img :src="inHandImg" alt=""></li>
      </ul>

       <ul class="content2">
        <li>
          <span>省区</span>
          <span>
            <Select style="width:200px" @on-change="changeDate" v-model="provinceData">
              <Option v-for="item in deployManager" :key="item.id" :value="item.provinceId">{{ item.provinceName }}</Option>
            </Select>
          </span>
        </li>
        <li>
          <span>市区</span>
          <span>
            <Select style="width:200px" :disabled="showCity" @on-change="changeCityData" v-model="cityIdIndex">
              <Option v-for="city in cityManager" :key="city.cityId" :value="city.cityId">{{ city.cityName }}</Option>
            </Select>
          </span>
        </li>
        <li>
          <span>区域</span>
          <span>
            <Select style="width:200px" :disabled="showArea" @on-change="changeAreaData" v-model="areaIdData">
              <Option v-for="area in areaManager" :key="area.id" :value="area.areaId">{{ area.areaName }}</Option>
            </Select>
          </span>
        </li>
        <li>
          <span>菜市场</span>
          <span>
            <Select style="width:200px" :disabled="showMarket" @on-change="changeMarkData" v-model="marketIdData">
              <Option v-for="market in marketManager" :key="market.id" :value="market.marketId">{{ market.marketName }}</Option>
            </Select>
          </span>
        </li>
        <li><span>学历</span><span>{{ DeliverInfo.educationStr }}</span></li>
        <li><span>类型</span><span>通过</span></li>
        <li>
          <span>工作状态</span>
          <span>
            <Select style="width:200px; margin: 0;" v-model="status">
                <Option value="1">工作</Option>
                <Option value="2">休息</Option>
            </Select>
          </span>
        </li>
        <li><span>健康证</span></li>
        <li><img :src="HealthImg" alt=""><img :src="contraryImg" alt=""></li>
      </ul>

       <ul class="content3">
        <li v-if="DeliverInfo.starLevel"><span>星级</span><span>{{ DeliverInfo.starLevel }}</span></li>
        <li v-if="DeliverInfo.regularDate"><span>转正时间</span><span>{{ formatTime(DeliverInfo.regularDate) }}</span></li>
        <li v-if="DeliverInfo.leaveDate"><span>离职时间</span><span>{{ formatTime(DeliverInfo.leaveDate) }}</span></li>
        <li v-if="psDeliverIncomeData.allIncome"><span>总收入(元)</span><span>{{ psDeliverIncomeData.allIncome }}</span></li>
        <li v-if="psDeliverIncomeData.monthIncome"><span>本月收入(元)</span><span>{{ psDeliverIncomeData.monthIncome }}</span></li>
        <li v-if="psDeliverIncomeData.monthDeliverIncome"><span>本月提成(元)</span><span>{{ psDeliverIncomeData.monthDeliverIncome }}</span></li>
        <li v-if="psDeliverIncomeData.allDeliverAcount"><span>累计配送单量</span><span>{{ psDeliverIncomeData.allDeliverAcount }}</span></li>
        <li v-if="psDeliverIncomeData.monthDeliverAcount"><span>本月配送单量</span><span>{{ psDeliverIncomeData.monthDeliverAcount }}</span></li>
      </ul>

       <!-- Moadl 弹框 -->
      <Modal
          v-model="showModal"
          title="提醒"
          @on-ok="onSave"
          @on-cancel="cancel">
          <p style="text-align: center">{{ showModalDate }}</p>
      </Modal>

    </div>
    <div class="footer">
      <Button size="large" type="ghost" @click="saveOpen('1')">取消</Button>
      <Button size="large" type="ghost" @click="saveOpen('2')">确定</Button>
    </div>
  </div>
</template>
<script>
import * as api from '@/api/common'
export default {
  components: {},
  name: 'see_personal',
  data() {
    return {
      id: (() => {
        return this.$route.query.id
      })(),
      DeliverInfo: [], // 用户数据
      PositiveImg: '', // 正面身份证
      negativeImg: '', // 反面身份证
      inHandImg: '', // 手持身份证
      HealthImg: '', // 健康证
      contraryImg: '', // 反面健康证
      deployManager: [], // 省区下拉框数据
      provinceData: '', // 获取初始化省区数据
      showCity: true, // 可否点击市区下拉框
      cityManager: [], // 市区下拉框数据
      cityIdIndex: '', // 获取市区ID数据
      showArea: true, // 可否点击区域下拉框
      areaManager: [], // 区域下拉框数据
      areaIdData: '', // 获取区域ID数据
      showMarket: true, // 可否点击菜市场下拉框
      marketManager: [], // 菜市场下拉框数据
      marketIdData: '', // 获取菜市场ID数据
      status: '', // 默认上班状态
      psDeliverIncomeData: {}, // 获取收入金额
      areaValue: '', // 获取市区value
      showModal: false, // 打开修改弹框
      showModalDate: '' // 弹框内容
    }
  },
  created() {
    this.getDeliverInfo() // 初始化用户数据
    this.getDeployManager() //  初始化省区数据
  },
  methods: {
    // 请求初始化用户个人信息
    getDeliverInfo() {
      api.getDeliverInfo(this.id).then(list => {
        if (list && list != null) {
          this.DeliverInfo = list
          if (list.psDeliverIncome && list.psDeliverIncome != null) {
            this.psDeliverIncomeData = list.psDeliverIncome
          }
          if (list.psDeliverMarket && list.psDeliverMarket != null) {
            this.provinceData = list.psDeliverMarket.provinceId // 省区ID 初始化
            this.cityIdIndex = list.psDeliverMarket.cityId // 市区ID 初始化
            this.areaIdData = list.psDeliverMarket.areaId // 区域ID 初始化
            this.marketIdData = list.psDeliverMarket.marketId // 菜市场ID 初始化
          }
          this.status = list.personStatus.toString() // 初始化上班状态
          if (list.pictureList && list.pictureList != null) {
            // 图片
            list.pictureList.forEach(function(item) {
              switch (item.picType) {
                case 4:
                  this.PositiveImg = item.picUrl
                  break
                case 5:
                  this.negativeImg = item.picUrl
                  break
                case 7: // 手持身份证
                  this.inHandImg = item.picUrl
                  break
                case 8:
                  this.HealthImg = item.picUrl
                  break
                case 9: // 健康证反面
                  this.contraryImg = item.picUrl
              }
            }, this)
          }
        }
      })
    },
    // 获取省区下拉框数据
    getDeployManager() {
      api.getDeployManager().then(data => {
        this.deployManager = data
      })
    },
    // 获取市区下拉框数据
    changeDate(value) {
      this.cityManager = []
      if (value && value != null) {
        api.getProvinceIndex(value).then(data => {
          this.cityManager = data
        })
      }
      this.showCity = false
    },
    // 获取区域下拉框数据
    changeCityData(value) {
      this.areaManager = []
      if (value && value != null) {
        api.getCityManager(value).then(data => {
          this.areaManager = data
        })
      }
      this.showArea = false
    },
    // 获取菜市场下拉框数据
    changeAreaData(value) {
      this.marketManager = []
      if (value && value != null) {
        api.getAreaMarket(value).then(data => {
          this.marketManager = data
        })
      }
      this.showMarket = false
    },
    // 获取菜市场下拉框数据
    changeMarkData(value) {
      this.userId = value
    },
    // 打开弹框
    saveOpen(status) {
      switch (status) {
        case '1':
          this.$Message.info('取消修改')
          this.cityManager = []
          this.areaManager = []
          this.marketManager = []
          this.getDeployManager()
          this.getDeliverInfo()
          break
        case '2':
          this.showModal = true
          this.showModalDate = '确认修改配送员信息？'
      }
    },
    // 保存修改 清空修改
    onSave() {
      if (!!this.id) {
        let saveDate = {
          personStatus: this.status, // 保存上班状态
          psDeliverId: this.id, // 保存修改用户ID
          psDeliverMarket: {
            // 修改用户地区
            areaId: this.areaIdData, // 区域ID
            cityId: this.cityIdIndex, // 市区ID
            provinceId: this.provinceData, // 省区ID
            marketId: this.marketIdData // 菜市场ID
          }
        } // 修改参数
        api.getUpdateDeliver(saveDate).then(res => {
          if (res && res === true) {
            this.$Message.info('保存修改')
            this.getDeployManager()
            this.getDeliverInfo()
          } else {
            this.$Message.info('保存失败')
          }
        })
      }
    },
    // onSave(status) {
    //   switch (status) {
    //     case '1':
    //       this.cityManager = []
    //       this.areaManager = []
    //       this.marketManager = []
    //       this.getDeployManager()
    //       this.getDeliverInfo()
    //       break
    //     case '2':
    //       let saveDate = {
    //         personStatus: this.status, // 保存上班状态
    //         psDeliverId: this.id, // 保存修改用户ID
    //         psDeliverMarket: {
    //           // 修改用户地区
    //           areaId: this.areaIdData, // 区域ID
    //           cityId: this.cityIdIndex, // 市区ID
    //           provinceId: this.provinceData, // 省区ID
    //           marketId: this.marketIdData // 菜市场ID
    //         }
    //       } // 修改参数
    //       api.getUpdateDeliver(saveDate).then(res => {
    //         if (res && res === true) {
    //           this.getDeployManager()
    //           this.getDeliverInfo()
    //         }
    //       })
    //   }
    // },
    cancel() {
      this.$Message.info('取消修改')
    },
    //  时间过滤
    formatTime(time) {
      let date = new Date(time)
      let month =
        date.getMonth() + 1 >= 10
          ? date.getMonth() + 1
          : '0' + date.getMonth() + 1
      let day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
      let hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
      // let minutes =
      //   date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
      // let seconds =
      //   date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
      return `${date.getFullYear()}/${month}/${day}`
    }
  }
}
</script>
<style lang="css" scoped>
.main {
  width: 100%;
}
.header {
  height: 40px;
  line-height: 40px;
  margin-bottom: 40px;
  background-color: #363e54;
}

.header h2 {
  float: left;
  color: #fff;
  margin-left: 20px;
}

.content1,
.content2,
.content3 {
  width: 33%;
  display: inline-block;
  float: left;
}

.content1 li span:nth-child(1),
.content2 li span:nth-child(1),
.content3 li span:nth-child(1) {
  width: 80px;
  display: inline-block;
  margin-right: 16px;
}

.content1 > li,
.content2 > li,
.content3 > li {
  margin-bottom: 20px;
}

.content1 li img,
.content2 li img,
.content3 li img {
  width: 360px;
  height: 172px;
  display: inline-block;
  margin-bottom: 5px;
}

.main .footer {
  clear: both;
  text-align: center;
}
</style>