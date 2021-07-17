<template>
  <div class="content_div">
    <div class="content_center">
      <h2>地域分布</h2>
    </div>
    <div class="header_div">
      <div class="header_css">
        <div class="header_left">
          <div class="header_h">
            <h3><span>省份</span>下单用户占比</h3>
          </div>
          <div class="header_picker">
            <el-date-picker
              v-model="newTime"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right"
            >
            </el-date-picker>
            <el-button type="primary" @click="addTimeData()">查询</el-button>
          </div>
        </div>
        <div class="header_right">
          <el-button type="primary" @click="export2Excel()"
            >导出Excel表格</el-button
          >
        </div>
      </div>
      <div class="header_foot">
        <div class="header_foot_left">
          <div id="myChart" :style="{ width: '100%', height: '600px' }"></div>
        </div>
        <div class="header_foot_right">
          <div class="header_right_p">
            <p>各省市下单数&下单用户占比列表</p>
          </div>
          <div>
            <el-table
              :data="addAreaNewData"
              v-loading="loading"
              border
              style="width: 100%"
              :header-cell-style="{
                background: 'rgb(250,205,145)',
                color: 'black',
              }"
            >
              <el-table-column
                type="index"
                align="center"
                label="序号"
                width="80"
              >
              </el-table-column>
              <el-table-column
                prop="province"
                label="地域"
                align="center"
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop="nums"
                align="center"
                sortable
                label="下单数"
                width="150"
              >
              </el-table-column>
              <el-table-column align="center" sortable label="下单用户占比">
                <template slot-scope="scope"
                  ><span
                    >{{
                      ((scope.row.nums / dataAllNums).toFixed(10) * 100).toFixed(
                        6
                      )
                    }}%</span
                  ></template
                >
              </el-table-column>
            </el-table>
            <div class="div_pagination">
              <el-pagination
                small
                @size-change="addAreaChange"
                @current-change="addAreaCurrentChange"
                :page-sizes="[5, 10]"
                :page-size="addAreaData.pageSize"
                :current-page.sync="addAreaData.pageNum"
                layout="total, sizes, prev, pager, next, jumper"
                :total="addAreatotal"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 城市  月 -->
    <div class="header_div_month">
      <div class="header_css">
        <div class="header_left">
          <div class="header_h">
            <h3><span>城市</span>订单统计</h3>
          </div>
          <div class="header_picker">
            <el-date-picker
              v-model="monthAreaData.yearMonth"
              type="month"
              value-format="yyyy-MM"
              placeholder="选择月"
            >
            </el-date-picker>
            <el-button type="primary" @click="monthTimeData()">查询</el-button>
          </div>
        </div>
        <div class="header_right">
          <el-button type="primary" @click="export2ExcelOne()"
            >导出Excel表格</el-button
          >
        </div>
      </div>
      <div class="header_month">
        <el-table
          :data="monthAreaNewData"
          v-loading="loadingOne"
          border
          style="width: 100%"
          :header-cell-style="{
            background: 'rgb(250,205,145)',
            color: 'black',
          }"
        >
          <el-table-column type="index" align="center" label="序号" width="100">
          </el-table-column>
          <el-table-column prop="city" label="城市" align="center" width="250">
          </el-table-column>
          <el-table-column
            prop="nums"
            align="center"
            sortable
            label="一个月"
            width="256"
          >
          </el-table-column>
        </el-table>
        <div class="div_pagination">
          <el-pagination
            small
            @size-change="monthAreaChange"
            @current-change="monthAreaCurrentChange"
            :page-sizes="[5, 10]"
            :page-size="monthAreaData.pageSize"
            :current-page.sync="monthAreaData.pageNum"
            layout="total, sizes, prev, pager, next, jumper"
            :total="monthAreatotal"
          >
          </el-pagination>
        </div>
      </div>
    </div>

    <!-- 城市  周 -->
    <div class="header_div_month">
      <div class="header_css">
        <div class="header_left">
          <div class="header_h">
            <h3><span>城市</span>订单统计</h3>
          </div>
          <div class="header_picker">
            <el-date-picker
              class="pickerInput"
              v-model="weekTime"
              type="week"
              :format="startTimeStamp + ' 至 ' + endTimeStamp"
              :picker-options="{ firstDayOfWeek: 1 }"
              @change="getWeekList"
              placeholder="选择周"
            >
            </el-date-picker>
            <el-button type="primary" @click="weekTimeData()">查询</el-button>
          </div>
        </div>
        <!-- <div class="header_right">...</div> -->
      </div>
      <div class="header_month">
        <el-table
          :data="weekAreaNewData"
          v-loading="loadingTwo"
          border
          style="width: 100%"
          :header-cell-style="{
            background: 'rgb(250,205,145)',
            color: 'black',
          }"
        >
          <el-table-column type="index" align="center" label="序号" width="100">
          </el-table-column>
          <el-table-column prop="city" label="城市" align="center" width="250">
          </el-table-column>
          <el-table-column
            prop="nums"
            align="center"
            sortable
            label="一周"
            width="256"
          >
          </el-table-column>
        </el-table>
        <div class="div_pagination">
          <el-pagination
            small
            @size-change="weekAreaChange"
            @current-change="weekAreaCurrentChange"
            :page-sizes="[5, 10]"
            :page-size="weekAreaData.pageSize"
            :current-page.sync="weekAreaData.pageNum"
            layout="total, sizes, prev, pager, next, jumper"
            :total="weekAreatotal"
          >
          </el-pagination>
        </div>
      </div>
    </div>

    <!-- 城市  天 -->
    <div class="header_div_month">
      <div class="header_css">
        <div class="header_left">
          <div class="header_h">
            <h3><span>城市</span>订单统计</h3>
          </div>
          <div class="header_picker">
            <el-date-picker
              class="pickerInput"
              v-model="dayTime"
              type="date"
              :format="startDayTimeStamp + ' 至 ' + endDayTimeStamp"
              @change="getDayList"
              placeholder="选择天"
            >
            </el-date-picker>
            <el-button type="primary" @click="dayTimeData()">查询</el-button>
          </div>
        </div>
        <!-- <div class="header_right">...</div> -->
      </div>
      <div class="header_month">
        <el-table
          :data="dayAreaNewData"
          v-loading="loadingTree"
          border
          style="width: 100%"
          :header-cell-style="{
            background: 'rgb(250,205,145)',
            color: 'black',
          }"
        >
          <el-table-column type="index" align="center" label="序号" width="100">
          </el-table-column>
          <el-table-column prop="city" label="城市" align="center" width="250">
          </el-table-column>
          <el-table-column
            prop="nums"
            align="center"
            sortable
            label="一天"
            width="256"
          >
          </el-table-column>
        </el-table>
        <div class="div_pagination">
          <el-pagination
            small
            @size-change="dayAreaChange"
            @current-change="dayAreaCurrentChange"
            :page-sizes="[5, 10]"
            :page-size="dayAreaData.pageSize"
            :current-page.sync="dayAreaData.pageNum"
            layout="total, sizes, prev, pager, next, jumper"
            :total="dayAreatotal"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addAreaOders, addAreaByCity } from "@/api/jctj/geographical";
