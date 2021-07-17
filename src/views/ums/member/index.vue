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
          @click="searchMemberList()"
          type="primary"
          size="small"
        >查询结果</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="搜了宝ID：">
            <el-input style="width: 203px" v-model="listQuery.userId" placeholder="搜了宝ID"></el-input>
          </el-form-item>
          <!-- <el-form-item label="和平村ID：">
            <el-input style="width: 203px" v-model="listQuery.hpcid" placeholder="和平村ID"></el-input>
          </el-form-item>-->
          <el-form-item label="手机号：">
            <el-input style="width: 203px" v-model="listQuery.phone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="上级ID：">
            <el-input style="width: 203px" v-model="listQuery.superId" placeholder="上级ID"></el-input>
          </el-form-item>
          <el-form-item label="按注册时间查询：">
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
      <el-table ref="brandTable" :data="list" style="width: 100%" height="44rem" v-loading="listLoading" border>
        <el-table-column label="搜了宝ID" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="会员昵称" align="center">
          <template slot-scope="scope">{{scope.row.nickName}}</template>
        </el-table-column>
        <el-table-column label="手机号" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column label="手机号归属" align="center">
          <template slot-scope="scope">{{scope.row.province}}</template>
        </el-table-column>
        <el-table-column label="上级ID" align="center">
          <template slot-scope="scope">{{scope.row.superior_userId || 0}}</template>
        </el-table-column>
        <el-table-column label="注册时间" align="center">
          <template slot-scope="scope">{{scope.row.createdAt}}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0">已停用</span>
            <span v-if="scope.row.status==1">正常</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleDelete(scope.$index, scope.row)"
            >查看更多</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleStatusDelete(scope.$index, scope.row)"
              v-if="scope.row.status==0"
            >
              <span>恢复</span>
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleStatusDelete(scope.$index, scope.row)"
              v-if="scope.row.status==1"
            >
              <span>停用</span>
            </el-button>
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
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import {
  fetchList,
  updateShowStatus,
  createMember,
  deleteMember,
  fetchBlanceList,
} from "@/api/ums/member";

