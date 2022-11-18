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
    <el-row style="margin-top: 40px">
      <el-col :span="12">
        <div style="width: 500px; margin: 0 auto; padding: 20px; box-shadow: 0 5px 15px -5px rgba(0,0,0,.5); border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 20px; font-size: 24px">
            <b>全国疫情实时数据</b>
          </div>
          <div style="display: flex; flex-wrap:wrap; justify-content: flex-start;">
            <div class="item" style="background-color: lightblue">
              <div class="item_title">境外输入</div>
              <div class="item_num" style="color: RoyalBlue">{{ total.input ? total.input : '未更新' }}</div>
              <div class="item_num item_num_plus">较昨日 <span style="color: RoyalBlue">+{{ today.input }}</span></div>
            </div>
            <div class="item" style="background-color: aliceblue">
              <div class="item_title">无症状感染者</div>
              <div class="item_num" style="color: LightCoral">{{ extData.noSymptom ? extData.noSymptom : '未更新' }}</div>
              <div class="item_num item_num_plus">较昨日 <span style="color: LightCoral">+{{ extData.incrNoSymptom }}</span></div>
            </div>
            <div class="item" style="background-color: lightgoldenrodyellow">
              <div class="item_title">现有确诊</div>
              <div class="item_num" style="color: OrangeRed">{{ ( total.confirm - total.dead - total.heal ) ? (
                total.confirm - total.dead - total.heal ) : '未更新' }}</div>
              <div class="item_num item_num_plus">较昨日 <span style="color: OrangeRed">+{{ today.confirm - today.dead -
                  today.heal ? today.confirm - today.dead - today.heal : '' }}</span></div>
            </div>
            <div class="item" style="background-color: lightgray">
              <div class="item_title">累计确诊</div>
              <div class="item_num" style="color: Brown">{{ total.confirm ? total.confirm : '未更新' }}</div>
              <div class="item_num item_num_plus">较昨日 <span style="color: Brown">+{{ today.confirm }}</span></div>
            </div>
            <div class="item" style="background-color: lightpink">
              <div class="item_title">累计死亡</div>
              <div class="item_num" style="color: #333">{{ total.dead ? total.dead : '未更新' }}</div>
              <div class="item_num item_num_plus">较昨日 <span style="color: #333">+{{ today.dead }}</span></div>
            </div>
            <div class="item" style="background-color: lightgreen">
              <div class="item_title">累计治愈</div>
              <div class="item_num" style="color: green">{{ total.heal ? total.heal : '未更新' }}</div>
              <div class="item_num item_num_plus">较昨日 <span style="color: green">+{{ today.heal }}</span></div>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="12">
        <div id="main" style="width: 100%; height: 500px">{{}}</div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  import '@/utils/china.js'

  export default {
    name: "main",
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
        total:'',
        today:'',
        extData:'',
      };
    },
    mounted() {
      const options = {
        //标题样式
        title: {
          text: '中国疫情地图',
          x: "center",
          y: '0%',
          textStyle: {
            fontSize: 20,
            color: "#333"
          },
        },
        //这里设置提示框 (鼠标悬浮效果)
        tooltip: {
          //数据项图形触发
          trigger: 'item',
          //提示框浮层的背景颜色。 (鼠标悬浮后的提示框背景颜色)
          backgroundColor: "white",
          //字符串模板(地图): {a}（系列名称），{b}（区域名称），{c}（合并数值）,{d}（无）
          formatter: '地区：{b}<br/>现有确诊病例：{c}'
        },
        //视觉映射组件
        visualMap: {
          top: 'center',
          left: 'left',
          // 数据的范围
          min: 10,
          max: 100,
          text: ['高', '低'],
          realtime: true,  //拖拽时，是否实时更新
          calculable: true,  //是否显示拖拽用的手柄
          inRange: {
            // 颜色分布
            color: ['white', 'Tomato', 'orangered']
          }
        },
        series: [
          {
            name: '确诊',
            type: 'map',
            mapType: 'china',
            roam: true,
            //是否开启鼠标缩放和平移漫游
            itemStyle: {
              //地图区域的多边形 图形样式
              normal: {
                //是图形在默认状态下的样式
                label: {
                  show: true,//是否显示标签
                  textStyle: {
                    color: "black"
                  }
                }
              },
              zoom: 1,
              //地图缩放比例,默认为1
              emphasis: {
                //是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                label: { show: true }
              }
            },
            top: '0%',
            left: '15%',
            data: []
          }
        ]
      }
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);

      // 获取数据
    this.$axios.get("/echarts/epidemic").then(res => {
      alert(this.today.)
      this.today = res.data.chinaTotal.today
      
      this.extData = res.data.chinaTotal.extData
      this.total = res.data.chinaTotal.total
      let data = [ {name: '南海诸岛', value: 0} ]
      res.data.areaTree[2].children.forEach(item => {
        data.push({ name: item.name, value: item.total.confirm - item.total.dead - item.total.heal })

        options.series[0].data = data
        myChart.setOption(options)
      })
    }).catch(error=>{
      console.log(error)
    })
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
  .item {
  text-align: center;
  width: 150px;
  height: 150px;
  margin-right: 5px;
  margin-bottom: 5px;
}
.item:nth-child(3n) {
  margin-right: 0;
}
.item_title {
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
}
.item_num {
  margin-top: 10px;
  font-size: 30px;
  font-weight: bold;
}
.item_num_plus {
  font-size: 16px;
  color: #666;
}
</style>