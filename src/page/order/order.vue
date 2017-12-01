<template>
  <div id="order">
    <!--内容头部-->
    <div class="top clearfix">
      <h2 class="fl">订单管理</h2>
      <div class="search-bar fr">
        <Input v-model="expressId"
               icon="search"
               placeholder="订单号/运单号"
               style="width: 200px;margin-top: 4px;" @on-click="search"></Input>
        <i class="ivu-icon ivu-icon-ios-close ivu-select-arrow close-input" v-show="expressId"
           @click="clearSearch"></i>
      </div>
    </div>
    <Row style="margin-bottom: 20px;" :gutter="24">
      <Col :xs="24" :sm="6" :md="6" :lg="6">
      <h3>省区</h3>
      <Select v-model="province" clearable style="max-width:200px;" @on-change="changeProvince">
        <Option v-for="(item,index) in provinceData" :value="item.provinceId" :key="item.provinceId">{{
          item.provinceName}}
        </Option>
      </Select>
      </Col>
      <Col :xs="24" :sm="6" :md="6" :lg="6">
      <h3>市区</h3>
      <Select v-model="city" style="max-width:200px;" clearable :disabled="showCity" @on-change="changeCity">
        <Option v-for="item in cityData" :value="item.cityId" :key="item.cityId">{{ item.cityName }}</Option>
      </Select>
      </Col>
      <Col :xs="24" :sm="6" :md="6" :lg="6">
      <h3>区域</h3>
      <Select v-model="area" style="max-width:200px;" clearable :disabled="showArea" @on-change="changeArea">
        <Option v-for="item in areaData" :value="item.areaId" :key="item.areaId">{{ item.areaName }}</Option>
      </Select>
      </Col>
      <Col :xs="24" :sm="6" :md="6" :lg="6">
      <h3>菜市场</h3>
      <Select v-model="market" style="max-width:200px;" clearable :disabled="showMarket" @on-change="changeMarket">
        <Option v-for="item in marketData" :value="item.marketId" :key="item.marketId">{{ item.marketName }}
        </Option>
      </Select>
      </Col>
    </Row>
    <Tabs :value="this.state" :animated="false" @on-click="selectTab" style="min-height: 600px;">
      <TabPane label="全部" name="5">
        <Row class="O_cava" v-show="showResult">
          <Col span="2">
          <ul class="textCenter O_cava_name">
            <li>姓名</li>
            <li @click="getDeliver()" :class="{active:allClass}">全部</li>
            <li v-for="(item,index) in deliverData" :key="item.psDeliverId" @click="getDeliver(item.psDeliverId)"
                :class="{active:item.psDeliverId === deliverId}" v-if="item">
              {{item.name}}
            </li>
          </ul>
          </Col>
          <Col span="21" offset="1">
          <Table border :columns="columns" :data="data"></Table>
          <Page
            :total="tableTotal"
            :current="pageNumber"
            :page-size="pageSize"
            @on-change="changePage"
            show-total
            class="fr"
            style="margin-top: 20px;"
          ></Page>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="新订单" name="0">
        <Row class="O_cava" v-show="showResult">
          <Col span="2">
          <ul class="textCenter O_cava_name">
            <li>姓名</li>
            <li @click="getDeliver()" :class="{active:allClass}">全部</li>
            <li v-for="(item,index) in deliverData" :key="item.psDeliverId" @click="getDeliver(item.psDeliverId)"
                :class="{active:item.psDeliverId === deliverId}" v-if="deliverData.length > 0">
              {{item.name}}
            </li>
          </ul>
          </Col>
          <Col span="21" offset="1">
          <Table border :columns="columns" :data="data"></Table>
          <Page
            :total="tableTotal"
            :current="pageNumber"
            :page-size="pageSize"
            @on-change="changePage"
            show-total
            class="fr"
            style="margin-top: 20px;"
          ></Page>
          </Col>
        </Row>
      </TabPane>
      <!--<TabPane label="重抛池" name="1">-->
      <!--</TabPane>-->
      <TabPane label="配送中" name="1">
        <Row class="O_cava" v-show="showResult">
          <Col span="2">
          <ul class="textCenter O_cava_name">
            <li>姓名</li>
            <li @click="getDeliver()" :class="{active:allClass}">全部</li>
            <li v-for="(item,index) in deliverData" :key="item.psDeliverId" @click="getDeliver(item.psDeliverId)"
                :class="{active:item.psDeliverId === deliverId}" v-if="deliverData.length > 0">
              {{item.name}}
            </li>
          </ul>
          </Col>
          <Col span="21" offset="1">
          <Table border :columns="columns" :data="data"></Table>
          <Page
            :total="tableTotal"
            :current="pageNumber"
            :page-size="pageSize"
            @on-change="changePage"
            show-total
            class="fr"
            style="margin-top: 20px;"
          ></Page>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="配送完成" name="2">
        <Row class="O_cava" v-show="showResult">
          <Col span="2">
          <ul class="textCenter O_cava_name">
            <li>姓名</li>
            <li @click="getDeliver()" :class="{active:allClass}">全部</li>
            <li v-for="(item,index) in deliverData" :key="item.psDeliverId" @click="getDeliver(item.psDeliverId)"
                :class="{active:item.psDeliverId === deliverId}" v-if="deliverData.length > 0">
              {{item.name}}
            </li>
          </ul>
          </Col>
          <Col span="21" offset="1">
          <Table border :columns="columns" :data="data"></Table>
          <Page
            :total="tableTotal"
            :current="pageNumber"
            :page-size="pageSize"
            @on-change="changePage"
            show-total
            class="fr"
            style="margin-top: 20px;"
          ></Page>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="配送异常" name="3">
        <Row class="O_cava" v-show="showResult">
          <Col span="2">
          <ul class="textCenter O_cava_name">
            <li>姓名</li>
            <li @click="getDeliver()" :class="{active:allClass}">全部</li>
            <li v-for="(item,index) in deliverData" :key="item.psDeliverId" @click="getDeliver(item.psDeliverId)"
                :class="{active:item.psDeliverId === deliverId}" v-if="deliverData.length > 0">
              {{item.name}}
            </li>
          </ul>
          </Col>
          <Col span="21" offset="1">
          <Table border :columns="columns" :data="data"></Table>
          <Page
            :total="tableTotal"
            :current="pageNumber"
            :page-size="pageSize"
            @on-change="changePage"
            show-total
            class="fr"
            style="margin-top: 20px;"
          ></Page>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from '@/api/common'
  import * as time from '@/until/time'

  export default {
    name: 'order',
    data() {
      return {
        provinceData: [], // 省或直轄市数据集
        province: '', // 省或直轄市
        city: '', // 市
        cityData: [], // 市数据集
        showCity: true, // 是否允许选择城市 true ===>不允许 false 允许
        areaData: [], // 区域数据集
        area: '', // 区域
        showArea: true, // 是否允许选择区域  true ===>不允许 false 允许
        market: '', // 市场
        marketData: [], // 市场数据集
        showMarket: true,  // 是否允许选择市场  true ===>不允许 false 允许
        columns: [
          {
            title: '用户名',
            key: 'customerName',
            align: 'center'
          },
          {
            title: '下单时间',
            align: 'center',
            key: 'submitTime',
            render: (h, params) => {
              return time.formatDateTime(params.row.submitTime)
            }
          },
          {
            title: '期待取货',
            align: 'center',
            key: 'endTime',
            render: (h, params) => {
              return time.formatDateTime(params.row.endTime)
            }
          },
          {
            title: '订单状态',
            align: 'center',
            key: 'status'
          },
          {
            title: '运单编号',
            align: 'center',
            key: 'expressId'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push('/order/' + params.row.orderId)
                    }
                  }
                }, '查看'),
              ]);
            }
          }
        ],
        data: [],
        expressId: '', // 搜索
        deliverId: '',// 配送员Id
        pageSize: 20, //默认表格一页数据
        pageNumber: 1,  // 默认第一页
        tableTotal: 0,  // 表格数据总数
        state: '5', // 状态
        deliverData: [], //配送员数据
        showResult: false // 数据展示
      }
    },
    created() {
      this.getProvinceData()
    },
    computed: {
      allClass() {
        return this.deliverId === '' ? true : false
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
        if (value && value !== '') {
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
        if (value && value !== '') {
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
        if (value && value !== '') {
          api.getAreaMarket(value).then((res) => {
            if (res) {
              this.showMarket = false
              this.marketData = res
            }
          })
        }
      },
      // 选择菜市场
      changeMarket() {
        let params = {
          marketId: this.market,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber,
          psDeliverId: this.deliverId,
          expressId: this.expressId,
          state: this.state
        }
        if (params.marketId && params.marketId !== '') {
          api.getOrderData(params).then((res) => {
            if (res) {
              this.showResult = true
              this.data = res.expressPage.records
              this.tableTotal = res.expressPage.total
              this.deliverData = res.deliverList
            }
          })
        }
      },
      // 分页
      changePage(index) {
        this.pageNumber = index
        this.changeMarket()
      },
      // 切换
      selectTab(name) {
        this.state = name
        this.pageNumber = 1
        this.changeMarket()
      },
      // 选择配送员
      getDeliver(key = '') {
        this.pageNumber = 1
        this.deliverId = key
        this.changeMarket()
      },
      // 搜索
      search() {
        this.pageNumber = 1
        this.changeMarket()
      },
      clearSearch() {
        this.expressId = ''
      }
    }
  }
</script>
<style lang="less" scoped type="text/less">
  #order {
    .top {
      height: 40px;
      background-color: #363e54;
      margin-bottom: 20px;
      padding: 0 20px;
      & > h2 {
        color: #fff;
        display: inline-block;
        height: 40px;
        line-height: 40px;
      }
      .search-bar {
        position: relative;
        .close-input {
          position: absolute;
          right: 27px;
          top: 20px;
          cursor: pointer;
        }
      }
    }
    .O_cava {
      margin-top: 40px;
      .O_cava_name {
        border: 1px solid #ccc;
        li {
          width: 100%;
          height: 35px;
          line-height: 35px;
          border-bottom: 1px solid #ccc;
          cursor: pointer;
          &:first-child {
            height: 40px;
            line-height: 40px;
            font-weight: 700;
          }
          &:last-child {
            border-bottom: none;
          }
          &.active {
            background-color: #495062;
            color: #ffffff;
          }
        }
      }
    }
  }
</style>
