<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-user-solid"></i> 系统用户
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addUser"
          class="mr10"
          >添加用户</el-button
        >
        <el-select
          v-model="query.groupid"
          :disabled="groupdisable"
          clearable
          placeholder="所属单位"
          class="handle-select mr10"
        >
          <el-option
            v-for="(item, index) in groups"
            :key="index"
            :label="item.username"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select
          v-model="query.role"
          clearable
          placeholder="用户类型"
          @change="onRoleChange"
          class="handle-select mr10"
        >
          <el-option key="1" label="单位账号" value="1"></el-option>
          <el-option key="2" label="采集人员" value="2"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="getData"
          >搜索</el-button
        >
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        style="width: 1474px; height: 527px; overflow: auto"
        height="527"
      >
        <el-table-column
          prop="id"
          label="用户编号"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column label="用户类型">
          <template slot-scope="scope">
            <span v-if="scope.row.role === 0">超级管理员</span>
            <span v-if="scope.row.role === 1">单位账号</span>
            <span v-if="scope.row.role === 2">采集人员</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="lastlogintime"
          label="最后登录时间"
        ></el-table-column>
        <el-table-column prop="group" label="所属单位"></el-table-column>
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="scope">
            <el-button
              size="small"
              v-if="scope.row.role !== 0"
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              v-if="scope.row.role !== 0"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[8, 20, 50, 100]"
          :page-size="5"
          background
          layout="total, sizes, prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
    <!-- 编辑弹出框 -->
    <el-dialog :title="dialogTitle" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="用户编号">
          <el-input
            readonly
            v-model="form.id"
            placeholder="无需填写"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <el-form-item label="用户类型">
          <el-select
            v-model="form.role"
            :disabled="selectDisable1"
            @change="roleChange"
            placeholder="用户类型"
            class="handle-select mr10"
          >
            <el-option key="2" label="单位账号" :value="1"></el-option>
            <el-option key="3" label="采集人员" :value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属单位">
          <el-select
            v-model="form.groupid"
            :disabled="selectDisable2"
            placeholder="所属单位"
            class="handle-select mr10"
          >
            <el-option
              v-for="(item, index) in groups"
              :key="index"
              :label="item.username"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="密码">
          <el-input
            v-model="form.password"
            type="password"
            :placeholder="dialogPassword"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ordertable",
  data() {
    return {
      myuserinfo: [],
      tableData: [],
      pageSize: 8,
      currentPage: 1,
      total: 50,
      //当前登录用户
      user: null,
      //编辑框内容
      form: [],
      //下拉框状态
      selectDisable1: false,
      selectDisable2: false,
      //单位
      groups: [],

      editVisible: false,
      dialogTitle: "编辑",
      dialogPassword: "若无需修改密码，请留空",
      query: {
        groupid: null,
        role: null,
      },

      groupdisable: true,
    };
  },
  created() {
    this.getData();
    this.getall();
    // this.checkLogin();
  },
  methods: {
    //用户类型
    roleChange() {
      // if (this.user.role === 0) {
      if (true) {
        if (this.form.role === 1) {
          this.selectDisable2 = true;
          this.form.groupid = null;
        } else {
          this.selectDisable2 = false;
        }
      }
    },
    checkLogin() {
      axios
        .post("/checklogin")
        .then((response) => {
          if (response.data.flag) {
            this.user = response.data.data;
          } else {
            //
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //确认提交
    saveEdit() {
      console.log(
        "id:" + this.form.id,
        "username:" + this.form.username,
        "password:" + this.form.password,
        "role:" + this.form.role,
        "groupid:" + this.form.groupid
      );

      // this.axios
      //   .post(
      //     "/admin/addOrUpdateSystemUser",
      //     this.qs.stringify({
      //       id: this.form.id,
      //       username: this.form.username,
      //       password: this.form.password,
      //       role: this.form.role,
      //       groupid: this.form.groupid,
      //     })
      //   )
      //   .then((response) => {
      //     this.getData();
      //     this.getGroupData();
      //     this.editVisible = false;

      //     if (response.data.flag) {
      //       this.$message.success(response.data.msg);
      //     } else {
      //       this.$message.error(response.data.msg);
      //     }
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    },
    //添加用户
    addUser() {
      // this.form = [];
      // if (this.user.role == 0) {
      //------------------------------改
      if (true) {
        this.selectDisable1 = false;
        this.selectDisable2 = false;

        // this.form.groupid = this.user.id;
        // this.form.role = 2;
        this.form.groupid = 0;
        this.form.role = 2;
      } else {
        this.selectDisable1 = false;
        this.selectDisable2 = false;
      }
      this.dialogPassword = "请输入密码";
      this.dialogTitle = "添加用户";
      this.editVisible = true;
    },
    //取消
    cancel() {
      this.editVisible = false;
      // this.getData();
      // this.getall();
    },
    handleEdit(row) {
      this.selectDisable1 = true;
      this.selectDisable2 = true;
      this.dialogPassword = "若无需修改密码，请留空";
      this.dialogTitle = "编辑用户";
      this.form = row;
      this.form.password = "";
      this.editVisible = true;
    },
    //删除
    handleDelete(row) {
      // 二次确认删除
      if (row.id == 1) {
        this.$message({
          showClose: true,
          message: "管理员不可被删除",
          type: "warning",
        });
        return;
      }
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          this.$axios
            .delete("/delSystemUser?id=" + row.id)
            .then((response) => {
              if (response.data.data) {
                this.$message({
                  showClose: true,
                  message: "删除成功!",
                  type: "success",
                });
                this.getData();
                this.getall();
              } else {
                this.$message({
                  showClose: true,
                  message: "删除失败,请重试!",
                  type: "error",
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(() => {});
    },
    onRoleChange() {
      if (this.query.role == 2) {
        this.groupdisable = false;
      } else {
        this.groupdisable = true;
        this.query.groupid = null;
      }
    },
    // getGroupData() {
    //   this.axios
    //     .post("/admin/getGroup")
    //     .then((response) => {
    //       if (response.data.flag) {
    //         this.groups = response.data.data;
    //       } else {
    //         //
    //       }
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // },
    getData() {
      // alert("getData");
      this.$axios
        .get(
          "/getAllSystemusers?cuurentPage=" +
            this.currentPage +
            "&pageSize=" +
            this.pageSize
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.code == 1) {
            for (var i = 0; i < res.data.data.systemuser.length; i++) {
              if (
                res.data.data.systemuser[i].role == 2 &&
                res.data.data.systemuser[i].groupid != null
              ) {
                for (var x = 0; x < res.data.data.systemuser.length; x++) {
                  if (
                    res.data.data.systemuser[i].groupid ==
                    res.data.data.systemuser[x].id
                  ) {
                    res.data.data.systemuser[i].group =
                      res.data.data.systemuser[x].username;
                  }
                }
              }
            }
            this.tableData = res.data.data.systemuser;
            this.total = res.data.data.pageinfo.total;
          } else {
            this.$message({
              showClose: true,
              message: "页面加载失败..",
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getall() {
      // alert("getall")
      this.$axios
        .get("/getAllsysUsers")
        .then((res) => {
          if (res.data.code == 1) {
            for (var i = 0; i < res.data.data.length; i++) {
              if (
                res.data.data[i].role == 2 &&
                res.data.data[i].groupid != null
              ) {
                for (var x = 0; x < res.data.data.length; x++) {
                  if (res.data.data[i].groupid == res.data.data[x].id) {
                    res.data.data[i].group = res.data.data[x].username;
                  }
                }
              }
            }
            this.myuserinfo = res.data.data;
            this.getGroupData();

          } else {
            this.$message({
              showClose: true,
              message: "页面加载失败..",
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 分页导航
    //换每页多少个
    handleSizeChange(val) {
      this.pageSize = val;
      // alert("总"+this.total)
      // alert("当前页"+this.currentPage)
      var startNum = (this.currentPage - 1) * this.pageSize;
      var endNum = startNum + this.pageSize;
      this.tableData = this.myuserinfo.slice(startNum, endNum);
    },
    //切换页面
    handleCurrentChange(val) {
      this.currentPage = val;
      // alert("当前页"+this.currentPage)
      // 0   5  10
      var startNum = (this.currentPage - 1) * this.pageSize;
      var endNum = startNum + this.pageSize;
      this.tableData = this.myuserinfo.slice(startNum, endNum);
    },
    //getgroups
    getGroupData() {
      for (var i = 0; i < this.myuserinfo.length; i++) {
        if (this.myuserinfo[i].role == 1) {
          var temp = {};
          var ind=0
          temp.id = this.myuserinfo[i].id;
          temp.username = this.myuserinfo[i].username;
          temp.index=ind
          this.groups.push(temp);
          ind++
        }
      }
    },
  },
};
</script>

<style>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 180px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>