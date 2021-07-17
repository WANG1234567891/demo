<template>
  <div class="content_div">
    <div class="content_center">
      <h2>商品营收数据概况</h2>
    </div>
    <div class="header_div">
      <div class="header_h">
        <h3>各品类商品销售趋势</h3>
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
        <el-button type="primary" @click="timeData()">查询</el-button>
      </div>
      <div id="myChart" :style="{ width: '1200px', height: '400px' }"></div>
    </div>
    <div class="header_div_two">
      <div class="header_css">
        <div class="header_left">
          <h3>商品销售情况(现金支付)</h3>
          <el-date-picker
            v-model="payNewTime"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            align="right"
          >
          </el-date-picker>
          <el-button type="primary" @click="payTimeData()">查询</el-button>
        </div>
        <div class="header_right">
           <el-button type="primary" @click="export2ExcelOne()"
            >导出Excel表格</el-button
          >
        </div>
      </div>
      <div class="header_table">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          v-loading="loading"
          :header-cell-style="{
            background: 'rgb(250,205,145)',
            color: 'black',
          }"
        >
          <el-table-column type="index" align="center" label="序号" width="50">
          </el-table-column>
          <el-table-column
            prop="proTypeName"
            label="商品分类"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="proName"
            align="center"
            width="220"
            label="商品名称"
          >
          </el-table-column>
          <el-table-column prop="shopName" align="center" label="店铺名称">
          </el-table-column>
          <el-table-column
            prop="buyNum"
            align="center"
            sortable
            label="购买次数"
          >
          </el-table-column>
          <el-table-column
            prop="buyPnum"
            align="center"
            sortable
            label="购买人数"
          >
          </el-table-column>
          <el-table-column
            prop="saleMoney"
            align="center"
            sortable
            label="销售额"
          >
          </el-table-column>
        </el-table>
        <div class="div_pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 20, 50, 100]"
            :page-size="commodity.pageSize"
            :current-page.sync="commodity.pageNum"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalPage"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="header_div_two">
      <div class="header_css">
        <div class="header_left">
          <h3>关键词搜索排名</h3>
          <el-date-picker
            v-model="KeyWordTime"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            align="right"
          >
          </el-date-picker>
          <el-button type="primary" @click="timeDataKeyWord()">查询</el-button>
        </div>
        <div class="header_right">
          <el-button type="primary" @click="export2Excel()"
            >导出Excel表格</el-button
          >
        </div>
      </div>
      <div class="header_table">
        <el-table
          :data="KeyWordNewData"
          border
          style="width: 100%"
          v-loading="loadingOne"
          :header-cell-style="{
            background: 'rgb(250,205,145)',
            color: 'black',
          }"
        >
          <el-table-column type="index" align="center" label="序号" width="50">
          </el-table-column>
          <el-table-column
            prop="field"
            label="关键词"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column prop="sNum" align="center" sortable label="搜索次数">
          </el-table-column>
          <el-table-column
            prop="sUserIdNum"
            align="center"
            sortable
            label="关键词搜索用户数"
          >
          </el-table-column>
        </el-table>
        <div class="div_pagination">
          <el-pagination
            @size-change="keywordChange"
            @current-change="keywordCurrentChange"
            :page-sizes="[5, 20, 50, 100]"
            :page-size="keywordData.pageSize"
            :current-page.sync="keywordData.pageNum"
            layout="total, sizes, prev, pager, next, jumper"
            :total="keytotalPage"
          >
          </el-pagination>
        </div>
      </div>
    </div>

    <div class="header_div_two">
      <div class="header_css">
        <div class="header_left">
          <h3>购物卷营收</h3>
          <el-date-picker
            v-model="couponTime"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            align="right"
          >
          </el-date-picker>
          <el-button type="primary" @click="couponReveList()">查询</el-button>
          <div class="header_p_two">
            <span>合计</span>
            <br />
            <span>{{ totalSumAll.toFixed(2) }}</span
            ><span>元</span>
          </div>
        </div>
         <div class="header_right">
          <el-button type="primary" @click="export2ExcelTwo()"
            >导出Excel表格</el-button
          >
        </div>
      </div>
      <div style="padding-bottom: 20px">
        <div
          id="myChartTwo"
          :style="{ width: '1200px', height: '400px' }"
        ></div>
      </div>
    </div>

    <div class="header_div_two">
      <div class="header_css">
        <div class="header_left">
          <h3>现金营收</h3>
          <el-date-picker
            v-model="cashRevenueTime"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            align="right"
          >
          </el-date-picker>
          <el-button type="primary" @click="cashRevenueList()">查询</el-button>
          <div class="header_p_two">
            <span>合计</span>
            <br />
            <span>{{ cashSumAll.toFixed(2) }}</span
            ><span>元</span>
          </div>
        </div>
        <div class="header_right">
            <el-button type="primary" @click="export2ExcelTree()"
            >导出Excel表格</el-button
          >
        </div>
      </div>
      <div style="padding-bottom: 20px">
        <div
          id="myChartTree"
          :style="{ width: '1200px', height: '400px' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { addProData, commoditySales,keywordSearch,couponRevenue } from "@/api/jctj/commodityRevenue";
