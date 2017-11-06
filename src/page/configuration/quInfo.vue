/*
 * @Author: huShangJun 
 * @Date: 2017-11-01 16:14:20 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 查看区域信息 
 */

<template>
    <div id='quInfo'>
        <section class="quInfoHeader">
            <span slot="h3">查看-区</span>
        </section>
        <section class="quInfo_map">
            <div class="Breadcrumb">
                <Breadcrumb separator=">">
                    <BreadcrumbItem>{{provinceName}}</BreadcrumbItem>
                    <BreadcrumbItem>{{cityName}}</BreadcrumbItem>
                    <BreadcrumbItem>{{areaData.areaName}}</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="map" id="container">
                当前区地图
            </div>
        </section>
        <section class="quInfo_button">
            <Button size="large" style="width: 200px;" @click="test">取消</Button>
            <Button size="large" style="width: 200px;">确定</Button>
        </section>
    </div>
</template>
<script>
import * as api from '@/api/common.js'
import AMap from 'AMap'
var map
export default {
  components: {},
  name: 'component_name',
  data() {
    return {
      areaData: {}
    }
  },
  computed: {
    areaId() {
      return this.$route.query.areaId
    },
    cityName() {
      return this.$route.query.cityName
    },
    provinceName() {
      return this.$route.query.provinceName
    }
  },
  created() {
       api.getQuInfo(this.areaId).then(response => {
      this.areaData = response
    })
  },
  mounted() {
      let _this = this;
    setTimeout(function() {
        _this.initMap()
    }, 100)
    
  },
  methods: {
    initMap(areaData) {
        console.log(this.areaData)
      map = new AMap.Map('container', {
        center: [116.397428, 39.90923],
        resizeEnable: true,
        zoom: 12
      })
      var bounds = areaData
      AMap.service('AMap.Polygon', function() {
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
      })
    },
    test() {
      
    }
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