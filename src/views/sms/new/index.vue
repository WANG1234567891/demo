<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right; margin-right: 15px; margin-top: 30px"
          @click="handleResetSearch()"
          size="small"
        >重置</el-button>
        <el-button
          style="float: right; margin-top: 30px;margin-right:15px;"
          type="primary"
          @click="handleSearchList()"
          size="small"
        >查询搜索</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="店铺名称：">
            <el-input v-model="listQuery.shopName" class="input-width" placeholder="店铺名称"></el-input>
          </el-form-item>
          <el-form-item label="店铺ID：">
            <el-input v-model="listQuery.shopId" class="input-width" placeholder="店铺ID"></el-input>
          </el-form-item>
          <el-form-item label="主订单编号：">
            <el-input v-model="listQuery.mainOrderNum" class="input-width" placeholder="主订单编号"></el-input>
          </el-form-item>
          <el-form-item label="订单编号：">
            <el-input v-model="listQuery.orderNum" class="input-width" placeholder="订单编号"></el-input>
          </el-form-item>
          <el-form-item label="支付状态：">
            <el-select
              v-model="listQuery.paySts"
              placeholder="全部"
              clearable
              class="input-width"
              style="width:201px;"
            >
              <el-option
                v-for="item in recommendOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否一号专区：">
            <el-select
              v-model="listQuery.isOneType"
              placeholder="全部"
              clearable
              class="input-width"
              style="width:201px;"
            >
              <el-option
                v-for="item in zoneOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间类型：">
            <el-select
              v-model="listQuery.timeFlg"
              placeholder="全部"
              clearable
              style="width:202px;margin-right:20px;"
              class="input-width"
              @change="timeFlgChange()"
            >
              <el-option
                v-for="item in timeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-date-picker
              v-model="listQuery.create_time"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right"
              :disabled="listQuery.disabled"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <div class="table-container">
      <el-table
        :data="list"
        style="width: 100%"
        border
        height="45rem"
        v-loading="listLoading"
        @expand-change="expandChange"
        :row-key="getRowKeys"
        :expand-row-keys="expands"
      >
        >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table border :data="tableDataInfo" v-loading="listLoading" style="width: 100%">
              <el-table-column width="200px" label="店铺名称" prop="proName" align="center"></el-table-column>
              <el-table-column width="200px" label="数量" prop="proNum" align="center"></el-table-column>
              <el-table-column width="200px" label="单个商品价格" prop="proPrice" align="center"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="店铺名称" prop="shopName" align="center"></el-table-column>
        <el-table-column label="店铺ID" prop="shopId" align="center"></el-table-column>
        <el-table-column label="店铺所有者ID" prop="shopUid" align="center"></el-table-column>
        <el-table-column label="主订单号" prop="orderNumber" align="center"></el-table-column>
        <el-table-column label="订单ID" prop="orderId" align="center"></el-table-column>
        <el-table-column label="订单编号" prop="serialNumber" align="center"></el-table-column>
        <el-table-column label="是否为一号专区" align="center">
          <template slot-scope="scope">
            {{
            scope.row.oneType | oneType
            }}
          </template>
        </el-table-column>
        <el-table-column label="订单总金额" prop="total" align="center"></el-table-column>
        <el-table-column label="用户实付款" prop="totalAmount" align="center"></el-table-column>
        <el-table-column label="国甄购物卷" prop="totalGzGwj" align="center"></el-table-column>
        <el-table-column label="和平村购物卷" prop="totalGwj" align="center"></el-table-column>
        <el-table-column label="现金换成收益" prop="totalTc" align="center"></el-table-column>
        <el-table-column label="购物卷换成收益" prop="totalGwjTc" align="center"></el-table-column>
        <el-table-column label="支付状态" align="center">
          <template slot-scope="scope">
            {{
            scope.row.paymentState | paymentState
            }}
          </template>
        </el-table-column>
        <el-table-column label="支付方式" align="center">
          <template slot-scope="scope">
            {{
            scope.row.paymentChannel | paymentChannel
            }}
          </template>
        </el-table-column>
        <el-table-column label="购买人ID" prop="userId" align="center"></el-table-column>
        <el-table-column label="收货人姓名" prop="consigneeName" align="center"></el-table-column>
        <el-table-column label="收货人电话" prop="consigneePhone" align="center"></el-table-column>
        <el-table-column label="收货人地址" width="70" prop="detailed" align="center"></el-table-column>
        <el-table-column label="下单时间" width="155px" prop="createTime" align="center"></el-table-column>
        <el-table-column label="收货时间" width="155px" prop="confirmReceiptTime" align="center"></el-table-column>
        <el-table-column label="支付时间" width="155px" prop="payTime" align="center"></el-table-column>
      </el-table>
    </div>

    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5, 10, 15]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { fetchList, slShopMgStatus } from "@/api/sms/newProduct";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  shopName: null,
  shopId: null,
  timeFlg: null,
  mainOrderNum: null,
  orderNum: null,
  paySts: null,
  create_time: null,
  disabled: true,
  beginTm: '2019-05-01 00:00:00',
  endTm: '2021-06-02 00:00:00',
  isOneType: null,
};
export default {
  name: "newProductList",
  data() {
    return {
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
      listQuery: Object.assign({}, defaultListQuery),
      list: [],
      tableDataInfo: [],
      total: 0,
      expands: [], //只展开一行放入当前行id
      getRowKeys: (row) => {
        //获取当前行id
        return row.serialNumber; //这里看这一行中需要根据哪个属性值是id
      },
      listLoading: false,
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
      timeOptions: [
        {
          value: "1",
          label: "创建时间",
        },
        {
          value: "2",
          label: "支付时间",
        },
        {
          value: "3",
          label: "收货时间",
        },
      ],
      recommendOptions: [
        {
          value: "1",
          label: "支付成功",
        },
        {
          value: "2",
          label: "待支付",
        },
        {
          value: "3",
          label: "线下已付款",
        },
        {
          value: "102",
          label: "申请售后",
        },
      ],
    };
  },
  created() {
    this.getList();
  },
  filters: {
    paymentChannel(status) {
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
    paymentState(status) {
      if (status === 0) {
        return "支付失败";
      } else if (status === 1) {
        return "支付成功";
      } else if (status === 2) {
        return "待支付";
      } else if (status === 3) {
        return "线下已付款";
      } else if (status === 102) {
        return "申请售后";
      }
    },
    oneType(status) {
      if (status === 0) {
        return "不是";
      } else if (status === 1) {
        return "是";
      } else {
        return "不是";
      }
    },
  },
  methods: {
    timeFlgChange() {
      if (this.listQuery.timeFlg) {
        this.listQuery.disabled = false;
      } else {
        this.listQuery.disabled = true;
      }
    },
    expandChange(row, expandedRows) {
      var that = this;
      if (expandedRows) {
        let newData = new FormData();
        newData.append("orderNum", row.serialNumber);
        slShopMgStatus(newData).then((response) => {
          if (response.code == 200) {
            this.tableDataInfo = response.data;
          } else {
            this.tableDataInfo = [];
          }
        });
      }
      if (expandedRows.length !== 0) {
        // 只展开一行//说明展开了
        that.expands = [];
        if (row) {
          that.expands.push(row.serialNumber); // 只展开当前行id
        }
      } else {
        // 说明收起了
        that.expands = [];
      }
    },
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
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        if (response.code == 200) {
          //let {msg}=response;
          // this.$message.info(msg);
          this.$message({
            message: response.msg,
            type: "success",
            duration: 1000,
          });
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        }else{
          this.$message({
            message:"请输入关键字或时间查询！",
            type:"warning",
            duration:1000
          })
        }
        this.listLoading=false
      });
    },
  },
};
</script>
<style>
</style>
