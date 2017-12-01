/*
 * @Author: ZengFanlu 
 * @Date: 2017-11-10 11:53:38 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 骑士管理 骑士审核列表 
 */

<template>
  <div class="main">
    <!-- 头部 -->
    <div class="header">
      <h2>骑士审核</h2>
      <div class="header-search" @keydown.enter="onSearch">
        <Input placeholder="姓名/联系方式/身份证号" style="width: 200px" v-model="searchData"></Input>
        <Icon type="close-circled icos icosS" v-if="searchData" @click.native="onDelete"></Icon>
        <Icon type="ios-search icos" @click.native="onSearch"></Icon>
      </div>
    </div>
    <div class="c_auditing_list">
      <Table border  ref="selection" :columns="columns4" :data="examineData" @on-selection-change="changeSelect"></Table>
    </div>
    <div class="c_auditing_button" v-if="examineData && examineData.length > 0">
      <Button type="ghost" size="large" @click="onSelect(true)">全选</Button>
      <Button type="ghost" size="large" @click="auditUser('1')">通过</Button>
      <Button type="ghost" size="large" @click="auditUser('2')">未通过</Button>
    </div>
    <div v-if="examineData && examineData.length > 0" style="float: right"><Page :total="total" :current="params.pageNumber" @on-change="changePage"></Page></div>
    <div>
      <!-- Moadl 弹框 -->
      <Modal
          v-model="showModal"
          title="提醒"
          @on-ok="ok"
          @on-cancel="cancel">
          <p style="text-align: center">{{ ModalTitle }}</p>
      </Modal>
    </div>
    <div>
       <Modal title="查看图片" v-model="visible" width="1224">
          <img :src="PositiveImg" style="width: 388px; height: 325px; float: left; margin-right: 10px">
          <img :src="negativeImg" style="width: 390px; height: 325px; margin-right: 10px">
          <img :src="inHandImg" style="width: 390px; height: 325px;">
       </Modal>
    </div>
    <div>
       <Modal title="查看图片" v-model="visibleHealth" width="840">
          <img :src="HealthImg" style="width: 395px; height: 325px; margin-right: 10px;">
          <img :src="contraryImg" style="width: 395px; height: 325px;">
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
      showModal: false, // 显示弹框
      visible: false, // 图片弹框显示
      visibleHealth: false, // 健康证弹框显示
      ModalTitle: '', // 弹框title
      PositiveImg: '', // 正面身份证
      negativeImg: '', // 反面身份证
      inHandImg: '', // 手持身份证
      HealthImg: '', // 健康证
      contraryImg: '', // 反面健康证
      selectData: [], // 保存选中数据
      paramsData: [], // 身份证信息
      searchData: '', // 搜索值
      DeliverAudit: {
        status: '',
        deliverApplyId: []
      }, // 通过/ 不通过数据
      columns4: [
        {
          type: 'selection',
          width: '60',
          align: 'center'
        },
        {
          title: '序号',
          key: 'ID',
          type: 'index',
          width: '70',
          align: 'center'
        },
        {
          title: '用户ID',
          width: '90',
          key: 'psDeliverApplyId',
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name',
          width: '130',
          align: 'center'
        },
        {
          title: '学历',
          key: 'educationStr',
          width: '90',
          align: 'center'
        },
        {
          title: '性别',
          key: 'sexStr',
          width: '70',
          align: 'center'
        },
        {
          title: '联系方式',
          key: 'mobileno',
          align: 'center'
        },
        {
          title: '出生年月日',
          key: 'birthday',
          align: 'center',
          render: (h, params) => {
            return 'span', this.formatTime(params.row.birthday)
          }
        },
        {
          title: '身份证号码',
          key: 'identityCard',
          align: 'center'
        },
        {
          title: '身份证正反面',
          width: '130',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  on: {
                    click: () => {
                      this.visible = true
                      this.paramsData = params.row.pictureList
                      this.paramsData.forEach(function(item, index) {
                        switch (item.picType) {
                          case 4:
                            this.PositiveImg = item.picUrl
                            break
                          case 5:
                            this.negativeImg = item.picUrl
                            break
                          case 7: // 手持身份证
                            this.inHandImg = item.picUrl
                        }
                      }, this)
                    }
                  }
                },
                '浮窗预览'
              )
            ])
          }
        },
        {
          title: '健康证',
          width: '130',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  on: {
                    click: () => {
                      this.paramsData = params.row.pictureList
                      this.visibleHealth = true
                      this.paramsData.forEach(function(item, index) {
                        switch (item.picType) {
                          case 8:
                            this.HealthImg = item.picUrl
                            break
                          case 9:
                            this.contraryImg = item.picUrl
                        }
                      }, this)
                    }
                  }
                },
                '浮窗预览'
              )
            ])
          }
        },
        {
          title: '操作',
          key: 'operation',
          width: '170',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      // this.ModalTitle = '是否确认此用户通过'
                      // this.showModal = true
                      // api.getDeliverAudit({
                      //   deliverApplyId: [params.row.psDeliverApplyId],
                      //   status: '3'
                      // })

                      this.$Modal.confirm({
                        title: '提示',
                        content: '是否确认此用户通过',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                          api
                            .getDeliverAudit({
                              deliverApplyId: [params.row.psDeliverApplyId],
                              status: '3'
                            })
                            .then(data => {
                              this.getAuditManager()
                            })
                        }
                      })

                      // this.$Modal.success({
                      //   title: '提示',
                      //   content: '是否确认此用户通过',
                      //   onOk: () => {
                      //     this.$Message.info('Clicked ok')
                      //   }
                      // })
                    }
                  }
                },
                '通过'
              ),
              h(
                'Button',
                {
                  on: {
                    click: () => {
                      // this.ModalTitle = '是否确认此用户不通过'
                      // this.showModal = true
                      // console.log(params.row.psDeliverApplyId)
                      // api.getDeliverAudit({
                      //   deliverApplyId: [params.row.psDeliverApplyId],
                      //   status: '4'
                      // })
                      this.$Modal.confirm({
                        title: '提示',
                        content: '是否确认此用户不通过',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                          api
                            .getDeliverAudit({
                              deliverApplyId: [params.row.psDeliverApplyId],
                              status: '4'
                            })
                            .then(data => {
                              this.getAuditManager()
                            })
                        }
                      })
                    }
                  }
                },
                '未通过'
              )
            ])
          }
        }
      ],
      examineData: [], // 数据列表
      total: '', // 分页总数
      params: {
        pageSize: 10, // 每页显示记录数
        pageNumber: 1, // 当前页码
        condition: '' //	查询条件框
      }
    }
  },
  created: function() {
    this.getAuditManager()
  },
  methods: {
    // 获取列表数据
    getAuditManager() {
      api.getAuditManager(this.params).then(data => {
        this.examineData = data.records
        this.total = data.total // 获取分页总数
      })
    },
    // 点击全选
    onSelect(flag) {
      this.$refs.selection.selectAll(flag)
    },
    // 选择时返回的数据
    changeSelect(data) {
      console.log(data)
      this.selectData = data
    },
    // 通过/ 未通过
    auditUser(index) {
      if (this.selectData.length > 0) {
        this.showModal = true
        switch (index) {
          case '1':
            this.ModalTitle = '是否确认所有用户通过审核？'
            this.DeliverAudit.status = '1'
            break
          case '2':
            this.ModalTitle = '是否确认所有用户不通过审核？'
            this.DeliverAudit.status = '0'
        }
      }
    },
    ok() {
      this.DeliverAudit.deliverApplyId = []
      if (this.selectData != []) {
        // 点击Modal确定按钮 发送请求
        this.selectData.forEach(item => {
          // 获取数据ID
          this.DeliverAudit.deliverApplyId.push(item.psDeliverApplyId)
        })
      }
      switch (this.ModalTitle) {
        case '是否确认此用户通过':
          this.DeliverAudit.status = '3'
          break
        case '是否确认此用户不通过':
          this.DeliverAudit.status = '4'
          break
        case '是否确认所有用户通过审核？':
          this.DeliverAudit.status = '3'
          this.params.pageNumber = 1
          break
        case '是否确认所有用户不通过审核？':
          this.DeliverAudit.status = '4'
          this.params.pageNumber = 1
      }
      api.getDeliverAudit(this.DeliverAudit).then(data => {
        if (data === true) {
          this.getAuditManager() // 初始化请求
          this.DeliverAudit.deliverApplyId = []
        }
      })
      // this.$refs.selection.selectAll(false) // 取消选中框
    },
    cancel() {
      this.$refs.selection.selectAll(false) // 取消选中框
    },
    // 搜索发送请求
    onSearch() {
      this.params.pageNumber = 1
      this.params.condition = this.searchData
      this.getAuditManager()
      this.searchData = ''
    },
    // 删除搜索内容
    onDelete() {
      this.searchData = ''
    },
    // 点击分页发生变化
    changePage(page) {
      this.params.pageNumber = page
      this.getAuditManager()
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
      // let minutes =
      //   date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
      // let seconds =
      //   date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
      return `${date.getFullYear()}年${month}月${day}日`
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

.header .header-search {
  position: relative;
  float: right;
  margin-right: 45px;
}
.icosS {
  color: #5c6b77 !important;
  right: 3px !important;
  font-size: 16px !important;
  line-height: 26px;
}

.icos {
  position: absolute;
  top: 8px;
  right: -25px;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
}

.c_auditing_list {
  margin-bottom: 20px;
}
</style>
