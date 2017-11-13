<template>
  <div id="s_rbac" class="main" :class="{'isShow':show}">
    <main-header :title="title">
      <!-- <span slot="h3">权限管理</span>
      <input placeholder=" 姓名/联系方式/用户ID">
      <Icon type="search" class="O_search_icon"></Icon> -->
       <Input v-model="searchModel"
               icon="search"
               placeholder="姓名/联系方式/用户ID"
               style="width: 200px;margin-top: 4px;" @on-click="search"></Input>
    </main-header>
    <section class="s_rbac_list">
      <Table border :columns="columns7" :data="data6"></Table>
    </section>
  </div>
</template>
<script>
import mainHeader from '../../components/header/main_header.vue'
export default {
  components: { mainHeader },
  data() {
    return {
      title:'权限管理',
      searchModel:'',
      columns7: [
        {
          title: '姓名',
          key: 'name',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.name)
            ]);
          }
        },
        {
          title: '年龄',
          key: 'age'
        },
        {
          title: '地址',
          key: 'address'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.to(params.index)
                  }
                }
              }, '查看'),

            ]);
          }
        }
      ],
      data6: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗'
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道'
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道'
        }
      ]
    }
  },
  computed: {
    show() {
      return this.$store.state.show
    }
  },
  methods: {
    getCurrentDate() {
      return new Date().toLocaleDateString()
    },
    to(index) {
      this.$router.push('/s_rbac/'+index)
    },
    search(){
      console.log(this.searchModel)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
