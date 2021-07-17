<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <span class="welcome">欢迎用户: {{ name }}</span>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar" @click="dialogVisible2 = true" />
        <!-- <el-upload
          class="user-avatar"
          action="uploadHttp"
          :limit="1"
          :multiple="false"
          :headers="headers"
          :auto-upload="true"
          :file-list="fileListAdd"
          :on-change="handleAddChange"
          :on-exceed="handleExceed"
          :on-remove="handleAddRemove"
          :on-preview="handlePictureCardPreview"
        >
          <img class="user-img" :src="avatar" />
        </el-upload>-->
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>首页</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog title="上传头像" :visible.sync="dialogVisible2" width="30%">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" ref="uploadElement">
          <el-upload
            ref="upload"
            :action="uploadHttp"
            :headers="headers"
            accept="image/png, image/gif, image/jpg, image/jpeg"
            list-type="picture-card"
            :limit="limitNum"
            multiple
            :auto-upload="false"
            :on-exceed="handleExceed"
            :before-upload="handleBeforeUpload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="imgChange"
            :class="{hide:hideUpload}"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="uploadFile">立即上传</el-button>
          <el-button size="small" @click="tocancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
// import {user} from "@/store/modules/user"
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { createselShopById, createupShopInfo } from "@/api/sms/homeAdvertise";

export default {
  data() {
    return {
      headers: {
        Authorization: localStorage.getItem("hou"), //从cookie里获取token，并赋值  Authorization ，而不是token
      },
      uploadHttp: "http://ztapi.sootoken.com.cn/api-zt/fileUpload/uploadFile",
      fileListAdd: [],
      hideUpload: false,
      dialogImageUrl: "",
      dialogVisible: false, //图片预览弹窗
      formLabelWidth: "80px",
      limitNum: 1,
      form: {},
      dialogVisible2: false, //弹窗
    };
  },
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "name"]),
  },
  methods: {
    // 上传文件之前的钩子
    handleBeforeUpload(file) {
      if (
        !(
          file.type === "image/png" ||
          file.type === "image/gif" ||
          file.type === "image/jpg" ||
          file.type === "image/jpeg"
        )
      ) {
        this.$notify.warning({
          title: "警告",
          message:
            "请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片",
        });
      }
      let size = file.size / 1024 / 1024 / 2;
      if (size > 2) {
        this.$notify.warning({
          title: "警告",
          message: "图片大小必须小于2M",
        });
      }
      let fd = new FormData(); //通过form数据格式来传
      fd.append("picFile", file); //传文件
      console.log(fd.get("picFile"));
      this.api({
        url: "/test/up",
        method: "post",
        data: fd,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((data) => {});
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {},
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      this.hideUpload = fileList.length >= this.limitNum;
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadFile() {
      this.$refs.upload.submit();
    },
    imgChange(files, fileList) {
      this.hideUpload = fileList.length >= this.limitNum;
      if (fileList) {
        this.$refs.uploadElement.clearValidate();
      }
    },
    tocancel() {
      this.dialogVisible2 = false;
    },
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    },
    handleAddRemove() {},
    handleExceed() {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // handleAddChange(file, fileList) {
    //   if (file.response !== undefined) {
    //     this.homeAdvertise.logImageUrl = file.response.data.fileUrl;
    //   }
    //   this.fileListAddOne = fileList;
    //   if (fileList.length >= 1) {
    //     this.hideUploadAdd = true;
    //   }
    //   this.$confirm("确定上传吗?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       this.$message({
    //         type: "success",
    //         message: "删除成功!",
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除",
    //       });
    //     });
    // },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .welcome {
    float: right;
    margin-right: 6rem;
    cursor: progress;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      display: flex;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        margin-left: 10px;
        border-radius: 10px;
        animation: avatorOricle 4s linear infinite;
        .user-img {
          width: 100%;
          height: 100%;
        }
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
@keyframes avatorOricle {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
.hide .el-upload--picture-card {
  display: none;
}
</style>

