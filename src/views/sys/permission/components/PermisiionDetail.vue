<template>
   
  <el-card class="form-container" shadow="never">
    <el-form
      :model="permission"
      :rules="rules"
      ref="permissionFrom"
      @keyup.enter.native="permissionSubmit()"
      label-width="80px"
    >
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="permission.type">
          <el-radio
            v-for="(type, index) in permission.typeList"
            :label="index"
            :key="index"
            >{{ type }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item
        :label="permission.typeList[permission.type] + '名称'"
        prop="name"
      >
        <el-input
          v-model="permission.name"
          :placeholder="permission.typeList[permission.type] + '名称'"
        ></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="parentName">
        <el-popover
          ref="menuListPopover"
          placement="bottom-start"
          trigger="click"
        >
          <el-scrollbar style="height: 100%; overflow-x: hidden">
            <el-tree
              :data="menuList"
              :props="menuListTreeProps"
              node-key="menuId"
              ref="menuListTree"
              @current-change="menuListTreeCurrentChangeHandle"
              :default-expand-all="true"
              :highlight-current="true"
              :expand-on-click-node="false"
            >
            </el-tree>
          </el-scrollbar>
        </el-popover>

        <el-input
          v-model="permission.parentName"
          v-popover:menuListPopover
          :readonly="true"
          placeholder="点击选择上级菜单"
          class="menu-list__input"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="permission.type === 1" label="菜单路由" prop="url">
        <el-input v-model="permission.uri" placeholder="菜单路由"></el-input>
      </el-form-item>
      <el-form-item v-if="permission.type !== 0" label="授权标识" prop="value">
        <el-input
          v-model="permission.value"
          placeholder="多个用逗号分隔, 如: user:list,user:create"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="permission.type !== 2" label="排序号" prop="orderNum">
        <el-input-number
          v-model="permission.orderNum"
          controls-position="right"
          :min="0"
          label="排序号"
        ></el-input-number>
      </el-form-item>

       <!-- <el-form-item v-if="permission.type !== 2" label="菜单图标" prop="icon">
        <el-row>
          <el-col :span="22">
            <el-popover
              ref="iconListPopover"
              placement="bottom-start"
              trigger="click"
              popper-class="mod-menu__icon-popover"
            >
              <div class="mod-menu__icon-inner">
                <div class="mod-menu__icon-list">
                  <el-button
                    v-for="(item, index) in permission.iconList"
                    :key="index"
                    @click="iconActiveHandle(item)"
                    :class="{ 'is-active': item === permission.icon }"
                  >
                    <icon-svg :name="item"></icon-svg>
                  </el-button>
                </div>
              </div>
            </el-popover>
            <el-input
              v-model="permission.icon"
              v-popover:iconListPopover
              :readonly="true"
              placeholder="菜单图标名称"
              class="icon-list__input"
            ></el-input>
          </el-col>
          <el-col :span="2" class="icon-list__tips">
            <el-tooltip placement="top" effect="light">
              <div slot="content">
                全站推荐使用SVG Sprite, 详细请参考:<a
                  href="//github.com/daxiongYang/renren-fast-vue/blob/master/src/icons/index.js"
                  target="_blank"
                  >icons/index.js</a
                >描述
              </div>
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-form-item> -->

      <el-form-item>
        <el-button type="primary" @click="onSubmit('permissionFrom')"
          >提交</el-button
        >
        <el-button v-if="!isEdit" @click="resetForm('permissionFrom')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import {
  createPermission,
  getPermission,
  updatePermission,
  fetchList,
} from "@/api/sys/permission";
import SingleUpload from "@/components/Upload/singleUpload";
import { treeDataTranslate } from "@/utils/index";
import Icon from "@/icons";
const defaultPermission = {
  id: 0,
  type: 1,
  typeList: ["目录", "菜单", "按钮"],
  name: "",
  pid: 0,
  parentName: "",
  uri: "",
  value: "",
  orderNum: 0,
  // icon: "",
  // iconList: [],
};
export default {
  name: "PermissionDetail",
  components: { SingleUpload },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      permission: Object.assign({}, defaultPermission),
      rules: {
        name: [{ required: true, message: "请输入菜单名", trigger: "blur" }],
        parentName: [
          { required: true, message: "上级菜单不能为空", trigger: "change" },
        ],
      },
      menuList: [],
      menuListTreeProps: {
        label: "name",
        children: "childrens",
      },
      listQuery: {
        keyword: null,
      },
    };
  },
  created() {
    if (this.isEdit) {
      getPermission(this.$route.query.id).then((response) => {
        console.log(response.data,"data")
        this.permission.name = response.data.name;
        this.permission.id = response.data.id;
        this.permission.type = response.data.type;
        this.permission.uri = response.data.uri;
        this.permission.value = response.data.value;
        this.permission.orderNum = response.data.sort;
      });
    } else {
      this.permission = Object.assign({}, defaultPermission);
    }
    this.getMenuList();
    // this.permission.iconList = Icon.getNameList();
    // console.log(this.permission.iconList,"this.permission.iconList")
  },
  methods: {
    getMenuList() {
      fetchList(this.listQuery).then((response) => {
        this.menuList = treeDataTranslate(response.data, "id", "pid");
      });
    },
    // 菜单树选中
    menuListTreeCurrentChangeHandle(data, node) {
      this.permission.pid = data.id;
      this.permission.parentName = data.name;
    },
    // 菜单树设置当前选中节点
    menuListTreeSetCurrentNode() {
      this.$refs.menuListTree.setCurrentKey(this.permission.pid);
      this.permission.parentName = (this.$refs.menuListTree.getCurrentNode() ||
        {})["name"];
    },
     // 图标选中
    iconActiveHandle(iconName) {
      this.permission.icon = iconName;
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("是否提交数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            if (this.isEdit) {
              updatePermission(this.$route.query.id, this.permission).then(
                (response) => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: "修改成功",
                    type: "success",
                    duration: 1000,
                  });
                  this.$router.back();
                }
              ).catch((err)=>{
                this.$refs[formName].resetFields();
                this.$message({
                  message: "操作失败",
                  type: "error",
                  duration: 1000,
                });
                this.$router.back();
              });
            } else {
              createPermission(this.permission).then((response) => {
                this.$refs[formName].resetFields();
                this.permission = Object.assign({}, defaultPermission);
                this.$message({
                  message: "提交成功",
                  type: "success",
                  duration: 1000,
                });
                this.$router.back();
              });
            }
          });
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.permission = Object.assign({}, defaultPermission);
    },
  },
};
</script>

<style lang="scss">
.mod-menu {
  .menu-list__input,
  .icon-list__input {
    > .el-input__inner {
      cursor: pointer;
    }
  }
  &__icon-popover {
    width: 458px;
    overflow: hidden;
  }
  &__icon-inner {
    width: 478px;
    max-height: 258px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  &__icon-list {
    width: 458px;
    padding: 0;
    margin: -8px 0 0 -8px;
    > .el-button {
      padding: 8px;
      margin: 8px 0 0 8px;
      > span {
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        font-size: 18px;
      }
    }
  }
  .icon-list__tips {
    font-size: 18px;
    text-align: center;
    color: #e6a23c;
    cursor: pointer;
  }
}
.el-tree {
  overflow-x: hidden;
  height: 450px; //这里的高根据实际情况
  min-width: 100%;
  display: inherit;
}
</style>