<template>
    <div id="o_checkorder" class="main">
      <main-header>
       <span slot="h3" >订单指派</span>
      </main-header>
      <section class="o_checkorder_map">
          地图
      </section>
      <section class="o_checkorder_list">
        <Table border :columns="columns" :data="data"></Table>
      </section>
     
    </div>
</template>
<script>
  import mainHeader from '../../components/header/main_header.vue'
    export default {
      components:{mainHeader},
              data () {
                return {
                  columns: [
                    {
                      title: '日期',
                      key: 'date'
                    },
                    {
                      title: '日期',
                      key: 'date'
                    },
                    {
                      title: '日期',
                      key: 'date'
                    },
                    {
                      title: '姓名',
                      key: 'name'
                    },
                    {
                      title: '年龄',
                      key: 'age',
                      filters: [
                        {
                          label: '大于25岁',
                          value: 1
                        },
                        {
                          label: '小于25岁',
                          value: 2
                        }
                      ],
                      filterMultiple: false,
                      filterMethod (value, row) {
                        if (value === 1) {
                          return row.age > 25;
                        } else if (value === 2) {
                          return row.age < 25;
                        }
                      }
                    },
                    {
                      title: '地址',
                      key: 'address',
                      filters: [
                        {
                          label: '北京',
                          value: '北京'
                        },
                        {
                          label: '上海',
                          value: '上海'
                        },
                        {
                          label: '深圳',
                          value: '深圳'
                        }
                      ],
                      filterMethod (value, row) {
                        return row.address.indexOf(value) > -1;
                      }
                    }
                  ],
                  data: [

                    {
                      name: '张小刚',
                      age: 25,
                      address: '北京市海淀区西二旗',
                      date: '2016-10-01'
                    },
                    {
                      name: '李小红',
                      age: 30,
                      address: '上海市浦东新区世纪大道',
                      date: '2016-10-02'
                    },
                    {
                      name: '周小伟',
                      age: 26,
                      address: '深圳市南山区深南大道',
                      date: '2016-10-04'
                    }
                  ]
                }
        },
        methods: {
            getCurrentDate() {
                return new Date().toLocaleDateString()
            }
        }
    }
</script>
<style lang="less" scoped>
  #o_checkorder{
    .o_checkorder_map{
      height: 450px;
      background-color: rgba(202, 238, 233, 0.93);
      margin-top: 10px;
    }
    .o_checkorder_list{
      margin-top:10px;
      .ivu-table td{
        height: 25px;
      }
    }

  }

</style>
