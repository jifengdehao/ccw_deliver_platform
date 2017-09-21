<template>
  <div id="configuration" class="main">
    <main-header>
      <span slot="h3">配置设置</span>
      <input placeholder=" 市区/区域/菜市场">
      <Icon type="search" class="O_search_icon"></Icon>
    </main-header>
    <section class="clearfix">
      <div class="configuration_quyu clearfix">
        <div class="configuration_quyu_title clearfix">
          <h3>省区</h3>
        </div>
        <div class="configuration_quyu_content">
          <span v-for="item in 8" ref="btn"  >广东
            <Button type="ghost" icon="close-round" size="small" class="fr" style="color: red;border: none"  @click="close()"></Button>
          </span>
        </div>
      </div>
      <div class="configuration_quyu">
        <div class="configuration_quyu_title clearfix">
          <h3>市区</h3>
        </div>
        <div class="configuration_quyu_content">
          <span v-for="item in ">广州
            <Button type="ghost" icon="close-round" size="small" class="fr" style="color: red;border: none"></Button>
          </span>
        </div>
      </div>
      <div class="configuration_quyu">
        <div class="configuration_quyu_title clearfix">
          <h3>区域</h3>
          <Button @click="addregion()" style="width: 60px;" type="ghost" size="small">新增</Button>
        </div>
        <div class="configuration_quyu_content">
          <span v-for="item in 8">番禺
            <Button type="ghost" icon="close-round" size="small" class="fr" style="color: red;border: none"></Button>
          </span>
        </div>
      </div>
      <div class="configuration_quyu">
        <div class="configuration_quyu_title clearfix">
          <h3>菜市场</h3>
          <Button @click="addmarket()" style="width: 60px;" type="ghost" size="small">新增</Button>
        </div>
        <div class="configuration_quyu_content">
          <span v-for="item in 8">清河
            <Button type="ghost" icon="close-round" size="small" class="fr" style="color: red;border: none"></Button>
          </span>
        </div>
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
  methods: {
    getCurrentDate() {
      return new Date().toLocaleDateString()
    },
    addregion() {
      this.$router.push('/addregion')
    },
    addmarket() {
      this.$router.push('/addmarket')
    },
    close(index){
      console.log(this.$parent)
    this.$parent.splice(this)
    }

  }
}
</script>
<style lang="less" scoped>
#configuration {
  .configuration_quyu {

    border: 1px solid #aaa;
    text-align: left;
    border-radius: 5px;
    margin-bottom: 25px;
    padding: 5px;
    .configuration_quyu_title {
      h3 {
        display: inline-block;
        width: 60px;
        font-size: 16px;
        font-weight: 700;
        margin-right: 10px;
      }
    }
    span {
      display: inline-block;
      border: 1px solid #bbb;
      border-radius: 5px;
      width: 80px;
      height: 25px;
      line-height: 25px;
      margin: 10px 50px 0 50px;
      padding-left: 5px;
    }
  }
}
</style>
