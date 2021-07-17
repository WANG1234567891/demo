<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <!-- v-if="item.meta.title" -->
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path">
        <span
          v-if="item.redirect==='noredirect'||index==levelList.length-1"
          class="no-redirect"
        >{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
     <el-button type="primary" style="margin-left:15px;" size="mini" @click="goBack">返回</el-button>
  </el-breadcrumb>
</template>

<script>
export default {
  created() {
    this.getBreadcrumb();
  },
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
      let newListPath = this.$route.path;
      localStorage.setItem("childTab", newListPath.substring(newListPath.lastIndexOf("/")+1,newListPath.length));
    },
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => item.name);
      const first = matched[0];
      if (first && first.name !== "home") {
        matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched);
      }
      this.levelList = matched;
    },
    goBack() {
      this.$router.go(-1);
    //   console.log(document.URL,"url")
    //   let newUrl = document.URL;
    //   console.log(newUrl,"newUrl")
    //  localStorage.setItem("childTab", newUrl.substring(newUrl.lastIndexOf("/")+1,newUrl.length));
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
