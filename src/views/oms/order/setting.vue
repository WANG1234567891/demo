<template> 
  <div class="detail-container">
     <el-card shadow="never">
      <span>订单序列号{{receiverInfo.id}}的详情</span>
    </el-card>
    
    <el-card shadow="never" style="margin-top: 15px">
      <div>
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">订单编号</el-col>
          <el-col :span="12" class="table-cell">{{receiverInfo.refundNum || "无"}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">商品的名称</el-col>
          <el-col :span="12" class="table-cell">{{receiverInfo.refundNum || "无"}}</el-col>
        </el-row>
          <el-row>
          <el-col :span="6" class="table-cell-title" style="border-bottom: 1px solid #DCDFE6;">商品数量</el-col>
          <el-col :span="12" class="table-cell" style="border-bottom: 1px solid #DCDFE6;">{{receiverInfo.serviceCheckId || "无"}}</el-col>
        </el-row>
      </div>
    </el-card>
     <el-card shadow="never" style="margin-top: 15px">
      <div>
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">退款原因</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">退款人联系号码</el-col>
          <el-col :span="12" class="table-cell">{{receiverInfo.phone || "无"}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">退款原因</el-col>
          <el-col :span="12" class="table-cell">{{receiverInfo.reason || "无"}}</el-col>
        </el-row>
         <el-row>
          <el-col :span="6" class="table-cell-title">申请退款金额</el-col>
          <el-col :span="12" class="table-cell">{{receiverInfo.agreementRefund || "无"}}</el-col>
        </el-row>
          <el-row>
          <el-col :span="6" class="table-cell-title">退款详细说明</el-col>
          <el-col :span="12" class="table-cell">{{receiverInfo.reasonDetail || "无"}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title" style="border-bottom: 1px solid #DCDFE6;">退款图片</el-col>
          <el-col :span="12" class="table-cell" style="border-bottom: 1px solid #DCDFE6;">{{receiverInfo.refundNum || "无"}}</el-col>
        </el-row>
      </div>
    </el-card>
    <el-card shadow="never" style="margin-top: 15px">
      <div>
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">商家审核意见</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">商家审核意见</el-col>
          <el-col :span="12" class="table-cell">{{receiverInfo.serviceCheckDetail || "无"}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">商家审核</el-col>
          <el-col :span="12" class="table-cell">{{getOrderState(receiverInfo.businessCheckState) || "无"}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title" style="border-bottom: 1px solid #DCDFE6;">商家审核时间</el-col>
          <el-col :span="12" class="table-cell" style="border-bottom: 1px solid #DCDFE6;">{{receiverInfo.businessCheckTime || "无"}}</el-col>
        </el-row>
      </div>
    </el-card>
    
     <el-card shadow="never" style="margin-top: 15px">
      <div>
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">客服处理</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title" style="height:55px; line-height: 32px;">客服审核意见</el-col>
          <el-col :span="12" class="table-cell">
             <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model="list.serviceCheckDetail">
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title" style="height:62px;line-height: 35px;">客服审核</el-col>
          <el-col :span="12" class="table-cell">
            <el-select v-model="list.serviceCheckState" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>       
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" class="table-cell" style="border-bottom: 1px solid #DCDFE6;text-align: center;">
             <el-button type="success" size="small" style="width：300px" @click="onSubmit()">提 交</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
  import {getOrderSetting,createOrderSetting} from '@/api/oms/orderSetting';
  // import LogisticsDialog from '@/views/oms/order/components/logisticsDialog';
  // import {formatDate} from '@/utils/date';
  // import VDistpicker from 'v-distpicker';
  const defaultReceiverInfo = {
    actualRecund: null,
    agreementRefund: null,
    businessCheckDetail: null,
    businessCheckId: null,
    businessCheckState: null,
    businessCheckTime: null,
    createTime: null,
    financeCheckId: null,
    financeCheckState: null,
    financeCheckTime: null,
    id: null,
    orderId:null ,
    orderRefundState: null,
    phone: null,
    reason:null,
    reasonDetail: null,
    refundImageUrl: null,
    refundNum: null,
    remark: null,
    serviceCheckDetail: null,
    serviceCheckId: null,
    serviceCheckState:null ,
    serviceCheckTime: null,
  };
  export default {
    name: 'orderDetail',
    // components: { VDistpicker, LogisticsDialog},
    data() {
      return {
        receiverInfo:Object.assign({},defaultReceiverInfo),
        options: [{
          value: '0',
          label: '未审核'
        }, {
          value: '1',
          label: '同意'
        }, {
          value: '2',
          label: '不同意'
        },{
          value: '3',
          label: '同意但修改金额'
        }],
        list:[{
          id:null,
          serviceCheckDetail:null,
          serviceCheckState:null,
        }]
      }
    },
    created() {
      this.list.id=this.$route.query.id;
      getOrderSetting(this.list.id).then(response => {
        this.receiverInfo = response.data.data.order;
      });
    },
    methods: {
      onSelectRegion(data){
        this.receiverInfo.receiverProvince=data.province.value;
        this.receiverInfo.receiverCity=data.city.value;
        this.receiverInfo.receiverRegion=data.area.value;
      },
      onSubmit(){
        if(this.list.serviceCheckState!=="1"){
           this.$message({
            message: "非同意时，请填写审核意见",
            type: "info",
            duration: 1000,
          });
          return
        }
         this.$confirm('确认要提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          let newData = new FormData();
          newData.append("id",this.list.id);
           newData.append("serviceCheckState",this.list.serviceCheckState);
            newData.append("serviceCheckDetail",this.list.serviceCheckDetail);
          createOrderSetting(newData).then((response)=>{
            console.log(response)
          })
        })
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
      formatTime(time) {
        if (time == null || time === '') {
          return '';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
    }
  }
</script>
<style scoped>
  .detail-container {
    width: 80%;
    padding: 0px 20px 20px 20px;
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
    margin-top: 10px;
    border-left: 1px solid #DCDFE6;
  }

  .table-cell {
    border-top: 1px solid #DCDFE6;
    border-right: 1px solid #DCDFE6;
    padding: 10px;
    font-size: 14px;
    color: #606266;
    word-break:break-all;
  }

  .table-cell-title {
    border-top: 1px solid #DCDFE6;
    border-right: 1px solid #DCDFE6;
    padding: 10px;
    background: #F2F6FC;
    font-size: 14px;
    color: #303133;
  }
</style>


