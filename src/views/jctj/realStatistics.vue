<template>
  <div class="content_div">
    <div class="content_center">
      <h2>实时统计</h2>
      <div class="div_flex">
        <div
          class="div_border"
        >
          <h3>今日<span>累计新增用户</span></h3>
          <div class="div_spanTwo">
            <span>{{ newlyAddedcreaTime }}</span
            ><span>今日</span>
          </div>
          <div class="div_h1_text">
            <div class="div_spanWight">
              <p>{{ newlyAdded.amt }}<span>人</span></p>
            </div>
            <div class="div_tongBi">
              <div>
                环比
                  <el-tooltip class="item" v-if="newlyAdded.momType == 0" effect="dark" :content="'对比昨天'+newlyAdded.mom" placement="top">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-top">{{
                          newlyAdded.mom
                        }}</span>
                    </el-button>
                  </el-tooltip>
                   <el-tooltip class="item" v-if="newlyAdded.momType == 1" effect="dark" :content="'对比昨天上涨'+newlyAdded.mom" placement="top">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-top">{{
                          newlyAdded.mom
                        }}</span>
                    </el-button>
                  </el-tooltip>
                    <el-tooltip class="item" v-if="newlyAdded.momType == 2" effect="dark" :content="'对比昨天下降'+newlyAdded.mom" placement="top">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-bottom">{{
                          newlyAdded.mom
                        }}</span>
                    </el-button>
                  </el-tooltip>
              </div>
              <div style="margin-top: 2px;">
                同比
                  <el-tooltip class="item" v-if="newlyAdded.yoyType == 0" effect="dark" :content="'对比上周的今天'+newlyAdded.yoy" placement="bottom">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-top">{{
                          newlyAdded.yoy
                        }}</span>
                    </el-button>
                  </el-tooltip>
                   <el-tooltip class="item" v-if="newlyAdded.yoyType == 1" effect="dark" :content="'对比上周的今天上涨'+newlyAdded.yoy" placement="bottom">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-top">{{
                          newlyAdded.yoy
                        }}</span>
                    </el-button>
                  </el-tooltip>
                    <el-tooltip class="item" v-if="newlyAdded.yoyType == 2" effect="dark" :content="'对比上周的今天下降'+newlyAdded.yoy" placement="bottom">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-bottom">{{
                          newlyAdded.yoy
                        }}</span>
                    </el-button>
                  </el-tooltip>
              </div>
            </div>
          </div>
        </div>
        <div
          class="div_border"
        >
          <h3>今日<span>累计启动APP次数</span></h3>
          <div class="div_spanTwo">
            <span>---</span
            ><span>今日</span>
          </div>
          <div class="div_h1_text">
            <div class="div_spanWight">
              <p>0<span>人</span></p>
            </div>
            <div class="div_tongBi">
              <div>
                环比
                <span>0%</span>
                <!-- <span class="el-icon-caret-top" v-if="item.momType == 0">{{
                  item.mom || 0
                }}</span>
                <span class="el-icon-caret-top" v-if="item.momType == 1">{{
                  item.mom || 0
                }}</span>
                <span class="el-icon-caret-bottom" v-if="item.momType == 2">{{
                  item.mom || 0
                }}</span> -->
              </div>
              <div style="margin-top: 2px;">
                同比
                <span>0%</span>
                <!-- <span class="el-icon-caret-top" v-if="item.yoyType == 0">{{
                  item.yoy || 0
                }}</span>
                <span class="el-icon-caret-top" v-if="item.yoyType == 1">{{
                  item.yoy || 0
                }}</span>
                <span class="el-icon-caret-bottom" v-if="item.yoyType == 2">{{
                  item.yoy || 0
                }}</span> -->
              </div>
            </div>
          </div>
        </div>
        <div
          class="div_border"
        >
          <h3>今日<span>提交订单用户数</span></h3>
          <div class="div_spanTwo">
            <span>{{ orderNumbercreateTime }}</span
            ><span>今日</span>
          </div>
          <div class="div_h1_text">
            <div class="div_spanWight">
              <p>{{ orderNumber.amt }}<span>人</span></p>
            </div>
            <div class="div_tongBi">
              <div>
                环比
                 <el-tooltip class="item" v-if="orderNumber.momType == 0" effect="dark" :content="'对比昨天'+orderNumber.mom" placement="top">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-top">{{
                          orderNumber.mom
                        }}</span>
                    </el-button>
                  </el-tooltip>
                   <el-tooltip class="item" v-if="orderNumber.momType == 1" effect="dark" :content="'对比昨天上涨'+orderNumber.mom" placement="top">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-top">{{
                          orderNumber.mom
                        }}</span>
                    </el-button>
                  </el-tooltip>
                    <el-tooltip class="item" v-if="orderNumber.momType == 2" effect="dark" :content="'对比昨天下降'+orderNumber.mom" placement="top">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-bottom">{{
                          orderNumber.mom
                        }}</span>
                    </el-button>
                  </el-tooltip>
              </div>
              <div style="margin-top: 2px;">
                同比
                <el-tooltip class="item" v-if="orderNumber.yoyType == 0" effect="dark" :content="'对比上周的今天'+orderNumber.yoy" placement="bottom">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-top">{{
                          orderNumber.yoy
                        }}</span>
                    </el-button>
                  </el-tooltip>
                   <el-tooltip class="item" v-if="orderNumber.yoyType == 1" effect="dark" :content="'对比上周的今天上涨'+orderNumber.yoy" placement="bottom">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-top">{{
                          orderNumber.yoy
                        }}</span>
                    </el-button>
                  </el-tooltip>
                    <el-tooltip class="item" v-if="orderNumber.yoyType == 2" effect="dark" :content="'对比上周的今天下降'+orderNumber.yoy" placement="bottom">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-bottom">{{
                          orderNumber.yoy
                        }}</span>
                    </el-button>
                  </el-tooltip>
              </div>
            </div>
          </div>
        </div>
        <div
          class="div_border"
        >
          <h3>今日<span>购物卷营收</span></h3>
          <div class="div_spanTwo">
            <span>{{ couponRevenuecreateTime }}</span
            ><span>今日</span>
          </div>
          <div class="div_h1_text">
            <div class="div_spanWight">
              <p>{{ couponRevenue.amt }}<span>元</span></p>
            </div>
            <div class="div_tongBi">
              <div>
                环比
                    <el-tooltip class="item" v-if="couponRevenue.momType == 0" effect="dark" :content="'对比昨天'+couponRevenue.mom" placement="top">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-top">{{
                          couponRevenue.mom
                        }}</span>
                    </el-button>
                  </el-tooltip>
                   <el-tooltip class="item" v-if="couponRevenue.momType == 1" effect="dark" :content="'对比昨天上涨'+couponRevenue.mom" placement="top">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-top">{{
                          couponRevenue.mom
                        }}</span>
                    </el-button>
                  </el-tooltip>
                    <el-tooltip class="item" v-if="couponRevenue.momType == 2" effect="dark" :content="'对比昨天下降'+couponRevenue.mom" placement="top">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-bottom">{{
                          couponRevenue.mom
                        }}</span>
                    </el-button>
                  </el-tooltip>
              </div>
              <div style="margin-top: 2px;">
                同比
                   <el-tooltip class="item" v-if="couponRevenue.yoyType == 0" effect="dark" :content="'对比上周的今天'+couponRevenue.yoy" placement="bottom">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-top">{{
                          couponRevenue.yoy
                        }}</span>
                    </el-button>
                  </el-tooltip>
                   <el-tooltip class="item" v-if="couponRevenue.yoyType == 1" effect="dark" :content="'对比上周的今天上涨'+couponRevenue.yoy" placement="bottom">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-top">{{
                          couponRevenue.yoy
                        }}</span>
                    </el-button>
                  </el-tooltip>
                    <el-tooltip class="item" v-if="couponRevenue.yoyType == 2" effect="dark" :content="'对比上周的今天下降'+couponRevenue.yoy" placement="bottom">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-bottom">{{
                          couponRevenue.yoy
                        }}</span>
                    </el-button>
                  </el-tooltip>
              </div>
            </div>
          </div>
        </div>
        <div
          class="div_border"
        >
          <h3>今日<span>现金营收</span></h3>
          <div class="div_spanTwo">
            <span>{{ cashRevenuecreateTime }}</span
            ><span>今日</span>
          </div>
          <div class="div_h1_text">
            <div class="div_spanWight">
              <p>{{ cashRevenue.amt }}<span>元</span></p>
            </div>
            <div class="div_tongBi">
              <div>
                环比
                   <el-tooltip class="item" v-if="cashRevenue.momType == 0" effect="dark" :content="'对比昨天'+cashRevenue.mom" placement="top">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-top">{{
                          cashRevenue.mom
                        }}</span>
                    </el-button>
                  </el-tooltip>
                   <el-tooltip class="item" v-if="cashRevenue.momType == 1" effect="dark" :content="'对比昨天上涨'+cashRevenue.mom" placement="top">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-top">{{
                          cashRevenue.mom
                        }}</span>
                    </el-button>
                  </el-tooltip>
                    <el-tooltip class="item" v-if="cashRevenue.momType == 2" effect="dark" :content="'对比昨天下降'+cashRevenue.mom" placement="top">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-bottom">{{
                          cashRevenue.mom
                        }}</span>
                    </el-button>
                  </el-tooltip>
              </div>
              <div style="margin-top: 2px;">
                同比
                   <el-tooltip class="item" v-if="cashRevenue.yoyType == 0" effect="dark" :content="'对比上周的今天'+cashRevenue.yoy" placement="bottom">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-top">{{
                          cashRevenue.yoy
                        }}</span>
                    </el-button>
                  </el-tooltip>
                   <el-tooltip class="item" v-if="cashRevenue.yoyType == 1" effect="dark" :content="'对比上周的今天上涨'+cashRevenue.yoy" placement="bottom">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-top">{{
                          cashRevenue.yoy
                        }}</span>
                    </el-button>
                  </el-tooltip>
                    <el-tooltip class="item" v-if="cashRevenue.yoyType == 2" effect="dark" :content="'对比上周的今天下降'+cashRevenue.yoy" placement="bottom">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-bottom">{{
                          cashRevenue.yoy
                        }}</span>
                    </el-button>
                  </el-tooltip>
              </div>
            </div>
          </div>
        </div>
        <div
          class="div_border"
        >
          <h3>今日<span>支付成功用户数</span></h3>
          <div class="div_spanTwo">
            <span>{{ successfulUserscreateTime }}</span
            ><span>今日</span>
          </div>
          <div class="div_h1_text">
            <div class="div_spanWight">
              <p>{{ successfulUsers.amt }}<span>人</span></p>
            </div>
            <div class="div_tongBi">
              <div>
                环比
                 <el-tooltip class="item" v-if="successfulUsers.momType == 0" effect="dark" :content="'对比昨天'+successfulUsers.mom" placement="top">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-top">{{
                          successfulUsers.mom
                        }}</span>
                    </el-button>
                  </el-tooltip>
                   <el-tooltip class="item" v-if="successfulUsers.momType == 1" effect="dark" :content="'对比昨天上涨'+successfulUsers.mom" placement="top">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-top">{{
                          successfulUsers.mom
                        }}</span>
                    </el-button>
                  </el-tooltip>
                    <el-tooltip class="item" v-if="successfulUsers.momType == 2" effect="dark" :content="'对比昨天下降'+successfulUsers.mom" placement="top">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-bottom">{{
                          successfulUsers.mom
                        }}</span>
                    </el-button>
                  </el-tooltip>
              </div>
              <div style="margin-top: 2px;">
                同比
                  <el-tooltip class="item" v-if="successfulUsers.yoyType == 0" effect="dark" :content="'对比上周的今天'+successfulUsers.yoy" placement="bottom">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-top">{{
                          successfulUsers.yoy
                        }}</span>
                    </el-button>
                  </el-tooltip>
                   <el-tooltip class="item" v-if="successfulUsers.yoyType == 1" effect="dark" :content="'对比上周的今天上涨'+successfulUsers.yoy" placement="bottom">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-top">{{
                          successfulUsers.yoy
                        }}</span>
                    </el-button>
                  </el-tooltip>
                    <el-tooltip class="item" v-if="successfulUsers.yoyType == 2" effect="dark" :content="'对比上周的今天下降'+successfulUsers.yoy" placement="bottom">
                    <el-button class="itmem_but" size="mini">
                        <span class="el-icon-caret-bottom">{{
                          successfulUsers.yoy
                        }}</span>
                    </el-button>
                  </el-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="div_echarts">
       <div class="div_footer">
         <h3><span>今日</span>分时新增用户</h3>
         <p class="div_p_one"><span>{{addKeyTimeOne[0]}}~{{addKeyTimeTwo[0]}}</span>今日</p>
         <p>合计 {{cashSumAll}}人</p>
       </div>
       <div id="myChart" :style="{ width: '1200px', height: '400px' }"></div>
    </div>
  </div>
