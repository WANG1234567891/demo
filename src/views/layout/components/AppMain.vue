<template>
  <section class="app-main">
    <!-- <el-button size="small" @click="addTab(editableTabsValue)">add tab</el-button> -->
    <el-tabs
      v-model="editableTabsValue"
      type="border-card"
      closable
      @tab-remove="removeTab"
      @tab-click="nextTabs"
      v-if="editableTabsValue != '' "
    >
      <el-tab-pane
        v-for="item of editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :data_val="item.title"
        :data_tab="item.name"
      ></el-tab-pane>
    </el-tabs>
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
import { routesGo } from "@/api/roues";
import Bus from "@/api/bus";
export default {
  name: "AppMain",
  data() {
    return {
      editableTabsValue: "",
      editableTabs: [],
      // [
      //   { title: "首页", name: "0" },
      //   { title: "商品列表", name: "1" },
      //   { title: "匀贸订单", name: "2" },
      //   { title: "退款订单列表", name: "3" },
      //   { title: "一号专区管理", name: "4" },
      //   { title: "代理分润", name: "5" },
      // ],
      tabIndex: 2,
      newPath:[], // 路由地址存放
    };
  },
  methods: {
    addTab(targetName) {
      let nameIndex = targetName.name;
      let newTabName = ++nameIndex + "";
      this.editableTabs.push(targetName);
      // console.log(this.editableTabs)
      this.editableTabsValue = newTabName;
      for (var i = 0; i < this.editableTabs.length; i++) {
        // 首次遍历数组
        for (var j = i + 1; j < this.editableTabs.length; j++) {
          // 再次遍历数组
          if (this.editableTabs[i].title == this.editableTabs[j].title) {
            // 判断连个值是否相等
            this.editableTabs.splice(j, 1); // 相等删除后者
            j--;
          }
        }
      }
      localStorage.setItem("tabStatus", JSON.stringify(this.editableTabs));
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
      localStorage.setItem("tabStatus", JSON.stringify(this.editableTabs));
    },
    nextTabs(e) {
      let val = e.$attrs.data_tab;
      let valPath = JSON.parse(localStorage.getItem("newPath"));
      localStorage.setItem("childTab", val);
      for(let m=0;m<valPath.length;m++){
        if(val === valPath[m].path.substring(valPath[m].path.lastIndexOf("/")+1,valPath[m].path.length)){
          this.$router.push({ path: valPath[m].path });
        }
      }
      // if (val == "商品列表") {
      //   this.$router.push({ path: "/pms/product" });
      // } else if (val == "匀贸订单") {
      //   this.$router.push({ path: "/oms/order" });
      // } else if (val == "退款订单列表") {
      //   this.$router.push({ path: "/oms/deliverOrderList" });
      // } else if (val == "代理分润/条件查询") {
      //   this.$router.push({ path: "/ums/memberLevel" });
      // } else if (val == "会员资产") {
      //   this.$router.push({ path: "/ums/school" });
      // } else if (val == "会员列表") {
      //   this.$router.push({ path: "/ums/member" });
      // } else if (val == "下级及消费管理") {
      //   this.$router.push({ path: "/cms/help" });
      // } else if (val == "商户打款结算记录") {
      //   this.$router.push({ path: "/sms/homeHot" });
      // } else if (val == "店铺订单明细") {
      //   this.$router.push({ path: "/sms/homeNew" });
      // } else if (val == "店铺列表") {
      //   this.$router.push({ path: "/sms/homeAdvertise" });
      // } else if (val == "用户管理") {
      //   this.$router.push({ path: "/sys/admin" });
      // } else if (val == "角色管理") {
      //   this.$router.push({ path: "/sys/role" });
      // } else if (val == "菜单管理") {
      //   this.$router.push({ path: "/sys/permission" });
      // } else if (val == "1号专区管理") {
      //   this.$router.push({ path: "/pms/productCate" });
      // } else if (val == "地域分布") {
      //   this.$router.push({ path: "/jctj/geographical" });
      // } else if (val == "商品&营收数据概览") {
      //   this.$router.push({ path: "/jctj/commodityRevenue" });
      // } else if (val == "实时统计") {
      //   this.$router.push({ path: "/jctj/realStatistics" });
      // }
      // else if (val == "渠道概况") {
      //   this.$router.push({ path: "/jctj/channelOverview" });
      // } 
      
    },
  },
  created() {
    // this.editableTabsValue="1"
    if (localStorage.getItem("tabStatus")) {
      let tabs = JSON.parse(localStorage.getItem("tabStatus"));
      // this.editableTabsValue = tabs[0].name;
      this.editableTabsValue = localStorage.getItem("childTab");
      this.newPath = JSON.parse(localStorage.getItem("newPath"));
      this.editableTabs = tabs;
    }
    Bus.$on("addTab", (obj) => {
      // console.log(obj, "on");
      this.addTab(obj);
    });
  },
  updated() {},
  watch: {
    editableTabs(){
      // console.log(this.editableTabs)
     if(this.editableTabs.length == 0){
       this.editableTabsValue=''
       let arr=[]
       localStorage.setItem("tabStatus",arr)
     }
    },
    $route(to, from) {
      console.log(to.fullPath,"ss")
      this.editableTabsValue = localStorage.getItem("childTab");
      this.newPath.push({
        title:to.meta.title,
        path:to.fullPath,
      })
       for (let i = 0; i < this.newPath.length; i++) {
        // 首次遍历数组
        for (let j = i + 1; j < this.newPath.length; j++) {
          // 再次遍历数组
          if (this.newPath[i].title == this.newPath[j].title) {
            // 判断连个值是否相等
            this.newPath.splice(j, 1); // 相等删除后者
            j--;
          }
        }
      }
      localStorage.setItem("newPath", JSON.stringify(this.newPath));
      if(to.fullPath == "/home"){
        // this.editableTabsValue="",
        // localStorage.setItem("tabStatus",'');
        // this.editableTabs=[]
        this.editableTabsValue=""
      }
      // console.log(this.newPath,"newPath")
      // if (toPath == "/pms/product") {
      //   this.editableTabsValue = "2";
      // } else if (toPath == "/oms/order") {
      //   this.editableTabsValue = "24";
      // } else if (toPath == "/oms/deliverOrderList") {
      //   this.editableTabsValue = "25";
      // } else if (toPath == "/pms/productCate") {
      //   this.editableTabsValue = "3";
      // } else if (toPath == "/ums/memberLevel") {
      //   this.editableTabsValue = "100";
      // } else if (toPath == "/ums/school") {
      //   this.editableTabsValue = "96";
      // } else if (toPath == "/ums/member") {
      //   this.editableTabsValue = "44";
      // } else if (toPath == "/cms/help") {
      //   this.editableTabsValue = "38";
      // } else if (toPath == "/sms/homeAdvertise") {
      //   this.editableTabsValue = "37";
      // } else if (toPath == "/sms/homeNew") {
      //   this.editableTabsValue = "39";
      // } else if (toPath == "/sys/admin") {
      //   this.editableTabsValue = "22";
      // } else if (toPath == "/sys/role") {
      //   this.editableTabsValue = "20";
      // } else if (toPath == "/sys/permission") {
      //   this.editableTabsValue = "21";
      // } else if (toPath == "/sms/homeHot") {
      //   this.editableTabsValue = "40";
      // }  else if (toPath == "/jctj/geographical") {
      //   this.editableTabsValue = "354";
      // } else if (toPath == "/jctj/commodityRevenue") {
      //   this.editableTabsValue = "353";
      // } else if (toPath == "/jctj/realStatistics") {
      //   this.editableTabsValue = "352";
      // } else if(toPath == "/home"){
      //   this.editableTabsValue=""
      // }
      
      // else if (toPath == "/jctj/channelOverview") {
      //   this.editableTabsValue = "355";
      // } 
     
    },  
  },
  mounted() {},
  // computed: {
  //   // key() {
  //   //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
  //   // }
  // },
};
</script>
<style scoped>
.app-main .el-tabs {
  padding: 0;
  height: 30px;
}
</style>
