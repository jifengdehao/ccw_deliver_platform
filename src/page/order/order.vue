<template>
  <div id="order">
    <!--内容头部-->
    <div class="top clearfix">
      <h3 class="fl">订单指派</h3>
      <div class="search-bar fr">
        <Input v-model="search" icon="search" placeholder="订单状态/收货人信息/订单号/运单号"
               style="width: 200px;margin-top: 4px;"></Input>
      </div>
      <ul>
        <li></li>
      </ul>
      <!--<span slot="h3">订单指派</span>-->
      <!--<li slot="ul" v-for="item in 5">-->
      <!--<Button>Default</Button>-->
      <!--</li>-->
      <!--<input type="search" placeholder=" 订单状态/收货人信息/订单号/运单号">-->
      <!--<Icon type="search" class="O_search_icon"></Icon>-->
    </div>
    <Tabs value="name1" :animated="false">
      <TabPane label="新订单" name="name1">
        <Row style="margin-bottom: 40px">
          <Col span="6">
          <h3>省区</h3>
          <Cascader :data="provinceData" v-model="province" style="width:200px"></Cascader>
          </Col>
          <Col span="6">
          <h3>市区</h3>
          <Cascader :data="cityData" v-model="city" style="width:200px"></Cascader>
          </Col>
          <Col span="6">
          <h3>区域</h3>
          <Cascader :data="areaData" v-model="area" style="width:200px"></Cascader>
          </Col>
          <Col span="6">
          <h3>菜市场</h3>
          <Cascader :data="marketData" v-model="market" style="width:200px"></Cascader>
          </Col>
        </Row>
        <!--内容-->
        <Row class="O_cava">
          <Col span="2">
          <ul class="textCenter O_cava_name">
            <li>姓名</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
          </ul>
          </Col>
          <Col span="21" offset="1">
          <Table border :columns="columns" :data="data"></Table>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="重抛池" name="name2">
        <Row style="margin-bottom: 40px">
          <Col span="6">
          <h3>省区</h3>
          <Cascader :data="provinceData" v-model="province" style="width:200px"></Cascader>
          </Col>
          <Col span="6">
          <h3>市区</h3>
          <Cascader :data="cityData" v-model="city" style="width:200px"></Cascader>
          </Col>
          <Col span="6">
          <h3>区域</h3>
          <Cascader :data="areaData" v-model="area" style="width:200px"></Cascader>
          </Col>
          <Col span="6">
          <h3>菜市场</h3>
          <Cascader :data="marketData" v-model="market" style="width:200px"></Cascader>
          </Col>
        </Row>
        <!--内容-->
        <Row class="O_cava">
          <Col span="2">
          <ul class="textCenter O_cava_name">
            <li>姓名</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
          </ul>
          </Col>
          <Col span="21" offset="1">
          <Table border :columns="columns" :data="data"></Table>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="配送中" name="name3">
        <Row style="margin-bottom: 40px">
          <Col span="6">
          <h3>省区</h3>
          <Cascader :data="provinceData" v-model="province" style="width:200px"></Cascader>
          </Col>
          <Col span="6">
          <h3>市区</h3>
          <Cascader :data="cityData" v-model="city" style="width:200px"></Cascader>
          </Col>
          <Col span="6">
          <h3>区域</h3>
          <Cascader :data="areaData" v-model="area" style="width:200px"></Cascader>
          </Col>
          <Col span="6">
          <h3>菜市场</h3>
          <Cascader :data="marketData" v-model="market" style="width:200px"></Cascader>
          </Col>
        </Row>
        <!--内容-->
        <Row class="O_cava">
          <Col span="2">
          <ul class="textCenter O_cava_name">
            <li>姓名</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
          </ul>
          </Col>
          <Col span="21" offset="1">
          <Table border :columns="columns" :data="data"></Table>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="配送完成" name="name4">
        <Row style="margin-bottom: 40px">
          <Col span="6">
          <h3>省区</h3>
          <Cascader :data="provinceData" v-model="province" style="width:200px"></Cascader>
          </Col>
          <Col span="6">
          <h3>市区</h3>
          <Cascader :data="cityData" v-model="city" style="width:200px"></Cascader>
          </Col>
          <Col span="6">
          <h3>区域</h3>
          <Cascader :data="areaData" v-model="area" style="width:200px"></Cascader>
          </Col>
          <Col span="6">
          <h3>菜市场</h3>
          <Cascader :data="marketData" v-model="market" style="width:200px"></Cascader>
          </Col>
        </Row>
        <!--内容-->
        <Row class="O_cava">
          <Col span="2">
          <ul class="textCenter O_cava_name">
            <li>姓名</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
          </ul>
          </Col>
          <Col span="21" offset="1">
          <Table border :columns="columns" :data="data"></Table>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="配送异常" name="name5">
        <Row style="margin-bottom: 40px">
          <Col span="6">
          <h3>省区</h3>
          <Cascader :data="provinceData" v-model="province" style="width:200px"></Cascader>
          </Col>
          <Col span="6">
          <h3>市区</h3>
          <Cascader :data="cityData" v-model="city" style="width:200px"></Cascader>
          </Col>
          <Col span="6">
          <h3>区域</h3>
          <Cascader :data="areaData" v-model="area" style="width:200px"></Cascader>
          </Col>
          <Col span="6">
          <h3>菜市场</h3>
          <Cascader :data="marketData" v-model="market" style="width:200px"></Cascader>
          </Col>
        </Row>
        <!--内容-->
        <Row class="O_cava">
          <Col span="2">
          <ul class="textCenter O_cava_name">
            <li>姓名</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
            <li>菜城骑士</li>
          </ul>
          </Col>
          <Col span="21" offset="1">
          <Table border :columns="columns" :data="data"></Table>
          </Col>
        </Row>
      </TabPane>
    </Tabs>

  </div>
