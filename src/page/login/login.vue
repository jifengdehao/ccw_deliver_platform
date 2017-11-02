<template>
  <div id="login">
    <Form ref="formLogin" :model="formLogin" :rules="formLoginRules" class="card-box">
      <Form-item class="formLogin-title">
        <h3>菜城配送系统登录</h3>
      </Form-item>
      <Form-item prop="mobileno">
        <Input size="large" type="text" v-model="formLogin.mobileno" placeholder="手机号">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </Form-item>
      <Form-item prop="password">
        <Input size="large" type="password" v-model="formLogin.password" placeholder="密码">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </Form-item>
      <Form-item prop="code">
        <Row>
          <Col span="15">
          <Input size="large" type="text" v-model="formLogin.code" placeholder="验证码">
          <Icon type="ios-pulse" slot="prepend"></Icon>
          </Input>
          </Col>
          <Col span="8" offset="1" @click="putCode" class="textRight">
          <!--<img src="https://api.it120.cc/jifengdehao/verification/pic/get" style="width: 100%;height: 35px;">-->
          <Button size="large" @click="putCode" :disabled="btnDisable">{{codeName}}</Button>
          </Col>
        </Row>
      </Form-item>
      <Form-item class="login-no-bottom">
        <Checkbox v-model="remember">记住密码</Checkbox>
      </Form-item>
      <Form-item class="login-no-bottom">
        <Row type="flex">
          <Col :xs="{ span: 4, offset: 6}">
          <Button type="primary" @click="handleSubmit('formLogin')">登录</Button>
          </Col>
          <Col :xs="{ span: 4, offset: 4 }">
          <Button type="primary" @click="formLoginReset('formLogin')">重置</Button>
          </Col>
        </Row>
      </Form-item>
    </Form>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from '@/api/common'
  import * as cookie from '@/data/index'

  let countdown = 60
  export default {
    name: 'login',
    data() {
      return {
        codeName: '获取验证码',
        btnDisable: false,
        remember: false,
        formLogin: {
          mobileno: '',
          password: '',
          code: ''
        },
        formLoginRules: {
          mobileno: [
            {required: true, message: '请填写手机号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请填写验证码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      // 登录
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.login(this.formLogin)
          } else {
            this.$Message.error('表单验证失败!')
          }
          if (this.remember) {
            sessionStorage.setItem('user', JSON.stringify(this.formLogin))
          }
        })
      },
      // 重置
      formLoginReset(name) {
        this.$refs[name].resetFields()
      },
      // 请求code 验证码
      putCode() {
        if (this.formLogin.mobileno) {
          let params = {
            mobileno: this.formLogin.mobileno
          }
          api.getCode(params).then((res) => {
            if (res) {
              this.$Message.success('验证码已发送,请注意查收～')
              let timer = setInterval(() => {
                countdown--
                this.codeName = countdown + 's重新获取'
                this.btnDisable = true
                if (countdown === 0) {
                  this.btnDisable = false
                  this.codeName = '获取验证码'
                  countdown = 60
                  clearInterval(timer)
                }
              }, 1000)
            }
          })
        } else {
          this.$Message.warning('请输入手机号,不能为空～')
        }
      },
      // 登录
      login(params) {
        api.login(params).then((res) => {
          console.log(res)
          if (res) {
            cookie.setData('userInfo', JSON.stringify(res))
            this.$router.push('/')
          }
        })
      }
    },
    mounted() {
      if (sessionStorage.getItem('user')) {
        this.formLogin.password = JSON.parse(sessionStorage.getItem('user')).password
        this.formLogin.mobileno = JSON.parse(sessionStorage.getItem('user')).mobileno
      }
    }
  }
</script>
<style lang="less" scoped type="text/less">
  #login {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eeeeee;

    .card-box {
      padding: 20px;
      width: 400px;
      border-radius: 5px;
      box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
      background-color: #F9FAFC;

      .formLogin-title {
        text-align: center;
      }

      .login-no-bottom {
        margin-bottom: 10px;
      }
    }
  }
</style>
