<template>
    <div id="order" class="main">
      <!--内容头部-->
     <main-header>
       <span slot="h3" >订单指派</span>
       <li slot="ul" v-for="item in 5"><Button>Default</Button></li>
       <input  type="search" placeholder=" 订单状态/收货人信息/订单号/运单号">
       <Icon  type="search" class="O_search_icon"></Icon>
     </main-header>
      <!--城市选择-->
      <city-select v-model="cityinfo"></city-select>
      <!--人员列表-->
      <section class="O_cava">
        <ul class="O_cava_name fl">
          <li>姓名</li>
          <li v-for="item in 10">菜城骑士</li>
        </ul>
        <div class="O_orderlist fr">
          <Table border :columns="columns" :data="data"></Table>
        </div>

      </section>
    </div>

</template>
<script>
  import mainHeader from '../../components/header/main_header.vue'
  import citySelect from '../../components/changecity/cityselect.vue'
    export default {
      components:{
       citySelect,
        mainHeader,

      },
      data () {
        return {
          cityinfo:'',
          columns: [
            {
              title: '订单列表',
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
                        this.show(params.index)
                      }
                    }
                  }, '查看'),
                ]);
              }
            }
          ],
          data: [
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
        methods: {
          show (index) {
            this.$router.push('/o_checkorder')
//            this.$Modal.info({
//              title: '用户信息',
//              content: `姓名：${this.data[index].name}<br>年龄：${this.data[index].age}<br>地址：${this.data[index].address}`
//            })
          },
        }
    }
</script>
<style lang="less" scoped>
  #order{
   .O_cava{
     .O_cava_name{
       width: 18%;
       border: 1px solid #ccc;
       li{
         width: 100%;
         height: 30px;
         line-height: 30px;
         border-bottom: 1px solid #ccc;
         &:first-child{
           height: 40px;
           line-height:40px;
           font-weight: 700;
         }
       }
     }
     .O_orderlist{
       width: 80%;
     }
   }



  }

</style>
