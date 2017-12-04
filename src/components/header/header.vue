<template>
  <div id="header">
    <Row>
      <Col :xs="0" :sm="3" :md="3" :lg="3">
      <div class="logo">菜城科技有限公司</div>
      </Col>
      <Col :xs="0" :sm="12" :md="12" :lg="12">
      <div class="message">
        <ul class="scroll-content" :style="{ top }">
          <li v-for="(item,index) in prizeList" @click="goToSysMsgDetails(item.smMssageId)" :key="item.smMssageId">
            系统消息：{{item.pushTime | filterTime}}&nbsp;&nbsp;{{item.title}}
          </li>
        </ul>
      </div>
      </Col>
      <Col :xs="12" :sm="3" :md="3" :lg="3">
      <Icon type="android-person" :size="iconSize"></Icon>&nbsp;&nbsp;管理员：{{username}}
      </Col>
      <Col :xs="0" :sm="3" :md="3" :lg="3">
      <div @click="goToMsg">
        <Icon type="ios-chatboxes-outline" :size="iconSize"></Icon>&nbsp;&nbsp;消息
      </div>
      </Col>
      <Col :xs="12" :sm="3" :md="3" :lg="3">
      <div @click="logout">
        <Icon type="log-out" :size="iconSize"></Icon>&nbsp;&nbsp;安全退出
      </div>
      </Col>
    </Row>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from '@/api/common'
  import * as time from '@/until/time'

  export default {
    data() {
      return {
        iconSize: '18',
        prizeList: [],
        activeIndex: 0
      }
    },
    computed: {
      username() {
        return JSON.parse(sessionStorage.getItem('userInfo')).userName
      },
      top() {
        return -this.activeIndex * 60 + 'px';
      }
    },
    created() {
      this.getSysMsg()
    },
    filters: {
      filterTime(value) {
        return time.formatDateTime(value)
      }
    },
    mounted() {
      setInterval(() => {
        if (this.activeIndex < this.prizeList.length - 1) {
          this.activeIndex += 1;
        } else {
          this.activeIndex = 0;
        }
      }, 5000)
    },
    methods: {
      // 登出
      logout() {
        api.logout().then((res) => {
          if (res) {
            sessionStorage.removeItem('userInfo')
            window.location.reload()
          }
        })
      },
      // 跳转到消息列表
      goToMsg() {
        this.$router.push('/setting_message')
      },
      // 获取系统消息
      getSysMsg() {
        let params = {
          pageSize: 10,
          pageNumber: 1
        }
        api.getAccountMsgList(params).then((res) => {
          if (res) {
            this.prizeList = res.records
          }
        })
      },
      goToSysMsgDetails(id) {
        this.$router.push('/setting_message/' + id)
      }
    }
  }
</script>
<style lang="less" scoped type="text/less">
  #header {
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    background: #495060;
    height: 60px;
    line-height: 60px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    .logo {
      font-size: 16px;
    }
    .close-menu{
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .message {
      height: 60px;
      overflow: hidden;
      .scroll-content {
        position: relative;
        transition: top 0.5s;
        li {
          line-height: 60px;
          text-align: center;
        }
      }
    }

  }
</style>
