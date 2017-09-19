<template>
    <div  id="addmarket" class="main">
      <main-header>
        <span slot="h3">新增</span>
      </main-header>
      <section class="addmarket_breadcrumb">
        <Breadcrumb separator=">">
          <BreadcrumbItem >广东省</BreadcrumbItem>
          <BreadcrumbItem >广州市</BreadcrumbItem>
          <BreadcrumbItem href="/addregion">区域1</BreadcrumbItem>
          <BreadcrumbItem>菜市场</BreadcrumbItem>
        </Breadcrumb>
      </section>
      <section class="addmarket_map">
        <h1>地图</h1>
      </section>
      <section class="addmarket_marketinfo">
          <h2>菜市场信息</h2>
          <ul>
            <li><p><span>菜市场名称：</span><span>番禺菜市场</span></p><p><span>配送区域:</span> <span>设置</span></p></li>
            <li><p><span>菜市场电话：</span><span>番禺菜市场</span></p><p><span>配送时间段:</span> <span>设置</span></p></li>
            <li><p><span>经纬度：</span><span>番禺菜市场</span></p><p><span>绑定小区:</span> <span>设置</span></p></li>
          </ul>
      </section>
      <section class="addmarket_button">
        <Button type="ghost" size="large" style="width: 150px">取消</Button>
        <Button type="ghost" size="large"  style="width: 150px">保存</Button>
      </section>
    </div>
</template>
<script>
  import mainHeader from '../../components/header/main_header.vue'
    export default {
        components:{mainHeader},
        data() {
            return {}
        },
        methods: {
            getCurrentDate() {
                return new Date().toLocaleDateString()
            }
        }
    }
</script>
<style lang="less" scoped>
  #addmarket{
    position: relative;
    font-size: 16px;
    .addmarket_breadcrumb{
      text-align: left;
      BreadcrumbItem{
        font-size: 16px;
      }
    }
    .addmarket_map{
      height: 230px;
      margin-top: 10px;
      background-color: #caeee9;
    }
    .addmarket_marketinfo{

      h2{
        font-size: 18px;
        line-height: 40px;
      }
      li{
        float: left;
        width: 33%;
        p{
        height: 50px;

          span{
            float: left;
            &:first-child{
              display: inline-block;
              width: 200px;

            }
            &:last-child{
              display: inline-block;
              padding: 0 10px;
              height: 30px;
              border: 1px solid #666666;
              border-radius: 5px;
            }
          }
        }
      }
    }
    .addmarket_button{
      width: 100%;
      position: absolute;bottom: 50px;
    }
  }

</style>