export default {
  name: "memberList",
  data() {
    return {
      blanceList: null,
      operateType: null,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        phone: null,
        superId: null,
        create_time: null,
        userId: null,
        hpcid: null,
        beginTm: null,
        endTm: null,
      },
      listStatus: {
        id: null,
        status: null,
      },
      list: null,
      total: null,
      listLoading: true,
      multipleSelection: [],
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
    formatTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    verifyStatusFilter(value) {
      if (value === 1) {
        return "消费";
      } else {
        return "收入";
      }
    },
    formatStatus(status) {
      for (let i = 0; i < defaultStatusOptions.length; i++) {
        if (status === defaultStatusOptions[i].value) {
          return defaultStatusOptions[i].label;
        }
      }
    },
    formatReturnAmount(row) {
      return row.productRealPrice * row.productCount;
    },
  },
  methods: {
    // handleShowVeriyEditDialog(index,row){
    //   this.dialogVisible=true;
    //   fetchBlanceList(row.id).then(response=>{
    //     this.blanceList=response.data;
    //  });
    // },

    // handleShowChange(index, row) {
    //   let params = new URLSearchParams();
    //   params.append('ids', row.id);
    //   params.append('showStatus', row.showStatus);
    //   updateShowStatus(params).then(response => {
    //     this.$message({
    //     message: '修改成功',
    //     type: 'success',
    //     duration: 1000
    //   });
    // });
    // },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
        this.totalPage = response.data.pages;
        this.pageSize = response.data.size;
        this.listQuery.beginTm = null;
        this.listQuery.endTm = null;
      });
    },
    //停用恢复
    // createMember
    handleStatusDelete(index, row) {
      if (row.status === 1) {
        (this.listStatus.status = 0), (this.listStatus.id = row.id);
      } else if (row.status === 0) {
        (this.listStatus.status = 1), (this.listStatus.id = row.id);
      }
      this.$confirm("是否要启用或者停用", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let newData = new FormData();
        newData.append("userId", this.listStatus.id);
        newData.append("status", this.listStatus.status);
        createMember(newData).then((response) => {
          if (response.code == 200) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1000,
            });
            this.getList();
          } else {
            this.$message({
              message: response.msg,
              type: "info",
              duration: 1000,
            });
          }
        });
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // handleUpdate(index, row) {
    //   this.$router.push({path: '/ums/updateMember', query: {id: row.id}})
    // },
    handleDelete(index, row) {
      this.$router.push({ path: "/ums/school", query: { id: row.id } });
    },
    // handleDelete(index, row) {
    //   this.$confirm('是否要删除该记录', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     deleteMember(row.id).then(response => {
    //       this.$message({
    //         message: '删除成功',
    //         type: 'success',
    //         duration: 1000
    //       });
    //       this.getList();
    //     });
    //   });
    // },
    getProductList(index, row) {
      console.log(index, row);
    },
    getProductCommentList(index, row) {
      console.log(index, row);
    },
    // handleFactoryStatusChange(index, row) {
    //   var data = new URLSearchParams();
    //   data.append("ids", row.id);
    //   data.append("factoryStatus", row.factoryStatus);
    //   updateFactoryStatus(data).then(response => {
    //     this.$message({
    //       message: '修改成功',
    //       type: 'success',
    //       duration: 1000
    //     });
    //   }).catch(error => {
    //     if (row.factoryStatus === 0) {
    //       row.factoryStatus = 1;
    //     } else {
    //       row.factoryStatus = 0;
    //     }
    //   });
    // },
    // handleShowStatusChange(index, row) {
    //   let data = new URLSearchParams();
    //   ;
    //   data.append("ids", row.id);
    //   data.append("showStatus", row.showStatus);
    //   updateShowStatus(data).then(response => {
    //     this.$message({
    //       message: '修改成功',
    //       type: 'success',
    //       duration: 1000
    //     });
    //   }).catch(error => {
    //     if (row.showStatus === 0) {
    //       row.showStatus = 1;
    //     } else {
    //       row.showStatus = 0;
    //     }
    //   });
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
    //重置
    handleResetSearch() {
      this.listQuery = [];
      this.getList();
    },
    //搜索
    searchMemberList() {
      if (this.listQuery.create_time) {
        this.listQuery.beginTm = this.listQuery.create_time[0];
        this.listQuery.endTm = this.listQuery.create_time[1];
        this.getList();
      } else {
        this.listQuery.beginTm = null;
        this.listQuery.endTm = null;
        this.getList();
      }
    },
    // handleBatchOperate() {
    //   console.log(this.multipleSelection);
    //   if (this.multipleSelection < 1) {
    //     this.$message({
    //       message: '请选择一条记录',
    //       type: 'warning',
    //       duration: 1000
    //     });
    //     return;
    //   }
    //   let showStatus = 0;
    //   if (this.operateType === 'showMember') {
    //     showStatus = 1;
    //   } else if (this.operateType === 'hideMember') {
    //     showStatus = 0;
    //   } else {
    //     this.$message({
    //       message: '请选择批量操作类型',
    //       type: 'warning',
    //       duration: 1000
    //     });
    //     return;
    //   }
    //   let ids = [];
    //   for (let i = 0; i <script this.multipleSelection.length; i++) {
    //     ids.push(this.multipleSelection[i].id);
    //   }
    //   let data = new URLSearchParams();
    //   data.append("ids", ids);
    //   data.append("showStatus", showStatus);
    //   updateShowStatus(data).then(response => {
    //     this.getList();
    //     this.$message({
    //       message: '修改成功',
    //       type: 'success',
    //       duration: 1000
    //     });
    //   });
    // },
    addMember() {
      this.$router.push({ path: "/pms/addMember" });
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>


