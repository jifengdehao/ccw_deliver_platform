<template>
  <div id="s_operation" class="main" :class="{'isShow':show}">
    <!-- 头部 -->
    <div class="header">
      <h2>操作日志</h2>
      <div class="header-search">
        <Input placeholder="姓名/联系方式/用户ID" style="width: 200px"></Input>
        <span><Icon type="ios-search icos"></Icon></span>
      </div>
    </div>
    <div class="btn-box">
      <Button type="ghost" size="large" class="fr" @click="isBoolean=true">导出</Button>
    </div>
    <Table border :columns="operationTitles" :data="operationData.records"></Table>
    <Page v-if="operationData" class="fr" style="margin:20px 0" :total="operationData.total" @on-change="reLoadData"></Page>
    <Modal v-model="isBoolean" @on-ok="downLoadData">
        <div class="modal-box">
          <DatePicker format="yyyy年MM月dd日" v-model="downParams.beginTime" type="date" placeholder="请选择开始时间" style="width: 200px"></DatePicker>
          &nbsp;&nbsp;—&nbsp;&nbsp;
          <DatePicker format="yyyy年MM月dd日" v-model="downParams.endTime" type="date" placeholder="请选择结束时间" style="width: 200px"></DatePicker>
        </div>
    </Modal>
  </div>
</template>
<script>
import * as http from '@/api/common'
export default {
  name: 'operationLog',
  computed: {
    show() {
      return this.$store.state.show
    }
  },
  data() {
    return {
      params: {
        pageSize: 10,
        pageNumber: 1
      },
      downParams: {
        beginTime: '',
        endTime: ''
      },
      isBoolean: false,
      operationTitles: [
        {
          title: '序号',
          type: 'index'
        },
        {
          title: '用户ID',
          key: 'creator'
        },
        {
          title: '姓名',
          key: 'userName'
        },
        {
          title: '角色名称',
          key: 'roleName'
        },
        {
          width: 250,
          title: '操作',
          key: 'action_desc'
        }
      ],
      operationData: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗'
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道'
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道'
        }
      ]
    }
  },
  created() {
    this.getOperationLog()
  },
  methods: {
    //  获取操作日志列表
    getOperationLog() {
      http.getOperationLog(this.params).then(data => {
        this.operationData = data
      })
    },
    //  分页加载下一页
    reLoadData(pageNum) {
      this.params.pageNumber = pageNum
      this.getOperationLog()
    },
    //  导出数据
    downLoadData() {
      console.log(this.downParams)
      http.downLoadLog(this.downParams).then(data => {
        console.log(data)
      })
    }
  }
}
</script>
<style lang="css" scoped>
.header {
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
.btn-box {
  width: 100%;
  line-height: 50px;
  overflow: hidden;

  margin: 10px auto;
}

.modal-box {
  margin: 40px auto;
  text-align: center;
}
</style>
