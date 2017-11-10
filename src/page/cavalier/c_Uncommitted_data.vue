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
    <div><Table stripe :columns="columns1" :data="DeliverManager"></Table></div>
    <!-- 导出数据Modal -->
    <Modal v-model="exportModal" width="300">
      <div class="vm-textCenter">
        <DatePicker type="date" v-model="startTime" placeholder="选择日期" style="width: 100%"></DatePicker>
        <div class="mtb10">到</div>
        <DatePicker type="date" v-model="endTime" placeholder="选择日期" style="width: 100%"></DatePicker>
      </div>
      <div slot="footer">
        <Button type="primary" long @click="getExportData()">确定</Button>
      </div>
    </Modal>

    <div v-if="DeliverManager && DeliverManager.length > 0" class="page"><Page :total="total" :current="params.pageNumber" @on-change="changePage"></Page></div>
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
          align: 'center'
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
                      // 删某一个未提交资料骑士
                      api
                        .deleteUnverified(params.row.psDeliverApplyId)
                        .then(data => {
                          if (data === true) {
                            this.getDeliverManager() // 刷新列表
                          }
                        })
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
    // 导出数据
    getExportData() {
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
    },
    // 点击分页发生变化
    changePage(page) {
      console.log(page, 'page')
      this.params.pageNumber = page
      this.getDeliverManager()
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
