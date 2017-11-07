
<template>
  <div id="c_message">
    <section class="c_message_info">
      <div style="width: 50%;" class="fl">
        <p>
          <span>用户ID：</span>
          <span>{{ seeMessager.psDeliverApplyId }}</span>
        </p>
        <p>
          <span>姓名：</span>
          <span>{{ seeMessager.name }}</span>
        </p>
        <p>
          <span>性别：</span>
          <span>{{ sexData }}</span>
        </p>
        <p>
          <span>学历：</span>
          <span>{{ educationData }}</span>
        </p>
        <p>
          <span>联系方式：</span>
          <span>{{ seeMessager.mobileno }}</span>
        </p>
        <p>
          <span>出生年月：</span>
          <span>{{ seeMessager.birthday }}</span>
        </p>
        <p>
          <span>身份证号：</span>
          <span>{{ seeMessager.identityCard }}</span>
        </p>
        <p>
          <span>身份证正反面：</span><img :src="PositiveImg"> <img :src="negativeImg"></p>
      </div>

      <p class="fr">
        <span>健康证:</span> <img :src="HealthImg"></p>
    </section>
  </div>
</template>
<script>
import * as api from '@/api/common'
export default {
  components: {},
  data() {
    return {
      id: (() => {
        return this.$route.query.ID
      })(),
      seeMessager: [], // 保存数据
      PositiveImg: '', // 正面身份证
      negativeImg: '', // 反面身份证
      HealthImg: '', // 健康证
      picUserImg: [], // 保存图片
      sexData: '', // 性别过滤
      educationData: '' // 学历过滤
    }
  },
  created: function() {
    api.getSeeDeliver(this.id).then(data => { // 初始化数据
      this.seeMessager = data
      switch (data.sex) {
        case 1: this.sexData = '男'; break
        case 0: this.sexData = '女'; 
      }
      switch (data.education) {
        case 1: this.educationData = '本科'; break
        case 2: this.educationData = '专科'; break
        case 3: this.educationData = '中专'; break
        case 4: this.educationData = '高中';
      }
      data.pictureList.forEach((item) => { // 初始化图片判断
        switch (item.picType) {
          case 0:
            this.PositiveImg = item.picUrl
            break
          case 1:
            this.negativeImg = item.picUrl
            break
          case 2:
            this.HealthImg = item.picUrl
        }
      })
    })
  }
}
</script>
<style lang="less" scoped>
#c_message {
  .c_message_info {
    p {
      font-size: 16px;
      text-align: left;
      width: 50%;
      vertical-align: middle;
      margin: 10px 0;
      span {
        display: inline-block;
        width: 125px;
        height: 30px;
        border-radius: 3px;
        line-height: 30px;
        vertical-align: middle;
      }
      img {
        display: block;
        width: 360px;
        height: 172px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
