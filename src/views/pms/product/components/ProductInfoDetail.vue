<template>
  <div style="margin-buttom: 30px">
    <el-form
      :model="value"
      :rules="rules"
      ref="productInfoForm"
      label-width="120px"
      style="width: 850px"
      size="small"
    >
      <!-- <el-form-item label="商品分类：" prop="productCategoryId">
        <el-cascader
          v-model="selectProductCateValue"
          :options="productCateOptions">
        </el-cascader>
      </el-form-item>-->
      <el-form-item label="商品轮播图片：" prop="name">
        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item v-for="(item,index ) of value.image" :key="index">
            <img :src="item.imageUrl" alt style="width:100%;height:100%" />
          </el-carousel-item>
        </el-carousel>
      </el-form-item>
      <el-form-item>
        <table id="customers">
          <tr>
            <td style="width:200px;">商品名称 :</td>
            <td>{{ value.product.name }}</td>
          </tr>
          <tr>
            <td>商品分类 :</td>
            <td>{{ value.slProductType.name }}</td>
          </tr>
          <tr>
            <td>选择专区：</td>
            <!-- <td>
              <el-select
                v-model="value.product.isOne"
                @change="handleBrandChange"
                placeholder="请选择专区"
                disabled
              >
                <el-option
                  v-for="item in brandOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td> -->
          </tr>
          <tr>
            <td>配送方式:</td>
            <td>
              <span v-if="value.product.deliveryType === '1'">自提</span>
              <span v-if="value.product.deliveryType === '2'">物流</span>
              <span v-if="value.product.deliveryType === '3'">配送</span>
              <span v-if="value.product.deliveryType === '1,2'">自提+物流</span>
              <span v-if="value.product.deliveryType === '1,3'">自提+配送</span>
              <span v-if="value.product.deliveryType === '2,3'">物流+配送</span>
              <span v-if="value.product.deliveryType === '1,2,3'">自提+物流+配送</span>
              <span v-if="value.product.deliveryType === '1,3,2'">自提+物流+配送</span>
            </td>
          </tr>
          <tr>
            <td>规格参数：</td>
            <td style="height:70px;padding-top:20px">
              <el-table :data="value.slProductRepositoryList" style="width: 100%;margin-top:-11px">
                <el-table-column prop="productDetailGroupName" label="规格名称-规格值" width="180"></el-table-column>
                <el-table-column prop="price" label="价格" width="180"></el-table-column>
                <el-table-column prop="count" label="库存数"></el-table-column>
              </el-table>
            </td>
          </tr>
          <tr>
            <td>商品详情：</td>
            <td>
              <quill-editor
                ref="myTextEditor"
                v-model="value.product.detail"
                @focus="onEditorFocus($event)"
              ></quill-editor>
            </td>
          </tr>
        </table>
      </el-form-item>
      <!-- <el-form-item label="商品名称：" prop="name">
        <span>{{ value.product.name }}</span>
        <el-input v-else v-model="value.slProductRepositoryList[0].productName"></el-input>
      </el-form-item>
      <el-form-item label="商品分类：" prop="subTitle">
        <span>{{ value.slProductType.name }}</span>
        <el-input v-model="value.slProductType.name"></el-input>
      </el-form-item>
      <el-form-item label="选择专区：" prop="brandId">
        <el-select
          v-model="value.product.isOne"
          @change="handleBrandChange"
          placeholder="请选择专区"
          disabled
        >
          <el-option
            v-for="item in brandOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>-->
      <!-- <el-form-item label="配送方式：">
        <span v-if="value.product.deliveryType === '1'">自提</span>
        <span v-if="value.product.deliveryType === '2'">物流</span>
        <span v-if="value.product.deliveryType === '3'">配送</span>
        <span v-if="value.product.deliveryType === '1,2'">自提+物流</span>
        <span v-if="value.product.deliveryType === '1,3'">自提+配送</span>
        <span v-if="value.product.deliveryType === '2,3'">物流+配送</span>
        <span v-if="value.product.deliveryType === '1,2,3'">自提+物流+配送</span>
        <span v-if="value.product.deliveryType === '1,3,2'">自提+物流+配送</span>
        <el-input v-model="value.subTitle"></el-input>
      </el-form-item>
      <el-form-item label="规格参数：">
        <el-table :data="value.slProductRepositoryList" style="width: 100%;margin-top:-11px">
          <el-table-column prop="productDetailGroupName" label="规格名称-规格值" width="180"></el-table-column>
          <el-table-column prop="price" label="价格" width="180"></el-table-column>
          <el-table-column prop="count" label="库存数"></el-table-column>
        </el-table>
      </el-form-item>-->
      <!-- <el-form-item label="商品详情：" class="pro-form">
      </el-form-item>-->
      <!-- <el-form-item label="商品货号：">
        <el-input v-model="value.productSn"></el-input>
      </el-form-item>
      <el-form-item label="商品售价：">
        <el-input v-model="value.price"></el-input>
      </el-form-item>
      <el-form-item label="市场价：">
        <el-input v-model="value.originalPrice"></el-input>
      </el-form-item>
      <el-form-item label="商品库存：">
        <el-input v-model="value.stock"></el-input>
      </el-form-item>
      <el-form-item label="计量单位：">
        <el-input v-model="value.unit"></el-input>
      </el-form-item>
      <el-form-item label="商品重量：">
        <el-input v-model="value.weight" style="width: 300px"></el-input>
        <span style="margin-left: 20px">克</span>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="value.sort"></el-input>
      </el-form-item>-->
      <!-- <el-form-item style="text-align: center">
        <el-button
          type="primary"
          size="medium"
          @click="handleNext('productInfoForm')"
          >下一步，填写商品促销</el-button
        >
      </el-form-item>-->
    </el-form>
    <div class="btns">
      <el-button type="primary" size="mini" @click="pass">提交并通过审核</el-button>
      <el-button type="danger" size="mini" class="btn-item" @click="disagree">拒绝</el-button>
    </div>
    <el-dialog title="提示" width="30%" :visible.sync="dialogVisible">
      <el-form :model="ruleForm" :rules="rulesForm" ref="ruleForm" label-width="100px">
        <el-form-item label="拒绝原因" prop="reason">
          <el-input v-model="ruleForm.reason" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="yes('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchListWithChildren } from "@/api/pms/productCate";
