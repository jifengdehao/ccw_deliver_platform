<template>
  <div id="roleinfo" class="main" :class="{'isShow':show}">
    <p class="role-p"><span>角色：</span><input type="text" v-model="putParams.roleName"></p>
    <div class="tree-box">
      <ul v-if="menuData">
        <auth-tree :Todiabled="menuData.role.isAdmin" :menuData="menuData.menu" :parentData="menuData"></auth-tree>
      </ul>
    </div>
    <p class="btn-p">
      <Button @click="getRoleInfo">取消</Button>
      <Button @click="submitInfoData">确认</Button>
    </p>
  </div>
</template>
<script>
import * as http from '@/api/common'
import authTree from './tree'
export default {
  name: 'roleInfo',
  components: {
    authTree
  },
  data() {
    return {
      menuData: null, //  传递给子组件的值
      putParams: {
        roleId: '', //  角色ID
        roleName: '', //  角色名称
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
      this.putParams.roleId = this.$route.query.creatorId
      http
        .getRoleInfo({
          roleId: this.putParams.roleId
        })
        .then(data => {
          // console.log(data)
          this.menuData = data
          this.putParams.roleName = data.role.roleName
        })
    },
    //  传递至过滤
    filterValue(array) {
      array.forEach(item => {
        if (item.isHave) {
          if (item.permissonList && item.permissonList.length > 0) {
            item.permissonList.forEach(permissin => {
              let single = {
                menuId: item.menuId
              }
              if (permissin.isHave) {
                single.permissionId = permissin.permissionId
                // single.name = permissin.permissionName
                this.putParams.permissionList.push(single)
              }
            })
            this.filterValue(item.childMenuList)
          }
        }
        console.log(this.putParams.permissionList)
      })
    },
    //  确认
    submitInfoData() {
      this.putParams.permissionList = []
      this.filterValue(this.menuData.menu)
      if (!this.putParams.roleId || !this.putParams.roleName) {
        return
      }
      http.putRoleInfo(this.putParams).then(data => {
        this.getRoleInfo()
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
