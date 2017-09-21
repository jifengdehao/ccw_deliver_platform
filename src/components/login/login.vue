<template>
  <div id="login">
    <header class="L_head">菜城配送端后台</header>
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
    </section>
  </div>
</template>
<script>
  import {setCookie,getCookie} from '../../assets/cookie.js'
  export default {
//    页面挂在的时候获取cookie，如果存在username的cookie页面跳转到主页
    mounted(){
      if(sessionStorage.length!=0){
        console.log(sessionStorage);
        this.$router.push('/home')
      }
    },
    data () {
      return {
        verification:"",
          password:'',
          username:'',
        maxlength:11,
        tel_code:'发送验证码',
        primary_text:'确认登录',
        loading:false
      }
    },
    methods: {
      handleSubmit() {
        if(this.username == ''||this.password == ''){
          alert('请输入用户名或密码')
        }else {
          let data = {'username':this.username,'password':this.password};
          console.log(data);
          sessionStorage.userinfo = JSON.stringify(data)
              this.$store.commit("showusermane");
          this.$router.push('/');
        }
//        this.$router.push('/'+ 'home');
      }
    }
  }
</script>
<style lang="less" scoped>
  #login{
    text-align: center;
    .L_head{
      width: 100%;
      height: 45px;
      line-height: 45px;
      background-color: #ddd;
      border-bottom: 1px solid #aaa;
      box-sizing: border-box;
      font-size: 18px;
    }
    .L_image{
      width: 256px;
      height: 170px;
      margin: 95px  auto;
      background-color: #bbb;
      box-sizing: border-box;
    }
    .L_from{
      width: 340px;
      height: 250px;
      margin: 110px  auto;
      border: 1px solid #000;
      box-sizing: border-box;
      padding: 10px;
      p{
        font-size: 16px;
        font-weight: 700;
      }
      #from{
        position: relative;
        margin-top: 10px;
        .F_input{
          position: relative;
          width:100%;

          margin-bottom: 2px;
          .F_icon{
            font-size: 20px;
            width: 40px;
            height: 40px;
            line-height: 40px;
            position: absolute;
            left: 0;
          }
          input{
            width: 100%;
            height: 40px;
            line-height: 40px;
            padding-left:  40px;
            border-bottom: 1px solid #999;
            box-sizing: border-box;
          }
        }
        .F_verification{
          padding-right: 70px;
          .F_v_button{
            width: 70px;
            height: 40px;
            padding:0;
            position: absolute;
            right: 0;
            top: 0;
          }
        }
        .F_button{
          position: absolute;
          left: 60px;
          background-color: #76C5DE;
          color: #fff;
          width: 200px;
          height: 40px;
          margin-top: 15px;
          border-radius: 3px;
        }
      }
    }
  }

</style>
