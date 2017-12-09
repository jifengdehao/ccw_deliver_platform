<template>
  <div id="order">
    <!--内容头部-->
    <div class="top clearfix">
      <h2 class="fl">订单管理</h2>
      <div class="search-bar fr">
        <Input v-model="expressId"
               icon="search"
               placeholder="订单号/运单号"
               style="width: 200px;margin-top: 4px;" @on-click="search" @keyup.native.enter="search"></Input>
        <i class="ivu-icon ivu-icon-ios-close ivu-select-arrow close-input" v-show="expressId"
           @click="clearSearch"></i>
      </div>
    </div>
    <Row :gutter="24" class="mb20">
      <Col span="6">
      <h3>省区</h3>
      <Select v-model="province" clearable style="max-width:200px;" @on-change="changeProvince"
              :disabled="showProvince">
        <Option v-for="(item,index) in provinceData" :value="item.provinceId" :key="item.provinceId">{{
          item.provinceName}}
        </Option>
      </Select>
      </Col>
      <Col span="6">
      <h3>市区</h3>
      <Select v-model="city" style="max-width:200px;" clearable :disabled="showCity" @on-change="changeCity">
        <Option v-for="item in cityData" :value="item.cityId" :key="item.cityId">{{ item.cityName }}</Option>
      </Select>
      </Col>
      <Col span="6">
      <h3>区域</h3>
      <Select v-model="area" style="max-width:200px;" clearable :disabled="showArea" @on-change="changeArea">
        <Option v-for="item in areaData" :value="item.areaId" :key="item.areaId">{{ item.areaName }}</Option>
      </Select>
      </Col>
      <Col span="6">
      <h3>菜市场</h3>
      <Select v-model="market" style="max-width:200px;" clearable :disabled="showMarket" @on-change="changeMarket">
        <Option v-for="item in marketData" :value="item.marketId" :key="item.marketId">{{ item.marketName }}
        </Option>
      </Select>
      </Col>
    </Row>
    <Tabs :value="this.state" :animated="false" @on-click="selectTab" style="min-height: 600px;">
      <TabPane label="全部" name="5">
        <Row class="O_cava">
          <Col span="2" class="O_cava_name">
          <ul>
            <li>姓名</li>
            <li @click="getDeliver()" :class="{active:allClass}">全部</li>
            <li v-for="(item,index) in deliverData" :key="item.psDeliverId" @click="getDeliver(item.psDeliverId)"
                :class="{active:item.psDeliverId === deliverId}" v-if="item">
              {{item.name}}
            </li>
          </ul>
          </Col>
          <Col span="21" offset="1">
          <Table border :columns="columns" :data="data" :loading="loading"></Table>
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
        <Row class="O_cava">
          <Col span="2" class="O_cava_name">
          <ul>
            <li>姓名</li>
            <li @click="getDeliver()" :class="{active:allClass}">全部</li>
            <li v-for="(item,index) in deliverData" :key="item.psDeliverId" @click="getDeliver(item.psDeliverId)"
                :class="{active:item.psDeliverId === deliverId}" v-if="deliverData.length > 0">
              {{item.name}}
            </li>
          </ul>
          </Col>
          <Col span="21" offset="1">
          <Table border :columns="columns" :data="data" :loading="loading"></Table>
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
        <Row class="O_cava">
          <Col span="2" class="O_cava_name">
          <ul>
            <li>姓名</li>
            <li @click="getDeliver()" :class="{active:allClass}">全部</li>
            <li v-for="(item,index) in deliverData" :key="item.psDeliverId" @click="getDeliver(item.psDeliverId)"
                :class="{active:item.psDeliverId === deliverId}" v-if="deliverData.length > 0">
              {{item.name}}
            </li>
          </ul>
          </Col>
          <Col span="21" offset="1">
          <Table border :columns="columns" :data="data" :loading="loading"></Table>
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
        <Row class="O_cava">
          <Col span="2" class="O_cava_name">
          <ul>
            <li>姓名</li>
            <li @click="getDeliver()" :class="{active:allClass}">全部</li>
            <li v-for="(item,index) in deliverData" :key="item.psDeliverId" @click="getDeliver(item.psDeliverId)"
                :class="{active:item.psDeliverId === deliverId}" v-if="deliverData.length > 0">
              {{item.name}}
            </li>
          </ul>
          </Col>
          <Col span="21" offset="1">
          <Table border :columns="columns" :data="data" :loading="loading"></Table>
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
        <Row class="O_cava">
          <Col span="2" class="O_cava_name">
          <ul>
            <li>姓名</li>
            <li @click="getDeliver()" :class="{active:allClass}">全部</li>
            <li v-for="(item,index) in deliverData" :key="item.psDeliverId" @click="getDeliver(item.psDeliverId)"
                :class="{active:item.psDeliverId === deliverId}" v-if="deliverData.length > 0">
              {{item.name}}
            </li>
          </ul>
          </Col>
          <Col span="21" offset="1">
          <Table border :columns="columns" :data="data" :loading="loading"></Table>
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
      <TabPane label="已取消" name="7">
        <Row class="O_cava">
          <Col span="2" class="O_cava_name">
          <ul>
            <li>姓名</li>
            <li @click="getDeliver()" :class="{active:allClass}">全部</li>
            <li v-for="(item,index) in deliverData" :key="item.psDeliverId" @click="getDeliver(item.psDeliverId)"
                :class="{active:item.psDeliverId === deliverId}" v-if="deliverData.length > 0">
              {{item.name}}
            </li>
          </ul>
          </Col>
          <Col span="21" offset="1">
          <Table border :columns="columns" :data="data" :loading="loading"></Table>
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
      <Button type="primary" class="vm-fr" @click="exportModal=true" slot="extra">导出</Button>
    </Tabs>
    <Modal v-model="exportModal" width="300">
      <div slot="header">导出表格</div>
      <div class="textCenter">
        <DatePicker type="date" placeholder="选择日期" style="width: 100%" v-model="startTime"></DatePicker>
        <div class="m10">到</div>
        <DatePicker type="date" placeholder="选择日期" style="width: 100%" v-model="endTime"></DatePicker>
      </div>
      <div slot="footer">
        <Button type="primary" long :loading="modal_loading" @click="exportData()">确定</Button>
      </div>
    </Modal>
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
        showProvince: true,
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
        loading: false,
        exportModal: false, // 导出选择框
        modal_loading: false,  // 导出加载
        startTime: '', // 导出开始时间
        endTime: ''   // 导出结束时间
      }
    },
    created() {
      this.getInitOrderData()
      this.isQuery()
    },
    computed: {
      allClass() {
        return this.deliverId === '' ? true : false
      }
    },
