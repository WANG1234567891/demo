<template>
  <div class="app-container">
    <div class="case-container">
      <div class="case" v-if="counts > 0">
        <span>{{counts}}条信息正等待您的审核</span>
        <el-button type="danger" size="mini" @click="goTest(2)">去审核</el-button>
      </div>
      <!-- <div class="nav">
        <el-tag
          class="tags"
          @click="runTab"
          :key="index"
          v-for="(tag,index) of dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{tag}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-tooltip v-else class="item" effect="dark" content="点击可输入并跳转至想去的页面" placement="right">
          <el-button class="button-new-tag" size="small" @click="showInput">+增减新页面</el-button>
        </el-tooltip>
      </div>-->
    </div>
    <el-card class="filter-container" shadow="never">
      <div class="filter-container">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right; margin-top: 30px"
          @click="handleAdministration()"
          type="primary"
          size="small"
        >一号专区分类管理</el-button>
        <el-button
          style="float: right; margin-right: 15px; margin-top: 30px"
          @click="handleResetSearch"
          size="small"
        >重置</el-button>
        <el-button
          style="float: right;margin-right: 10px;margin-top: 30px"
          @click="handleSearchList()"
          type="primary"
          size="small"
        >查询结果</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="店铺名称：">
            <el-input v-model="listQuery.shopName" placeholder="店铺名称"></el-input>
          </el-form-item>
          <el-form-item label="商品名称：">
            <el-input v-model="listQuery.name" placeholder="商品名称"></el-input>
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
          <!-- <el-form-item label="商品品牌：">
            <el-select v-model="listQuery.brandId" placeholder="请选择品牌" clearable>
              <el-option
                v-for="item in brandOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="商品状态：">
            <el-select
              ref="selectRef"
              v-model="listQuery.sold_out"
              placeholder="全部"
              clearable
              @change="productOneStatus"
              style="width:202px;"
            >
              <el-option
                v-for="item of publishStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="一号专区分类：">
            <el-select
              v-model="listQuery.isOneType" 
              placeholder="全部"
              @change="oneTypeFenLei"
              clearable
              style="width:202px;"
            >
              <el-option
                v-for="item in valueOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddProductCate()"
        size="mini">
        添加
      </el-button>
    </el-card>-->
    <div class="table-container">
      <el-table
        ref="productCateTable"
        style="width: 100%"
        height="40.7rem"
        :data="list"
        v-loading="listLoading"
        border
      >
        <el-table-column label="商品ID" width="95" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="店铺名称" align="center">
          <template slot-scope="scope">{{ scope.row.shopName }}</template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="商品编码" align="center">
          <template slot-scope="scope">{{ scope.row.product_number }}</template>
        </el-table-column>
        <el-table-column label="商品类型" align="center">
          <template slot-scope="scope">{{ scope.row.slProductTypeName }}</template>
        </el-table-column>
        <el-table-column label="一号专区分类" align="center">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.slProductTypeOneName"
              placeholder="请选择"
              @change="elOptionBlur(scope.$index,scope.row)"
            >
              <el-option
                v-for="item in valueOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="销量" align="center">
          <template slot-scope="scope">{{ scope.row.sales_volume }}</template>
        </el-table-column>
        <el-table-column label="商品主图" align="center">
          <template slot-scope="scope">
            <viewer :images="list">
              <img :src="scope.row. image_url" alt style="width:100px;height:100px" />
            </viewer>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.create_time }}</template>
        </el-table-column>
        <el-table-column label="更新时间" width="160" align="center">
          <template slot-scope="scope">{{ scope.row. updated_at }}</template>
        </el-table-column>
        <el-table-column label="是否推荐" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.recommends === 0">否</span>
            <span v-if="scope.row.recommends === 1">海南免税专区</span>
            <span v-if="scope.row.recommends === 2">C位爆款</span>
            <span v-if="scope.row.recommends === 3">最后疯抢</span>
          </template>
        </el-table-column>
        <el-table-column label="商品状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.sold_out === 0">下架</span>
            <span v-if="scope.row.sold_out === 1">上架审核通过</span>
            <el-tooltip
              v-if="scope.row.sold_out === 2"
              class="item"
              effect="dark"
              :content="scope.row.reason"
              placement="top"
            >
              <span v-if="scope.row.sold_out === 2">待审核</span>
            </el-tooltip>
            <span v-if="scope.row.sold_out === 3">未通过</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="210" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.sold_out === 2"
              size="mini"
              @click="handleUpdateProduct(scope.$index, scope.row)"
            >去审核</el-button>
            <el-button size="mini" @click="handleEditVConfirm(scope.$index, scope.row)">移出一号专区</el-button>
            <!-- <el-button
              style="margin-top:10px;"
              size="mini"
              type="danger"
              @click="handleEditVConfirm(scope.$index, scope.row)"
            >移除</el-button>-->
            <!-- <div v-if="scope.row.sold_out === 2" class="change-yes">
              <el-button type="success" size="mini" @click="agreeYes(scope.$index,scope.row)">通过</el-button>
              <el-button type="danger" size="mini" @click="sayNo(scope.$index,scope.row)">拒绝</el-button>
            </div>-->
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
    <el-dialog title="不通过" :visible.sync="dialogFormVisible">
      <el-form :model="disagreeForm" :rules="disagreeFormRules" ref="disagreeFormRuleForm">
        <el-form-item label="拒绝理由" prop="liYou" label-width="90px">
          <el-input v-model="disagreeForm.liYou" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="yesSend">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  deleteProductCate,
  updateShowStatus,
  updateNavStatus,
  newStatusslProductTypeOne,
  fetchSimpleList,
  postReason,
} from "@/api/pms/productCate";
import { fetchVList } from "@/api/pms/product";
import { waitCheckMessage } from "@/api/cms/help";
import { routesGo } from "@/api/roues";
export default {
  name: "productCateList",
  data() {
    return {
      list: null,
      total: null,
      counts: 0,
      listLoading: true,
      count: 5,
      // 多页面切换
      dynamicTags: ["商品列表", "店铺订单明细", "匀贸订单"],
      inputVisible: false,
      inputValue: "",
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        isOne: 1,
        shopName: null,
        name: null,
        create_time: null,
        sold_out: null,
        isOneType: null,
        productName: null,
      },
      valueOptions: "",
      parentId: 0,
      publishStatusOptions: [
        {
          value: 0,
          label: "下架",
        },
        {
          value: 1,
          label: "上架审核通过",
        },
        {
          value: 2,
          label: "待审核",
        },
        {
          value: 3,
          label: "未通过",
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
      value2: "",
      dialogFormVisible: false,
      disagreeForm: { liYou: "" },
      uid: null,
      isAgree: "3",
      index: null,
      disagreeFormRules: {
        liYou: [
          { required: true, message: "请输入拒绝理由", trigger: "blur" },
          { min: 5, message: "请填写不少于5个字数", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
    // this.resetParentId();
    newStatusslProductTypeOne().then((response) => {
      this.valueOptions = response.data;
      // console.log(this.valueOptions)
    });
    waitCheckMessage({}).then((res) => {
      this.counts = res.data.slProductListOneCount;
    });
  },
  mounted() {},
  watch: {
    $route(route) {
      // this.resetParentId();
      this.getList();
    },
  },
  methods: {
    resetParentId() {
      if (this.$route.query.parentId != null) {
        this.parentId = this.$route.query.parentId;
      } else {
        this.parentId = 0;
      }
    },
    handleAddProductCate() {
      this.$router.push("/pms/addProductCate");
    },
    //获取数据
    getList() {
      let oneStatus = localStorage.getItem("oneStatus");
      this.listLoading = true;
      if (oneStatus != 2) {
        let reloadData = this.listQuery;
        reloadData.productName = this.listQuery.name;
        reloadData.soldOut = this.listQuery.sold_out;
        fetchList(reloadData).then((response) => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      }else if(oneStatus == 2){
        this.goTest(2)
      }
    },
    //一号店分类
    elOptionBlur(index, row) {
      fetchSimpleList({
        id: row.id,
        isOne: 1,
        isOneType: row.slProductTypeOneName,
      }).then((response) => {
        if (response.code == 200) {
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
        }
      });
    },
    runTab(e) {
      console.log(e.target.innerText);
      routesGo(e);
    },
    //移除1号专区
    handleEditVConfirm(index, row) {
      this.$confirm("是否要移出一号店专区", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        fetchSimpleList({
          id: row.id,
          isOne: 2,
        }).then((response) => {
          if (response.code == 200) {
            this.$message({
              message: "转移成功",
              type: "success",
              duration: 1000,
            });
            this.getList();
          }
        });
      });
    },
    // 通过审核
    agreeYes(index, row) {
      console.log(index, row);
      this.uid = row.id;
      let soldOut = this.isAgree;
      soldOut = "1";
      let that = this;
      postReason({ id: this.uid, reason: "符合规则", soldOut }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          that.list.splice(index, 1);
        }
      });
    },
    sayNo(index, row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.uid = row.id;
      this.index = index;
    },
    // 发送理由
    yesSend() {
      this.$refs.disagreeFormRuleForm.validate((valid) => {
        console.log(valid);
        if (valid) {
          // alert(99)
          postReason({
            id: this.uid,
            reason: this.disagreeForm.liYou,
            soldOut: this.isAgree,
          }).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.list.splice(this.index, 1);
              this.dialogFormVisible = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    //重置
    handleResetSearch() {
      this.listQuery = [];
      localStorage.setItem("oneStatus",null)
      this.getList();
    },
    //查询
    handleSearchList() {
      if (this.listQuery.create_time) {
        let newData = {
          pageNum: this.listQuery.pageNum,
          pageSize: this.listQuery.pageSize,
          productName: this.listQuery.name, //商品名称
          shopName: this.listQuery.shopName, //店铺名称
          createTimeBegin: this.listQuery.create_time[0], //创建开始时间
          createTimeEnd: this.listQuery.create_time[1], //创建结束时间
          soldOut: this.listQuery.sold_out, //商品状态
          isOne: 1,
          isOneType: this.listQuery.isOneType, //一号专区分类
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
          productName: this.listQuery.name, //商品名称
          shopName: this.listQuery.shopName, //店铺名称
          soldOut: this.listQuery.sold_out, //商品状态
          isOneType: this.listQuery.isOneType, //一号专区分类
          isOne: 1,
        };
        fetchList(newData).then((response) => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      }
    },
    // 保存商品状态
    productOneStatus() {
      // console.log(this.listQuery.sold_out)
      localStorage.setItem("oneStatus",this.listQuery.sold_out)
    },
    // 保存一号专区分类
    oneTypeFenLei(e){
      console.log(e)
      // localStorage.setItem("isOneType",isOneType)
    },
    //一号店分类管理
    handleAdministration() {
      this.$router.push({ path: "/pms/addProductCate" });
    },
    //下架
    handleShowVeriyEditDialog(index, row) {
      this.$confirm("是否要移出一号店专区", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.listLoading = true;
        fetchVList({ id: row.id, soldOut: 0 }).then((response) => {
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
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    // 审核
    goTest(status) {
      let oneStatus = localStorage.getItem("oneStatus");
      if (oneStatus == "" || oneStatus == null) {
        localStorage.setItem("oneStatus", 2);
      }
      let newData = {
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        productName: this.listQuery.name, //商品名称
        shopName: this.listQuery.shopName, //店铺名称
        soldOut: status, //商品状态
        isOneType: this.listQuery.isOneType, //一号专区分类
        isOne: 1,
      };
      fetchList(newData).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
        this.listQuery.sold_out = 2;
      });
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.listQuery.productName = this.listQuery.name;
      this.listQuery.soldOut = this.listQuery.sold_out;
      //时间为空 会崩溃
      if (this.listQuery.create_time) {
        this.listQuery.createTimeBegin = this.listQuery.create_time[0];
        this.listQuery.createTimeEnd = this.listQuery.create_time[1];
      }
      this.getList();
    },
    handleNavStatusChange(index, row) {
      let data = new URLSearchParams();
      let ids = [];
      ids.push(row.id);
      data.append("ids", ids);
      data.append("navStatus", row.navStatus);
      updateNavStatus(data).then((response) => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    handleUpdateProduct(index, row) {
      this.$router.push({ path: "/pms/updateProduct", query: { id: row.id } });
    },

    handleShowStatusChange(index, row) {
      let data = new URLSearchParams();
      let ids = [];
      ids.push(row.id);
      data.append("ids", ids);
      data.append("showStatus", row.showStatus);
      updateShowStatus(data).then((response) => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    handleShowNextLevel(index, row) {
      this.$router.push({
        path: "/pms/productCate",
        query: { parentId: row.id },
      });
    },
    handleTransferProduct(index, row) {
      console.log("handleAddProductCate");
    },
    handleUpdate(index, row) {
      this.$router.push({
        path: "/pms/updateProductCate",
        query: { id: row.id },
      });
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除该品牌", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteProductCate(row.id).then((response) => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
  filters: {
    levelFilter(value) {
      if (value === 0) {
        return "一级";
      } else if (value === 1) {
        return "二级";
      }
    },
    disableNextLevel(value) {
      if (value === 0) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped>
span {
  cursor: pointer;
}
.change-yes {
  margin-top: 8px;
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
/* .nav {
  margin-bottom: 15px;
  border-bottom: 0.1px solid #409eff;
  margin-right: 700px;
}
.el-tag {
  margin-left: 0px;
  border-radius: 0;
  padding: 1px 30px;
}
.el-tag + .el-tag {
  border-left: none;
} */
/* .button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
} */
</style>
