<template>
  <div id="home">
    <div class="H-header">
      <Icon type="ios-home"></Icon>&nbsp;&nbsp;欢迎回到配送中心
    </div>
    <!--统计信息-->
    <div class="H-tip clearfix mb20">
      <h2>首页统计信息</h2>
      <ul class="fr">
        <li>在线骑手：{{statistics.onlineDeliver}}</li>
        <li>今日订单：{{statistics.todayOrderCount}}</li>
        <li>超时订单：{{statistics.outTimeorderRate}}</li>
      </ul>
    </div>
    <Row>
      <Col span="6">
      <h3>省区</h3>
      <Select v-model="province" clearable @on-change="changeProvince" style="width:200px">
        <Option v-for="(item,index) in provinceData" :value="item.provinceId" :key="item.provinceId">{{
          item.provinceName}}
        </Option>
      </Select>
      <!--<Cascader :data="provinceData" v-model="province" style="width:200px"></Cascader>-->
      </Col>
      <Col span="6">
      <h3>市区</h3>
      <Select v-model="city" style="width:200px" clearable :disabled="showCity" @on-change="changeCity">
        <Option v-for="item in cityData" :value="item.cityId" :key="item.cityId">{{ item.cityName }}</Option>
      </Select>
      </Col>
      <Col span="6">
      <h3>区域</h3>
      <Select v-model="area" style="width:200px" clearable :disabled="showArea" @on-change="changeArea">
        <Option v-for="item in areaData" :value="item.areaId" :key="item.areaId">{{ item.areaName }}</Option>
      </Select>
      </Col>
      <Col span="6">
      <h3>菜市场</h3>
      <Select v-model="market" style="width:200px" clearable :disabled="showMarket" @on-change="changeMarket">
        <Option v-for="item in marketData" :value="item.marketId" :key="item.marketId">{{ item.marketName }}</Option>
      </Select>
      </Col>
    </Row>
    <div v-show="indexData">
      <Row style="margin-top: 40px;" :gutter="80">
        <Col span="12">
        <Card class="H-card" dis-hover>
          <h3>系统消息</h3>
          <ul v-if="sysMsg.length>0">
            <li v-for="(item,index) in sysMsg" :key="index" @click="linkMsg(item.smMssageId)">
              {{item.pushTime | filterTime}}&nbsp;&nbsp;{{item.title}}
              <Icon type="chevron-right"></Icon>
            </li>
          </ul>
        </Card>
        </Col>
        <Col span="12">
        <Card class="H-card" dis-hover>
          <h3>审核概览</h3>
          <ul v-if="knight">
            <router-link to="/cAuditing" tag="li">
              骑士身份信息审核
              <span class="fr">{{knight.identityExam}}</span>
              <Icon type="chevron-right"></Icon>
            </router-link>
            <router-link tag="li" to="cTrain">
              骑士首次培训审核
              <span class="fr">{{knight.firstTrainExam}}</span>
              <Icon type="chevron-right"></Icon>
            </router-link>
            <router-link tag="li" to="cTrain">
              骑士星级培训审核
              <span class="fr">{{knight.starTrainExam}}</span>
              <Icon type="chevron-right"></Icon>
            </router-link>
          </ul>
        </Card>
        </Col>
      </Row>
      <Row style="margin-top: 40px;" :gutter="80">
        <Col span="12">
        <Card class="H-card" dis-hover>
          <h3>实时监控</h3>
          <ul v-if="monitoring">
            <router-link tag="li" to="/order">
              需要手工派单
              <span class="H-card-border">{{monitoring.needExpressOrder}}</span>
              <Icon type="chevron-right"></Icon>
            </router-link>
            <router-link tag="li" to="/order">
              新订单
              <span class="H-card-border">{{monitoring.newOrder}}</span>
              <Icon type="chevron-right"></Icon>
            </router-link>
            <router-link tag="li" to="/order">
              已送达订单
              <span class="H-card-border">{{monitoring.reachedOrder}}</span>
              <Icon type="chevron-right"></Icon>
            </router-link>
            <router-link tag="li" to="/order">
              异常订单
              <span class="H-card-border">{{monitoring.exceptionOrder}}</span>
              <Icon type="chevron-right"></Icon>
            </router-link>
            <router-link tag="li" to="/cPersonal">
              骑手上班/休息
              <span class="H-card-border">{{monitoring.deliverOnlineAndRest}}</span>
              <Icon type="chevron-right"></Icon>
            </router-link>
          </ul>
        </Card>
        </Col>
        <Col span="12">
        <Card class="H-card" dis-hover>
          <h3>数据看板</h3>
          <div class="H-card-data clearfix">
            <div class="item border-right border-bottom">
              <p>订单成长量&nbsp;&nbsp;&nbsp;{{data.orderCount}}</p>
              <p>比上周同期&nbsp;&nbsp;&nbsp;{{data.orderCountRate}}&nbsp;&nbsp;&nbsp;<Icon
                :type="this.data.orderCountRateImage === 1 ? 'arrow-up-c' : 'arrow-down-c'"
                v-if="this.data.orderCountRateImage"></Icon>
              </p>
            </div>
            <div class="item border-bottom">
              <p>订单超时率&nbsp;&nbsp;&nbsp;{{data.orderOuttime}}</p>
              <p>比上周同期&nbsp;&nbsp;&nbsp;{{data.orderOuttimeRate}}&nbsp;&nbsp;&nbsp;<Icon
                :type="this.data.orderOuttimeRateImage === 1 ? 'arrow-up-c' : 'arrow-down-c'"
                v-if="this.data.orderOuttimeRateImage"></Icon>
              </p>
            </div>
            <div class="item border-right">
              <p>异常订单率&nbsp;&nbsp;&nbsp;{{data.orderAbnormal}}</p>
              <p>比上周同期&nbsp;&nbsp;&nbsp;{{data.orderAbnormalRate}}&nbsp;&nbsp;&nbsp;<Icon
                :type="this.data.orderAbnormalRateImage === 1 ? 'arrow-up-c' : 'arrow-down-c'"
                v-if="this.data.orderAbnormalRateImage"></Icon>
              </p>
            </div>
            <div class="item">
              <p>骑士人手&nbsp;&nbsp;&nbsp;{{data.deliverorder}}</p>
              <p>比上周同期&nbsp;&nbsp;&nbsp;{{data.deliverOrderRate}}&nbsp;&nbsp;&nbsp;<Icon
                :type="this.data.deliverOrderRateImage === 1 ? 'arrow-up-c' : 'arrow-down-c'"
                v-if="this.data.deliverOrderRateImage"></Icon>
              </p>
            </div>
          </div>
        </Card>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from '@/api/common'
  import * as time from '@/until/time'

  export default {
    name: 'home',
    data() {
      return {
        indexData: false,// 首页展示数据
        statistics: {},// 首页统计信息
        sysMsg: [], // 系统消息
        knight: {}, // 骑士审核
        monitoring: {}, //实时监控
        data: {}, // 数据看板
        province: '', // 省
        city: '', // 市
        area: '', // 区
        market: '', // 市场
        provinceData: [], // 省或直轄市数据集
        cityData: [], // 市数据集
        showCity: true, // 是否允许选择城市 true ===>不允许 false 允许
        areaData: [], // 区域数据集
        showArea: true, // 是否允许选择区域  true ===>不允许 false 允许
        marketData: [], // 市场数据集
        showMarket: true  // 是否允许选择市场  true ===>不允许 false 允许
      }
    },
    created() {
      this.getInitData()
    },
    filters: {
      filterTime(value) {
        return time.formatDateTime(value)
      }
    },
    methods: {
      // 获取省市数据
      getProvinceData() {
        api.getDeployManager().then((res) => {
          if (res) {
            this.provinceData = res
          }
        })
      },
      // 选择城市或省
      changeProvince(value) {
        this.cityData = []
        this.getCityData(value)
      },
      // 获取市的数据
      getCityData(value) {
        if (value !== '') {
          api.getProvinceIndex(value).then((res) => {
            if (res) {
              this.showCity = false
              this.cityData = res
            }
          })
        }
      },
      // 选择城市
      changeCity(value) {
        this.areaData = []
        this.getAreaData(value)
      },
      // 获取区域的数据
      getAreaData(value) {
        if (value !== '') {
          api.getCityManager(value).then((res) => {
            if (res) {
              this.showArea = false
              this.areaData = res
            }
          })
        }
      },
      // 选择区域
      changeArea(value) {
        this.marketData = []
        this.getMarketData(value)
      },
      // 获取菜市场数据
      getMarketData(value) {
        if (value !== '') {
          api.getAreaMarket(value).then((res) => {
            if (res) {
              this.showMarket = false
              this.marketData = res
            }
          })
        }
      },
      // 选择菜市场
      changeMarket(value) {
        if (value !== '') {
          // 获取首页数据
          api.getIndeData(value).then((res) => {
            if (res) {
              this.indexData = true
              this.sysMsg = (res.custSysMsgList).map((item, index) => {
                item.createdAt = time.formatDateTime(item.createdAt)
                return item
              })
              this.statistics = res.head
              this.knight = res.depliverData
              this.monitoring = res.monitor
              this.data = res.orderDataBlack
            }
          })
        }
      },
      linkMsg(id) {
        this.$router.push('/setting_message/' + id)
      },
      // 获取默认的数据
      getInitData() {
        let user = JSON.parse(sessionStorage.getItem('userInfo'))
        if (user.provinceId) {
          this.province = user.provinceId
          this.getProvinceData()
          this.getCityData(user.provinceId)
          if (user.cityId) {
            this.city = user.cityId
            this.getAreaData(user.cityId)
            if (user.areaId) {
              this.area = user.areaId
              this.getMarketData(user.areaId)
              if (user.marketId) {
                this.market = user.marketId
                this.changeMarket(user.marketId)
              }
            }
          }
        } else {
          this.getProvinceData()
        }
      }
    }
  }
