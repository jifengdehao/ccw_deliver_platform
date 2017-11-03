/*
 * @Author: huShangJun 
 * @Date: 2017-11-01 16:14:20 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 功能开发点 
 */

<template>
    <div id='quInfo'>
        <section class="quInfoHeader">
            <span slot="h3">查看-区</span>
        </section>
        <section class="quInfo_map">
            <div class="Breadcrumb">
                <Breadcrumb separator=">">
                    <BreadcrumbItem>广东省</BreadcrumbItem>
                    <BreadcrumbItem>广州市</BreadcrumbItem>
                    <BreadcrumbItem>番禺区</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="map" id="container">
                当前区地图
            </div>
        </section>
        <section class="quInfo_button">
            <Button size="large" style="width: 200px;">取消</Button>
            <Button size="large" style="width: 200px;">确定</Button>
        </section>
    </div>
</template>
<script>
// import AMap from 'AMap'
// var map
export default {
  components: {},
  name: 'component_name',
  data() {
    return {}
  },
  computed: {
  },
  mounted() {
    // this.initMap()
    // this.showcitymap()
  },
  methods: {
    // initMap: function() {
    //   map = new AMap.Map('container', {
    //     center: [116.397428, 39.90923],
    //     resizeEnable: true,
    //     zoom: 12
    //   })
    //   AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function() {
    //     map.addControl(new AMap.ToolBar())
    //     map.addControl(new AMap.Scale())
    //   })
    // },
    // showcitymap() {
    //   AMapUI.loadUI(['geo/DistrictExplorer'], function(DistrictExplorer) {
    //     //创建一个实例
    //     var districtExplorer = new DistrictExplorer({
    //       map: map
    //     })
    //     var adcode = 440100
    //     districtExplorer.loadAreaNode(adcode, function(error, areaNode) {
    //       //更新地图视野
    //       map.setBounds(areaNode.getBounds(), null, null, true)
    //       //清除已有的绘制内容
    //       districtExplorer.clearFeaturePolygons()
    //       //绘制父区域
    //       districtExplorer.renderParentFeature(areaNode, {
    //         cursor: 'default',
    //         bubble: true,
    //         strokeColor: 'black', //线颜色
    //         strokeOpacity: 1, //线透明度
    //         strokeWeight: 1, //线宽
    //         fillColor: null, //填充色
    //         fillOpacity: 0.35 //填充透明度
    //       })
    //     })
    //   })
    // }
  }
}
</script>
<style lang="less" scoped>
#quInfo {
  .quInfoHeader {
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
    background-color: #999;
    span {
      margin-left: 10px;
      font-size: 18px;
      color: #fff;
    }
  }
  .quInfo_map {
    .Breadcrumb {
      text-align: left;
      font-size: 16px;
      height: 50px;
    }
    .map {
      width: 100%;
      height: 600px;
      background-color: rgba(202, 238, 233, 0.93);
      margin-bottom: 20px;
    }
  }
  .quInfo_button {
    text-align: center;
    width: 100%;
    position: absolute;
    bottom: 30px;
  }
}
</style>