<template>
  <div id="roleinfo" class="main" :class="{'isShow':show}"  v-if="menuData">
    <p class="role-p"><span>角色：</span><input type="text" v-model="putParams.roleName"></p >
    <div class="tree-box">
      <ul>
        <auth-tree :menuData="menuData.menu" :parentData="menuData"></auth-tree>
      </ul>
    </div>
    <p class="btn-p">
      <Button @click="getRoleInfo">取消</Button>
      <Button @click="submitInfoData">确认</Button>
    </p >
  </div>
</template>
<script>
import * as http from '@/api/common'
import authTree from './tree'
export default {
  name: 'addRole',
  components: {
    authTree
  },
  data() {
    return {
      menuData: null, //  传递给子组件的值
      putParams: {
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
    //  获取角色权限信息
    getRoleInfo() {
      http.getUserRoleList().then(data => {
        this.menuData = data
      })
    },
    //  传递至过滤
    filterValue(array) {
      array.forEach(item => {
        if (item.isHave) {
          if (item.childMenuList.length === 0) {
            //  单个菜单  (首页)
            item.permissonList.forEach(permissin => {
              let single = {
                menuId: item.menuId
              }
              if (permissin.isHave) {
                single.permissionId = permissin.permissionId
                this.putParams.permissionList.push(single)
              }
            })
            this.filterValue(item.childMenuList)
          } else if (item.childMenuList.length > 0) {
            //  有多个子菜单
            item.childMenuList.forEach(child => {
              child.permissonList.forEach(son => {
                let single = {
                  menuId: child.menuId
                }
                if (son.isHave) {
                  single.permissionId = son.permissionId
                  this.putParams.permissionList.push(single)
                }
              })
              this.filterValue(child.childMenuList)
            })
          }
        }
        console.log(this.putParams.permissionList)
      })
    },
    //  确认
    submitInfoData() {
      this.putParams.permissionList = []
      this.filterValue(this.menuData.menu)
      if (!this.putParams.roleName) {
        this.$Modal.error({
          title: '提示',
          content: '请确认填写完整'
        })
        return
      }
      http.addUserRole(this.putParams).then(data => {
        this.$Modal.success({
          title: '提示',
          content: '添加成功',
          onOk: () => {
            this.getRoleInfo()
          }
        })
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