</template>

<script>
import {
  // newlyAdded,
  // startUp,
  // orderNumber,
  // couponRevenue,
  // cashRevenue,
  // successfulUsers,
  // timeSharingStart,
  // addUsersTime,
  newlyDataAdded
} from "@/api/jctj/realStatistics";
export default {
  name: "",
  data() {
    // 实时统计数据:1新增用户2启动APP次数3提交订单用户数4.购物券营收5.现金营收6支付成功用户数7.分时启动APP次数8.分时新增用户
    return {
      newlyAdded: [], //新增用户
      newlyAddedcreaTime:'',
      startUp: [], //启动APP次数
      orderNumber: [], //提交订单用户数
      orderNumbercreateTime:'',
      couponRevenue: [], //购物券营收
      couponRevenuecreateTime:'',
      cashRevenue: [], //.现金营收
      cashRevenuecreateTime:'',
      successfulUsers: [], //支付成功用户数
      successfulUserscreateTime:'',
      addUsersTimes: [], //分时新增用户
      chart:null,
      amts:[],
      createTime:'',
      addKeyTimeOne:'',//开始时间
      addKeyTimeTwo:'',//结束时间
      cashSumAll:0, //总价
    };
  },
  mounted() {
    this.getList();
    this.drawLine();
    this.$nextTick(() => {
      this.drawLine()
    })
  },
  filters:{
     newlyAddedmom(value){
        console.log(value)
     }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getList() {
      newlyDataAdded().then((res) => {
        if (res.code == 200) {
          this.newlyAdded = res.data.addUsers;
          this.newlyAddedcreaTime = this.newlyAdded.createTime.substr(0,10);
          this.orderNumber = res.data.submitOrders;
          this.orderNumbercreateTime = this.orderNumber.createTime.substr(0,10);
          this.couponRevenue = res.data.gwjAmt;
          this.couponRevenuecreateTime = this.couponRevenue.createTime.substr(0,10);
          this.cashRevenue = res.data.xjAmt;
          this.cashRevenuecreateTime = this.cashRevenue.createTime.substr(0,10);
          this.successfulUsers = res.data.sucOrders;
          this.successfulUserscreateTime = this.successfulUsers.createTime.substr(0,10);
          let addKeyTime=[];
          res.data.hmAddUsers.map((item)=>{
            for(let key in item){
              this.addUsersTimes.push(item[key].createTime.substr(5))
              this.amts.push(item[key].amt) 
              addKeyTime.push(item[key].createTime)
              this.cashSumAll += item[key].amt
            }
          })
          this.addKeyTimeOne = addKeyTime.slice(1);
          this.addKeyTimeTwo = addKeyTime.slice(-1);

        //动态插入数据时，数据在这里设置更新
        this.chart.setOption({
          xAxis: {
            data: this.addUsersTimes
          },
          series: [{
            name: '注册人数',
            data: this.amts,
          },
        ]
        });
        }
      })
    },

    drawLine() {
       // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      this.chart.setOption({
        legend: {
          data: ["新增注册用户数"],
        },
        tooltip: {
          trigger: "axis",
          formatter: "{b}  <br/>新注册人数 : {c}",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
        }
    },
        xAxis: {
          type: "category",
           boundaryGap: false,
           data: this.addUsersTimes,
        },
        yAxis: {
          type: "category",
          axisLine: { onZero: false },
          axisLabel: {
            formatter: "{value}",
          },
          boundaryGap: false,
          // data: ["0", "20", "40", "60", "80", "100", "150", "200", "300"],
        },
        series: [
          {
            name: "注册人数",
            type: "line",
            smooth: true,
            lineStyle: {
              width: 3,
              shadowColor: "bule",
              shadowBlur: 10,
              shadowOffsetY: 8,
            },
             itemStyle: {
              normal:{ 
                color:'#2878FF', //折点颜色
                lineStyle:{ 
                    color:'#2878FF' //折线颜色
                        } 
                } 
              },
            data: this.amts,
          },
        ],
      });
    },
  },
};
</script>

