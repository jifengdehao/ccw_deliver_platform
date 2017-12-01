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
            <span @click="showCity(item.provinceId,item.provinceName,index)" :class="{current:shengSelected==index}"> {{item.provinceName}}</span>
            <Button type="info" size="small" class="fr" style="border: none" @click="seeThisSheng(item.provinceId,item.provinceName)">查看</Button>
          </li>
        </ul>
      </div>
      <!-- 市区 -->
      <div class="configuration_quyu clearfix">
        <div class="configuration_quyu_title clearfix">
          <h3>市区</h3>
        </div>
        <ul class="configuration_quyu_content" v-for="(item,index) in citys" :key="index">
          <li>
            <span @click="showQu(item.cityId,item.cityName,index)" :class="{current:citySelected === index}"> {{item.cityName}}</span>
            <Button type="info" size="small" class="fr" style="border: none" @click="seeThisCity(item.cityId,item.cityName)">查看</Button>
          </li>
        </ul>
      </div>
      <!-- 大区 -->
      <div class="configuration_quyu clearfix">
        <div class="configuration_quyu_title clearfix">
          <h3>区域</h3>
          <Button @click="addregion()" style="width: 60px;" type="ghost" size="small" v-if="addQu">新增</Button>
        </div>
        <ul class="configuration_quyu_content" v-for="(item,index) in qus" :key="index">
          <li>
            <span @click="showMarket(item.areaId,item.areaName,index)" :class="{current:areaSelected==index}" class="smallSpan"> {{item.areaName}}</span>
            <Button type="ghost" size="small" class="fr" style="color: red;border: none;" @click="delQu(index)">删除</Button>
            <Button type="info" size="small" class="fr" style="border: none;" @click="seeThisQu(item.areaId,item.areaName)">查看</Button>
          </li>
        </ul>
      </div>
      <!-- 菜市场 -->
      <div class="configuration_quyu clearfix">
        <div class="configuration_quyu_title clearfix">
          <h3>菜市场</h3>
          <Button @click="addmarket()" style="width: 60px;" type="ghost" size="small" v-if="addMarket">新增</Button>
        </div>
        <ul class="configuration_quyu_content" v-for="(item,index) in markets" :key="index">
          <li>
            <span class="smallSpan"> {{item.marketName}}</span>
            <Button type="ghost" size="small" class="fr" style="color: red;border: none" @click="delMarket(index)">删除</Button>
            <Button type="info" size="small" class="fr" style="border: none" @click="seeThisMarket(item.marketId)">查看</Button>
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
      shengSelected: Number, // 点击省区选择
      citySelected: Number, // 点击城市
      areaSelected: Number, // 点击区域
      showCitys: true,
      addQu: false,
      addMarket: false,
      provinceName: '',
      cityName: '',
      areaName: '',
      cityId: '',
      areaId: '',
      hide: '',
      shengs: [],
      citys: [],
      qus: [],
      markets: []
    }
  },
  created() {
    api.getShengs().then(response => {
      this.shengs = response
    })
    // if (sessionStorage.getItem('provinceId')) {
    //   this.shengSelected = sessionStorage.getItem('index')
    //   this.showCity(sessionStorage.getItem('provinceId'))
    // }
    // if (sessionStorage.getItem('cityId')) {
    //   this.citySelected = sessionStorage.getItem('cityIndex')
    //   this.showQu(sessionStorage.getItem('cityId'))
    // }
  },
  methods: {
    // 新增 区  菜市场
    addregion() {
      this.$router.push(
        '/addregion?provinceName=' +
          this.provinceName +
          '&cityName=' +
          this.cityName +
          '&cityId=' +
          this.cityId
      )
    },
    addmarket() {
      this.$router.push(
        '/addmarket?provinceName=' +
          this.provinceName +
          '&cityName=' +
          this.cityName +
          '&areaId=' +
          this.areaId
      )
    },
    // 删除
    delQu(index) {
      let id = this.qus[index].areaId
      api.delQu(id).then(response => {
        this.$Message.success('删除成功')
        this.qus.splice(index, 1)
      })
    },
    delMarket(index) {
      let id = this.markets[index].marketId
      api.delMarket(id).then(response => {
        this.$Message.success('添加成功')
        this.markets.splice(index, 1)
      })
    },
    // 查看
    seeThisSheng(provinceId, provinceName) {
      this.$router.push(
        '/shengInfo?provinceName=' + provinceName + '&provinceId=' + provinceId
      )
    },
    seeThisCity(cityId, cityName) {
      this.$router.push(
        '/cityInfo?cityName=' +
          cityName +
          '&provinceName=' +
          this.provinceName +
          '&cityId=' +
          cityId
      )
    },
    seeThisQu(areaId) {
      this.areaId = areaId
      this.$router.push(
        '/quInfo?areaId=' +
          areaId +
          '&provinceName=' +
          this.provinceName +
          '&cityName=' +
          this.cityName
      )
    },
    seeThisMarket(marketId) {
      this.$router.push(
        '/marketInfo?marketId=' +
          marketId +
          '&provinceName=' +
          this.provinceName +
          '&cityName=' +
          this.cityName +
          '&areaName=' +
          this.areaName
      )
    },
    // 获取下级列表
    showCity(provinceId, provinceName, index) {
      if (index) {
        this.shengSelected = index
      }

      this.citySelected = null
      this.areaSelected = null
      this.provinceName = provinceName
      // sessionStorage.setItem('provinceId', provinceId)
      // sessionStorage.setItem('index', index)
      api.getCitys(provinceId).then(response => {
        this.citys = response
        this.qus = []
        this.markets = []
      })
    },
    showQu(cityId, cityName, index) {
      this.citySelected = index
      this.areaSelected = null
      this.cityName = cityName
      this.cityId = cityId
      // sessionStorage.setItem('cityId', cityId)
      // sessionStorage.setItem('cityIndex', index)
      api.getQus(cityId).then(response => {
        this.qus = response
        this.markets = []
      })
      this.addQu = true
    },
    showMarket(areaId, areaName, index) {
      this.areaSelected = index
      this.areaId = areaId
      this.areaName = areaName
      api.getMarkets(areaId).then(response => {
        this.markets = response
      })
      this.addMarket = true
    }
  },
  computed: {}
}
</script>
<style lang="less" scoped type="text/less">
#configuration {
  .configurationHeader {
    height: 40px;
    line-height: 40px;
    margin-bottom: 30px;
    background-color: #363e54;
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
      width: 190px;
      height: 25px;
      line-height: 25px;
      margin: 10px 5px 0 5px;
      float: left;
      span {
        display: inline-block;
        width: 145px;
        height: 25px;
        border: 1px solid #ccc;
        border-radius: 5px;
        text-align: center;
        // overflow: auto;
      }
      .smallSpan {
        width: 110px;
      }
      .current {
        background-color: #eee;
      }
    }
  }
}
</style>
