<template>
   
  <div class="detail-container">
    <el-card shadow="never">
      <span>{{ homeAdvertise.shopName }}店铺的编辑</span>
    </el-card>

    <el-card shadow="never" style="margin-top: 15px">
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">店铺名称</el-col>
          <el-col :span="12" class="table-cell">
            <el-input
              size="mini"
              placeholder="请输入内容"
              v-model="homeAdvertise.shopName"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">店铺所在省</el-col>
          <el-col :span="12" class="table-cell">
            <el-input
              size="mini"
              placeholder="请输入内容"
              v-model="homeAdvertise.province"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">店铺所在市</el-col>
          <el-col :span="12" class="table-cell">
            <el-input
              size="mini"
              placeholder="请输入内容"
              v-model="homeAdvertise.city"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">店铺所在区县</el-col>
          <el-col :span="12" class="table-cell">
            <el-input
              size="mini"
              placeholder="请输入内容"
              v-model="homeAdvertise.country"
            >
            </el-input
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">店铺所在乡镇</el-col>
          <el-col :span="12" class="table-cell">
            <el-input
              size="mini"
              placeholder="请输入内容"
              v-model="homeAdvertise.town"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">店铺所在村.街道</el-col>
          <el-col :span="12" class="table-cell">
            <el-input
              size="mini"
              placeholder="请输入内容"
              v-model="homeAdvertise.street"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">店铺所在地址信息</el-col>
          <el-col :span="12" class="table-cell">
            <el-input
              size="mini"
              placeholder="请输入内容"
              v-model="homeAdvertise.otherAdd"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">身份证号码</el-col>
          <el-col :span="12" class="table-cell">
            <el-input
              size="mini"
              placeholder="请输入内容"
              v-model="homeAdvertise.idCardNum"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">店铺图片</el-col>
          <el-col :span="12" class="table-cell" style="padding: 5px"
            >{{ homeAdvertise.shopImageUrl }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" class="table-cell">
            <el-upload
              :action="actionHttp"
              list-type="picture-card"
              multiple
              :limit="1"
              :headers="headers"
              :file-list="fileListAdd"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleAddRemove"
              :on-change="handleAddChange"
              :on-exceed="handleExceed"
              :auto-upload="true"
              :class="{ hide: hideUploadAdd }"
            >
              <i class="el-icon-plus"></i>
              <!-- <div class="el-upload__tip" slot="tip">（最多上传5张图片，每张不超过20M）</div> -->
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">店铺Logo</el-col>
          <el-col :span="12" class="table-cell" style="overflow: hidden">{{
            homeAdvertise.logImageUrl
          }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="18" class="table-cell">
            <el-upload
              :action="actionHttp"
              list-type="picture-card"
              multiple
              :limit="1"
              :headers="headers"
              :file-list="fileListAddOne"
              :on-preview="handlePictureCardPreviewOne"
              :on-remove="handleAddRemove"
              :on-change="handleAddChangeOne"
              :on-exceed="handleExceed"
              :auto-upload="true"
              :class="{ hide: hideUploadAdd }"
            >
              <i class="el-icon-plus"></i>
              <!-- <div class="el-upload__tip" slot="tip">（最多上传5张图片，每张不超过20M）</div> -->
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">身份证正面</el-col>
          <el-col :span="12" class="table-cell" style="overflow: hidden">{{
            homeAdvertise.idCardFimageUrl
          }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="18" class="table-cell">
            <el-upload
              :action="actionHttp"
              list-type="picture-card"
              multiple
              :limit="1"
              :headers="headers"
              :file-list="fileListAddTwo"
              :on-preview="handlePictureCardPreviewTwo"
              :on-remove="handleAddRemove"
              :on-change="handleAddChangeTwo"
              :on-exceed="handleExceed"
              :auto-upload="true"
              :class="{ hide: hideUploadAdd }"
            >
              <i class="el-icon-plus"></i>
              <!-- <div class="el-upload__tip" slot="tip">（最多上传5张图片，每张不超过20M）</div> -->
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">身份证反面</el-col>
          <el-col :span="12" class="table-cell">{{
            homeAdvertise.idCardBimageUrl
          }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="18" class="table-cell">
            <el-upload
              :action="actionHttp"
              list-type="picture-card"
              multiple
              :limit="1"
              :headers="headers"
              :file-list="fileListAddTree"
              :on-preview="handlePictureCardPreviewTree"
              :on-remove="handleAddRemove"
              :on-change="handleAddChangeTree"
              :on-exceed="handleExceed"
              :auto-upload="true"
              :class="{ hide: hideUploadAdd }"
            >
              <i class="el-icon-plus"></i>
              <!-- <div class="el-upload__tip" slot="tip">（最多上传5张图片，每张不超过20M）</div> -->
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">手持身份证</el-col>
          <el-col :span="12" class="table-cell">{{
            homeAdvertise.idCardHimageUrl
          }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="18" class="table-cell">
            <el-upload
              :action="actionHttp"
              list-type="picture-card"
              multiple
              :limit="1"
              :headers="headers"
              :file-list="fileListAddFour"
              :on-preview="handlePictureCardPreviewFour"
              :on-remove="handleAddRemove"
              :on-change="handleAddChangeFour"
              :on-exceed="handleExceed"
              :auto-upload="true"
              :class="{ hide: hideUploadAdd }"
            >
              <i class="el-icon-plus"></i>
              <!-- <div class="el-upload__tip" slot="tip">（最多上传5张图片，每张不超过20M）</div> -->
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="6"
            class="table-cell-title"
            >营业执照</el-col
          >
          <el-col
            :span="12"
            class="table-cell"
            >{{ homeAdvertise.imageUrl }}</el-col
          >
        </el-row>
        <!-- :action='process.env.BASE_API'+"/api-zt/fileUpload/uploadFile" -->
        <el-row>
          <el-col :span="18" class="table-cell">
            <el-upload
              :action="actionHttp"
              list-type="picture-card"
              multiple
              :limit="1"
              :headers="headers"
              :file-list="fileListAddSix"
              :on-preview="handlePictureCardPreviewSix"
              :on-remove="handleAddRemove"
              :on-change="handleAddChangeSix"
              :on-exceed="handleExceed"
              :auto-upload="true"
              :class="{ hide: hideUploadAdd }"
            >
              <i class="el-icon-plus"></i>
              <!-- <div class="el-upload__tip" slot="tip">（最多上传5张图片，每张不超过20M）</div> -->
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" class="table-cell" style="text-align: center;border-bottom: 1px solid #dcdfe6">
            <el-button type="primary" @click="routerBack()">取 消</el-button>
            <el-button type="primary" @click="onSubmit()">保 存</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
import { createselShopById, createupShopInfo } from "@/api/sms/homeAdvertise";

const defaultReceiverInfo = {
  shopName: null,
  province: null,
  city: null,
  country: null,
  town: null,
  street: null,
  otherAdd: null,
  idCardNum: null,
  shopImageUrl: null,
  logImageUrl: null,
  idCardFimageUrl: null,
  idCardBimageUrl: null,
  idCardHimageUrl: null,
  imageUrl: null,
  ownerId: null,
};
export default {
  name: "orderDetail",
  // components: { VDistpicker, LogisticsDialog},
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      headers: {
        Authorization: localStorage.getItem("hou"), //从cookie里获取token，并赋值  Authorization ，而不是token
      },
      actionHttp: "http://ztapi.sootoken.com.cn/api-zt/fileUpload/uploadFile",
      homeAdvertise: Object.assign({}, defaultReceiverInfo),
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
      list: [
        {
          id: null,
          serviceCheckDetail: null,
          serviceCheckState: null,
        },
      ],
      fileListAdd: [],
      fileListAddOne: [],
      fileListAddTwo: [],
      fileListAddTree: [],
      fileListAddFour: [],
      fileListAddSix: [],
      hideUploadAdd: false,
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  created() {
    if (this.isEdit) {
      let newData = new FormData();
      newData.append("ownerId", this.$route.query.id);
      createselShopById(newData).then((response) => {
        this.homeAdvertise = response.data;
        if (response.data.shopImageUrl) {
          let data = { url: response.data.shopImageUrl };
          this.fileListAdd.push(data);
        }
        if (response.data.logImageUrl) {
          let dataOne = { url: response.data.logImageUrl };
          this.fileListAddOne.push(dataOne);
        }
        if (response.data.idCardFimageUrl) {
          let dataTwo = { url: response.data.idCardFimageUrl };
          this.fileListAddTwo.push(dataTwo);
        }
        if (response.data.idCardBimageUrl) {
          let dataTree = { url: response.data.idCardBimageUrl };
          this.fileListAddTree.push(dataTree);
        }
        if (response.data.idCardHimageUrl) {
          let dataToure = { url: response.data.idCardHimageUrl };
          this.fileListAddFour.push(dataToure);
        }
        if (response.data.imageUrl) {
          let dataSix = { url: response.data.imageUrl };
          this.fileListAddSix.push(dataSix);
        }
      });
    } else {
      this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
    }
  },
  methods: {
    handleAddRemove() {},
    handleExceed() {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAddChange(file, fileList) {
      if (file.response !== undefined) {
        this.homeAdvertise.shopImageUrl = file.response.data.fileUrl;
      }
      this.fileListAdd = fileList;
      if (fileList.length >= 1) {
        this.hideUploadAdd = true;
      }
    },
    handlePictureCardPreviewOne(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAddChangeOne(file, fileList) {
      if (file.response !== undefined) {
        this.homeAdvertise.logImageUrl = file.response.data.fileUrl;
      }
      this.fileListAddOne = fileList;
      if (fileList.length >= 1) {
        this.hideUploadAdd = true;
      }
    },
    handlePictureCardPreviewTwo(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAddChangeTwo(file, fileList) {
      if (file.response !== undefined) {
        this.homeAdvertise.idCardFimageUrl = file.response.data.fileUrl;
      }
      this.fileListAddTwo = fileList;
      if (fileList.length >= 1) {
        this.hideUploadAdd = true;
      }
    },
    handlePictureCardPreviewTree(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAddChangeTree(file, fileList) {
      if (file.response !== undefined) {
        this.homeAdvertise.idCardBimageUrl = file.response.data.fileUrl;
      }
      this.fileListAddTree = fileList;
      if (fileList.length >= 1) {
        this.hideUploadAdd = true;
      }
    },
    handlePictureCardPreviewFour(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAddChangeFour(file, fileList) {
      if (file.response !== undefined) {
        this.homeAdvertise.idCardHimageUrl = file.response.data.fileUrl;
      }
      this.fileListAddFour = fileList;
      if (fileList.length >= 1) {
        this.hideUploadAdd = true;
      }
    },
    handlePictureCardPreviewSix(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAddChangeSix(file, fileList) {
      if (file.response !== undefined) {
        this.homeAdvertise.imageUrl = file.response.data.fileUrl;
      }
      this.fileListAddSix = fileList;
      if (fileList.length >= 1) {
        this.hideUploadAdd = true;
      }
    },
    routerBack() {
      this.$router.back();
    },
    onSubmit() {
      this.$confirm("是否要进行提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let newData = new FormData();
        newData.append("shopName", this.homeAdvertise.shopName);
        newData.append("province", this.homeAdvertise.province);
        newData.append("city", this.homeAdvertise.city);
        newData.append("country", this.homeAdvertise.country);
        newData.append("town", this.homeAdvertise.town);
        newData.append("street", this.homeAdvertise.street);
        newData.append("otherAdd", this.homeAdvertise.otherAdd);
        newData.append("idCardNum", this.homeAdvertise.idCardNum);
        newData.append("shopImageUrl", this.homeAdvertise.shopImageUrl);
        newData.append("logImageUrl", this.homeAdvertise.logImageUrl);
        newData.append("idCardFimageUrl", this.homeAdvertise.idCardFimageUrl);
        newData.append("idCardBimageUrl", this.homeAdvertise.idCardBimageUrl);
        newData.append("idCardHimageUrl", this.homeAdvertise.idCardHimageUrl);
        newData.append("imageUrl", this.homeAdvertise.imageUrl);
        newData.append("ownerId", this.homeAdvertise.ownerId);
        createupShopInfo(newData).then((response) => {
          if(response.code==200){
             this.$message({
              message: '操作成功！',
              type: 'success',
              duration: 1000
            });
            this.$router.back();
          }else{
            this.$message({
              message: '操作失败！',
              type: 'error',
              duration: 1000
            });
          }
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.detail-container {
  width: 80%;
  padding: 0px 20px 20px 20px;
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
  margin-top: 10px;
  border-left: 1px solid #dcdfe6;
}

.table-cell {
  border-top: 1px solid #dcdfe6;
  border-right: 1px solid #dcdfe6;
  padding: 10px;
  font-size: 14px;
  color: #606266;
  word-break: break-all;
}

.table-cell-title {
  height: 50px;
  line-height: 50px;
  border-top: 1px solid #dcdfe6;
  border-right: 1px solid #dcdfe6;
  padding-left: 10px;
  background: #f2f6fc;
  font-size: 14px;
  color: #303133;
}

.hide {
  .el-upload-picture-card {
    text-align: center;
    display: none !important;
  }
}
</style>