</script>
<style lang="less" scoped type="text/less">
  #home {
    .H-header {
      height: 60px;
      border-bottom: 1px solid #ddd;
      line-height: 60px;
      font-size: 16px;
    }
    .H-tip {
      height: 40px;
      line-height: 40px;
      margin-top: 12px;
      background-color: #363e54;
      padding: 0 20px;
      color: #ffffff;
      & > h2 {
        color: #fff;
        display: inline-block;
      }
      & > ul {
        font-size: 0;
        height: 40px;
      }
      & > ul > li {
        display: inline-block;
        font-size: 16px;
        margin-left: 10px;
      }
    }
    .H-card {
      height: 300px;
      .ivu-card-body > ul {
        overflow-y: scroll;
        height: 200px;
      }
      .ivu-card-body > ul > li {
        text-align: left;
        line-height: 35px;
        padding: 0 20px 0 10px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        position: relative;
        cursor: pointer;
      }
      .ivu-card-body > ul > li > i {
        position: absolute;
        top: 11px;
        right: 0;
      }
      .ivu-card-body > h3 {
        margin-bottom: 20px;
      }
      .H-card-border {
        border: 1px solid #dddddd;
        border-radius: 4px;
        width: 150px;
        float: right;
        margin-right: 30px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        display: inline-block;
        margin-top: 2px;
      }
      .H-card-data {
        width: 100%;
        .item {
          width: 50%;
          float: left;
          padding: 20px 0;
          line-height: 35px;
          text-align: center;
        }
        .item.border-right {
          border-right: 1px solid #dddddd;
        }
        .item.border-bottom {
          border-bottom: 1px solid #dddddd;
        }
      }
    }
  }
</style>
