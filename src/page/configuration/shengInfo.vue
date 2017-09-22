<template>
    <div id='shengInfo' class="main" :class="{'isShow':show}">
        <main-header>
            <span slot="h3">查看-省</span>
        </main-header>
        <section class="shengInfo_map">
            <div class="Breadcrumb">
                <Breadcrumb separator=">">
                    <BreadcrumbItem>广东省</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="map">
                当前省地图
            </div>
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
#shengInfo {
    .shengInfo_map {
        .Breadcrumb {
            text-align: left;
            font-size: 16px;
            height: 50px;
        }
        .map {
            width: 100%;
            height: 816px;
            background-color: rgba(202, 238, 233, 0.93);
        }
    }
}
</style>