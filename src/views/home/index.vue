<template>
  <div class="app-container">
    <div class="light-btn">搜了宝中台管理系统</div>
    <!-- <img class="start" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F988f38ed93a127bcad3b139f34ba92a584ce557ddbcadb-92rOL6_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625036330&t=eac7698fc7e3f9bec8dbf9d5149f6fd6" alt=""> -->
  </div>
</template>

<script>
import { str2Date } from "@/utils/date";
// import {orderStatic,goodsStatic,userStatic,list} from '@/api/home'
import { acceptRedPacket } from "@/api/home";

export default {
  name: "home",
  data() {
    return {
      title: "中台管理系统",
    };
  },
  created() {
    this.initOrderCountDate();
    this.getData();
  },
  methods: {
    handleRed(id) {
      acceptRedPacket(id).then((response) => {
        this.$message({
          message: response.data,
          type: "success",
          duration: 1000,
        });
      });
    },
    handleDateChange() {
      this.getData();
    },
    initOrderCountDate() {
      // orderStatic().then((res) => {
      //   if (res.code == 200) {
      //     this.orderData = res.data;
      //     this.orderStatusCount = res.data.orderStatusCount;
      //   }
      // });

      // goodsStatic().then((res) => {
      //   if (res.code == 200) {
      //     this.goods = res.data;
      //   }
      // });
      // userStatic().then((res) => {
      //   if (res.code == 200) {
      //     this.user = res.data;
      //   }
      // });
      // list().then((res) => {
      //   if (res.code == 200) {
      //     this.redList = res.data.list;
      //   }
      // });

      let start = new Date();
      start.setFullYear(2018);
      start.setMonth(10);
      start.setDate(1);
      const end = new Date();
      end.setTime(start.getTime() + 1000 * 60 * 60 * 24 * 7);
      this.orderCountDate = [start, end];
    },
    getData() {
      setTimeout(() => {
        this.chartData = {
          columns: ["date", "orderCount", "orderAmount"],
          rows: [],
        };
        for (let i = 0; i < DATA_FROM_BACKEND.rows.length; i++) {
          let item = DATA_FROM_BACKEND.rows[i];
          let currDate = str2Date(item.date);
          let start = this.orderCountDate[0];
          let end = this.orderCountDate[1];
          if (
            currDate.getTime() >= start.getTime() &&
            currDate.getTime() <= end.getTime()
          ) {
            this.chartData.rows.push(item);
          }
        }
        this.dataEmpty = false;
        this.loading = false;
      }, 1000);
    },
  },
  mounted(){
  }
};
</script>

<style scoped>
.app-container {
  position: relative;
  margin-top: 10px;
  margin-left: 160px;
  margin-right: 120px;
}

.total-frame {
  border: 1px solid #dcdfe6;
  padding: 20px;
  height: 100px;
}

.total-icon {
  color: #409eff;
  width: 60px;
  height: 60px;
}

.total-title {
  position: relative;
  font-size: 16px;
  color: #909399;
  left: 200px;
  top: -50px;
}

.total-value {
  position: relative;
  font-size: 18px;
  color: #606266;
  left: 70px;
  top: -40px;
}

.un-handle-layout {
  margin-top: 20px;
  border: 1px solid #dcdfe6;
}

.layout-title {
  color: #606266;
  padding: 15px 20px;
  background: #f2f6fc;
  font-weight: bold;
}

.un-handle-content {
  padding: 20px 40px;
}

.un-handle-item {
  border-bottom: 1px solid #ebeef5;
  padding: 10px;
}

.overview-layout {
  margin-top: 20px;
}

.overview-item-value {
  font-size: 24px;
  text-align: center;
}

.overview-item-title {
  margin-top: 10px;
  text-align: center;
}

.out-border {
  border: 1px solid #dcdfe6;
}

.statistics-layout {
  margin-top: 20px;
  border: 1px solid #dcdfe6;
}

.light-btn {
  font-family: "Times New Roman";
  text-align: center;
  font-size: 30px;
  margin-top: 10px;
  cursor: pointer;
  text-decoration: none;
  position: absolute;
  left: 10%;top: 200px;
  letter-spacing: 4px;
  background: linear-gradient(90deg, #ff9933, #ff5500, #ff0a01, #ff9933);
  background-size: 400%;
  width: 800px;
  height: 400px;
  line-height: 400px;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  border-radius: 5px;
  z-index: 1;
}

.light-btn:hover::before,
.light-btn:hover {
  animation: sun 4s infinite;
}

.light-btn::before {
  content: "";
  position: absolute;
  left: -5px;
  right: -5px;
  top: -5px;
  bottom: -5px;
  background: linear-gradient(90deg, #ff9933, #ff5500, #ff0a01, #ff9933);
  background-size: 400%;
  border-radius: 5px;
  filter: blur(10px);
  z-index: -1;
}

@keyframes sun {
  100% {
    background-position: -400% 0;
  }
}

.parent {
  width: -moz-fit-content;
  width: -webkit-fit-content;
  width: fit-content;
  margin: 0 auto;
}
.start{width: 100vw;height: 100vh;position: fixed;top: 0;left: 0;z-index: 5;}
</style>
