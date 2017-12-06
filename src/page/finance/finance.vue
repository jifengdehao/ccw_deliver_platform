/*
 * @Author: ZengFanlu 
 * @Date: 2017-11-06 15:08:18 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 财务对账 
 */

<template>
  <div class="main">
    <!-- 头部 -->
    <div class="header">
      <h2>财务对账</h2>
      <div class="header-search">
        <DatePicker type="datetime" v-model="firstDate" placeholder="请输入开始时间" style="width: 200px" @on-change="changeStartTime"></DatePicker>
        <DatePicker type="datetime" v-model="currentDate" placeholder="请输入结束时间" style="width: 200px" @on-change="changeTime"></DatePicker>
        <Button @click="onExport">导出</Button>
      </div>
    </div>

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

    </div>
    <div class="content-list" v-if="finance && finance.length > 0">
      提成计算：站点骑士数量*底薪（2000元）/ 当月站点总单量*个人当月配送总单量
    </div>
    <div class="content-main" v-if="finance && finance.length > 0">
       <Table stripe :columns="columns1" :data="finance"></Table>
    </div>

     <!-- 导出数据Modal -->
    <Modal v-model="exportModal" width="300">
      <div class="vm-textCenter">
        <DatePicker type="date" v-model="startTimeStr" placeholder="选择日期" style="width: 100%"></DatePicker>
        <!-- <DatePicker type="datetime" @on-change="changeStartTimeSTR" placeholder="Select date and time" style="width: 100%"></DatePicker> -->
        <div class="mtb10">到</div>
        <DatePicker type="date" v-model="endTimeStr" placeholder="选择日期" style="width: 100%"></DatePicker>
        <!-- <DatePicker type="datetime" @on-change="changeEndTimeSTR" placeholder="Select date and time" style="width: 100%"></DatePicker> -->
      </div>
      <div slot="footer">
        <Button type="primary" long @click="getExportData()">确定</Button>
      </div>
    </Modal>
     
     <div v-if="finance && finance.length > 0" class="page"><Page :total="total" :current="params.pageNumber" @on-change="changePage"></Page></div>
  </div>
</template>
<script>
import * as api from '@/api/common'

