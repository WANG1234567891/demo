<template>
   
  <div class="app-container">
    <el-card class="filter-container" shadow="never" style="text-align: center">
      <div text-align: center>
        <span>查询条件:</span>
        <el-input
          style="width: 203px"
          v-model="listQuery.userId"
          placeholder="请输入搜了宝ID"
        ></el-input>
        <el-input
          style="width: 203px"
          v-model="listQuery.phone"
          placeholder="请输入手机号"
        ></el-input>
        <el-button
          style="background: green"
          @click="search()"
          type="primary"
          size="small"
        >
          搜索
        </el-button>
        <el-button @click="searchAll()" type="primary" size="small">
          查看全部
        </el-button>
      </div>
    </el-card>

    <div class="table-container">
      <el-table
        ref="homeAdvertiseTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        border
      >
        <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
        <el-table-column label="会员ID" width="240" align="center">
          <template slot-scope="scope">{{ scope.row.userId }}</template>
        </el-table-column>
        <el-table-column label="店铺ID" width="240" align="center">
          <template slot-scope="scope">{{ scope.row.shopId }}</template>
        </el-table-column>
        <el-table-column label="直推下级会员数" width="360" align="center">
          <template slot-scope="scope">{{ scope.row.ztNum }}</template>
        </el-table-column>
        <el-table-column label="下级会员" width="240" align="center">
          <template slot-scope="scope"
            ><el-button @click="serchDetail(scope.row.userId)" >查看详情</el-button></template
          >
        </el-table-column>
        <el-table-column
          label="店铺累计的销售额（确认收获）"
          width="360"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.shopSumMoney }}
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
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { fetchList, lowerLevel } from "@/api/cms/consumptionDetails";
import { formatDate } from "@/utils/date";
export default {
  name: "schoolList",
  data() {
    return {
      operates: [
        {
          title: "显示品牌",
          value: "showSchool",
        },
        {
          title: "隐藏品牌",
          value: "hideSchool",
        },
      ],
      operateType: null,
      listQuery: {
        userId: null,
        keyword: null,
        pageNum: 1,
        pageSize: 10,
        phone: "",
      },
      lowYxNum: "",
      lowXfNum: "",
      list: [],
      total: null,
      listLoading: true,
      multipleSelection: [],
    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatCreateTime(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },

    formatStatus(value) {
      if (value === 1) {
        return "是";
      } else {
        return "否";
      }
    },
  },
  methods: {
    serchDetail(val) {
        this.listLoading=true
      const h = this.$createElement;
      this.listQuery.userId=val
      console.log(val)
      lowerLevel({userId : this.listQuery.userId}).then((response) => {
             this.listLoading=false
        this.lowYxNum = response.data.lowYxNum;
        this.lowXfNum = response.data.lowXfNum;
        this.$confirm("", "提示", {
         message:
          h('div', [
            h('p', '下级有效会员数：'+this.lowYxNum),
            h('p', '下级消费会员数：'+this.lowXfNum)
          ]),
          confirmButtonText: "确定",
          type: "warning",
        }).then((response) => {});
      });
    },

    getList() {
      this.listLoading = false;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
        this.totalPage = response.data.pages;
        this.pageSize = response.data.size;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleUpdate(index, row) {
      this.$router.push({ path: "/ums/updateSchool", query: { id: row.id } });
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除该品牌", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteSchool(row.id).then((response) => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
    getProductList(index, row) {
      console.log(index, row);
    },
    getProductCommentList(index, row) {
      console.log(index, row);
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
    searchAll() {
      this.pageNum = 1;
      this.listQuery.pageSize = this.pageSize;
      this.getList();
    },
    search(val) {
      this.userId = val;
      this.getList();
    },
    handleBatchOperate() {
      console.log(this.multipleSelection);
      if (this.multipleSelection < 1) {
        this.$message({
          message: "请选择一条记录",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      let showStatus = 0;
      if (this.operateType === "showSchool") {
        showStatus = 1;
      } else if (this.operateType === "hideSchool") {
        showStatus = 0;
      } else {
        this.$message({
          message: "请选择批量操作类型",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      let ids = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].id);
      }
      let data = new URLSearchParams();
      data.append("ids", ids);
      data.append("showStatus", showStatus);
      updateShowStatus(data).then((response) => {
        this.getList();
        this.$message({
          message: "修改成功",
          type: "success",

          duration: 1000,
        });
      });
    },
    addSchool() {
      this.$router.push({ path: "/ums/addSchool" });
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.box_title {
  font-size: 30px;
}
.login-title {
  text-align: center;
}
.box_style {
  border: black;
  border: 2px;
  border-width: 200rem;
  height: 200re;
  box-align: center;
}
</style>


