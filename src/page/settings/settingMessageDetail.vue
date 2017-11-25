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
      <li><span>消息时间:</span>{{singleData.pushTime | filterTime}}</li>
      <li><span>发布类型:</span>{{filterMsgType(singleData.msgType)}}</li>
      <li><span>消息标题:</span>{{singleData.title}}</li>
      <li><span>消息内容:</span>{{singleData.content}}</li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
import * as http from '@/api/common'
import * as time from '@/until/time'

export default {
  name: 'settingMessageDetail',
  data() {
    return {
      id: (() => {
        return this.$route.params.smMssageId
      })(),
      singleData: null
    }
  },
  created() {
    this.getSingleData()
  },
  filters: {
    filterTime(value) {
      return time.formatDateTime(value)
    }
  },
  watch: {
    $route(to, go) {
      console.log(go)
      if (to.path !== go.path) {
        this.getSingleData()
      }
    }
  },
  methods: {
    //  获取单个信息
    getSingleData() {
      if (!this.$route.params.smMssageId) {
        return
      }
      http
        .getSingleInfo({ smMssageId: this.$route.params.smMssageId })
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
