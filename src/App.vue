<template>
  <div id="app" class="layout ">
    <header-top v-show="sessionStorage.length!=0"></header-top>
    <menu-bar v-show="sessionStorage.length!=0"></menu-bar>
    <router-view></router-view>

  </div>
</template>

<script>
  import headerTop from './components/header/header.vue'
  import menuBar from './components/menu/menu.vue'
export default {
  components:{
    headerTop,menuBar
  },
  data(){
    return {
      sessionStorage:window.sessionStorage,
      show:''
    }
  },

  methods:{
    getCurrentDate() {
      return new Date().toLocaleDateString()
    },
    //点击跳转到每个页面
    route:function (name) {
      this.$router.push('/'+ name);
    },
    //点击跳转到数据中心
    datecenter(){
      this.$router.push('/dateCenter');
    },
    //跳转到设置中心
    settings(){
      this.$router.push('/settings')
    },
  },
  beforeCreate(){
    //判断是否登录
    if(sessionStorage.length==0){
    this.$router.push({ path: '/' });
  }
  },
  name: 'app'
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.main{
  margin-left: 218px;
  padding-left: 32px;
  padding-right: 20px;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: rgba(254, 253, 252, 0.95);
  transition: all .5s;
  position: relative;
}
  .main.isShow{
    margin-left: 18px;
  }


</style>
