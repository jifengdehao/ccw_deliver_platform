<template>
    <div id="userinfo" class="main">
      <main-header>
        <span slot="h3">用户管理</span>
      </main-header>
      <section class="userinfo_list">
        <ul>
          <li><p v-for="item in 10"><span>用户ID:</span><span>Ca1234</span></p></li>
          <li><p v-for="item in 8"><span>用户ID:</span><span>Ca1234</span></p></li>
        </ul>

      </section>
    </div>
</template>
<script>
  import mainHeader from '../../components/header/main_header.vue'
    export default {
        components: {mainHeader},
        data() {
            return {}
        },
        methods: {
            getCurrentDate() {
                return new Date().toLocaleDateString()
            }
        }
    }
</script>
<style lang="less" scoped>
  #userinfo{
    .userinfo_list{
      li{
        width: 33%;
        float: left;
        p{
        font-size: 16px;
        text-align: left;
        vertical-align: middle;
        margin: 10px 0;
        span{
          display: inline-block;
          width: 125px;
          height: 30px;
          border: 1px solid #222;
          border-radius: 3px;
          line-height: 30px;
          vertical-align: middle;
          &:nth-of-type(1){
            border: none;
          }
        }
      }
      }

    }

  }


</style>
