/**
 * @Author: ZengFanlu
 * @Date: 2017-10-31 14:27:31
 * DeveloperMailbox:   zengfanlu@ccw163.com
 * FunctionPoint: 骑士管理
 */

<template>
  <div class="main">
    <!-- 头部 -->
    <div class="header">
      <h2>骑士管理</h2>
      <div class="header-search">
        <!-- <Input placeholder="请输入..." style="width: 200px"></Input>
        <Icon type="ios-search icos" @click="onSearch"></Icon> -->
      </div>
    </div>
    <!-- 内容部分 -->
    <div class="content">
      <div class="content-select">
        <div class="select">
          <span>省区</span>
          <Select style="width:200px" @on-change="changeDate">
              <Option v-for="item in deployManager" :key="item.id" :value="item.provinceId">{{ item.provinceName }}</Option>
          </Select>
        </div>

        <div class="select">
          <span>市区</span>
          <Select style="width:200px" :disabled="showCity" @on-change="changeCityData">
              <Option v-for="city in cityManager" :key="city.id" :value="city.cityId">{{ city.cityName }}</Option>
          </Select>
        </div>

        <div class="select">
          <span>区域</span>
          <Select style="width:200px" :disabled="showArea" @on-change="changeAreaData">
              <Option v-for="area in areaManager" :key="area.id" :value="area.areaId">{{ area.areaName }}</Option>
          </Select>
        </div>
        <div class="select">
          <span>菜市场</span>
          <Select style="width:200px" :disabled="showMarket" @on-change="changeMarkData">
              <Option v-for="market in marketManager" :key="market.id" :value="market.marketId">{{ market.marketName }}</Option>
          </Select>
        </div>
      </div>
      <div class="content-main">
        <div v-if="custSysMsgList.custSysMsgList && custSysMsgList.custSysMsgList.length > 0">
          <h2>系统消息</h2>
          <ul>
            <li v-for="list in custSysMsgList.custSysMsgList" :key="list.id">
              <span>{{ list.title }}</span>
              <Icon type="ios-arrow-right fr icon"></Icon>
            </li>
          </ul>
        </div>

        <div class="fr" v-if="custSysMsgList.depliverData && custSysMsgList.depliverData != null">
          <h2>审核概览</h2>
          <ul>
            <li>
              <span>骑手身份信息审核</span>
              <span>{{ custSysMsgList.depliverData.identityExam }}</span>
              <Icon type="ios-arrow-right fr icon"></Icon>
            </li>
            <li>
              <span>骑手首次培训审核</span>
              <span>{{ custSysMsgList.depliverData.firstTrainExam }}</span>
              <Icon type="ios-arrow-right fr icon"></Icon>
            </li>
            <li>
              <span>骑手星级培训审核</span>
              <span>{{ custSysMsgList.depliverData.starTrainExam }}</span>
              <Icon type="ios-arrow-right fr icon"></Icon>
            </li>
          </ul>
        </div>

        <div v-if="custSysMsgList.monitor">
          <h2>实时监控</h2>
          <ul>
            <li>
              <span>需要手工派单</span>
              <span class="spanB">{{ custSysMsgList.monitor.needExpressOrder }}</span>
              <Icon type="ios-arrow-right fr icon"></Icon>
            </li>
            <li>
              <span>新订单</span>
              <span class="spanB">{{ custSysMsgList.monitor.newOrder }}</span>
              <Icon type="ios-arrow-right fr icon"></Icon>
            </li>
            <li>
              <span>已传送订单</span>
              <span class="spanB">{{ custSysMsgList.monitor.reachedOrder }}</span>
              <Icon type="ios-arrow-right fr icon"></Icon>
            </li>
            <li>
              <span>异常订单</span>
              <span class="spanB">{{ custSysMsgList.monitor.exceptionOrder }}</span>
              <Icon type="ios-arrow-right fr icon"></Icon>
            </li>
            <li>
              <span>骑手上班/x休息</span>
              <span  class="spanB">{{ custSysMsgList.monitor.deliverOnlineAndRest }}</span>
              <Icon type="ios-arrow-right fr icon"></Icon>
            </li>
          </ul>
        </div>

        <div class="fr data-kanban" v-if="custSysMsgList.orderDataBlack">
          <h2>数据看板</h2>
          <ul>
            <li>
              <div>
                <p>
                  <span>订单成长量</span>
                  <span>{{ custSysMsgList.orderDataBlack.orderCountRate }}</span>
                  <Icon type="ios-arrow-thin-up color color1"></Icon>
                </p>
                <p>
                  <span>{{ custSysMsgList.orderDataBlack.orderCount }}</span>
                  <span>比上周同期</span>
                </p>
              </div>
            </li>
            <li>
              <div>
                <p>
                  <span>订单超时率</span>
                  <span>{{ custSysMsgList.orderDataBlack.orderOuttimeRate }}</span>
                  <Icon type="ios-arrow-thin-up color color1"></Icon>
                </p>
                <p>
                  <span>{{ custSysMsgList.orderDataBlack.orderOuttime }}</span>
                  <span>比上周同期</span>
                </p>
              </div>
            </li>
            <li>
              <div>
                <p>
                  <span>异常订单率</span>
                  <span>{{ custSysMsgList.orderDataBlack.orderAbnormalRate }}</span>
                  <Icon type="ios-arrow-thin-up color color1"></Icon>
                </p>
                <p>
                  <span>{{ custSysMsgList.orderDataBlack.orderAbnormal }}</span>
                  <span>比上周同期</span>
                </p>
              </div>
            </li>
            <li>
             <div>
                <p>
                  <span>骑手人效</span>
                  <span>{{ custSysMsgList.orderDataBlack.deliverOrderRate }}</span>
                  <!-- <Icon type="ios-arrow-thin-up"></Icon> -->
                  <Icon type="ios-arrow-thin-down color"></Icon>
                </p>
                <p>
                  <span>{{ custSysMsgList.orderDataBlack.deliverorder }}</span>
                  <span>比上周同期</span>
                </p>
             </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import * as api from '@/api/common'

