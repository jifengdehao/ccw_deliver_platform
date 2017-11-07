<template>
  <div id="home">
    <div class="H-header">
      <Icon type="ios-home"></Icon>&nbsp;&nbsp;欢迎回到配送中心
    </div>
    <!--统计信息-->
    <div class="H-tip clearfix">
      <h3>首页统计信息</h3>
      <ul class="fr">
        <li>在线骑手：9人</li>
        <li>今日订单：200单</li>
        <li>超时订单：1.02%</li>
      </ul>
    </div>
    <Row style="margin-top: 20px;">
      <Col span="6">
      <h3>省区</h3>
      <!--<Select v-model="province" style="width:200px" clearable>-->
      <!--<Option v-for="item in provinceData" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
      <!--</Select>-->
      <Cascader :data="provinceData" v-model="province" style="width:200px"></Cascader>
      </Col>
      <Col span="6">
      <h3>市区</h3>
      <!--<Select v-model="city" style="width:200px" clearable>-->
      <!--<Option v-for="item in cityData" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
      <!--</Select>-->
      <Cascader :data="cityData" v-model="city" style="width:200px"></Cascader>
      </Col>
      <Col span="6">
      <h3>区域</h3>
      <!--<Select v-model="area" style="width:200px" clearable>-->
      <!--<Option v-for="item in areaData" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
      <!--</Select>-->
      <Cascader :data="areaData" v-model="area" style="width:200px"></Cascader>
      </Col>
      <Col span="6">
      <h3>菜市场</h3>
      <!--<Select v-model="market" style="width:200px" clearable>-->
      <!--<Option v-for="item in marketData" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
      <!--</Select>-->
      <Cascader :data="marketData" v-model="market" style="width:200px"></Cascader>
      </Col>
    </Row>
    <Row style="margin-top: 40px;">
      <Col span="8">
      <Card class="H-card" dis-hover>
        <h3>系统消息</h3>
        <ul>
          <li>
            2017-8-8 XXXXXX市场XXXX菜市场XXX暂时暂停配送2017-8-8 XXXXXX市场XXXX菜市场XXX暂时暂停配送
            <Icon type="chevron-right"></Icon>
          </li>
          <li>
            2017-8-8 XXXXXX市场XXXX菜市场XXX暂时暂停配送
            <Icon type="chevron-right"></Icon>
          </li>
          <li>
            2017-8-8 XXXXXX市场XXXX菜市场XXX暂时暂停配送
            <Icon type="chevron-right"></Icon>
          </li>
          <li>
            2017-8-8 XXXXXX市场XXXX菜市场XXX暂时暂停配送
            <Icon type="chevron-right"></Icon>
          </li>
          <li>
            2017-8-8 XXXXXX市场XXXX菜市场XXX暂时暂停配送
            <Icon type="chevron-right"></Icon>
          </li>
          <li>
            2017-8-8 XXXXXX市场XXXX菜市场XXX暂时暂停配送
            <Icon type="chevron-right"></Icon>
          </li>
          <li>
            2017-8-8 XXXXXX市场XXXX菜市场XXX暂时暂停配送
            <Icon type="chevron-right"></Icon>
          </li>
          <li>
            2017-8-8 XXXXXX市场XXXX菜市场XXX暂时暂停配送
            <Icon type="chevron-right"></Icon>
          </li>
          <li>
            2017-8-8 XXXXXX市场XXXX菜市场XXX暂时暂停配送
            <Icon type="chevron-right"></Icon>
          </li>
          <li>
            2017-8-8 XXXXXX市场XXXX菜市场XXX暂时暂停配送
            <Icon type="chevron-right"></Icon>
          </li>
          <li>
            2017-8-8 XXXXXX市场XXXX菜市场XXX暂时暂停配送
            <Icon type="chevron-right"></Icon>
          </li>
          <li>
            2017-8-8 XXXXXX市场XXXX菜市场XXX暂时暂停配送
            <Icon type="chevron-right"></Icon>
          </li>
          <li>
            2017-8-8 XXXXXX市场XXXX菜市场XXX暂时暂停配送
            <Icon type="chevron-right"></Icon>
          </li>
        </ul>
      </Card>
      </Col>
      <Col span="8" offset="2">
      <Card class="H-card" dis-hover>
        <h3>骑士审核</h3>
        <ul>
          <li>
            骑士身份信息审核
            <span class="fr">未读信息：88条</span>
            <Icon type="chevron-right"></Icon>
          </li>
          <li>
            骑士身份信息审核
            <span class="fr">未读信息：88条</span>
            <Icon type="chevron-right"></Icon>
          </li>
          <li>
            骑士身份信息审核
            <span class="fr">未读信息：88条</span>
            <Icon type="chevron-right"></Icon>
          </li>
          <li>
            骑士身份信息审核
            <span class="fr">未读信息：88条</span>
            <Icon type="chevron-right"></Icon>
          </li>
          <li>
            骑士身份信息审核
            <span class="fr">未读信息：88条</span>
            <Icon type="chevron-right"></Icon>
          </li>
        </ul>
      </Card>
      </Col>
    </Row>

    <Row style="margin-top: 40px;">
      <Col span="8">
         <Card class="H-card" dis-hover>
           <h3>实时监控</h3>
           <ul>
             <li>
               需要手工派单
               <span class="H-card-border">50</span>
               <Icon type="chevron-right"></Icon>
             </li>
             <li>
               新订单
               <span class="H-card-border">50</span>
               <Icon type="chevron-right"></Icon>
             </li>
             <li>
               已送达订单
               <span class="H-card-border">50</span>
               <Icon type="chevron-right"></Icon>
             </li>
             <li>
               异常订单
               <span class="H-card-border">50</span>
               <Icon type="chevron-right"></Icon>
             </li>
             <li>
               骑手上班/休息
               <span class="H-card-border">50</span>
               <Icon type="chevron-right"></Icon>
             </li>
           </ul>
         </Card>
      </Col>
      <Col span="8" offset="2">
        <Card class="H-card" dis-hover>
          <h3>数据看板</h3>
          <div class="H-card-data clearfix">
            <div class="item border-right border-bottom">
              <p>订单成长量&nbsp;&nbsp;&nbsp;8765</p>
              <p>比上周同期&nbsp;&nbsp;&nbsp;13%&nbsp;&nbsp;&nbsp;<Icon type="arrow-up-c"></Icon></p>
            </div>
            <div class="item border-bottom">
              <p>订单超时率&nbsp;&nbsp;&nbsp;1%</p>
              <p>比上周同期&nbsp;&nbsp;&nbsp;10%&nbsp;&nbsp;&nbsp;<Icon type="arrow-up-c"></Icon></p>
            </div>
            <div class="item border-right">
              <p>异常订单率&nbsp;&nbsp;&nbsp;11%</p>
              <p>比上周同期&nbsp;&nbsp;&nbsp;1%&nbsp;&nbsp;&nbsp;<Icon type="arrow-up-c"></Icon></p>
            </div>
            <div class="item">
              <p>骑士人手&nbsp;&nbsp;&nbsp;32</p>
              <p>比上周同期&nbsp;&nbsp;&nbsp;16%&nbsp;&nbsp;&nbsp;<Icon type="arrow-up-c"></Icon></p>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
  import * as api from '@/api/common'

  export default {
    data() {
      return {
        province: [],
        market: [],
        area: [],
        city: [],
        provinceData: [
          {
            value: 'guangdongsheng',
            label: '广东省'
          },
        ],
        cityData: [
          {
            value: 'guangzhou',
            label: '广州市'
          }
        ],
        areaData: [
          {
            value: 'shiqiao',
            label: '市桥'
          }
        ],
        marketData: [
          {
            value: 'm1',
            label: '菜市场1'
          }
        ]
      }
    },
    computed: {},
    created() {
    },
    methods: {}
  }
