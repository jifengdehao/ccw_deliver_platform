<template>
  <div id="o_checkorder">
    <div class="o_checkorder_map" id="container"></div>
    <Row style="margin-top: 20px;margin-bottom: 20px;">
      <Col span="24">
      <Table :columns="columns" :data="data"></Table>
      </Col>
    </Row>
    <!--<Row>-->
    <!--<Col span="6">-->
    <!--<h3>用户信息</h3><br/>-->
    <!--<p>用户ID：22122323</p>-->
    <!--<p>收货人：王小伟</p>-->
    <!--<p>联系电话：171791279</p>-->
    <!--<p>收货地址：广东省广州市番禺区桥南街南堤东路836号</p>-->
    <!--<p>下单时间：2017-10-03 15:12</p>-->
    <!--</Col>-->
    <!--<Col span="6">-->
    <!--<h3>订单信息</h3><br/>-->
    <!--<p>运单编号：ff3222442</p>-->
    <!--<p>订单类型：用户首单／普通订单</p>-->
    <!--<p>订单编号：jk23892823</p>-->
    <!--<p>订单状态：新订单</p>-->
    <!--<p>货物明细：榴莲 * 5</p>-->
    <!--<p>订单备注：无</p>-->
    <!--<p>缺货选择：缺货</p>-->
    <!--</Col>-->
    <!--<Col span="6">-->
    <!--<h3>支付信息</h3><br/>-->
    <!--<p>订单金额：¥500.00</p>-->
    <!--<p>包装费：¥10.00</p>-->
    <!--<p>配送费：0</p>-->
    <!--<p>优惠金额：¥50</p>-->
    <!--<p>优惠方式：优惠卷</p>-->
    <!--<p>实付金额：¥450</p>-->
    <!--<p>支付方式：支付宝</p>-->
    <!--<p>支付时间：2017-10-03 16:00</p>-->
    <!--</Col>-->
    <!--<Col span="6">-->
    <!--<h3>配送信息</h3><br/>-->
    <!--<p>配送时间：2017-10-03 16:00</p>-->
    <!--<p>送达时间：2017-10-03 16:00</p>-->
    <!--<p>配送员Id：jl73838</p>-->
    <!--<p>配送员：🀄️钟小楚</p>-->
    <!--<p>异常原因：无</p>-->
    <!--<p>省区：广东省</p>-->
    <!--<p>市区：广州市</p>-->
    <!--<p>区域：番禺区</p>-->
    <!--<p>菜市场：番禺菜市场</p>-->
    <!--</Col>-->
    <!--</Row>-->
  </div>
</template>
<script type="text/ecmascript-6">
  import AMap from 'AMap'   //在页面中引入高德地图
  import * as api from '@/api/common'

  export default {
    data() {
      return {
        columns: [
          {
            title: '序号',
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
          }
          /*
          ,
          {
            title: '工作状态',
            key: 'personStatus',
            align: 'center'
          }
          */
        ],
        data: [],
        orderId: (() => {
          return this.$route.params.id
        })()
      }
    },
    created() {
      console.log(this.orderId)
      this.getOrderData()
    },
    methods: {
      getOrderData() {
        api.getOrderDetails(this.orderId).then((res) => {
          console.log(res)
          if (res) {
            this.data = res.deliverList
            //基本地图加载
            const map = new AMap.Map("container", {
              center: res.market,//地图中心点
              zoom: 10, //地图显示的缩放级别
              mapStyle: 'amap://styles/dark'//样式URL
            })
            // 取件 - 送达
            AMap.service('AMap.Driving', function () {//回调函数
              //实例化Driving
              //TODO: 使用driving对象调用驾车路径规划相关的功能
              //构造路线导航类
              const driving = new AMap.Driving({
                map: map
              })
              // 根据起终点经纬度规划驾车导航路线
              driving.search(new AMap.LngLat(res.market[0], res.market[1]), new AMap.LngLat(res.userAddress[0], res.userAddress[1]))
            })
            const infoWindow = new AMap.InfoWindow(
              {
                offset: new AMap.Pixel(0, -22)//-113, -140
              }
            );
            for (var i = 0, marker; i < this.data.length; i++) {
              marker = new AMap.Marker({
                position: [this.data[i].longitude, this.data[i].latitude],
                map: map
              });
              let deliver = this.data[i].psDeliverId
              console.log(deliver)
              marker.content = '<a href="javascript:void(0);" onclick="goAssign(this);" data-deliver="' + deliver + '">指派</a>';
              //给Marker绑定单击事件
              marker.on('click', markerClick);
              marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                offset: new AMap.Pixel(0, -22),//修改label相对于maker的位置
                content: this.data[i].deliverMsg
              });
            }
            map.setFitView();

            function markerClick(e) {
              infoWindow.setContent(e.target.content);
              infoWindow.open(map, e.target.getPosition());
            }

            let that = this
            window.goAssign = function (t) {
              console.log(t)
              api.putDeliver(that.orderId, t.getAttribute('data-deliver')).then((res) => {
                console.log(res)
                if (res) {
                  that.$Notice.success({
                    title: '指派成功！',
                    onClose: function () {
                      that.$router.back()
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
      }
    }
  }
</script>
<style lang="less" scoped type="text/less">
  #o_checkorder {
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
