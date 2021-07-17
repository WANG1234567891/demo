<template>
  <el-card class="form-container">
    <div class="filter-container">
      <el-button
        style="float: right; margin-right: 15px; margin-top: 15px"
        @click="handleSearchList()"
        type="primary"
        size="small"
      >添加分类</el-button>
      <el-button
        style="float: right; margin-right: 15px; margin-top: 15px"
        @click="handleResetSearch()"
        type="primary"
        size="small"
      >搜索</el-button>
    </div>
    <div style="margin-top: 15px">
      <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
        <el-form-item label="分类名称：">
          <el-input style="width: 203px" v-model="listQuery.name" placeholder="分类名称"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top: 15px">
      <el-table :data="productCate" style="width: 100%">
        <el-table-column label="ID" width="60">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="分类名称" width="100">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="添加时间" width="160">
          <template slot-scope="scope">{{ scope.row.created_at }}</template>
        </el-table-column>
        <el-table-column label="排序" width="100">
          <template slot-scope="scope">{{ scope.row.c_order }}</template>
        </el-table-column>
        <el-table-column label="是否展示" width="100">
          <template slot-scope="scope">{{scope.row.show_state ? "显示":"不显示"}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加分类 -->
    <el-dialog :title="tableTitle" :visible.sync="outerVisible" width="40%" @closed="closeHide">
      <el-form :model="rideoSelect" ref="brandFrom" label-width="150px">
        <el-form-item label="一号专区分类名称：" prop="name">
          <el-input style="width: 203px" v-model="rideoSelect.name" placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="排序：" prop="cOrder">
          <el-input style="width: 203px" v-model="rideoSelect.c_order" placeholder="请输入序列号"></el-input>
        </el-form-item>
        <el-form-item label="是否显示：" prop="showState">
          <el-radio-group v-model="rideoSelect.show_state">
            <el-radio :label="0">不显示</el-radio>
            <el-radio :label="1">显示</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button
            v-if="this.tableNm === 'add'"
            type="primary"
            @click="handleEditVConfirm('brandFrom')"
          >添 加</el-button>
          <el-button
            v-if="this.tableNm === 'upDate'"
            type="primary"
            @click="handleEditupDate('brandFrom')"
          >保 存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
import {
  newStatusslProductTypeOne,
  slProductTypeOneAdd,
  slPhandleEditupDate,
} from "@/api/pms/productCate";
export default {
  name: "ProductCateDetail",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      productCate: [],
      listQuery: {
        name: null,
        pageNum: 1,
        pageSize: 10,
      },
      outerVisible: false,
      rideoSelect: {
        name: null,
        show_state: "1",
        c_order: null,
      },
      tableNm: "add",
      tableTitle: "新增分类",
      // rules: {
      //   name: [{ required: true, message: "请输入分类名称", trigger: "change" }],
      //   cOrder: [{ required: true, message: "请输入序列号", trigger: "change" }],
      //   showState: [
      //     {
      //       required: true,
      //       message: "请至少选择一个",
      //       trigger: "blur",
      //     },
      //   ],
      // },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      newStatusslProductTypeOne(this.listQuery).then((response) => {
        this.productCate = response.data;
      });
    },
    closeHide() {
      this.rideoSelect = [];
    },
    //搜索
    handleResetSearch() {
      newStatusslProductTypeOne(this.listQuery).then((response) => {
        if (response.code == 200) {
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
          this.productCate = response.data;
        }
      });
    },
    //编辑
    handleEdit(index, row) {
      this.outerVisible = true;
      this.$nextTick(() => {
        this.tableNm = "upDate";
        this.tableTitle = "编辑";
        // this.rideoSelect.name = row.name;
        // this.rideoSelect.showState = row.show_state;
        // this.rideoSelect.cOrder = row.c_order;
        this.rideoSelect = Object.assign({}, row);
        console.log(this.rideoSelect);
      });
    },
    //确认编辑
    handleEditupDate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("是否保存", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            slPhandleEditupDate({
              cOrder: this.rideoSelect.c_order,
              showState: this.rideoSelect.show_state,
              name: this.rideoSelect.name,
              id: this.rideoSelect.id,
            }).then((response) => {
              if (response.code == 200) {
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 1000,
                });
                this.rideoSelect = [];
                this.getList();
              }
              this.outerVisible = false;
            });
          });
        }
      });
    },

    //添加分类
    handleSearchList() {
      this.tableNm = "add";
      this.tableTitle = "新增分类";
      this.outerVisible = true;
    },
    //确定添加
    handleEditVConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("是否确认添加", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            slProductTypeOneAdd(this.rideoSelect).then((response) => {
              if (response.code == 200) {
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 1000,
                });
                this.rideoSelect = [];
                this.getList();
              }
            });
            this.outerVisible = false;
          });
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
