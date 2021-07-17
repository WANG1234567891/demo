<template>
  <div class="detail-container">
    <el-card shadow="never">
      <span>订单序列号{{ order.order.refundNum }}的详情</span>
    </el-card>

    <el-card shadow="never" style="margin-top: 15px">
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="3" class="table-cell-title">订单编号</el-col>
          <el-col :span="9" class="table-cell-title">商品名称</el-col>
          <el-col :span="3" class="table-cell-title">数量</el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="table-cell">
            {{
            order.order.refundNum
            }}
          </el-col>
          <el-col :span="9" class="table-cell">
            {{
            order.orderDetail[0].productName
            }}
          </el-col>
          <el-col :span="3" class="table-cell">
            {{
            order.orderDetail[0].quantity
            }}
          </el-col>

          <!-- <el-col :span="3" class="table-cell">{{order.orderDetailList[0].postFee}}</el-col>  -->
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">退款原因</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="5" class="table-cell-title">退款人联系号码</el-col>
          <el-col :span="3" class="table-cell-title">退款原因</el-col>
          <el-col :span="3" class="table-cell-title">申请退款金额</el-col>
          <el-col :span="5" class="table-cell-title">退款详细说明</el-col>
          <el-col :span="3" class="table-cell-title">退款图片</el-col>
        </el-row>
        <el-row>
          <el-col :span="5" class="table-cell">{{ order.order.phone }}</el-col>
          <el-col :span="3" class="table-cell">{{ order.order.reason }}</el-col>
          <el-col :span="3" class="table-cell">
            {{
            order.order.agreementRefund
            }}
          </el-col>
          <el-col :span="5" class="table-cell">
            {{
            order.order.reasonDetail
            }}
          </el-col>
          <el-col :span="3" class="table-cell">
            <img
              :src="order.orderDetail[0].productImageUrl"
              width="40"
              height="40"
              class="head_pic"
            />
          </el-col>
        </el-row>
      </div>

      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">商家审核意思</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="5" class="table-cell-title">商家审核意见</el-col>
          <el-col :span="5" class="table-cell-title">商家审核</el-col>
          <el-col :span="5" class="table-cell-title">商家审核时间</el-col>
        </el-row>
        <el-row>
          <el-col :span="5" class="table-cell">
            {{
            order.order.businessCheckDetail
            }}
          </el-col>
          <el-col :span="5" class="table-cell">
            <div v-if="order.order.businessCheckState == 0">未审核</div>
            <div v-else-if="order.order.businessCheckState == 1">同意</div>
            <div v-else-if="order.order.businessCheckState == 2">不同意</div>
            <div v-else-if="order.order.businessCheckState == 3">同意但修改金额</div>
          </el-col>
          <el-col :span="5" class="table-cell">
            {{
            order.order.businessCheckTime
            }}
          </el-col>
        </el-row>
      </div>

      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">客户处理</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="5" class="table-cell-title">客服审核意见</el-col>
          <el-col :span="5" class="table-cell-title">客服审核</el-col>
        </el-row>
        <el-row>
          <el-col :span="5" class="table-cell">
            <el-input v-model="serviceCheckDetail"></el-input>
          </el-col>
          <el-col :span="5" class="table-cell">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-button class="sub-button" @click="submit()">提交</el-button>
      </div>
    </el-card>

    <logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog>
  </div>
