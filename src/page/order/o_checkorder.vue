<template>
  <div id="o_checkorder">
    <section class="o_checkorder_map">
      地图
    </section>
    <Row style="margin-top: 20px;margin-bottom: 20px;">
      <Col span="24">
      <Table  :columns="columns" :data="data"></Table>
      </Col>
    </Row>
    <Row>
      <Col span="6">
        <h3>用户信息</h3><br/>
        <p>用户ID：22122323</p>
        <p>收货人：王小伟</p>
        <p>联系电话：171791279</p>
        <p>收货地址：广东省广州市番禺区桥南街南堤东路836号</p>
        <p>下单时间：2017-10-03 15:12</p>
      </Col>
      <Col span="6">
        <h3>订单信息</h3><br/>
        <p>运单编号：ff3222442</p>
        <p>订单类型：用户首单／普通订单</p>
        <p>订单编号：jk23892823</p>
        <p>订单状态：新订单</p>
        <p>货物明细：榴莲 * 5</p>
        <p>订单备注：无</p>
        <p>缺货选择：缺货</p>
      </Col>
      <Col span="6">
        <h3>支付信息</h3><br/>
        <p>订单金额：¥500.00</p>
        <p>包装费：¥10.00</p>
        <p>配送费：0</p>
        <p>优惠金额：¥50</p>
        <p>优惠方式：优惠卷</p>
        <p>实付金额：¥450</p>
        <p>支付方式：支付宝</p>
        <p>支付时间：2017-10-03 16:00</p>
      </Col>
      <Col span="6">
        <h3>配送信息</h3><br/>
        <p>配送时间：2017-10-03 16:00</p>
        <p>送达时间：2017-10-03 16:00</p>
        <p>配送员Id：jl73838</p>
        <p>配送员：🀄️钟小楚</p>
        <p>异常原因：无</p>
        <p>省区：广东省</p>
        <p>市区：广州市</p>
        <p>区域：番禺区</p>
        <p>菜市场：番禺菜市场</p>
      </Col>
    </Row>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        columns: [
          {
            title: '序号',
            align: 'center',
            key: 'number'
          },
          {
            title: '用户ID',
            key: 'customId',
            align: 'center'
          },
          {
            title: '姓名',
            key: 'name',
            align: 'center'
          },
          {
            title: '联系方式',
            key: 'tel',
            align: 'center'
          },
          {
            title: '所属菜市场',
            key: 'market',
            align: 'center'
          },
          {
            title: '工作状态',
            key: 'jobStatus',
            align: 'center'
          }
        ],
        data: [
          {
            number: 1,
            customId: 1121313,
            name: '张三',
            tel: 189329238,
            market: '番禺菜市场',
            jobStatus: '上班'
          },
          {
            number: 1,
            customId: 1121313,
            name: '张三',
            tel: 189329238,
            market: '番禺菜市场',
            jobStatus: '上班'
          },
          {
            number: 1,
            customId: 1121313,
            name: '张三',
            tel: 189329238,
            market: '番禺菜市场',
            jobStatus: '上班'
          },
          {
            number: 1,
            customId: 1121313,
            name: '张三',
            tel: 189329238,
            market: '番禺菜市场',
            jobStatus: '上班'
          },
          {
            number: 1,
            customId: 1121313,
            name: '张三',
            tel: 189329238,
            market: '番禺菜市场',
            jobStatus: '上班'
          }
        ]
      }
    },
    computed: {
      show() {
        return this.$store.state.show
      }
    },
    methods: {
      getCurrentDate() {
        return new Date().toLocaleDateString()
      }
    }
  }
</script>
<style lang="less" scoped type="text/less">
  #o_checkorder {
    .o_checkorder_map {
      height: 450px;
      background-color: rgba(202, 238, 233, 0.93);
      margin-top: 10px;
    }
    .o_checkorder_list {
      margin-top: 10px;
      .ivu-table td {
        height: 25px;
      }
    }
  }
</style>
