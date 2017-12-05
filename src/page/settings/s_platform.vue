/*
 * @Author: WuFengliang
 * @Date: 2017-11-03 15:33:21
 * DeveloperMailbox:   wufengliang@ccw163.com
 * FunctionPoint: 平台用户
 */
<template>
  <div id="s_platform" class="main">
    <!-- 头部 -->
    <div class="header">
      <h2>平台用户</h2>
      <div class="header-search">
        <Input placeholder="姓名/联系方式/用户ID" style="width: 200px" v-model="condition"  @keyup.native.enter="search" @keyup.native="checkLen"></Input>
        <Icon v-if="closeBool" style="position:absolute;top:15px;right:5px;" type="close-circled" @click.native="clearValue"></Icon>
        <span @click="search"><Icon type="ios-search icos"></Icon></span>
      </div>
    </div>
    <div class="btn-box">
      <Button type="ghost" size="large" class="fr" @click="addpersonal">新增</Button>
    </div>
    <Table v-if="userData" border :columns="UserListTitles" :data="userData.records"></Table>
    <Page v-if="userData" class="fr" style="margin:20px 0" :total="userData.total" @on-change="reLoadData"></Page>
    <Modal
        v-model="isDelBoolean"
        title="提示"
        @on-ok="deleteUser">
        <p style="text-align:center;">是否确认删除此用户?</p>
    </Modal>
  </div>
</template>
<script>
import * as http from '@/api/common'
export default {
  name: 'usersList',
  data() {
    return {
      isDelBoolean: false, //  对话框状态
      singleData: null, //  单个用户数据集合
      condition: '',
      params: {
        pageSize: 10,
        pageNumber: 1,
        condition: ''
      },
      closeBool: false, //  X箭头
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
          title: '角色名称',
          key: 'roleName'
        },
        {
          title: '所属区域',
          key: 'areaName'
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
                      this.$router.push(
                        `/s_platform/userinfo/${params.row.psUserId}`
                      )
                    }
                  }
                },
                '查看'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.isDelBoolean = true
                      this.singleData = params.row
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      userData: null //  平台用户数据
    }
  },
  created() {
    this.getUsersList()
  },
  computed: {},
  methods: {
    //  获取用户列表数据
    getUsersList() {
      http.getUsersList(this.params).then(data => {
        this.userData = data
      })
    },
    //  删除用户
    deleteUser() {
      http.deleteUser(this.singleData).then(data => {
        this.$Modal.success({
          title: '提示',
          content: '删除成功'
        })
        this.getUsersList()
      })
    },
    //  分页页面跳转
    reLoadData(pageNum) {
      this.params.pageNumber = pageNum
      this.getUsersList()
    },
    //  搜索
    search() {
      this.closeBool = this.condition.length > 0 ? true : false
      this.params.condition = this.condition
      this.params.pageNumber = 1
      this.getUsersList()
    },
    //  清空值
    clearValue() {
      this.condition = ''
      this.closeBool = false
    },
    //  键盘事件
    checkLen() {
      this.closeBool = this.condition.length > 0 ? true : false
    },
    //  添加用户
    addpersonal() {
      this.$router.push('/s_platform/adduser')
    },
    touserinfo(index) {
      this.$router.push('/userinfo')
    },
    remove(index) {
      this.$Modal.info({
        title: '提醒',
        cancel: 'cancel',
        content: `是否删除 :${this.data6[index].name} @on-ok="ok"
              @on-cancel="cancel"`
      })
      this.data6.splice(index, 1)
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
