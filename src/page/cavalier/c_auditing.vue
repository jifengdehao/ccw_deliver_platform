<template>
  <div class="main">
    <!-- 头部 -->
    <div class="header">
      <h2>骑士审核</h2>
      <div class="header-search">
        <Input placeholder="姓名/联系方式/身份证号" style="width: 200px" v-model="searchData"></Input>
        <Icon type="ios-search icos" @click.native="onSearch"></Icon>
      </div>
    </div>
    <div class="c_auditing_list">
      <Table ref="selection" :columns="columns4" :data="examineData" @on-selection-change="changeSelect"></Table>
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
       <Modal title="查看图片" v-model="visible">
          <img :src="PositiveImg" style="width: 100%; height: 325px;">
          <img :src="negativeImg" style="width: 100%; height: 325px;">
       </Modal>
    </div>
    <div>
       <Modal title="查看图片" v-model="visibleHealth">
          <img :src="HealthImg" style="width: 100%; height: 325px;">
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
      HealthImg: '', // 健康证
      selectData: [], // 保存选中数据
      paramsData: [], // 身份证信息
      searchData: '', // 搜索值
      DeliverAudit: {
        status: '',
        deliverApplyId: []
      },// 通过/ 不通过数据
      columns4: [
        {
          type: 'selection',
          width: '80',
          align: 'center'
        },
        {
          title: '序号',
          key: 'ID',
          type: 'index',
          width: '80',
          align: 'center'
        },
        {
          title: '用户ID',
          width: '100',
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
          width: '130',
          align: 'center'
        },
        {
          title: '性别',
          key: 'sexStr',
          width: '100',
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
          align: 'center'
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
              h( 'Button', {
                  on: {
                    click: () => {
                      this.paramsData = params.row.pictureList
                      this.paramsData.forEach(function(item, index) {
                        switch (item.picType) {
                          case 1:
                            this.PositiveImg = item.picUrl
                            this.visible = true
                            break
                          case 2:
                            this.negativeImg = item.picUrl
                            this.visible = true
                            break
                          case 3:
                            this.HealthImg = item.picUrl
                        }
                      }, this)
                    }
                  }
                },'浮窗预览')
            ])
          }
        },
        {
          title: '健康证',
          width: '130',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                  on: {
                    click: () => {
                      this.paramsData = params.row.pictureList
                      this.visibleHealth = true
                      this.paramsData.forEach(function(item, index) {
                        switch (item.picType) {
                          case 2:
                            this.HealthImg = item.picUrl
                        }
                      }, this)
                    }
                  }
                },'浮窗预览')
            ])
          }
        },
        {
          title: '操作',
          key: 'operation',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.selectData.forEach(function(item) {
                        if (params.row.psDeliverApplyId === item.psDeliverApplyId) { // 点击判断选择ID跟点击ID是否一致
                          this.ModalTitle = '是否确认此用户通过'
                          this.showModal = true
                        }
                      }, this)
                    }
                  }}, '通过'),
              h('Button',{
                on: {
                    click: () => {
                       this.selectData.forEach(function(item) {
                        if (params.row.psDeliverApplyId === item.psDeliverApplyId) { // 点击判断选择ID跟点击ID是否一致
                          this.ModalTitle = '是否确认此用户不通过'
                          this.showModal = true
                        }
                      }, this)
                    }
                  }
                }, '不通过')
            ])
          }
        }
      ],
      examineData: [], // 数据列表
      total: '', // 分页总数
      params: {
        pageSize: 10, // 每页显示记录数
        pageNumber: 1, // 当前页码
        condition: '', //	查询条件框
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
      this.selectData = data
    },
    // 通过/ 未通过
    auditUser(index) {
      if (this.selectData.length === this.examineData.length) {
        this.showModal = true
        switch (index) {
          case '1':
            this.ModalTitle = '是否确认所有用户通过审核？';
            this.DeliverAudit.status = '1'
            break
          case '2':
            this.ModalTitle = '是否确认所有用户不通过审核？'
            this.DeliverAudit.status = '0'
        }
      }
    },
    ok() { // 点击Modal确定按钮 发送请求
      this.selectData.forEach((item) => { // 获取数据ID
        this.DeliverAudit.deliverApplyId.push(item.psDeliverApplyId)
      })
      switch (this.ModalTitle) {
        case '是否确认此用户通过':
            this.DeliverAudit.status = '3'
            api.getDeliverAudit(this.DeliverAudit).then(data => {}); 
            break
        case '是否确认此用户不通过': 
            this.DeliverAudit.status = '4'
            api.getDeliverAudit(this.DeliverAudit).then(data => {});
            break
        case '是否确认所有用户通过审核？':
            this.DeliverAudit.status = '3'
            api.getDeliverAudit(this.DeliverAudit).then(data => {});
            break
        case '是否确认所有用户不通过审核？':
            this.DeliverAudit.status = '4'
            api.getDeliverAudit(this.DeliverAudit).then(data => {});
      }
      this.$refs.selection.selectAll(false) // 取消选中框
      this.getAuditManager() // 初始化请求
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
    // 点击分页发生变化
    changePage(page) {
      this.params.pageNumber = page
      this.getAuditManager()
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
