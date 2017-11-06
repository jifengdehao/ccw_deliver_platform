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
    
    </section>
    <section class="addregion_marketinfo">
      <Form ref="formInline"  label-position="left"  inline>
        <FormItem>
            <span>区域名称：</span>
            <Input type="text" v-model="formInline.user" style="width: 150px"></Input>
            <!-- <span>区域范围：</span>
            <Button type="info" size="large" style="width: 150px" @click="startEditable">编辑</Button>
            <Button type="info" size="large" style="width: 150px" @click="endEditable">清除</Button> -->
        </FormItem>
    </Form>
    </section>
    <section class="addregion_button">
      <Button type="ghost" size="large" style="width: 150px" @click="">取消</Button>
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
      quPath: []
    }
  },
  computed: {},
  mounted() {
    this.initMap()
  },
  methods: {
    initMap: function() {
      var district,
        map = new AMap.Map('container', {
          resizeEnable: true,
          center: [113.4, 39.91], //地图中心点
          zoom: 10 //地图显示的缩放级别
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
      // 加载鼠标工具
      AMap.service('AMap.MouseTool',(response => {
        var mouseTool = new AMap.MouseTool(map) //在地图中添加MouseTool插件
        var drawPolygon = mouseTool.polygon() //用鼠标工具画多边形
        AMap.event.addListener(mouseTool, 'draw', (e => {
          this.quPath = e.obj.getPath()
        }))
      }))
    },
    // 添加
    addQu() {
      let params = {
        cityId: this.adcode,
        areaName: this.formInline.user,
        areaCoordinate: this.path
      }
      api.addQu(params).then(response => {
        this.$Message.success('添加成功');
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
    path(){
      return this.quPath.map(item => {
         return [item.lng,item.lat]
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
    background-color: #999;
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
