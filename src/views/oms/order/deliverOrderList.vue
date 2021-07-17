<template>
  <div class="app-container">
    <div class="case-container">
      <div class="case" v-if="counts > 0">
        <span>{{counts}}条信息正等待您的审核</span>
        <el-button type="danger" size="mini" @click="goShengHe">去审核</el-button>
      </div>
    </div>
    <el-card class="operate-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float:right;margin-top: 30px" @click="handleResetSearch()" size="small">重置</el-button>
        <el-button
          style="float: right;margin-top: 30px;margin-right:15px;"
          @click="searchMemberList()"
          type="primary"
          size="small"
        >查询搜索</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="主订单编号：">
            <el-input style="width: 203px" v-model="listQuery.orderNumber" placeholder="请输入主订单编号"></el-input>
          </el-form-item>
          <el-form-item label="订单编号：">
            <el-input style="width: 203px" v-model="listQuery.subOrderNumber" placeholder="请输入订单编号"></el-input>
          </el-form-item>
          <el-form-item label="客服是否审核：">
            <el-select
              v-model="servericValue"
              placeholder="请选择"
              clearable
              @change="changSerVal"
              style="width:203px;"
            >
              <el-option
                v-for="item in servericOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商家是否审核：">
            <el-select
              v-model="businessValue"
              placeholder="请选择"
              clearable
              @change="changeBusVal"
              style="width:203px;"
            >
              <el-option
                v-for="item in businessOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div class="table-container">
      <el-table
        ref="brandTable"
        :data="list"
        style="width: 100%;"
        height="45rem"
        v-loading="listLoading"
        border
      >
        <el-table-column prop="orderNumber" label="主订单编号" width="105" align="center"></el-table-column>
        <el-table-column prop="subOrderNumber" label="订单编号" align="center"></el-table-column>
        <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="quantity" label="数量" align="center"></el-table-column>
        <el-table-column prop="reason" label="问题描述" align="center"></el-table-column>
        <el-table-column prop="agreement_refund" label="申请退款金额" width="105" align="center"></el-table-column>
        <el-table-column prop="actual_recund" label="实际退款金额" width="105" align="center"></el-table-column>
        <el-table-column label="退款订单是否有效" align="center">
          <template slot-scope="scope">{{getOrderRefundState(scope.row.order_refund_state)}}</template>
        </el-table-column>
        <el-table-column label="商家是否审核" width="105" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.business_check_state == 1">
              <el-tag effect="dark" type="success" color="#67c23a">同意</el-tag>
            </span>
            <span v-if="scope.row.business_check_state == 2">
              <el-tag effect="dark" type="info" color="#909399">不同意</el-tag>
            </span>
            <span v-if="scope.row.business_check_state == 3">
              <el-tag effect="dark" type="primary" color="#409eff">同意但修改金额</el-tag>
            </span>
            <el-tooltip
              v-if="scope.row.business_check_state === 0"
              class="item"
              effect="dark"
              :content="scope.row.reason"
              placement="top"
              enterable
            >
              <span v-if="scope.row.business_check_state === 0">
                <el-tag effect="dark" type="danger" color="#f56c6c">未审核</el-tag>
              </span>
            </el-tooltip>
            <!-- {{getOrderState(scope.row.business_check_state)}} -->
          </template>
          <!-- <el-select v-model="scope.row.business_check_state" placeholder="请选择" clearable>
              <el-option
                v-for="item in busvalueOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @change="checkBusVal(scope.$index,scope.row)"
          ></el-option>-->
          <!-- </el-select> -->
        </el-table-column>
        <el-table-column label="客服是否审核" width="105" align="center">
          <template slot-scope="scope">
            <!-- {{getOrderState(scope.row.service_check_state)}} -->
            <span v-if="scope.row.service_check_state == 1">
              <el-tag effect="dark" type="success" color="#67c23a">同意</el-tag>
            </span>
            <el-tooltip
              v-if="scope.row.service_check_state == 2"
              effect="dark"
              :content="scope.row.reason"
              placement="top"
            >
              <span v-if="scope.row.service_check_state == 2">
                <el-tag effect="dark" type="info" color="#909399">不同意</el-tag>
              </span>
            </el-tooltip>
            <span v-if="scope.row.service_check_state == 3">
              <el-tag effect="dark" type="primary" color="#409eff">同意但修改金额</el-tag>
            </span>
            <el-tooltip
              v-if="scope.row.service_check_state === 0"
              class="item"
              effect="dark"
              :content="scope.row.reason"
              placement="top"
              enterable
            >
              <span v-if="scope.row.service_check_state === 0">
                <el-tag effect="dark" type="danger" color="#f56c6c">未审核</el-tag>
              </span>
            </el-tooltip>
          </template>
          <!-- @change="elOptionBlurC(scope.$index,scope.row)"
            <el-select v-model="scope.row.service_check_state" placeholder="请选择" clearable>
              <el-option
                v-for="item in svalueOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @change="checkSerVal(scope.$index,scope.row)"
              ></el-option>
          </el-select>-->
        </el-table-column>
        <el-table-column prop="shopPhone" label="商家电话" align="center"></el-table-column>
        <el-table-column prop="business_check_time" label="商家审核通过时间" width="153" align="center"></el-table-column>
        <el-table-column prop="create_time" label="退款订单创建时间" width="153" align="center"></el-table-column>
        <el-table-column prop="finance_check_time" label="退款到账时间" width="120" align="center"></el-table-column>
        <el-table-column label="操作" width="200" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.service_check_state == 0"
              size="mini"
              type="primary"
              @click="handleClick(scope.$index, scope.row)"
              style="margin-right:6px;"
            >去审核</el-button>
            <!-- <span v-if="scope.row.service_check_state ===1">已同意</span> -->
            <el-button
              size="mini"
              type="primary"
              @click="goSea(scope.$index, scope.row)"
              style="margin-right:6px;"
            >查看</el-button>
            <span v-if="scope.row.service_check_state ===2">
              <el-tag effect="dark" type="info" color="#909399">不同意</el-tag>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total"
      ></el-pagination>
    </div>
    <el-drawer title="商品所属商店详情" :visible.sync="drawer" :direction="direction" withHeader>
      <div class="shopCard">
        <div class="card-item card-item-1">
          <i class="el-icon-s-shop shop-i"></i>
          <div class="pt-8">
            <span>店铺名称 shop:</span>
            <span class="ft-14">{{shopList.shopName}}</span>
          </div>
        </div>
        <div class="card-item">
          <span>类型:</span>
          <span class="ft-14">{{showShopType(shopList.shopType)}}</span>
        </div>
        <div class="card-item">
          <span>店铺 ID:</span>
          <span class="ft-14">{{shopList.shopId}}</span>
        </div>

        <div class="card-item">
          <span>地址 address:</span>
          <span class="ft-14">{{shopList.address }}</span>
        </div>
      </div>
      <div class="new-table">
        <el-table :data="tableData" stripe border>
          <el-table-column label="店铺名称">
            <template slot-scope="scope">
              <!-- <i class="el-icon-time"></i> -->
              <span style="margin-left: 10px">{{ scope.row.shopName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="店铺ID">
            <template slot-scope="scope">
              <p>{{ scope.row.shopId }}</p>
            </template>
          </el-table-column>
          <el-table-column label="店铺类型">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium" color="#0aa1ed">{{showShopType(scope.row.shopType)}}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="搜了宝ID">
            <template slot-scope="scope">
              <p>{{ scope.row.ownerId }}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="userCard">
        <div>
          <i class="el-icon-user-solid c-blur"></i>
          <span>用户名 :</span>
          <span>{{shopList.userName}}</span>
        </div>
        <div>
          <i class="el-icon-phone c-blur"></i>
          <span>电话 :</span>
          <span>{{shopList.phone}}</span>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { refundOrderList, getShopDetail } from "@/api/oms/order";
import { formatDate } from "@/utils/date";
import { waitCheckMessage } from "@/api/cms/help";

export default {
  name: "refundOrderList",
  data() {
    return {
      dialogVisible: false,
      busVal: "",
      serVal: "",
      listQuery: {
        orderNumber: null,
        subOrderNumber: null,
        serviceCheckState: null,
        businessCheckState: null,
        pageNum: 1,
        pageSize: 10,
      },
      list: [],
      total: null,
      counts: 0,
      servericOptions: [
        {
          value: "0",
          label: "未审核",
        },
        {
          value: "1",
          label: "同意退款",
        },
        {
          value: "2",
          label: "不同意退款",
        },
        {
          value: "3",
          label: "同意但修改金额",
        },
      ],
      servericValue: "",
      businessValue: "",
      businessOptions: [
        {
          value: "0",
          label: "未审核",
        },
        {
          value: "1",
          label: "同意退款",
        },
        {
          value: "2",
          label: "不同意退款",
        },
        {
          value: "3",
          label: "同意但修改金额",
        },
      ],
      drawer: false,
      direction: "rtl",
      shopList: {},
      tableData: [],
      // busvalueOptions:[{value:0,label:'未审核'},{value:1,label:'同意退款'},{value:2,label:'同意退款'}],
      // svalueOptions:[{value:0,label:'等待审核'},{value:1,label:'同意退款'},{value:2,label:'不同意退款'}],
    };
  },
  created() {
    this.getList();
    waitCheckMessage({}).then((res) => {
      this.counts = res.data.slOrderRefundListCount;
    });
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    getOrderState(state) {
      switch (state) {
        case 0:
          return "未审核";
          break;
        case 1:
          return "同意";
          break;
        case 2:
          return "不同意";
          break;
        case 3:
          return "同意但修改金额";
          break;
        default:
          break;
      }
    },
    getOrderRefundState(orderState) {
      if (orderState == 1) {
        return "有效";
      } else {
        return "无效";
      }
    },
    gettime(time) {
      return formatDate(time, "yyyy-MM-dd hh:mm:ss");
    },
    handleClick(index, row) {
      console.log(row.id);
      this.$confirm("是否要审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // views/oms/order/orderDetail
        this.$router.push({ path: "/oms/orderNum", query: { id: row.id } });
      });
    },
    goSea(index, row) {
      this.tableData = [];
      // this.$router.push({ path: "/oms/shopDetail", query: { shopId: row.shopId } });
      getShopDetail(row.shopId).then((res) => {
        console.log(res, "shopid");
        if (res.code == 200) {
          this.shopList = res.data;
          this.tableData.push(res.data);
          this.drawer = true;
        }
      });
    },
    // seaProduct(index, row){
    //   this.$router.push({path:"/oms/orderNum",query:{id:row.id}})
    // },
    // elOptionBlurC(index,row){
    //   fetchData({

    //   }).then(res=>{
    //     if(res.code == 200){
    //       this.$message({
    //         message:'操作成功',
    //         type:'成功',
    //         duration:1000
    //       })
    //     }
    //   })
    // },
    // checkBusVal(index,row){
    //   console.log("bus",row)
    // },
    changSerVal() {
      // console.log("ser",this.servericValue)
      this.listQuery.serviceCheckState = this.servericValue;
    },
    changeBusVal() {
      // console.log("bus",this.businessValue)
      this.listQuery.businessCheckState = this.businessValue;
    },
    searchMemberList() {
      console.log("查询");
      this.listQuery.current = 1;
      this.getList();
    },
    handleResetSearch() {
      (this.listQuery.orderNumber = this.listQuery.subOrderNumber = null),
        this.getList();
    },
    getList() {
      this.listLoading = true;
      refundOrderList(this.listQuery).then((response) => {
        this.listLoading = false;
        console.log(response, "-----");
        if (response.startRow == 0 && response.endRow == 0) {
          this.$message({
            message: "请输入正确的订单号",
            type: "warning",
            duration: 1000,
          });
          this.list = response.list;
          return false;
        }
        this.list = response.data.list;
        this.total = response.data.total;
        this.pageNum = response.data.pageNum;
        this.pageSize = response.data.pageSize;
      });
    },
    goShengHe() {
      this.listQuery.serviceCheckState = 0;
      this.getList();
    },
    // 店铺类型
    showShopType(val) {
      if (val == 1) {
        return "共享商城";
      } else if (val == 2) {
        return "共享农场";
      } else if (val == 3) {
        return "共享工厂";
      } else if (val == 4) {
        return "民宿客栈";
      } else if (val == 5) {
        return "农家餐饮";
      } else if (val == 6) {
        return "综合农庄";
      } else if (val == 7) {
        return "旅游景点";
      } else if (val == 8) {
        return "农庄租赁";
      } else if (val == 9) {
        return "匀贸商店";
      }
    },
  },
};
</script>
<style scoped>
span {
  cursor: pointer;
}
.case {
  width: 300px;
  height: 40px;
  border-radius: 5px;
  text-align: left;
  padding: 5px 10px;
  box-sizing: border-box;
  background: pink;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  letter-spacing: 0.5px;
  font-weight: bold;
  margin-bottom: 20px;
}
.case-container {
  display: flex;
  flex-direction: column;
}
.case {
  width: 300px;
  height: 40px;
  border-radius: 5px;
  text-align: left;
  padding: 5px 10px;
  box-sizing: border-box;
  background: pink;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  letter-spacing: 0.5px;
  font-weight: bold;
  margin-bottom: 0px;
}
.el-tag {
  color: white;
}
.el-drawer{padding: 0 5px;}
.shopCard,
.userCard {
  width: 90%;
  height: 200px;
  margin: 0 auto;
  margin-top: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(20, 18, 18, 0.12), 0 0 6px rgba(70, 69, 69, 0.04);
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
}
.new-table {
  margin-top: 4rem;
  margin-bottom: 4rem;
}
.userCard {
  width: 40%;
}
.userCard div {
  margin: auto;
}
.card-item {
  margin-bottom: 1.5rem;
}
.card-item-1 {
  display: flex;
  justify-content: space-between;
}
.pt-8 {
  padding-top: 8px;
}
.ft-14 {
  font-size: 14px;
}
.shop-i {
  font-size: 2rem;
  color: #f80951;
}

.shop-img {
  margin-top: 10px;
  padding: 0.5rem 3rem;
}
.shop-img .el-image {
  border-radius: 5px;
}
.c-blur {
  color: #409eff;
  font-size: 14px;
}
</style>


