<template>
  <div id="addregion" >
    <section class="addregionHeader">
      <span slot="h3">新增-区</span>
    </section>
    <section class="addregion_breadcrumb">
      <Breadcrumb separator=">">
        <BreadcrumbItem>广东省</BreadcrumbItem>
        <BreadcrumbItem>广州市</BreadcrumbItem>
        <BreadcrumbItem>区域1</BreadcrumbItem>
      </Breadcrumb>
    </section>
    <section class="addregion_map" id="container">
     <!-- <el-amap :vid="'amap-vue'"></el-amap> -->
      <el-amap vid="amap" :zoom="zoom"  :center="center" 
      ref="map"
      class="amap-demo">
        <el-amap-polygon v-for="(polygon, index) in polygons" :vid="index" :fillOpacity="fillOpacity" :editable="editable" :ref="`polygon_${index}`" :path="polygon.path" :events="polygon.events"></el-amap-polygon>
      </el-amap>
    </section>
    <section class="addregion_marketinfo">
      <Form ref="formInline"  label-position="left"  inline>
        <FormItem>
            <span>区域名称：</span>
            <Input type="text" v-model="formInline.user" style="width: 150px"></Input>
            <span>区域范围：</span>
            <Button type="info" size="large" style="width: 150px" @click="startEditable">开始编辑</Button>
            <Button type="info" size="large" style="width: 150px" @click="endEditable">结束编辑</Button>
        </FormItem>
    </Form>
    </section>
    <section class="addregion_button">
      <Button type="ghost" size="large" style="width: 150px" >取消</Button>
      <Button type="ghost" size="large" style="width: 150px">保存</Button>
    </section>
  </div>
</template>
<script>
// import { AMapManager } from 'vue-amap'
export default {
  components: {},
  data() {
    return {
      formInline: {},
      zoom: 15,
      editable: false,
      fillOpacity: 0.2,
      center: [121.5273285, 31.21515044],
      polygons: [
        {
          path: [
            [121.5273285, 31.21515044],
            [121.5293285, 31.21515044],
            [121.5293285, 31.21915044],
            [121.5273285, 31.21515044]
          ],
          events: {
            click: () => {
              console.log(this.$refs.map.$$getCenter())
            }
          }
        }
      ]
    }
  },
  computed: {},
  mounted() {},
  methods: {
    startEditable(){
      this.editable = true
    },
    endEditable(){
       console.log(this.$refs.polygon_0[0].$$getPath())
       this.editable = false
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
    height: 500px;
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
    position: absolute;
    bottom: 30px;
    text-align: center;
  }
}
</style>
