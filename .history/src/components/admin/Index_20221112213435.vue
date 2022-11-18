<template>
  <div class="main">
    <el-row class="row" :gutter="15">
      <el-col :span="6">
        <el-card shadow="hover" style="height: 100px">
          <div class="user-info">
            <div class="user-info-cont">
              <div class="user-info-name">欢迎你，{{ name }}。</div>
              <div>
                {{ rolestr }} 上次登录时间： <span>{{ lastlogintime }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="grid-content grid-con-1">
            <i class="el-icon-s-order grid-con-icon"></i>
            <div class="grid-cont-right">
              <div class="grid-num">{{ tubeCount }}</div>
              <div>已采集试管</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="grid-content grid-con-1">
            <i class="el-icon-search grid-con-icon"></i>
            <div class="grid-cont-right">
              <div class="grid-num">{{ tubeCount12 }}</div>
              <div>已检测试管</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="grid-content grid-con-2">
            <i class="el-icon-success grid-con-icon"></i>
            <div class="grid-cont-right">
              <div class="grid-num">{{ tubeCount1 }}</div>
              <div>阴性试管</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="row" :gutter="15" v-if="this.role === 0">
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="grid-content grid-con-1">
            <i class="el-icon-s-custom grid-con-icon"></i>
            <div class="grid-cont-right">
              <div class="grid-num">{{ userInfoCount }}</div>
              <div>已登记人数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="grid-content grid-con-1">
            <i class="el-icon-s-order grid-con-icon"></i>
            <div class="grid-cont-right">
              <div class="grid-num">{{ tubeUserCount }}</div>
              <div>已采集人次</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="grid-content grid-con-1">
            <i class="el-icon-search grid-con-icon"></i>
            <div class="grid-cont-right">
              <div class="grid-num">{{ tubeUserCount12 }}</div>
              <div>已检测人次</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="grid-content grid-con-2">
            <i class="el-icon-success grid-con-icon"></i>
            <div class="grid-cont-right">
              <div class="grid-num">{{ tubeUserCount1 }}</div>
              <div>阴性人次</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div id="main" style="width:100%"></div>
  </div>
</template>

<script>
export default {
  name: "dashboard",
  data() {
    return {
      userInfoCount: 0, //已登记人数

      tubeUserCount: 0, //已采集人次
      tubeUserCount12: 0, //已检测人次
      tubeUserCount1: 0, //阴性人次

      tubeCount: 0, //已采集试管
      tubeCount12: 0, //已检测试管
      tubeCount1: 0, //阴性试管

      //一个方法
      name: "",
      lastlogintime: "",
      role: 0,
      rolestr: "",
    };
  },
  created() {
    this.getTubeCount();
    this.getTubeUserCount();
    this.getUserInfoCount();
    this.checkLogin();

  },
  methods: {
    getUserInfoCount() {
      this.$axios
        .get("/getUserInfoCount")
        .then((response) => {
          if (response.data.code == 1) {
            this.userInfoCount = response.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getTubeUserCount() {
      this.$axios
        .get("/getTubeUserCount")
        .then((response) => {
          if (response.data.code == 1) {
            this.tubeUserCount = response.data.data.tubeUserCount;
            this.tubeUserCount12 = response.data.data.tubeUserCount12;
            this.tubeUserCount1 = response.data.data.tubeUserCount1;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getTubeCount() {
      this.$axios
        .get("/getTubeCount")
        .then((response) => {
          if (response.data.code == 1) {
            this.tubeCount = response.data.data.tubeCount;
            this.tubeCount12 = response.data.data.tubeCount12;
            this.tubeCount1 = response.data.data.tubeCount1;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    checkLogin() {
      var sys = localStorage.getItem("systemuser");
      sys = JSON.parse(sys);
      if (sys != null) {
        this.name = sys.username
        this.lastlogintime = sys.lastlogintime;
        this.role = Number(sys.role);
        switch (this.role) {
          case 0:
            this.rolestr = "超级管理员";
            break;
          case 1:
            this.rolestr = "单位账号";
            break;
        }
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style>
.row {
  margin-bottom: 20px;
}
.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}
.user-info-cont {
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 24px;
  color: #222;
}

.user-info-list span {
  margin-left: 70px;
}
.schart {
  width: 100%;
  height: 300px;
}
</style>