</script>
<style lang="less" scoped type="text/less">
  #home {
    .H-header {
      height: 60px;
      border-bottom: 1px solid #ddd;
      line-height: 60px;
      font-size: 16px;
    }
    .H-tip {
      height: 40px;
      line-height: 40px;
      margin-top: 12px;
      background-color: #363e54;
      padding: 0 20px;
      color: #ffffff;
      & > h3 {
        color: #fff;
        display: inline-block;
      }
      & > ul {
        font-size: 0;
        height: 40px;
      }
      & > ul > li {
        display: inline-block;
        font-size: 16px;
        margin-left: 10px;
      }
    }
    .H-card {
      height: 300px;
      .ivu-card-body > ul {
        overflow-y: scroll;
        height: 200px;
      }
      .ivu-card-body > ul > li {
        text-align: left;
        line-height: 35px;
        padding: 0 20px 0 10px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        position: relative;
      }
      .ivu-card-body > ul > li > i {
        position: absolute;
        top: 11px;
        right: 0;
      }
      .ivu-card-body > h3 {
        margin-bottom: 20px;
      }
      .H-card-border{
        border: 1px solid #dddddd;
        border-radius: 4px;
        width: 150px;
        float: right;
        margin-right: 30px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        display: inline-block;
        margin-top: 2px;
      }
      .H-card-data{
        width: 100%;
        .item{
          width: 50%;
          float: left;
          padding: 20px 0;
          line-height: 35px;
          text-align: center;
        }
        .item.border-right{
          border-right: 1px solid #dddddd;
        }
        .item.border-bottom{
          border-bottom: 1px solid #dddddd;
        }
      }
    }
  }
</style>
