<template>
  <div id="addregion" class="main" :class="{'isShow':show}">
    <main-header>
      <span slot="h3">新增</span>
    </main-header>
    <section class="addregion_breadcrumb">
      <Breadcrumb separator=">">
        <BreadcrumbItem>广东省</BreadcrumbItem>
        <BreadcrumbItem>广州市</BreadcrumbItem>
        <BreadcrumbItem>区域1</BreadcrumbItem>
      </Breadcrumb>
    </section>
    <section class="addregion_map">
      <h1>地图</h1>
    </section>
    <section class="addregion_marketinfo">
      <p>
        <span>区域名称：</span>
        <span>区域1</span>
      </p>
      <p>
        <span>区域范围：</span>
        <span>设置</span>
      </p>
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
#addregion {
  position: relative;
  font-size: 16px;
  .addregion_breadcrumb {
    text-align: left;
    BreadcrumbItem {
      font-size: 16px;
    }
  }
  .addregion_map {
    height: 230px;
    margin-top: 10px;
    background-color: #caeee9;
  }
  .addregion_marketinfo {
    margin-top: 20px;
    p {
      height: 50px;
      span {
        float: left;
        &:first-child {
          display: inline-block;
          width: 200px;
        }
        &:last-child {
          display: inline-block;
          padding: 0 10px;
          height: 30px;
          border: 1px solid #666666;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
