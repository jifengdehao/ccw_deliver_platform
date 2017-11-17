/*
 * @Author: huShangJun 
 * @Date: 2017-11-08 14:04:29 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 添加菜市场 
 */

<template>
  <div id="addmarket" class="clearfix">
    <section class="addmarketHeader">
      <span slot="h3">新增-菜市场</span>
    </section>
    <section class="addmarket_breadcrumb">
      <Breadcrumb separator=">">
        <BreadcrumbItem>{{provinceName}}</BreadcrumbItem>
        <BreadcrumbItem>{{cityName}}</BreadcrumbItem>
        <BreadcrumbItem href="/addregion">{{areaData.areaName}}</BreadcrumbItem>
        <!-- <BreadcrumbItem>{{formItem.marketName}}</BreadcrumbItem> -->
      </Breadcrumb>
    </section>
    <!-- 地图内容 -->
    <section class="addmarket_map" id="container">
      
    </section>
    <!-- 菜市场信息 -->
    <section class="addmarket_marketinfo">
      <h2>菜市场信息</h2>
      <Form v-model="formItem"  inline>
        <FormItem >
            <span>菜市场名称：</span>
            <Input v-model="formItem.marketName" style="width:200px" required></Input>
            <span>菜市场电话：</span>
            <Input v-model="formItem.mobileno" style="width:200px" required></Input>
            <span>配送时间段：</span>
            <TimePicker v-model="formItem.beginTime" type="time" placeholder="Select time" style="width: 95px"></TimePicker> - 
            <TimePicker v-model="formItem.endTime" type="time" placeholder="Select time" style="width: 95px"></TimePicker>
            <br>
            <span>自提点电话：</span>            
            <Input v-model="formItem.self_pick_address_number" style="width:200px" required></Input> 
             <span>自提点：</span>
            <Input v-model="formItem.selfPickAddress" style="width:200px" required></Input>
            <span>菜市场地址：</span>
            <Input v-model="formItem.address" style="width:200px" required ></Input>
        </FormItem>
        <FormItem class="addmarket_button">
           <Button type="ghost" size="large" style="width: 150px" @click="goback">取消</Button>
           <Button type="ghost" size="large" style="width: 150px" @click="addMarket">保存</Button>
        </FormItem>
    </Form>
    </section>
    <!-- <section class="addmarket_button">
      <Button type="ghost" size="large" style="width: 150px">取消</Button>
      <Button type="ghost" size="large" style="width: 150px" @click="addMarket">保存</Button>
    </section> -->
  </div>
</template>
<script>
import * as api from '@/api/common.js'
import AMap from 'AMap'
export default {
  components: {},
  data() {
    return {
      marketId: Number,
      formItem: {
        latitude: 0, // 维度
        longitude: 0 // 经度
      },
      areaData: {},
      marketName: '',
      current: 0,
      marketPath: []
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
    path() {
      return this.marketPath.map(item => {
        return [item.lng, item.lat]
      })
    }
  },
  mounted() {
    this.getQuInfo()
  },
  methods: {
    getQuInfo() {
      api.getQuInfo(this.areaId).then(response => {
        this.areaData = response
        this.init()
      })
    },
    init() {
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
      // 加载鼠标工具
      AMap.service('AMap.MouseTool', response => {
        var mouseTool = new AMap.MouseTool(map) //在地图中添加MouseTool插件
        var drawPolygon = mouseTool.polygon() //用鼠标工具画多边形
        AMap.event.addListener(mouseTool, 'draw', e => {
          this.marketPath = e.obj.getPath()
          this.current = 1 // 规划了区域状态为1
        })
      })
      var _this = this
      // 选定菜市场地址
      AMap.plugin('AMap.Geocoder', function() {
        var geocoder = new AMap.Geocoder({
          // city: '020' //城市，默认：“全国”
        })
        var marker = new AMap.Marker({
          map: map,
          bubble: true
        })
        map.on('dblclick', e => {
          marker.setPosition(e.lnglat)
          _this.formItem.latitude = e.lnglat.O
          _this.formItem.longitude = e.lnglat.M
        })
      })
    },
    // 添加菜市场
    addMarket() {
      this.formItem.areaCoordinate = this.path
      if (this.current === 1 && this.formItem.marketName) {
        let params = {
          areaId: this.areaData.areaId,
          market: this.formItem,
          marketId: this.marketId
        }
        api
          .addMarket(params)
          .then(response => {
            this.$Message.info('添加菜市场成功')
          })
          .catch(err => {
            this.$Message.info('添加菜市场失败' + err)
          })
      } else {
        this.$Message.info('请划定菜市场区域或输入菜市场名称')
      }
    },
    // 取消按钮
    goback() {
      this.getQuInfo()
    }
  }
}
</script>
<style lang="less" scoped>
#addmarket {
  // position: relative;
  // font-size: 16px;
  .addmarketHeader {
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
    form {
      text-align: center;
    }
    h2 {
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
    // position: absolute;
    // bottom: 30px;
    text-align: center;
  }
}
</style>
