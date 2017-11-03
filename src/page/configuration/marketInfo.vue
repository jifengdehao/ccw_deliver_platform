<template>
  <div id="marketInfo" class="clearfix">
    <section class="addmarketHeader">
      <span slot="h3">查看-菜市场</span>
    </section>
    <section class="addmarket_breadcrumb">
      <Breadcrumb separator=">">
        <BreadcrumbItem>广东省</BreadcrumbItem>
        <BreadcrumbItem>广州市</BreadcrumbItem>
        <BreadcrumbItem href="/addregion">区域1</BreadcrumbItem>
        <BreadcrumbItem>菜市场</BreadcrumbItem>
      </Breadcrumb>
    </section>
    <section class="addmarket_map" id="container">
      <h1>地图</h1>
    </section>
    <section class="addmarket_marketinfo">
      <h2>菜市场信息</h2>
      <Form :model="formItem" label-position="left" inline>
        <FormItem >
            <span>菜市场名称：</span>
            <Input v-model="formItem.input1" style="width:160px"></Input>
            <span>菜市场电话：</span>
            <Input v-model="formItem.input2" style="width:160px"></Input>
            <span>经纬度：</span>            
            <Button style="width:160px">设置</Button> <br>
            <span>配送区域：</span>
            <Button style="width:160px">设置</Button>
            <span>配送时间段：</span>
            <TimePicker type="timerange" placement="bottom-end" placeholder="选择时间" style="width: 160px"></TimePicker>
            <span>绑定小区：</span>
            <Input v-model="formItem.input2" style="width:160px"></Input> <br>
             <span>自提点：</span>
            <Input v-model="formItem.input1" style="width:160px"></Input>
            <span>菜市场地址：</span>
            <Input v-model="formItem.input2" style="width:160px"></Input>
        </FormItem>
    </Form>
    </section>
    <section class="addmarket_button">
      <Button type="ghost" size="large" style="width: 150px">取消</Button>
      <Button type="ghost" size="large" style="width: 150px">保存</Button>
    </section>
  </div>
</template>
<script>
// import AMap from 'AMap'
// var map
export default {
  components: {},
  data() {
    return {
      formItem: {}
    }
  },
  computed: {},
  mounted () {
    //   this.initMap()
    //   this.showcitymap()
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
#marketInfo {
  // position: relative;
  // font-size: 16px;
  .addmarketHeader {
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
  .addmarket_breadcrumb {
    text-align: left;
    breadcrumbitem {
      font-size: 16px;
    }
  }
  .addmarket_map {
    height: 500px;
    margin-top: 10px;
    background-color: #caeee9;
  }
  .addmarket_marketinfo {
    margin: 0 auto;
    h2{
      text-align: center;
      line-height: 40px;
    }
    span {
      display: inline-block;
      width: 100px;
      line-height: 40px;
      margin-left: 30px;
      font-size: 16px;
    }
  }
  .addmarket_button {
    width: 100%;
    position: absolute;
    bottom: 30px;
    text-align: center;
  }
}
</style>
