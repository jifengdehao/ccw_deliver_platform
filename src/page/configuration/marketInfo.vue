<template>
    <div id='marketInfo' class="main" :class="{'isShow':show}">
        <main-header>
            <span slot="h3">查看-菜市场</span>
        </main-header>
        <section class="marketInfo_map">
            <div class="Breadcrumb">
                <Breadcrumb separator=">">
                    <BreadcrumbItem>广东省</BreadcrumbItem>
                    <BreadcrumbItem>广州市</BreadcrumbItem>
                    <BreadcrumbItem>番禺区</BreadcrumbItem>
                    <BreadcrumbItem>菜市场1</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="map">
                当前菜市场地图
            </div>
        </section>
        <section class="marketInfo_setting">
            <p>菜市场信息</p>
            <ul>
                <li>
                    <span>菜市场名称：</span><input type="text"></li>
                <li>
                    <span>菜市场电话：</span><input type="text"></li>
                <li>
                    <span>经纬度：</span><input type="button" value="设置"></li>
                <li>
                    <span>配送区域：</span><input type="button" value="设置"></li>
                <li>
                    <span>配送时间段：</span><input type="text"></li>
                <li>
                    <span>绑定小区：</span><input type="text"></li>
                <li>
                    <span>自提点：</span><input type="text"></li>
            </ul>
        </section>
          <section class="marketInfo_button">
            <Button size="large" style="width: 200px;background-color: #fff;">取消</Button>
            <Button size="large" style="width: 200px;background-color: #fff;">确定</Button>
        </section>
    </div>
</template>
<script>
import mainHeader from '../../components/header/main_header.vue'
export default {
    components: { mainHeader },
    name: "component_name",
    data() {
        return {
        };
    },
    computed: {
        show() {
            return this.$store.state.show
        }
    },
    methons: {
    }
}
</script>
<style lang="less" scoped>
#marketInfo {
    .marketInfo_map {
        .Breadcrumb {
            text-align: left;
            font-size: 16px;
            height: 50px;
        }
        .map {
            width: 100%;
            height: 230px;
            background-color: rgba(202, 238, 233, 0.93);
            margin-bottom: 20px;
        }
    }
    .marketInfo_setting {
        margin-top: 20px;
        p{
            font-size: 18px;
            height: 50px;
        }
        li{
            text-align: left;
            float: left;
            font-size: 16px;
            width: 33.33%;
            height: 40px;
            span{
                display: inline-block;
                width: 100px;
            }
            input{
                border: 1px solid #ccc;
                border-radius: 5px;
                width: 200px;
            }
        }
    }
     .marketInfo_button {
        width: 100%;
        position: absolute;
        bottom: 30px;
    }
}
</style>