</template>
<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        province: [],
        market: [],
        area: [],
        city: [],
        provinceData: [
          {
            value: 'guangdongsheng',
            label: '广东省'
          },
        ],
        cityData: [
          {
            value: 'guangzhou',
            label: '广州市'
          }
        ],
        areaData: [
          {
            value: 'shiqiao',
            label: '市桥'
          }
        ],
        marketData: [
          {
            value: 'm1',
            label: '菜市场1'
          }
        ],
        search: '',
        columns: [
          {
            title: '用户编码',
            key: 'customId',
            align: 'center'
          },
          {
            title: '下单时间',
            align: 'center',
            key: 'orderTime'
          },
          {
            title: '期待时间',
            align: 'center',
            key: 'freeTime'
          },
          {
            title: '订单状态',
            align: 'center',
            key: 'orderStatus'
          },
          {
            title: '运单编号',
            align: 'center',
            key: 'deliverNumber'
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
                      this.$router.push('/order/' + params.index)
                    }
                  }
                }, '查看'),
              ]);
            }
          }
        ],
        data: [
          {
            customId: 1,
            orderTime: '2017-11-03 14:05',
            freeTime: '2017-11-03 16:05',
            orderStatus: '新订单',
            deliverNumber: 'Cp102929'
          },
          {
            customId: 2,
            orderTime: '2017-11-03 14:05',
            freeTime: '2017-11-03 16:05',
            orderStatus: '新订单',
            deliverNumber: 'Cp102929'
          },
          {
            customId: 3,
            orderTime: '2017-11-03 14:05',
            freeTime: '2017-11-03 16:05',
            orderStatus: '新订单',
            deliverNumber: 'Cp102929'
          },
          {
            customId: 4,
            orderTime: '2017-11-03 14:05',
            freeTime: '2017-11-03 16:05',
            orderStatus: '新订单',
            deliverNumber: 'Cp102929'
          },
          {
            customId: 5,
            orderTime: '2017-11-03 14:05',
            freeTime: '2017-11-03 16:05',
            orderStatus: '新订单',
            deliverNumber: 'Cp102929'
          },
          {
            customId: 6,
            orderTime: '2017-11-03 14:05',
            freeTime: '2017-11-03 16:05',
            orderStatus: '新订单',
            deliverNumber: 'Cp102929'
          }
        ]
      }
    },
    computed: {},
    methods: {}
  }
</script>
<style lang="less" scoped type="text/less">
  #order {
    .top {
      height: 40px;
      background-color: #363e54;
      margin-bottom: 20px;
      padding: 0 20px;
      & > h3 {
        color: #fff;
        display: inline-block;
        height: 40px;
        line-height: 40px;
      }
    }
    .O_cava {
      .O_cava_name {
        border: 1px solid #ccc;
        li {
          width: 100%;
          height: 35px;
          line-height: 35px;
          border-bottom: 1px solid #ccc;
          cursor: pointer;
          &:first-child {
            height: 40px;
            line-height: 40px;
            font-weight: 700;
          }
          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
</style>
