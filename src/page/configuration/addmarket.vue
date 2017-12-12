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
        <BreadcrumbItem >{{areaData.areaName}}</BreadcrumbItem>
        <BreadcrumbItem>{{formItem.marketName}}</BreadcrumbItem>
      </Breadcrumb>
      <p>提示： 单击左键开始规划菜市场区域，点击右键结束规划区域。双击选择菜市场地址。</p>
    </section>
    <!-- 地图内容 -->
    <section class="addmarket_map" id="container">
      <Input v-model="searchData" type="text" style="width: 200px;float:right;zIndex:100" placeholder="搜索" @on-enter="searchPlace">
      <span slot="prepend" >搜索</span>
      </Input>
      <div id="result"></div>
    </section>
    <!-- 菜市场信息 -->
    <section class="addmarket_marketinfo">
      <h2>菜市场信息</h2>
      <Form v-model="formItem"  inline>
        <FormItem >
            <span>菜市场名称：</span>
            <Input v-model="formItem.marketName" style="width:200px" required></Input>
            <span>菜市场电话：</span>
            <Input :maxlength="11" v-model="formItem.mobileno" style="width:200px" required></Input>
            <span>配送时间段：</span>
            <TimePicker @on-change="getbeginTime" format="HH:mm" placeholder="Select time" style="width: 95px"></TimePicker> - 
            <TimePicker @on-change="getendTime" format="HH:mm" placeholder="Select time" style="width: 95px"></TimePicker>
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
  </div>
</template>
<script>
import * as api from '@/api/common.js'
import AMap from 'AMap'
export default {
  components: {},
  data() {
    return {
      searchData: '',
      marketId: Number,
      formItem: {
        latitude: 0, // 维度
        longitude: 0 // 经度
      },
      areaData: {},
      marketName: '',
      current: 0,
      marketPath: [],
      map: null,
      editor: {}
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
      this.map = map
      AMap.plugin(
        ['AMap.ToolBar', 'AMap.Scale', 'AMap.Geocoder', 'AMap.PlaceSearch'],
        function() {
          map.addControl(new AMap.ToolBar())
          map.addControl(new AMap.Scale())
        }
      )
      this.geocoder = new AMap.Geocoder({
        city: this.cityName //城市，默认：“全国”
      })
      // 搜索工具初始化
      this.placeSearch = new AMap.PlaceSearch({
        //构造地点查询类
        pageSize: 1,
        pageIndex: 1,
        city: this.cityName, //城市
        map: map,
        panel: 'result'
      })
      // 绘制区域范围
      if (this.areaData.areaCoordinate) {
        this.polygon(this.areaData.areaCoordinate,'#f00')
      }
      // 绘制区域已有菜市场范围
      if (this.areaData.mrketList) {
        for (var i = 0, len = this.areaData.mrketList.length; i < len; i++) {
          this.polygon(this.areaData.mrketList[i].areaCoordinate,'00f')
        }
      }
      // 加载鼠标工具
      AMap.service('AMap.MouseTool', response => {
        var mouseTool = new AMap.MouseTool(map) //在地图中添加MouseTool插件
        var drawPolygon = mouseTool.polygon() //用鼠标工具画多边形
        AMap.event.addListener(mouseTool, 'draw', e => {
          this.marketPath = e.obj.getPath()
          this.current = 1 // 规划了区域状态为1
        })
      })
      // 选定菜市场地址
      this.marker = new AMap.Marker({
        map: map,
        city: this.areaName
      })
      map.on('dblclick', e => {
        this.marker.setPosition(e.lnglat)
        this.formItem.latitude = e.lnglat.O
        this.formItem.longitude = e.lnglat.M
      })
    },
    // 绘制自定义区域
    polygon(arr, color) {
      this.editor._polygon = (() => {
        return new AMap.Polygon({
          map: this.map,
          path: arr,
          strokeColor: color,
          strokeOpacity: 1,
          strokeWeight: 1,
          fillColor: '#f5deb3',
          fillOpacity: 0.5
        })
      })()
      this.map.setFitView() //地图自适应
    },
    // 获取时间
    getbeginTime(time) {
      this.formItem.beginTime = time
    },
    getendTime(time) {
      this.formItem.endTime = time
    },
    // 添加菜市场
    addMarket() {
      if (!this.formItem.marketName) {
        this.$Message.error('菜市场名称必填')
        return false
      }
      if (!this.formItem.beginTime || !this.formItem.endTime) {
        this.$Message.error('配送时间端必填')
        return false
      }
      if (!this.formItem.mobileno || isNaN(this.formItem.mobileno)) {
        this.$Message.error('请填写正确的电话号码')
        return false
      }
      if (!this.formItem.address) {
        this.$Message.error('菜市场地址必填')
        return false
      }
      if (!this.path[0]) {
        this.$Message.error('单击地图规划菜市场配送范围')
        return false
      }
      if (!this.formItem.latitude) {
        this.$Message.error('双击选择菜市场地址')
        return false
      }
      this.formItem.areaCoordinate = this.path
      let params = {
        areaId: this.areaData.areaId,
        market: this.formItem,
        marketId: this.marketId
      }
      api.addMarket(params).then(response => {
        this.$Message.success('添加菜市场成功')
        this.$router.go(-1)
        // window.open('#/configuration')
      })
    },
    // 取消按钮
    goback() {
      this.formItem = {}
      this.getQuInfo()
    },
    // 多边形内搜索
    searchPlace() {
      this.placeSearch.searchInBounds(this.searchData, this.editor._polygon)
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
    min-width: 1100px;
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
