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
      <section class="o_checkorder_message">
        <div class="fl message"  v-for="item in 4">
          <h3>用户信息</h3>
          <p>用户ID： <span>YH45256</span></p>
          <p>收货人 ： <span>王小伟</span></p>
          <p>联系方式： <span>18978603456</span></p>
          <p>收货地址： <span>广东省广州市番禺区桥南街南堤东路836号</span></p>
          <p>下单时间： <span>15:00</span></p>
          <p>期待取货： <span>16:00</span></p>
        </div>

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
    .o_checkorder_message{
      padding-top: 10px;
      text-align: left;
      .message{
        width: 25%;
        h3{
          font-size: 18px;
          margin-bottom: 10px;
        }
        p{
          font-size: 14px;
          padding-right: 20px;
          box-sizing: border-box;
        }
      }
    }
  }

</style>
