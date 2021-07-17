<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right;margin-right: 80px; margin-top: 30px"
          @click="handleResetSearch()"
          size="small"
        >重置</el-button>
        <el-button
          style="float:right; margin-top: 30px;margin-right:15px;"
          type="primary"
          @click="handleSearchList()"
          size="small"
        >查询搜索</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="110px">
          <el-form-item label="商家联系方式：">
            <el-input v-model="listQuery.shopPhone" class="input-width" placeholder="商家联系方式"></el-input>
          </el-form-item>
          <el-form-item label="店铺ID：">
            <el-input v-model="listQuery.shopId" class="input-width" placeholder="店铺ID"></el-input>
          </el-form-item>
          <el-form-item label="主订单编号：">
            <el-input v-model="listQuery.mainOrderNum" class="input-width" placeholder="主订单编号"></el-input>
          </el-form-item>
          <el-form-item label="订单编号：">
            <el-input v-model="listQuery.orderNum" class="input-width" placeholder="主订单编号"></el-input>
          </el-form-item>
          <el-form-item label="结款状态：">
            <el-select v-model="listQuery.payStatus" placeholder="全部" clearable style="width:200px;" class="input-width">
              <el-option
                v-for="item in recommendOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单支付状态：">
            <el-select v-model="listQuery.payType" placeholder="全部" clearable style="width:202px;" class="input-width">
              <el-option
                v-for="item in paymentstatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否一号专区：">
            <el-select v-model="listQuery.isOneType" placeholder="全部" clearable class="input-width" style="width:202px;">
              <el-option
                v-for="item in zoneOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收货时间：">
            <el-date-picker
              v-model="listQuery.create_time"
              type="datetimerange" 
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div class="table-container">
      <el-table
        ref="newProductTable"
        :data="list"
        style="width: 100%;"
        height="45rem"
        v-loading="listLoading"
        border
      >
        <el-table-column label="主订单号" align="center">
          <template slot-scope="scope">{{scope.row.mainOrderNum}}</template>
        </el-table-column>
        <el-table-column label="订单编号" align="center">
          <template slot-scope="scope">{{scope.row.serialNumber}}</template>
        </el-table-column>
        <el-table-column label="店铺ID" align="center">
          <template slot-scope="scope">{{scope.row.shopId}}</template>
        </el-table-column>
        <el-table-column label="店铺名称" align="center">
          <template slot-scope="scope">{{scope.row.shopName}}</template>
        </el-table-column>
        <el-table-column label="商家联系方式" width="105" align="center">
          <template slot-scope="scope">{{scope.row.shopPhone}}</template>
        </el-table-column>
        <el-table-column label="商家银行卡号" width="105" align="center">
          <template slot-scope="scope">{{scope.row.bankCard}}</template>
        </el-table-column>
        <el-table-column label="商家开户行" width="70" align="center">
          <template slot-scope="scope">{{scope.row.openBank}}</template>
        </el-table-column>
        <el-table-column label="收货时间" width="155" align="center">
          <template slot-scope="scope">{{scope.row.confirmReceiptTime}}</template>
        </el-table-column>
        <el-table-column label="结款状态" align="center">
          <template slot-scope="scope">{{scope.row.payStatus ? "已结款" : "未结款"}}</template>
        </el-table-column>
        <el-table-column label="订单支付状态"  align="center">
          <template slot-scope="scope">{{payState(scope.row.paymentState)}}</template>
        </el-table-column>
        <el-table-column label="是否一号专区" width="105" align="center">
          <template slot-scope="scope">
            <!-- {{scope.row.oneType  == 1 ? "是" : "不是"}} -->
            <el-tag v-if="scope.row.oneType == 1" effect="dark" type="primary" color="#409eff" style="color:white">是</el-tag>
            <el-tag v-if="scope.row.oneType == 0" effect="dark" type="danger" color="#e6a23c" style="color:white">不是</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="订单总金额" align="center">
          <template slot-scope="scope">{{scope.row.orderPrice}}</template>
        </el-table-column>
        <el-table-column label="现金支付金额" align="center">
          <template slot-scope="scope">{{scope.row.shouldPrice}}</template>
        </el-table-column>
        <el-table-column label="和平村购物卷" align="center">
          <template slot-scope="scope">{{scope.row.totalGwj}}</template>
        </el-table-column>
        <el-table-column label="国甄购物卷" align="center">
          <template slot-scope="scope">{{scope.row.totalGzGwj}}</template>
        </el-table-column>
        <el-table-column label="用户ID" align="center">
          <template slot-scope="scope">{{scope.row.paymentUserId}}</template>
        </el-table-column>
        <el-table-column label="现金分账金额" align="center">
          <template slot-scope="scope">{{scope.row.paFzMoney}}</template>
        </el-table-column>
        <el-table-column label="购物卷分账金额" align="center">
          <template slot-scope="scope">{{scope.row.gwjFzMoney}}</template>
        </el-table-column>
        <el-table-column label="订单支付类型" align="center">
          <template slot-scope="scope">{{scope.row.orderAPayType | orderAPayType}}</template>
        </el-table-column>
        <el-table-column label="平台抽成" align="center">
          <template slot-scope="scope">{{scope.row.platformPrice}}</template>
        </el-table-column>
        <el-table-column label="应付金额" align="center">
          <template slot-scope="scope">{{scope.row.shouldPrice}}</template>
        </el-table-column>
        <el-table-column label="结款金额" align="center">
          <template slot-scope="scope">{{scope.row.actualPrice}}</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { fetchList } from "@/api/sms/hotProduct";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  shopPhone: null,
  shopId: null,
  payType: null,
  payStatus: null,
  orderNum: null,
  mainOrderNum: null,
  create_time: null,
  beginTm: null,
  endTm: null,
  isOneType:null,
};
export default {
  name: "hotProductList",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      multipleSelection: [],
      recommendOptions: [
        {
          label: "未结款",
          value: 0,
        },
        {
          label: "已结款",
          value: 1,
        },
      ],
      paymentstatusOptions: [
        {
          label: "支付失败",
          value: 0,
        },
        {
          label: "支付成功",
          value: 1,
        },
        {
          label: "待支付",
          value: 2,
        },
        {
          label: "线下已付款",
          value: 3,
        },
        {
          label: "申请售后",
          value: 102,
        },
      ],
      zoneOptions: [
        {
          label: "不是",
          value: 0,
        },
        {
          label: "是",
          value: 1,
        },
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  filters: {
    orderAPayType(status) {
      if (status === 1) {
        return "微信";
      } else if (status === 2) {
        return "支付宝";
      } else if (status === 3) {
        return "paypal";
      } else if (status === 4) {
        return "积分兑换";
      } else if (status === 5) {
        return "线下付款";
      } else if (status === 6) {
        return "微信+积分";
      } else if (status === 7) {
        return "支付宝+积分";
      } else if (status === 8) {
        return "微信+贝";
      } else if (status === 9) {
        return "支付宝+贝";
      } else if (status === 10) {
        return "购物劵";
      } else if (status === 11) {
        return "支付宝+购物劵";
      } else if (status === 12) {
        return "微信+购物劵";
      } else if (status === 13) {
        return "搜了付";
      }
    },
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
      this.getList();
    },
    handleSearchList() {
      if (this.listQuery.create_time) {
        this.listQuery.beginTm = this.listQuery.create_time[0];
        this.listQuery.endTm = this.listQuery.create_time[1];
      }
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
    handleRecommendStatusStatusChange(index, row) {
      this.updateRecommendStatusStatus(row.id, row.recommendStatus);
    },
    handleDelete(index, row) {
      this.deleteProduct(row.id);
    },

    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        console.log(response, "res");
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    payState(state) {
      if (state == 0) {
        return "支付失败";
      } else if (state == 1) {
        return "支付成功";
      } else if (state == 2) {
        return "待支付";
      } else if (state == 3) {
        return "线下已付款";
      } else {
        return "申请售后";
      }
    },
  },
};
</script>
<style>
</style>


