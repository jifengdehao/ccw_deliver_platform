<template>
  <div id="o_checkorder">
    <mainHeader :title="title">
      <ButtonGroup shape="circle" class="tab-select">
        <Button :class="{active:orderDetailsStatus === 0}" @click="selectTab(0)">指派信息</Button>
        <Button :class="{active:orderDetailsStatus === 1}" @click="selectTab(1)">订单信息</Button>
      </ButtonGroup>
      <div class="close" @click="close">
        <Icon type="close"/>
      </div>
    </mainHeader>
    <div v-show="orderDetailsStatus === 0">
      <div class="o_checkorder_map" id="container"></div>
      <Row style="margin-top: 20px;margin-bottom: 20px;">
        <Col span="24">
        <Table :columns="columns" :data="data"></Table>
        </Col>
      </Row>
    </div>
    <div v-show="orderDetailsStatus === 1">
      <h2 class="mb10">订单信息</h2>
      <Table :columns="columns1" :data="data1" :border="true"></Table>
      <h2 class="mbt10">支付信息</h2>
      <Table :columns="columns3" :data="data3" :border="true"></Table>
      <h2 class="mbt10">交易信息</h2>
      <Table :columns="columns4" :data="data4" :border="true"></Table>
      <h2 class="mbt10">配送信息</h2>
      <Table :columns="columns2" :data="data2" :border="true"></Table>
    </div>
    <!--<div id="panel"></div>-->
  </div>
