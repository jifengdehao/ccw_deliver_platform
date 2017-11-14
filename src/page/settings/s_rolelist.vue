/*
 * @Author: WuFengliang
 * @Date: 2017-11-06 14:18:46
 * DeveloperMailbox:   wufengliang@ccw163.com
 * FunctionPoint: 角色列表
 */
<template>
  <div id="s_rolelist" class="main" :class="{'isShow':show}">
    <!-- 头部 -->
    <div class="header">
      <h2>角色列表</h2>
      <div class="header-search">
        <Input placeholder="创建人姓名/修改人姓名" style="width: 200px" v-model="params.condition"></Input>
        <span @click="search"><Icon type="ios-search icos"></Icon></span>
      </div>
    </div>
    <div class="btn-box">
      <Button type="ghost" size="large" class="fr" @click="addRoleUser">新增</Button>
    </div>
    <Table v-if="roleData" border :columns="roleTitles" :data="roleData.records"></Table>
    <Page v-if="roleData" class="fr" style="margin:20px 0" :total="roleData.total" @on-change="reLoadData"></Page>
  </div>
</template>
<script>
import * as http from '@/api/common'
export default {
  name: 'roleList',
  data() {
    return {
      roleTitles: [
        {
          title: '角色名称',
          key: 'roleName'
        },
        {
          title: '创建人ID',
          key: 'creator'
        },
        {
          title: '创建人姓名',
          key: 'creatorName'
        },
        {
          title: '创建人角色',
          key: 'creatorRoleName'
        },
        {
          title: '创建时间',
          key: 'createdAt'
        },
        {
          title: '修改人ID',
          key: 'lastUpdatorId'
        },
        {
          title: '修改人姓名',
          key: 'lastUpdatorName'
        },
        {
          title: '修改人角色',
          key: 'lastUpdatorRoleName'
        },
        {
          title: '修改时间',
          key: 'lastUpdateTime'
        },
        {
          title: '权限内容',
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
                      this.$router.push({
                        path: 'roleinfo',
                        query: { creatorId: params.row.roleId }
                      })
                    }
                  }
                },
                '查看'
              )
            ])
          }
        }
      ],
      roleData: [],
      params: {
        pageSize: 10,
        pageNumber: 1,
        condition: ''
      }
    }
  },
  computed: {
    show() {
      return this.$store.state.show
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    //  获取角色列表
    getRoleList() {
      http.getRoleList(this.params).then(data => {
        console.log(data)
        this.roleData = data
      })
    },
    //  分页重新加载数据
    reLoadData(pageNum) {
      this.params.pageNumber = pageNum
      this.getRoleList()
    },
    //  搜索
    search() {
      this.params.pageNumber = 1
      this.getRoleList()
    },
    //  添加角色用户
    addRoleUser() {
      this.$router.push('/addrole')
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

.btn-box {
  width: 100%;
  line-height: 50px;
  overflow: hidden;
  margin: 10px auto;
}
</style>
