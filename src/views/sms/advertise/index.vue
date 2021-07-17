<template>
  <div class="app-container">
    <div class="case-container">
      <div class="case" v-if="counts > 0">
        <span>{{counts}}条信息正等待您的审核</span>
        <el-button type="danger" size="mini" @click="goShengHe">去审核</el-button>
      </div>
    </div>
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
            <el-input v-model="listQuery.shopName" class="input-width" placeholder="请输入店铺名称"></el-input>
          </el-form-item>
          <el-form-item label="店铺ID：">
            <el-input v-model="listQuery.shopId" class="input-width" placeholder="请输入店铺ID"></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="listQuery.phone" class="input-width" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="店铺状态：">
            <el-select v-model="listQuery.shopSts" placeholder="全部" clearable class="input-width">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="到期时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.endTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>-->
        </el-form>
      </div>
    </el-card>
    <!-- <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()">添加广告</el-button>
    </el-card>-->
    <div class="table-container">
      <el-table
        ref="homeAdvertiseTable"
        :data="list"
        style="width: 100%;"
        height="48rem"
        v-loading="listLoading"
        border
      >
        <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
        <el-table-column label="店铺名称" align="center">
          <template slot-scope="scope">{{ scope.row.shopName }}</template>
        </el-table-column>
        <el-table-column label="店铺ID" align="center">
          <template slot-scope="scope">{{ scope.row.shopId }}</template>
        </el-table-column>
        <el-table-column label="申请人" align="center">
          <template slot-scope="scope">{{ scope.row.ownerId }}</template>
        </el-table-column>
        <el-table-column label="电话" align="center">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column label="店铺地址" align="center">
          <template slot-scope="scope">{{ scope.row.address }}</template>
        </el-table-column>
        <el-table-column label="资质查看" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="openImgAdverise(scope.$index, scope.row)">查看资质图片</el-button>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" width="155" align="center">
          <template slot-scope="scope">{{ scope.row.createdAt }}</template>
        </el-table-column>
        <el-table-column label="审核通过时间" width="155" align="center">
          <template slot-scope="scope">{{ scope.row.checkTime }}</template>
        </el-table-column>
        <el-table-column label="店铺状态" width="100" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.checkState === 0">停用</span>
            <span v-if="scope.row.checkState === 1">待审核</span>
            <span v-if="scope.row.checkState === 2" style="color: blue">初审已通过</span>
            <el-tooltip
              v-if="scope.row.checkState === 3"
              effect="dark"
              :content="scope.row.denyBecause"
              placement="top"
            >
              <span v-if="scope.row.checkState === 3">已拒绝</span>
            </el-tooltip>
            <span v-if="scope.row.checkState === 4">已注销</span>
            <span v-if="scope.row.checkState === 5" style="color: blue">资料终审通过</span>
          </template>
        </el-table-column>
        <el-table-column label="是否已经签电子协议" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isAgree === 1">已签协议</span>
            <span v-if="scope.row.isAgree === 0">未签协议</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="warning"
              @click="handleRefuse(3, scope.row.ownerId,scope.row.denyBecause)"
              v-if="scope.row.checkState === 1"
            >拒绝</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleDelete(2, scope.row.ownerId)"
              v-if="scope.row.checkState === 1"
            >通过审核</el-button>
            <!-- <el-button
              size="mini"
              @click="handleDelete(4, scope.row.ownerId)"
              v-if="scope.row.checkState === 2"
              >注销</el-button
            >
            -->
            <!-- <el-tooltip class="item" effect="dark" placement="left"> -->
            <!-- <div slot="content">{{scope.row.denyBecause}}</div> -->
            <el-button
              size="mini"
              @click="open1(scope.row.denyBecause)"
              v-if="scope.row.checkState === 3"
            >已拒绝</el-button>
            <!-- </el-tooltip> -->

            <!-- <el-button
              size="mini"
              @click="handleDelete(3, scope.row.ownerId)"
              v-if="scope.row.checkState === 3"
              >已拒绝</el-button
            >-->
            <el-button
              size="mini"
              @click="handleDelete(0,scope.row.ownerId)"
              v-if="scope.row.checkState === 2"
            >停用</el-button>
            <el-button
              size="mini"
              @click="handleDelete(1, scope.row.ownerId)"
              v-if="scope.row.checkState === 0 || scope.row.checkState === 4"
            >恢复</el-button>
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
        :page-size="listQuery.pageSize"
        :page-sizes="[5, 10, 15]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog title="资料详情" :visible.sync="dialogVisible" width="40%">
      <el-form :model="showUsetMessageListQuery" ref="brandFrom" label-width="150px">
        <span>{{"身份证号码:" + this.showUsetMessageListQuery.idCardNumber}}</span>
        <div>
          <span>身份证正面</span>
        </div>
        <div>
          <img width="300px" :src="this.showUsetMessageListQuery.idCardFrontImageUrl" alt />
        </div>
        <div>
          <span>身份证反面</span>
        </div>
        <div>
          <img width="300px" :src="this.showUsetMessageListQuery.idCardBackImageUrl" alt />
        </div>
        <div>
          <span>手持身份证</span>
        </div>
        <div>
          <img width="300px" :src="this.showUsetMessageListQuery.idCardHandImageUrl" alt />
        </div>
        <div>
          <span>营业执照</span>
        </div>
        <div>
          <img width="300px" :src="this.showUsetMessageListQuery.businessImageUrl" alt />
        </div>

        <el-form-item>
          <el-button @click="closeImmgAdverise">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { waitCheckMessage } from "@/api/cms/help";