</template>
<script type="text/ecmascript-6">
  import AMap from 'AMap'   //在页面中引入高德地图
  import * as api from '@/api/common'
  import mainHeader from '@/components/header/main_header.vue'
  import * as time from '@/until/time'

  export default {
    name: 'orderDetails',
    data() {
      return {
        title: '订单查看',
        orderDetailsStatus: 0,
        columns1: [
          {
            title: '订单编号',
            key: 'orderId',
            align: 'center'
          },
          {
            title: '用户ID',
            key: 'mcCustomerId',
            align: 'center'
          },
          {
            title: '订单状态',
            key: 'statusChinese',
            align: 'center'
          },
          {
            title: '配送方式',
            key: 'deliveryModeName',
            align: 'center'
          },
          {
            title: '商品缺货时',
            key: 'onOutName',
            align: 'center'
          },
          {
            title: '期待送达时间',
            key: 'deliveryDate',
            align: 'center'
          },
          {
            title: '下单时间',
            key: 'submitTime',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.submitTime)
            }
          },
          {
            title: '收货人',
            key: 'receiver',
            align: 'center'
          },
          {
            title: '收货电话',
            key: 'contactNumber',
            align: 'center'
          },
          {
            title: '收货地址',
            key: 'addressEnd',
            align: 'center'
          },
          {
            title: '备注',
            key: 'remark',
            align: 'center'
          }
        ],
        columns3: [
          {
            title: '订单金额',
            key: 'amount',
            align: 'center',
            render: (h, params) => {
              let text = params.row.realPayAmount/ 100
              return ('span', '¥' + text)
            }
          },
          {
            title: '配送费',
            key: 'transCost',
            align: 'center',
            render: (h, params) => {
              let text = params.row.transCost / 100
              return ('span', '¥' + text)
            }
          },
          {
            title: '优惠金额',
            key: 'discount',
            align: 'center',
            render: (h, params) => {
              let text = params.row.discount / 100
              return ('span', '¥' + text)
            }
          },
          {
            title: '优惠券',
            key: 'coupon',
            align: 'center'
          },
          {
            title: '实际支付金额',
            key: 'realPayAmount',
            align: 'center',
            render: (h, params) => {
              let text = params.row.amount / 100
              return ('span', '¥' + text)
            }
          },
          {
            title: '支付时间',
            key: 'payTime',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.payTime)
            }
          },
          {
            title: '支付方式',
            key: 'payWay',
            align: 'center'
          }
        ],
        columns2: [
          {
            title: '运单编号',
            key: 'coExpressId',
            align: 'center'
          },
          /*
          {
            title: '配送方式',
            key: '',
            align: 'center'
          },
          {
            title: '配送状态',
            key: '',
            align: 'center'
          },
          */
          {
            title: '接单时间',
            key: 'orderTime',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.startTime)
            }
          },
          {
            title: '取货时间',
            key: 'startTime',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.startTime)
            }
          },
          {
            title: '送达时间',
            key: 'endTime',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.endTime)
            }
          },
          {
            title: '配送时效(分钟)',
            key: 'deliveryTime',
            align: 'center'
          },
          {
            title: '配送员工号',
            key: 'psDeliverId',
            align: 'center'
          },
          {
            title: '配送员姓名',
            key: 'name',
            align: 'center'
          },
          {
            title: '所属市场',
            key: 'psMarketName',
            align: 'center'
          },
          {
            title: '异常原因',
            key: 'exceptionCause',
            align: 'center'
          }
        ],
        columns4: [
          {
            title: '流水号',
            key: 'subFlowId',
            align: 'center'
          },
          {
            title: '交易号',
            key: 'coSubOrderId',
            align: 'center'
          },
          {
            title: '接单时间',
            key: 'orderTime',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.orderTime)
            }
          },
          {
            title: '备货完成(召唤骑手)时间',
            key: 'finishTheTime',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.finishTheTime)
            }
          },
          {
            title: '是否缺货',
            key: 'status',
            align: 'center',
            render: (h, params) => {
              return params.status === 0 ? '否' : '是'
            }
          },
          {
            title: '档口名称',
            key: 'shopName',
            align: 'center'
          },
          {
            title: '档口号',
            key: 'msShopId',
            align: 'center'
          },
          {
            title: '商品名称',
            key: 'productName',
            align: 'center'
          },
          {
            title: '单价',
            key: 'price',
            align: 'center',
            render: (h, params) => {
              let text = params.row.price / 100
              return ('¥' + text)
            }
          },
          {
            title: '数量',
            key: 'unit',
            align: 'center'
          },
          {
            title: '小计',
            key: 'amount',
            align: 'center',
            render: (h, params) => {
              let text = params.row.amount / 100
              return ('¥' + text)
            }
          },
          {
            title: '分摊优惠',
            key: 'discountsAmount',
            align: 'center',
            render: (h, params) => {
              let text = params.row.discountsAmount / 100
              return ('¥' + text)
            }
          },
          {
            title: '实际结算',
            key: 'realPayAmount',
            align: 'center',
            render: (h, params) => {
              let text = params.row.realPayAmount / 100
              return ('¥' + text)
            }
          },
          {
            title: '退款方式',
            key: 'refundedWay',
            align: 'center'
          },
          {
            title: '备注信息',
            key: 'subject',
            align: 'center'
          },
          {
            title: '退款时间',
            key: 'payTime',
            align: 'center',
            render: (h, params) => {
              return time.formatDateTime(params.row.payTime)
            }
          },
          {
            title: '退款金额',
            key: 'refundAmount',
            align: 'center',
            render: (h, params) => {
              if (params.row.refundAmount) {
                let text = params.row.refundAmount / 100
                return ('¥' + text)
              }
            }
          },
          {
            title: '退款渠道',
            key: 'payWay',
            align: 'center'
          }
        ],
        columns: [
          {
            title: '工号',
            align: 'center',
            key: 'psEmpno'
          },
          {
            title: '配送员ID',
            key: 'psDeliverId',
            align: 'center'
          },
          {
            title: '姓名',
            key: 'name',
            align: 'center'
          },
          {
            title: '联系方式',
            key: 'mobileno',
            align: 'center'
          },
          {
            title: '所属菜市场',
            key: 'marketName',
            align: 'center'
          },
          {
            title: '状态',
            key: 'personStatusStr',
            align: 'center'
          },
          {
            title: '操作',
            key: 'options',
            align: 'center',
            render: (h, params) => {
              let deliverId = params.row.psDeliverId
              let isRefunded
              if (params.row.personStatusStr === '在附近') {
                isRefunded = false
              } else {
                isRefunded = true
              }
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled: isRefunded
                  },
                  on: {
                    click: () => {
                      let that = this
                      that.$Modal.confirm({
                        content: '确定要指派配送员',
                        onOk: () => {
                          that.goDeliver(deliverId)
                        }
                      })
                    }
                  }
                }, '指派')
              ])
            }
          }
        ],
        data: [],
        data1: [],
        data3: [],
        data4: [],
        data2: [],
        orderId: (() => {
          return this.$route.params.id
        })()
      }
    },
    created() {
      this.getOrderData()
      this.getOrderDetails()
    },
    methods: {
      selectTab(type) {
        this.orderDetailsStatus = type
        this.getOrderData()
      },
      // 获取订单详情
      getOrderDetails() {
        api.getOrderDetailsTo(this.orderId).then((res) => {
          if (res) {
            console.log(res)
            if (res.coOrder) {
              this.data1 = Array.of(res.coOrder)
            }
            if (res.paymentInfo) {
              this.data3 = Array.of(res.paymentInfo)
            }
            if (res.deliverInfo) {
              this.data2 = Array.of(res.deliverInfo)
            }
            this.data4 = res.dealInfoList
          }
        })
      },
      getOrderData() {
        api.getOrderDetails(this.orderId).then((res) => {
          if (res) {
            console.log(res)
            // this.title = res.title
            this.data = res.deliverList
            const map = new AMap.Map("container", {
              center: res.market,//地图中心点
              zoom: 10, //地图显示的缩放级别
              mapStyle: 'amap://styles/normal'//样式URL
            })
            // 取件 - 送达
            AMap.service('AMap.Riding', function () {//回调函数
              const driving = new AMap.Riding({
                map: map
              })
              // 根据起终点经纬度规划驾车导航路线  改成骑行模式
              driving.search(new AMap.LngLat(res.market[0], res.market[1]), new AMap.LngLat(res.userAddress[0], res.userAddress[1]))
              const infoWindow = new AMap.InfoWindow({
                offset: new AMap.Pixel(0, -22) //-113, -140
              });
              for (let i = 0, marker; i < res.deliverList.length; i++) {
                marker = new AMap.Marker({
                  position: [res.deliverList[i].longitude, res.deliverList[i].latitude],
                  map: map,
                  iconLabel: 'A',
                });
                let deliver = res.deliverList[i].psDeliverId
                marker.content = '<a href="javascript:void(0);" onclick="goAssign(this)" data-deliver="' + deliver + '">指派</a>';
                //给Marker绑定单击事件
                if (res.deliverList[i].personStatusStr === '在附近') {
                  marker.on('click', markerClick);
                }
                marker.setLabel({
                  offset: new AMap.Pixel(0, -22),
                  content: res.deliverList[i].deliverMsg
                });
              }
              map.setFitView();

              function markerClick(e) {
                infoWindow.setContent(e.target.content);
                infoWindow.open(map, e.target.getPosition());
              }
            })
            let that = this
            window.goAssign = function (t) {
              api.putDeliver(that.orderId, t.getAttribute('data-deliver')).then((res) => {
                if (res) {
                  that.$Notice.success({
                    title: '指派成功！',
                    onClose: function () {
                      that.getOrderData()
                    }
                  });
                } else {
                  that.$Notice.error({
                    title: '指派失败！'
                  });
                }
              })
            }
          }
        })
      },
      close() {
        this.$router.back()
      },
      // 指派配送员
      goDeliver(deliverId) {
        let that = this
        api.putDeliver(this.orderId, deliverId).then((res) => {
          if (res) {
            this.$Notice.success({
              title: '指派成功！',
              duration: 2,
              onClose: function () {
                that.getOrderData()
              }
            });
          } else {
            this.$Notice.error({
              title: '指派失败！'
            });
          }
        })
      }

    },
    components: {
      mainHeader
    }
  }
</script>
<style lang="less" scoped type="text/less">
  #panel {
    position: absolute;
    background-color: white;
    max-height: 450px;
    overflow-y: auto;
    top: 60px;
    right: 0;
    width: 280px;
  }

  #o_checkorder {
    position: relative;
    .tab-select {
      position: absolute;
      top: 4px;
      left: 140px;
    }
    .close {
      height: 40px;
      line-height: 40px;
      color: #ffffff;
      width: 50px;
      text-align: center;
      cursor: pointer;
    }
    .o_checkorder_map {
      height: 450px;
    }
    .o_checkorder_list {
      margin-top: 10px;
      .ivu-table td {
        height: 25px;
      }
    }
  }
</style>
