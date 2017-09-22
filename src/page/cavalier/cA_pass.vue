<template>
    <div id="cA_pass" class="main" :class="{'isShow':show}">
        <main-header>
          <span slot="h3" >课程审核</span>
          <li slot="ul" @click="toPendingAudit()" ><Button >待审核</Button></li>
          <li slot="ul" @click="toPass()"><Button disabled>通过</Button></li>
          <li slot="ul" @click="toNotPass()"><Button>未通过</Button></li>
          <input  placeholder=" 姓名/联系方式/身份证">
          <Icon  type="search" class="O_search_icon"></Icon>
        </main-header>
    </div>
</template>
<script>
import mainHeader from '../../components/header/main_header.vue'
export default {
    components:{
        mainHeader
    },
  name: "component_name",
  data () {
    return {
    };
  },
   computed: {
    show() {
      return this.$store.state.show
    }
  },
  methods:{
   toPendingAudit(){
            this.$router.push('/cA_pendingAudit')
          },
          toPass(){
            this.$router.push('/cA_pass')
          },
           toNotPass(){
            this.$router.push('/cA_notpass')
          }
  }
}
</script>
<style lang="css" scoped>
</style>