import {
  fetchList,
  updateStatus,
  deleteHomeAdvertise,
  createupShopStsa,
} from "@/api/sms/homeAdvertise";
import { formatDate } from "@/utils/date";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  shopId: null, //店铺ID
  shopName: null, //店铺名称
  ownerId: null, //申请人ID
  phone: null, //店铺电话
  address: null, //店铺地址
  imageUrl: null, //资质查看(营业执照)
  createdAt: null, //申请时间
  checkTime: null, //审核时间
  shopSts: null, //店铺审核状态0停用1待审核2初审已通过3已拒绝4已注销5资料终审通过
  isAgree: null, //商家是否同意平台的商户协议并签订电子协议：1，同意,0不同意
};
const defaultTypeOptions = [
  {
    label: "停用",
    value: 0,
  },
  {
    label: "待审核",
    value: 1,
  },
  {
    label: "初审已通过",
    value: 2,
  },
  {
    label: "已拒绝",
    value: 3,
  },
];
export default {
  name: "homeAdvertiseList",
  data() {
    return {
      counts:0,
      listQuery: Object.assign({}, defaultListQuery),
      typeOptions: Object.assign({}, defaultTypeOptions),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      showUsetMessageListQuery: {
        businessImageUrl: "", //营业执照
        idCardBackImageUrl: "", //身份证反面
        idCardFrontImageUrl: "", //身份证北面
        idCardHandImageUrl: "", //手持身份证
        idCardNumber: "", //身份证号
      },
      multipleSelection: [],
      operates: [
        {
          label: "删除",
          value: 0,
        },
      ],
      operateType: null,
    };
  },
  created() {
    this.getList();
     waitCheckMessage({}).then((res) => {
      console.log(res, "dianpu");
      this.counts = res.data.slShopCount;
    });
  },
  filters: {
    formatType(type) {
      if (type === 1) {
        return "APP首页轮播";
      } else {
        return "PC首页轮播";
      }
    },
    formatTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
    goShengHe(){
      this.listQuery.shopSts = 1;
      this.handleSearchList()
    },
    //查看资质图片
    openImgAdverise(index, row) {
      // console.log(this.dialogVisible, "sadfasfasfsdfsdfsdsf");
      this.dialogVisible = true;
      this.showUsetMessageListQuery.businessImageUrl = row.businessImageUrl;
      this.showUsetMessageListQuery.idCardBackImageUrl = row.idCardBackImageUrl;
      this.showUsetMessageListQuery.idCardFrontImageUrl =
        row.idCardFrontImageUrl;
      this.showUsetMessageListQuery.idCardNumber = row.idCardNumber;
      this.showUsetMessageListQuery.idCardHandImageUrl = row.idCardHandImageUrl;
    },
    closeImmgAdverise() {
      this.dialogVisible = false;
    },
    handleResetSearch() {
      this.listQuery.shopSts = "";
      this.listQuery.phone = "";
      this.listQuery.shopId = "";
      this.listQuery.shopName = "";

      this.listQuery = Object.assign({}, defaultListQuery);
      console.log.listQuery;
      this.getList();
    },
    handleSearchList() {
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
    handleUpdateStatus(index, row) {
      this.$confirm("是否要修改上线/下线状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          updateStatus(row.id, { status: row.status }).then((response) => {
            this.getList();
            this.$message({
              type: "success",
              message: "修改成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "success",
            message: "已取消操作!",
          });
          this.getList();
        });
    },
    handleDelete(row, ownerId) {
      console.log(ownerId, "ownerId");

      this.$confirm("请再次确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // let newData = new FormData();
        // newData.append("checkState", row);
        // console.log(row,"row")
        // newData.append("ownerId", ownerId);
        let newData = {};
        newData.checkState = row;
        newData.ownerId = ownerId;
        console.log(newData);
        createupShopStsa(newData).then((response) => {
          console.log(response);
          if ((response.code = 200)) {
            this.$message({
              message: "操作成功！",
              type: "success",
              duration: 1000,
            });
            this.getList();
          } else {
            this.$message({
              message: "操作失败！",
              type: "error",
              duration: 1000,
            });
          }
        });
      });
    },
    handleRefuse(row, ownerId) {
      this.$prompt("请输入拒绝理由", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(({ value }) => {
        this.$message({
          message: value,
        });
        this.listLoading = true;
        createupShopStsa({
          checkState: row,
          ownerId: ownerId,
          denyBecause: value,
        }).then((response) => {
          this.listLoading = false;
          if (response.code == 200) {
            this.$message({
              message: response.msg,
              type: "success",
              duration: 1000,
            });
            this.getList();
          }
        });
      });
    },
    // handleBatchOperate(){
    //   if (this.multipleSelection < 1) {
    //     this.$message({
    //       message: '请选择一条记录',
    //       type: 'warning',
    //       duration: 1000
    //     });
    //     return;
    //   }
    //   let ids = [];
    //   for (let i = 0; i < this.multipleSelection.length; i++) {
    //     ids.push(this.multipleSelection[i].id);
    //   }
    //   if(this.operateType===0){
    //     //删除
    //     this.deleteHomeAdvertise(ids);
    //   }else {
    //     this.$message({
    //       message: '请选择批量操作类型',
    //       type: 'warning',
    //       duration: 1000
    //     });
    //   }
    // },
    // handleAdd(){
    //   this.$router.push({path: '/sms/addHomeAdvertise'})
    // },
    handleUpdate(index, row) {
      this.$router.push({
        path: "/sms/updateHomeAdvertise",
        query: { id: row.ownerId },
      });
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        console.log(response, "---");
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    open1(val) {
      const h = this.$createElement;

      this.$notify({
        title: "拒绝理由",
        message: h("i", { style: "color: teal" }, val),
        duration: 0,
      });
    },

    // deleteHomeAdvertise(ids){
    //   this.$confirm('是否要删除该广告?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     let params=new URLSearchParams();
    //     params.append("ids",ids);
    //     deleteHomeAdvertise(params).then(response=>{
    //       this.getList();
    //       this.$message({
    //         type: 'success',
    //         message: '删除成功!'
    //       });
    //     });
    //   })
    // }
  },
};
</script>
<style scoped>
.input-width {
  width: 203px;
}
span {
  cursor: pointer;
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
  margin-bottom: 20px;
}
</style>


