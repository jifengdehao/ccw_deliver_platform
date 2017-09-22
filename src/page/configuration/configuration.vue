<template>
  <div id="configuration" class="main" :class="{'isShow':show}">
    <main-header>
      <span slot="h3">配置设置</span>
      <input placeholder=" 市区/区域/菜市场">
      <Icon type="search" class="O_search_icon"></Icon>
    </main-header>
    <section class="clearfix">
      <div class="configuration_quyu clearfix">
        <div class="configuration_quyu_title clearfix">
          <h3>省区</h3>
        </div>
        <div class="configuration_quyu_content">
          <span v-for="(item,index) in shengs" :key=index>{{item.name}}
            <Button type="ghost" icon="close-round" size="small" class="fr" style="color: red;border: none" @click="close(index)"></Button>
          </span>
        </div>
      </div>
      <div class="configuration_quyu">
        <div class="configuration_quyu_title clearfix">
          <h3>市区</h3>
        </div>
        <div class="configuration_quyu_content">
          <span v-for="item in citys">{{item.city}}
            <Button type="ghost" icon="close-round" size="small" class="fr" style="color: red;border: none"></Button>
          </span>
        </div>
      </div>
      <div class="configuration_quyu">
        <div class="configuration_quyu_title clearfix">
          <h3>区域</h3>
          <Button @click="addregion()" style="width: 60px;" type="ghost" size="small">新增</Button>
        </div>
        <div class="configuration_quyu_content">
          <span v-for="item in 8">番禺
            <Button type="ghost" icon="close-round" size="small" class="fr" style="color: red;border: none"></Button>
          </span>
        </div>
      </div>
      <div class="configuration_quyu">
        <div class="configuration_quyu_title clearfix">
          <h3>菜市场</h3>
          <Button @click="addmarket()" style="width: 60px;" type="ghost" size="small">新增</Button>
        </div>
        <div class="configuration_quyu_content">
          <span v-for="item in 8">清河
            <Button type="ghost" icon="close-round" size="small" class="fr" style="color: red;border: none"></Button>
          </span>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import mainHeader from '../../components/header/main_header.vue'
import { shengs, citys, qus } from '../../assets/comfiguration.js'
export default {
  components: { mainHeader },
  data() {
    return {
      shengs: [{
        name: "广东",
      },
      {
        name: "广西",
      },
      {
        name: "江西",
      },
      {
        name: "湖南",
      },
      {
        name: "贵州",
      },
      {
        name: "福建",
      },
      {
        name: "浙江",
      },
      {
        name: "江苏",
      },
      {
        name: "北京",
      },
      ],
      citys: [{
        city: "广州",
      },
      {
        city: "深圳",
      },
      {
        city: "东莞",
      },
      {
        city: "佛山",
      },
      {
        city: "惠州",
      },
      {
        city: "珠海",
      },
      {
        city: "中山",
      },
      {
        city: "韶关",
      },
      {
        city: "河源",
      },
      ]
    }

  },
  computed: {
    show() {
      return this.$store.state.show
    },
  },
  methods: {
    getCurrentDate() {
      return new Date().toLocaleDateString()
    },
    addregion() {
      this.$router.push('/addregion')
    },
    addmarket() {
      this.$router.push('/addmarket')
    },
    close(index) {
      console.log(index)
      this.shengs.splice(index, 1)
    }

  }
}
</script>
<style lang="less" scoped>
#configuration {
  .configuration_quyu {

    border: 1px solid #aaa;
    text-align: left;
    border-radius: 5px;
    margin-bottom: 25px;
    padding: 5px;
    .configuration_quyu_title {
      h3 {
        display: inline-block;
        width: 60px;
        font-size: 16px;
        font-weight: 700;
        margin-right: 10px;
      }
    }
    span {
      display: inline-block;
      border: 1px solid #bbb;
      border-radius: 5px;
      width: 80px;
      height: 25px;
      line-height: 25px;
      margin: 10px 50px 0 50px;
      padding-left: 5px;
    }
  }
}
</style>
