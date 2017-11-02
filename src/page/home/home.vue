<template>
  <div id="home">
    <div class="H-header">
      <Icon type="ios-home" :size="iconSize"></Icon>&nbsp;&nbsp;欢迎回到配送中心
    </div>
    <!--统计信息-->
    <div class="H-tip clearfix">
      <h4>首页统计信息</h4>
      <ul class="fr">
        <li>在线骑手：9人</li>
        <li>今日订单：200单</li>
        <li>超时订单：1.02%</li>
      </ul>
    </div>


    <!--
    <section class="H_statistics clearfix">
      <ul>
        <li class="H_message H_statistics_info">
          <h3>系统消息</h3>
          <ul>
            <li class="">2017-8-8 XXXXXX市场XXXX菜市场XXX暂时暂停配送
              <Icon type="chevron-right" class="fr"></Icon>
            </li>
            <li class="">2017-8-8 XXXXXX市场XXXX菜市场XXX暂时暂停配送
              <Icon type="chevron-right" class="fr"></Icon>
            </li>
            <li class="">2017-8-8 XXXXXX市场XXXX菜市场XXX暂时暂停配送
              <Icon type="chevron-right" class="fr"></Icon>
            </li>
          </ul>
        </li>
        <li class="H_message H_statistics_senhe">
          <h3>骑士审核</h3>
          <ul>
            <li class="" v-for="item in 3">骑士身份信息审核
              <i class="fr">
                <span style="margin-right: 30px">未读信息：
                  <b>88</b>条</span>
                <Icon type="chevron-right"></Icon>
              </i>
            </li>
          </ul>
        </li>
        <li class="H_message H_statistics_monitor">
          <h3>实时监控</h3>
          <ul>
            <li>
              <span>需要手工派单</span>
              <span class="H_statistics_monitor_shulian">50</span>
              <i>
                <Icon type="chevron-right"></Icon>
              </i>
            </li>
            <li>
              <span>新订单</span>
              <span class="H_statistics_monitor_shulian">50</span>
              <i>
                <Icon type="chevron-right"></Icon>
              </i>
            </li>
            <li>
              <span>已送达订单</span>
              <span class="H_statistics_monitor_shulian">50</span>
              <i>
                <Icon type="chevron-right"></Icon>
              </i>
            </li>
            <li>
              <span>异常订单</span>
              <span class="H_statistics_monitor_shulian">50</span>
              <i>
                <Icon type="chevron-right"></Icon>
              </i>
            </li>
            <li>
              <span>骑手上班/休息</span>
              <span class="H_statistics_monitor_shulian">50</span>
              <i>
                <Icon type="chevron-right"></Icon>
              </i>
            </li>
          </ul>
        </li>
        <li class="H_message H_statistics_kanban">
          <h3>数据看板</h3>
          <ul>
            <li v-for="item in 4">
              <div class="fl">
                <p>订单成长量</p>
                <p>8765</p>
              </div>
              <div class="fr">
                <p>13%
                  <Icon type="ios-arrow-thin-up"></Icon>
                </p>
                <p>比上周同期</p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </section>
    -->
  </div>
</template>
<script>
  import * as api from '@/api/common'

  export default {
    data() {
      return {
        iconSize: 22
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
    font-size: 16px;
    .H-header {
      height: 60px;
      border-bottom: 1px solid #ddd;
      line-height: 60px;
    }
    .H-tip {
      height: 40px;
      line-height: 40px;
      margin-top: 12px;
      background-color: #999;
      padding: 0 20px;
      & > h4 {
        color: #fff;
        display: inline-block;
        font-size: 16px;
      }
      & > ul {
        font-size: 0;
      }
      & > ul > li {
        display: inline-block;
        font-size: 16px;
        margin-left: 10px;
      }
    }

    .H_statistics {
      .H_message {
        width: 540px;
        height: 285px;
        border: 1px solid #ccc;
        border-radius: 5px;
        float: left;
        margin-bottom: 30px;
        padding-top: 15px;
        padding-left: 20px;
        padding-right: 20px;
        &:nth-of-type(odd) {
          margin-right: 70px;
        }
        ul {
          margin-top: 37px;
          li {
            text-align: left;
            line-height: 35px;
            padding-left: 10px;
          }
        }
      }
      .H_statistics_monitor {
        ul {
          li {
            text-align: right;
            border: none;
            .H_statistics_monitor_shulian {
              display: inline-block;
              width: 200px;
              height: 33px;
              border: 1px solid #ccc;
              border-radius: 3px;
              text-align: center;
              margin: 0 30px;
            }
          }
        }
      }
      .H_statistics_kanban {
        li {
          float: left;
          width: 50%;
          height: 105px;
          box-sizing: border-box;
          padding: 10px 20px 0 30px;
          &:nth-of-type(odd) {
            border-right: 1px solid #ddd;
          }
          &:nth-of-type(1),
          &:nth-of-type(2) {
            border-bottom: 1px solid #ddd;
          }
          div {
            width: 50%;
            p {
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
