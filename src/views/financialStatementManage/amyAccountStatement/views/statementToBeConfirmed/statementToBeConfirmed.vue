<template>
  <div>
    <Card :dis-hover="true">
      <div class="content">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px; "
            @keyup.enter.native="getHospitalInfo()"
          />
          <Select
            v-model="query.hospitalId"
            placeholder="请选择医院"
            filterable
            style="width: 240px;margin-left:10px"
            v-if="employeeType == 'amiyaEmployee'"
          >
            <Option
              v-for="item in hospitalInfo"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <DatePicker
            type="date"
            placeholder="创建开始日期"
            style="width: 180px; margin-left: .625rem"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="创建结束时间"
            style="width: 180px;margin-left: .625rem;"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="成交开始日期"
            style="width: 180px; margin-left: .625rem"
            :value="query.startDealDate"
            v-model="query.startDealDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="成交结束时间"
            style="width: 180px;margin-left: .625rem;"
            :value="query.endDealDate"
            v-model="query.endDealDate"
          ></DatePicker>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getHospitalInfo()"
            >查询</Button
          >
        </div>
      
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table
          border
          :columns="query.columns"
          :data="query.data"
        ></Table>
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
import * as api from "@/api/reconciliationDocuments";
import { download } from "@/utils/util";

export default {
  components: {
  },
  props: {
    activeName: String,
    hospitalInfo:Array
  },
  data() {
    return {
      orderId: new Set(),
      // 查询
      query: {
        hospitalId:null,
        keyword: "",
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        startDealDate: null,
        endDealDate: null,
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "对账单编号",
            key: "id",
            width: 170,
            align:'center'
          },
          {
            title: "医院",
            key: "hospitalName",
            width: 220,
          },
          {
            title: "客户姓名",
            key: "customerName",
            width: 160,
          },
          {
            title: "客户电话",
            key: "customerPhone",
            width: 160,
            align: "center",
          },
          {
            title: "成交项目",
            key: "dealGoods",
            width: 160,
            align: "center",
            tooltip:true
          },
          {
            title: "成交时间",
            key: "dealDate",
            width: 140,
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
            title: "总成交金额",
            key: "totalDealPrice",
            width: 140,
            align: "center",
          },
          {
            title: "对账状态",
            key: "reconciliationStateText",
            width: 140,
            align: "center",
          },
          {
            title: "信息服务费比例（%）",
            key: "returnBackPricePercent",
            width: 180,
            align: "center",
          },
          {
            title: "信息服务费金额",
            key: "returnBackPrice",
            width: 150,
            align: "center",
          },

          {
            title: "系统维护费比例（%）",
            key: "systemUpdatePricePercent",
            width: 200,
            align: "center",
          },
          {
            title: "系统维护金额",
            key: "systemUpdatePrice",
            width: 140,
            align: "center",
          },
          {
            title: "服务费合计",
            key: "returnBackTotalPrice",
            width: 140,
            align: "center",
          },
          {
            title: "问题原因",
            key: "questionReason",
            width: 220,
          },
          {
            title: "备注",
            key: "remark",
            width: 220,
          },
          {
            title: "创建时间",
            key: "createDate",
            width: 180,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.createDate
                  ? this.$moment(params.row.createDate).format("YYYY-MM-DD HH:mm:ss")
                  : ""
              );
            },
          },
          {
            title: "创建人",
            key: "createByName",
            width: 140,
          },
        
        ],
        data: [],
        totalCount: 0,
      },
      employeeType: sessionStorage.getItem("employeeType"),
    };
  },
  methods: {
    // 获取对账单列表
    getHospitalInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        keyword,
        startDealDate,
        endDealDate,
        startDate,
        endDate,
        hospitalId
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        startDealDate: startDealDate
          ? this.$moment(startDealDate).format("YYYY-MM-DD")
          : null,
        endDealDate: endDealDate
          ? this.$moment(endDealDate).format("YYYY-MM-DD")
          : null,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        reconciliationState: 1,
        hospitalId:this.employeeType == 'amiyaEmployee' ? hospitalId : sessionStorage.getItem('hospitalId')
      };
      api.getReconciliationDocuments(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.reconciliationDocumentsInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取对账单列表分页
    handlePageChange(pageNum) {
      const {
        pageSize,
        keyword,
        startDealDate,
        endDealDate,
        startDate,
        endDate,
        hospitalId
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        startDealDate: startDealDate
          ? this.$moment(startDealDate).format("YYYY-MM-DD")
          : null,
        endDealDate: endDealDate
          ? this.$moment(endDealDate).format("YYYY-MM-DD")
          : null,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        reconciliationState: 1,
        hospitalId:this.employeeType == 'amiyaEmployee' ? hospitalId : sessionStorage.getItem('hospitalId')
      };
      api.getReconciliationDocuments(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.reconciliationDocumentsInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
  },
  created() {
    // this.getLogisticsCompanyList()
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "statementToBeConfirmed") {
          this.getHospitalInfo();
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container {
  margin-top: 16px;
}
.page_wrap {
  text-align: right;
  margin-top: 10px;
}
</style>
