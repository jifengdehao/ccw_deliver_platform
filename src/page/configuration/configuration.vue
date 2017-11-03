/*
 * @Author: huShangJun 
 * @Date: 2017-10-31 10:18:20 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 配置设置 
 */

<template>
  <div id="configuration">
    <!-- 内容头部 -->
    <section class="configurationHeader">
      <span slot="h3">配置设置</span>
    </section>
    <!-- 显示地址内容 -->
    <section class="clearfix">
      <!-- 省区 -->
      <div class="configuration_quyu clearfix">
        <div class="configuration_quyu_title clearfix">
          <h3>省区</h3>
        </div>
        <ul class="configuration_quyu_content" v-for="(item,index) in shengs" :key="index">
          <li >
            <span @click="showCity(item.provinceId)"> {{item.provinceName}}</span>
            <Button type="info" size="small" class="fr" style="border: none" @click="seeThisSheng(index)">查看</Button>
          </li>
        </ul>
      </div>
      <!-- 市区 -->
      <div class="configuration_quyu clearfix" v-if="showCitys">
        <div class="configuration_quyu_title clearfix">
          <h3>市区</h3>
        </div>
        <ul class="configuration_quyu_content" v-for="(item,index) in citys" :key="index">
          <li>
            <span @click="showQu(item.cityId)"> {{item.cityName}}</span>
            <Button type="info" size="small" class="fr" style="border: none" @click="seeThisCity()">查看</Button>            
          </li>
        </ul>
      </div>
      <!-- 大区 -->
      <div class="configuration_quyu clearfix" v-if="showQus">
        <div class="configuration_quyu_title clearfix">
          <h3>区域</h3>
          <Button @click="addregion()" style="width: 60px;" type="ghost" size="small">新增</Button>
        </div>
        <ul class="configuration_quyu_content" v-for="(item,index) in qus" :key="index">
          <li>
            <span @click="showMarket(item.areaId)"> {{item.areaName}}</span>
            <Button type="ghost" size="small" class="fr" style="color: red;border: none;" @click="delCity(index)">删除</Button>
            <Button type="info" size="small" class="fr" style="border: none;" @click="seeThisQu()">查看</Button>            
          </li>
        </ul>
      </div>
      <!-- 菜市场 -->
      <div class="configuration_quyu clearfix" v-if="showMarkets">
        <div class="configuration_quyu_title clearfix">
          <h3>菜市场</h3>
          <Button @click="addmarket()" style="width: 60px;" type="ghost" size="small">新增</Button>
        </div>
        <ul class="configuration_quyu_content" v-for="(item,index) in markets" :key="index">
          <li>
            <span> {{item.marketName}}</span>
            <Button type="ghost" size="small" class="fr" style="color: red;border: none" @click="delMarket(index)">删除</Button>
            <Button type="info" size="small" class="fr" style="border: none" @click="seeThisMarket()">查看</Button>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
import * as api from '@/api/common.js'
export default {
  components: {},
  data() {
    return {
      showCitys: false,
      showQus: false,
      showMarkets: false,
      hide: '',
      shengs: [],
      citys: [
        {
          city: '广州'
        },
        {
          city: '深圳'
        },
        {
          city: '东莞'
        },
        {
          city: '佛山'
        },
        {
          city: '惠州'
        },
        {
          city: '珠海'
        },
        {
          city: '中山'
        },
        {
          city: '韶关'
        },
        {
          city: '河源'
        }
      ],
      qus: [],
      markets: []
    }
  },
  created() {
    api.getShengs().then(response => {
      this.shengs = response
    })
  },
  methods: {
    // 新增 区  菜市场
    addregion() {
      this.$router.push('/addregion')
    },
    addmarket() {
      this.$router.push('/addmarket')
    },
    // 删除
    delQu(index) {
      let id = this.qus[index].areaId
      api.delQu(id).then(response => {
        this.qus.splice(index, 1)
      })
    },
    delMarket(index){
       let id = this.markets[index].marketId
      api.delMarket(id).then(response => {
        this.markets.splice(index, 1)
      })
    },
    // 查看
    seeThisSheng() {
      this.$router.push('/shengInfo')
    },
    seeThisCity() {
      this.$router.push('/cityInfo')
    },
    seeThisQu() {
      this.$router.push('/quInfo')
    },
    seeThisMarket() {
      this.$router.push('/marketInfo')
    },
    // 获取下级列表
    showCity(provinceId) {
      api.getCitys(provinceId).then(response => {
        this.citys = response
      })
      this.showCitys = true
    },
    showQu(cityId) {
      api.getQus(cityId).then(response => {
        this.qus = response
      })
      this.showQus = true
    },
    showMarket(areaId) {
      api.getMarkets(areaId).then(response => {
        this.markets = response
      })
      this.showMarkets = true
    }
  },
  computed: {}
}
</script>
<style lang="less" scoped>
#configuration {
  .configurationHeader {
    height: 40px;
    line-height: 40px;
    margin-bottom: 30px;
    background-color: #999;
    span {
      margin-left: 10px;
      font-size: 18px;
      color: #fff;
    }
  }
  .configuration_quyu {
    border: 1px solid #aaa;
    text-align: left;
    border-radius: 5px;
    margin-bottom: 25px;
    padding: 5px;
    .configuration_quyu_title {
      h3 {
        display: inline-block;
        width: 60px;
        font-size: 16px;
        font-weight: 700;
        margin-right: 10px;
      }
    }
    li {
      width: 160px;
      height: 25px;
      line-height: 25px;
      margin: 10px 50px 0 50px;
      padding-left: 5px;
      float: left;
      span {
        display: inline-block;
        width: 75px;
        height: 25px;
        border: 1px solid #ccc;
        border-radius: 5px;
        text-align: center;
      }
    }
  }
}
</style>