export default {
  name: "",
  data() {
    return {
      loading:false,
      loadingOne:false,
      chart: null,
      ChartTwo:null,
      chartTree:null,
      addProDataTime:{
        beginTm:null,
        endTm:null,
      },
      addUsersTimes: "", //echarts时间
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
      commodity: {
        pageNum: 1,
        pageSize: 5,
        beginTm: null,
        endTm: null,
        rtmType: 5,
      },
      totalPage:0,
      newTime: "", //时间
      payNewTime:"",
      keywordData:{
        pageNum: 1,
        pageSize: 5,
        beginTm: null,
        endTm: null,
      },
      keytotalPage:0,
      KeyWordTime:"",
      couponTime:'',//购物营收数据
      couponData:{
        beginTm: null,
        endTm: null,
        rtmType:4,
      },
      couponDataTime:'',
      couponDataAmt:'',
      totalSumAll:0,//购物营收总金额
      KeyWordNewData:[],
      tableData: [], //现金支付数据
      payTableData:[], //现金支付全部数据
      couponDataList:[],
      seriesData: [],
      legendData: [],
      cashRevenueData:{    //现金营收查询
        beginTm: null,
        endTm: null,
        rtmType:5,
      },
      cashRevenueDataList:[],//现金营收的数据
      cashRevenueTime:'',
      cashDataTime:'',
      cashDataAmt:'',
      cashSumAll:0,
      listDataKey:[], //关键词搜索所有数据
    };
  },
  created(){
    let newTimeDate = new Date();
    let startTimeStop = this.fun(newTimeDate-(24 * 60 * 60 * 1000)*30);  //开始时间
    let endTimeStop = this.fun(newTimeDate);  //结束时间
    //现金支付时间
    this.payNewTime = [startTimeStop,endTimeStop];
    this.commodity.beginTm = startTimeStop;;
    this.commodity.endTm = endTimeStop;
    //关键词搜索排名
    this.KeyWordTime = [startTimeStop,endTimeStop];
    this.keywordData.beginTm = startTimeStop;;
    this.keywordData.endTm = endTimeStop;
    //购物卷营收
    this.couponTime = [startTimeStop,endTimeStop];
    this.couponData.beginTm = startTimeStop;;
    this.couponData.endTm = endTimeStop;
    //现金营收
    this.cashRevenueTime = [startTimeStop,endTimeStop];
    this.cashRevenueData.beginTm = startTimeStop;;
    this.cashRevenueData.endTm = endTimeStop;
  },
  mounted() {
    this.gitList();
    this.dataList();
    this.keywordList();
    this.couponReveList();
    this.cashRevenueList();
    this.$nextTick(() => {
      this.drawLine();
      this.drawLineTwo();
      this.drawLineTree();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;

    if (!this.chartTwo) {
      return;
    }
    this.chartTwo.dispose();
    this.chartTwo = null;

    if (!this.chartTree) {
    return;
    }
    this.chartTree.dispose();
    this.chartTree = null;
  },
  methods: {
    gitList() {
      addProData(this.addProDataTime).then((res) => {
        if (res.code == 200) {
          let newData = res.data;
          if(newData.length !==0){
            this.addUsersTimes = newData[0].createTime;
             let sliceData = [];
            for (let i = 0; i < newData.length; i++) {
            sliceData.push({
              name: newData[i].typesName,
              type: "line",
              data: newData[i].amt,
            });
            this.legendData.push(newData[i].typesName);
            this.seriesData=sliceData;
          }
          }else{
            this.addUsersTimes=null;
            this.legendData=[];
            let sliceData = [];
            for(let m=this.seriesData.length;0<m;m--){
            sliceData.push({
              name:'',
              type: "line",
              data:'',
            });
            this.seriesData =sliceData
           }
          }
        }
        // 动态插入数据时，数据在这里设置更新
          this.chart.setOption({
          legend: {
            data: this.legendData,
          },
          xAxis: {
            data: this.addUsersTimes,
          },
          series:this.seriesData,
        });
      });
    },
    //查询
    timeData(){
      if(this.newTime){
        this.addProDataTime.beginTm = this.newTime[0];
        this.addProDataTime.endTm = this.newTime[1];
        this.gitList();
      }else{
         this.$message({
          message: "请选择时间",
          type: "warning",
          duration: 1000,
        });
        return
      }
    },
    //现金数据
    dataList() {
      this.loading=true;
      commoditySales(this.commodity).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.list;
          this.totalPage = res.data.total;
          // this.$message({
          //   message: "操作成功",
          //   type: "success",
          //   duration: 1000,
          // });
          this.loading=false;
        } else {
          this.$message({
            message: "操作失败",
            type: "error",
            duration: 1000,
          });
        }
      });
    },
    //现金支付全部数据
    dataTableList(fun){
      commoditySales({
        pageNum: 1,
        pageSize:this.totalPage,
        beginTm:this.commodity.beginTm,
        endTm:this.commodity.endTm,
      }).then((res)=>{
         if(res.code == 200){
           this.payTableData = res.data.list;
           fun()
        }else{
          this.listDataKey=[];
           this.$message({
            message: "操作失败",
            type: "error",
            duration: 1000,
          });
        }
      })
    },
      //页数
    handleSizeChange(val) {
            this.commodity.pageNum = 1;
            this.commodity.pageSize = val;
            this.dataList();
        },
     //条数
    handleCurrentChange(val) {
        this.commodity.pageNum = val;
        this.dataList();
    },
    //查询
    payTimeData() {
      if (this.payNewTime) {
        this.commodity.beginTm = this.payNewTime[0];
        this.commodity.endTm = this.payNewTime[1];
      } else {
        this.$message({
          message: "请选择时间",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.dataList();
    },
    //关键词搜索排名
    keywordList(){
      this.loadingOne=true;
      keywordSearch(this.keywordData).then((res)=>{
        if(res.code==200){
           this.KeyWordNewData = res.data.list;
           this.keytotalPage = res.data.total;
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
          this.loadingOne=false;
        }else{
          this.$message({
            message: "操作失败",
            type: "error",
            duration: 1000,
          });
        }
      })
    },
    //关键词全部搜索排名
    dataKeywordList(fun){
      keywordSearch({
        pageNum: 1,
        pageSize:this.keytotalPage,
        beginTm:this.keywordData.beginTm,
        endTm:this.keywordData.endTm,
      }).then((res)=>{
        if(res.code == 200){
           this.listDataKey = res.data.list;
           fun()
        }else{
          this.listDataKey=[];
           this.$message({
            message: "操作失败",
            type: "error",
            duration: 1000,
          });
        }
      })
    },

       //页数
   keywordChange(val) {
            this.keywordData.pageNum = 1;
            this.keywordData.pageSize = val;
            this.keywordList();
        },
     //条数
    keywordCurrentChange(val) {
        this.keywordData.pageNum = val;
        this.keywordList();
    },
    //查询
    timeDataKeyWord(){
       if (this.KeyWordTime) {
        this.keywordData.beginTm = this.KeyWordTime[0];
        this.keywordData.endTm = this.KeyWordTime[1];
      } else {
        this.$message({
          message: "请选择时间",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.keywordList();
    },
    //购物卷营收
    couponReveList(){
      if(this.couponTime){
        this.couponData.beginTm = this.couponTime[0]
        this.couponData.endTm = this.couponTime[1]
      }else {
        this.$message({
          message: "请选择时间",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      couponRevenue(this.couponData).then((res)=>{
        if(res.code == 200){
          this.couponDataList = res.data;
          let sunAllNum = 0;
          let newTimeData = [];
          let newDataAmt = [];
           this.$message({
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
          res.data.map((item) => {
            sunAllNum += item.amt
            newTimeData.push(item.createTime.substr(5,5))
            newDataAmt.push(item.amt)
          })
          this.couponDataTime = newTimeData;
          this.couponDataAmt = newDataAmt;
          this.totalSumAll = sunAllNum;
          
          this.chartTwo.setOption({
              xAxis: {
                data:this.couponDataTime
              },
              series:[{
                data:this.couponDataAmt,
              }],
          })
        }else{
          this.$message({
          message: "操作失败",
          type: "error",
          duration: 1000,
        });
        return;
        }
      })
    },
   
    //第一个
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      this.chart.setOption({
        legend: {
          data: ["新增注册用户数"],
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.addUsersTimes,
        },
        yAxis: {
          type: "value",
        },
        series: this.seriesData,
      });
    },
    
    //第二个
     drawLineTwo() {
      // 基于准备好的dom，初始化echarts实例
      this.chartTwo = this.$echarts.init(document.getElementById("myChartTwo"));
      // 绘制图表
      this.chartTwo.setOption({
        // legend: {
        //   data: ["新增注册用户数"],
        // },
        tooltip: {
          trigger: "axis",
          showContent:true,
           formatter:"{b} :<br/>支付订单的购物卷支付金额的总和  {c}",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.couponDataTime,
        },
         yAxis: {
          type: "value",
        },
        series: [
          {
            type: "line",
            itemStyle: {
              normal:{ 
                color:'#2878FF', //折点颜色
                lineStyle:{ 
                    color:'#2878FF' //折线颜色
                        } 
                } 
              },
            data: this.couponDataAmt,
          },
        ],
      });
    },
    //现金营收查询
    cashRevenueList(){
       if(this.cashRevenueTime){
        this.cashRevenueData.beginTm = this.cashRevenueTime[0]
        this.cashRevenueData.endTm = this.cashRevenueTime[1]
      }else {
        this.$message({
          message: "请选择时间",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      couponRevenue(this.cashRevenueData).then((res)=>{
        if(res.code == 200){
          this.cashRevenueDataList = res.data;
          let cashAllNum = 0;
          let cashTimeData = [];
          let cashDataAmt = [];
           this.$message({
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
          res.data.map((item) => {
            cashAllNum += item.amt
            cashTimeData.push(item.createTime.substr(5,5))
            cashDataAmt.push(item.amt)
          })
          this.cashDataTime = cashTimeData;
          this.cashDataAmt = cashDataAmt;
          this.cashSumAll = cashAllNum;
          
          this.chartTree.setOption({
              xAxis: {
                data:this.cashDataTime
              },
              series:[{
                data:this.cashDataAmt,
              }],
          })
        }else{
          this.$message({
          message: "操作失败",
          type: "error",
          duration: 1000,
        });
        return;
        }
      })

    },
    //第三个
     drawLineTree() {
      // 基于准备好的dom，初始化echarts实例
      this.chartTree = this.$echarts.init(document.getElementById("myChartTree"));
      // 绘制图表
      this.chartTree.setOption({
        // legend: {
        //   data: ["新增注册用户数"],
        // },
        tooltip: {
          trigger: "axis",
          showContent:true,
          formatter:"{b} :<br/>支付订单的购物卷支付金额的总和  {c}",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.cashDataTime,
        },
         yAxis: {
          type: "value",
        },
        series: [
          {
            type: "line",
            itemStyle: {
              normal:{ 
                color:'#2878FF', //折点颜色
                lineStyle:{ 
                    color:'#2878FF' //折线颜色
                        } 
                } 
              },
            data: this.cashDataAmt,
          },
        ],
      });
    },
      //时间戳转为yy-mm-dd hh:mm:ss
    fun(unixtimestamp){
      var unixtimestamp = new Date(unixtimestamp);
      var year = 1900 + unixtimestamp.getYear();
      var month = "0" + (unixtimestamp.getMonth() + 1);
      var date = "0" + unixtimestamp.getDate();
      var hour = "0"
      var minute = "0"
      var second = "0"
      return year + "-" + month.substring(month.length - 2, month.length) + "-" + date.substring(date.length - 2, date
          .length) +
        " " + hour + ":" +
        minute + ":" +
        second;
    },


    // 现金支付导出表格
     formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    export2Excel(){
       if (this.KeyWordTime) {
        this.keywordData.beginTm = this.KeyWordTime[0];
        this.keywordData.endTm = this.KeyWordTime[1];
      } else {
        this.$message({
          message: "请选择时间",
          type: "warning",
          duration: 1000,
        });
        return;
      }
       this.$confirm("确定要导出表格数据么？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(()=>{
         this.dataKeywordList(()=>{
            require.ensure([], () => {
                const {
                  export_json_to_excel,
                } = require("../../vendor/Export2Excel");
                const tHeader = [
                  "关键词",
                  "搜索次数",
                  "关键词搜索用户数",
                ];
                const filterVal = [
                  "field",
                  "sNum",
                  "sUserIdNum",
                ];
                const list = this.listDataKey;
                console.log(list)
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, "关键词搜索排名");
            })
         })
      })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消导出",
          });
        });
    },
    //商品销售情况（现金支付）
    export2ExcelOne(){
       if (this.payNewTime) {
        this.commodity.beginTm = this.payNewTime[0];
        this.commodity.endTm = this.payNewTime[1];
      } else {
        this.$message({
          message: "请选择时间",
          type: "warning",
          duration: 1000,
        });
        return;
      }
     this.$confirm("确定要导出表格数据么？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(()=>{
         this.dataTableList(()=>{
            require.ensure([], () => {
                const {
                  export_json_to_excel,
                } = require("../../vendor/Export2Excel");
                const tHeader = [
                  "商品分类",
                  "商品名称",
                  "店铺名称",
                  "购买次数",
                  "购买人数",
                  "销售额",
                ];
                const filterVal = [
                  "proTypeName",
                  "proName",
                  "shopName",
                  "buyNum",
                  "buyPnum",
                  "saleMoney",
                ];
                const list = this.payTableData;
                console.log(list)
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, "商品销售情况(现金支付)");
            })
         })
      })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消导出",
          });
      });
    },
    //购物卷营收导出
    export2ExcelTwo(){
      if(this.couponTime){
        this.couponData.beginTm = this.couponTime[0]
        this.couponData.endTm = this.couponTime[1]
      }else {
        this.$message({
          message: "请选择时间",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.$confirm("确定要导出表格数据么？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(()=>{
        require.ensure([], () => {
            const {
              export_json_to_excel,
            } = require("../../vendor/Export2Excel");
            const tHeader = [
              "购物卷营收",
              "时间",
            ];
            const filterVal = [
              "amt",
              "createTime",
            ];
            const list = this.couponDataList;
            console.log(list)
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, "购物卷营收数据");
         })
      })
       .catch(() => {
          this.$message({
            type: "info",
            message: "已取消导出",
          });
        });
    },
    //现金营收
    export2ExcelTree(){
      if(this.cashRevenueTime){
        this.cashRevenueData.beginTm = this.cashRevenueTime[0]
        this.cashRevenueData.endTm = this.cashRevenueTime[1]
      }else {
        this.$message({
          message: "请选择时间",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.$confirm("确定要导出表格数据么？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(()=>{
        require.ensure([], () => {
            const {
              export_json_to_excel,
            } = require("../../vendor/Export2Excel");
            const tHeader = [
              "现金营收",
              "时间",
            ];
            const filterVal = [
              "amt",
              "createTime",
            ];
            const list = this.cashRevenueDataList;
            console.log(list)
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, "现金营收数据");
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
  width: 1200px;
  margin: 30px 0 0 100px;
  .block {
    padding-top: 10px;
  }
}
.header_div {
  padding: 0px 0 20px 0;
  .header_h {
    padding: 0 0 10px 40px;
  }
  .header_picker {
    padding: 0 0 20px 40px;
  }
}
.header_div,
.header_div_two {
  border: 1px solid rgb(129, 129, 129);
  width: 1200px;
  margin: 10px 0 0 100px;
}
.header_css {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}
.header_table {
  padding-top: 1px;
  width: 1160px;
  margin: 0 auto;
  .div_pagination {
    padding: 10px 0;
    text-align: center;
  }
}
.el-table .warning-row {
  background: rgb(250, 205, 145);
}
.header_p_two {
  margin-top: 15px;
}
.header_p_two > span:nth-of-type(2) {
  margin-top: 15px;
  font-size: 40px;
}
.header_p_two > span:nth-of-type(3) {
  font-size: 25px;
  font-weight: 600;
}
.header_right {
  padding-top: 57px;
}
</style>
