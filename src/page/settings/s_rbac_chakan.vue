<template>
  <div id="s_rbac_chakan" class="main" :class="{'isShow':show}">
    <main-header>
      <span slot="h3">权限管理</span>
    </main-header>
    <section class="s_rbac_chakan_shuju">
      <ul>
        <li>
          <p v-for="item in 5">
            <span>用户ID:</span>
            <span>Ca1234</span>
          </p>
        </li>
        <li>
          <p v-for="item in 5">
            <span>用户ID:</span>
            <span>Ca1234</span>
          </p>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import mainHeader from '../../components/header/main_header.vue'
export default {
  components: { mainHeader },
  data() {
    return {

    }
  },
  computed: {
    show() {
      return this.$store.state.show
    }
  },
  methods: {
    getCurrentDate() {
      return new Date().toLocaleDateString()
    },

  }
}
</script>
<style lang="less" scoped>
#s_rbac_chakan {
  .s_rbac_chakan_shuju {
    li {
      width: 33%;
      float: left;
      p {
        font-size: 16px;
        text-align: left;
        vertical-align: middle;
        margin: 10px 0;
        span {
          display: inline-block;
          width: 125px;
          height: 30px;

          border-radius: 3px;
          line-height: 30px;
          vertical-align: middle;
          &:nth-of-type(1) {
            border: none;
          }
        }
      }
    }
  }
}
</style>
