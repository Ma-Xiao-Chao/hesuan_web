<template>
  <el-container style="height: 100%">
    <el-header style="color: white">
      <span style="float: left; color: #303133; font-size: 20px; color: white">
        <i class="el-icon-s-custom" style="margin-right: 15px"></i>
        核酸检测登记查询系统
      </span>
      <span style="float: right; font-size: 12px">
        <el-dropdown>
          <i
            class="el-icon-setting"
            style="margin-right: 15px; color: white"
          ></i>
          <el-dropdown-menu slot="dropdown" >
            <span @click="logout()"><el-dropdown-item>退出登录</el-dropdown-item></span>
          </el-dropdown-menu>
        </el-dropdown>
        <span style="font-size: 16px">{{ username }}</span>
      </span>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu 
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1" id="s1"  @click="toindex()">
            <i class="el-icon-s-home"></i>
            <span slot="title">系统首页</span>
          </el-menu-item>
          <el-menu-item index="2" @click="jiance()">
            <i class="el-icon-s-order"></i>
            <span slot="title">检测结果</span>
          </el-menu-item>
          <el-menu-item index="3"  @click="shiguan()">
            <i class="el-icon-s-data"></i>
            <span slot="title">试管管理</span>
          </el-menu-item>
          <el-menu-item index="4" @click="renwu()">
            <i class="el-icon-s-claim"></i>
            <span slot="title">任务管理</span>
          </el-menu-item>
          <el-menu-item index="5" @click="renyuan()">
            <i class="el-icon-user-solid"></i>
            <span slot="title">人员管理</span>
          </el-menu-item>
          <el-menu-item index="6" @click="systemUser()">
            <i class="el-icon-user"></i>
            <span slot="title">系统用户</span>
          </el-menu-item>
          <el-menu-item index="7" @click="log()">
              <i class="el-icon-s-claim"></i>
              <span slot="title">系统日志</span>
            </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="height: 700px">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      tableData: Array(20).fill(item),
      username: "",
    };
  },
  methods: {
    toindex() {
      this.$router.push("/main/");
    },
    shiguan() {
      this.$router.push("/main/shiguan");
    },
    systemUser() {
      this.$router.push("/main/sysuser");
    },
    renwu() {
      this.$router.push("/main/renwu");
    },
    jiance() {
      this.$router.push("/main/jiance");
    },
    renyuan() {
      this.$router.push("/main/renyuan");
    },
    log() {
      this.$router.push("/main/log");
    },
    logout() {
      this.$axios
        .get("/mainLogout")
        .then((response) => {
          this.loginBtnLoading = false;
          if (response.data.code == 1) {
            localStorage.removeItem("systemuser")
            localStorage.removeItem("token")
            this.$message({
              showClose: true,
              message: "退出成功!",
              type: "success",
            });
            this.$router.push("/");
          } else {
            this.$message.error(response.data.msg);
            this.getCheckCode();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getusername() {
      var sys = localStorage.getItem("systemuser");
      sys = JSON.parse(sys);
      this.username = sys.username;
    },
  },
  created() {
    this.getusername();
  },
};
</script>
<style>
/* #s1 {
  display: none
} */
.el-header {
  background-color: #41555d;
  color: white;
  line-height: 60px;
}

.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 700px;
}

.el-menu {
  background-color: #41555d;
  color: white;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>

