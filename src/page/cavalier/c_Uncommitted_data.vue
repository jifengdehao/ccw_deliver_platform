/*
* @Author: ZengFanlu
* @Date: 2017-11-06 15:09:27
* DeveloperMailbox:   zengfanlu@ccw163.com
* FunctionPoint: 骑士管理 未提交资料
*/

<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <h2>未提交资料</h2>
      <div class="header-search">
        <Button @click="onExportModal">导出</Button>
      </div>
    </div>
    <!-- table -->
    <div>
      <Table stripe :columns="columns1" :data="DeliverManager"></Table>
    </div>
    <!-- 导出数据Modal -->
    <Modal v-model="exportModal" width="300">
      <div class="vm-textCenter">
        <DatePicker type="datetime" @on-change="changeStartTime" placeholder="Select date and time" style="width: 100%"></DatePicker>
        <!-- <DatePicker type="date" v-model="startTime" placeholder="选择日期" style="width: 100%"></DatePicker> -->
        <div class="mtb10">到</div>
        <DatePicker type="datetime" @on-change="changeEndTime" v-model="endTime" placeholder="Select date and time" style="width: 100%"></DatePicker>
        <!-- <DatePicker type="date" v-model="endTime" placeholder="选择日期" style="width: 100%"></DatePicker> -->
      </div>
      <div slot="footer">
        <Button type="primary" long @click="getExportData()">确定</Button>
      </div>
    </Modal>
    <!-- 删除弹框 -->
    <Modal
        v-model="deletaUser"
        title="提示"
        @on-ok="deletaUpdate"
        @on-cancel="cancel">
        <p>确定删除这个用户吗?</p>
    </Modal>

    <div v-if="DeliverManager && DeliverManager.length > 0" class="page">
      <Page :total="total" :current="params.pageNumber" @on-change="changePage"></Page>
    </div>
  </div>
</template>
<script>
import * as api from '@/api/common'

export default {
  components: {},
  data() {
    return {
      columns1: [
        {
          title: '序号',
          type: 'index',
          width: '110',
          align: 'center'
        },
        {
          title: '临时ID',
          key: 'psDeliverApplyId',
          align: 'center'
        },
        {
          title: '联系方式',
          key: 'mobileno',
          align: 'center'
        },
        {
          title: '注册时间',
          key: 'registerDt',
          align: 'center',
          render: (h, params) => {
            return 'span', this.formatTime(params.row.registerDt)
          }
        },
        {
          title: '操作',
          key: 'operation',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.deletaUser = true
                      this.DeleteId = params.row.psDeliverApplyId
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      DeliverManager: [], // 列表数据
      exportModal: false, // 模态框显影
      deletaUser: false, // 删除弹框
      DeleteId: '', // 获取删除ID
      startTime: '', // 获取导出开始时间
      endTime: '', // 获取导出结束时间
      total: '', // 总页数
      params: {
        pageSize: 10, // 每页显示记录数
        pageNumber: 1 // 当前页码
      } // 列表请求数据
    }
  },
  created: function() {
    this.getDeliverManager() // 初始化数据
  },
  methods: {
    // 获取列表数据
    getDeliverManager() {
      api.getDeliverManager(this.params).then(data => {
        this.DeliverManager = data.records
        this.total = data.total
      })
    },
    // 打开导出弹框
    onExportModal() {
      this.exportModal = true
      this.endTime = ''
      this.startTime = ''
    },
    // 获取导出时间源
    changeStartTime(data) {
      this.startTime = data
    },
    // 获取导出结束时间源
    changeEndTime(data) {
      this.endTime = data
    },
    // 导出数据
    getExportData() {
      if (!!this.startTime && !!this.endTime) {
        let parmas = {
          beginTime: this.startTime,
          endTime: this.endTime
        }
        api.exportUnverified(parmas).then(data => {
          if (data && data != null) {
            window.open(data)
          }
        })
        this.exportModal = false
      }
    },
    // 删除某个未提交骑士
    deletaUpdate() {
      if (this.DeleteId) {
        api.deleteUnverified(this.DeleteId).then(data => {
          if (data === true) {
            this.$Message.info('删除成功')
            this.getDeliverManager() // 刷新列表
          }
        })
      }
    },
    // 取消删除弹框
    cancel() {
      this.$Message.info('取消删除')
    },
    // 点击分页发生变化
    changePage(page) {
      this.params.pageNumber = page
      this.getDeliverManager()
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
      let minutes =
        date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
      let seconds =
        date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
      return `${date.getFullYear()}/${month}/${day} ${hour}:${minutes}:${seconds}`
    }
  }
}
</script>
<style lang="css" scoped>
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

.header-search {
  float: right;
  margin-right: 20px;
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