<style scoped lang="scss">
.content_center {
  width: 1300px;
  margin: 30px 0 0 100px;
}
.div_flex {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  .div_border {
    border: 1px solid rgb(129, 129, 129);
    width: 370px;
    height: 220px;
    padding: 10px 20px;
    margin-top: 10px;
    h3 > span {
      padding-left: 10px;
      margin-left: 10px;
      border-left: 3px solid rgb(0, 0, 0);
    }
    .div_spanTwo {
      font-size: 21px;
      color: rgb(161, 161, 161);
      span:nth-of-type(2) {
        padding-left: 10px;
        margin-left: 10px;
        border-left: 3px solid rgb(161, 161, 161);
      }
    }
    .div_h1_text {
      .div_spanWight {
        width: 190px;
        float: left;
      }
      .div_spanWight > p {
        font-size: 35px;
        font-weight: 600;
      }
      .div_spanWight > p > span {
        font-size: 18px;
      }
      .div_tongBi {
        float: left;
        padding-top: 42px;
        font-size: 15px;
      }
    }
  }
}
.div_echarts {
  border: 1px solid rgb(129, 129, 129);
  width: 1300px;
  margin: 30px 0 0 100px;
  padding: 10px;
  .div_footer{
    padding-left: 10px;
    span{
      padding-right:10px;
      margin-right: 10px;
      border-right: 2px solid black;
    }
  }
  .header_picker{
     padding-left: 10px;
  }
}

.el-button{
    color: #ec808d!important;
  }
</style>
