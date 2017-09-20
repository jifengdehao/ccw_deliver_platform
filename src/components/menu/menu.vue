<template>
  <div id="menu" :class="{'isShow':show}" >
    <Col  :class="{'isShow':show}" class="M_col">
    <div class="M_toggle">
      <Button icon="arrow-left-b" @click="show=!show"  :class="{'isShow':show}"></Button>
    </div>
    <Menu theme="dark"  accordion class="M_ul" style="width: 200px;font-size: 16px" @on-select="route" >
      <MenuItem name="home" style="width: 100%; height: 60px; line-height: 50px; font-size: 18px;">首页</MenuItem>
      <Submenu name="order">
        <template slot="title">
          <Icon type="ios-paper"></Icon>
          订单管理
        </template>
        <MenuItem name="order">订单管理</MenuItem>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-people"></Icon>
          骑士管理
        </template>
        <MenuItem name="cavalier">骑士管理</MenuItem>
        <MenuItem name="cUncommitted">未提交资料</MenuItem>
        <MenuItem name="cAuditing">骑士审核</MenuItem>
        <MenuItem name="cTrain">培训管理
        </MenuItem>
        <MenuItem name="cPersonal">人员管理</MenuItem>
      </Submenu>
      <Submenu name="3">
        <template slot="title">
          <Icon type="stats-bars"></Icon>
          配置设置
        </template>
        <MenuItem name="configuration">配置设置</MenuItem>
        <MenuItem name="3-5">查看</MenuItem>
      </Submenu>
      <Submenu name="4">
        <template slot="title">
          <div name="home" @click="datecenter()" style="display: inline-block"><Icon type="stats-bars"></Icon>
            数据中心</div>
        </template>
        <MenuItem name="d_peisong">配送员数据</MenuItem>
      </Submenu>
      <Submenu name="5">
        <template slot="title">
          <div @click="settings()"  style="display: inline-block">
            <Icon type="stats-bars"></Icon>
            设置中心
          </div>

        </template>
        <MenuItem name="s_platform">平台用户</MenuItem>
        <MenuItem name="s_rbac">权限管理</MenuItem>
        <MenuItem name="s_rolelist">角色列表</MenuItem>
        <MenuItem name="s_operation">操作日志</MenuItem>
        <MenuItem name="s_message">消息管理</MenuItem>
      </Submenu>
      <Submenu name="6">
        <template slot="title">
          <Icon type="stats-bars"></Icon>
          分销管理
        </template>
        <MenuItem name="d_extend">推广列表</MenuItem>
        <MenuItem name="d_list">分销列表</MenuItem>
      </Submenu>
    </Menu>
    </Col>
  </div>
</template>
<script>
    export default {
        data() {
            return {
              show:''
            }
        },
        methods: {
            getCurrentDate() {
                return new Date().toLocaleDateString()
            },
          route:function (name) {
            this.$router.push('/'+ name);
          },
          datecenter(){
            this.$router.push('/dateCenter');
          },
          settings(){
            this.$router.push('/settings')
          },

        }
    }
</script>
<style lang="less" >
  #menu{
   position: absolute;
    width:  218px;
    overflow: hidden;
    height:100%;
    transition: width .5s ;
    -webkit-transition: width .5s; /* Safari */
    &.isShow{
      width: 18px;
    }
    .M_col{
      height:100%;
    }
    .M_toggle{
      position: absolute;
      right: 0;
      width: 18px;
      height: 100%;
      background-color: #eee;
      z-index: 100;
      box-sizing: border-box;
      border-right: 1px solid #999;
      button{
        position: absolute;
        top: 50%;
        left: 0;
        font-size: 24px;
        padding:0;
        border: 0;

        width: 17px;
        height: 30px;
        /*transition: rotate 2s;*/
        &.isShow{
          transform: rotate(180deg);
        }
      }
    }
    .M_ul{
      width:  10%;
      height: 100%;

    }
  }

</style>
