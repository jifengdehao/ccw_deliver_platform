/*
 * @Author: ZengFanlu 
 * @Date: 2017-11-10 11:52:57 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 骑士管理 配送人员列表 
 */

<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <h2>配送人员</h2>
      <div class="header-search">
        <Input placeholder="姓名/联系方式/身份证号" style="width: 200px" v-model="searchData"></Input>
        <Icon type="ios-search icos" @click.native="onSearch"></Icon>
      </div>
    </div>

    <div>
      <div class="clearfix" style="margin-bottom: 10px" v-if="deliverListData && deliverListData.length > 0">
        <Button type="ghost" size="large" @click="showExportModal" class="fr"> 导出</Button>
      </div>

      <Table border :columns="columns7" :data="deliverListData" style="margin-bottom: 20px"></Table>
      <Page v-if="deliverListData && deliverListData.length > 0" :current="params.pageNumber" :total="total" @on-change="changePage" style="float: right"></Page>

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

      <!-- Moadl 弹框 -->
      <Modal
          v-model="showModal"
          title="提醒"
          @on-ok="ok"
          @on-cancel="cancel">
          <p style="text-align: center">是否确认冻结此用户？</p>
      </Modal>

    </div>
  </div>
</template>
<script>
import * as api from '@/api/common'
export default {
  components: {},
  data() {
    return {
      params: {
        pageSize: 10,
        pageNumber: 1,
        condition: ''
      }, // 列表请求数据
      searchData: '', // 搜索数据
      total: '', // 总条数
      exportModal: false, // 隐藏导出弹框
      psDeliverId: '', // 保存冻结ID/ 查看ID
      startTime: '', // 导出开始时间
      endTime: '', // 导出结束时间
      showModal: false, // 隐藏冻结弹框
      columns7: [
        {
          title: '序号',
          type: 'index'
        },
        {
          title: '用户ID',
          key: 'psEmpno'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '联系方式',
          key: 'mobileno'
        },
        {
          title: '所属菜市场',
          key: 'psDeliverMarket',
          render: (h, params) => {
            return h('div', [h('span', params.row.psDeliverMarket.marketName)])
          }
        },
        {
          title: '工作状态',
          key: 'personStatusStr'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
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
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push(
                        '/cPersonalDetailInfo/seeUser?id=' +
                          params.row.psDeliverId
                      )
                    }
                  }
                },
                '查看'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.showModal = true
                      this.psDeliverId = params.row.psDeliverId
                    }
                  }
                },
                '冻结'
              )
            ])
          }
        }
      ],
      deliverListData: []
    }
  },
  created() {
    this.getDeliverList() // 初始化数据
  },
  methods: {
    // 获取初始化列表数据
    getDeliverList() {
      api.getDeliverList(this.params).then(res => {
        this.deliverListData = res.records
        this.total = res.total
      })
    },
    // 搜索请求
    onSearch() {
      this.params.pageNumber = 1
      this.params.condition = this.searchData
      this.getDeliverList()
      this.searchData = ''
    },
    // 显示导出框
    showExportModal() {
      this.exportModal = true
      this.endTime = ''
      this.startTime = ''
    },
    // 导出数据
    getExportData() {
      let params = {
        beginTime: this.startTime,
        endTime: this.endTime
      }
      api.getDeliverPoi(params).then(data => {
        // 导出数据
        window.open(data)
      })
      this.exportModal = false
    },
    // 确定冻结用户
    ok() {
      api.getDeliverId(this.psDeliverId).then(obj => {
        if (obj === true) {
          this.getDeliverList() // 初始化数据
        }
      })
    },
    // 点击分页发生变化
    changePage(page) {
      this.params.pageNumber = page
      this.getDeliverList()
    },
    cancel() {}
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

.header .header-search {
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

.mtb10 {
  text-align: center;
}
</style>
