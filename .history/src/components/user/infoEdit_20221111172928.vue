<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow title="个人信息编辑" @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-field v-model="userInfo.tname" name="姓名" label="姓名" placeholder="请填写姓名" :rules="[{ required: true, message: '请填写姓名' }]" />
      <van-field name="radio" label="性别">
        <template #input>
          <van-radio-group v-model="userInfo.sex" direction="horizontal">
            <van-radio :name="1">男</van-radio>
            <van-radio :name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field v-model="userInfo.idcardnum" name="身份证号" label="身份证号" placeholder="请填写身份证号" :rules="[{ required: true, message: '请填写身份证号' }]" />
      <van-field v-model="userInfo.phonenum" name="手机号" label="手机号" placeholder="请填写手机号" :rules="[{ required: true, message: '请填写手机号' }]" />
      <van-field readonly clickable name="area" :value="userInfo.area" label="所属辖区" placeholder="点击选择省市区" :rules="[{ required: true, message: '请填写所属辖区' }]"
        @click="showArea = true" />
      <van-popup v-model="showArea" position="bottom">
        <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
      </van-popup>
      <van-field v-model="userInfo.address" name="详细地址" label="详细地址" placeholder="请填写详细地址" :rules="[{ required: true, message: '请填写详细地址' }]" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  import { areaList } from '@vant/area-data';
  import axios from "axios";
  import { Toast } from "vant";
  import { getUrlParam } from "@/components/js/GetUrlParam";
  export default {
    data() {
      return {
        userInfo: {
          address: '',
          sex: 1,
          phonenum: '',
          idcardnum: '',
          tname: '',
          area: '',
        },
        showArea: false,
        areaList
      };
    },
    created() {
      this.checkLogin();
    },
    name: "infoEdit",
    methods: {
      checkLogin() {
        axios.post(
          '/wechat/checklogin',
        ).then((response) => {
          if (response.data.flag) {
            //已登陆
            this.userInfo.idcardnum = getUrlParam("idcardnum")
            if (this.userInfo.idcardnum === '' || this.userInfo.idcardnum === null) {
              console.log("新增")
            } else {
              this.getUserInfo()
            }
          } else {
            Toast.fail(response.data.msg);
            this.$router.push("/user/info")
          }
        })
          .catch(function (error) {
            console.log(error);
          });
      },
      getUserInfo() {
        axios.post(
          '/wechat/userInfoViewAndEdit',
          this.qs.stringify({
            idcardnum: this.userInfo.idcardnum
          })
        ).then((response) => {
          if (response.data.flag) {
            this.userInfo = response.data.data[0];
            this.creatQrCode()
          } else {
            Toast.fail(response.data.msg);
            if (response.data.code === 408) {
              this.$router.push("/user/info")
            }
          }
        })
          .catch(function (error) {
            console.log(error);
          });
      },
      onClickLeft() {
        this.$router.go(-1);
      },
      onConfirm(values) {
        this.userInfo.area = values
          .filter((item) => !!item)
          .map((item) => item.name)
          .join('/');
        this.showArea = false;
      },
      onSubmit() {
        Toast.loading({
          message: '提交中...',
          forbidClick: true,
        });
       this.$axios.post(
          '/userInfo',
          {
            tname: this.userInfo.tname,
            idcardnum: this.userInfo.idcardnum,
            sex: this.userInfo.sex,
            phonenum: this.userInfo.phonenum,
            area: this.userInfo.area,
            address: this.userInfo.address
          }
        ).then((response) => {
          if (response.data.code==1) {
            Toast.success(response.data.data);
            this.$router.push("/user/info/view?idcardnum=" + this.userInfo.idcardnum)
          } else {
            Toast.fail("");
            if (response.data.code === 408) {
              this.$router.push("/user/info")
            }
          }
        })
          .catch(function (error) {
            Toast.fail("该用户yi");
          });
      },
    },
  }
</script>

<style scoped>

</style>