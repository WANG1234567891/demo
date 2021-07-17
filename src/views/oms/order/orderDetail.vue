<template> 
  <div class="detail-container">
    
    <el-card shadow="never" style="margin-top: 15px">
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="3" class="table-cell-title">订单编号</el-col>
          <el-col :span="3" class="table-cell-title">订单状态</el-col>
          <el-col :span="3" class="table-cell-title">收件人姓名</el-col>
          <el-col :span="3" class="table-cell-title">收件人电话</el-col>
          <el-col :span="3" class="table-cell-title">店铺名称</el-col>
          <el-col :span="3" class="table-cell-title">现金总价</el-col>
          <el-col :span="3" class="table-cell-title">购物券</el-col>
          <el-col :span="3" class="table-cell-title">邮费</el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="table-cell">{{order.order.serialNumber}}</el-col>
          <el-col :span="3" class="table-cell">{{order.order.paymentState | formatpaymentState}}</el-col>
          <el-col :span="3" class="table-cell">{{order.order.consigneename }}</el-col>
          <el-col :span="3" class="table-cell">{{order.order.consigneephone }}</el-col>
          <el-col :span="3" class="table-cell">{{order.shop.name}}</el-col>
          <el-col :span="3" class="table-cell">{{order.order.totalAmount}}</el-col>
          <el-col :span="3" class="table-cell">{{order.order.totalGwj}}</el-col>
          <el-col :span="3" class="table-cell">{{order.orderDetailList[0].postFee}}</el-col>
        </el-row>
       
      </div>
      
      
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">商品信息</span>
      </div>
      <el-table
        ref="orderItemTable"
        :data="order.orderDetailList"
        style="width: 100%;margin-top: 20px" border>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.productName}}</p>
             <p>规格:  {{scope.row.productDetailGroupName}}</p>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.quantity}}
          </template>
        </el-table-column>
        <el-table-column label="单价" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.price}}
          </template>
        </el-table-column>
        <el-table-column label="小计" width="120" align="center">
          <template slot-scope="scope">
             {{scope.row.price*scope.row.quantity}}
          </template>
        </el-table-column>
      </el-table>
    
    </el-card>

    <logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog>
  </div>
</template>
<script>
  import {getOrderDetail} from '@/api/oms/order';
  import LogisticsDialog from '@/views/oms/order/components/logisticsDialog';
  import {formatDate} from '@/utils/date';
  import VDistpicker from 'v-distpicker';
  const defaultReceiverInfo = {
    orderId:null,
    receiverName:null,
    receiverPhone:null,
    receiverPostCode:null,
    receiverDetailAddress:null,
    receiverProvince:null,
    receiverCity:null,
    receiverRegion:null,
    status:null
  };
  export default {
    name: 'orderDetail',
    components: { VDistpicker, LogisticsDialog},
    data() {
      return {
        id: null,
        order: {},
        receiverDialogVisible:false,
        receiverInfo:Object.assign({},defaultReceiverInfo),
        moneyDialogVisible:false,
        moneyInfo:{orderId:null, freightAmount:0, discountAmount:0,status:null},
        messageDialogVisible:false,
        message: {title:null, content:null},
        closeDialogVisible:false,
        closeInfo:{note:null,id:null},
        markOrderDialogVisible:false,
        markInfo:{note:null},
        logisticsDialogVisible:false
      }
    },
    created() {
      this.id = this.list = this.$route.query.id;
      getOrderDetail(this.id).then(response => {
        this.order = response.data;

      });
    },
    filters: {
      formatpaymentState(value){
        if (value === 0) {
          return '支付失败';
        } else if (value === 1) {
          return '支付成功';
        } else if (value === 2) {
          return '待支付';
        } else if (value === 3) {
          return '线下已付款';
        } else if (value === 102) {
          return '申请售后';
        } else {
          return '未知';
        }
      },



      formatNull(value) {
        if(value===undefined||value===null||value===''){
          return '暂无';
        }else{
          return value;
        }
      },
      formatLongText(value) {
        if(value===undefined||value===null||value===''){
          return '暂无';
        }else if(value.length>8){
          return value.substr(0, 8) + '...';
        }else{
          return value;
        }
      },
      formatPayType(value) {
        if (value === 1) {
          return '支付宝';
        } else if (value === 2) {
          return '微信';
        } else {
          return '未支付';
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
          return '待发货';
        } else if (value === 2) {
          return '已发货';
        } else if (value === 3) {
          return '已完成';
        } else if (value === 4) {
          return '已关闭';
        } else if (value === 5) {
          return '无效订单';
        } else {
          return '待付款';
        }
      },
      formatPayStatus(value) {
        if (value === 0) {
          return '未支付';
        } else if(value===4){
          return '已退款';
        }else{
          return '已支付';
        }
      },
      formatDeliverStatus(value) {
        if (value === 0||value === 1) {
          return '未发货';
        } else {
          return '已发货';
        }
      },
      formatProductAttr(value){
        if(value==null){
          return '';
        }else{
          let attr = JSON.parse(value);
          let result='';
          for(let i=0;i<attr.length;i++){
            result+=attr[i].key;
            result+=":";
            result+=attr[i].value;
            result+=";";
          }
          return result;
        }
      }
    },
    methods: {
      onSelectRegion(data){
        this.receiverInfo.receiverProvince=data.province.value;
        this.receiverInfo.receiverCity=data.city.value;
        this.receiverInfo.receiverRegion=data.area.value;
      },
      formatTime(time) {
        if (time == null || time === '') {
          return '';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
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
        }else {
          //待付款、已关闭、无限订单
          return 1;
        }
      },
      showUpdateReceiverDialog(){
        this.receiverDialogVisible=true;
        this.receiverInfo={
          orderId:this.order.id,
          receiverName:this.order.receiverName,
          receiverPhone:this.order.receiverPhone,
          receiverPostCode:this.order.receiverPostCode,
          receiverDetailAddress:this.order.receiverDetailAddress,
          receiverProvince:this.order.receiverProvince,
          receiverCity:this.order.receiverCity,
          receiverRegion:this.order.receiverRegion,
          status:this.order.status
        }
      },
      
      showUpdateMoneyDialog(){
        this.moneyDialogVisible=true;
        this.moneyInfo.orderId=this.order.id;
        this.moneyInfo.freightAmount=this.order.freightAmount;
        this.moneyInfo.discountAmount=this.order.discountAmount;
        this.moneyInfo.status=this.order.status;
      },
      
      showMessageDialog(){
        this.messageDialogVisible=true;
        this.message.title=null;
        this.message.content=null;
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
      showCloseOrderDialog(){
        this.closeDialogVisible=true;
        this.closeInfo.note=null;
        this.closeInfo.id=this.id;
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
      showMarkOrderDialog(){
        this.markOrderDialogVisible=true;
        this.markInfo.id=this.id;
        this.closeOrder.note=null;
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
      
    }
  }
</script>
<style scoped>
  .detail-container {
    width: 80%;
    padding: 20px 20px 20px 20px;
    margin: 20px auto;
  }

  .operate-container {
    background: #F2F6FC;
    height: 80px;
    margin: -20px -20px 0;
    line-height: 80px;
  }

  .operate-button-container {
    float: right;
    margin-right: 20px
  }

  .table-layout {
    margin-top: 20px;
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
  }

  .table-cell {
    height: 60px;
    line-height: 40px;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    font-size: 14px;
    color: #606266;
    text-align: center;
    overflow: hidden;
  }

  .table-cell-title {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    background: #F2F6FC;
    text-align: center;
    font-size: 14px;
    color: #303133;
  }
</style>