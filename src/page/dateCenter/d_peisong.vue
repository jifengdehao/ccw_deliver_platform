<template>
  <div id="d_peisong" class="main" :class="{'isShow':show}">
    <main-header>
      <span slot="h3">配送员数据</span>
      <Button size="large" @click="exportData(2)">导出排序和过滤后的数据</Button>
    </main-header>
    <city-select></city-select>
    <section>
      <Table border :columns="columns6" :data="data5"></Table>
    </section>
  </div>
</template>
<script>
import mainHeader from '../../components/header/main_header.vue'
import citySelect from '../../components/changecity/cityselect.vue'
export default {
  components: { mainHeader, citySelect },
  data() {
    return {
      columns6: [
        {
          title: '日期',
          key: 'date'
        },
        {
          title: '日期',
          key: 'date'
        },
        {
          title: '日期',
          key: 'date'
        },
        {
          title: '日期',
          key: 'date'
        },
        {
          title: '日期',
          key: 'date'
        },
        {
          title: '日期',
          key: 'date'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '年龄',
          key: 'age',
          filters: [
            {
              label: '大于25岁',
              value: 1
            },
            {
              label: '小于25岁',
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return row.age > 25;
            } else if (value === 2) {
              return row.age < 25;
            }
          }
        },
        {
          title: '地址',
          key: 'address',
          filters: [
            {
              label: '北京',
              value: '北京'
            },
            {
              label: '上海',
              value: '上海'
            },
            {
              label: '深圳',
              value: '深圳'
            }
          ],
          filterMethod(value, row) {
            return row.address.indexOf(value) > -1;
          }
        }
      ],
      data5: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
          date: '2016-10-03'
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          date: '2016-10-01'
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
          date: '2016-10-02'
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
          date: '2016-10-04'
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
    },
    exportData() {
      this.$Modal.info({
        title: '用户信息',
        content: `姓名：${this.data6[index].name}<br>年龄：${this.data6[index].age}<br>地址：${this.data6[index].address}`
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
