<template>
        <div>
          <van-nav-bar title="用户登录" />
          <van-form @submit="onSubmit">
            <van-field v-model="idcardnum" name="身份证号" label="身份证号" placeholder="用户名" :rules="[{ required: true, message: '请填写身份证号码' }]" />
            <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
            <div style="margin: 16px;">
              <van-button round block type="info" native-type="submit">登录</van-button>
              <van-button round block type="info" @click="routerRegister()" style="margin-top:10px">注册</van-button>
            </div>
          </van-form>
        </div>
      </template>
      
      <script>
        import { Toast } from "vant";
        export default {
          name: "login",
          data() {
            return {
              idcardnum: '',
              password: ''
            }
          },
          created() {
            this.checkLogin();
          },
          methods: {
            checkLogin() {
              this.axios.post(
                '/operator/checklogin'
              ).then((response) => {
                if (response.data.flag) {
                  Toast.success(response.data.msg);
                  this.$router.push("/user/index")
                }
              }).catch(function (error) {
                console.log(error);
              });
            },
            onSubmit() {
              this.$axios.post(
                '/user/login',
                {
                  idcardnum: this.idcardnum,
                  password: this.password
                }
              ).then((response) => {
                if (response.data.code==1) {
                    localStorage.setItem("username",response.data.data);
                  Toast.success("登录成功");
                  this.$router.push("/user/index")
                } else {
                  Toast.fail(response.data.data)
                }
              }).catch(function (error) {
                console.log(error);
              });
            },
            routerRegister(){
                this.$router.push("/user/register")
            }
          }
        }
      </script>
      
      <style scoped>
      
      </style>