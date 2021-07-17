<template>
  <div class="menu-wrapper">
    <template v-for="(item,index) of routes">
      <router-link
        v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.checked&&item.children"
        :to="item.meta.url+'/'+item.children[0].meta.url"
        :key="item.children[0].name"
      >
        <el-menu-item
          :index="item.meta.url+'/'+item.children[0].meta.url"
          :class="{'submenu-title-noDropdown':!isNest}"
        >
          <svg-icon
            v-if="item.children[0].meta&&item.children[0].meta.icon"
            :icon-class="item.children[0].meta.icon"
          ></svg-icon>
          <span
            v-if="item.children[0].meta&&item.children[0].title"
            slot="title"
          >{{item.children[0].title}}</span>
        </el-menu-item>
      </router-link>
      <el-submenu v-else :index="item.meta.url" :key="item.meta.url">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta&&item.title" slot="title" class="span-one">{{item.title}}</span>
          <el-badge
            v-if="slProductListCounts > 0 &&  newText === '商品管理' && index == 0 "
            :value="slProductListCounts"
          ></el-badge>
          <el-badge v-if="slOrderRefundListCount > 0 && index == 2" :value="slOrderRefundListCount"></el-badge>
          <el-badge v-if="slShopCount > 0 && index == 5" :value="slShopCount"></el-badge>
        </template>

        <template v-for="(child,index2) of item.children">
          <sidebar-item
            :is-nest="true"
            class="nest-menu"
            v-if="!child.checked && child.children && child.children.length>0"
            :routes="[child]"
            :key="child.meta.url"
          ></sidebar-item>

          <router-link v-else :to="item.meta.url+'/'+child.meta.url" :key="child.meta.url">
            <el-menu-item :index="item.meta.url+'/'+child.meta.url" @click="tabChange(child)" :ref="'menuRef'+index">
              <svg-icon v-if="child.meta && child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span class="span-two" v-if="child.meta && child.title" slot="title">{{child.title}}</span>
              <el-badge
                v-if="slProductListCount > 0 && index ==0 && index2 == 0  && newText == '商品管理'"
                :value="slProductListCount"
              ></el-badge>
              <el-badge
                v-if="slProductListOneCount > 0  && index ==0 && index2 == 1 && newText == '商品管理'"
                :value="slProductListOneCount"
              ></el-badge>
              <el-badge
                v-if="slOrderRefundListCount > 0 && index == 2 && index2 == 1"
                :value="slOrderRefundListCount"
              ></el-badge>
              <el-badge v-if="slShopCount > 0 && index == 5 && index2 == 2" :value="slShopCount"></el-badge>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
import { waitCheckMessage } from "@/api/cms/help";
import Bus from "@/api/bus";
export default {
  name: "SidebarItem",
  data() {
    return {
      slOrderRefundListCount: 0,
      slShopCount: 0,
      slProductListCounts: 0,
      slProductListCount: 0,
      slProductListOneCount: 0,
      newText: "",
    };
  },
  props: {
    routes: {
      type: Array,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter((item) => {
        return !item.checked;
      });
      if (showingChildren.length === 1) {
        return true;
      }
      return false;
    },
    getWaitCheck() {
      waitCheckMessage({}).then((res) => {
        // console.log(res, "mesg");
        this.slProductListCounts =
          res.data.slProductListCount + res.data.slProductListOneCount;
        this.slProductListCount = res.data.slProductListCount;
        this.slProductListOneCount = res.data.slProductListOneCount;
        this.slOrderRefundListCount = res.data.slOrderRefundListCount;
        this.slShopCount = res.data.slShopCount;
      });
    },
    tabChange(child) {
      console.log(child, "title");
      if (child.title != "渠道概况") {
        let childObj = {};
        childObj.title = child.title;
        childObj.name = child.meta.url;
        console.log(childObj.name, "child");
        localStorage.setItem("childTab",childObj.name);
        Bus.$emit("addTab", childObj);
      }
      
    },
    getDom() {
      let spansOne = document.getElementsByClassName("span-one");
      let spansTwo = document.getElementsByClassName("span-two");
      // console.log(spansOne[0].innerText,spansOne[1].innerText);
      if (
        spansOne[0].innerText == "商品管理" ||
        spansOne[1].innerText == "商品管理"
      ) {
        // console.log(spansOne[1].innerText)
        this.newText = spansOne[0].innerText;
      }
    },
  },
  created() {
    this.getWaitCheck();
  },
  mounted() {
    setTimeout(() => {
      this.getDom();
    }, 300);
  },
};
</script>
