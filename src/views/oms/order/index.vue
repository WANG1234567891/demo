<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <download-excel
          class="excel down-excel"
          :data="tableData"
          :fields="json_fields"
          :name="excelName"
        >
          <el-button size="small" type="primary" @click="showExcel">导出Excel表格</el-button>
        </download-excel>
        <!-- <el-button class="excel" size="small" type="primary" @click="outputExcel">导出Excel表格</el-button> -->
        <el-button
          style="float:right;margin-top: 30px"
          @click="handleResetSearch()"
          size="small"
        >重置</el-button>
        <el-button
          style="float:right;margin-top: 30px;margin-right:15px;"
          type="primary"
          @click="handleSearchList"
          size="small"
        >查询搜索</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="主订单编号：">
            <el-input v-model="listQuery.orderNumber" class="input-width" placeholder="主订单编号"></el-input>
          </el-form-item>
          <el-form-item label="订单编号：">
            <el-input v-model="listQuery.subOrderNumber" class="input-width" placeholder="订单编号"></el-input>
          </el-form-item>
          <el-form-item label="商品名称：">
            <el-input v-model="listQuery.productName" class="input-width" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="店铺名称：">
            <el-input v-model="listQuery.shopName" class="input-width" placeholder="店铺名称"></el-input>
          </el-form-item>
          <el-form-item label="收货人：">
            <el-input v-model="listQuery.receiver" class="input-width" placeholder="收货人"></el-input>
          </el-form-item>
          <el-form-item label="会员ID：">
            <el-input v-model="listQuery.userId" class="input-width" placeholder="搜了宝ID"></el-input>
          </el-form-item>
          <el-form-item label="创建时间：">
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
          <el-form-item label="支付状态：">
            <el-select
              v-model="listQuery.paymentState"
              class="input-width"
              placeholder="全部"
              clearable
            >
              <el-option
                v-for="item in statusOptions"
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
        ref="orderTable"
        :data="list"
        style="width: 100%;"
        height="42rem"
        v-loading="listLoading"
        border
      >
        <el-table-column label="主订单编号" align="center">
          <template slot-scope="scope">{{scope.row.orderNumber}}</template>
        </el-table-column>
        <el-table-column label="订单编号" align="center">
          <template slot-scope="scope">{{scope.row.serial_number}}</template>
        </el-table-column>
        <el-table-column label="订单状态" align="center">
          <template slot-scope="scope">{{formatPaymentState(scope.row.payment_state)}}</template>
        </el-table-column>
        <el-table-column label="支付方式" align="center">
          <template slot-scope="scope">{{formatPaymentChannel(scope.row.payment_channel)}}</template>
        </el-table-column>
        <el-table-column label="会员ID" align="center">
          <template slot-scope="scope">{{scope.row.user_id}}</template>
        </el-table-column>
        <el-table-column label="店铺名称" align="center">
          <template slot-scope="scope">{{scope.row.shopName}}</template>
        </el-table-column>
        <el-table-column label="收货人" align="center">
          <template slot-scope="scope">{{scope.row.consigneeName}}</template>
        </el-table-column>
        <el-table-column label="收货地址" align="center">
          <template
            slot-scope="scope"
          >{{scope.row.province}} {{scope.row.city}} {{scope.row.county}} {{scope.row.detailed}}</template>
        </el-table-column>
        <el-table-column label="现金总价" align="center">
          <template slot-scope="scope">{{scope.row.total_amount}}</template>
        </el-table-column>
        <el-table-column label="和平村购物券" width="105" align="center">
          <template slot-scope="scope">{{scope.row.total_gwj}}</template>
        </el-table-column>
        <el-table-column label="一号专区" align="center">
          <template slot-scope="scope">{{formatOneType(scope.row.one_type)}}</template>
        </el-table-column>
        <el-table-column label="支付时间" align="center">
          <template slot-scope="scope">{{scope.row.pay_time }}</template>
        </el-table-column>
        <el-table-column label="发货时间" align="center">
          <template slot-scope="scope">{{scope.row.shipping_time }}</template>
        </el-table-column>
        <el-table-column label="确认收货时间" width="105" align="center">
          <template slot-scope="scope">{{scope.row.confirm_receipt_time}}</template>
        </el-table-column>
        <el-table-column label="订单创建时间"  width="105" align="center">
          <template slot-scope="scope">{{scope.row.create_time }}</template>
        </el-table-column>

        <el-table-column label="操作" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleViewOrder(scope.$index, scope.row)">查看订单</el-button>
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
    <el-dialog title="关闭订单" :visible.sync="closeOrder.dialogVisible" width="30%">
      <span style="vertical-align: top">操作备注：</span>
      <el-input
        style="width: 80%"
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="closeOrder.content"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeOrder.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCloseOrderConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog>
  </div>
