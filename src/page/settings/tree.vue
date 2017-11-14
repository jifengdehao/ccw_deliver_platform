/*
 * @Author: WuFengliang 
 * @Date: 2017-11-09 10:39:03 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint: 权限树模板
 */
 <template>
   <div>
      <li v-for="(item,index) in menuData" :key="index">
        <span>
          <Icon :type="item.childMenuList.length > 0 ? 'arrow-down-b' : ''"></Icon>
        </span>
        <input type="checkbox" @click="changeCheck(item,menuData,index)" v-model="item.isHave" :checked="item.isHave" style="margin:5px;">
        <span>{{item.menuName}}
          <span style="margin-left:20px;" v-for="(permission,index) in item.permissonList" :key="index">
            <!-- <li v-for="(permission,index) in item.permissonList" :key="index">{{permission.permissionName}}</li> -->
          <input type="checkbox" :checked="permission.isHave">
          {{permission.permissionName}}
          </span>
        </span>
        <ul v-if="item.childMenuList">
          <auth-tree :menuData="item.childMenuList"></auth-tree>
        </ul>
      </li>
   </div>
 </template>
 <script>
export default {
  name: 'authTree',
  props: ['menuData'],
  data() {
    return {}
  },
  created() {},
  methods: {
    //  查看选中
    changeCheck(child, parent, index) {
      child.isHave = !child.isHave
      console.log(child)
      console.log(parent)
    }
  }
}
</script>
 <style lang="css" scoped>
ul {
  padding-left: 1.5em;
}
</style>
