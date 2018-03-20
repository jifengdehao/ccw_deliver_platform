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
      <div class="SelectCity">
        <Select v-model="provinceId" clearable :disabled="selectedProvince" style="max-width:200px;" @on-change="changeProvince" >
         <Option v-for="(item,index) in shengs" :value="item.provinceId" :key="item.provinceId">{{
          item.provinceName}}
          </Option>
        </Select>
        <Select v-model="cityId" style="max-width:200px;" clearable  @on-change="changeCity">
           <Option v-for="item in citys" :value="item.cityId" :key="item.cityId">{{ item.cityName }}</Option>
        </Select>
        <Button type="info" style="border: none;" @click="seeThisCity">查看</Button>
      </div>
       
      <!-- 大区 -->
      <div class="configuration_quyu clearfix">
        <div class="configuration_quyu_title clearfix">
          <h3>区域</h3>
          <Button @click="addregion()" style="width: 60px;" type="ghost" size="small" v-if="addQu">新增</Button>
        </div>
        <ul class="configuration_quyu_content" >
          <li v-for="(item,index) in qus" :key="index">
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
        <ul class="configuration_quyu_content" >
          <li v-for="(item,index) in markets" :key="index">
            <span class="smallSpan"> {{item.marketName}}</span>
            <Button type="ghost" size="small" class="fr" style="color: red;border: none" @click="delMarket(index)">删除</Button>
            <Button type="info" size="small" class="fr" style="border: none" @click="seeThisMarket(item.marketId)">查看</Button>
          </li>
        </ul>
      </div>
    </section>
    <Modal
        v-model="delModal"
        :title= "modalTitle"
        :mask-closable = "false"
        :closable = "false"
        @on-ok="del">
       <h2>{{modalMain}}</h2>
    </Modal>
  </div>
</template>
<script>
import * as api from '@/api/common.js'
export default {
  components: {},
  data() {
    return {
      delModal: false,
      delAreaId: '',
      delMarketId: '',
      delIndex: NaN,
      modalTitle: '', // 弹框标题
      modalMain: '', // 弹框内容
      areaSelected: NaN, // 点击区域
      showCitys: true,
      addQu: false,
      addMarket: false,
      selectedProvince: false, // 省份是否可选
      provinceName: '',
      cityName: '',
      areaName: '',
      provinceId: 440000, // 省id 固定广东省
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
    // 获取省份信息
    api.getShengs().then(response => {
      this.shengs = response
    })
    // sessionStorage中有保存省的id
    if (/^\d+$/.test(sessionStorage.getItem('provinceId'))) {
      this.provinceId = JSON.parse(sessionStorage.getItem('provinceId'))
      this.changeProvince(this.provinceId)
    }
    if (/^\d+$/.test(sessionStorage.getItem('cityId'))) {
      this.cityId = JSON.parse(sessionStorage.getItem('cityId'))
      this.changeCity(this.cityId)
    }
    if (/^\d+$/.test(sessionStorage.getItem('areaIndex'))) {
      this.areaSelected = JSON.parse(sessionStorage.getItem('areaIndex'))
      this.showMarket(
        sessionStorage.getItem('areaId'),
        sessionStorage.getItem('areaName')
      )
    }
  },
  mounted() {
    // alert(this.provinceId)
    if (this.provinceId) {
      this.changeProvince(this.provinceId)
    }
  },
  methods: {
    // 新增 区  菜市场
    addregion() {
      this.$router.push('/addregion?cityId=' + this.cityId)
    },
    addmarket() {
      this.$router.push('/addmarket?areaId=' + this.areaId)
    },
    // 删除
    delQu(index) {
      this.delAreaId = this.qus[index].areaId
      this.delIndex = index
      this.delModal = true
      this.modalTitle = '删除区域'
      this.modalMain = '是否删除该区域'
      // api.delQu(id).then(response => {
      //   this.$Message.success('删除成功')
      //   this.qus.splice(index, 1)
      // })
    },
    delMarket(index) {
      this.delMarketId = this.markets[index].marketId
      this.delIndex = index
      this.delModal = true
      this.modalTitle = '删除菜市场'
      this.modalMain = '是否删除该菜市场'
      // api.delMarket(id).then(response => {
      //   this.$Message.success('删除成功')
      //   this.markets.splice(index, 1)
      // })
    },
    // 确定删除按钮
    del() {
      if (this.modalTitle === '删除区域') {
        api.delQu(this.delAreaId).then(response => {
          this.$Message.success('删除成功')
          this.qus.splice(this.delIndex, 1)
        })
      } else if (this.modalTitle === '删除菜市场') {
        api.delMarket(this.delMarketId).then(response => {
          this.$Message.success('删除成功')
          this.markets.splice(this.delIndex, 1)
        })
      }
    },
    // 查看
    // seeThisSheng(provinceId, provinceName) {
    //   this.$router.push(
    //     '/shengInfo?provinceName=' + provinceName + '&provinceId=' + provinceId
    //   )
    // },
    seeThisCity() {
      if (this.cityId) {
        this.$router.push('/cityInfo?cityId=' + this.cityId)
      }
    },
    seeThisQu(areaId) {
      this.areaId = areaId
      this.$router.push('/quInfo?areaId=' + areaId)
    },
    seeThisMarket(marketId) {
      this.$router.push('/marketInfo?marketId=' + marketId)
    },

    // 选择省
    changeProvince(value) {
      // alert(this.provinceId)
      if (value) {
        sessionStorage.setItem('provinceId', value)
        // 获取该省内城市信息
        api.getCitys(value).then(response => {
          this.citys = response
        })
        this.qus = []
        this.markets = []
      }
    },
    // 选择城市
    changeCity(value) {
      if (value) {
        sessionStorage.setItem('cityId', value)
        api.getQus(value).then(response => {
          this.qus = response
        })
        this.markets = []
        this.addQu = true
      }
    },

    showMarket(areaId, areaName, areaIndex) {
      if (/^\d+$/.test(areaIndex)) {
        this.areaSelected = areaIndex
        sessionStorage.setItem('areaIndex', areaIndex)
      }
      sessionStorage.setItem('areaId', areaId)
      sessionStorage.setItem('areaName', areaName)
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
  .SelectCity {
    margin-bottom: 30px;
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
