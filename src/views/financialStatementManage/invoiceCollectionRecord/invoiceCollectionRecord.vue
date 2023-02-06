<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getHospitalInfo()"
          />
          <DatePicker
            type="date"
            placeholder="回款开始时间"
            style="width: 130px; margin-left: .625rem"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="回款结束时间"
            style="width: 130px;margin-left: .625rem;"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <Select
            v-model="query.hospitalId"
            placeholder="请选择客户"
            filterable
            style="width: 200px; margin-left: 10px"
          >
            <Option
              v-for="item in hospitalAllList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.returnBackState"
            placeholder="请选择回款状态"
            filterable
            style="width: 150px; margin-left: 10px"
          >
            <Option
              v-for="item in billReturnBackStateAllList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.companyId"
            placeholder="请选择收款公司"
            filterable
            style="width: 200px; margin-left: 10px"
          >
            <Option
              v-for="item in companyNameAllList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getHospitalInfo()"
            >查询</Button
          >
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="exportChange()"
            >导出</Button
          >
        </div>
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data"></Table>
      </div>
      <div class="page_wrap">
        <Page
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          show-total
          show-elevator
          @on-change="handlePageChange"
        />
      </div>
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/bill";
import * as hospitalApi from "@/api/hospitalManage";
import * as corApi from "@/api/corporateManagement";
import { download } from "@/utils/util";
export default {
  data() {
    return {
      // 查询
      query: {
        hospitalId: -1,
        returnBackState: -1,
        companyId: -1,
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "票据编号",
            key: "billId",
            minWidth: 140,
            align: "center",
          },
          {
            title: "客户",
            key: "hospitalName",
            minWidth: 220,
            align: "center",
          },
          {
            title: "收款公司",
            key: "companyName",
            minWidth: 220,
            align: "center",
          },
          {
            title: "发票金额",
            key: "billPrice",
            minWidth: 120,
            align: "center",
          },
          {
            title: "其他费用",
            key: "otherPrice",
            minWidth: 120,
            align: "center",
          },

          {
            title: "回款金额",
            key: "returnBackPrice",
            minWidth: 120,
            align: "center",
          },
          {
            title: "回款时间",
            key: "returnBackDate",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.returnBackDate
                  ? this.$moment(params.row.returnBackDate).format(
                      "YYYY-MM-DD"
                    )
                  : ""
              );
            },
          },
          {
            title: "回款状态",
            key: "returnBackStateText",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              if (params.row.returnBackStateText == "已回款") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.returnBackStateText
                );
              } else if (params.row.returnBackStateText == "未回款") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.returnBackStateText
                );
              }  else if (params.row.returnBackStateText == "回款中") {
                return h(
                  "div",
                  {
                    style: {
                      color: "orange",
                    },
                  },
                  params.row.returnBackStateText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.returnBackStateText
                );
              }
            },
          },

          {
            title: "备注",
            key: "remark",
            minWidth: 300,
            align: "center",
          },
          {
            title: "操作人",
            key: "createByEmployeeName",
            minWidth: 130,
            align: "center",
          },
          {
            title: "操作时间",
            key: "createDate",
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.createDate
                  ? this.$moment(params.row.createDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : ""
              );
            },
          },
          
        ],
        data: [],
        totalCount: 0,
      },
      hospitalAllList: [{ id: -1, name: "全部客户" }],
      companyNameAllList: [{ id: -1, name: "全部收款公司" }],
      billReturnBackStateAllList: [{ id: -1, name: "全部回款状态" }],
    };
  },
  methods: {
    // 获取票据回款状态下拉框
    billReturnBackStateList() {
      api.billReturnBackStateList().then((res) => {
        if (res.code === 0) {
          this.billReturnBackStateAllList = [
            ...this.billReturnBackStateAllList,
            ...res.data.billReturnBackStateList,
          ];
        }
      });
    },
    // 获取医院名称列表下拉框
    getHospitalInfonameList() {
      hospitalApi.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          this.hospitalAllList = [
            ...this.hospitalAllList,
            ...res.data.hospitalInfo,
          ];
        }
      });
    },
    // 获取公司管理数据下拉框
    getCompany() {
      corApi.getCompanyBaseInfoNameList().then((res) => {
        if (res.code === 0) {
          this.companyNameList = res.data.nameList;
          this.companyNameAllList = [
            ...this.companyNameAllList,
            ...res.data.nameList,
          ];
        }
      });
    },
    // 获取发票回款列表
    getHospitalInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        keyword,
        hospitalId,
        returnBackState,
        companyId,
        startDate,
        endDate,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        hospitalId: hospitalId == -1 ? null : hospitalId,
        returnBackState: returnBackState == -1 ? null : returnBackState,
        companyId: companyId == -1 ? null : companyId,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
      };
      api.getBillReturnBackPriceData(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.billReturnBackPriceData;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取发票回款列表分页
    handlePageChange(pageNum) {
      const {
        pageSize,
        keyword,
        hospitalId,
        returnBackState,
        companyId,
        startDate,
        endDate,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        hospitalId: hospitalId == -1 ? null : hospitalId,
        returnBackState: returnBackState == -1 ? null : returnBackState,
        companyId: companyId == -1 ? null : companyId,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
      };
      api.getBillReturnBackPriceData(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.billReturnBackPriceData;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
    // 导出
    exportChange() {
      const {
        pageNum,
        pageSize,
        keyword,
        hospitalId,
        returnBackState,
        companyId,
        startDate,
        endDate,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        hospitalId: hospitalId == -1 ? null : hospitalId,
        returnBackState: returnBackState == -1 ? null : returnBackState,
        companyId: companyId == -1 ? null : companyId,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
      };
      if (!startDate || !endDate) {
        this.$Message.error("请选择日期");
        return;
      }
      if (this.query.data.length == 0) {
        this.$Message.error("没有数据时不支持导出");
        return;
      }
      api.exportBillReturnBackPriceDataList(data).then((res) => {
        let name =
          this.$moment(new Date(startDate)).format("YYYY-MM-DD") +
          "-" +
          this.$moment(new Date(endDate)).format("YYYY-MM-DD") +
          "发票回款记录";
        download(res, name);
      });
    },
  },
  created() {
    this.getHospitalInfo();
    this.billReturnBackStateList();
    this.getHospitalInfonameList();
    this.getCompany();
  },
};
</script>
<style lang="less" scoped>
.header_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
