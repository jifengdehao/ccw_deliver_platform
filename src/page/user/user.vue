/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：个人中心
*/
<template>
  <Card>
    <p slot="title">
      <Icon type="person"></Icon>&nbsp;&nbsp;个人信息
    </p>
    <Form ref="userForm" :model="userForm" :label-width="100" :rules="inforValidate" style="width: 500px;"
          id="userForm">
      <FormItem label="用户ID：" prop="psUserId">
        <Input v-model="userForm.psUserId" disabled></Input>
      </FormItem>
      <FormItem label="用户姓名：" prop="userName">
        <Input v-model="userForm.userName"></Input>
      </FormItem>
      <FormItem label="用户手机：" prop="mobileno">
        <Input v-model="userForm.mobileno"></Input>
      </FormItem>
      <FormItem label="邮箱：" prop="email" class="mb20">
        <Input v-model="userForm.email"></Input>
      </FormItem>
      <FormItem label="登录密码：">
        <Button type="primary" @click="showEditPassword">修改密码</Button>
      </FormItem>
      <FormItem>
        <Button type="ghost" class="mr10" @click="cancelEditUserInfor">取消</Button>
        <Button type="primary" @click="saveEdit">保存</Button>
      </FormItem>
    </Form>
    <Modal v-model="editPasswordModal" :width="500">
      <div slot="header">修改密码</div>
      <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right"
            :rules="passwordValidate">
        <FormItem label="原密码" prop="oldPass">
          <Input type="password" v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码"></Input>
        </FormItem>
        <FormItem label="新密码" prop="newPass">
          <Input type="password" v-model="editPasswordForm.newPass" placeholder="请输入新密码，至少6位字符"></Input>
        </FormItem>
        <FormItem label="确认新密码" prop="rePass">
          <Input type="password" v-model="editPasswordForm.rePass" placeholder="请再次输入新密码"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="cancelEditPass">取消</Button>
        <Button type="primary" @click="saveEditPass">保存</Button>
      </div>
    </Modal>
  </Card>
</template>

<script type="text/ecmascript-6">
  import * as api from '@/api/common'
  import hash from 'js-md5'

  export default {
    data() {
      const validePhone = (rule, value, callback) => {
        var re = /^1[0-9]{10}$/
        if (!re.test(value)) {
          callback(new Error('请输入正确格式的手机号'))
        } else {
          callback()
        }
      }
      const valideRePassword = (rule, value, callback) => {
        if (value !== this.editPasswordForm.newPass) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      }
      return {
        userForm: {
          psUserId: '',
          userName: '',
          mobileno: '',
          email: '',
          token: ''
        },
        editPasswordModal: false,
        editPasswordForm: {
          oldPass: '',
          newPass: '',
          rePass: ''
        },
        inforValidate: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          cellphone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {validator: validePhone}
          ],
          email: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
          ]
        },
        passwordValidate: {
          oldPass: [
            {required: true, message: '请输入原密码', trigger: 'blur'}
          ],
          newPass: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {min: 6, message: '请至少输入6个字符', trigger: 'blur'},
            {max: 32, message: '最多输入32个字符', trigger: 'blur'}
          ],
          rePass: [
            {required: true, message: '请再次输入新密码', trigger: 'blur'},
            {validator: valideRePassword, trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.init()
    },
    methods: {
      cancelEditUserInfor() {
        this.$router.back()
      },
      saveEdit() {
        // 修改个人信息后保存
        this.$refs.userForm.validate((valid) => {
          if (valid) {
            // this.userForm.token = JSON.parse(sessionStorage.getItem('userInfo')).token
            api.modifyUserInfo(this.userForm).then((res) => {
              if (res) {
                let userInfo = Object.assign(JSON.parse(sessionStorage.getItem('userInfo')), this.userForm)
                sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
                console.log(userInfo)
                this.$Notice.success({
                  title: '个人信息修改成功',
                  duration: 2
                })
              }
            })
          }
        })
      },
      showEditPassword() {
        this.editPasswordModal = true
      },
      cancelEditPass() {
        this.editPasswordModal = false
      },
      saveEditPass() {
        this.$refs.editPasswordForm.validate((valid) => {
          if (valid) {
            let params = {
              accountId: this.userForm.psUserId,
              newPassword: hash(this.editPasswordForm.newPass),
              oldPassword: hash(this.editPasswordForm.oldPass)
            }
            api.modifyPass(params).then((res) => {
              if (res) {
                // 重新登录
                this.editPasswordModal = false
                api.logout().then((res) => {
                  if (res) {
                    sessionStorage.removeItem('userInfo')
                    this.$router.push('/login')
                  }
                })
              } else {
                this.$Notice.error({
                  title: '密码修改失败',
                  duration: 2
                })
              }
            })
          }
        })
      },
      // 获取个人详细信息
      init() {
        this.userForm = JSON.parse(sessionStorage.getItem('userInfo'))
        console.log(this.userForm)
      }
    }
  }
</script>
