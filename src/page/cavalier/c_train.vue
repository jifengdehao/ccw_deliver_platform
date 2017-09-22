<template>
  <div class="main" id="c_train" :class="{'isShow':show}">
    <main-header>
      <span slot="h3">培训管理</span>
      <input placeholder=" 姓名/联系方式/用户ID">
      <Icon type="search" class="O_search_icon"></Icon>
    </main-header>
    <section>
      <div class="H_message H_statistics_senhe">
        <h3>审核概览</h3>
        <ul>
          <li class="" v-for="item in 3">骑士身份信息审核
            <i class="fr">
              <span style="margin-right: 30px">未读信息：
                <b>88</b>条</span>
              <Icon type="chevron-right"></Icon>
            </i>
          </li>

        </ul>
      </div>
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
.H_message {
  width: 540px;
  height: 285px;
  border: 1px solid #ccc;
  border-radius: 5px;
  float: left;
  margin-bottom: 60px;
  padding-top: 15px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 16px;
  &:nth-of-type(odd) {
    margin-right: 70px;
  }
  h3 {
    float: left;
    padding-left: 10px;
    font-size: 18px;
  }
  ;
  ul {
    margin-top: 37px;
    li {
      text-align: left;
      line-height: 35px;
      padding-left: 10px;
    }
  }
}
</style>
