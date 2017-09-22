<template>
    <div id='quInfo' class="main" :class="{'isShow':show}">
        <main-header>
            <span slot="h3">查看-区</span>
        </main-header>
        <section class="quInfo_map">
            <div class="Breadcrumb">
                <Breadcrumb separator=">">
                    <BreadcrumbItem>广东省</BreadcrumbItem>
                    <BreadcrumbItem>广州市</BreadcrumbItem>
                    <BreadcrumbItem>番禺区</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="map">
                当前区地图
            </div>
        </section>
        <section class="quInfo_button">
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
#quInfo {
    .quInfo_map {
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
     .quInfo_button {
        width: 100%;
        position: absolute;
        bottom: 30px;
    }
}
</style>