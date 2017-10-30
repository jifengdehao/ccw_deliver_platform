<template>
  <div id="login">
    <!-- <header class="L_head">菜城配送端后台</header>
                  <section class="L_image"><img src="" alt=""></section>
                  <section class="L_from">
                    <p>登录</p>
                   <Form id="from">
                     <div class="F_tel F_input">
                       <Icon type="person" class="F_icon"></Icon>
                       <input type="text" name="username" v-model="username"  placeholder="请输入手机号" :maxlength="maxlength"  required>
                     </div>
                     <div class="F_password F_input">
                       <Icon type="key" class="F_icon"></Icon>
                       <input type="password" name="password" placeholder="请输入密码" v-model="password" :maxlength="maxlength">
                     </div>
                     <div class="F_verification F_input" >
                       <Icon type="checkmark-circled" class=" F_icon"></Icon>
                       <input type="text" placeholder="请输入验证码" name="verification" v-model="verification">
                       <Button type="text" class="F_v_button" @click="setmessage()">{{tel_code}}</Button>
                     </div>
                     <Button class="F_button"   :loading="loading" @click="handleSubmit()">{{primary_text}}</Button>
                   </Form>
                  </section> -->
    <Form ref="formLogin" :model="formLogin" :rules="formLoginRules" class="card-box">
      <Form-item class="formLogin-title">
        <h3>菜城配送系统登录</h3>
      </Form-item>
      <Form-item prop="username">
        <i-input size="large" type="text" v-model="formLogin.username" placeholder="用户名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </i-input>
      </Form-item>
      <Form-item prop="password">
        <i-input size="large" type="password" v-model="formLogin.password" placeholder="密码">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </i-input>
      </Form-item>
      <Form-item prop="code">
        <Row>
          <Col span="17">
          <Input size="large" type="text" v-model="formLogin.code" placeholder="验证码">
          <Icon type="ios-pulse" slot="prepend"></Icon>
          </Input>
          </Col>
          <Col span="6" offset="1" @click="putCode">
          <img src="https://api.it120.cc/jifengdehao/verification/pic/get" style="width: 100%;height: 35px;">
          </Col>
        </Row>
      </Form-item>
      <Form-item class="login-no-bottom">
        <Checkbox-group v-model="formLogin.remember">
          <Checkbox label="记住密码" name="remember"></Checkbox>
        </Checkbox-group>
      </Form-item>
      <Form-item class="login-no-bottom">
        <Row type="flex">
          <i-col :xs="{ span: 4, offset: 6}">
            <i-button type="primary" @click="handleSubmit('formLogin')">登录</i-button>
          </i-col>
          <i-col :xs="{ span: 4, offset: 4 }">
            <i-button type="primary" @click="formLoginReset('formLogin')">重置</i-button>
          </i-col>
        </Row>
      </Form-item>
    </Form>
  </div>
</template>
<script  type="text/ecmascript-6">
export default {
  name: 'login',
  data() {
    return {
      formLogin: {
        username: '',
        password: '',
        code: '',
        remember: []
      },
      formLoginRules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请填写验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          sessionStorage.setItem('user', JSON.stringify(this.formLogin))
          console.log(this.formLogin)
          this.$Message.success('提交成功!')
          this.$router.push({ path: '/' })
        } else {
          this.$Message.error('表单验证失败!')
        }
        if (this.formLogin.remember[0] === '记住密码') {
          sessionStorage.setItem('username', JSON.stringify(this.formLogin.username))
          sessionStorage.setItem('password', JSON.stringify(this.formLogin.password))
        } else {
          sessionStorage.removeItem('username')
          sessionStorage.removeItem('password')
        }
      })
    },
    // 重置
    formLoginReset(name) {
      this.$refs[name].resetFields()
    },
    // 请求code 验证码
    putCode() { }
  },
  mounted() {
    if (sessionStorage.getItem('username')) {
      this.formLogin.username = JSON.parse(sessionStorage.getItem('username'))
    }
    if (sessionStorage.getItem('password')) {
      this.formLogin.password = JSON.parse(sessionStorage.getItem('password'))
    }
  }
}
//   import {setCookie,getCookie} from '../../assets/cookie.js'
//   export default {
// //    页面挂在的时候获取cookie，如果存在username的cookie页面跳转到主页
//     mounted(){
//       if(sessionStorage.length!=0){
//         console.log(sessionStorage);
//         this.$router.push('/home')
//       }
//     },
//     data () {
//       return {
//         verification:"",
//           password:'',
//           username:'',
//         maxlength:11,
//         tel_code:'发送验证码',
//         primary_text:'确认登录',
//         loading:false
//       }
//     },
//     methods: {
//       handleSubmit() {
//         if(this.username == ''||this.password == ''){
//           alert('请输入用户名或密码')
//         }else {
//           let data = {'username':this.username,'password':this.password};
//           console.log(data);
//           sessionStorage.userinfo = JSON.stringify(data)
//               this.$store.commit("showusermane");
//           this.$router.push('/');
//         }
// //        this.$router.push('/'+ 'home');
//       }
//     }
//   }
</script>
<style lang="less" scoped>
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

// #login{
//   text-align: center;
//   .L_head{
//     width: 100%;
//     height: 45px;
//     line-height: 45px;
//     background-color: #ddd;
//     border-bottom: 1px solid #aaa;
//     box-sizing: border-box;
//     font-size: 18px;
//   }
//   .L_image{
//     width: 256px;
//     height: 170px;
//     margin: 95px  auto;
//     background-color: #bbb;
//     box-sizing: border-box;
//   }
//   .L_from{
//     width: 340px;
//     height: 250px;
//     margin: 110px  auto;
//     border: 1px solid #000;
//     box-sizing: border-box;
//     padding: 10px;
//     p{
//       font-size: 16px;
//       font-weight: 700;
//     }
//     #from{
//       position: relative;
//       margin-top: 10px;
//       .F_input{
//         position: relative;
//         width:100%;
//         margin-bottom: 2px;
//         .F_icon{
//           font-size: 20px;
//           width: 40px;
//           height: 40px;
//           line-height: 40px;
//           position: absolute;
//           left: 0;
//         }
//         input{
//           width: 100%;
//           height: 40px;
//           line-height: 40px;
//           padding-left:  40px;
//           border-bottom: 1px solid #999;
//           box-sizing: border-box;
//         }
//       }
//       .F_verification{
//         padding-right: 70px;
//         .F_v_button{
//           width: 70px;
//           height: 40px;
//           padding:0;
//           position: absolute;
//           right: 0;
//           top: 0;
//         }
//       }
//       .F_button{
//         position: absolute;
//         left: 60px;
//         background-color: #76C5DE;
//         color: #fff;
//         width: 200px;
//         height: 40px;
//         margin-top: 15px;
//         border-radius: 3px;
//       }
//     }
//   }
// }
</style>
