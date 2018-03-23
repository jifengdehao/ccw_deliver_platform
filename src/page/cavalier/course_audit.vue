/*
 * @Author: huShangJun 
 * @Date: 2018-03-07 17:12:05 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 课程审核
 */

<template>
  <div id="cA_pendingAudit" >
     <!-- 头部 -->
    <section class="header">
      <h2>课程审核</h2>
      <div class="header-search" @keydown.enter="onSearch">
        <Input placeholder="姓名/联系方式/身份证号" style="width: 200px" v-model="params.condition"></Input>
        <!-- <Icon type="close-circled icos icosS" v-if="searchData" @click.native="onDelete"></Icon> -->
        <Icon type="ios-search icos" @click.native="onSearch"></Icon>
      </div>
    </section>
    <!-- 表格内容 -->
    <section>
      <Tabs :animated="false"  @on-click="changeTable">
        <TabPane :label="tab.title" v-for="(tab,index) in tabs" :key="index">
          <Table border ref="selection" :columns="columns" :data="auditData.records" @on-selection-change="selection"></Table>
        </TabPane>
    </Tabs>
    </section>
    <!-- 全选操作按钮 和分页 -->
    <section class="c_auditing_button" >
      <Button type="ghost" @click="handleSelectAll(true)" v-if="current !== 1">全选</Button>
      <Button type="success" v-if="current === 0" @click="pass">通过</Button>
      <Button type="warning" v-if="current === 0" @click="notpass">不通过</Button>
      <Button type="info" v-if="current === 2" @click="recovery">恢复</Button>
      <Page class="fr" :total="auditData.total" show-total :page-size="auditData.size" :current="auditData.current" @on-change="changepage"></Page>
    </section>
    <Modal v-model="auditModal" :title="auditModalTitle" @on-ok="audit">
      <h2>{{auditModalContain}}</h2>
    </Modal>
  </div>
</template>
<script>
import mainHeader from '../../components/header/main_header.vue'
import * as api from '@/api/common.js'
export default {
  components: { mainHeader },
  data() {
    return {
      params: {
        condition: '', // 搜索内容
        trainResult: 0, // 状态 0 待审核  1 通过  2 未通过
        pageSize: 20,
        pageNumber: 1
      },
      auditParams: {
        status: 0, // 审核状态
        psDeliverTrainingId: [] // 审核id
      },
      auditModal: false, // 审核确认弹框
      auditModalTitle: '', // 审核确认弹框名称
      auditModalContain: '', // 审核确认弹框内容
      current: 0, // 当前页
      tabs: [{ title: '待审核' }, { title: '通过' }, { title: '未通过' }],
      columns: [],
      auditcolumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          type: 'index',
          title: '序号',
          width: 80
        },
        {
          title: '用户ID',
          key: 'psDeliverId'
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
          title: '身份证号',
          key: 'identityNo'
        },
        {
          title: '课程编号',
          key: 'courseNo'
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.auditParams.psDeliverTrainingId = [
                        params.row.psDeliverTrainingId
                      ]
                      this.auditModalTitle = '审核通过'
                      this.auditModalContain = '确定审核通过？'
                      this.auditParams.status = 1
                      this.auditModal = true
                    }
                  }
                },
                '通过'
              ),
              h(
                'Button',
                {
                  props: {
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.auditParams.psDeliverTrainingId = [
                        params.row.psDeliverTrainingId
                      ]
                      this.auditModalTitle = '审核不通过'
                      this.auditModalContain = '确定审核不通过？'
                      this.auditParams.status = 2
                      this.auditModal = true
                    }
                  }
                },
                '不通过'
              )
            ])
          }
        }
      ],
      passcoulumns: [
        {
          type: 'index',
          title: '序号',
          width: 80
        },
        {
          title: '用户ID',
          key: 'psDeliverId'
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
          title: '身份证号',
          key: 'identityNo'
        },
        {
          title: '课程编号',
          key: 'courseNo'
        }
      ],
      notpasscoulumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          type: 'index',
          title: '序号',
          width: 80
        },
        {
          title: '用户ID',
          key: 'psDeliverId'
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
          title: '身份证号',
          key: 'identityNo'
        },
        {
          title: '课程编号',
          key: 'courseNo'
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.auditParams.psDeliverTrainingId = [
                        params.row.psDeliverTrainingId
                      ]
                      this.auditModalTitle = '审核恢复'
                      this.auditModalContain = '确定恢复？'
                      this.auditParams.status = 0
                      this.auditModal = true
                    }
                  }
                },
                '恢复'
              )
            ])
          }
        }
      ],
      auditData: []
    }
  },
  computed: {},
  created() {
    this.columns = this.auditcolumns
  },
  mounted() {
    this.getCourseAuditList()
  },
  methods: {
    // 切换tab
    changeTable(index) {
      this.current = index
      this.params.trainResult = index
      this.params.pageNumber = 1
      switch (index) {
        case 0:
          this.columns = this.auditcolumns
          break
        case 1:
          this.columns = this.passcoulumns
          break
        case 2:
          this.columns = this.notpasscoulumns
      }
      this.getCourseAuditList()
    },
    // 获取课程审核的骑士列表
    getCourseAuditList() {
      api.getCourseAuditList(this.params).then(res => {
        this.auditData = res
      })
    },
    // 全选按钮
    handleSelectAll(status) {
      this.$refs.selection[this.current].selectAll(status)
    },
    // 选中的数据
    selection(data) {
      // console.log(data)
      if (data) {
        this.auditParams.psDeliverTrainingId = data.map(item => {
          return item.psDeliverTrainingId
        })
      }
    },
    // 分页切换
    changepage(index) {
      this.params.pageNumber = index
      this.getCourseAuditList()
    },
    // 搜索
    onSearch() {
      this.params.pageNumber = 1
      this.getCourseAuditList()
    },
    // 批量通过
    pass() {
      this.auditModalTitle = '批量通过'
      this.auditModalContain = '确定批量审核通过？'
      this.auditParams.status = 1
      this.auditModal = true
    },
    // 批量不通过
    notpass() {
      this.auditModalTitle = '批量不通过'
      this.auditModalContain = '确定批量审核不通过？'
      this.auditParams.status = 2
      this.auditModal = true
    },
    // 批量恢复
    recovery() {
      this.auditModalTitle = '批量恢复'
      this.auditModalContain = '确定批量审核恢复？'
      this.auditParams.status = 0
      this.auditModal = true
    },
    // 审核
    audit() {
      api.auditCourse(this.auditParams).then(res => {
        if (res) {
          this.getCourseAuditList()
          this.$Message.success('审核成功')
        }else{
          this.$Message.error('课程未开始， 无法操作')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
#cA_pendingAudit {
  .header {
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
    background-color: #363e54;
    h2 {
      float: left;
      color: #fff;
      margin-left: 20px;
    }
    .header-search {
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
  }
  .c_auditing_button {
    margin-top: 10px;
  }
  .button {
    margin-bottom: 10px;
  }
  .seller-video-manager-page {
    margin-top: 10px;
    text-align: right;
  }
}
</style>
