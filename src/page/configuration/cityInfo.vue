<template>
    <div id='cityInfo' class="main" :class="{'isShow':show}">
        <main-header>
            <span slot="h3">查看-城市</span>
        </main-header>
        <section class="cityInfo_map">
            <div class="Breadcrumb">
                <Breadcrumb separator=">">
                    <BreadcrumbItem>广东省</BreadcrumbItem>
                    <BreadcrumbItem>广州市</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="map">
                当前市地图
            </div>
            <div class="setprice">
                <p>城市配送价</p>
                <p>
                    <span>运费(元):</span> <input type="number"></p>
                <p>
                    <span>即时配送价(元):</span><input type="number"></p>
            </div>
        </section>
         <section class="cityInfo_button">
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
#cityInfo {
    .cityInfo_map {
        .Breadcrumb {
            text-align: left;
            font-size: 16px;
            height: 50px;
        }
        .map {
            width: 100%;
            height: 410px;
            background-color: rgba(202, 238, 233, 0.93);
            margin-bottom: 20px;
        }
        .setprice {
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
                input{
                    width: 60px;
                    border: 1px solid #cccccc;
                    border-radius: 5px;
                }
            }
        }
    }
     .cityInfo_button {
        width: 100%;
        position: absolute;
        bottom: 30px;
    }
}
</style>