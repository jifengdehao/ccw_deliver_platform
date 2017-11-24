/*
 * @Author: WuFengliang 
 * @Date: 2017-11-07 16:04:45 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint: 消息详情
 */
 <template>
   <div>
    <!-- 头部 -->
    <div class="header">
      <h2>查看</h2>
    </div>
    <ul v-if="singleData">
      <li><span>消息时间:</span>{{formatTime(singleData.pushTime)}}</li>
      <li><span>发布类型:</span>{{filterMsgType(singleData.msgType)}}</li>
      <li><span>消息标题:</span>{{singleData.title}}</li>
      <li><span>消息内容:</span>{{singleData.content}}</li>
    </ul>
   </div>
 </template>
 <script>
import * as http from '@/api/common'
export default {
  name: 'settingMessageDetail',
  data() {
    return {
      singleData: null
    }
  },
  created() {
    this.getSingleData()
  },
  methods: {
    //  获取单个信息
    getSingleData() {
      http
        .getSingleInfo({
          smMssageId: this.$route.params.smMssageId
        })
        .then(data => {
          this.singleData = data
        })
    },
    //  转义消息类型
    filterMsgType(num) {
      let str = ''
      switch (num) {
        case 1:
          str = '配送App消息'
          break
        case 2:
          str = '应用消息'
          break
        case 3:
          str = '活动消息'
          break
        case 4:
          str = '菜谱消息'
          break
        case 5:
          str = '用户端系统消息'
          break
        case 6:
          str = '商户端系统消息'
          break
        case 7:
          str = '配送端系统消息'
          break
      }
      return str
    },
    //  时间过滤
    formatTime(time) {
      if (!time) {
        return
      }
      let date = new Date(time)
      let month =
        date.getMonth() + 1 >= 10
          ? date.getMonth() + 1
          : '0' + (date.getMonth() + 1)
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

ul > li {
  width: 100%;
  margin: 40px;
}

ul > li > span {
  margin-right: 10px;
}
</style>
