<template>
  <div>
     <!-- 头部 -->
    <div class="header">
      <h2>骑士管理</h2>
      <div class="header-search">
        <Button>导出</Button>
      </div>
    </div>

    <div><Table stripe border :columns="columns1" :data="data1"></Table></div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      columns1: [
        {
          title: '序号',
          key: 'ID',
          width: '110',
          align: 'center'
        },
        {
          title: '临时ID',
          key: 'psDeliverApplyId',
          align: 'center'
        },
        {
          title: '联系方式',
          key: 'mobileno',
          align: 'center'
        },
        {
          title: '注册时间',
          key: 'registerDt',
          align: 'center'
        },
        {
          title: '操作',
          key: 'operation',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      console.log(params)
                    }
                  }
                }, '删除')
            ])
          }
        }
      ],
      data1: [
        {
          ID: '1',
          psDeliverApplyId: '00999',
          mobileno: '1123456',
          registerDt: '134567'
        }
      ]
    }
  },
  computed: {},
  methods: {}
}
</script>
<style lang="css" scoped>

.header {
  height: 40px;
  line-height: 40px;
  margin-bottom: 40px;
  background-color: #363e54;
}

.header h2 {
  float: left;
  color: #fff;
  margin-left: 20px;
}

.header-search {
  float: right;
  margin-right: 20px;
}
</style>
