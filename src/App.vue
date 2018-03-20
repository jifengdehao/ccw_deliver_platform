<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'app'
  }
</script>

<style lang="less" type="text/less">
  .clearfix {
    &:after {
      display: block;
      content: ".";
      height: 0;
      line-height: 0;
      clear: both;
      visibility: hidden;
    }
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .textCenter {
    text-align: center;
  }

  .textRight {
    text-align: right;
  }

  .textLeft {
    text-align: left;
  }

  .mbt10 {
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .ml10 {
    margin-left: 10px;
  }

  .mb10 {
    margin-bottom: 10px;
  }

  .mb20 {
    margin-bottom: 20px;
  }

  .mr10 {
    margin-right: 10px;
  }

  #app {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    min-width: 1400px;
  }

</style>
