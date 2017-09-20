<template>
    <div id="courseinfo" class="main">
        <main-header>
           <span slot="h3">查看课程</span> 
        </main-header>
        <section class="infolist">
            <p v-for="item in 6"><span>课程编号</span><span>KC1240</span></p>
        </section>
       
    </div>
</template>
<script>
    import mainHeader from '../../components/header/main_header.vue'
export default {
    components:{
        mainHeader
    },
  name: "component_name",
  data () {
    return {
    };
  }
}
</script>
<style lang="less" scoped>
    #courseinfo{
        .infolist{
               margin-top: 20px;
            p{
                height: 50px;
                font-size: 16px;
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
</style>