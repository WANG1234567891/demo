<template>
  <div class="content">
    <el-radio-group v-model="isCollapseButton" class="radioButton" @change="oldWeek">
      <el-radio-button :label="true">本期</el-radio-button>
      <el-radio-button :label="false">往期</el-radio-button>
    </el-radio-group>
    <div style="clear: both;"></div>
    <div class="item1">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户ID：">
            <el-input v-model="formInline.userId" placeholder="请输入用户ID"></el-input>
          </el-form-item>
          <el-form-item>
            <!-- <el-button type="primary" @click="onSubmit(),getConsumeData()">查询</el-button> -->
            <el-button type="primary" @click="onSubmitNow" v-if="isNow">查询</el-button>
            <el-button type="primary" @click="onSubmit" v-else>查询old</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="unfoldList()">{{btnText}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-form :inline="true" :model="formInline">
          <el-form-item label="本周期：" v-if="isCollapseButton==true">
            <!-- <el-input v-model="formInline.userId" placeholder="请输入用户ID"></el-input> -->
            <el-date-picker
              v-model="progressData.startTime"
              type="date"
              placeholder="开始时间"
              disabled
              style="width:160px"
            ></el-date-picker>
            <span>到</span>
            <el-date-picker
              v-model="progressData.endTime"
              type="date"
              placeholder="结束时间"
              disabled
              style="width:160px"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-form :inline="true" :model="formInline">
          <el-form-item label="筛选周期: " v-if="isCollapseButton == false">
            <el-date-picker
              type="year"
              placeholder="选择年份"
              v-model="checkWeek.year"
              style="width: 120px;"
              class="year"
            ></el-date-picker>
            <el-date-picker
              type="dates"
              placeholder="选择日期"
              format="MM-dd"
              v-model="checkWeek.dates"
              style="width: 145px;"
              class="dates"
              @change="yesDates"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <h3 v-if="showDiv">代理条件进度</h3>
      <div
        style="color: red; margin-top: 15px;"
        v-if="showDiv"
      >注意：代理是否符合提成条件已最终结算为准，代理级别的升变会导致不符合提成条件。</div>
      <div class="itemList">
        <ul ref="ulRef">
          <li>
            <div class="left">该用户当前代理级别：</div>
            <div class="right">{{progressData.agentType}}</div>
          </li>
          <li>
            <div class="left">本期总购买量：</div>
            <div class="right">{{progressData.buyAmount || 0}}份</div>
          </li>
          <li>
            <div class="left">所有下级累计兑酒数：</div>
            <div class="right">{{progressData.wineNum}}</div>
          </li>
          <li>
            <div class="left">本周期自己是否消费10瓶：</div>
            <div class="right">{{progressData.ownConsume ?'已消费':'未消费'}}</div>
          </li>

          <li>
            <div class="left">本周期超过10瓶的消费的直接下级人数：</div>
            <div class="right">{{progressData.consumeNum==0?'未消费':progressData.consumeNum}}</div>
            <div class="tabInfo" @click="tabInfo(0)">详情</div>
          </li>
          <li v-show="isTabInfo0">
            <template>
              <el-table :data="progressData.consumeDetail" style="width: 100%">
                <el-table-column prop="user_id" label="下级ID"></el-table-column>
                <el-table-column prop="qtys" label="消费数量"></el-table-column>
              </el-table>
            </template>
          </li>
          <li>
            <div class="left">直接下级中区代人数：</div>
            <div class="right">{{progressData.quNum}}</div>
            <div class="tabInfo" @click="tabInfo(1)">详情</div>
          </li>
          <li v-show="isTabInfo1">
            <template>
              <el-table :data="progressData.quUserList" style="width: 100%">
                <el-table-column prop="user_id" label="下级ID"></el-table-column>
                <el-table-column prop="agent" label="代理级别"></el-table-column>
                <el-table-column prop="phone" label="电话号码"></el-table-column>
              </el-table>
            </template>
          </li>
          <li>
            <div class="left">直接下级中市代人数：</div>
            <div class="right">{{progressData.shiNum}}</div>
            <div class="tabInfo" @click="tabInfo(2)">详情</div>
          </li>
          <li v-show="isTabInfo2">
            <template>
              <el-table :data="progressData.shiUserList" style="width: 100%">
                <el-table-column prop="user_id" label="下级ID"></el-table-column>
                <el-table-column prop="agent" label="代理级别"></el-table-column>
                <el-table-column prop="phone" label="电话号码"></el-table-column>
              </el-table>
            </template>
          </li>
          <li>
            <div class="left">直接下级中省代人数：</div>
            <div class="right">{{progressData.shengNum}}</div>
            <div class="tabInfo" @click="tabInfo(3)">详情</div>
          </li>
          <li v-show="isTabInfo3">
            <template>
              <el-table :data="progressData.shengUserList" style="width: 100%">
                <el-table-column prop="user_id" label="下级ID"></el-table-column>
                <el-table-column prop="agent" label="代理级别"></el-table-column>
                <el-table-column prop="phone" label="电话号码"></el-table-column>
              </el-table>
            </template>
          </li>
          <li>
            <div class="left">直接下级中符合条件的代理人数 (未计算有效新增条件)：</div>
            <div class="right">{{progressData.conditionLowerNum}}</div>
            <div class="tabInfo" @click="tabInfo(4)">详情</div>
          </li>
          <li v-show="isTabInfo4">
            <template>
              <el-table :data="progressData.conditionLowerList" style="width: 100%">
                <el-table-column prop="user_id" label="用户ID"></el-table-column>
                <el-table-column prop="agent_type" label="代理级别"></el-table-column>
                <el-table-column prop="phone" label="电话号码"></el-table-column>
              </el-table>
            </template>
          </li>
          <li class="lis" v-if="progressData.agentType != '普通会员'">
            <div class="left">本周期是否满足有效新增人数：</div>
            <div class="right">{{progressData.royaltState==1?'完成':'未完成'}}</div>
          </li>
          <li class="lis">
            <div class="left">本周期是有效新增的人数：</div>
            <div class="right">{{progressData.validNew}}</div>
          </li>
          <li class="lis">
            <div class="left">自己是否符合提成条件（以结算为准）：</div>
            <div class="right">{{progressData.conditionOwn}}</div>
          </li>
          <li class="lis">
            <div class="left" style="color:red;">注意:只统计截止到昨日的注册会员。</div>
          </li>
          <!-- 
					<li class="li-h3"><h3>消费分润条件进度</h3></li>
					<li>
						<div class="left">直接下级有确认收货订单的人数：</div>
						<div class="right">{{consumeData.length}}</div>
					</li>
					<li>
						<template>
						  <el-table
						    :data="consumeData"
						    style="width: 100%">
							<el-table-column
							      type="index"
							      width="50"
								  label="序号">
							  </el-table-column>
						    <el-table-column
						      prop="creator"
						      label="下级ID">
						    </el-table-column>
						    <el-table-column
						      prop="order_id"
						      label="下级确认收货的某笔订单ID">
						    </el-table-column>
						  </el-table>
						</template>
          </li>-->
        </ul>
      </div>
    </div>
    <div class="item2" v-if="showDiv">
      <p>成为代理规则</p>区代
      <br />
      <div>
        ①超过6个直接下级每人当前自然周购买10份任意商品。
        <br />②且自己要在当前自然周购买10份任意商品。
        <br />③本人+所有无穷,下级当期购买270份任意商品。
        <br />④本人+无穷级,排除掉之前周期等级大于等于本人的人，的本周期、有效新增用户>=3人
        <br />
      </div>市代
      <br />
      <div>
        ①超过13个直接下级每人当前自然周购买10份任意商品。
        <br />②且自己要在当前自然周购买10份任意商品。
        <br />③本人+所有无穷下级当期购买2700份任意商品。
        <br />④且直接下级中至少有3个区代。
        <br />④本人+无穷级,排除掉之前周期等级大于等于本人的人，的本周期、有效新增用户>=9人
        <br />
      </div>省代
      <br />
      <div>
        ①超过19个直接下级每人当前自然周购买10份任意商品。
        <br />②且自己要在当前自然周购买10份任意商品。
        <br />③本人+所有无穷,下级当期购买17000份任意商品。
        <br />④且直接下级中至少有3个市代。
        <br />⑤本人+无穷级,排除掉之前周期等级大于等于本人的人，的本周期、有效新增用户>=27人
        <br />
      </div>

      <p>获得当周代理提成规则</p>区代 0.0041
      <br />
      <div>
        ①超过6个直接下级每人当前自然周购买10份任意商品。
        <br />②且自己要在当前自然周购买10份任意商品。
        <br />③本人+所有无穷下级当期购买270份任意商品。
        <br />
      </div>市代 0.0031
      <br />
      <div>
        ①超过13个直接下级每人当前自然周购买10份任意商品。
        <br />②且自己要在当前自然周购买10份任意商品。
        <br />③本周期直接下级中至少有3个区代符合提成条件。
        <br />④本人+所有无穷下级当期购买2700份任意商品。
        <br />
      </div>省代 0.0019
      <br />
      <div>
        ①超过19个直接下级每人当前自然周购买10份任意商品。
        <br />②且自己要在当前自然周购买10份任意商品。
        <br />③本周期直接下级中至少有3个市代符合提成条件
        <br />④本人+所有无穷下级当期购买17000份任意商品。
        <br />
      </div>

      <!-- <p>获得消费分润条件</p>
			<div>
				①至少10个直接下级在匀贸商城进行完整交易。<br/>
				②完整交易指确认收货成功。<br/>
				③从第10个直接下级确认收货的订单开始计算消费分润。<br/>
      </div>-->
    </div>
    <div class="table-details" v-if="isShow">
      <el-table :data="oldDetails" border style="width: 750px">
        <el-table-column prop="createTime" label="开始日期" width="170"></el-table-column>
        <el-table-column prop="cycleTime" label="时间周期" width="180"></el-table-column>
        <el-table-column prop="totalMoney" label="总销售额(元)" width="105"></el-table-column>
        <el-table-column prop="cycleRealRoyaltyPrice" label="提成金额" width="105"></el-table-column>
        <el-table-column prop="royaltyRate" label="提成比列" width="105"></el-table-column>
        <el-table-column prop="cycleRealRoyaltyPrice" label="提成金额"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { fetchList } from "@/api/ums/memberLevel";
export default {
  data() {
    return {
      formInline: {
        // userId: ,
        userId: "96872",
      },
      progressData: {},
      checkWeek: { year: "", dates: "" },
      consumeData: [],
      isTabInfo0: false,
      isTabInfo1: false,
      isTabInfo2: false,
      isTabInfo3: false,
      isTabInfo4: false,
      isNow: true,
      showDiv: true,
      url: "",
      btnText: "展开",
      isCollapseButton: true,
      type: null,
      isShow: false,
      oldUrl:
        "http://hpc.agent.sootoken.com.cn/searched-api/api/common/v1/SalesOperations/allAgentCycleRealPayMoney",
      nowUrl:
        "http://hpc.agent.sootoken.com.cn/searched-api/api/common/v1/SalesOperations/queryAgentCondition",
      oldDetails: [],
    };
  },
  created() {},
  methods: {
    onSubmitNow() {
      // console.log("now")
      axios
        .get(this.nowUrl + "?userId=" + this.formInline.userId)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            this.$message({
              message: "查询成功",
              type: "success",
              duration: 1000,
            });
            this.progressData = response.data.data;
            this.progressData.agentType = this.agencyRank(
              this.progressData.agentType
            );
            this.progressData.conditionLowerList.forEach((item) => {
              item.agent_type = this.agencyRank(item.agent_type);
            });

            this.progressData.quUserList.forEach((item) => {
              item.agent = this.agencyRank(item.agent);
            });
            this.progressData.shiUserList.forEach((item) => {
              item.agent = this.agencyRank(item.agent);
            });
            this.progressData.shengUserList.forEach((item) => {
              item.agent = this.agencyRank(item.agent);
            });
            this.progressData.conditionOwn =
              this.progressData.conditionOwn == 0 ? "不符合" : "符合";
            this.listLoading = true;
          }
        })
    },
    onSubmit() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      axios
        .post(this.oldUrl + "?userId=" + this.formInline.userId)
        .then((res) => {
          if (res.status == 200 && this.type == 1) {
            //   console.log(res);
            this.oldDetails = res.data.data.royaltyLog.list;
            this.isShow = true;
            // console.log(res.data.data.royaltyLog.list);
            loading.close();
          }
        })
        .catch((error) => {
          this.$message({
            message: "查询失败",
            type: "error",
            duration: 1000,
          });
        });
      // fetchList({
      //   userId: this.formInline.userId,
      // })
      //   .then((response) => {
      //     console.log(response);
      //     if (response.code == 200) {
      //       this.$message({
      //         message: "查询成功",
      //         type: "success",
      //         duration: 1000,
      //       });
      //       this.progressData = response.data;
      //       this.progressData.agentType = this.agencyRank(
      //         this.progressData.agentType
      //       );
      //       this.progressData.conditionLowerList.forEach((item) => {
      //         item.agent_type = this.agencyRank(item.agent_type);
      //       });

      //       this.progressData.quUserList.forEach((item) => {
      //         item.agent = this.agencyRank(item.agent);
      //       });
      //       this.progressData.shiUserList.forEach((item) => {
      //         item.agent = this.agencyRank(item.agent);
      //       });
      //       this.progressData.shengUserList.forEach((item) => {
      //         item.agent = this.agencyRank(item.agent);
      //       });
      //       this.progressData.conditionOwn =
      //         this.progressData.conditionOwn == 0 ? "不符合" : "符合";
      //       this.listLoading = true;
      //     }
      //     loading.close();
      //   })
      //   .catch((err) => {
      //     this.$message({
      //       message: "查询失败",
      //       type: "error",
      //       duration: 1000,
      //     });
      //   });
    },
    oldWeek() {
      console.log(this.isNow);

      if (this.type == null) {
        this.type = 1;
        this.isShow = true;
        this.showDiv = false;
        this.isNow = false;
        this.$refs.ulRef.style.display = "none";
      } else if (this.type == 1) {
        this.type = null;
        this.showDiv = true;
        this.isShow = false;
        this.isNow = true;
        this.$refs.ulRef.style.display = "block";
      }
    },
    yesDates() {
      let year = this.checkWeek.year;
      let dates = this.checkWeek.dates;
      let y = new Date(year).getFullYear();
      let m = new Date(dates[0]).getMonth() + 1;
      let m2 = new Date(dates[1]).getMonth() + 1;
      let d1 = dates[0].getDate();
      let d2 = dates[1].getDate();
      let sTime;
      let eTime;
      if (m < 10 || m2 < 10 || d1 < 10 || d2 < 10) {
        sTime = y + "-0" + m + "-0" + d1;
        eTime = y + "-0" + m2 + "-0" + d2;
        // console.log(sTime);
      } else {
        sTime = y + "-" + m + "-" + d1;
        eTime = y + "-" + m2 + "-" + d2;
        // console.log(sTime);
      }
      let sMs = new Date(sTime).getTime();
      let eMs = new Date(eTime).getTime();
      let arr = [];
      this.oldDetails.forEach((item) => {
        let time = item.createTime;
        item.createTime = new Date(item.createTime).getTime();
        console.log(new Date(item.createTime).getTime());
        if (item.createTime >= sMs && item.createTime <= eMs) {
          arr.push(item);
          // console.log(arr.push(item));
        }
        item.createTime = time;
      });
      this.oldDetails = [];
      this.oldDetails = arr;
      // let findIndex;
      // arr.find((item, index) => {
      //   if (item > sMs && item < eMs) {
      //     findIndex = index;
      //     console.log(item);
      //   }
      // });
      // let obj = this.oldDetails[findIndex];
      // this.oldDetails = [];
      // this.oldDetails.push(obj);
    },
    //消费分润
    // getConsumeData(){
    // 	var formData = new FormData();
    // 	formData.append('userId',this.formInline.userId)
    // 	this.axios({
    // 		method: "POST",
    // 		url: this.$local.http+this.$api.queryBuyRoyaltyCondition,
    // 		data:formData,
    // 	}).then(res=>{
    // 		res = res.data;
    // 		if(res.success){
    // 			this.consumeData = res.data;
    // 			// console.log(res);
    // 		}else{
    // 			this.$message(res.msg);
    // 					this.consumeData = {}
    // 		}
    // 	}).catch(err=>{
    // 		this.$message(err);
    // 				this.consumeData = {}
    // 	})
    // },//96872
    agencyRank(index) {
      if (index == -1) {
        return "用户不存在";
      } else if (index == 0) {
        return "普通会员";
      } else if (index == 1) {
        return "区代";
      } else if (index == 2) {
        return "市代";
      } else if (index == 3) {
        return "省代";
      } else {
        return "代理级别出错";
      }
    },
    tabInfo(index) {
      this["isTabInfo" + index] = !this["isTabInfo" + index];
    },
    unfoldList() {
      if (this.btnText == "展开") {
        this.isTabInfo0 = true;
        this.isTabInfo1 = true;
        this.isTabInfo2 = true;
        this.isTabInfo3 = true;
        this.isTabInfo4 = true;
        this.btnText = "收缩";
      } else {
        this.btnText = "展开";
        this.isTabInfo0 = false;
        this.isTabInfo1 = false;
        this.isTabInfo2 = false;
        this.isTabInfo3 = false;
        this.isTabInfo4 = false;
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  padding-left: 60px;
  padding-top: 20px;
  overflow: hidden;
  .radioButton {
    margin-bottom: 20px;
  }
  .item1 {
    float: left;
    width: 40%;
    min-width: 500px;
    .itemList {
      ul {
        margin: 0;
        padding: 0;
      }
      li {
        display: flex;
        margin: 12px 0;
      }
      .li-h3 {
        margin-top: 30px;
        margin-bottom: 20px;
      }
      .left {
        width: 300px;
      }
      .right {
        width: 150px;
      }
    }
  }
  .item2 {
    float: left;
    width: 60%;
    min-width: 376px;
    box-sizing: border-box;
    padding-left: 50px;
    p {
      color: red;
      font-size: 18px;
      margin: 10px 0;
    }
    div {
      line-height: 24px;
      padding-left: 20px;
    }
  }
}
.tabInfo {
  color: #0082e6;
  cursor: pointer;
  min-width: 40px;
}
.table-details {
  .el-table {
    border: 1px solid #ccc;
  }
}

.warning-row {
  background: oldlace;
}
.success-row {
  background: #f0f9eb;
}
</style>