import "../../../node_modules/echarts/map/js/china";
export default {
  name: "",
  data() {
    return {
      loading: false, //加载动画
      loadingOne: false, //加载动画
      loadingTwo: false, //加载动画
      loadingTree: false, //加载动画
      newTime: "", //echarts时间
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            },
          },
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
      addAreaData: {
        beginTm: null,
        endTm: null,
        pageSize: 5,
        pageNum: 1,
        areaType: 1,
      },
      monthAreaData: {
        yearMonth: null,
        pageSize: 5,
        pageNum: 1,
        areaType: 1,
      },
      addAreaNewData: [], //地域分布数据
      addAreaNewDataList: [], //地域分布全部数据
      addAreatotal: 0,
      dataAllNums: 0, //下单的总数
      // newDataAdd: [], //全部的数据在地域分布使用
      moonAll: [], //重新组成的数据
      monthAreaNewData: [], //城市  月
      monthAreatotal: 0,
      newMonth: "全部月份",
      weekAreaNewData: [], //城市  周
      weekAreatotal: 0,
      weekTime: "",
      startTimeStamp: "",
      endTimeStamp: "",
      weekAreaData: {
        beginTm: null,
        endTm: null,
        pageSize: 5,
        pageNum: 1,
        areaType: 2,
      },
      newWeek: "",
      dayAreaNewData: [], //城市 天
      dayAreatotal: 0,
      dayAreaData: {
        beginTm: null,
        endTm: null,
        pageSize: 5,
        pageNum: 1,
        areaType: 3,
      },
      dayTime: "",
      startDayTimeStamp: "",
      endDayTimeStamp: "",
    };
  },
  created() {
    this.dayTime = this.weekTime = Date.parse(new Date());
    let yearMonthMon = Date.parse(new Date());
    //月
    this.monthAreaData.yearMonth = this.funTree(yearMonthMon).substr(0, 7);
    //周
    if (new Date().getDay() == 1) {
      this.startTimeStamp = this.funTree(this.weekTime); //开始时间
      this.endTimeStamp = this.funTree(this.weekTime + 24 * 60 * 60 * 1000 * 7); //结束时间
    } else if (new Date().getDay() == 2) {
      this.startTimeStamp = this.funTree(this.weekTime - 24 * 60 * 60 * 1000); //开始时间
      this.endTimeStamp = this.funTree(this.weekTime + 24 * 60 * 60 * 1000 * 6); //结束时间
    } else if (new Date().getDay() == 3) {
      this.startTimeStamp = this.funTree(
        this.weekTime - 24 * 60 * 60 * 1000 * 2
      ); //开始时间
      this.endTimeStamp = this.funTree(this.weekTime + 24 * 60 * 60 * 1000 * 5); //结束时间
    } else if (new Date().getDay() == 4) {
      this.startTimeStamp = this.funTree(
        this.weekTime - 24 * 60 * 60 * 1000 * 3
      ); //开始时间
      this.endTimeStamp = this.funTree(this.weekTime + 24 * 60 * 60 * 1000 * 4); //结束时间
    } else if (new Date().getDay() == 5) {
      this.startTimeStamp = this.funTree(
        this.weekTime - 24 * 60 * 60 * 1000 * 4
      ); //开始时间
      this.endTimeStamp = this.funTree(this.weekTime + 24 * 60 * 60 * 1000 * 3); //结束时间
    } else if (new Date().getDay() == 6) {
      this.startTimeStamp = this.funTree(
        this.weekTime - 24 * 60 * 60 * 1000 * 5
      ); //开始时间
      this.endTimeStamp = this.funTree(this.weekTime + 24 * 60 * 60 * 1000 * 2); //结束时间
    } else if (new Date().getDay() == 0) {
      this.startTimeStamp = this.funTree(
        this.weekTime - 24 * 60 * 60 * 1000 * 7
      ); //开始时间
      this.endTimeStamp = this.funTree(this.weekTime); //结束时间
    }
    //天
    this.startDayTimeStamp = this.funTree(this.dayTime); //开始时间
    this.endDayTimeStamp = this.funTree(this.dayTime + 24 * 60 * 60 * 1000); //结束时间
  },
  mounted() {
    this.areaOdersList();
    this.monthAreaList();
    this.weekDataList();
    this.dayDataList();
    this.$nextTick(() => {
      this.drawLine();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },

  methods: {
    //查询
    addTimeData() {
      if (this.newTime) {
        this.addAreaData.beginTm = this.newTime[0];
        this.addAreaData.endTm = this.newTime[1];
      } else {
        this.$message({
          message: "请选择时间",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.areaOdersList();
    },
    //页数
    addAreaChange(val) {
      this.addAreaData.pageNum = 1;
      this.addAreaData.pageSize = val;
      this.areaOdersList();
    },
    //条数
    addAreaCurrentChange(val) {
      this.addAreaData.pageNum = val;
      this.areaOdersList();
    },
    //地域分布
    areaOdersList() {
      this.loading = true;
      addAreaOders(this.addAreaData).then((res) => {
        if (res.code == 200) {
          this.addAreaNewData = res.data.list;
          this.addAreatotal = res.data.total;
          // this.$message({
          //   message: "操作成功",
          //   type: "success",
          //   duration: 1000,
          // });
          this.loading = false;
          this.areaDataAarry();
        } else {
          this.$message({
            message: "操作失败",
            type: "info",
            duration: 1000,
          });
          return;
        }
      });
    },
    //地域分布全部数据
    dataAreaOdersList(fun) {
      addAreaOders({
        beginTm: this.addAreaData.beginTm,
        endTm: this.addAreaData.endTm,
        pageSize: this.addAreatotal,
        pageNum: 1,
        areaType: 1,
      }).then((res) => {
        if (res.code == 200) {
          this.addAreaNewDataList = res.data.list;
          fun();
        }
      });
    },

    //获取地域全部数据用于处理百分比
    areaDataAarry() {
      addAreaOders({
        beginTm: this.addAreaData.beginTm,
        endTm: this.addAreaData.endTm,
        pageSize: this.addAreatotal,
        pageNum: 1,
        areaType: 1,
      }).then((res) => {
        let numAll = 0;
        res.data.list.map((item) => {
          numAll += item.nums;
        });
        this.dataAllNums = numAll;
        let listMone = res.data.list;
        for (let i = 0; i < listMone.length; i++) {
          if (listMone[i].province === "内蒙古自治区") {
            listMone[i].province = listMone[i].province.substr(0, 3);
          } else if (listMone[i].province === "黑龙江省") {
            listMone[i].province = listMone[i].province.substr(0, 3);
          } else {
            listMone[i].province = listMone[i].province.substr(0, 2);
          }
        }
        let newlistMone = listMone;
        let newDataAdd=[];
        for (let j = 0; j < newlistMone.length; j++) {
          newDataAdd.push({
            name: newlistMone[j].province,
            init:
              (
                (newlistMone[j].nums / this.dataAllNums).toFixed(10) * 100
              ).toFixed(6) + "%",
            value: newlistMone[j].nums,
          });
        }
        this.moonAll = JSON.parse(JSON.stringify(newDataAdd));
        this.chart.setOption({
          series: [
            {
              data: this.moonAll,
            },
          ],
        });
      });
    },
    //地域分布
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      this.chart.setOption({
        title: {
          text: "地域分布图",
        },
        tooltip: {
          trigger: "item",
          showContent: true,
          formatter: function (data) {
            return (
              data.name +
              "</br>" +
              "下单数  " +
              data.data.value +
              "</br>" +
              "下单用户占比  " +
              data.data.init
            );
          },
        },
        geo: {
          roam: false, // 一定要关闭拖拽
          zoom: 1.23,
          center: [105, 36], // 调整地图位置
          label: {
            normal: {
              show: true, //关闭省份名展示
              fontSize: "10",
              //   color: "rgba(0,0,0,0.7)",
            },
            emphasis: {
              show: false,
            },
          },
        },
        series: [
          {
            name: "省",
            type: "map",
            map: "china",
            data: this.moonAll,
            // geoIndex: 1,
            // aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff",
                },
              },
            },
            itemStyle: {
              normal: {
                areaColor: "rgb(238,238,238)",
                borderColor: "#A9A9A9",
                borderWidth: 0.5,
              },
              emphasis: {
                areaColor: "#6495ED",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 5,
                borderWidth: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
    //城市统计 月
    monthAreaList() {
      this.loadingOne = true;
      addAreaByCity(this.monthAreaData).then((res) => {
        if (res.code == 200) {
          this.monthAreaNewData = res.data.list;
          this.monthAreatotal = res.data.total;
          // this.$message({
          //   message: "操作成功",
          //   type: "success",
          //   duration: 1000,
          // });
          this.loadingOne = false;
          this.areaDataAarry();
        } else {
          this.$message({
            message: "操作失败",
            type: "info",
            duration: 1000,
          });
          return;
        }
      });
    },
    //全部城市统计 月
    dataMonthAreaList(fun){
      addAreaByCity({
        yearMonth: this.monthAreaData.yearMonth,
        pageSize: this.monthAreatotal,
        pageNum: 1,
        areaType: 1,
      }).then((res)=>{
        if(res.code==200){
          this.monthAreaNewDataList = res.data.list;
          fun()
        }
      })
    },
    //查询
    monthTimeData() {
      if (!this.monthAreaData.yearMonth) {
        this.$message({
          message: "请选择时间！",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.newMonth = this.monthAreaData.yearMonth.substr(5, 6) + "月";
      this.monthAreaList();
    },
    //页数
    monthAreaChange(val) {
      this.monthAreaData.pageNum = 1;
      this.monthAreaData.pageSize = val;
      this.monthAreaList();
    },
    //条数
    monthAreaCurrentChange(val) {
      this.monthAreaData.pageNum = val;
      this.monthAreaList();
    },
    //城市统计 周
    weekDataList() {
      this.loadingTwo = true;
      addAreaOders(this.weekAreaData).then((res) => {
        if (res.code == 200) {
          this.weekAreaNewData = res.data.list;
          this.weekAreatotal = res.data.total;
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
          this.loadingTwo = false;
        } else {
          this.$message({
            message: "操作失败",
            type: "info",
            duration: 1000,
          });
          return;
        }
      });
    },
    //查询
    weekTimeData() {
      this.weekAreaData.beginTm = this.startTimeStamp;
      this.weekAreaData.endTm = this.endTimeStamp;
      this.weekDataList();
    },
    //页数
    weekAreaChange(val) {
      this.weekAreaData.pageNum = 1;
      this.weekAreaData.pageSize = val;
      this.weekDataList();
    },
    //条数
    weekAreaCurrentChange(val) {
      this.weekAreaData.pageNum = val;
      this.weekDataList();
    },
    getWeekList(val) {
      if (val) {
        let timeStamp = val.getTime(); //标准时间转为时间戳，毫秒级别
        this.startTimeStamp = this.fun(timeStamp - 24 * 60 * 60 * 1000); //开始时间
        this.endTimeStamp = this.fun(timeStamp + 24 * 60 * 60 * 1000 * 6); //结束时间
      } else {
        this.startTimeStamp = this.endTimeStamp = null;
      }
    },
    //时间戳转为yy-mm-dd hh:mm:ss
    fun(unixtimestamp) {
      var unixtimestamp = new Date(unixtimestamp);
      var year = 1900 + unixtimestamp.getYear();
      var month = "0" + (unixtimestamp.getMonth() + 1);
      var date = "0" + unixtimestamp.getDate();
      var hour = "0" + unixtimestamp.getHours();
      var minute = "0" + unixtimestamp.getMinutes();
      var second = "0" + unixtimestamp.getSeconds();
      return (
        year +
        "-" +
        month.substring(month.length - 2, month.length) +
        "-" +
        date.substring(date.length - 2, date.length) +
        " " +
        hour.substring(hour.length - 2, hour.length) +
        ":" +
        minute.substring(minute.length - 2, minute.length) +
        ":" +
        second.substring(second.length - 2, second.length)
      );
    },
    //城市统计 天
    dayDataList() {
      this.loadingTree = true;
      addAreaOders(this.dayAreaData).then((res) => {
        if (res.code == 200) {
          this.dayAreaNewData = res.data.list;
          this.dayAreatotal = res.data.total;
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
          this.loadingTree = false;
        } else {
          this.$message({
            message: "操作失败",
            type: "info",
            duration: 1000,
          });
          return;
        }
      });
    },
    //页数
    dayAreaChange(val) {
      this.dayAreaData.pageNum = 1;
      this.dayAreaData.pageSize = val;
      this.dayDataList();
    },
    //条数
    dayAreaCurrentChange(val) {
      this.dayAreaData.pageNum = val;
      this.dayDataList();
    },
    getDayList(val) {
      if (val) {
        let dayTimeStamp = val.getTime(); //标准时间转为时间戳，毫秒级别
        this.startDayTimeStamp = this.funTwo(dayTimeStamp); //开始时间
        this.endDayTimeStamp = this.funTwo(dayTimeStamp + 24 * 60 * 60 * 1000); //结束时间
      } else {
        this.startDayTimeStamp = this.endDayTimeStamp = null;
      }
    },
    //时间戳转为yy-mm-dd hh:mm:ss
    funTwo(unixtimestamp) {
      var unixtimestamp = new Date(unixtimestamp);
      var year = 1900 + unixtimestamp.getYear();
      var month = "0" + (unixtimestamp.getMonth() + 1);
      var date = "0" + unixtimestamp.getDate();
      var hour = "0" + unixtimestamp.getHours();
      var minute = "0" + unixtimestamp.getMinutes();
      var second = "0" + unixtimestamp.getSeconds();
      return (
        year +
        "-" +
        month.substring(month.length - 2, month.length) +
        "-" +
        date.substring(date.length - 2, date.length) +
        " " +
        hour.substring(hour.length - 2, hour.length) +
        ":" +
        minute.substring(minute.length - 2, minute.length) +
        ":" +
        second.substring(second.length - 2, second.length)
      );
    },
    dayTimeData() {
      this.dayAreaData.beginTm = this.startDayTimeStamp;
      this.dayAreaData.endTm = this.endDayTimeStamp;
      this.dayDataList();
    },
    //时间戳转为yy-mm-dd hh:mm:ss
    funTree(unixtimestamp) {
      var unixtimestamp = new Date(unixtimestamp);
      var year = 1900 + unixtimestamp.getYear();
      var month = "0" + (unixtimestamp.getMonth() + 1);
      var date = "0" + unixtimestamp.getDate();
      var hour = "0";
      var minute = "0";
      var second = "0";
      return (
        year +
        "-" +
        month.substring(month.length - 2, month.length) +
        "-" +
        date.substring(date.length - 2, date.length) +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },
    //省份下单用户占比
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    //各省市下单数
    export2Excel() {
      this.$confirm("确定要导出表格数据么？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.dataAreaOdersList(() => {
          require.ensure([], () => {
            const {
              export_json_to_excel,
            } = require("../../vendor/Export2Excel");
            const tHeader = ["地域", "下单数", "时间"];
            const filterVal = ["province", "nums", "ctime"];
            const list = this.addAreaNewDataList;
            console.log(list);
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(
              tHeader,
              data,
              "各省市下单数列表"
            );
          });
        });
      })
       .catch(() => {
          this.$message({
            type: "info",
            message: "已取消导出",
          });
        });
    },
    //城市订单统计
    export2ExcelOne(){
       if (!this.monthAreaData.yearMonth) {
            this.$message({
              message: "请选择时间！",
              type: "warning",
              duration: 1000,
            });
            return;
         }
       this.$confirm("确定要导出表格数据么？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.dataMonthAreaList(() => {
          require.ensure([], () => {
            const {
              export_json_to_excel,
            } = require("../../vendor/Export2Excel");
            const tHeader = ["城市", "数据","时间"];
            const filterVal = ["province", "nums","ctime"];
            const list = this.monthAreaNewDataList;
            console.log(list);
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(
              tHeader,
              data,
              "城市订单统计列表"
            );
          });
        })
      })
       .catch(() => {
          this.$message({
            type: "info",
            message: "已取消导出",
          });
        });

    }
  },
};
</script>

<style scoped lang="scss">
.content_div {
  padding-bottom: 40px;
}
.content_center {
  //   display: flex;
  //   justify-content: space-between;
  width: 1400px;
  margin: 30px 0 0 100px;
  .block {
    padding-top: 10px;
  }
}
.header_left {
  .header_h {
    h3 > span {
      padding-right: 10px;
      border-right: 2px solid black;
      margin-right: 10px;
    }
  }
}
.header_div,
.header_div_two {
  border: 1px solid rgb(129, 129, 129);
  width: 1415px;
  margin: 10px 0 0 100px;
}
.header_css,
.header_foot {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}
.header_foot {
  .header_foot_left {
    width: 100%;
  }
  .header_foot_right {
    width: 100%;
    .header_right_p {
      font-weight: 700;
    }
  }
}
.header_right {
  padding-top: 57px;
}
.header_div_month {
  border: 1px solid rgb(129, 129, 129);
  width: 660px;
  margin: 10px 0 0 100px;
  // display: inline-block;
}
.header_month {
  // width: 422px;
  padding: 10px 20px;
}
.div_pagination {
  margin-top: 10px;
}
.pickerInput {
  width: 350px;
}
</style>
