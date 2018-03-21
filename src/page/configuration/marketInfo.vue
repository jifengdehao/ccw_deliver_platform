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
        <BreadcrumbItem>{{marketData.provinceName}}</BreadcrumbItem>
        <BreadcrumbItem>{{marketData.cityName}}</BreadcrumbItem>
        <BreadcrumbItem>{{marketData.areaName}}</BreadcrumbItem>
        <BreadcrumbItem>{{marketName}}</BreadcrumbItem>
      </Breadcrumb>
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
      <Form :model="marketData" :label-width="100">
        <Row>
          <Col span="8">
            <FormItem label="菜市场名称：">
            <Input v-model="marketData.marketName" style="width:200px" required></Input>
            </FormItem>
            <FormItem label="菜市场电话：">
              <Input :maxlength="11" v-model="marketData.mobileno" style="width:200px" required></Input>
            </FormItem>
            <FormItem label="菜市场地址：">
              <Input v-model="marketData.address" style="width:200px" required ></Input>
            </FormItem>
            <FormItem label="菜市场坐标：">
              <Button type="info" size="large" style="width: 150px" @click="chooseMarker">重新选点</Button>
            </FormItem>
            <FormItem >
              <RadioGroup v-model="marketData.isSelfPick" type="button" >
                <Radio label="0">自提关闭</Radio>
                <Radio label="1">自提开启</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="自提点：">
              <Input v-model="marketData.selfPickAddress" style="width:200px" :disabled="marketData.isSelfPick == '0'"></Input>
            </FormItem>
            <FormItem label="自提点电话：">   
              <Input v-model="marketData.self_pick_address_number" style="width:200px" :disabled="marketData.isSelfPick == '0'"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="配送时间：">
            <!-- <CheckboxGroup v-model="formItem.timePick">
              <Checkbox label="两小时送达" ></Checkbox> </br>
              <Checkbox label="按时段送达" ></Checkbox>
            </CheckboxGroup> -->
              <Checkbox v-model="marketData.isTwoHoursPickBoolean">两小时送达</Checkbox>
              <Checkbox v-model="marketData.isTimeSlotPickBoolean" >按时段送达</Checkbox>
            </FormItem>
            <FormItem >
             <div  v-for="(item,index) in marketData.pickTimeList" :key="index" style="">
               <TimePicker v-model="marketData.pickTimeList[index].beginTime" :disabled="!marketData.isTimeSlotPickBoolean" placeholder="Select time" format="HH:mm" style="width: 95px"></TimePicker> - 
               <TimePicker v-model="marketData.pickTimeList[index].endTime" :disabled="!marketData.isTimeSlotPickBoolean" placeholder="Select time" format="HH:mm" style="width: 95px"></TimePicker>
               <Button size="small"   shape="circle" @click="deltimeInput(index)"> - </Button>
             </div>
              <Button size="small"  shape="circle"  style="display: inline" @click="addtimeInput">+</Button>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="配送区域：">
              <RadioGroup v-model="marketData.isAreaSelect" vertical>
                <Radio label="0" v-show="!marketData.isAreaSelect"> 
                  <!-- <Button size="small" type="info" :disabled="marketData.isAreaSelect == 1" >绘制菜市场 </Button>   -->
                  <Button size="small" :disabled="marketData.isAreaSelect == 1" @click="polygonEditorOpen()">开始编辑当前市场范围</Button> 
                  <Button size="small" :disabled="marketData.isAreaSelect == 1" @click="polygonEditorClose()">结束编辑当前市场范围</Button>
                </Radio>
                <Radio label="1" v-show="marketData.isAreaSelect"> <Input size="small" v-model="marketData.deliverRange" :disabled="marketData.isAreaSelect == 0" style="width:100px" placeholder="配送半径(km)" @on-blur="deliverRange"></Input> </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem >
                <Checkbox v-model="mapScale" >地图标尺</Checkbox> <br>
                <div  v-for="(cicleR,index) in cicleRs" :key="index" style="display: inline">
                  <Input v-model="cicleRs[index]" size="small" style="width:150px" :disabled="!mapScale" placeholder="输入标尺半径" @on-blur="editScale(index)"></Input>
                  <Button size="small"  v-if="cicleRs.length <= 7&&cicleRs.length !== 1" shape="circle" @click="delScaleInput(index)"> - </Button>
                </div>
              <Button size="small" v-if="cicleRs.length < 7" shape="circle"  style="display: inline" @click="addScaleInput">+</Button>
            </FormItem>
          </Col>
        </Row>
        <FormItem >
            <div class="button">
              <Button @click="showOtherMarket()">显示该区域所有菜市场</Button>
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
      map: null,
      placeSearch: null,
      marker: null,
      geocoder: null,
      areaData: {}, // 上一级区域的信息
      marketData: {},
      // beginTime: this.marketData.beginTime,
      // endTime: '',
      marketName: '',
      current: 0,
      marketPath: [],
      editor: {},
      playStatus: false,
      cicleRs: [''],
      mapScale: false,
      othermarketEdit: false // 其他区域是否绘制
    }
  },
  computed: {
    marketId() {
      return this.$route.query.marketId
    },
    modifyPath() {
      if (Array.isArray(this.marketPath)) {
        return this.marketPath.map(item => {
          return [item.lng, item.lat]
        })
      }
    }
  },
  created() {
    this.getQuInfo()
  },
  mounted() {},
  methods: {
    getQuInfo() {
      api.getMarketInfo(this.marketId).then(response => {
        this.marketData = response
        this.marketName = response.marketName
        this.marketPath = response.areaCoordinate
        api.getQuInfo(this.marketData.areaId).then(response => {
          this.areaData = response
          this.init()
        })
      })
    },
    init: function() {
      var map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 12
      })
      this.map = map
      AMap.plugin(
        [
          'AMap.ToolBar',
          'AMap.Scale',
          'AMap.PolyEditor',
          'AMap.Geocoder',
          'AMap.PlaceSearch'
        ],
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
      // 点绘制
      this.geocoder = new AMap.Geocoder({
        city: this.areaName //城市，默认：“全国”
      })

      // 绘制区域范围
      // console.log(this.areaData)
      if (this.areaData.areaCoordinate) {
        this.polygon(this.areaData.areaCoordinate, 'red')
      }
      // // 绘制本市场范围
      if (this.marketData.areaCoordinate && this.marketData.isAreaSelect == 0) {
        this.polygon(this.marketData.areaCoordinate, '00f')
      } else if (
        this.marketData.deliverRange &&
        this.marketData.isAreaSelect == 1
      ) {
        this.circle(this.marketData.deliverRange * 1000, 'blue', 0.15)
      }

      this.editor._polygonEditor = new AMap.PolyEditor(
        map,
        this.editor._polygon
      )
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
    // 绘制圆
    circle(radius, color, fillOpacity) {
      this.editor._circle = (() => {
        var circle = new AMap.Circle({
          center: [this.marketData.longitude, this.marketData.latitude], // 圆心位置
          radius: radius, //半径
          strokeColor: color, //线颜色
          strokeOpacity: 1, //线透明度
          strokeWeight: 1, //线粗细度
          fillOpacity: fillOpacity
        })
        circle.setMap(this.map)
        return circle
      })()
    },
    // 显示其他菜市场范围
    showOtherMarket() {
      if (this.areaData.mrketList && !this.othermarketEdit) {
        for (var i = 0, len = this.areaData.mrketList.length; i < len; i++) {
          this.polygon(this.areaData.mrketList[i].areaCoordinate, 'green')
          this.othermarketEdit = true // 绘制了其他区域赋值为true
        }
      }
    },
    // 菜市场选点
    chooseMarker() {
      // // 选定菜市场地址
      if (!this.marker) {
        // 菜市场位置
        this.marker = new AMap.Marker({
          icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: [this.marketData.longitude, this.marketData.latitude],
          draggable: true,
          cursor: 'move',
          raiseOnDrag: true
        })
        this.marker.setMap(this.map)
        this.marker.on('dragend', e => {
          this.marketData.latitude = e.lnglat.O
          this.marketData.longitude = e.lnglat.M
        })
      }
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
    editScale(index) {
      if (this.marketData.latitude) {
        this.circle(this.cicleRs[index] * 1000, 'red', 0)
      } else {
        alert('选择市场位置')
      }
    },
    // 获取选择框的时间
    // 增加营业时间输入框
    addtimeInput() {
      if (this.marketData.pickTimeList.length < 7) {
        this.marketData.pickTimeList.push({})
      }
    },
    // 删除配送时段
    deltimeInput(index) {
      if (this.marketData.pickTimeList.length != 1) {
        this.marketData.pickTimeList.splice(index, 1)
      }
    },
    // 添加标尺
    addScaleInput() {
      if (this.cicleRs.length < 5) {
        this.cicleRs.push('')
      }
    },
    // 删除标尺
    delScaleInput(index) {
      if (this.cicleRs.length != 1) {
        this.cicleRs.splice(index, 1)
      }
    },
    // 选择配送范围为 绘制yuan
    deliverRange() {
      if (this.marketData.latitude) {
        this.circle(this.marketData.deliverRange * 1000, '#ccc', 0.1)
      } else {
        alert('选择市场位置')
      }
    },
    // 修改菜市场信息
    modifyMarket() {
      if (!this.marketData.marketName) {
        this.$Message.error('菜市场名称必填')
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
      // console.log(params, 3)
      api.addMarket(params).then(response => {
        this.$Message.info('修改菜市场成功')
        this.$router.go(-1)
      })
    },
    goback() {
      this.getQuInfo()
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
    min-width: 1160px;
    height: 500px;
    margin-top: 10px;
    background-color: #caeee9;
  }
  .addmarket_marketinfo {
    min-width: 1100px;
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
