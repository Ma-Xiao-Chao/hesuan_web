<template>
        <div>
          <van-nav-bar title="用户注册" />
          <van-form @submit="onSubmit">
            <van-field v-model="idcardnum" name="身份证号" label="身份证号" placeholder="用户名" :rules="[{ required: true, message: '请填写身份证号码' }]"/>
            <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"  :rules="[{ required: true, message: '请填写密码' }]"/>
            <van-field v-model="password2" type="password" name="确认密码" label="确认密码" placeholder="确认密码" :rules="[{ required: true, message: '请确认密码' }]" />

            <div style="margin: 16px;">
              <van-button round block type="info" native-type="submit">确认注册</van-button>
              <van-button round block type="info" @click="routerlogin()" style="margin-top:10px">去登录</van-button>
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
              password: '',
              password2: ''
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
                '/user/register',
                {
                  idcardnum: this.idcardnum,
                  password: this.password
                }
              ).then((response) => {
                if (response.data.code==1) {
                  Toast.success(response.data.data);
                } else {
                  Toast.fail(response.data.data)
                }
              }).catch(function (error) {
                console.log(error);
              });
            },
            routerlogin(){
                this.$router.push("/user")
            }
          }
        }
      </script>
      
      <style scoped>
      
      </style>