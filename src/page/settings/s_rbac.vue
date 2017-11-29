/*
 * @Author: WuFengliang
 * @Date: 2017-11-03 15:33:08
 * DeveloperMailbox:   wufengliang@ccw163.com
 * FunctionPoint: 权限管理
 */
<template>
  <div id="s_rbac" class="main" :class="{'isShow':show}">
    <!-- 头部 -->
    <div class="header">
      <h2>权限管理</h2>
      <div class="header-search">
        <Input placeholder="姓名/联系方式/用户ID" style="width: 200px" v-model="params.condition"></Input>
        <span @click="search"><Icon type="ios-search icos"></Icon></span>
      </div>
    </div>
    <section class="s_rbac_list">
      <Table v-if="userData" border :columns="UserListTitles" :data="userData.records"></Table>
    </section>
    <Page v-if="userData" class="fr" :total="userData.total" @on-change="reLoadData"></Page>
  </div>
</template>
<script>
import * as http from '@/api/common'
export default {
  name: 'authList',
  data() {
    return {
      params: {
        pageSize: 10,
        pageNumber: 1,
        condition: ''
      },
      UserListTitles: [
        {
          title: '序号',
          type: 'index'
        },
        {
          title: '用户ID',
          key: 'psUserId'
        },
        {
          title: '姓名',
          key: 'userName'
        },
        {
          title: '联系方式',
          key: 'mobileno'
        },
        {
          title: '邮箱地址',
          key: 'email'
        },
        {
          title: '角色名称',
          key: 'roleName'
        },
        {
          title: '所属菜市场',
          key: 'marketName'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push(`/s_rbac/${params.row.psUserId}`)
                    }
                  }
                },
                '查看'
              )
            ])
          }
        }
      ],
      userData: null //  权限管理数据
    }
  },
  created() {
    this.getUsersList()
  },
  computed: {
    show() {
      return this.$store.state.show
    }
  },
  methods: {
    //  获取权限数据列表
    getUsersList() {
      http.getUsersList(this.params).then(data => {
        this.userData = data
      })
    },
    //  搜索
    search() {
      this.params.pageNumber = 1
      this.getUsersList()
    },
    //  分页加载数据
    reLoadData(pageNum) {
      this.params.pageNumber = pageNum
      this.getUsersList()
    }
  }
}
</script>
<style lang="css" scoped>
.header {
  height: 40px;
  line-height: 40px;
  background-color: #363e54;
}

.main .header h2 {
  float: left;
  color: #fff;
  margin-left: 20px;
}

.main .header .header-search {
  position: relative;
  float: right;
  margin-right: 45px;
}
.icos {
  position: absolute;
  top: 8px;
  right: -25px;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
}

.s_rbac_list {
  margin: 20px auto;
}
</style>
