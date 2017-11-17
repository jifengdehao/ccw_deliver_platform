<template>
  <div id="c_train">
    <main-header :title="title">
      <Input v-model="searchModel"
             icon="search"
             placeholder="姓名/联系方式/用户ID"
             style="width: 200px;margin-top: 4px;" @on-click="search"></Input>
    </main-header>
    <section>
      <h1>培训管理模块延期…………</h1>
    </section>
  </div>
</template>
<script>
  import mainHeader from '../../components/header/main_header.vue'

  export default {
    components: {mainHeader},
    data() {
      return {
        title: '培训管理',
        searchModel:''
      }
    },
    methods: {
      search(){}
    }
  }
</script>
<style lang="less" scoped type="text/less">
</style>
