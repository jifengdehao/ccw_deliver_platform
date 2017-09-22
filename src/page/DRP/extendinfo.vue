<template>
  <div id="extendinfo" class="main" :class="{'isShow':show}">
    <main-header>
      <span slot="h3">分销管理</span>
    </main-header>
    <section class="extendinfo_person">
      <ul>
        <li>
          <P class="infolist">
            <span>用户ID:</span>
            <span>Ca1234</span>
          </P>
          <P class="infolist">
            <span>姓名:</span>
            <span>东方不败</span>
          </P>
          <P class="infolist">
            <span>性别:</span>
            <span>男</span>
          </P>
          <P class="infolist">
            <span>联系方式:</span>
            <span>10086</span>
          </P>
          <P class="infolist">
            <span>出生年月:</span>
            <span>1999/09/09</span>
          </P>
          <P class="infolist">
            <span>省份证号:</span>
            <span>469777182737272333</span>
          </P>
        </li>
        <li>
          <P class="infolist">
            <span>转正时间:</span>
            <span>1999/09/09</span>
          </P>
          <p class="infolist" v-for="item in 4">
            <span>省区</span>
            <Select v-model="model1" style="width:150px;">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </p>
        </li>
        <li>
          <P class="infolist">
            <span>累计推广(人):</span>
            <span>998</span>
          </P>
          <P class="infolist">
            <span>本月推广(人):</span>
            <span>998</span>
          </P>
          <P class="infolist">
            <span>累计推广收入(分):</span>
            <span>998</span>
          </P>
          <P class="infolist">
            <span>本月推广收入(分):</span>
            <span>998</span>
          </P>
        </li>
      </ul>
    </section>
    <section>
      <Table stripe :columns="columns1" :data="data1"></Table>
    </section>
  </div>
</template>
<script>
import mainHeader from '../../components/header/main_header.vue'
import citySelect from '../../components/changecity/cityselect.vue'
export default {
  components: {
    mainHeader, citySelect
  },
  data() {
    return {
      cityList: [
        {
          value: 'beijing',
          label: '北京市'
        },
        {
          value: 'shanghai',
          label: '上海市'
        },
        {
          value: 'shenzhen',
          label: '深圳市'
        },
        {
          value: 'hangzhou',
          label: '杭州市'
        },
        {
          value: 'nanjing',
          label: '南京市'
        },
        {
          value: 'chongqing',
          label: '重庆市'
        }
      ],
      model1: '',
      columns1: [
        {
          title: '时间',
          key: 'name'
        },
        {
          title: '用户端ID',
          key: 'age'
        },
        {
          title: '获得积分',
          key: 'address'
        }
      ],
      data1: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗'
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道'
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道'
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
<style lang="less" scoped>
#extendinfo {
  .extendinfo_person {
    height: 280px;
    border-bottom: 1px solid #ccc;
    li {
      float: left;
      width: 33.33%;
      .infolist {
        font-size: 16px;
        text-align: left;
        vertical-align: middle;
        margin: 10px 0;
        span {
          display: inline-block;
          width: 150px;
          height: 30px;
          line-height: 30px;
          vertical-align: middle;
        }
      }
      citySelect {
        p {
          display: none;
        }
      }
    }
  }
}
</style>
