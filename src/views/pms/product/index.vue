<template>
  <div class="app-container">
    <div class="case-container">
      <div class="case" v-if="counts > 0">
        <span>{{counts}}条信息正等待您的审核</span>
        <el-button type="danger" size="mini" @click="goShengHe">去审核</el-button>
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
          ref="saveTagInputOne"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-tooltip v-else class="item" effect="dark" content="点击可输入并跳转至想去的页面" placement="right">
          <el-button class="button-new-tag" size="small" @click="showInput">+增减新页面</el-button>
        </el-tooltip>
      </div> -->
    </div>
    <el-card class="filter-container" shadow="never">
      <div class="filter-container" style="margin-right: 10rem;">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float: right;  margin-top: 30px" @click="handleResetSearch" size="small">重置</el-button>
        <el-button
          style="float: right; margin-top: 30px;margin-right: 1rem;"
          @click="handleSearchList()"
          type="primary"
          size="small"
        >查询结果</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="110px">
          <el-form-item label="店铺名称：">
            <el-input style="width: 203px" v-model="listQuery.shopName" placeholder="店铺名称"></el-input>
          </el-form-item>
          <el-form-item label="商品名称：">
            <el-input style="width: 203px" v-model="listQuery.name" placeholder="商品名称"></el-input>
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
            <el-select v-model="listQuery.sold_out" placeholder="全部" clearable style="width:202px;">
              <el-option
                v-for="item in publishStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="审核状态：">
            <el-select v-model="listQuery.verifyStatus" placeholder="全部" clearable>
              <el-option
                v-for="item in verifyStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>-->
        </el-form>
      </div>
    </el-card>
    <!-- <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddProduct()"
        size="mini">
        添加
      </el-button>
    </el-card>-->
    <div class="table-container">
      <el-table
        ref="productTable"
        :data="list"
        style="width: 100%"
        height="41.5rem"
        v-loading="listLoading"
        border
      >
        <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
        <el-table-column label="商品ID" align="center">
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
        <el-table-column label="商品类型" width="130" align="center">
          <template slot-scope="scope">
            <!-- <el-select
              v-model="val1"
              placeholder="请选择"
              clearable
              @change="elOptionBlurs(scope.$index,scope.row)"
            >
              <el-option
                v-for="item in nvaluesOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>-->
            {{ scope.row.slProductTypeName}}
            <el-cascader
              placeholder="请选择"
              :options="valueOptionsBase"
              @change="handleChange"
              @blur="blurMone"
              @focus="rowId(scope.$index,scope.row)"
              filterable
              clearable
            ></el-cascader>
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
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{ scope.row.create_time }}</template>
        </el-table-column>
        <el-table-column label="更新时间" align="center">
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
              enterable
            >
              <span v-if="scope.row.sold_out === 2">待审核</span>
            </el-tooltip>
            <span v-if="scope.row.sold_out === 3">未通过</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdateProduct(scope.$index, scope.row)"
              v-if="scope.row.sold_out === 2"
            >去审核</el-button>
            <el-button size="mini" @click="handleButProductZy(scope.$index, scope.row)">一号专区</el-button>
            <!-- <el-button
                v-if="scope.row.sold_out === 1"
                size="mini"
                @click="handleTuiJian(scope.$index, scope.row)"

                >推荐
            </el-button>-->

            <!-- <el-button
              v-if="scope.row.sold_out === 2"
              size="mini"
              @click="handleTongGo(1, scope.row)"
            >通过</el-button>-->
            <!-- <el-button
              v-if="scope.row.sold_out === 2"
              size="mini"
              @click="handleTongGo(3, scope.row)"
            >拒绝</el-button>-->

            <el-button
              v-if="scope.row.sold_out === 1"
              size="mini"
              @click="handleShowVeriyEditDialog(scope.$index, scope.row)"
            >移出一号专区</el-button>
            <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
    </div>-->
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

    <el-dialog title="请选择一号专区商品分类" :visible.sync="vertyProduct.dialogVisible" width="40%">
      <el-form :model="vertyProduct" ref="brandFrom" label-width="150px">
        <el-form-item label="一号店商品分类：" prop="detail">
          <el-select v-model="vertyProduct.isOneType" placeholder="请选择">
            <el-option
              v-for="item in valueOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button @click="vertyProduct.dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEditVConfirm">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--<el-dialog
      title="编辑货品信息"
      :visible.sync="editSkuInfo.dialogVisible"
      width="40%"
    >
      <span>商品货号：</span>
      <span>{{ editSkuInfo.productSn }}</span>
      <el-input
        placeholder="按sku编号搜索"
        v-model="editSkuInfo.keyword"
        size="small"
        style="width: 50%; margin-left: 20px"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handleSearchEditSku"
        ></el-button>
      </el-input>
      <el-table
        style="width: 100%; margin-top: 20px"
        :data="editSkuInfo.stockList"
        border
      >
        <el-table-column label="SKU编号" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.skuCode"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(item, index) in editSkuInfo.productAttr"
          :label="item.name"
          :key="item.id"
          align="center"
        >
          <template slot-scope="scope">
            {{ getProductSkuSp(scope.row, index) }}
          </template>
        </el-table-column>
        <el-table-column label="销售价格" width="80" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="商品库存" width="80" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.stock"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="库存预警值" width="160" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.lowStock"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editSkuInfo.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditSkuConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>-->
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import { routesGo } from "@/api/roues";
import {
  fetchList,
  updateDeleteStatus,
  updateNewStatus,
  updateRecommendStatus,
  updatePublishStatus,
  updateVerifyStatus,
  fetchVList,
  newStatusslProductTypeOne,
  fetchSimpleList,
  getTypes,
  elOptionBlurBaseApi,
} from "@/api/pms/product";
import {
  fetchList as fetchSkuStockList,
  update as updateSkuStockList,
} from "@/api/pms/skuStock";
import { waitCheckMessage } from "@/api/cms/help";
import { fetchList as fetchProductAttrList } from "@/api/pms/productAttr";
import { fetchList as fetchBrandList } from "@/api/pms/brand";
import { fetchListWithChildren } from "@/api/pms/productCate";
// import bus from "../../../../src/api/bus";
const defaultListQuery = {
  id: null, //商家ID
  shopName: null, //店铺名称
  name: null, //商品名称
  product_number: null, //商品编码
  slProductTypeName: null, //商品类型
  sales_volume: null, //销量
  image_url: null, //商品主图
  create_time: null, //创建时间
  updated_at: null, //更新时间
  recommends: null, //是否推荐
  sold_out: null,
  soldOut: null, //商品状态
  pageNum: 1,
  pageSize: 10,
};
export default {
  name: "productList",
  data() {
    return {
      dialogVisible: false,
      val1: [],
      num: 4,
      counts: 0,
      // 多页面切换
      dynamicTags: ["用户管理", "一号专区管理", "匀贸订单"],
      inputVisible: false,
      inputValue: "",
      valueOptionsBase: [], // 商品分类
      editSkuInfo: {
        dialogVisible: false,
        productId: null,
        productSn: "",
        productAttributeCategoryId: null,
        stockList: [],
        productAttr: [],
        keyword: null,
      },
      vertyProduct: {
        dialogVisible: false,
        name: null,
        isOne: 1,
        id: null,
        isOneType: null,
      },
      valueOptions: "", //一号店分类
      operates: [
        {
          label: "商品上架",
          value: "publishOn",
        },
        {
          label: "商品下架",
          value: "publishOff",
        },
        {
          label: "设为推荐",
          value: "recommendOn",
        },
        {
          label: "取消推荐",
          value: "recommendOff",
        },
        {
          label: "设为新品",
          value: "newOn",
        },
        {
          label: "取消新品",
          value: "newOff",
        },
        {
          label: "转移到分类",
          value: "transferCategory",
        },
        {
          label: "移入回收站",
          value: "recycle",
        },
      ],
      operateType: null,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: true,
      selectProductCateValue: null,
      multipleSelection: [],
      productCateOptions: [],
      brandOptions: [],
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
      verifyStatusOptions: [
        {
          value: 1,
          label: "审核通过",
        },
        {
          value: 0,
          label: "未审核",
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
      valueMon: "",
      rowDataMone: "",
    };
  },
  created() {
    // console.log(status)

    this.getList()
    getTypes().then((res) => {
      this.valueOptionsBase = res.data;
    });
    waitCheckMessage({}).then((res) => {
      console.log(res, "mesg");
      this.counts = res.data.slProductListCount;
    });
  },
  watch: {
    selectProductCateValue: function (newValue) {
      if (newValue != null && newValue.length == 2) {
        this.listQuery.productCategoryId = newValue[1];
      } else {
        this.listQuery.productCategoryId = null;
      }
    },
  },
  filters: {
    verifyStatusFilter(value) {
      if (value === 1) {
        return "审核通过";
      } else {
        return "未审核";
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
    getProductSkuSp(row, index) {
      if (index === 0) {
        return row.sp1;
      } else if (index === 1) {
        return row.sp2;
      } else {
        return row.sp3;
      }
    },
    getList() {
      this.listLoading = true;
      let status = localStorage.getItem("soldStatus");
    // console.log(status);
    if (status == null || status == "") {
      this.searchData(0);
    } else if (status == 2) {
      this.listQuery.sold_out = 2;
      this.searchData(2);
      // this.goShengHe()
    } else if (status == 3) {
      this.searchData(3);
      this.listQuery.sold_out = 3;
    } else if (status == 1) {
      this.searchData(1);
      this.listQuery.sold_out = 1;
    } else if (status == 0) {
      this.searchData(0);
      this.listQuery.sold_out = 0;
    }
    this.listQuery.soldOut = this.listQuery.sold_out;
      fetchList(this.listQuery).then((response) => {
        console.log(response, "状态");
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    elOptionBlurs(index, row) {
      // console.log(row.shopName);
      // let name=row.shopName
      getTypes({
        // name
      }).then((res) => {
        // console.log(res);
        // this.typeList=res.data.list
        if (res.code == 200) {
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
    type() {
      postTypes({}).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInputOne.$refs.input.focus();
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
    // 支持多页面跳转的方法
    runTab(e) {
      // console.log(e.target.innerText);
      routesGo(e);
    },

    // getBrandList() {
    //   fetchBrandList({ pageNum: 1, pageSize: 100 }).then((response) => {
    //     this.brandOptions = [];
    //     let brandList = response.data.records;
    //     for (let i = 0; i < brandList.length; i++) {
    //       this.brandOptions.push({
    //         label: brandList[i].name,
    //         value: brandList[i].id,
    //       });
    //     }
    //   });
    // },
    // getProductCateList() {
    //   fetchListWithChildren().then((response) => {
    //     let list = response.data;
    //     this.productCateOptions = [];
    //     for (let i = 0; i < list.length; i++) {
    //       let children = [];
    //       if (list[i].children != null && list[i].children.length > 0) {
    //         for (let j = 0; j < list[i].children.length; j++) {
    //           children.push({
    //             label: list[i].children[j].name,
    //             value: list[i].children[j].id,
    //           });
    //         }
    //       }
    //       this.productCateOptions.push({
    //         label: list[i].name,
    //         value: list[i].id,
    //         children: children,
    //       });
    //     }
    //   });
    // },

    //通过拒绝 1   3
    handleTongGo(num, row) {
      if (num == 1) {
        this.$confirm("是否要通过审核", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.listLoading = true;
          fetchVList({ id: row.id, soldOut: num }).then((response) => {
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
      } else if (num == 3) {
        this.$confirm("是否要拒绝商品", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.listLoading = true;
          fetchVList({ id: row.id, soldOut: num }).then((response) => {
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
      }
    },

    //下架
    handleShowVeriyEditDialog(index, row) {
      this.$confirm("是否要下架商品", "提示", {
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
    // handleShowSkuEditDialog(index, row) {
    //   this.editSkuInfo.dialogVisible = true;
    //   this.editSkuInfo.productId = row.id;
    //   this.editSkuInfo.productSn = row.productSn;
    //   this.editSkuInfo.productAttributeCategoryId =
    //     row.productAttributeCategoryId;
    //   this.editSkuInfo.keyword = null;
    //   fetchSkuStockList(row.id, { keyword: this.editSkuInfo.keyword }).then(
    //     (response) => {
    //       this.editSkuInfo.stockList = response.data;
    //     }
    //   );
    //   fetchProductAttrList(row.productAttributeCategoryId, { type: 0 }).then(
    //     (response) => {
    //       this.editSkuInfo.productAttr = response.data.records;
    //     }
    //   );
    // },
    handleSearchEditSku() {
      fetchSkuStockList(this.editSkuInfo.productId, {
        keyword: this.editSkuInfo.keyword,
      }).then((response) => {
        this.editSkuInfo.stockList = response.data;
      });
    },
    handleEditSkuConfirm() {
      if (
        this.editSkuInfo.stockList == null ||
        this.editSkuInfo.stockList.length <= 0
      ) {
        this.$message({
          message: "暂无sku信息",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.$confirm("是否要进行修改", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        updateSkuStockList(
          this.editSkuInfo.productId,
          this.editSkuInfo.stockList
        ).then((response) => {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 1000,
          });
          this.editSkuInfo.dialogVisible = false;
        });
      });
    },
    //1号专区
    handleButProductZy(index, row) {
      this.vertyProduct.dialogVisible = true;
      this.vertyProduct.id = row.id;
      newStatusslProductTypeOne().then((response) => {
        this.valueOptions = response.data;
      });
    },

    handleEditVConfirm() {
      // if (this.vertyProduct.detail == null) {
      //   this.$message({
      //     message: "暂无审核信息",
      //     type: "warning",
      //     duration: 1000,
      //   });
      //   return;
      // }
      if (this.vertyProduct.isOneType == null) {
        this.$message({
          message: "请选择商品类型",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.$confirm("是否要移到一号店专区", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        fetchSimpleList(this.vertyProduct).then((response) => {
          if (response.code == 200) {
            this.$message({
              message: "转移成功",
              type: "success",
              duration: 1000,
            });
            this.vertyProduct.isOneType = null;
            this.getList();
          }
        });
        this.vertyProduct.dialogVisible = false;
      });
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
          isOne:2
        };
        fetchList(newData).then((response) => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      }else {
        let newData = {
          pageNum: this.listQuery.pageNum,
          pageSize: this.listQuery.pageSize,
          productName: this.listQuery.name, //商品名称
          shopName: this.listQuery.shopName, //店铺名称
          soldOut: this.listQuery.sold_out, //商品状态
          isOne:2
        };
        fetchList(newData).then((response) => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
          localStorage.setItem("soldStatus", this.listQuery.sold_out);
        });
      }
    },
    //查看商品详情
    handleAddProduct(index, row) {
      this.$router.push({ path: "/pms/addProduct", query: { id: row.id } });
    },
    handleBatchOperate() {
      if (this.operateType == null) {
        this.$message({
          message: "请选择操作类型",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: "请选择要操作的商品",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.$confirm("是否要进行该批量操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
        switch (this.operateType) {
          case this.operates[0].value:
            this.updatePublishStatus(1, ids);
            break;
          case this.operates[1].value:
            this.updatePublishStatus(0, ids);
            break;
          case this.operates[2].value:
            this.updateRecommendStatus(1, ids);
            break;
          case this.operates[3].value:
            this.updateRecommendStatus(0, ids);
            break;
          case this.operates[4].value:
            this.updateNewStatus(1, ids);
            break;
          case this.operates[5].value:
            this.updateNewStatus(0, ids);
            break;
          case this.operates[6].value:
            break;
          case this.operates[7].value:
            this.updateDeleteStatus(1, ids);
            break;
          default:
            break;
        }
        this.getList();
      });
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.listQuery.productName = this.listQuery.name;
      if (this.listQuery.create_time) {
        this.listQuery.createTimeEnd = this.listQuery.create_time[1];
        this.listQuery.createTimeBegin = this.listQuery.create_time[0];
      }
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handlePublishStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      this.updatePublishStatus(row.publishStatus, ids);
    },
    handleNewStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      this.updateNewStatus(row.newStatus, ids);
    },
    handleVerifyStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      this.updateVerifyStatus(row.verifyStatus, ids);
    },
    handleRecommendStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      this.updateRecommendStatus(row.recommandStatus, ids);
    },
    //重置
    handleResetSearch() {
      this.selectProductCateValue = [];
      this.listQuery = Object.assign({}, defaultListQuery);
      let arr=null
      localStorage.setItem("soldStatus",arr)
      this.getList();
    },
    //删除
    handleDelete(index, row) {
      // console.log(row, "ss");
      this.$confirm("是否要进行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        updateDeleteStatus({ id: row.id, del: 1 }).then((response) => {
          if (response.code == 200) {
            this.$message({
              message: "删除成功",
              type: "success",
              duration: 1000,
            });
            this.getList();
          }
        });
      });
    },

    handleUpdateProduct(index, row) {
      this.$router.push({ path: "/pms/updateProduct", query: { id: row.id } });
      // this.afterShowTab(this.soldStatus);
    },
    handleShowProduct(index, row) {
      // console.log("handleShowProduct", row);
    },
    handleShowVerifyDetail(index, row) {
      // console.log("handleShowVerifyDetail", row);
    },
    handleShowLog(index, row) {
      // console.log("handleShowLog", row);
    },
    updateVerifyStatus(publishStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("verifyStatus", verifyStatus);
      updateVerifyStatus(params).then((response) => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    updatePublishStatus(publishStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("publishStatus", publishStatus);
      updatePublishStatus(params).then((response) => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    updateNewStatus(newStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("newStatus", newStatus);
      updateNewStatus(params).then((response) => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    updateRecommendStatus(recommendStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("recommendStatus", recommendStatus);
      updateRecommendStatus(params).then((response) => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    searchData(status) {
      console.log(status,"status")
      let newData = {
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        productName: this.listQuery.name, //商品名称
        shopName: this.listQuery.shopName, //店铺名称
        soldOut: status, //商品状态
      };
      fetchList(newData).then((response) => {
        // console.log(response.data,"response.data----")
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    goShengHe() {
      // this.$router.push({})
      let status = 2;
      this.searchData(status);
      this.listQuery.sold_out = status;
      localStorage.setItem("soldStatus",status)
    },
    handleChange(vals) {
      console.log(vals);
      this.valueMon = vals[1];
    },
    rowId(index, row) {
      console.log(row.id);
      this.rowDataMone = row.id;
    },
    blurMone() {
      console.log(this.rowDataMone, this.valueMon);
      if (this.rowDataMone && this.valueMon) {
        elOptionBlurBaseApi({
          id: this.rowDataMone,
          productTypeId: this.valueMon,
        }).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1000,
            });
            this.rowDataMone = this.valueMon = "";
            this.getList();
          }
        });
      }
    },
    // 组件互通方法
    // afterShowTab(data) {
    //   bus.$emit("changeActive", data);
    // },
    // getNewDdata(data) {
    //   let newData = {
    //     pageNum: this.listQuery.pageNum,
    //     pageSize: this.listQuery.pageSize,
    //     productName: this.listQuery.name, //商品名称
    //     shopName: this.listQuery.shopName, //店铺名称
    //     soldOut: data, //商品状态
    //   };
    //   fetchList(newData).then((response) => {
    //     this.listLoading = false;
    //     this.list = response.data.list;
    //     this.total = response.data.total;
    //   });
    // },
    // updateDeleteStatus(deleteStatus, ids) {
    //   let params = new URLSearchParams();
    //   params.append("ids", ids);
    //   params.append("deleteStatus", deleteStatus);
    //   updateDeleteStatus(params).then((response) => {
    //     this.$message({
    //       message: "删除成功",
    //       type: "success",
    //       duration: 1000,
    //     });
    //   });
    //   this.getList();
    // },
  },
  mounted() {},
};
</script>
<style>
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
  border-bottom: 1px solid rgba(34, 136, 238, 0.2);
  padding-bottom: 10px;
  margin-right: 700px;
}
.el-tag {
  margin-left: 0px;
  border-radius: 0;
  padding: 1px 30px;
}
.el-tag + .el-tag {
  border-left: none;
}
.button-new-tag {
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