export default {
  name: 'cavalier',
  components: {},
  data() {
    return {
      shouMain: false, // 隐藏主体
      deployManager: [], // 省区下拉框数据
      deployIndex: '', // 获取省区ID
      showCity: true, // 可否点击市区下拉框
      cityManager: [], // 市区下拉框数据
      showArea: true, // 可否点击区域下拉框
      areaManager: [], // 区域下拉框数据
      showMarket: true, // 可否点击菜市场下拉框
      marketManager: [], // 菜市场下拉框数据
      userId: '', // 获取菜市场ID
      custSysMsgList: [], // 获取系统消息数据
    }
  },
  created: function() {
    this.getDeployManager()
  },
  methods: {
    // 获取省区下拉框数据
    getDeployManager() {
      api.getDeployManager().then(data => {
        this.deployManager = data
      })
    },
    // 获取市区下拉框数据
    changeDate(value) {
      this.cityManager = ''
      if (value && value != '') {
         api.getProvinceIndex(value).then(data => {
            this.cityManager = data
          })
      }
      this.showCity = false
    },
    // 获取区域下拉框数据
    changeCityData(value) {
      this.areaManager = ''
      if (value && value != '') {
        api.getCityManager(value).then(data => {
          this.areaManager = data
        })
      }
      this.showArea = false
    },
    // 获取菜市场下拉框数据
    changeAreaData(value) {
      this.marketManager = ''
      if (value && value != '') {
        api.getAreaMarket(value).then(data => {
          this.marketManager = data
        })
      }
        this.showMarket = false
    },
    // 获取菜市场下拉框数据
    changeMarkData(value) {
      this.userId = {
        marketId: value
      }
     if (this.userId && this.userId != null) {
        api.getUserIndex(this.userId).then(res => {
          this.custSysMsgList = res // 系统消息
          console.log(res)
        })
     } else {
       this.custSysMsgList = []
     }
    },
  }
}
</script>
<style lang="css" scoped>
.main {
  width: 100%;
  height: 100%;
}

.main .header {
  height: 40px;
  line-height: 40px;
  background-color: #363e54;
}

.main .header h2 {
  float: left;
  color: #fff;
  margin-left: 20px;
}

.main .header .header-search {
  position: relative;
  float: right;
  margin-right: 45px;
}
.icos {
  position: absolute;
  top: 8px;
  right: -25px;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
}

.content {
  margin-top: 20px;
}

.content-select {
  height: 40px;
  margin-left: 100px;
}

.select {
  float: left;
  width: 25%;
  display: inline-block;
}

.select span {
  margin-right: 6px;
}

/* 主体部分 */
.content-main {
  width: 100%;
  margin-top: 40px;
}

.fr {
  float: right !important;
}

.icon {
  font-size: 22px;
}
.content-main >  div {
  width: 49%;
  float: left;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
}

.spanB {
  width: 200px;
  height: 28px;
  display: inline-block;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.content-main > div h2 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
}

.content-main  > div ul > li {
  height: 31px;
  line-height: 33px;
}

.content-main > div ul > li > span:nth-child(1){
  margin-left: 10px;
  width: 100px;
  display: inline-block;
}

.content-main > div ul > li > span:nth-child(2) {
  margin-left: 274px;
}

.content-main > div.data-kanban {
  padding-bottom: 0;
}

.content-main > div.data-kanban ul > li{
  float: left;
  width: 50%;
  height: 105px;
  text-align: center;
  display: inline-block;
}
.content-main > div.data-kanban ul > li:nth-child(1),
.content-main > div.data-kanban ul > li:nth-child(2) {
  border-bottom: 1px solid #ccc;
}

.content-main > div.data-kanban ul > li:nth-child(1),
.content-main > div.data-kanban ul > li:nth-child(3) {
  border-right: 1px solid #ccc;
}

.content-main > div.data-kanban ul > li > div {
  padding-top: 20px;
  box-sizing: border-box;
}

.content-main > div.data-kanban ul > li > div > p:nth-child(1) > span:nth-child(1) {
  font-size: 16px;
  margin-right: 10px;
}

.content-main > div.data-kanban ul > li > div > p:nth-child(2) > span:nth-child(1) {
  font-size: 22px;
  margin-right: 20px;
  margin-left: 46px;
}

.color {
  font-size: 16px;
  color: green;
}

.color1 {
  color: red !important;
}
</style>
