/*
 * @Author: ZengFanlu 
 * @Date: 2017-11-07 10:34:00 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 财务对账 查看个人消息 
 */
<template>
  <div class="main">
    <!-- 头部 -->
    <div class="header">
      <h2>财务对账</h2>
      <div class="header-search" v-if="seeFinanceData && seeFinanceData.length > 0">
        <DatePicker format="yyyy-MM-dd" type="date" placeholder="请输入开始时间" style="width: 200px" @on-change="changeStartTime"></DatePicker>
        <DatePicker format="yyyy-MM-dd" type="date" placeholder="请输入结束时间" style="width: 200px" @on-change="changeEndTime"></DatePicker>
        <Button @click="onExport">导出</Button>
      </div>
    </div>

    <div class="content">
      <Table stripe :columns="columns1" :data="seeFinanceData"></Table>
    </div>

    <!-- 导出数据Modal -->
    <Modal v-model="exportModal" width="300">
      <div class="vm-textCenter">
        <DatePicker type="date" v-model="startTimeStr" placeholder="选择日期" style="width: 100%"></DatePicker>
        <div class="mtb10">到</div>
        <DatePicker type="date" v-model="endTimeStr" placeholder="选择日期" style="width: 100%"></DatePicker>
      </div>
      <div slot="footer">
        <Button type="primary" long @click="getExportData()">确定</Button>
      </div>
    </Modal>

    <div v-if="seeFinanceData && seeFinanceData.length > 0" class="page"><Page :total="total" :current="params.pageNumber" @on-change="changePage"></Page></div>

  </div>
</template>
<script>
import * as api from '@/api/common'
export default {
  components: {},
  name: "component_name",
  data () {
    return {
      id: (() => {
        return this.$route.params.id
      })(),
      startTimeStr: '', // 导出开始时间
      endTimeStr: '', // 导出结束时间
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
          title: '性别',
          key: 'sexStr',
          width: '60',
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
          title: '星级',
          key: 'starLevel',
          width: '60',
          align: 'center'
        },
        {
          title: '配送单类型',
          key: 'deliveryModeStr',
          align: 'center'
        },
        {
          title: '配送单号',
          key: 'coExpressId',
          align: 'center'
        },
        {
          title: '配送时间',
          key: 'startTime',
          align: 'center'
        },
        {
          title: '送达时间',
          key: 'endTime',
          align: 'center'
        }
      ], // table 数据
      seeFinanceData: [], // 列表数据
      params: {
        psDeliverId: '',
        beginTime: '',
        endTime: '',
        pageSize: 10,
        pageNumber: 1
      }, // 搜索 获取列表数据
      exportModal: false, // 导出弹框默认隐藏
      total: '', // 总页数
    }
  },
  created: function() {
    this.getFinanceOrderList()
  },
  methods: {
    // 初始化列表数据
    getFinanceOrderList() {
      this.params.psDeliverId = this.id
      api.getFinanceOrderList(this.params).then(data => {
        this.seeFinanceData = data.records
        this.total = data.total
      })
    },
    // 默认打开弹框 清空数据 
    onExport() {
      this.exportModal = true
      this.startTimeStr = ''
      this.endTimeStr = ''
    },
    // 导出数据
    getExportData() {
      let params = {
        psDeliverId: this.id,
        beginTime: this.startTimeStr,
        endTime: this.endTimeStr
      }
      api.getFinanceOrderExport(params).then(data => {
        if (data && data != null) {
          window.open(data)
        }
      })
    },
    // 开始选择搜索时间
    changeStartTime(data) {
      this.params.beginTime = data
    },
    // 结束选择搜索时间
    changeEndTime(data) {
      if (this.params.beginTime && this.params.beginTime  != '') {
        this.params.endTime = data
        this.getFinanceOrderList()
      }
    },
    // 点击分页发生变化
    changePage(page) {
      this.params.pageNumber = page
      this.getFinanceOrderList()
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
  margin-top: 40px;
}

.mtb10 {
  text-align: center;
  margin: 7px 0;
}

.page {
  margin-top: 20px;
  float: right;
}
</style>