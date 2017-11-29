<template>
  <div id="o_checkorder">
    <mainHeader :title="title">
      <div class="close" @click="close">
        <Icon type="close"/>
      </div>
    </mainHeader>
    <div class="o_checkorder_map" id="container"></div>
    <Row style="margin-top: 20px;margin-bottom: 20px;">
      <Col span="24">
      <Table :columns="columns" :data="data"></Table>
      </Col>
    </Row>
    <div id="panel"></div>
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
  import mainHeader from '@/components/header/main_header.vue'

  export default {
    name:'orderDetails',
    data() {
      return {
        title: '',
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
          },
          {
            title: '状态',
            key: 'personStatusStr',
            align: 'center'
          }
        ],
        data: [],
        orderId: (() => {
          return this.$route.params.id
        })()
      }
    },
    created() {
      this.getOrderData()
    },
    methods: {
      getOrderData() {
        api.getOrderDetails(this.orderId).then((res) => {
          if (res) {
            console.log(res)
            this.title = res.title
            this.data = res.deliverList
            let that = this
            const map = new AMap.Map("container", {
              center: res.market,//地图中心点
              zoom: 10, //地图显示的缩放级别
              mapStyle: 'amap://styles/normal'//样式URL
            })
            if(res.status === 1){
              // 取件 - 送达
              AMap.service('AMap.Driving', function () {//回调函数
                //实例化Driving
                //TODO: 使用driving对象调用驾车路径规划相关的功能
                //构造路线导航类
                const driving = new AMap.Driving({
                  map: map,
                  panel: "panel"
                })
                // 根据起终点经纬度规划驾车导航路线
                driving.search(new AMap.LngLat(res.deliverList[0].longitude,res.deliverList[0].latitude), new AMap.LngLat(res.userAddress[0], res.userAddress[1]), function (status, result) {
                  let path = []
                  result.routes[0].steps.forEach((item) => {
                    if (item.path) {
                      item.path.forEach((i) => {
                        path.push([i.lng, i.lat])
                      })
                    }
                  });

                  AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function (PathSimplifier, $) {
                    if (!PathSimplifier.supportCanvas) {
                      alert('当前环境不支持 Canvas！');
                      return;
                    }
                    let pathSimplifierIns = new PathSimplifier({
                      zIndex: 300,
                      autoSetFitView: false,
                      map: map, //所属的地图实例
                      getPath: function (pathData, pathIndex) {
                        return pathData.path;
                      },
                      getHoverTitle: function (pathData, pathIndex, pointIndex) {
                        if (pointIndex >= 0) {
                          //point
                          return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
                        }
                        return pathData.name + '，点数量' + pathData.path.length;
                      },
                      renderOptions: {
                        renderAllPointsIfNumberBelow: 100, //绘制路线节点，如不需要可设置为-1
                        //轨迹线的样式
                        pathLineStyle: {
                          strokeStyle: 'red',
                          lineWidth: 6,
                          dirArrowStyle: true
                        }
                      }
                    });
                    window.pathSimplifierIns = pathSimplifierIns;
                    //设置数据
                    pathSimplifierIns.setData([{
                      name: '路线',
                      path: path
                    }]);

                    //对第一条线路（即索引 0）创建一个巡航器
                    let navg1 = pathSimplifierIns.createPathNavigator(0, {
                      loop: true, //循环播放
                      speed: 500, //巡航速度，单位千米/小时
                      pathNavigatorStyle: {
                        width: 16,
                        height: 32,
                        //使用图片
                        content: PathSimplifier.Render.Canvas.getImageContent('http://webapi.amap.com/ui/1.0/ui/misc/PathSimplifier/examples/imgs/car.png', onload, onerror)
                      }
                    });
                    navg1.start();
                  });
                })
              })
            }else{
              AMap.service('AMap.Driving', function () {
                const driving = new AMap.Driving({
                  map: map,
                  panel: "panel"
                })
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
                  if (res.isShow !== 0) {
                    marker.on('click', markerClick);
                  }
                  marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                    offset: new AMap.Pixel(0, -22),//修改label相对于maker的位置
                    content:res.deliverList[i].deliverMsg
                  });
                }
                map.setFitView();
                function markerClick(e) {
                  infoWindow.setContent(e.target.content);
                  infoWindow.open(map, e.target.getPosition());
                }
                window.goAssign = function (t) {
                  api.putDeliver(that.orderId, t.getAttribute('data-deliver')).then((res) => {
                    if (res) {
                      console.log(res)
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
              })
            }
          }
        })
      },
      close() {
        this.$router.back()
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
