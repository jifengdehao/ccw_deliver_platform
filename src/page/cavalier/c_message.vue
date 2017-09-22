<template>
  <div id="c_message" class="main" :class="{'isShow':show}">
    <main-header>
      <span slot="h3">查看</span>
    </main-header>
    <section class="c_message_info">
      <div style="width: 50%;" class="fl">
        <p>
          <span>用户ID：</span>
          <span></span>
        </p>
        <p>
          <span>姓名：</span>
          <span></span>
        </p>
        <p>
          <span>性别：</span>
          <span></span>
        </p>
        <p>
          <span>学历：</span>
          <span></span>
        </p>
        <p>
          <span>联系方式：</span>
          <span></span>
        </p>
        <p>
          <span>出生年月：</span>
          <span></span>
        </p>
        <p>
          <span>身份证号：</span>
          <span></span>
        </p>
        <p>
          <span>身份证正反面：</span><img src="" alt=""> <img src="" alt=""></p>
      </div>

      <p class="fr">
        <span>健康证:</span> <img src="" alt=""></p>
    </section>
  </div>
</template>
<script>
import mainHeader from '../../components/header/main_header.vue'
export default {
  components: { mainHeader },
  data() {
    return {}
  },
  computed: {
    show() {
      return this.$store.state.show
    }
  },
  methods: {
    getCurrentDate() {
      return new Date().toLocaleDateString()
    }
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
        border: 1px solid #222;
        border-radius: 3px;
        line-height: 30px;
        vertical-align: middle;
        &:nth-of-type(1) {
          border: none;
        }
      }
      img {
        display: block;
        width: 360px;
        height: 172px;
        background-color: #aab0b9;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
