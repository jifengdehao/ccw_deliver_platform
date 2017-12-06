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
            <div class="button">
              <Button @click="polygonEditorOpen()">开始编辑区域范围</Button>
              <Button @click="polygonEditorClose()">结束编辑区域范围</Button>
            </div>
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
      searchData: '', // 搜索输入框内容
      marker: null,
      geocoder: null,
      marketData: {},
      // beginTime: this.marketData.beginTime,
      // endTime: '',
      marketName: '',
      current: 0,
      marketPath: [],
      editor: {},
      playStatus: false
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
    },
    modifyPath() {
      return this.marketPath.map(item => {
        return [item.lng, item.lat]
      })
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
        this.marketPath = response.areaCoordinate
        this.init()
      })
    },
    init: function() {
      var map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 12
      })
      AMap.plugin(
        ['AMap.ToolBar', 'AMap.Scale', 'AMap.PolyEditor','AMap.Geocoder'],
        function() {
          map.addControl(new AMap.ToolBar())
          map.addControl(new AMap.Scale())
        }
      )
      this.geocoder = new AMap.Geocoder({
            city: this.areaName//城市，默认：“全国”
        });
      // 菜市场位置
      this.marker = new AMap.Marker({
        icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        position: [this.marketData.longitude, this.marketData.latitude]
      })
      this.marker.setMap(map)
      // 绘制多边形
      var editor = this.editor
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
      editor._polygonEditor = new AMap.PolyEditor(map, editor._polygon)
      // 修改菜市场地址
      editor._polygon.on('dblclick', e => {
        this.marker.setPosition(e.lnglat)
        this.marketData.latitude = e.lnglat.O
        this.marketData.longitude = e.lnglat.M
      })
    },
    // 开始修改区域
    polygonEditorOpen() {
      this.playStatus = true
      this.editor._polygonEditor.open()
    },
    // 结束修改
    polygonEditorClose() {
      this.playStatus = false
      this.editor._polygonEditor.close()
      this.marketPath = this.editor._polygon.getPath()
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
      if (!this.marketData.marketName) {
        this.$Message.error('菜市场名称必填')
        return false
      }
      if (!this.marketData.beginTime || !this.marketData.endTime) {
        this.$Message.error('配送时间端必填')
        return false
      }
      if (!this.marketData.mobileno || isNaN(this.marketData.mobileno)) {
        this.$Message.error('请填写正确的电话号码')
        return false
      }
      if (!this.marketData.address) {
        this.$Message.error('菜市场地址必填')
        return false
      }
      if (this.playStatus) {
        this.$Message.error('请结束编辑状态')
        return false
      }
      this.marketData.areaCoordinate = this.modifyPath
      let params = {
        marketId: this.marketId,
        market: this.marketData
      }
      // console.log(params,3)
      api.addMarket(params).then(response => {
        this.$Message.info('修改菜市场成功')
        this.$router.go(-1)
      })
    },
    goback() {
      this.getQuInfo()
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
    min-width: 1000px;
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
      margin-left: 10px;
      font-size: 16px;
    }
  }
  .button {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .addmarket_button {
    width: 100%;
    // position: absolute;
    // bottom: 30px;
    text-align: center;
  }
}
</style>
