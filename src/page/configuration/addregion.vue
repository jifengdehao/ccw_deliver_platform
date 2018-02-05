/*
 * @Author: huShangJun 
 * @Date: 2017-11-08 14:04:57 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 增加区域
 */

<template>
  <div id="addregion" >
    <section class="addregionHeader">
      <span slot="h3">新增-区</span>
    </section>
    <section class="addregion_breadcrumb">
      <Breadcrumb separator=">">
        <BreadcrumbItem>{{provinceName}}</BreadcrumbItem>
        <BreadcrumbItem>{{cityName}}</BreadcrumbItem>
        <BreadcrumbItem>{{formInline.user}}</BreadcrumbItem>
      </Breadcrumb>
    </section>
    <section class="addregion_map" id="container">
      <Input v-model="searchData" type="text" style="width: 200px;float:right;zIndex:100" placeholder="搜索" @on-enter="searchPlace">
      <span slot="prepend" >搜索</span>
      </Input>
      <div id="result" style="zIndex:500"></div>
    </section>
    <section class="addregion_marketinfo">
      <Form ref="formInline"  label-position="left"  inline>
        <FormItem>
            <span>区域名称：</span>
            <Input type="text" v-model="formInline.user" style="width: 150px" required></Input>
        </FormItem>
    </Form>
    </section>
    <section class="addregion_button">
      <Button type="ghost" size="large" style="width: 150px" @click="goback">清除</Button>
      <Button type="ghost" size="large" style="width: 150px" @click="addQu()">增加</Button>
    </section>
  </div>
</template>
<script>
import * as api from '@/api/common.js'
export default {
  components: {},
  data() {
    return {
      formInline: {},
      quPath: [],
      searchData: '', // 搜索框输入内容
      cityData: {}, // 区域父级city信息
      editor: {},
      map: null,
      geocoder: null,
      placeSearch: null,
      marker: null
    }
  },
  mounted() {
    this.getCityInfo()
  },
  methods: {
    // 查询城市详情
    getCityInfo() {
      api.getCityInfo(this.adcode).then(response => {
        this.cityData = response
        console.log(response)
        this.initMap()
      })
    },
    initMap: function() {
      var district,
        map = new AMap.Map('container', {
          resizeEnable: true,
          center: [113.4, 39.91], //地图中心点
          zoom: 10 //地图显示的缩放级别
        })
      this.map = map
      AMap.plugin(
        ['AMap.ToolBar', 'AMap.Scale', 'AMap.PolyEditor', 'AMap.PlaceSearch'],
        function() {
          map.addControl(new AMap.ToolBar())
          map.addControl(new AMap.Scale())
        }
      )
      // 搜索插件初始化
      this.placeSearch = new AMap.PlaceSearch({
        //构造地点查询类
        pageSize: 1,
        pageIndex: 1,
        city: this.adcode, //城市
        map: map,
        panel: 'result'
      })
      // 获取到上级行政区域地图
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
                  fillOpacity: 0.3,
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
      // 绘制该城市的区域信息
      if (this.cityData.arealList) {
        for (let i = 0, len = this.cityData.arealList.length; i < len; i++) {
          this.polygon(this.cityData.arealList[i].areaCoordinate, 'red')
        }
      }
      // 加载鼠标工具
      AMap.service('AMap.MouseTool', response => {
        var mouseTool = new AMap.MouseTool(map) //在地图中添加MouseTool插件
        var drawPolygon = mouseTool.polygon() //用鼠标工具画多边形
        AMap.event.addListener(mouseTool, 'draw', e => {
          this.quPath = e.obj.getPath()
        })
      })
    },
    // 绘制自定义区域
    polygon(arr, color) {
      this.editor._polygon = (() => {
        return new AMap.Polygon({
          map: this.map,
          path: JSON.parse(arr),
          strokeColor: color,
          strokeOpacity: 1,
          strokeWeight: 1,
          fillColor: '#f5deb3',
          fillOpacity: 0.5
        })
      })()
      this.map.setFitView() //地图自适应
    },
    // 添加
    addQu() {
      if (!this.formInline.user) {
        this.$Message.error('请输入菜市场名称')
        return false
      }
      if (!this.path[0]) {
        this.$Message.error('请规划区域范围')
        return false
      }

      let params = {
        cityId: this.adcode,
        areaName: this.formInline.user,
        areaCoordinate: this.path
      }
      api.addQu(params).then(response => {
        this.$Message.success('添加成功')
        this.$router.go(-1)
      })
    },
    // 点击取消按钮  返回设置主页
    goback() {
      this.initMap()
    },
    // 搜索
    searchPlace() {
      this.placeSearch.search(this.searchData, (status, result) => {
        if (status == 'complete' && result.info == 'OK') {
          this.marker = new AMap.Marker({
            icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png'
          })
          this.marker.setPosition(result.poiList.pois[0].location)
          this.marker.setMap(this.map)
        } else {
          alert('无法获取数据')
        }
      })
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
    },
    path() {
      return this.quPath.map(item => {
        return [item.lng, item.lat]
      })
    }
  }
}
</script>
<style lang="less" scoped>
#addregion {
  .addregionHeader {
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
  .addregion_breadcrumb {
    text-align: left;
    breadcrumbitem {
      font-size: 16px;
    }
  }
  .addregion_map {
    height: 600px;
    margin-top: 10px;
    background-color: #caeee9;
  }
  .addregion_marketinfo {
    margin-top: 20px;
    text-align: center;
    span {
      display: inline-block;
      width: 80px;
      font-size: 16px;
    }
  }
  .addregion_button {
    width: 100%;
    // position: absolute;
    // bottom: 30px;
    text-align: center;
  }
}
</style>
