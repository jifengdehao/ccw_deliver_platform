/*
 * @Author: WuFengliang 
 * @Date: 2017-11-07 15:18:10 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint: 消息
 */
 <template>
   <div>
    <!-- 头部 -->
    <div class="header">
      <h2>消息</h2>
    </div>
    <Table v-if="messageData" style="margin:20px auto;" border :columns="messageTitles" :data="messageData.records"></Table>
    <Page v-if="messageData" class="fr" style="margin:20px 0" :total="messageData.total" @on-change="reLoadData"></Page>
   </div>
 </template>
 <script>
import * as http from '@/api/common'
export default {
  name: 'setting_message',
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
          title: '消息时间',
          key: 'pushTime',
          render: (h, params) => {
            return h('span', this.formatTime(params.row.pushTime))
          }
        },
        {
          title: '消息标题',
          key: 'title'
        },
        {
          title: '消息内容',
          key: 'outline'
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
                      this.$router.push({
                        path: `/setting_message/${params.row.smMssageId}`
                      })
                    }
                  }
                },
                '查看'
              )
            ])
          }
        }
      ],
      messageData: null
    }
  },
  created() {
    this.getMsgListData()
  },
  methods: {
    //  获取消息列表数据
    getMsgListData() {
      http.getAccountMsgList(this.params).then(data => {
        this.messageData = data
      })
    },
    //  分页加载下一页
    reLoadData(pageNum) {
      this.params.pageNumber = pageNum
      this.getMsgListData()
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
</style>
