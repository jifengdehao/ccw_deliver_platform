/*
 * @Author: huShangJun 
 * @Date: 2017-11-08 14:04:00 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 查看菜市场
 */

<template>
  <div id="marketInfo" class="clearfix">
    <section class="addmarketHeader">
      <span slot="h3">查看-菜市场</span>
    </section>
    <section class="addmarket_breadcrumb">
      <Breadcrumb separator=">">
        <BreadcrumbItem>{{provinceName}}</BreadcrumbItem>
        <BreadcrumbItem>{{cityName}}</BreadcrumbItem>
        <BreadcrumbItem>{{areaName}}</BreadcrumbItem>
        <BreadcrumbItem>{{marketName}}</BreadcrumbItem>
      </Breadcrumb>
    </section>
    <!-- 地图内容 -->
    <section class="addmarket_map" id="container">
      
    </section>
    <!-- 菜市场信息 -->
    <section class="addmarket_marketinfo">
      <h2>菜市场信息</h2>
      <Form v-model="marketData"  inline>
        <FormItem >
            <span>菜市场名称：</span>
            <Input v-model="marketData.marketName"  style="width:200px"></Input>
            <span>菜市场电话：</span>
            <Input v-model="marketData.mobileno"  style="width:200px"></Input>
            <span>配送时间段：</span>
            <!-- <TimePicker :value="beginTime" format="HH:mm:ss" placeholder="Select time" style="width: 95px"></TimePicker> -->
            <TimePicker @on-change="getbeginTime" :value="marketData.beginTime"  placeholder="Select time" format="HH:mm" style="width: 95px"></TimePicker> - 
            <TimePicker  @on-change="getendTime" :value="marketData.endTime" placeholder="Select time" format="HH:mm" style="width: 95px"></TimePicker>
            <br>
            <span>自提点电话：</span>            
            <Input v-model="marketData.self_pick_address_number" style="width:200px" ></Input> 
             <span>自提点：</span>
            <Input v-model="marketData.selfPickAddress"  style="width:200px"></Input>
            <span>菜市场地址：</span>
            <Input v-model="marketData.address" style="width:200px" ></Input>
        </FormItem>
    </Form>
    </section>
    <section class="addmarket_button">
      <Button type="ghost" size="large" style="width: 150px" @click="goback">取消</Button>
      <Button type="ghost" size="large" style="width: 150px" @click="modifyMarket">保存</Button>
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
      marketData: {},
      // beginTime: this.marketData.beginTime,
      // endTime: '',
      marketName: '',
      current: 0,
      marketPath: []
    }
  },
  computed: {
    marketId() {
      return this.$route.query.marketId
    },
    areaName() {
      return this.$route.query.areaName
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
  methods: {
    getQuInfo() {
      api.getMarketInfo(this.marketId).then(response => {
        this.marketData = response
        // this.beginTime = response.beginTime
        // this.endTime = response.endTime
        this.marketName = response.marketName
        this.init()
      })
    },
    init(e) {
      var map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 12
      })
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function() {
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Scale())
      })
      // 菜市场位置
      // AMap.Marker()
      var marker = new AMap.Marker({
        icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        position: [this.marketData.longitude, this.marketData.latitude]
      })
      marker.setMap(map)
      // 绘制多边形
      var editor = {}
      editor._polygon = (() => {
        var arr = this.marketData.areaCoordinate
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
    // 获取选择框的时间
   // 获取时间
    getbeginTime(time) {
      this.marketData.beginTime = time
    },
    getendTime(time) {
      this.marketData.endTime = time
    },
    // 修改菜市场信息
    modifyMarket() {
      let params = {
        marketId: this.marketId,
        marketinfo: this.marketData
      }
      api.addMarket(params).then(response => {
        this.$Message.info('修改菜市场成功')
      })
    },
    goback() {
      window.history.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
#marketInfo {
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
