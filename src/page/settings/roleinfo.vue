<template>
  <div id="roleinfo" class="main" :class="{'isShow':show}">
    <p class="role-p"><span>角色：</span><input type="text"></p>
    <div class="tree-box">
      <ul v-if="menuData">
        <auth-tree :menuData="menuData"></auth-tree>
      </ul>
    </div>
    <p class="btn-p">
      <Button @click="getRoleInfo">取消</Button>
      <Button>确认</Button>
    </p>
  </div>
</template>
<script>
import * as http from '@/api/common'
import authTree from './tree'
export default {
  components: {
    authTree
  },
  data() {
    return {
      menuData: null, //  传递给子组件的值
      putParams: {
        roleId: '', //  角色ID
        permissionList: [] //  用户权限
      }
    }
  },
  computed: {
    show() {
      return this.$store.state.show
    }
  },
  created() {
    this.getRoleInfo()
  },
  methods: {
    //  获取角色信息
    getRoleInfo() {
      http
        .getRoleInfo({
          roleId: this.$route.query.creatorId
        })
        .then(data => {
          console.log(data)
          this.menuData = data.menu
        })
    }
  }
}
</script>
<style lang="css" scoped>
p.role-p {
  margin: 20px auto;
}

p.role-p input[type='text'] {
  width: 100px;
}

p.btn-p {
  margin: 20px auto;
  text-align: center;
}

p.btn-p button {
  margin: 0 5px;
}
</style>
