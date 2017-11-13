<template>
  <div class="main-header clearfix">
    <h2 class="fl">{{title}}</h2>
    <div class="fr">
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style lang="less" scoped type="text/less">
  .main-header {
    height: 40px;
    background-color: #363e54;
    margin-bottom: 20px;
    padding: 0 20px;
    & > h2 {
      color: #fff;
      display: inline-block;
      height: 40px;
      line-height: 40px;
    }

  }

</style>
