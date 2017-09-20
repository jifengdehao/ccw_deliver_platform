<template>
    <div id="datecenter" class="main">
       <main-header>
         <span slot="h3">数据中心</span>
       </main-header>
      <section class="datecenter_tonji clearfix">
        <ul>
          <li><span>在线骑手</span><span>97</span><p>80%在线，较昨日上升1%</p></li>
          <li><span>在线骑手</span><span>97</span><p>80%在线，较昨日上升1%</p></li>
          <li><span>在线骑手</span><span>2789</span><p>80%在线，较昨日上升1%</p></li>
          <li><span>在线骑手</span><span>97</span><p>80%在线，较昨日上升1%</p></li>
        </ul>
      </section>
      <section class="datecenter_shuju clearfix">
        <div class="datecenter_chart fl"><h1>chart</h1></div>
        <div class="datecenter_rank fr">
          <h3>月推广量排行榜</h3>
          <Table border :columns="columns1" :data="data1"></Table>
        </div>
      </section>
    </div>
</template>
<script>
  import mainHeader from '../../components/header/main_header.vue'
    export default {
        components: {mainHeader},
        data() {
            return {
              columns1: [
                {
                  title: '姓名',
                  key: 'name'
                },
                {
                  title: '推广量',
                  key: 'age'
                },
                {
                  title: '所属菜市场',
                  key: 'address'
                }
              ],
              data1: [
                {
                  name: '王小明',
                  age: 18,
                  address: '清河菜市场'
                },
                {
                  name: '张小刚',
                  age: 25,
                  address: ''
                },
                {
                  name: '李小红',
                  age: 30,
                  address: ''
                },
                {
                  name: '周小伟',
                  age: 26,
                  address: '深圳市南山区深南大道'
                }
              ]
            }
        },
        methods: {
            getCurrentDate() {
                return new Date().toLocaleDateString()
            }
        }
    }
</script>
<style lang="less" scoped>
  #datecenter{
    .datecenter_tonji{
    margin-bottom: 20px;
      li{
        position: relative;
        float: left;
        width: 220px;
        height: 125px;
        box-sizing: border-box;
        padding: 20px 13px 0 13px;
        margin: 20px 90px 0 0;
        border: 1px solid #666666;
        font-size: 14px;
        text-align: left;
        &:last-of-type{
          margin-right: 0;
        }
        span{
          display: inline-block;
          width: 50%;
          line-height: 0;
          &:first-of-type{
            text-align: left;
          }
          &:last-of-type{
            font-size: 48px;
            vertical-align: middle;
          }
        }
        p{
          position: absolute;
          bottom: 10px;
        }
      }
    }
    .datecenter_shuju{
      margin-bottom: 20px;
      .datecenter_chart{
        width: 74%;
        height: 625px;
        background-color: #caeee9;
      }
      .datecenter_rank{
        width: 25%;
        height: 625px;
        background-color: #fdfffd;
        h3{
          font-size: 15px;
          font-weight: 700;
          height: 30px;
        }
      }
    }
  }

</style>
