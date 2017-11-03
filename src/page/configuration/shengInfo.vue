<template>
    <div id='shengInfo'>
        <section class="shengInfoHeader">
            <span slot="h3">查看-省</span>
        </section>
        <section class="shengInfo_map">
            <div class="Breadcrumb">
                <Breadcrumb separator=">">
                    <BreadcrumbItem>广东省</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div id="container" class="map">
              <el-amap vid="amapDemo"  :zoom="12" class="amap-demo" :plugin="plugins">
                 
              </el-amap>
            </div>
        </section>
    </div>
</template>
<script>
export default {
  components: {},
  name: 'component_name',
  data() {
    return {
      plugins: [
        {
          pName: 'DistrictSearch',
          events: {
            init(instance) {
              console.log(instance)
            }
          }
        }
      ]
    }
  },
  created() {},
  mounted() {
    // this.search()
  },
  methods: {
    search() {
    }
  }
}
</script>
<style lang="less" scoped>
#shengInfo {
  .shengInfoHeader {
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
  .shengInfo_map {
    .Breadcrumb {
      text-align: left;
      font-size: 20px;
      height: 25px;
    }
    .map {
      width: 100%;
      height: 600px;
      background-color: rgba(202, 238, 233, 0.93);
    }
  }
}
</style>