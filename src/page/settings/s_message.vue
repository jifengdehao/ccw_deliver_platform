<template>
  <div id="s_message" class="main" :class="{'isShow':show}">
    <div class="header">
      <h2>消息</h2>
      <Button class="fr" @click="addMessage">新增</Button>
    </div>
    <Table v-if="messageData" style="margin:20px auto;" border :columns="messageTitles" :data="messageData.records"></Table>
    <Page v-if="messageData" class="fr" :total="messageData.total" @on-change="reLoadData"></Page>
  </div>
</template>
<script>
import * as http from '@/api/common'
export default {
  name: 'messageManage',
  data() {
    return {
      params: {
        pageSize: 10,
        pageNumber: 1
      },
      messageTitles: [
        {
          title: '序号',
          type: 'index'
        },
        {
          title: '发布时间',
          key: 'pushTime',
          render: (h, params) => {
            return h('span', this.formatTime(params.row.pushTime))
          }
        },
        {
          title: '发布类型',
          key: 'pushType',
          render: (h, params) => {
            return h('span', params.row.pushType == 7 ? '平台消息' : '应用消息')
          }
        },
        {
          title: '发布内容',
          key: 'outline'
        },
        {
          title: '发布人',
          key: 'creator'
        },
        {
          title: '创建时间',
          key: 'createdAt',
          render: (h, params) => {
            return h('span', this.formatTime(params.row.createdAt))
          }
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
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: `/s_message/toEidt/${params.row.smMssageId}`
                      })
                    }
                  }
                },
                '修改'
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
                      //  删除单条数据
                      http
                        .delSingleInfo({
                          smMssageId: params.row.smMssageId
                        })
                        .then(data => {
                          this.getMsgListData()
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
      messageData: null
    }
  },
  computed: {
    show() {
      return this.$store.state.show
    }
  },
  created() {
    this.getMsgListData()
  },
  methods: {
    //  获取数据
    getMsgListData() {
      http.getManageMsgList(this.params).then(data => {
        this.messageData = data
      })
    },
    //  分页加载下一页
    reLoadData(pageNum) {
      this.params.pageNumber = pageNum
      this.getMsgListData()
    },
    //  新增 -> 路由跳转
    addMessage() {
      this.$router.push('/s_message/addMessage')
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
  background-color: #363e54;
}

.header h2 {
  float: left;
  color: #fff;
  margin-left: 20px;
}

.header .fr {
  height: 38px;
  margin: 1px;
}
</style>
