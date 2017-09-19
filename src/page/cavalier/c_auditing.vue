<template>
    <div id="c_auditing" class="main">
        <main-header>
          <span slot="h3" >骑士审核</span>
          <input  placeholder=" 姓名/联系方式/身份证">
          <Icon  type="search" class="O_search_icon"></Icon>
        </main-header>
      <section class="c_auditing_list">
        <Table border :columns="columns4" :data="data1"></Table>
      </section>
      <section class="c_auditing_button">
        <Button type="ghost" size="large" >全选</Button>
        <Button type="ghost" size="large" >通过</Button>
        <Button type="ghost"  size="large">未通过</Button>
      </section>
    </div>
</template>
<script>
  import mainHeader from '../../components/header/main_header.vue'
    export default {
      components:{mainHeader},
        data() {
            return {
              columns4: [
              {
                type: 'selection',
                width: 60,
                align: 'center'
              },
              {
                title: '姓名',
                key: 'name'
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
                  width: 250,
                  align: 'center',
                  render: (h, params) => {
                    return h('div', [

                      h('Button', {
                        props: {

                          size: 'small'
                        },
                        style: {
                          marginRight: '5px'
                        },
                        on: {
                          click: () => {
                            this.show1(params.index)
                          }
                        }
                      }, '通过'),
                      h('Button', {
                        props: {

                          size: 'small'
                        },
                        style: {
                          marginRight: '5px'
                        },
                        on: {
                          click: () => {
                            this.show2(params.index)
                          }
                        }
                      }, '未通过'),
                      h('Button', {
                        props: {

                          size: 'small'
                        },
                        style: {
                          marginRight: '5px'
                        },
                        on: {
                          click: () => {
                            this.goto(params.index)
                          }
                        }
                      }, '查看'),

                    ]);
                  }
                }

            ],
              data1: [
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
              ]}
        },
        methods: {
          goto (index) {
            this.$router.push('/c_message')
          },
          show1 (index) {
            this.$Modal.info({
              title: '用户信息',
              content: `姓名：${this.data1[index].name}<br>  已通过`
            })
          },
          show2 (index) {
            this.$Modal.info({
              title: '用户信息',
              content: `姓名：${this.data1[index].name}<br> 未通过`
            })
          },
        }
    }
</script>
<style lang="less" scoped>
#c_auditing{
  .c_auditing_button{
    margin-top: 20px;
    text-align: left;
  }
}

</style>
