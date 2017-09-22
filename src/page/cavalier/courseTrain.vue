<template>
  <div id="s_platform" class="main" :class="{'isShow':show}">
    <main-header>
      <span slot="h3">课程培训</span>
      <input placeholder=" 姓名/联系方式/用户ID">
      <Icon type="search" class="O_search_icon"></Icon>
    </main-header>
    <section>
      <div style="height: 50px;">
        <Button type="ghost" size="large" class="fr" @click="addcourse()">新增</Button>
      </div>
      <Table border :columns="columns7" :data="data6"></Table>
    </section>
  </div>
</template>
<script>
import mainHeader from '../../components/header/main_header.vue'
export default {
  components: {
    mainHeader,
  },
  data() {
    return {
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
                    this.tocourseinfo(params.index)
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',

                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
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
    addcourse() {
      this.$router.push('/addcourse')
    },
    tocourseinfo(index) {
      this.$router.push('/courseinfo')
    },
    remove(index) {
      this.$Modal.info({
        title: '提醒',
        cancel: "cancel",
        content: `是否删除 :${this.data6[index].name} @on-ok="ok"
              @on-cancel="cancel"`

      })
      this.data6.splice(index, 1);
    }
  }
}
</script>
<style lang="less" scoped>

</style>
