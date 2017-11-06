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
        <Input placeholder="请输入..." style="width: 200px"></Input>
        <Icon type="ios-search icos"></Icon>
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
          <Select style="width:200px" :disabled="showMarket">
              <Option v-for="market in marketManager" :key="market.id" :value="market.marketId">{{ market.marketName }}</Option>
          </Select>
        </div>
      </div>
      <div class="content-main">
        <div class="main-left">
          <span class="fz">系统消息</span>
          <div class="leftcosapn">
            <p>2018 xxxx市场xxxxc菜市场xxxx暂时暂停配送</p>
            <Icon type="ios-arrow-right fr col"></Icon>
          </div>
        </div>
        <div class="main-right fr">
          <span class="fz">审核概览</span>
          <div class="leftcosapn">
            <p>2018 xxxx市场xxxxc菜市场xxxx暂时暂停配送</p>
            <span>未读消息889</span>
            <Icon type="ios-arrow-right fr col"></Icon>
          </div>
        </div>

        <div class="main-left mr40">
          <span class="fz">实时监控</span>
          <div class="leftcosapn real-time">
            <p>需要手工派单</p>
            <span>50</span>
            <Icon type="ios-arrow-right fr col"></Icon>
          </div>
          <div class="leftcosapn real-time">
            <p>新订单</p>
            <span>50</span>
            <Icon type="ios-arrow-right fr col"></Icon>
          </div>
          <div class="leftcosapn real-time">
            <p>已传达订单</p>
            <span>50</span>
            <Icon type="ios-arrow-right fr col"></Icon>
          </div>
          <div class="leftcosapn real-time">
            <p>异常订单</p>
            <span>50</span>
            <Icon type="ios-arrow-right fr col"></Icon>
          </div>
          <div class="leftcosapn real-time">
            <p>骑手上班/休息</p>
            <span>50/6</span>
            <Icon type="ios-arrow-right fr col"></Icon>
          </div>
        </div>
        <div class="main-right fr mr40" style="position: relative;">
          <div class="br"></div>
          <span class="fz">数据看板</span>
          <div class="top pr">
            <div class="order-up pa">
              <p>
                <span>订单成长量</span>
                <span class="mr20">13%</span>
                <!-- <Icon type="ios-arrow-thin-up"></Icon> -->
                <Icon type="ios-arrow-thin-down"></Icon>
              </p>
              <p>
                <span class="fz mr20">8765</span>
                <span class="mr14">比上周同期</span>
              </p>
            </div>
            <div class="order-overtime par">
              <p>
                <span>订单超时率</span>
                <span class="mr20">13%</span>
                <!-- <Icon type="ios-arrow-thin-up"></Icon> -->
                <Icon type="ios-arrow-thin-down"></Icon>
              </p>
              <p>
                <span class="fz mr20">1%</span>
                <span class="mr14">比上周同期</span>
              </p>
            </div>
          </div>
          
          <div class="bottom pr">
            <div class="abnormal-order pa">
              <p>
                <span>异常订单率</span>
                <span class="mr20">11%</span>
                <!-- <Icon type="ios-arrow-thin-up"></Icon> -->
                <Icon type="ios-arrow-thin-down"></Icon>
              </p>
              <p>
                <span class="fz mr20">1%</span>
                <span class="mr14">比上周同期</span>
              </p>
            </div>
            <div class="rider-effect par">
              <p>
                <span>骑手人效</span>
                <span class="mr20">16%</span>
                <!-- <Icon type="ios-arrow-thin-up"></Icon> -->
                <Icon type="ios-arrow-thin-down"></Icon>
              </p>
              <p>
                <span class="fz mr20">32%</span>
                <span class="mr14">比上周同期</span>
              </p>
            </div>
          </div>
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
      deployManager: [], // 省区下拉框数据
      deployIndex: '', // 获取省区ID
      showCity: true, // 可否点击市区下拉框
      cityManager: [], // 市区下拉框数据
      showArea: true, // 可否点击区域下拉框
      areaManager: [], // 区域下拉框数据
      showMarket: true, // 可否点击菜市场下拉框
      marketManager: [] // 菜市场下拉框数据
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
      api.getProvinceIndex(value).then(data => {
        this.cityManager = data
      })
      this.showCity = false
    },
    // 获取区域下拉框数据
    changeCityData(value) {
      this.areaManager = ''
      api.getCityManager(value).then(data => {
        this.areaManager = data
      })
      this.showArea = false
    },
    // 获取菜市场下拉框数据
    changeAreaData(value) {
      this.marketManager = ''
      api.getAreaMarket(value).then(data => {
        this.marketManager = data
      })
        this.showMarket = false
    }
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

.content-main {
  margin-top: 40px;
}

.main-left,
.main-right {
  width: 48%;
  float: left;
  padding: 20px;
  border: 1px solid #ccc;
}

.main-left span,
.main-right span {
  margin-bottom: 10px;
  display: inline-block;
}

.main-left .leftcosapn,
.main-right .leftcosapn {
  position: relative;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #dddee1;
}

.main-left .leftcosapn p,
.main-right .leftcosapn p {
  display: inline-block;
  font-size: 16px;
  margin-left: 20px;
}

.main-right .leftcosapn span {
  width: 100px;
  height: 40px;
  position: absolute;
  top: 0;
  right: 10%;
  margin-right: 30px;
  display: inline-block;
}

.main-left .real-time {
  position: relative;
  border: 0px;
  line-height: 36px;
}

.main-left .real-time span {
  width: 200px;
  height: 34px;
  position: absolute;
  top: 0;
  left: 40%;
  margin-left: 20px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.col {
  margin-right: 10px;
  font-size: 18px;
  font-weight: 600;
  line-height: 40px;
  cursor: pointer;
}

.mr40 {
  margin-top: 40px;
}

.fr {
  float: right;
}

.top,
.bottom {
  width: 100%;
  height: 100px;
  text-align: center;
  border-bottom: 1px solid #ccc;
}
.bottom {
  border-bottom: 0;
}
.top .order-up,
.bottom .abnormal-order {
  width: 50%;
  height: 100%;
  display: inline-block;
  float: left;
}

.top .order-overtime,
.bottom .rider-effect {
  width: 50%;
  height: 100%;
  float: right;
  display: inline-block;
}
span {
  font-size: 12px !important;
  font-weight: 400 !important;
}

.mr14 {
  margin-left: 14px;
}

.mr20 {
  margin-left: 20px;
}

.fz {
  font-size: 18px !important;
  font-weight: 600 !important;
}

.pr {
  position: relative;
}
.pa {
  position: absolute;
  top: 30px;
  left: 0;
}
.par {
  position: absolute;
  right: 0;
  top: 30px;
}
.br {
  height: 200px;
  position: absolute;
  top: 55px;
  left: 410px;
  border-right: 1px solid #ccc;
}
</style>