//    watch: {
//      '$route'(to, from) {
//        console.log(to)
//        if (to.path === '/order') {
//          this.$route.meta.keepAlive = true
//        } else {
//          this.$route.meta.keepAlive = false
//        }
//      }
//    },
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
          let params = {
            marketId: value,
            pageSize: this.pageSize,
            pageNumber: this.pageNumber,
            psDeliverId: this.deliverId,
            expressId: this.expressId,
            state: this.state
          }
          this.loading = true
          api.getOrderData(params).then((res) => {
            if (res) {
              this.loading = false
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
        this.changeMarket(this.market)
      },
      // 切换
      selectTab(name) {
        this.state = name
        this.pageNumber = 1
        this.changeMarket(this.market)
      },
      // 选择配送员
      getDeliver(key = '') {
        this.pageNumber = 1
        this.deliverId = key
        this.changeMarket(this.market)
      },
      // 搜索
      search() {
        this.pageNumber = 1
        if (this.market !== '') {
          this.changeMarket(this.market)
        } else {
          this.changeMarket(0)
        }
      },
      // 清除搜索
      clearSearch() {
        this.expressId = ''
      },
      // 获取默认数据
      getInitOrderData() {
        let user = JSON.parse(sessionStorage.getItem('userInfo'))
        console.log(user)
        if (user.provinceId) {
          this.province = user.provinceId
          this.provinceData.push({provinceId: user.provinceId, provinceName: user.provinceName})
          this.showProvince = true
          if (user.cityId) {
            this.city = user.cityId
            this.cityData.push({cityId: user.cityId, cityName: user.cityName})
            this.showCity = true
            if (user.areaId) {
              this.area = user.areaId
              this.areaData.push({areaId: user.areaId, areaName: user.areaName})
              this.showArea = true
              if (user.marketId) {
                this.market = user.marketId
                this.marketData.push({marketId: user.marketId, marketName: user.marketName})
                this.showMarket = true
                this.changeMarket(user.marketId)
              } else {
                this.getMarketData(user.areaId)
                this.showMarket = false
              }
            } else {
              this.getAreaData(user.cityId)
              this.showArea = false
            }
          } else {
            this.getCityData(user.provinceId)
            this.showCity = false
          }
        } else {
          this.getProvinceData()
          this.showProvince = false
        }
      },
      isQuery() {
        if (this.$route.query.market) {
          this.market = this.$route.query.market
          this.state = this.$route.query.state
          this.$route.meta.keepAlive = !this.$route.meta.keepAlive
          this.changeMarket(this.market)
        } else {
          this.$route.meta.keepAlive = !this.$route.meta.keepAlive
        }
      },
      // 导出表格
      exportData() {
        if (this.market !== '' && this.endTime !== '' && this.startTime !== '') {
          this.modal_loading = true;
          let params = {
            beginTime: this.startTime,
            endTime: this.endTime,
            marketId: this.market
          }
          api.exportOrderPoi(params).then((res) => {
            if (res) {
              console.log(res)
              this.modal_loading = false
              window.open(res)
            }
          })
        }
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
        text-align: center;
        border: 1px solid #ccc;
        max-height: 1000px;
        overflow-y: scroll;
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