import { fetchList as fetchBrandList } from "@/api/pms/brand";
import { getProduct, fetchVList } from "@/api/pms/product";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "ProductInfoDetail",
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 组件传值
      activeItem: "",
      hasEditCreated: false,
      //选中商品分类的值
      selectProductCateValue: [],
      productCateOptions: [],
      brandOptions: [
        {
          value: 1,
          label: "一号店专区",
        },
        {
          value: 2,
          label: "不是一号店专区",
        },
      ],
      valueOption: "",
      dialogVisible: false,
      ruleForm: { reason: "" },
      rulesForm: {
        reason: [
          { required: true, message: "请输入拒绝通过原因", trigger: "blur" },
          { min: 4, message: "拒绝原因至少4个字符", trigger: "blur" },
        ],
      },
      rules: {
        // name: [
        //   { required: true, message: "请输入商品名称", trigger: "blur" },
        //   {
        //     min: 2,
        //     max: 140,
        //     message: "长度在 2 到 140 个字符",
        //     trigger: "blur",
        //   },
        // ],
        // subTitle: [
        //   { required: true, message: "请输入商品副标题", trigger: "blur" },
        // ],
        // productCategoryId: [
        //   { required: true, message: "请选择商品分类", trigger: "blur" },
        // ],
        // brandId: [
        //   { required: true, message: "请选择商品品牌", trigger: "blur" },
        // ],
        // description: [
        //   { required: true, message: "请输入商品介绍", trigger: "blur" },
        // ],
        // requiredProp: [
        //   { required: true, message: "该项为必填项", trigger: "blur" },
        // ],
      },
    };
  },
  components: {
    quillEditor,
  },
  created() {
    // this.getProductCateList();
    // this.getBrandList();
  },
  computed: {
    //商品的编号
    productId() {
      return this.value;
    },
  },
  watch: {
    productId: function (newValue) {
      if (!this.isEdit) return;
      if (this.hasEditCreated) return;
      if (newValue === undefined || newValue == null || newValue === 0) return;
      this.handleEditCreated();
    },
    selectProductCateValue: function (newValue) {
      if (newValue != null && newValue.length === 2) {
        this.value.productCategoryId = newValue[1];
        this.value.productCategoryName = this.getCateNameById(
          this.value.productCategoryId
        );
      } else {
        this.value.productCategoryId = null;
        this.value.productCategoryName = null;
      }
    },
  },
  methods: {
    //编辑禁止点击
    onEditorFocus(event) {
      event.enable(false);
    }, // 获得焦点事件
    //处理编辑逻辑
    handleEditCreated() {
      if (this.value.productCategoryId != null) {
        this.selectProductCateValue.push(this.value.cateParentId);
        this.selectProductCateValue.push(this.value.productCategoryId);
      }
      this.hasEditCreated = true;
    },
    handleClose(done) {},
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
    getCateNameById(id) {
      let name = "";
      for (let i = 0; i < this.productCateOptions.length; i++) {
        for (let j = 0; i < this.productCateOptions[i].children.length; j++) {
          if (this.productCateOptions[i].children[j].value === id) {
            name = this.productCateOptions[i].children[j].label;
            return name;
          }
        }
      }
      return name;
    },
    handleNext(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("nextStep");
        } else {
          this.$message({
            message: "验证失败",
            type: "error",
            duration: 1000,
          });
          return false;
        }
      });
    },
    handleBrandChange(val) {
      let brandName = "";
      for (let i = 0; i < this.brandOptions.length; i++) {
        if (this.brandOptions[i].value === val) {
          brandName = this.brandOptions[i].label;
          break;
        }
      }
      this.value.brandName = brandName;
    },
    pass() {
      this.$confirm("是否要通过审核", "提示", {
        confirmButtonText: "确定",
        canceButtonText: "取消",
        type: "warning",
      }).then(() => {
        let soldOut = "1";
        fetchVList({
          id: this.$route.query.id,
          soldOut,
          reason: "通过",
        }).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$message({
              message: "提交成功",
              type: "success",
              duration: 1000,
            });
            this.$router.back();
          }
        });
      });
    },
    yes(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let soldOut = "3";
          fetchVList({
            id: this.$route.query.id,
            soldOut,
            reason: this.ruleForm.reason,
          }).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "已提交信息",
                type: "success",
                duration: 1000,
              });
              this.$router.go(-1);
            }
          });
        } else if (!valid) {
          this.$message.warning("请填写拒绝原因！");
        }
      });
    },
    disagree() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.btns {
  text-align: center;
  position: fixed;
  bottom: 3rem;
  left: 50%;
}
.table-detail td {
  border: 1px solid tomato;
  border-collapse: collapse;
}
/* .el-form-item{} */
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  text-align: center;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4caf50;
  color: white;
}
.quill-editor{cursor: pointer;}
</style>
