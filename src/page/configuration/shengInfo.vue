/*
 * @Author: huShangJun 
 * @Date: 2017-11-06 14:30:01 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 查看省 
 */

<template>
    <div id='shengInfo'>
        <section class="shengInfoHeader">
            <span slot="h3">查看-省</span>
        </section>
        <section class="shengInfo_map">
            <div class="Breadcrumb">
                <Breadcrumb separator=">">
                    <BreadcrumbItem>{{provinceName}}</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div id="container" class="map">
            </div>
        </section>
    </div>
</template>
<script>
// import AMap from 'AMap'
export default {
  components: {},
  name: 'component_name',
  data() {
    return {
      // provinceName: ''
    }
  },
  created() {},
  mounted() {
    this.initMap()
  },
  methods: {
    initMap: function() {
      var district,
        map = new AMap.Map('container', {
          resizeEnable: true,
          center: [113.4, 39.91], //地图中心点
          zoom: 10 //地图显示的缩放级别
        })
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function() {
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Scale())
      })
      //加载行政区划插件
      var adcode = this.adcode.toString()
      AMap.service('AMap.DistrictSearch', function() {
        var opts = {
          subdistrict: 1, //返回下一级行政区
          extensions: 'all', //返回行政区边界坐标组等具体信息
          level: 'city' //查询行政级别为 市
        }
        //实例化DistrictSearch
        district = new AMap.DistrictSearch(opts)
        district.setLevel('city')
        //行政区查询
        district.search(adcode, function(status, result) {
          if (status == 'complete') {
            var bounds = result.districtList[0].boundaries
            var polygons = []
            if (bounds) {
              for (var i = 0, l = bounds.length; i < l; i++) {
                //生成行政区划polygon
                var polygon = new AMap.Polygon({
                  map: map,
                  strokeWeight: 1,
                  path: bounds[i],
                  fillOpacity: 0.7,
                  fillColor: '#CCF3FF',
                  strokeColor: '#CC66CC'
                })
                polygons.push(polygon)
              }
              map.setFitView() //地图自适应
            }
          }
        })
      })
    }
  },
  computed: {
    adcode() {
      return this.$route.query.provinceId
    },
    provinceName() {
      return this.$route.query.provinceName
    }
  }
}
</script>
<style lang="less" scoped>
#shengInfo {
  .shengInfoHeader {
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
    background-color: #363e54;
    span {
      margin-left: 10px;
      font-size: 18px;
      color: #fff;
    }
  }
  .shengInfo_map {
    .Breadcrumb {
      text-align: left;
      font-size: 20px;
      height: 25px;
    }
    .map {
      width: 100%;
      height: 600px;
      background-color: rgba(202, 238, 233, 0.93);
    }
  }
}
</style>