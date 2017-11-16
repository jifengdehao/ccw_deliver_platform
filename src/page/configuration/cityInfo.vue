/*
 * @Author: huShangJun 
 * @Date: 2017-11-06 14:30:40 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 查看城市 
 */

<template>
    <div id='cityInfo'>
        <section class="cityInfoHeader">
            <span slot="h3">查看-城市</span>
        </section>
        <section class="cityInfo_map">
            <div class="Breadcrumb">
                <Breadcrumb separator=">">
                    <BreadcrumbItem>{{provinceName}}</BreadcrumbItem>
                    <BreadcrumbItem>{{cityName}}</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="map" id="container">
                当前市地图
            </div>
            <div class="setprice" v-model="cityData">
                <p>城市配送价</p>
                <p>
                    <span>运费(元):</span> <input type="number" v-model="cityData.expense" :value="cityData.expense"></p>
                <p>
                    <span>即时配送价(元):</span><input type="number" v-model="cityData.instantExpense" :value="cityData.instantExpense"></p>
            </div>
        </section>
         <section class="cityInfo_button">
            <Button size="large" style="width: 200px;background-color: #fff;" @click="">取消</Button>
            <Button size="large" style="width: 200px;background-color: #fff;" @click="nodifyCityInfo(cityData)">确定</Button>
        </section>
    </div>
</template>
<script>
// import AMap from 'AMap'
import * as api from '@/api/common.js'
export default {
  components: {},
  name: 'component_name',
  data() {
    return {
      cityData: {}
    }
  },
  mounted() {
    this.getCityInfo(this.adcode)
    this.initMap()
  },
  methods: {
    // 查询城市详情
    getCityInfo(adcode) {
      api.getCityInfo(adcode).then(response => {
        this.cityData = response
      })
    },
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
    },
    nodifyCityInfo(cityData) {
      let params = {
        expenseConfig: cityData
      }
      api.modfiyCityMessage(params).then(response => {})
    }
  },
  computed: {
    adcode() {
      return this.$route.query.cityId
    },
    cityName() {
      return this.$route.query.cityName
    },
    provinceName() {
      return this.$route.query.provinceName
    }
  }
}
</script>
<style lang="less" scoped>
#cityInfo {
  .cityInfoHeader {
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
    text-align: center;
  }
}
</style>