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

  #app {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }

</style>
