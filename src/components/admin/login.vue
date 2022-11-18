<template>
  <div class="out">
    <div class="demo-image__placeholder">
      <div class="block">
        <el-image :src="src">
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
      </div>
    </div>
  <div class="login-wrap out">
    <div class="ms-login" style="  margin-left: 200px;">
      <div class="ms-title">核酸检测登记查询系统</div>
      <el-form
        :model="param"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content"
      >
        <el-form-item prop="username">
          <el-input
            size="medium"
            v-model="param.username"
            placeholder="请输入用户名"
            @keyup.enter.native="submitForm()"
          >
            <el-button slot="prepend" icon="el-icon-user"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            size="medium"
            type="password"
            placeholder="请输入密码"
            v-model="param.password"
            @keyup.enter.native="submitForm()"
          >
            <el-button slot="prepend" icon="el-icon-lock"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkcode">
          <el-input
            class="login-code-input"
            size="medium"
            v-model="param.checkcode"
            placeholder="请输入验证码"
            @keyup.enter.native="submitForm()"
          >
            <el-button slot="prepend" icon="el-icon-circle-check"></el-button>
          </el-input>
          <img
            ref="checkCodeRef"
            @click="getCheckCode()"
            class="login-code-img"
            :src="serverUrl + '/CheckCode'"
            alt=""
          />
        </el-form-item>
        <div class="login-btn">
          <el-button
            type="primary"
            @click="submitForm()"
            :loading.sync="loginBtnLoading"
            >{{ loginBtnLoading ? "登录中" : "登录" }}</el-button
          >
        </div>
        <p class="login-tips"></p>
      </el-form>
    </div>
  </div>
</div>

</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      param: {
        username: "",
        password: "",
        checkcode: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkcode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
      loginBtnLoading: false,
      serverUrl: axios.defaults.baseURL,
      src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp0.itc.cn%2Fq_70%2Fimages03%2F20210811%2F4bbb62541e5e455da69e54d48b00e4f6.png&refer=http%3A%2F%2Fp0.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1670753288&t=7c40b609105aee549404f45825e6613b"
    };
  },
  methods: {
    checkLogin() {
      this.$axios
        .post("/checklogin")
        .then((response) => {
          if (response.data.code == 1) {
            this.$message({
              showClose: true,
              message: "已经登录!",
              type: "success",
            })
              this.$router.push("/main");
          } else {
            //
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submitForm() {
      this.$refs.login.validate((valid) => {
        if (valid) {
          this.loginBtnLoading = true;
          this.$axios
            .post("/login", {
              username: this.param.username,
              password: this.$md5(this.param.password),
              checkcode: this.param.checkcode,
            })
            .then((response) => {
              this.loginBtnLoading = false;
              if (response.data.code == 1) {
                //设置token
                localStorage.setItem("token",response.data.data.token);
                localStorage.setItem(
                  "systemuser",
                  JSON.stringify(response.data.data.systemuser)
                );
                this.$message({
                  showClose: true,
                  message: "登录成功!",
                  type: "success",
                });
                this.$router.push("/main");
              } else {
                this.$message.error(response.data.msg);
                this.getCheckCode();
              }
            })
            .catch(function (error) {
              this.loginBtnLoading = false;
              console.log(error);
            });
        } else {
          this.$message.error("请填写完整");
          return false;
        }
      });
    },
    getCheckCode() {
      this.$refs.checkCodeRef.src =
        this.$axios.defaults.baseURL +
        "/CheckCode" +
        "?time=" +
        new Date().getTime();
    },
  },
  created() {
    this.checkLogin();
    this.getCheckCode();
  },
};
</script>

<style>
.out{
  float: left;
}
.login-wrap /deep/ {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #242f42;
  background-size: 100%;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 40px;
  color: rgb(0, 0, 0);
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 450px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  overflow: hidden;
}

.ms-content {
  padding: 30px 30px;
}

.login-code-input {
  width: 60%;
  float: left;
}

.login-code-img {
  margin-left: 5%;
  height: 35px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 35px;
  margin-bottom: 10px;
}

.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>