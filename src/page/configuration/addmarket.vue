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
        <BreadcrumbItem>{{areaData.cityName}}</BreadcrumbItem>
        <BreadcrumbItem>{{areaData.cityName}}</BreadcrumbItem>
        <BreadcrumbItem >{{areaData.areaName}}</BreadcrumbItem>
        <BreadcrumbItem>{{formItem.marketName}}</BreadcrumbItem>
      </Breadcrumb>
      <p>提示： 单击左键开始规划菜市场区域，点击右键结束规划区域。拖拽点标记选择菜市场地址。</p>
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
      <Form :model="formItem" :label-width="100">
        <Row>
          <Col span="8">
            <FormItem label="菜市场名称：">
            <Input v-model="formItem.marketName" style="width:200px" required></Input>
            </FormItem>
            <FormItem label="菜市场电话：">
              <Input :maxlength="11" v-model="formItem.mobileno" style="width:200px" required></Input>
            </FormItem>
            <FormItem label="菜市场地址：">
              <Input v-model="formItem.address" style="width:200px" required ></Input>
            </FormItem>
            <FormItem label="菜市场坐标：">
              <Button type="info" size="large" style="width: 150px" @click="chooseMarker">市场选点</Button>
            </FormItem>
            <FormItem >
              <RadioGroup v-model="formItem.isSelfPick" type="button" @on-change="changeSelfPick">
                <Radio label="自提关闭"></Radio>
                <Radio label="自提开启"></Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="自提点：">
              <Input v-model="formItem.selfPickAddress" style="width:200px" :disabled="formItem.isSelfPick === '自提关闭'"></Input>
            </FormItem>
            <FormItem label="自提点电话：">   
              <Input v-model="formItem.self_pick_address_number" style="width:200px" :disabled="formItem.isSelfPick === '自提关闭'"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="配送时间：">
            <!-- <CheckboxGroup v-model="formItem.timePick">
              <Checkbox label="两小时送达" ></Checkbox> </br>
              <Checkbox label="按时段送达" ></Checkbox>
            </CheckboxGroup> -->
              <Checkbox v-model="formItem.isTwoHoursPickBoolean">两小时送达</Checkbox>
              <Checkbox v-model="formItem.isTimeSlotPickBoolean" @on-change="isTimeSlotPick">按时段送达</Checkbox>
            </FormItem>
            <FormItem >
             <div  v-for="(item,index) in formItem.pickTimeList" :key="index" style="">
               <TimePicker v-model="formItem.pickTimeList[index].beginTime" :disabled="!formItem.isTimeSlotPickBoolean" placeholder="Select time" format="HH:mm" style="width: 95px"></TimePicker> - 
               <TimePicker v-model="formItem.pickTimeList[index].endTime" :disabled="!formItem.isTimeSlotPickBoolean" placeholder="Select time" format="HH:mm" style="width: 95px"></TimePicker>
               <Button size="small"  v-if="formItem.pickTimeList.length <= 5&&formItem.pickTimeList.length !== 1" shape="circle" @click="deltimeInput(index)"> - </Button>
             </div>
              <Button size="small" v-if="formItem.pickTimeList.length < 5" shape="circle" @click="addtimeInput" style="display: inline">+</Button>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="配送区域：">
              <RadioGroup v-model="formItem.isAreaSelect" @on-change="changeAreaSelect">
                <Radio label="0"> <Button size="small" type="info" :disabled="formItem.isAreaSelect == 1" @click="editPlygon">绘制菜市场 </Button>  </Radio>
                <Radio label="1"> <Input size="small" v-model="formItem.deliverRange" :disabled="formItem.isAreaSelect == 0" style="width:100px" placeholder="配送半径(km)" @on-blur="deliverRange"></Input> </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem >
              <Checkbox v-model="mapScale" >地图标尺</Checkbox> <br>
                <div  v-for="(cicleR,index) in cicleRs" :key="index" style="display: inline">
                  <Input v-model="cicleRs[index]" size="small" style="width:150px" :disabled="!mapScale" placeholder="输入标尺半径" @on-blur="editScale(index)"></Input>
                  <Button size="small"  v-if="cicleRs.length <= 5&&cicleRs.length !== 1" shape="circle" @click="delScaleInput(index)"> - </Button>
                </div>
              <Button size="small" v-if="cicleRs.length < 5" shape="circle" @click="addScaleInput" style="display: inline">+</Button>
            </FormItem>
          </Col>
        </Row>
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
        longitude: 0, // 经度
        pickTimeList: [{ beginTime: '', endTime: '' }],
        isSelfPick: '自提关闭',
        isAreaSelect: 0, // 配送范围:0按经纬度，1按距离
        deliverRange: null // 按距离时的半径
      },
      mapScale: false, // 地图标尺
      cicleRs: [''], // 标尺半径
      areaData: {},
      marketName: '',
      current: 0,
      marketPath: [],
      map: null,
      mouseTool: null, // 鼠标工具
      editor: {},
      polygonObj: null
    }
  },
  computed: {
    areaId() {
      return this.$route.query.areaId
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
  updated() {},
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
        this.polygon(this.areaData.areaCoordinate, '#f00')
      }
      // 绘制区域已有菜市场范围
      if (this.areaData.mrketList) {
        for (var i = 0, len = this.areaData.mrketList.length; i < len; i++) {
          this.polygon(this.areaData.mrketList[i].areaCoordinate, '00f')
        }
      }
      // 加载鼠标工具
      AMap.service('AMap.MouseTool', response => {
        this.mouseTool = new AMap.MouseTool(map) //在地图中添加MouseTool插件
      })
    },
    // 菜市场选点
    chooseMarker() {
      // // 选定菜市场地址
      if (!this.marker) {
        this.marker = new AMap.Marker({
          map: this.map,
          city: this.areaName,
          draggable: true,
          cursor: 'move',
          raiseOnDrag: true
        })
        this.marker.on('dragend', e => {
          this.formItem.latitude = e.lnglat.O
          this.formItem.longitude = e.lnglat.M
        })
      }
    },
    // 绘制菜市场范围
    editPlygon() {
      this.mouseTool.polygon() //用鼠标工具画多边形
      AMap.event.addListener(this.mouseTool, 'draw', e => {
        this.polygonObj = e.obj
        this.marketPath = e.obj.getPath()
        this.current = 1 // 规划了区域状态为1
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
    // 绘制圆
    circle(radius, color, fillOpacity) {
      this.editor._circle = (() => {
        var circle = new AMap.Circle({
          center: [this.formItem.longitude, this.formItem.latitude], // 圆心位置
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
    // 获取时间
    getbeginTime(time) {
      this.formItem.beginTime = time
    },
    getendTime(time) {
      this.formItem.endTime = time
    },
    // 切换是否按时段配送
    isTimeSlotPick(res) {
      // 没选中时清空this.formItem.pickTimeList
      if (!res) {
        this.formItem.pickTimeList = [{}]
      }
    },
    // 增加营业时间输入框
    addtimeInput() {
      if (this.formItem.pickTimeList.length < 5) {
        this.formItem.pickTimeList.push({})
      }
    },
    // 删除配送时段
    deltimeInput(index) {
      if (this.formItem.pickTimeList.length != 1) {
        this.formItem.pickTimeList.splice(index, 1)
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
      if (this.formItem.latitude) {
        this.circle(this.formItem.deliverRange * 1000, '#ccc', 0.1)
      } else {
        alert('选择市场位置')
      }
    },
    // 绘制标尺
    editScale(index) {
      if (this.formItem.latitude) {
        this.circle(this.cicleRs[index] * 1000, 'red', 0)
      } else {
        alert('选择市场位置')
      }
    },
    // 自提是否开启
    changeSelfPick() {
      if (this.formItem.isSelfPick === '自提关闭') {
        this.formItem.selfPickAddress = ''
        this.formItem.self_pick_address_number = ''
      }
    },
    // 选择配送区域规划方式
    changeAreaSelect() {
      if (this.formItem.isAreaSelect == 1) {
        // this.polygonObj.hide() // 隐藏绘制的多边形覆盖物
        if (this.polygonObj) {
          this.mouseTool.close(true)
          this.marketPath = []
        }
      }
    },
    // 添加菜市场
    addMarket() {
      if (!this.formItem.marketName) {
        this.$Message.error('菜市场名称必填')
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
      if (!this.path[0] && this.formItem.isAreaSelect == 0) {
        this.$Message.error('单击地图规划菜市场配送范围')
        return false
      }
      if (!this.formItem.latitude) {
        this.$Message.error('拖拽点标记选择菜市场地址')
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
      display: inline;
    }
  }
  .addmarket_map {
    height: 500px;
    margin-top: 10px;
    background-color: #caeee9;
  }
  .addmarket_marketinfo {
    margin: 0 auto;
    h2 {
      text-align: center;
      line-height: 40px;
    }
    .ivu-form-item {
      margin-bottom: 10px;
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