</template>
<script>
import { getRefundOrderDetail } from "@/api/oms/order";
import { createOrderSetting } from "@/api/oms/orderSetting";
import LogisticsDialog from "@/views/oms/order/components/logisticsDialog";
import { formatDate } from "@/utils/date";
import VDistpicker from "v-distpicker";
const defaultReceiverInfo = {
  orderId: null,
  receiverName: null,
  receiverPhone: null,
  receiverPostCode: null,
  receiverDetailAddress: null,
  receiverProvince: null,
  receiverCity: null,
  receiverRegion: null,
  status: null,
};
const updateListQuery = {
  businessCheckState: null,
  id: null,
  serviceCheckDetail: null,
  serviceCheckState: null,
};
export default {
  name: "orderDetail",
  components: { VDistpicker, LogisticsDialog },

  data() {
    return {
      updateQuery: Object.assign({}, updateListQuery),
      options: [
        {
          value: "0",
          label: "未审核",
        },
        {
          value: "1",
          label: "同意",
        },
        {
          value: "2",
          label: "不同意",
        },
        {
          value: "3",
          label: "同意但修改金额",
        },
      ],
      value: "",
      serviceCheckDetail: "",
      id: null,
      order: {},
      oorderDetail: [{}],
      receiverDialogVisible: false,
      receiverInfo: Object.assign({}, defaultReceiverInfo),
      moneyDialogVisible: false,
      moneyInfo: {
        orderId: null,
        freightAmount: 0,
        discountAmount: 0,
        status: null,
      },
      messageDialogVisible: false,
      message: { title: null, content: null },
      closeDialogVisible: false,
      closeInfo: { note: null, id: null },
      markOrderDialogVisible: false,
      markInfo: { note: null },
      logisticsDialogVisible: false,
    };
  },
  created() {
    this.id = this.list = this.$route.query.id;
    getRefundOrderDetail(this.id).then((response) => {
      this.order = response.data;
    });
  },
  filters: {
    formatpaymentState(value) {
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

    formatNull(value) {
      if (value === undefined || value === null || value === "") {
        return "暂无";
      } else {
        return value;
      }
    },
    formatLongText(value) {
      if (value === undefined || value === null || value === "") {
        return "暂无";
      } else if (value.length > 8) {
        return value.substr(0, 8) + "...";
      } else {
        return value;
      }
    },
    formatPayType(value) {
      if (value === 1) {
        return "支付宝";
      } else if (value === 2) {
        return "微信";
      } else {
        return "未支付";
      }
    },

    formatAddress(order) {
      let str = order.receiverProvince;
      if (order.receiverCity != null) {
        str += "  " + order.receiverCity;
      }
      str += "  " + order.receiverRegion;
      str += "  " + order.receiverDetailAddress;
      return str;
    },
    formatStatus(value) {
      if (value === 1) {
        return "待发货";
      } else if (value === 2) {
        return "已发货";
      } else if (value === 3) {
        return "已完成";
      } else if (value === 4) {
        return "已关闭";
      } else if (value === 5) {
        return "无效订单";
      } else {
        return "待付款";
      }
    },
    formatPayStatus(value) {
      if (value === 0) {
        return "未支付";
      } else if (value === 4) {
        return "已退款";
      } else {
        return "已支付";
      }
    },
    formatDeliverStatus(value) {
      if (value === 0 || value === 1) {
        return "未发货";
      } else {
        return "已发货";
      }
    },
    formatProductAttr(value) {
      if (value == null) {
        return "";
      } else {
        let attr = JSON.parse(value);
        let result = "";
        for (let i = 0; i < attr.length; i++) {
          result += attr[i].key;
          result += ":";
          result += attr[i].value;
          result += ";";
        }
        return result;
      }
    },
  },
  methods: {
    submit() {
      this.updateQuery.serviceCheckDetail = this.serviceCheckDetail;
      this.updateQuery.id = this.id;
      this.updateQuery.serviceCheckState = this.value;
      this.updateQuery.businessCheckState = this.order.order.businessCheckState;
      console.log("执行");
      createOrderSetting(this.updateQuery).then((response) => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: "success",
            duration: 1000,
          });

          this.$router.back();
        } else {
          this.$message({
            message:"操作失败！"
          })
        }
      });
    },
    onSelectRegion(data) {
      this.receiverInfo.receiverProvince = data.province.value;
      this.receiverInfo.receiverCity = data.city.value;
      this.receiverInfo.receiverRegion = data.area.value;
    },
    formatTime(time) {
      if (time == null || time === "") {
        return "";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatStepStatus(value) {
      if (value === 1) {
        //待发货
        return 2;
      } else if (value === 2) {
        //已发货
        return 3;
      } else if (value === 3) {
        //已完成
        return 4;
      } else {
        //待付款、已关闭、无限订单
        return 1;
      }
    },
    showUpdateReceiverDialog() {
      this.receiverDialogVisible = true;
      this.receiverInfo = {
        orderId: this.order.id,
        receiverName: this.order.receiverName,
        receiverPhone: this.order.receiverPhone,
        receiverPostCode: this.order.receiverPostCode,
        receiverDetailAddress: this.order.receiverDetailAddress,
        receiverProvince: this.order.receiverProvince,
        receiverCity: this.order.receiverCity,
        receiverRegion: this.order.receiverRegion,
        status: this.order.status,
      };
    },

    showUpdateMoneyDialog() {
      this.moneyDialogVisible = true;
      this.moneyInfo.orderId = this.order.id;
      this.moneyInfo.freightAmount = this.order.freightAmount;
      this.moneyInfo.discountAmount = this.order.discountAmount;
      this.moneyInfo.status = this.order.status;
    },

    showMessageDialog() {
      this.messageDialogVisible = true;
      this.message.title = null;
      this.message.content = null;
    },
    // handleSendMessage(){
    //   this.$confirm('是否要发送站内信?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.messageDialogVisible=false;
    //     this.$message({
    //       type: 'success',
    //       message: '发送成功!'
    //     });
    //   });
    // },
    showCloseOrderDialog() {
      this.closeDialogVisible = true;
      this.closeInfo.note = null;
      this.closeInfo.id = this.id;
    },
    // handleCloseOrder(){
    //   this.$confirm('是否要关闭?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //       let params = new URLSearchParams();
    //       params.append("ids",[this.closeInfo.id]);
    //       params.append("note",this.closeInfo.note);
    //       closeOrder(params).then(response=>{
    //         this.closeDialogVisible=false;
    //         this.$message({
    //           type: 'success',
    //           message: '订单关闭成功!'
    //         });
    //         getOrderDetail(this.id).then(response => {
    //           this.order = response.data;
    //         });
    //       });
    //   });
    // },
    showMarkOrderDialog() {
      this.markOrderDialogVisible = true;
      this.markInfo.id = this.id;
      this.closeOrder.note = null;
    },
    // handleMarkOrder(){
    //   this.$confirm('是否要备注订单?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     let params = new URLSearchParams();
    //     params.append("id",this.markInfo.id);
    //     params.append("note",this.markInfo.note);
    //     params.append("status",this.order.status);
    //     updateOrderNote(params).then(response=>{
    //       this.markOrderDialogVisible=false;
    //       this.$message({
    //         type: 'success',
    //         message: '订单备注成功!'
    //       });
    //       getOrderDetail(this.id).then(response => {
    //         this.order = response.data;
    //       });
    //     });
    //   });
    // },
  },
};
</script>
<style scoped>
.sub-button {
  font-size: 12px;
  color: #fff;
  background: #6588eb;
  padding: 10px 10px 10px 10px;
  text-align: center;
  margin: 60px;
  width: 60px;
}
.detail-container {
  width: 80%;
  padding: 20px 20px 20px 20px;
  margin: 20px auto;
}

.operate-container {
  background: #f2f6fc;
  height: 80px;
  margin: -20px -20px 0;
  line-height: 80px;
}

.operate-button-container {
  float: right;
  margin-right: 20px;
}

.table-layout {
  margin-top: 20px;
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
}

.table-cell {
  height: 60px;
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 15px 10px 10px 10px;
  font-size: 14px;
  color: #606266;
  text-align: center;
  word-break: break-all;
}
.table-row {
  font-size: 80px;
  font-style: inherit;
  height: 60px;
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 15px 10px 10px 10px;
  font-size: 14px;
  color: #606266;
  text-align: center;
  word-break: break-all;
}
.table-cell-title {
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  background: #f2f6fc;
  text-align: center;
  font-size: 14px;
  color: #303133;
}
</style>


