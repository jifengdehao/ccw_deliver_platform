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
            <Button @click="polygonEditorOpen()">开始编辑区域范围</Button>
            <Button @click="polygonEditorClose()">结束编辑区域范围</Button>
        </section>
        <section class="quInfo_button">
            <Button size="large" style="width: 200px;" @click="goback">取消</Button>
            <Button size="large" style="width: 200px;" @click="modifyArea">确定</Button>
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
      areaData: {},
      editor: {},
      areaPath: []
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
    },
    modifyPath() {
      return this.areaPath.map(item => {
        return [item.lng, item.lat]
      })
    }
  },
  created() {
    this.getQuInfo()
  },
  beforeUpdate() {},
  methods: {
    getQuInfo() {
      api.getQuInfo(this.areaId).then(response => {
        this.areaData = response
        this.init()
      })
    },
    init: function() {
      var map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 12
      })
      AMap.plugin(
        ['AMap.ToolBar', 'AMap.Scale', 'AMap.PolyEditor'],
        function() {
          map.addControl(new AMap.ToolBar())
          map.addControl(new AMap.Scale())
        }
      )
      var editor = this.editor
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
      // 修改地图区域
      editor._polygonEditor = new AMap.PolyEditor(map, editor._polygon)
    },
    // 开始修改区域
    polygonEditorOpen(map) {
      this.editor._polygonEditor.open()
    },
    // 结束修改
    polygonEditorClose() {
      this.editor._polygonEditor.close()
      this.areaPath = this.editor._polygon.getPath()
    },
    goback() {
      this.getQuInfo()
    },
    modifyArea() {
      this.areaData.areaCoordinate = this.modifyPath
      console.log(this.areaData.areaCoordinate)
      api.addQu(this.areaData).then(res => {
        this.$Message.success('修改成功')
      })
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
    margin-top: 30px;
    text-align: center;
    width: 100%;
  }
}
</style>