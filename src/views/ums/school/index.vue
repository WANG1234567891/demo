<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right; margin-top: 34px; margin-right: 30%"
          @click="searchSchoolList()"
          type="primary"
          size="small"
        >查询结果</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="搜了宝ID：">
            <el-input
              style="width: 203px"
              type="number"
              :min="0"
              v-model="listQuery.slbUserId"
              placeholder="搜了宝ID"
              :disabled="listdisabled.slbDisabled"
              @change="focusInput()"
            ></el-input>
          </el-form-item>
          <el-form-item label="和平村ID：">
            <el-input
              style="width: 203px"
              type="number"
              :min="0"
              v-model="listQuery.hpcUserId"
              placeholder="和平村ID"
              :disabled="listdisabled.hpcDisabled"
              @change="focusInputOne()"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input
              style="width: 203px"
              type="number"
              :min="0"
              v-model="listQuery.phone"
              placeholder="手机号"
              :disabled="listdisabled.phoneDisabled"
              @change="focusInputTwo()"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <div>
        <h3>基本信息</h3>
      </div>
      <div style="border: 1px solid gray; padding-top: 10px; width: 800px">
        <el-row>
          <el-col :span="14">
            <el-form label-width="150px">
              <el-form-item label="搜了宝会员昵称：">
                <span>{{ list.nickName || "暂无" }}</span>
              </el-form-item>
              <el-form-item label="注册时间：">
                <span>{{ list.createAt || "暂无" }}</span>
              </el-form-item>
              <el-form-item label="搜了宝ID：">
                <span>{{ list.slId || "暂无" }}</span>
              </el-form-item>
              <el-form-item label="和平村ID：">
                <span>{{ list.hpcId || "暂无" }}</span>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="10">
            <el-form label-width="120px">
              <el-form-item label="代理身份：">
                <span v-if="list.agentLevel == 0">普通会员</span>
                <span v-else-if="list.agentLevel == 1">准合伙人</span>
                <span v-else-if="list.agentLevel == 2">加盟店</span>
                <span v-else-if="list.agentLevel == 3">合伙人</span>
                <span v-else>暂无</span>
              </el-form-item>
              <el-form-item label="手机号：">
                <span>{{ list.phone || "暂无" }}</span>
              </el-form-item>
              <el-form-item label="地区：">
                <span>{{ list.zone || "暂无" }}</span>
              </el-form-item>
              <el-form-item label="所属运营中心：">
                <span>{{ list.yyCenter || "暂无" }}</span>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <div>
        <h3>上级信息</h3>
      </div>
      <div style="border: 1px solid gray; padding-top: 10px; width: 800px">
        <el-row>
          <el-col :span="24">
            <el-form label-width="130px">
              <el-form-item label="上级ID：">
                <span>{{ list.superId || "暂无" }}</span>
              </el-form-item>
              <el-form-item label="上级身份：">
                <span v-if="list.superIdentity == 0">普通会员</span>
                <span v-else-if="list.superIdentity == 1">准合伙人</span>
                <span v-else-if="list.superIdentity == 2">加盟店</span>
                <span v-else-if="list.superIdentity == 3">合伙人</span>
                <span v-else>暂无</span>
              </el-form-item>
              <el-form-item label="上级手机号：">
                <span>{{ list.superPhone || "暂无" }}</span>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never" style="float: left">
      <div>
        <h3>搜了宝银行卡信息</h3>
      </div>
      <div style="border: 1px solid gray; padding-top: 10px; width: 800px">
        <el-row>
          <el-col :span="24">
            <el-form label-width="130px">
              <el-form-item label="真实姓名：">
                <span>{{ list.slRealName || "暂无" }}</span>
              </el-form-item>
              <el-form-item label="证件号码：">
                <span>{{ list.slCardNum || "暂无" }}</span>
              </el-form-item>
              <el-form-item label="开户支行：">
                <span>{{ list.slOpenBankAdd || "暂无" }}</span>
              </el-form-item>
              <el-form-item label="银行卡号：">
                <span>{{ list.slBankNum || "暂无" }}</span>
              </el-form-item>
              <el-form-item label="银行卡状态：">
                <span v-if="list.slBankStatus == 0">未绑定</span>
                <span v-else-if="list.slBankStatus == 1">已绑定</span>
                <span v-else>未绑定</span>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never" style="float: left">
      <div>
        <h3>和平村银行卡信息</h3>
      </div>
      <div style="border: 1px solid gray; padding-top: 10px; width: 800px">
        <el-row>
          <el-col :span="24">
            <el-form label-width="130px">
              <el-form-item label="真实姓名：">
                <span>{{ list.hpcRealName || "暂无" }}</span>
              </el-form-item>
              <el-form-item label="证件号码：">
                <span>{{ list.hpcCardNum || "暂无" }}</span>
              </el-form-item>
              <el-form-item label="开户支行：">
                <span>{{ list.hpcOpenBankAdd || "暂无" }}</span>
              </el-form-item>
              <el-form-item label="银行卡号：">
                <span>{{ list.hpcBankNum || "暂无" }}</span>
              </el-form-item>
              <el-form-item label="银行卡状态：">
                <span v-if="list.slBankStatus == 0">未绑定</span>
                <span v-else-if="list.slBankStatus == 1">已绑定</span>
                <span v-else>未绑定</span>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <div style="clear: both"></div>
    <el-card class="operate-container" shadow="never">
      <div>
        <h3>会员资产信息</h3>
      </div>
      <div style="padding-top: 10px; width: 600px">
        <el-row>
          <el-col :span="8">
            <div class="grid-content">兑礼卷</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">{{ list.djjBalance || "暂无" }}</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-button type="primary" size="mini" @click="djjBalanceClick()">查看明细</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div class="grid-content">购物卷</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">{{ list.hpcGwjBalance || "暂无" }}</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-button type="primary" size="mini" @click="hpcGwjBalanceClickMone()">查看明细</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div class="grid-content">积分</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">{{ list.integration || "暂无" }}</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-button type="primary" size="mini" @click="userJfBalance()">查看明细</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <div>
        <h3>和平村信息</h3>
      </div>
      <div style="border: 1px solid gray; padding: 10px 0; width: 800px">
        <el-row>
          <el-col :span="12">
            <div class="grid-contentOne">
              <span class="contentOneSpan">持有数量：</span>
              <span class="contentOneSpanOne">{{ list.hpcHasNum }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-contentOne">
              <span class="contentOneSpan">可卖数量：</span>
              <span class="contentOneSpanOne">{{ list.hpcHasSellNum }}</span>
            </div>
          </el-col>
        </el-row>
        <el-table :data="lists" highlight-current-row style="width: 90%">
          <el-table-column label width="150" align="center">
            <template slot-scope="scope">{{ scope.row.exProName }}</template>
          </el-table-column>
          <el-table-column label="累积兑换" width="80" align="center">
            <template slot-scope="scope">{{ scope.row.exNum }}</template>
          </el-table-column>
          <el-table-column label="累计释放" width="80" align="center">
            <template slot-scope="scope">{{ scope.row.releaseNums }}</template>
          </el-table-column>
          <el-table-column label="未释放" width="80" align="center">
            <template slot-scope="scope">{{ scope.row.exBalance }}</template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="exListSluerMebClick(scope.row.exProId)"
              >查看兑礼订单</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <div style="padding-top: 10px; width: 600px">
        <el-row>
          <el-col :span="8">
            <div class="grid-content">和平村买卖记录</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-button type="primary" size="mini" @click="hpcVillageBusinessClick()">查看明细</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div class="grid-content">充值记录</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-button type="primary" size="mini" @click="rechargeRecordClick()">查看明细</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div class="grid-content">申请提现/打款记录</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-button type="primary" size="mini" @click="createRemitsMon()">查看明细</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 兑礼订单 -->
    <el-dialog title="充值记录" :visible.sync="createExListClick.dialogVisible" width="70%">
      <el-card class="filter-container" shadow="never">
        <div>
          <span>日期范围：</span>
          <el-date-picker
            v-model="createExListClick.create_time"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            align="right"
          ></el-date-picker>
          <el-button
            style="float: right; margin-right: 3%"
            @click="exListClickMone()"
            type="primary"
            size="small"
          >查询</el-button>
        </div>
        <div style="margin-top: 15px">
          <el-table :data="exListTableData" style="width: 100%" v-loading="listLoading" border  @expand-change="expandChange">
            <el-table-column prop="exSn" label="订单编号" align="center" width="170"></el-table-column>
            <el-table-column prop="exTime" label="兑换日期" align="center"></el-table-column>
            <el-table-column prop="giveNumber" label="兑换数量" align="center"></el-table-column>
            <el-table-column prop="giveBalance" label="剩余释放数量" align="center"></el-table-column>
            <el-table-column label="查看释放明细" align="center" type="expand" width="170">
               <template slot-scope="scope">
                 <!-- <div v-for="(item,index) in tableDataInfo" :key="index">
                     <span>{{item.releaseNum}}</span>
                 </div> -->
               <el-table
              border
              :data="tableDataInfo"
              v-loading="listLoading"
              style="width: 100%"
            >
              <el-table-column
                width="200px"
                label="释放时间"
                prop="creleaseTime"
                align="center"
              ></el-table-column>
              <el-table-column
                width="200px"
                label="释放数量"
                prop="releaseNum"
                align="center"
              ></el-table-column>
            </el-table>
            </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination-container">
          <el-pagination
            background
            @size-change="createExListSizeChange"
            @current-change="createExListCurrentChange"
            layout="total, sizes,prev, pager, next,jumper"
            :page-size="createExListClick.pageSize"
            :page-sizes="[5, 10, 15]"
            :current-page.sync="createExListClick.pageNum"
            :total="total"
          ></el-pagination>
        </div>
      </el-card>
    </el-dialog>

    <!-- 兑礼卷明细 -->
    <el-dialog title="兑礼卷" :visible.sync="vertyProduct.dialogVisible" width="50%">
      <el-card class="filter-container" shadow="never">
        <div>
          <span>日期范围：</span>
          <el-date-picker
            v-model="vertyProduct.create_time"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            align="right"
          ></el-date-picker>
          <el-button
            style="float: right; margin-right: 300px"
            @click="handleSearchList()"
            type="primary"
            size="small"
          >查询</el-button>
        </div>
        <div style="margin-top: 15px">
          <el-table :data="tableData" style="width: 100%" v-loading="listLoading">
            <el-table-column label="卷来源渠道" width="100" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.type == 1">转入</span>
                <span v-if="scope.row.type == 2">兑换</span>
                <span v-if="scope.row.type == 3">冻结</span>
                <span v-if="scope.row.type == 4">过期</span>
                <span v-if="scope.row.type == 5">转出</span>
                <span v-if="scope.row.type == 6">兑股权</span>
              </template>
            </el-table-column>
            <el-table-column label="卷额" width="180" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.type == 1">+{{ scope.row.total }}</span>
                <span v-else>-{{ scope.row.total }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="createTm" label="发生时间" align="center"></el-table-column>
            <el-table-column prop="pastTm" label="过期时间" align="center"></el-table-column>
          </el-table>
        </div>
        <div class="pagination-container">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes,prev, pager, next,jumper"
            :page-size="vertyProduct.pageSize"
            :page-sizes="[5, 10, 15]"
            :current-page.sync="vertyProduct.pageNum"
            :total="total"
          ></el-pagination>
        </div>
      </el-card>
    </el-dialog>

    <!-- 购物卷明细 -->
    <el-dialog title="购物卷" :visible.sync="hpcGwjBalanceClick.dialogVisible" width="50%">
      <el-card class="filter-container" shadow="never">
        <div>
          <span>日期范围：</span>
          <el-date-picker
            v-model="hpcGwjBalanceClick.create_time"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            align="right"
          ></el-date-picker>
          <el-button
            style="float: right; margin-right: 100px"
            @click="handlehpcGwjBalanceClick()"
            type="primary"
            size="small"
          >查询</el-button>
        </div>
        <div style="margin-top: 15px">
          <el-table :data="gwjLyTableData" style="width: 100%" v-loading="listLoading">
            <el-table-column label="卷来源类型" width="100" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.gwjLy == 11">购买商品转出</span>
                <span v-if="scope.row.gwjLy == 21">和平村转入</span>
                <span v-if="scope.row.gwjLy == 22">微信充值转入</span>
                <span v-if="scope.row.gwjLy == 23">支付宝充值转入</span>
                <span v-if="scope.row.gwjLy == 24">退单转入</span>
                <span v-if="scope.row.gwjLy == 100">财务操作</span>
              </template>
            </el-table-column>
            <el-table-column label="卷额" width="180" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.gwjLy == 11">-{{ scope.row.gwjTotal }}</span>
                <span v-if="scope.row.gwjLy == 21">+{{ scope.row.gwjTotal }}</span>
                <span v-if="scope.row.gwjLy == 22">+{{ scope.row.gwjTotal }}</span>
                <span v-if="scope.row.gwjLy == 23">+{{ scope.row.gwjTotal }}</span>
                <span v-if="scope.row.gwjLy == 24">+{{ scope.row.gwjTotal }}</span>
                <span v-if="scope.row.gwjLy == 100">
                  {{
                  scope.row.gwjTotal
                  }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="gwjCreateTm" label="发生时间" align="center"></el-table-column>
            <el-table-column prop="gwjSourceId" label="卷消耗订单ID" align="center"></el-table-column>
          </el-table>
        </div>
        <div class="pagination-container">
          <el-pagination
            background
            @size-change="GwjBalanceSizeChange"
            @current-change="GwjBalanceCurrentChange"
            layout="total, sizes,prev, pager, next,jumper"
            :page-size="hpcGwjBalanceClick.pageSize"
            :page-sizes="[5, 10, 15]"
            :current-page.sync="hpcGwjBalanceClick.pageNum"
            :total="total"
          ></el-pagination>
        </div>
      </el-card>
    </el-dialog>

    <!-- 积分明细 -->
    <el-dialog title="积分明细" :visible.sync="userJfBalanceClick.dialogVisible" width="50%">
      <el-card class="filter-container" shadow="never">
        <div>
          <span>日期范围：</span>
          <el-date-picker
            v-model="userJfBalanceClick.create_time"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            align="right"
          ></el-date-picker>
          <el-button
            style="float: right; margin-right: 100px"
            @click="userJfBalanceClickMone()"
            type="primary"
            size="small"
          >查询</el-button>
        </div>
        <div style="margin-top: 15px">
          <el-table :data="userJfTableData" style="width: 100%" v-loading="listLoading">
            <el-table-column prop="jfCreateTm" label="产出时间" align="center"></el-table-column>
            <el-table-column prop="jfMoney" label="积分数量" align="center"></el-table-column>
            <el-table-column prop="jfOutId" label="转出用户ID" align="center"></el-table-column>
            <el-table-column prop="jfOderId" label="订单ID" align="center"></el-table-column>
            <el-table-column label="积分类型" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.jfType == 1">支出</span>
                <span v-if="scope.row.jfType == 2">收入</span>
                <span v-if="scope.row.jfType == 3">转账</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination-container">
          <el-pagination
            background
            @size-change="userJfceSizeChange"
            @current-change="userJfceCurrentChange"
            layout="total, sizes,prev, pager, next,jumper"
            :page-size="userJfBalanceClick.pageSize"
            :page-sizes="[5, 10, 15]"
            :current-page.sync="userJfBalanceClick.pageNum"
            :total="total"
          ></el-pagination>
        </div>
      </el-card>
    </el-dialog>

    <!-- 和平村买卖记录-->
    <el-dialog title="和平村买卖记录" :visible.sync="hpcVillageBusiness.dialogVisible" width="80%">
      <el-card class="filter-container" shadow="never">
        <div>
          <span>日期范围：</span>
          <el-date-picker
            v-model="hpcVillageBusiness.create_time"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            align="right"
          ></el-date-picker>
          <el-button
            style="float: right; margin-right: 100px"
            @click="hpcVillageClickMone()"
            type="primary"
            size="small"
          >查询</el-button>
        </div>
        <div style="margin-top: 15px">
          <el-table :data="hpcVillageData" style="width: 100%" v-loading="listLoading">
            <el-table-column prop="serialNumber" label="订单号" align="center"></el-table-column>
            <el-table-column prop="trdingTime" label="交易时间" align="center"></el-table-column>
            <el-table-column prop="proNumber" label="商品数量" align="center"></el-table-column>
            <el-table-column prop="unitPrice" label="实时价" align="center"></el-table-column>
            <el-table-column prop="sumAmount" label="总额" align="center"></el-table-column>
            <el-table-column prop="productName" label="商品信息" align="center"></el-table-column>
            <el-table-column label="买卖方向" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.delistingStatus == 1">买</span>
                <span v-if="scope.row.delistingStatus == 2">卖</span>
              </template>
            </el-table-column>
            <el-table-column prop="poundage" label="手续费" align="center"></el-table-column>
            <el-table-column prop="storageFwf" label="仓储费" align="center"></el-table-column>
            <el-table-column prop="platformFwf" label="平台服务费" align="center"></el-table-column>
            <el-table-column prop="gwj" label="购物卷" align="center"></el-table-column>
            <el-table-column label="是否释放订单" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.isReleaseOrder == 0">不是</span>
                <span v-if="scope.row.isReleaseOrder == 1">是</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination-container">
          <el-pagination
            background
            @size-change="hpcVillageChange"
            @current-change="hpcVillageCurrentChange"
            layout="total, sizes,prev, pager, next,jumper"
            :page-size="hpcVillageBusiness.pageSize"
            :page-sizes="[5, 10, 15]"
            :current-page.sync="hpcVillageBusiness.pageNum"
            :total="total"
          ></el-pagination>
        </div>
      </el-card>
    </el-dialog>

    <!-- 充值记录 -->
    <el-dialog title="充值记录" :visible.sync="balanceRechargeRecordClick.dialogVisible" width="50%">
      <el-card class="filter-container" shadow="never">
        <div>
          <span>日期范围：</span>
          <el-date-picker
            v-model="balanceRechargeRecordClick.create_time"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            align="right"
          ></el-date-picker>
          <el-button
            style="float: right; margin-right: 200px"
            @click="balanceBalanceRechargeClickMone()"
            type="primary"
            size="small"
          >查询</el-button>
        </div>
        <div style="margin-top: 15px">
          <el-table :data="balanceTableData" style="width: 100%" v-loading="listLoading">
            <el-table-column label="支付类型" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.topChannel == 1">微信</span>
                <span v-if="scope.row.topChannel == 2">支付宝</span>
                <span v-if="scope.row.topChannel == 3">线下付款</span>
              </template>
            </el-table-column>
            <el-table-column prop="topTime" label="充值时间" align="center"></el-table-column>
            <el-table-column prop="topAmt" label="充值金额" align="center"></el-table-column>
          </el-table>
        </div>
        <div class="pagination-container">
          <el-pagination
            background
            @size-change="BalanceRechargeRecordSizeChange"
            @current-change="BalanceRechargeRecordCurrentChange"
            layout="total, sizes,prev, pager, next,jumper"
            :page-size="balanceRechargeRecordClick.pageSize"
            :page-sizes="[5, 10, 15]"
            :current-page.sync="balanceRechargeRecordClick.pageNum"
            :total="total"
          ></el-pagination>
        </div>
      </el-card>
    </el-dialog>

    <!-- 申请提现/打款记录 -->
    <el-dialog title="充值记录" :visible.sync="createRemitsClick.dialogVisible" width="70%">
      <el-card class="filter-container" shadow="never">
        <div>
          <span>日期范围：</span>
          <el-date-picker
            v-model="createRemitsClick.create_time"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            align="right"
          ></el-date-picker>
          <el-button
            style="float: right; margin-right: 200px"
            @click="createRemitsClickMone()"
            type="primary"
            size="small"
          >查询</el-button>
        </div>
        <div style="margin-top: 15px">
          <el-table :data="createRemitsTableData" style="width: 100%" v-loading="listLoading">
            <el-table-column prop="dkOrderId" label="订单ID" align="center"></el-table-column>
            <el-table-column prop="dkBankNum" label="银行卡账户" align="center"></el-table-column>
            <el-table-column prop="dkBankAdd" label="开户支行" align="center"></el-table-column>
            <el-table-column prop="dkCreateTime" label="申请时间" align="center"></el-table-column>
            <el-table-column prop="dkSqMoney" label="申请金额" align="center"></el-table-column>
            <el-table-column prop="dkPoundage" label="手续费" align="center"></el-table-column>
            <el-table-column prop="dkTotalAmt" label="提现金额" align="center"></el-table-column>
            <el-table-column label="平台打款状态" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.dkPaySts == 0">支付失败</span>
                <span v-if="scope.row.dkPaySts == 1">支付成功</span>
                <span v-if="scope.row.dkPaySts == 2">待支付</span>
                <span v-if="scope.row.dkPaySts == 3">线下已付款</span>
                <span v-if="scope.row.dkPaySts == 102">申请售后</span>
                <span v-if="scope.row.dkPaySts == 103">取消申请提现</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination-container">
          <el-pagination
            background
            @size-change="createRemitsSizeChange"
            @current-change="createRemitsCurrentChange"
            layout="total, sizes,prev, pager, next,jumper"
            :page-size="createRemitsClick.pageSize"
            :page-sizes="[5, 10, 15]"
            :current-page.sync="createRemitsClick.pageNum"
            :total="total"
          ></el-pagination>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>
<script>
import {
  fetchList,
  createdjjBalanceClick,
  deleteslUserMeb,
  deletesUserJflUserMeb,
  createHpcBusiness,
  createRechargeRecord,
  createExList,
  minXi,
  createRemits,
} from "@/api/ums/school";
import { formatDate } from "@/utils/date";
import Axios from "axios";
export default {
  name: "schoolList",
  data() {
    return {
      listLoading: false,
      operates: [
        {
          label: "显示品牌",
          value: "showSchool",
        },
        {
          label: "隐藏品牌",
          value: "hideSchool",
        },
      ],
      vertyProduct: {
        dialogVisible: false,
        create_time: null,
        pageNum: 1,
        pageSize: 10,
        beginTm: null,
        endTm: null,
      },
      hpcGwjBalanceClick: {
        dialogVisible: false,
        create_time: null,
        pageNum: 1,
        pageSize: 10,
        beginTm: null,
        endTm: null,
      },
      userJfBalanceClick: {
        dialogVisible: false,
        create_time: null,
        pageNum: 1,
        pageSize: 10,
        beginTm: null,
        endTm: null,
      },
      hpcVillageBusiness: {
        dialogVisible: false,
        create_time: null,
        pageNum: 1,
        pageSize: 10,
        beginTm: null,
        endTm: null,
      },
      balanceRechargeRecordClick: {
        dialogVisible: false,
        create_time: null,
        pageNum: 1,
        pageSize: 10,
        beginTm: null,
        endTm: null,
      },
      createExListClick: {
        dialogVisible: false,
        create_time: null,
        pageNum: 1,
        pageSize: 10,
        beginTm: null,
        endTm: null,
        proId: null,
      },
      createRemitsClick: {
        dialogVisible: false,
        create_time: null,
        pageNum: 1,
        pageSize: 10,
        beginTm: null,
        endTm: null,
        proId: null,
      },
      pickerOptions: {
        shortcuts: [
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
      operateType: null,
      listQuery: {
        slbUserId: null,
        hpcUserId: null,
        phone: null,
        pageNum: 1,
        pageSize: 10,
      },
      listdisabled: {
        phoneDisabled: false,
        hpcDisabled: false,
        slbDisabled: false,
      },
      list: [],
      lists: [],
      tableData: [],
      userJfTableData: [],
      gwjLyTableData: [],
      hpcVillageData: [],
      balanceTableData: [],
      exListTableData: [],
      minXiList: [],
      newAllList: [],
      createRemitsTableData: [],
      total: null,
      listLoading: true,
      multipleSelection: [],
      tableDataInfo:[],
      newList: [
        {
          hpcId: null,
          slId: null,
          phone: null,
        },
      ],
      expands: [], //只展开一行放入当前行id
      getRowKeys: (row) => {
        //获取当前行id
        return row.serialNumber; //这里看这一行中需要根据哪个属性值是id
      },
    };
  },
  created() {
    this.listQuery.slbUserId = this.$route.query.id;
    if (this.$route.query.id) {
      this.getList();
    }
  },
  filters: {
    formatCreateTime(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },

    formatStatus(value) {
      if (value === 1) {
        return "是";
      } else {
        return "否";
      }
    },
  },
  methods: {
    focusInput() {
      if (this.listQuery.slbUserId) {
        this.listdisabled.phoneDisabled = true;
        this.listdisabled.hpcDisabled = true;
      } else {
        this.listdisabled.phoneDisabled = false;
        this.listdisabled.hpcDisabled = false;
      }
    },
    focusInputOne() {
      if (this.listQuery.hpcUserId) {
        this.listdisabled.phoneDisabled = true;
        this.listdisabled.slbDisabled = true;
      } else {
        this.listdisabled.phoneDisabled = false;
        this.listdisabled.slbDisabled = false;
      }
    },
    focusInputTwo() {
      if (this.listQuery.phone) {
        this.listdisabled.hpcDisabled = true;
        this.listdisabled.slbDisabled = true;
      } else {
        this.listdisabled.hpcDisabled = false;
        this.listdisabled.slbDisabled = false;
      }
    },

    //搜索
    searchSchoolList() {
      this.getList();
    },
    //数据
    getList() {
      this.listLoading = true;
      let newData = new FormData();
      if (this.listQuery.slbUserId) {
        newData.append("userId", this.listQuery.slbUserId);
      } else if (this.listQuery.hpcUserId) {
        newData.append("hpcId", this.listQuery.hpcUserId);
      } else if (this.listQuery.phone) {
        newData.append("phone", this.listQuery.phone);
      }
      // newData.append("pageNum", this.listQuery.pageNum);
      // newData.append("pageSize", this.listQuery.pageSize);
      fetchList(newData).then((response) => {
        this.listLoading = false;
        this.list = response.data;
        this.newList.slId = response.data.slId;
        this.newList.hpcId = response.data.hpcId;
        this.newList.phone = response.data.phone;
        // this.total = response.data.total;
        // this.totalPage = response.data.pages;
        // this.pageSize = response.data.size;
        let lists = [];
        for (var key in this.list.hpcInfo) {
          lists.push(JSON.parse(JSON.stringify(this.list.hpcInfo[key])));
        }
        this.lists = lists;
      });
    },
    //查看兑礼订单
    exListSluerMebClick(row) {
      this.createExListClick.dialogVisible = true;
      this.listLoading = true;
      this.createExListClick.proId = row;
      let newData = new FormData();
      newData.append("userId", this.newList.slId);
      newData.append("proId", this.createExListClick.proId);
      newData.append("pageNum", this.createExListClick.pageNum);
      newData.append("pageSize", this.createExListClick.pageSize);
      if (this.createExListClick.create_time) {
        newData.append("beginTm", this.createExListClick.beginTm);
        newData.append("endTm", this.createExListClick.endTm);
      }
      createExList(newData).then((response) => {
        this.listLoading = false;
        this.exListTableData = response.data.list;
        this.total = response.data.total;
      });
      this.getDataMinXi();
    },

      expandChange(row, expandedRows) {
        console.log(row,"row")
      var that = this;
      if (expandedRows) {
        let newData = new FormData()
        newData.append("exSn",row.exSn)
        minXi(newData).then((response)=>{
          if(response.code==200){
            this.tableDataInfo = response.data.list;
            console.log(this.tableDataInfo)
          } else {
            this.tableDataInfo = [];
          }
        })
      }
      if (expandedRows.length !== 0) {
        // 只展开一行//说明展开了
        that.expands = [];
        if (row) {
          that.expands.push(row.serialNumber); // 只展开当前行id
        }
      } else {
        // 说明收起了
        that.expands = [];
      }
    },
    getDataMinXi() {
      minXi(this.listQuery.hpcUserId).then((res) => {
        console.log(res);
        this.minXiList = res.data.list;
        this.minXiList.forEach( (creleaseTime, releaseNum)=> {
          this.exListTableData.forEach({
            creleaseTime: creleaseTime,
            releaseNum: releaseNum,
          });

        });
        console.log(this.exListTableData)
        //  this.newAllList = this.minXiList.concat(this.exListTableData)
        //   console.log(this.newAllList)
      });
    },
    exListClickMone() {
      if (this.createExListClick.create_time) {
        this.createExListClick.beginTm = this.createExListClick.create_time[0];
        this.createExListClick.endTm = this.createExListClick.create_time[1];
        this.exListSluerMebClick(this.createExListClick.proId);
      } else {
        this.exListSluerMebClick(this.createExListClick.proId);
      }
    },
    createExListSizeChange(val) {
      this.createExListClick.pageNum = 1;
      this.createExListClick.pageSize = val;
      this.exListSluerMebClick(this.createExListClick.proId);
    },
    createExListCurrentChange(val) {
      this.vertyProduct.pageNum = val;
      this.exListSluerMebClick(this.createExListClick.proId);
    },
    //兑礼卷明细
    djjBalanceClick() {
      if (!this.newList.slId) {
        this.$message({
          message: "请先查询或查询的条件错误",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.listLoading = true;
      this.vertyProduct.dialogVisible = true;
      let newData = new FormData();
      newData.append("userId", this.newList.slId);
      newData.append("pageNum", this.vertyProduct.pageNum);
      newData.append("pageSize", this.vertyProduct.pageSize);
      if (this.vertyProduct.create_time) {
        newData.append("beginTm", this.vertyProduct.beginTm);
        newData.append("endTm", this.vertyProduct.endTm);
      }
      createdjjBalanceClick(newData).then((response) => {
        this.listLoading = false;
        this.tableData = response.data.list;
        this.total = response.data.total;
      });
    },
    handleSearchList() {
      if (this.vertyProduct.create_time) {
        this.vertyProduct.beginTm = this.vertyProduct.create_time[0];
        this.vertyProduct.endTm = this.vertyProduct.create_time[1];
        this.djjBalanceClick();
      } else {
        this.djjBalanceClick();
      }
    },
    handleSizeChange(val) {
      this.vertyProduct.pageNum = 1;
      this.vertyProduct.pageSize = val;
      this.djjBalanceClick();
    },
    handleCurrentChange(val) {
      this.vertyProduct.pageNum = val;
      this.djjBalanceClick();
    },
    //购物卷明细
    hpcGwjBalanceClickMone() {
      if (!this.newList.phone) {
        this.$message({
          message: "请先查询或查询的条件错误",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.listLoading = true;
      this.hpcGwjBalanceClick.dialogVisible = true;
      let newData = new FormData();
      newData.append("phone", this.newList.phone);
      newData.append("pageNum", this.hpcGwjBalanceClick.pageNum);
      newData.append("pageSize", this.hpcGwjBalanceClick.pageSize);
      if (this.hpcGwjBalanceClick.create_time) {
        newData.append("beginTm", this.hpcGwjBalanceClick.beginTm);
        newData.append("endTm", this.hpcGwjBalanceClick.endTm);
      }
      deleteslUserMeb(newData).then((response) => {
        this.listLoading = false;
        this.gwjLyTableData = response.data.list;
        this.total = response.data.total;
      });
    },
    GwjBalanceSizeChange(val) {
      this.hpcGwjBalanceClick.pageNum = 1;
      this.hpcGwjBalanceClick.pageSize = val;
      this.hpcGwjBalanceClickMone();
    },
    GwjBalanceCurrentChange(val) {
      this.hpcGwjBalanceClick.pageNum = val;
      this.hpcGwjBalanceClickMone();
    },
    handlehpcGwjBalanceClick() {
      if (this.hpcGwjBalanceClick.create_time) {
        this.hpcGwjBalanceClick.beginTm = this.hpcGwjBalanceClick.create_time[0];
        this.hpcGwjBalanceClick.endTm = this.hpcGwjBalanceClick.create_time[1];
        this.hpcGwjBalanceClickMone();
      } else {
        this.hpcGwjBalanceClickMone();
      }
    },

    //积分明细
    userJfBalance() {
      if (!this.newList.slId) {
        this.$message({
          message: "请先查询或查询的条件错误",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.listLoading = true;
      this.userJfBalanceClick.dialogVisible = true;
      let newData = new FormData();
      newData.append("userId ", this.newList.slId);
      newData.append("pageNum", this.userJfBalanceClick.pageNum);
      newData.append("pageSize", this.userJfBalanceClick.pageSize);
      if (this.userJfBalanceClick.create_time) {
        newData.append("beginTm", this.userJfBalanceClick.beginTm);
        newData.append("endTm", this.userJfBalanceClick.endTm);
      }
      deletesUserJflUserMeb(newData).then((response) => {
        this.listLoading = false;
        this.userJfTableData = response.data.list;
        this.total = response.data.total;
      });
    },
    userJfceSizeChange(val) {
      this.userJfBalanceClick.pageNum = 1;
      this.userJfBalanceClick.pageSize = val;
      this.userJfBalance();
    },
    userJfceCurrentChange(val) {
      this.userJfBalanceClick.pageNum = val;
      this.userJfBalance();
    },
    userJfBalanceClickMone() {
      if (this.userJfBalanceClick.create_time) {
        this.userJfBalanceClick.beginTm = this.userJfBalanceClick.create_time[0];
        this.userJfBalanceClick.endTm = this.userJfBalanceClick.create_time[1];
        this.userJfBalance();
      } else {
        this.userJfBalance();
      }
    },

    //和平村买卖记录
    hpcVillageBusinessClick() {
      if (!this.newList.hpcId) {
        this.$message({
          message: "请先查询或查询的条件错误",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.listLoading = true;
      this.hpcVillageBusiness.dialogVisible = true;
      let newData = new FormData();
      newData.append("hpcId", this.newList.hpcId);
      newData.append("pageNum", this.hpcVillageBusiness.pageNum);
      newData.append("pageSize", this.hpcVillageBusiness.pageSize);
      if (this.hpcVillageBusiness.create_time) {
        newData.append("beginTm", this.hpcVillageBusiness.beginTm);
        newData.append("endTm", this.hpcVillageBusiness.endTm);
      }
      createHpcBusiness(newData).then((response) => {
        this.listLoading = false;
        this.hpcVillageData = response.data.list;
        this.total = response.data.total;
      });
    },
    hpcVillageChange(val) {
      this.hpcVillageBusiness.pageNum = 1;
      this.hpcVillageBusiness.pageSize = val;
      this.hpcVillageBusinessClick();
    },
    hpcVillageCurrentChange(val) {
      this.hpcVillageBusiness.pageNum = val;
      this.hpcVillageBusinessClick();
    },
    hpcVillageClickMone() {
      if (this.hpcVillageBusiness.create_time) {
        this.hpcVillageBusiness.beginTm = this.hpcVillageBusiness.create_time[0];
        this.hpcVillageBusiness.endTm = this.hpcVillageBusiness.create_time[1];
        this.hpcVillageBusinessClick();
      } else {
        this.hpcVillageBusinessClick();
      }
    },

    //充值记录
    rechargeRecordClick() {
      if (!this.newList.hpcId) {
        this.$message({
          message: "请先查询或查询的条件错误",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.listLoading = true;
      this.balanceRechargeRecordClick.dialogVisible = true;
      let newData = new FormData();
      newData.append("hpcId ", this.newList.hpcId);
      newData.append("pageNum", this.balanceRechargeRecordClick.pageNum);
      newData.append("pageSize", this.balanceRechargeRecordClick.pageSize);
      if (this.balanceRechargeRecordClick.create_time) {
        newData.append("beginTm", this.balanceRechargeRecordClick.beginTm);
        newData.append("endTm", this.balanceRechargeRecordClick.endTm);
      }
      createRechargeRecord(newData).then((response) => {
        this.listLoading = false;
        this.balanceTableData = response.data.list;
        this.total = response.data.total;
      });
    },
    BalanceRechargeRecordSizeChange(val) {
      this.balanceRechargeRecordClick.pageNum = 1;
      this.balanceRechargeRecordClick.pageSize = val;
      this.rechargeRecordClick();
    },
    BalanceRechargeRecordCurrentChange(val) {
      this.balanceRechargeRecordClick.pageNum = val;
      this.rechargeRecordClick();
    },
    balanceBalanceRechargeClickMone() {
      if (this.balanceRechargeRecordClick.create_time) {
        this.balanceRechargeRecordClick.beginTm = this.balanceRechargeRecordClick.create_time[0];
        this.balanceRechargeRecordClick.endTm = this.balanceRechargeRecordClick.create_time[1];
        this.rechargeRecordClick();
      } else {
        this.rechargeRecordClick();
      }
    },

    //申请打款记录
    createRemitsMon() {
      if (!this.newList.phone) {
        this.$message({
          message: "请先查询或查询的条件错误",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.listLoading = true;
      this.createRemitsClick.dialogVisible = true;
      let newData = new FormData();
      newData.append("phone ", this.newList.phone);
      newData.append("pageNum", this.createRemitsClick.pageNum);
      newData.append("pageSize", this.createRemitsClick.pageSize);
      if (this.createRemitsClick.create_time) {
        newData.append("beginTm", this.createRemitsClick.beginTm);
        newData.append("endTm", this.createRemitsClick.endTm);
      }
      createRemits(newData).then((response) => {
        this.listLoading = false;
        this.createRemitsTableData = response.data.list;
        this.total = response.data.total;
      });
    },
    createRemitsSizeChange(val) {
      this.createRemitsClick.pageNum = 1;
      this.createRemitsClick.pageSize = val;
      this.createRemitsMon();
    },
    createRemitsCurrentChange(val) {
      this.createRemitsClick.pageNum = val;
      this.createRemitsMon();
    },
    createRemitsClickMone() {
      if (this.createRemitsClick.create_time) {
        this.createRemitsClick.beginTm = this.createRemitsClick.create_time[0];
        this.createRemitsClick.endTm = this.createRemitsClick.create_time[1];
        this.createRemitsMon();
      } else {
        this.createRemitsMon();
      }
    },
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },
    // handleUpdate(index, row) {
    //   this.$router.push({ path: "/ums/updateSchool", query: { id: row.id } });
    // },
    // handleDelete(index, row) {
    //   this.$confirm("是否要删除该品牌", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   }).then(() => {
    //     deleteSchool(row.id).then((response) => {
    //       this.$message({
    //         message: "删除成功",
    //         type: "success",
    //         duration: 1000,
    //       });
    //       this.getList();
    //     });
    //   });
    // },
    // getProductList(index, row) {
    //   console.log(index, row);
    // },
    // getProductCommentList(index, row) {
    //   console.log(index, row);
    // },

    // handleSizeChange(val) {
    //   this.listQuery.pageNum = 1;
    //   this.listQuery.pageSize = val;
    //   this.getList();
    // },
    // handleCurrentChange(val) {
    //   this.listQuery.pageNum = val;
    //   this.getList();
    // },
    // searchSchoolList() {
    //   this.listQuery.pageNum = 1;
    //   this.getList();
    // },
    // handleBatchOperate() {
    //   console.log(this.multipleSelection);
    //   if (this.multipleSelection < 1) {
    //     this.$message({
    //       message: "请选择一条记录",
    //       type: "warning",
    //       duration: 1000,
    //     });
    //     return;
    //   }
    //   let showStatus = 0;
    //   if (this.operateType === "showSchool") {
    //     showStatus = 1;
    //   } else if (this.operateType === "hideSchool") {
    //     showStatus = 0;
    //   } else {
    //     this.$message({
    //       message: "请选择批量操作类型",
    //       type: "warning",
    //       duration: 1000,
    //     });
    //     return;
    //   }
    //   let ids = [];
    //   for (let i = 0; i < this.multipleSelection.length; i++) {
    //     ids.push(this.multipleSelection[i].id);
    //   }
    //   let data = new URLSearchParams();
    //   data.append("ids", ids);
    //   data.append("showStatus", showStatus);
    //   updateShowStatus(data).then((response) => {
    //     this.getList();
    //     this.$message({
    //       message: "修改成功",
    //       type: "success",
    //       duration: 1000,
    //     });
    //   });
    // },
    // addSchool() {
    //   this.$router.push({ path: "/ums/addSchool" });
    // },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border: 1px solid gray;
  text-align: center;
  line-height: 40px;
  min-height: 40px;
  .el-button {
    width: 130px;
  }
}
.grid-contentOne {
  text-align: center;
  line-height: 40px;
  min-height: 40px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-form-item {
  margin-bottom: 5px;
}
.operate-container {
  margin-top: 0px;
}
.el-card {
  border: 0px;
}
.contentOneSpan {
  font-size: 24px;
  font-weight: 600;
}
.contentOneSpanOne {
  font-size: 20px;
}
</style>


