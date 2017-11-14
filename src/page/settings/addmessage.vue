<template>
  <div id="addmessage" class="main" :class="{'isShow':show}">
    <div class="header">
      <h2>消息</h2>
    </div>
    <section class="addmessage_list">
      <p>
        <h3 style="display: inline-block;width: 100px">发布时间： </h3>
        <Select v-model="singleParams.year" size="large" style="width:70px" placeholder="年">
          <Option v-for="item in [2017,2018]" :value="item" :key="item">{{ item }}</Option>
        </Select>&nbsp;&nbsp;年&nbsp;&nbsp;
        <Select v-model="singleParams.month" size="large" style="width:50px" placeholder="月" @on-change="loadDays">
          <Option v-for="item in 12" :value="item" :key="item">{{ item }}</Option>
        </Select>&nbsp;&nbsp;月&nbsp;&nbsp;
        <Select v-model="singleParams.day" size="large" style="width:50px" placeholder="日">
          <Option v-for="item in singleParams.days" :value="item" :key="item">{{ item }}</Option>
        </Select>&nbsp;&nbsp;日&nbsp;&nbsp;
        <Select v-model="singleParams.hour" size="large" style="width:50px" placeholder="时">
          <Option v-for="(item,index) in 24" :value="item" :key="item">{{ index }}</Option>
        </Select>&nbsp;&nbsp;时&nbsp;&nbsp;
        <Select v-model="singleParams.minutes" size="large" style="width:50px" placeholder="分">
          <Option v-for="(item,index) in 60" :value="item - 1" :key="item">{{ index }}</Option>
        </Select>&nbsp;&nbsp;分&nbsp;&nbsp;
      </p>
      <p>
        <h3 style="display: inline-block;width: 100px">发布类型： </h3>
        <Select v-model="params.pushType" size="large" style="width:200px" @on-change="filterTypes">
          <Option v-for="item in pushTypeArray" :value="item.value" :key="item.value">{{ item.text }}</Option>
        </Select>
      </p>
      <p>
        <h3 style="display: inline-block;width: 100px">标题： </h3>
        <input type="text" v-model="params.title" style="width: 200px;height: 36px;border: 1px solid #ddd;border-radius: 5px">
      </p>
      <p>
        <h3 style="display: inline-block;width: 100px">内容或链接： </h3>
        <textarea v-model="params.content" cols="100" rows="5" style="border: 1px solid #ddd;border-radius: 5px;vertical-align: top;font-size: 16px;padding: 5px;" placeholder="请输入内容或链接"></textarea>
      </p>
    </section>
    <section class="addmessage_button">
      <Button size="large" style="width:100px;background-color: #fff;margin-right:10px" @click="resetSingleInfo">取消</Button>
      <Button size="large" style="width:100px;background-color: #fff;" @click="addSingleInfo">确定</Button>
    </section>
  </div>
</template>
<script>
import * as http from '@/api/common'
export default {
  data() {
    return {
      params: {
        pushTimeStr: '', //  发布时间
        pushType: '', //  发布类型
        title: '', //  消息
        content: '', //  消息内容
        types: ''
      },
      singleParams: {
        year: '', //  年
        month: '', //  月
        day: '', //  日
        hour: '', //  时
        minutes: '', //  分
        days: 0 //  每月多少天
      },
      pushTypeArray: [
        {
          value: 7,
          text: '平台消息'
        },
        {
          value: 1,
          text: '应用消息-url'
        },
        {
          value: 2,
          text: '应用消息-文本消息'
        }
      ]
    }
  },
  computed: {
    show() {
      return this.$store.state.show
    }
  },
  created() {
    this.resetSingleInfo()
  },
  methods: {
    //  加载每月天数
    loadDays() {
      if (!!this.singleParams.year && !!this.singleParams.month) {
        this.singleParams.days = new Date(
          this.singleParams.year,
          this.singleParams.month,
          0
        ).getDate()
      } else {
        return
      }
    },
    //  检测types
    filterTypes(value) {
      switch (value) {
        case 7:
          this.params.pushType = 7
          this.params.types = 1
          break
        case 1:
          this.params.pushType = 1
          this.params.types = 2
          break
        case 2:
          this.params.pushType = 1
          this.params.types = 3
          break
      }
    },
    //  重置消息
    resetSingleInfo() {
      if (this.$route.name.indexOf('addMessage') > -1) {
        //  路由是addMessage
        for (let i in this.params) {
          this.params[i] = ''
        }

        for (let i in this.singleParams) {
          if (i !== 'days') {
            this.singleParams[i] = ''
          }
        }
      } else if (this.$route.name.startsWith('edit')) {
        //  路由是edit
        http
          .getSingleInfo({
            smMssageId: this.$route.params.smMssageId
          })
          .then(data => {
            console.log(data)
            for (let i in this.params) {
              this.params[i] = data[i]
            }
            let date = new Date(this.params.pushTimeStr)
            this.singleParams = {
              year: date.getFullYear(),
              month: date.getMonth() + 1,
              day: date.getDate(),
              hour: date.getHours() + 1,
              minutes: date.getMinutes(),
              days: 0
            }
            console.log(this.singleParams)
          })
      }
    },
    //  确定
    addSingleInfo() {
      //  时间拼接
      this.singleParams.month =
        this.singleParams.hour < 10
          ? `0${this.singleParams.month}`
          : this.singleParams.month

      this.singleParams.day =
        this.singleParams.day < 10
          ? `0${this.singleParams.day}`
          : this.singleParams.day

      this.singleParams.hour =
        this.singleParams.hour < 10
          ? `0${this.singleParams.hour}`
          : this.singleParams.hour

      this.singleParams.minutes =
        this.singleParams.minutes < 10
          ? `0${this.singleParams.minutes}`
          : this.singleParams.minutes

      this.params.pushTimeStr = `${this.singleParams.year}-${this.singleParams
        .month}-${this.singleParams.day} ${this.singleParams.hour}:${this
        .singleParams.minutes}`

      for (let i in this.params) {
        if (!this.params[i]) {
          this.$Modal.warning({
            title: '提示',
            content: '请确认你填写的内容正确'
          })
          return
        }
      }
      if (this.$route.name.indexOf('addMessage') > -1) {
        //  添加消息
        http.addSingleInfo(this.params).then(data => {
          this.resetSingleInfo()
        })
      } else if (this.$route.name.startsWith('edit')) {
        http.putSingleInfo({
          smMssageId: this.$route.params.smMssageId
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
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

.addmessage_list {
  margin: 20px auto;
}

.addmessage_list > p {
  margin: 20px auto;
}

.addmessage_button {
  text-align: center;
}
</style>
