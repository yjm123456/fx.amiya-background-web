<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyWord"
            placeholder="请输入关键字"
            style="width: 200px; "
            @keyup.enter.native="getListWithPageByCustomerCompensation()"
          />
          <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 150px;margin-left: .625rem"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束日期"
            style="width: 150px; margin-left: .625rem"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <Select
            v-model="query.belongEmpId"
            placeholder="请选择归属客服"
            filterable
            style="width: 200px;margin-left:10px"
          >
            <Option
              v-for="item in params.employeeAll"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.chooseHospitalId"
            placeholder="请选择医院"
            filterable
            style="width: 200px;margin-left:10px"
          >
            <Option
              v-for="item in params.hospitallist"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.isOldCustoemr"
            placeholder="请选择业绩"
            filterable
            style="width: 150px;margin-left:10px"
          >
            <Option
              v-for="item in params.isOldCustoemrList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select> 
          <!-- <Select
            v-model="query.checkState"
            placeholder="请选择审核状态"
            filterable
            style="width: 150px;margin-left:10px"
          >
            <Option
              v-for="item in params.checkStateListAll"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select> -->
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getListWithPageByCustomerCompensation()"
            >查询</Button
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
          show-sizer
          :page-size-opts="[10, 20, 50, 100, 200]"
          @on-change="handlePageChange"
          @on-page-size-change="handlePageSizeChange"
        />
      </div>
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/reconciliationDocumentsSettle";
import examine from "../components/examine.vue";

export default {
  components: {
    examine
  },
  props: {
    activeName: String,
    params: Object,
  },
  data() {
    return {
      // 查询
      query: {
        keyWord: "",
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        chooseHospitalId:-1,
        isOldCustoemr:-1,
        belongEmpId:-1,
        checkState:2,
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "对账单编号",
            key: "recommandDocumentId",
            align: "center",
            minWidth: 180,
          },
          
          {
            title: "医院",
            key: "hospitalName",
            align: "center",
            minWidth: 180,
            tooltip:true
          },
          {
            title: "来源",
            key: "orderFromText",
            minWidth: 120,
            align: "center",
            tooltip:true
          },
          {
            title: "订单号",
            key: "orderId",
            minWidth: 180,
            align: "center",
          },
          {
            title: "成交编号",
            key: "dealInfoId",
            minWidth: 180,
            align: "center",
          },
          {
            title: "成交时间",
            key: "dealDate",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.dealDate
                  ? this.$moment(params.row.dealDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          {
            title: "订单金额",
            key: "orderPrice",
            minWidth: 100,
            align: "center",
          },
          {
            title: "对账金额",
            key: "returnBackPrice",
            minWidth: 160,
            align: "center",
          },
          {
            title: "审核客服业绩金额",
            key: "customerServiceSettlePrice",
            minWidth: 180,
            align: "center",
          },
          {
            title: "归属主播",
            key: "belongLiveAnchor",
            minWidth: 150,
            align: "center",
            tooltip:true
          },
          {
            title: "归属客服",
            key: "belongEmpName",
            minWidth: 120,
            align: "center",
            tooltip:true
          },
          
          {
            title: "新/老客业绩",
            key: "isOldCustomerText",
            minWidth: 140,
            align: "center",
          },
          {
            title: "审核状态",
            key: "compensationCheckStateText",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              if (params.row.compensationCheckStateText == "审核通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.compensationCheckStateText
                );
              } else if (params.row.compensationCheckStateText == "未审核") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.compensationCheckStateText
                );
              } else if (params.row.compensationCheckStateText == "审核不通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.compensationCheckStateText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.compensationCheckStateText
                );
              }
            },
          },
          {
            title: "最终归属客服",
            key: "checkBelongEmpName",
            minWidth: 140,
            align: "center",
            tooltip:true
          },
          {
            title: "审核备注",
            key: "checkRemark",
            minWidth: 150,
            align: "center",
          },
          {
            title: "审核时间",
            key: "checkDate",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.checkDate
                  ? this.$moment(params.row.checkDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          
        ],
        data: [],
        totalCount: 0,
      },
     
    };
  },
  methods: {
    // 获取薪资审核表
    getListWithPageByCustomerCompensation() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });

      const {
        pageNum,
        pageSize,
        keyWord,
        startDate,
        endDate,
        chooseHospitalId,
        checkState,
        belongEmpId,
        isOldCustoemr
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        startDate: startDate
          ? this.$moment(new Date(startDate)).format("YYYY-MM-DD")
          : null,
        endDate: endDate
          ? this.$moment(new Date(endDate)).format("YYYY-MM-DD")
          : null,
        chooseHospitalId: chooseHospitalId == -1 ? null : chooseHospitalId,
        checkState,
        belongEmpId: belongEmpId == -1 ? null : belongEmpId,
        isOldCustoemr: isOldCustoemr == -1 ? null : isOldCustoemr,
      };
      api.getListWithPageByCustomerCompensation(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.reconciliationDocumentsSettleInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取录单申请列表分页
    handlePageChange(pageNum) {
      const {
        pageSize,
        keyWord,
        startDate,
        endDate,
        chooseHospitalId,
        checkState,
        belongEmpId,
        isOldCustoemr
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        startDate: startDate
          ? this.$moment(new Date(startDate)).format("YYYY-MM-DD")
          : null,
        endDate: endDate
          ? this.$moment(new Date(endDate)).format("YYYY-MM-DD")
          : null,
        chooseHospitalId: chooseHospitalId == -1 ? null : chooseHospitalId,
        checkState,
        belongEmpId: belongEmpId == -1 ? null : belongEmpId,
        isOldCustoemr: isOldCustoemr == -1 ? null : isOldCustoemr,
      };
      api.getListWithPageByCustomerCompensation(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.reconciliationDocumentsSettleInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
    handlePageSizeChange(pageSize) {
      this.query.pageSize = pageSize;
      this.getListWithPageByCustomerCompensation();
    },
  },
  created() {
    
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "audited") {
          this.getListWithPageByCustomerCompensation();
        }
      },
      immediate: true,
    },
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
