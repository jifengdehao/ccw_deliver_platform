<template>
  <div class="main">
    <!-- 头部 -->
    <div class="header">
      <h2>骑士审核</h2>
      <div class="header-search">
        <Input placeholder="姓名/联系方式/身份证号" style="width: 200px"></Input>
        <Icon type="ios-search icos"></Icon>
      </div>
    </div>
    <div class="c_auditing_list">
      <Table border ref="selection" :columns="columns4" :data="examineData" @on-selection-change="changeSelect"></Table>
    </div>
    <div class="c_auditing_button">
      <Button type="ghost" size="large" @click="onSelect(true)">全选</Button>
      <Button type="ghost" size="large" @click="auditUser('1')">通过</Button>
      <Button type="ghost" size="large" @click="auditUser('2')">未通过</Button>
    </div>
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
  </div>
</template>
<script>
import * as api from '@/api/common'
export default {
  components: {},
  data() {
    return {
      showModal: false, // 显示弹框
      ModalTitle: '', // 弹框title
      flag: false,
      refsSelect: '',
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
          width: '110',
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
          title: '性别',
          key: 'sex',
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
          title: '身份证正方面',
          width: '130',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {}
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
                  props: {}
                },
                '浮窗预览'
              )
            ])
          }
        },
        {
          title: '操作',
          key: 'operation',
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
                      console.log(params)
                    }
                  }
                },
                '通过'
              ),
              h(
                'Button',
                {
                  style: {
                    marginRight: '5px'
                  }
                },
                '不通过'
              ),
              h('Button', {}, '查看')
            ])
          }
        }
      ],
      examineData: [], // 数据列表
    }
  },
  methods: {
    // 获取列表数据
    getAuditManager() {
      api.getAuditManager().then(data => {})
    },
    // 点击全选
    onSelect(flag) {
      this.refsSelect = this.$refs.selection.selectAll(flag)
      this.flag = true
    },
    // 选择时返回的数据
    changeSelect(data) {
      console.log(data, 'selection')
    },
    // 通过/ 未通过
    auditUser(index) {
      if (this.flag === true) {
        this.showModal = true
        switch (index) {
          case '1':
            this.ModalTitle = '是否确认所有用户通过审核？';
            break
          case '2':
            this.ModalTitle = '是否确认所有用户不通过审核？'
        }
      }
    },
    ok() {
      this.refsSelect = this.$refs.selection.selectAll(false)
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

.c_auditing_list {
  margin-bottom: 20px;
}
</style>
