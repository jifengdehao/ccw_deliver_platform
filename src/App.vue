<template>
  <div id="app">
    <!-- <header-top v-show="sessionStorage.length!=0"></header-top>
    <menu-bar v-show="sessionStorage.length!=0"></menu-bar> -->
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script  type="text/ecmascript-6">
  // import headerTop from './components/header/header.vue'
  // import menuBar from './components/menu/menu.vue'
export default {
  // components:{
  //   headerTop,menuBar
  // },
  // data(){
  //   return {
  //     sessionStorage:window.sessionStorage,

  //   }
  // },

  // methods:{
  //   getCurrentDate() {
  //     return new Date().toLocaleDateString()
  //   },

  // },
  // beforeCreate(){
  //   //判断是否登录
  //   if(sessionStorage.length==0){
  //   this.$router.push({ path: '/Login' });
  // }
  // },
  name: 'app'

}
</script>

<style lang="less" type="text/less">
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   height: 100%;
// }
// .main{
//   margin-left: 218px;
//   padding-left: 32px;
//   padding-right: 20px;
//   height: 100%;
//   overflow: auto;
//   box-sizing: border-box;
//   background-color: rgba(254, 253, 252, 0.95);
//   transition: all .5s;
//   position: relative;
// }
//   .main.isShow{
//     margin-left: 18px;
//   }
.clearfix{
  &:after{
    display: block;
    content: ".";
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
  }
}
.fl{
  float: left;
}
.fr{
  float: right;
}
#app{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
}

</style>
