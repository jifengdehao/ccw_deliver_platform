<template>
    <div id="addcourse" class="main" :class="{'isShow':show}">
        <main-header>
            <span slot="h3">增加课程</span>
        </main-header>
        <section class="infolist">
            <p v-for="item in 6">
                <span>课程编号</span>
                <span>KC1240</span>
            </p>
        </section>
        <section class="addcourse_button">
            <Button size="large" style="width: 200px;background-color: #fff;">取消</Button>
            <Button size="large" style="width: 200px;background-color: #fff;">确定</Button>
        </section>
    </div>
</template>
<script>
import mainHeader from '../../components/header/main_header.vue'
export default {
    components: {
        mainHeader
    },
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
}
</script>
<style lang="less" scoped>
#addcourse {
    .infolist {
        margin-top: 20px;
        p {
            height: 50px;
            font-size: 16px;
            span {
                float: left;
                &:first-child {
                    display: inline-block;
                    width: 200px;
                }
                &:last-child {
                    display: inline-block;
                    padding: 0 10px;
                    height: 30px;
                    border: 1px solid #666666;
                    border-radius: 5px;
                }
            }
        }
    }
    .addcourse_button {
        width: 100%;
        position: absolute;
        bottom: 30px;
    }
}
</style>