export default {
  components: {},
  name: 'component_name',
  data() {
    return {
      deployManager: [], // 省区下拉框数据
      deployIndex: '', // 获取省区ID
      showCity: true, // 可否点击市区下拉框
      cityManager: [], // 市区下拉框数据
      showArea: true, // 可否点击区域下拉框
      areaManager: [], // 区域下拉框数据
      showMarket: true, // 可否点击菜市场下拉框
      marketManager: [], // 菜市场下拉框数据
      startTimeStr: '', // 搜索开始时间
      endTimeStr: '', // 搜索结束时间
      params: {
        areaId: null, // 区域ID
        marketId: null, // 菜市场ID
        beginTime: '', // 开始时间
        endTime: '', // 结束时间
        pageNumber: 1, // 当前页码
        pageSize: 10 // 当前显示页码
      }, // 列表参数
      columns1: [
        {
          title: '用户ID',
          key: 'psDeliverId',
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name',
          align: 'center'
        },
        {
          title: '联系方式',
          key: 'mobileno',
          align: 'center'
        },
        {
          title: '所属大区',
          key: 'areaName',
          align: 'center'
        },
        {
          title: '所属菜市场',
          key: 'marketName',
          align: 'center'
        },
        {
          title: '本月单量',
          key: 'monthAmount',
          align: 'center'
        },
        {
          title: '差评单量',
          key: 'negativeAmount',
          align: 'center'
        },
        {
          title: '底薪',
          key: 'salary',
          align: 'center'
        },
        {
          title: '差评扣款',
          key: 'negativeMoney',
          align: 'center'
        },
        {
          title: '超时扣款',
          key: 'overtimeMoney',
          align: 'center'
        },
        {
          title: '货损赔付',
          key: 'destroyMoney',
          align: 'center'
        },
        {
          title: '配送总收入',
          key: 'allIncome',
          align: 'center'
        },
        {
          title: '操作',
          key: 'click',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      // this.$router.push('/finance/' + params.row.psDeliverId)
                      this.$router.push({
                        path: '/finance/' + params.row.psDeliverId,
                        query: {
                          start: this.params.beginTime,
                          end: this.params.endTime,
                          areaId: this.params.areaId,
                          marketId: this.params.marketId
                        }
                      })
                    }
                  }
                },
                '查看'
              )
            ])
          }
        }
      ], // table 数据
      finance: [], // 列表数据,
      total: '', // 总页面
      exportModal: false, // 导出时间弹框隐藏
      firstDate: '', // 获取本月第一天时间
      currentDate: '', // 获取当天时间
    }
  },
  created: function() {
    // 获取本月第一天时间
    this.firstTime()
    // 获取当天时间
    this.currentTime()
    this.getDeployManager()
  },
  methods: {
    // 获取列表数据
    getFinanceList() {
      api.getFinanceList(this.params).then(data => {
        this.finance = data.records
        this.total = data.total
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
      this.params.areaId = value // 获取区域ID
      this.params.marketId = ''
      this.marketManager = ''
      if (!!this.params.areaId) {
        // 获取区域列表
        this.params.pageNumber = 1
        this.getFinanceList()
      }
      if (value && value != '') {
        api.getAreaMarket(value).then(data => {
          this.marketManager = data
        })
      }
      this.showMarket = false
    },
    // 获取菜市场ID
    changeMarkData(value) {
      if (value && value != '') {
        this.params.marketId = value
        this.params.pageNumber = 1
        this.getFinanceList()
      }
    },
    // 打开导出弹框
    onExport() {
      this.exportModal = true
      this.startTimeStr = ''
      this.endTimeStr = ''
    },
    // // 获取导出时间源
    // changeStartTimeSTR(data) {
    //   this.startTimeStr = data
    // },
    // // 获取导出结束时间源
    // changeEndTimeSTR(data) {
    //   this.endTimeStr = data
    // },
    // 导出数据
    getExportData() {
      if (!!this.params.areaId) {
        if (!!this.startTimeStr && !!this.endTimeStr) {
          let params = {
            marketId: this.params.marketId,
            beginTime: this.startTimeStr,
            endTime: this.endTimeStr,
            areaId: this.params.areaId
          }
          api.getFinanceListExport(params).then(data => {
            if (data && data != null) {
              window.open(data)
            }
          })
          this.exportModal = false
        }
      }
    },
    // 获取开始时间
    changeStartTime(data) {
      this.params.beginTime = data
    },
    // 获取结束时间
    changeTime(data) {
      this.params.endTime = data
      if (this.params.marketId && this.params.marketId != '' && this.params.beginTime && this.params.beginTime != '' || this.params.areaId && this.params.areaId != '') {
        this.getFinanceList()
      }
    },
    // 点击分页发生变化
    changePage(page) {
      this.params.pageNumber = page
      this.getFinanceList()
    },
    //  时间过滤
    firstTime() {
      let date = new Date().setDate(1)
      let date1 = new Date(date)
      // 获取月份
      let month = date1.getMonth() + 1 >= 10 ? date1.getMonth() + 1 : '0' + date1.getMonth()  + 1
      // 获取日期
      let day = date1.getDate() >= 10 ? date1.getDate() : '0' + date1.getDate()
      this.params.beginTime = this.firstDate = date1.getFullYear() + '-' + month + '-' + day + ' ' + '00' + ':' + '00' + ':' + '00'
      // console.log(date1.getFullYear() + '-' + month + '-' + day + ' ' + date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds())
    },
    currentTime() {
      let date = new Date()
      let date1 = new Date(date)
      // 获取月份
      let month = date1.getMonth() + 1 >= 10 ? date1.getMonth() + 1 : '0' + date1.getMonth() + 1
      // 获取日期
      let days = date1.getDate() - 1
      let day = days >= 10 ? days : '0' + days
      this.params.endTime = this.currentDate = date1.getFullYear() + '-' + month + '-' + day + ' ' + '23' + ':' + '59' + ':' + '59'
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

.content-list {
  float: right;
  margin-top: 20px;
}

.content-main {
  margin-top: 50px;
}

.page {
  margin-top: 20px;
  float: right;
}

.mtb10 {
  text-align: center;
  margin: 7px 0;
}
</style>