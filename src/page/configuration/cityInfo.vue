<template>
    <div id='cityInfo' class="main" :class="{'isShow':show}">
        <section class="cityInfoHeader">
            <span slot="h3">查看-城市</span>
        </section>
        <section class="cityInfo_map">
            <div class="Breadcrumb">
                <Breadcrumb separator=">">
                    <BreadcrumbItem>广东省</BreadcrumbItem>
                    <BreadcrumbItem>广州市</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="map" id="container">
                当前市地图
            </div>
            <div class="setprice">
                <p>城市配送价</p>
                <p>
                    <span>运费(元):</span> <input type="number"></p>
                <p>
                    <span>即时配送价(元):</span><input type="number"></p>
            </div>
        </section>
         <section class="cityInfo_button">
            <Button size="large" style="width: 200px;background-color: #fff;">取消</Button>
            <Button size="large" style="width: 200px;background-color: #fff;">确定</Button>
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
    show() {
      return this.$store.state.show
    }
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
    //  showcitymap() {
    //   //just some colors
    //   var colors = [
    //     '#3366cc',
    //     '#dc3912',
    //     '#ff9900',
    //     '#109618',
    //     '#990099',
    //     '#0099c6',
    //     '#dd4477',
    //     '#66aa00',
    //     '#b82e2e',
    //     '#316395',
    //     '#994499',
    //     '#22aa99',
    //     '#aaaa11',
    //     '#6633cc',
    //     '#e67300',
    //     '#8b0707',
    //     '#651067',
    //     '#329262',
    //     '#5574a6',
    //     '#3b3eac'
    //   ]

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

    //       //绘制子区域
    //       districtExplorer.renderSubFeatures(areaNode, function(feature, i) {
    //         var fillColor = colors[i % colors.length]
    //         var strokeColor = colors[colors.length - 1 - i % colors.length]

    //         return {
    //           cursor: 'default',
    //           bubble: true,
    //           strokeColor: strokeColor, //线颜色
    //           strokeOpacity: 1, //线透明度
    //           strokeWeight: 1, //线宽
    //           fillColor: fillColor, //填充色
    //           fillOpacity: 0.35 //填充透明度
    //         }
    //       })

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
    //  }  
  }
}
</script>
<style lang="less" scoped>
#cityInfo {
  .cityInfoHeader {
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
  .cityInfo_map {
    .Breadcrumb {
      text-align: left;
      font-size: 16px;
      height: 40px;
    }
    .map {
      width: 100%;
      height: 500px;
      background-color: rgba(202, 238, 233, 0.93);
      margin-bottom: 20px;
    }
    .setprice {
      text-align: center;
      p {
        font-size: 18px;
        height: 40px;
        // line-height: 40px;
        span {
          display: inline-block;
          font-size: 16px;
          width: 200px;
          box-sizing: border-box;
        }
        input {
          width: 60px;
          border: 1px solid #cccccc;
          border-radius: 5px;
        }
      }
    }
  }
  .cityInfo_button {
    width: 100%;
    margin-top: 20px;
    // position: absolute;
    // bottom: 30px;
    text-align: center;
  }
}
</style>