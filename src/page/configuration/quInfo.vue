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
            <Button size="large" style="width: 200px;" >取消</Button>
            <Button size="large" style="width: 200px;" @click="test">确定</Button>
        </section>
    </div>
</template>
<script>
import * as api from '@/api/common.js'
import AMap from 'AMap'
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
    this.getQuInfo()
  },
  beforeUpdate() {
    this.init()
  },
  methods: {
    getQuInfo() {
      api.getQuInfo(this.areaId).then(response => {
        this.areaData = response
      })
    },
    init: function() {
      var map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 12
      })
       AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function() {
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Scale())
      })
      var editor = {}
      editor._polygon = (() => {
        // var arr = JSON.parse(this.areaData.areaCoordinate)
        var arr = this.areaData.areaCoordinate
        return new AMap.Polygon({
          map: map,
          path: arr,
          strokeColor: '#0000ff',
          strokeOpacity: 1,
          strokeWeight: 1,
          fillColor: '#f5deb3',
          fillOpacity: 0.5
        })
       
      })() 
      map.setFitView() //地图自适应
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
    background-color: #363e54;
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
  }
}
</style>