</template>
<script>
import { fetchList } from "@/api/oms/order";
import { exportExcel } from "@/api/oms/order";
import { formatDate } from "@/utils/date";
import LogisticsDialog from "@/views/oms/order/components/logisticsDialog";
import axios from "axios";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  orderNumber: null,
  subOrderNumber: null,
  productName: null,
  shopName: null,
  receiver: null,
  userId: null,
  paymentState: null,
  create_time: null,
};
export default {
  name: "orderList",
  components: { LogisticsDialog },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
      operateType: null,
      multipleSelection: [],
      closeOrder: {
        dialogVisible: false,
        content: null,
        orderIds: [],
      },
      //报表名称
      excelName: "表单",
      //数据列表
      tableData: [],
      //导出的列的key和名称
      json_fields: {
        城市: "city",
        主订单编号: "orderNumber",
        订单编号: "serial_number",
        订单状态: "payment_state",
        支付方式: "payment_channel",
        会员ID: "user_id",
        店铺名称: "shopName",
        收货人: "consigneeName",
        现金总价: "total_amount",
        总数量: "total_amount",
        和平村购物券: "total_gwj",
        一号专区: "one_type",
        支付时间: "pay_time",
        发货时间: "shipping_time",
        确认收货时间: "confirm_receipt_time",
        订单创建时间: "create_time",
        区域: "county",
        地点: "detailed",
        一号专区: "one_type",
      },

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

      statusOptions: [
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
      logisticsDialogVisible: false,
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    // var d = new Date();
    // var n = d.getTime();
    const endDate = this.getFormatDate(new Date()).substr(0, 11) + "23:59:59";
    const beginDate =
      this.getFormatDate(new Date(new Date() - 3600 * 1000 * 24 * 29)).substr(
        0,
        11
      ) + "00:00:00";
    console.log("开始:", beginDate, "结束:", endDate);
    // this.listQuery.create_time[0] = beginDate;
    // this.listQuery.create_time[1] = endDate;
    this.listQuery.create_time = [beginDate, endDate];
    console.log(this.listQuery.create_time, "lls");
    this.listQuery.createTimeBegin = beginDate;
    this.listQuery.createTimeEnd = endDate;
    // this.getList();
  },

  filters: {
    formatCreateTime(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
    getFormatDate(date) {
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentDate =
        date.getFullYear() +
        "-" +
        month +
        "-" +
        strDate +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();
      return currentDate;
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
      this.getList();
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleViewOrder(index, row) {
      this.$router.push({ path: "/oms/orderDetail", query: { id: row.id } });
    },
    formatPaymentState(value) {
      if (value === 0) {
        return "支付失败";
      } else if (value === 1) {
        return "支付成功";
      } else if (value === 2) {
        return "待支付";
      } else if (value === 3) {
        return "线下已付款";
      } else if (value === 102) {
        return "申请售后";
      } else {
        return "未知";
      }
    },
    formatPaymentChannel(value) {
      if (value === 1) {
        return "微信";
      } else if (value === 2) {
        return "支付宝";
      } else if (value === 3) {
        return "paypal";
      } else if (value === 4) {
        return "积分兑换";
      } else if (value === 5) {
        return "线下付款";
      } else if (value === 6) {
        return "微信+积分";
      } else if (value === 7) {
        return "支付宝+积分";
      } else if (value === 8) {
        return "微信+贝";
      } else if (value === 9) {
        return "支付宝+贝";
      } else if (value === 10) {
        return "购物劵";
      } else if (value === 11) {
        return "支付宝+购物劵";
      } else if (value === 12) {
        return "微信+购物劵";
      } else if (value === 13) {
        return "搜了付";
      } else {
        return "未知";
      }
    },
    formatOneType(value) {
      if (value === 0) {
        return "不是";
      } else if (value === 1) {
        return "1号专区订单";
      } else {
        return "未知";
      }
    },

    //查询
    handleSearchList() {
      if (this.listQuery.create_time) {
        let newData = {
          pageNum: this.listQuery.pageNum,
          pageSize: this.listQuery.pageSize,
          orderNumber: this.listQuery.orderNumber,
          subOrderNumber: this.listQuery.subOrderNumber,
          productName: this.listQuery.productName,
          shopName: this.listQuery.shopName,
          receiver: this.listQuery.receiver,
          userId: this.listQuery.userId,
          paymentState: this.listQuery.paymentState,
          createTimeBegin: this.listQuery.create_time[0], //创建开始时间
          createTimeEnd: this.listQuery.create_time[1], //创建结束时间
        };
        fetchList(newData).then((response) => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      } else {
        let newData = {
          pageNum: this.listQuery.pageNum,
          pageSize: this.listQuery.pageSize,
          orderNumber: this.listQuery.orderNumber,
          subOrderNumber: this.listQuery.subOrderNumber,
          productName: this.listQuery.productName,
          shopName: this.listQuery.shopName,
          receiver: this.listQuery.receiver,
          userId: this.listQuery.userId,
          paymentState: this.listQuery.paymentState,
        };
        fetchList(newData).then((response) => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      }
    },

    // handleBatchOperate(){
    //   if(this.multipleSelection==null||this.multipleSelection.length<1){
    //     this.$message({
    //       message: '请选择要操作的订单',
    //       type: 'warning',
    //       duration: 1000
    //     });
    //     return;
    //   }
    //   if(this.operateType===1){
    //     //批量发货
    //     let list=[];
    //     for(let i=0;i<this.multipleSelection.length;i++){
    //       if(this.multipleSelection[i].status===1){
    //         list.push(this.covertOrder(this.multipleSelection[i]));
    //       }
    //     }
    //     if(list.length===0){
    //       this.$message({
    //         message: '选中订单中没有可以发货的订单',
    //         type: 'warning',
    //         duration: 1000
    //       });
    //       return;
    //     }
    //     this.$router.push({path:'/oms/deliverOrderList',query:{list:list}})
    //   }else if(this.operateType===2){
    //     //关闭订单
    //     this.closeOrder.orderIds=[];
    //     for(let i=0;i<this.multipleSelection.length;i++){
    //       this.closeOrder.orderIds.push(this.multipleSelection[i].id);
    //     }
    //     this.closeOrder.dialogVisible=true;
    //   }else if(this.operateType===3){
    //     //删除订单
    //     let ids=[];
    //     for(let i=0;i<this.multipleSelection.length;i++){
    //       ids.push(this.multipleSelection[i].id);
    //     }
    //     this.deleteOrder(ids);
    //   }
    // },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleCloseOrderConfirm() {},
    // handleCloseOrderConfirm() {
    //   if (this.closeOrder.content == null || this.closeOrder.content === '') {
    //     this.$message({
    //       message: '操作备注不能为空',
    //       type: 'warning',
    //       duration: 1000
    //     });
    //     return;
    //   }
    //   let params = new URLSearchParams();
    //   params.append('ids', this.closeOrder.orderIds);
    //   params.append('note', this.closeOrder.content);
    //   closeOrder(params).then(response=>{
    //     this.closeOrder.orderIds=[];
    //     this.closeOrder.dialogVisible=false;
    //     this.getList();
    //     this.$message({
    //       message: '修改成功',
    //       type: 'success',
    //       duration: 1000
    //     });
    //   });
    // },
    // 导出为excel文件
    // outputExcel() {
    //   // let data=`?createTimeBegin=2021-04-22&createTimeEnd=2021-04-29`
    //   let createTimeBegin = "2021-04-22 12:12:12";
    //   let createTimeEnd = "2021-04-29 12:12:12";
    //   exportExcel({ createTimeBegin, createTimeEnd }).then((res) => {
    //     console.log(res);
    //     let reader = new FileReader();
    //     // reader.readAsDataURL(res);  //转换为base64，可以直接放入a标签href   接受的数据一定要配置responseType: blob
    //     reader.readAsDataURL(res);
    //     reader.onload = function (e) {
    //       let a = document.createElement("a");
    //       a.href = e.target.result;
    //       // a.href = data;
    //       a.download = ""; //此处填写文件地址
    //       console.log(a.href);
    //       document.body.appendChild(a); // 修复firefox中无法触发click
    //       a.click();
    //       document.body.removeChild(a);
    //     };
    //   });
    // },

    showExcel(event) {
      let that = this;
      event.stopPropagation();
      let orderNumber = this.listQuery.orderNumber;
      let subOrderNumber = this.listQuery.subOrderNumber;
      let productName = this.listQuery.productName;
      let shopName = this.listQuery.shopName;
      let receiver = this.listQuery.receiver;
      let userId = this.listQuery.userId;
      let paymentState = this.listQuery.paymentState;
      let createTimeBegin = this.listQuery.create_time[0];
      let createTimeEnd = this.listQuery.create_time[1];
      exportExcel({
        orderNumber,
        subOrderNumber,
        productName,
        shopName,
        receiver,
        userId,
        paymentState,
        createTimeBegin,
        createTimeEnd,
      })
        .then((res) => {
          console.log(res.data);
          let data = res.data;
          data.forEach((item) => {
            // console.log( item.payment_state)
            item.payment_state = that.formatPaymentState(item.payment_state);
            item.payment_channel = that.formatPaymentChannel(
              item.payment_channel
            );
            item.one_type = that.formatOneType(item.one_type);
          });
          this.tableData = data;
        })
        .then(() => {
          let excel = document.getElementsByClassName("down-excel")[0];
          console.log(excel);
          excel.click();
          this.$message({
            type: "success",
            message: "表格生成成功",
            center: true,
            duration: 2000,
          });
        })
        .catch((err) => {
          this.$message.error("表格生成失败！");
        });
    },

    // 导出为excel文件
    // outputExcel() {
    //   // let data=`?createTimeBegin=2021-04-22&createTimeEnd=2021-04-29`
    //   let orderNumber=this.listQuery.orderNumber
    //   let subOrderNumber=this.listQuery.subOrderNumber
    //   let productName=this.listQuery.productName
    //   let shopName=this.listQuery.shopName
    //   let receiver=this.listQuery.receiver
    //   let userId=this.listQuery.userId
    //   let paymentState=this.listQuery.paymentState
    //   let createTimeBegin =this.listQuery.create_time[0];
    //   // console.log(typeof(this.listQuery.create_time[0]))
    //   let createTimeEnd = this.listQuery.create_time[1];
    //   axios({
    //     method: "post",
    //     url: "http://192.168.9.63:7010/slOrder/pageToExcel",
    //     data: {orderNumber,subOrderNumber,productName, shopName,userId,paymentState,createTimeBegin, createTimeEnd,receiver },
    //     responseType: "blob",
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       let reader = new FileReader();
    //       // reader.readAsDataURL(res);  //转换为base64，可以直接放入a标签href   接受的数据一定要配置responseType: blob
    //       reader.readAsDataURL(res.data);
    //       reader.onload = function (e) {
    //         let a = document.createElement("a");
    //         a.href = e.target.result;
    //         // a.href = data;
    //         a.download = "档案"; //此处填写文件地址
    //         // console.log(a.href);
    //         document.body.appendChild(a); // 修复firefox中无法触发click
    //         a.click();
    //         document.body.removeChild(a);
    //       };
    //     });
    // },

    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    // deleteOrder(ids){
    //   this.$confirm('是否要进行该删除操作?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     let params = new URLSearchParams();
    //     params.append("ids",ids);
    //     deleteOrder(params).then(response=>{
    //       this.$message({
    //         message: '删除成功！',
    //         type: 'success',
    //         duration: 1000
    //       });
    //       this.getList();
    //     });
    //   })
    // },
    covertOrder(order) {
      let address =
        order.receiverProvince +
        order.receiverCity +
        order.receiverRegion +
        order.receiverDetailAddress;
      let listItem = {
        orderId: order.id,
        orderSn: order.orderSn,
        receiverName: order.receiverName,
        receiverPhone: order.receiverPhone,
        receiverPostCode: order.receiverPostCode,
        address: address,
        deliveryCompany: null,
        deliverySn: null,
      };
      return listItem;
    },
  },
};
</script>
<style scoped>
.input-width {
  width: 203px;
}
.el-button {
  letter-spacing: 1px;
}
.excel {
  float: right;
  margin-left: 15px;
  margin-top: 30px;
}

</style>


