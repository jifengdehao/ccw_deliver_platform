/*
 * @Author: huShangJun 
 * @Date: 2017-11-06 14:30:40 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 查看城市 
 */

<template>
    <div id='cityInfo'>
        <section class="cityInfoHeader">
            <span slot="h3">查看-城市</span>
        </section>
        <section class="cityInfo_map">
          <!-- 面包屑 -->
            <div class="Breadcrumb">
                <Breadcrumb separator=">">
                    <BreadcrumbItem>{{cityData.provinceName}}</BreadcrumbItem>
                    <BreadcrumbItem>{{cityData.cityName}}</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="map" id="container">
                当前市地图
            </div>
            <div class="setprice" >
              <Form :model="cityData" :label-width="200">
                <FormItem label="运费(元):">
                  <InputNumber v-model="cityData.expense" :min="0" :step="0.50" placeholder="请输入运费" style="width:180px">
                  </InputNumber>
                </FormItem>
                <FormItem label="免费配送门槛(元):">
                  <InputNumber v-model="cityData.instantExpense" :min="0" :step="0.50" placeholder="请输入即时配送价" style="width:180px">
                  </InputNumber>
                </FormItem>
                <FormItem label="计重收费门槛(斤):">
                  <InputNumber v-model="cityData.freeFeeWeight"  :min="0" placeholder="请输入即时配送价" style="width:180px">
                  </InputNumber>
                </FormItem>
                <FormItem label="每超出门槛一斤收费(元):">
                  <InputNumber v-model="cityData.oneKgFee" :min="0" :step="0.50" placeholder="请输入即时配送价" style="width:180px">
                  </InputNumber>
                </FormItem>
              </Form>
            </div>
        </section>
         <section class="cityInfo_button">
            <Button size="large" style="width: 200px;background-color: #fff;" @click="goback">返回</Button>
            <Button size="large" style="width: 200px;background-color: #fff;" @click="nodifyCityInfo(cityData)">确定</Button>
        </section>
    </div>
</template>
<script>
// import AMap from 'AMap'
import * as api from '@/api/common.js'
export default {
  components: {},
  name: 'component_name',
  data() {
    return {
      cityData: {
        expense: null,
        instantExpense: null,
        oneKgFee: null,
        freeFeeWeight: null
      },
      editor: {},
      map: null
    }
  },
  mounted() {
    this.getCityInfo(this.adcode)
  },
  methods: {
    // 查询城市详情
    getCityInfo(adcode) {
      api.getCityInfo(adcode).then(response => {
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
        ['AMap.ToolBar', 'AMap.Scale', 'AMap.PolyEditor'],
        function() {
          map.addControl(new AMap.ToolBar())
          map.addControl(new AMap.Scale())
        }
      )
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
                  fillOpacity: 0.5,
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
    },
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
    nodifyCityInfo(cityData) {
      if (!cityData.expense) {
        this.$Message.erroe('请填写运费')
        return false
      }
      if (!cityData.instantExpense) {
        this.$Message.erroe('请填写及时配送价')
        return false
      }
      cityData.cityId = this.adcode
      api.modfiyCityMessage(cityData).then(response => {
        this.$Message.info('修改成功')
      })
    },
    goback() {
      window.history.go(-1)
    }
  },
  computed: {
    adcode() {
      return this.$route.query.cityId
    }
  }
}
</script>
<style lang="less" scoped>
#cityInfo {
  .cityInfoHeader {
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
    background-color: #363e54;
  }
  .cityInfo_map {
    .Breadcrumb {
      text-align: left;
      font-size: 16px;
      height: 40px;
    }
    .map {
      width: 100%;
      height: 400px;
      background-color: rgba(202, 238, 233, 0.93);
      margin-bottom: 20px;
    }
    .setprice {
      width: 500px;
      margin: 0 auto;
      p {
        font-size: 18px;
        height: 40px;
        // line-height: 40px;
        span {
          display: inline-block;
          font-size: 16px;
          width: 200px;
          box-sizing: border-box;
        }
        input {
          width: 60px;
          border: 1px solid #cccccc;
          border-radius: 5px;
        }
      }
    }
  }
  .cityInfo_button {
    width: 100%;
    margin-top: 20px;
    text-align: center;
  }
}
</style>