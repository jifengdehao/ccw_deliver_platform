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
                <Input v-model="searchData" type="text" style="width: 200px;float:right;zIndex:100" placeholder="搜索" @on-enter="searchPlace">
                <span slot="prepend" >搜索</span>
                </Input>
                <div id="result"></div>
            </div>
            <div style="marginBottom: 10px">
              <span>区域名称：</span>
              <Input type="text" v-model="areaData.areaName" style="width: 200px"></Input>
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
      searchData: '',
      placeSearch: null,
      marker: null,
      map: null,
      areaData: {},
      editor: {},
      areaPath: [],
      areaName: '',
      playStatus: false
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
        this.areaPath = response.areaCoordinate
        this.init()
      })
    },
    init: function() {
      var map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 12
      })
      this.map = map
      AMap.plugin(
        ['AMap.ToolBar', 'AMap.Scale', 'AMap.PolyEditor', 'AMap.PlaceSearch'],
        function() {
          map.addControl(new AMap.ToolBar())
          map.addControl(new AMap.Scale())
        }
      )
      // 搜索工具初始化
      this.placeSearch = new AMap.PlaceSearch({
        //构造地点查询类
        pageSize: 1,
        pageIndex: 1,
        city: this.cityName, //城市
        map: map,
        panel: 'result'
      })
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
      this.playStatus = true
    },
    // 结束修改
    polygonEditorClose() {
      this.editor._polygonEditor.close()
      this.areaPath = this.editor._polygon.getPath()
      this.playStatus = false
    },
    goback() {
      this.getQuInfo()
    },
    modifyArea() {
      if (!this.areaData.areaName) {
        this.$Message.error('区域名称不能为空')
        return false
      }
      if (this.playStatus === true) {
        this.$Message.error('请结束编辑状态')
        return false
      }
      this.areaData.areaCoordinate = this.modifyPath
      api.addQu(this.areaData).then(res => {
        this.$Message.success('修改成功')
        this.$router.go(-1)
      })
    },
    // 搜索
    searchPlace() {
      // 多边形内搜索
      this.placeSearch.searchInBounds(this.searchData, this.editor._polygon)
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