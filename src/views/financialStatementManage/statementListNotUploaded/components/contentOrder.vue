<template>
  <div>
    <Card class="container">
      <div class="content">
        <div class="left">
          <div>
            <div class="title">未对账订单</div>
            <Table
              border
              :columns="query.columns"
              :data="query.data"
              @on-select="handleSelect"
              @on-select-cancel="handleCancels"
              @on-select-all="handleSelectAll"
              @on-select-all-cancel="handleSelectAll"
            ></Table>
          </div>
          <div class="page_wrap">
            <Page
              ref="pages"
              :current="query.pageNum"
              :page-size="query.pageSize"
              :total="query.totalCount"
              show-total
              show-sizer
              :page-size-opts="[10, 20, 50, 100, 200, 500]"
              @on-change="handlePageChange"
              @on-page-size-change="handlePageSizeChange"
              transfer
            />
          </div>
        </div>
        <div class="right">
          <div class="title">已选中订单</div>
          <Table
            border
            :columns="query.rightColumns"
            :data="query.rightData"
          ></Table>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import * as dealApi from "@/api/contentPlatFormOrderDealInfo";
export default {
  components: {},
  props: {
    timeParams: Object,
  },
  data() {
    return {
      query: {
        // 最小金额
        minAddOrderPrice: null,
        // 最大金额
        maxAddOrderPrice: null,
        //是否到院
        isToHospital: -1,
        // 到院开始时间
        tohospitalStartDate: "",
        // 到院结束时间
        toHospitalEndDate: "",
        // 是否成交
        isDeal: -1,
        // 成交开始时间
        dealStartDate: "",
        // 成交结束时间
        dealEndDate: "",
        // 到院医院
        lastDealHospitalId: -1,
        // 是否陪诊
        isAccompanying: -1,
        // 新老客业绩
        isOldCustomer: -1,
        // 是否回款
        isReturnBakcPrice: -1,
        // 回款开始时间
        returnBackPriceStartDate: "",
        // 回款结束时间
        returnBackPriceEndDate: "",
        // 跟进人员
        customerServiceId: -1,
        // 派单开始时间
        sendStartDate: "",
        // 派单结束时间
        sendEndDate: "",
        // 面诊状态
        consultationType: -1,
        toHospitalType: -1,
        ReturnBackPriceState: "-1",
        consultationEmpId: -1,
        contentPlatFormId: null,
        liveAnchorId: null,
        hospitalId: "",
        hospitalList: [{ id: -1, name: "全部医院" }],
        lastDealHospitalList: [{ id: -1, name: "全部到院医院" }],
        startDate: "",
        endDate: "",
        contentPlateFormId: "",
        keyword: "",
        checkState: -1,
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            type: "selection",
            key: "_checked",
            align: "center",
            minWidth: 60,
          },
          {
            title: "成交编号",
            key: "id",
            minWidth: 170,
            align: "center",
          },

          {
            title: "客户电话",
            key: "phone",
            minWidth: 140,
            align: "center",
          },
          {
            title: "成交时间",
            key: "dealDate",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return params.row.dealDate
                ? h(
                    "div",
                    this.$moment(params.row.dealDate).format("YYYY-MM-DD")
                  )
                : "";
            },
          },
          {
            title: "成交金额",
            key: "price",
            minWidth: 120,
            align: "center",
          },
          {
            title: "成交医院",
            key: "dealHospital",
            minWidth: 220,
            align: "center",
          },
        ],
        data: [],
        totalCount: 0,
        rightData: [],
        rightColumns: [
          {
            title: "成交编号",
            key: "id",
            minWidth: 170,
            align: "center",
          },

          {
            title: "客户电话",
            key: "phone",
            minWidth: 140,
            align: "center",
          },
          {
            title: "成交时间",
            key: "dealDate",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return params.row.dealDate
                ? h(
                    "div",
                    this.$moment(params.row.dealDate).format("YYYY-MM-DD")
                  )
                : "";
            },
          },
          {
            title: "成交金额",
            key: "price",
            minWidth: 120,
            align: "center",
          },
          {
            title: "成交医院",
            key: "dealHospital",
            minWidth: 220,
            align: "center",
          },
        ],
      },
    };
  },
  methods: {
    handlePageSizeChange(pageSize) {
      this.query.rightData = [];
      this.query.pageSize = pageSize;
      this.getContentPlatFormOrderDealInfo();
    },
    handleSelect(selection, row) {
      this.query.rightData.push(row);
    },
    handleCancels(selection, row) {
      this.query.rightData.map((item, index) => {
        if (item.id == row.id) {
          this.query.rightData.splice(index, 1);
        }
      });
    },
    handleSelectAll(selection) {
      if (selection && selection.length === 0) {
        this.query.rightData = [];
      } else {
        this.query.rightData = selection;
      }
    },
    // 获取内容平台已成交列表
    getContentPlatFormOrderDealInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });

      const {
        pageNum,
        pageSize,
        keyword,
        checkState,
        contentPlateFormId,
        startDate,
        endDate,
        hospitalId,
        liveAnchorId,
        consultationEmpId,
        ReturnBackPriceState,
        toHospitalType,
        isToHospital,
        tohospitalStartDate,
        toHospitalEndDate,
        isDeal,
        lastDealHospitalId,
        isAccompanying,
        isOldCustomer,
        isReturnBakcPrice,
        returnBackPriceStartDate,
        returnBackPriceEndDate,
        customerServiceId,
        sendStartDate,
        sendEndDate,
        consultationType,
        minAddOrderPrice,
        maxAddOrderPrice,
        dealStartDate,
        dealEndDate,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword:this.timeParams.assemblyKeyword,
        checkState: checkState == -1 ? null : checkState,
        contentPlateFormId,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : "",
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        hospitalId: hospitalId == -1 ? null : hospitalId,
        liveAnchorId,
        consultationEmpId: consultationEmpId == -1 ? null : consultationEmpId,
        ReturnBackPriceState:
          ReturnBackPriceState == "-1" ? null : ReturnBackPriceState,
        toHospitalType: toHospitalType == -1 ? null : toHospitalType,
        isToHospital: isToHospital == -1 ? null : isToHospital,
        tohospitalStartDate:
          isToHospital == "true"
            ? tohospitalStartDate
              ? this.$moment(tohospitalStartDate).format("YYYY-MM-DD")
              : null
            : null,
        toHospitalEndDate:
          isToHospital == "true"
            ? toHospitalEndDate
              ? this.$moment(toHospitalEndDate).format("YYYY-MM-DD")
              : null
            : null,
        isDeal:
          this.timeParams.startDate && this.timeParams.endDate ? true : null,
        lastDealHospitalId:
          this.timeParams.assemblyHospitalId == -1 ? null : this.timeParams.assemblyHospitalId,
        isAccompanying: isAccompanying == -1 ? null : isAccompanying,
        isOldCustomer: isOldCustomer == -1 ? null : isOldCustomer,
        isReturnBakcPrice: isReturnBakcPrice == -1 ? null : isReturnBakcPrice,
        returnBackPriceStartDate:
          isReturnBakcPrice == "true"
            ? returnBackPriceStartDate
              ? this.$moment(returnBackPriceStartDate).format("YYYY-MM-DD")
              : null
            : null,
        returnBackPriceEndDate:
          isReturnBakcPrice == "true"
            ? returnBackPriceEndDate
              ? this.$moment(returnBackPriceEndDate).format("YYYY-MM-DD")
              : null
            : null,
        customerServiceId: customerServiceId == -1 ? null : customerServiceId,
        sendStartDate: sendStartDate
          ? this.$moment(sendStartDate).format("YYYY-MM-DD")
          : "",
        sendEndDate: sendEndDate
          ? this.$moment(sendEndDate).format("YYYY-MM-DD")
          : "",
        consultationType: consultationType == -1 ? null : consultationType,
        minAddOrderPrice,
        maxAddOrderPrice,
        dealStartDate: this.timeParams.startDate
          ? this.$moment(this.timeParams.startDate).format("YYYY-MM-DD")
          : null,
        dealEndDate: this.timeParams.endDate
          ? this.$moment(this.timeParams.endDate).format("YYYY-MM-DD")
          : null,
      };
      dealApi.getContentPlatFormOrderDealInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.contentPlatFormOrderDealInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取内容平台已成交列表分页
    handlePageChange(pageNum) {
      const {
        pageSize,
        keyword,
        checkState,
        contentPlateFormId,
        startDate,
        endDate,
        hospitalId,
        liveAnchorId,
        consultationEmpId,
        ReturnBackPriceState,
        toHospitalType,

        isToHospital,
        tohospitalStartDate,
        toHospitalEndDate,
        isDeal,
        lastDealHospitalId,
        isAccompanying,
        isOldCustomer,
        isReturnBakcPrice,
        returnBackPriceStartDate,
        returnBackPriceEndDate,
        customerServiceId,
        sendStartDate,
        sendEndDate,
        consultationType,
        minAddOrderPrice,
        maxAddOrderPrice,
        dealStartDate,
        dealEndDate,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword:this.timeParams.assemblyKeyword,
        checkState: checkState == -1 ? null : checkState,
        contentPlateFormId,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : "",
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        hospitalId: hospitalId == -1 ? null : hospitalId,
        liveAnchorId,
        consultationEmpId: consultationEmpId == -1 ? null : consultationEmpId,
        ReturnBackPriceState:
          ReturnBackPriceState == "-1" ? null : ReturnBackPriceState,
        toHospitalType: toHospitalType == -1 ? null : toHospitalType,
        isToHospital: isToHospital == -1 ? null : isToHospital,
        tohospitalStartDate:
          isToHospital == "true"
            ? tohospitalStartDate
              ? this.$moment(tohospitalStartDate).format("YYYY-MM-DD")
              : null
            : null,
        toHospitalEndDate:
          isToHospital == "true"
            ? toHospitalEndDate
              ? this.$moment(toHospitalEndDate).format("YYYY-MM-DD")
              : null
            : null,
        isDeal:
          this.timeParams.startDate && this.timeParams.endDate ? true : null,
        lastDealHospitalId:
          this.timeParams.assemblyHospitalId == -1 ? null : this.timeParams.assemblyHospitalId,
        isAccompanying: isAccompanying == -1 ? null : isAccompanying,
        isOldCustomer: isOldCustomer == -1 ? null : isOldCustomer,
        isReturnBakcPrice: isReturnBakcPrice == -1 ? null : isReturnBakcPrice,
        returnBackPriceStartDate:
          isReturnBakcPrice == "true"
            ? returnBackPriceStartDate
              ? this.$moment(returnBackPriceStartDate).format("YYYY-MM-DD")
              : null
            : null,
        returnBackPriceEndDate:
          isReturnBakcPrice == "true"
            ? returnBackPriceEndDate
              ? this.$moment(returnBackPriceEndDate).format("YYYY-MM-DD")
              : null
            : null,
        customerServiceId: customerServiceId == -1 ? null : customerServiceId,
        sendStartDate: sendStartDate
          ? this.$moment(sendStartDate).format("YYYY-MM-DD")
          : "",
        sendEndDate: sendEndDate
          ? this.$moment(sendEndDate).format("YYYY-MM-DD")
          : "",
        consultationType: consultationType == -1 ? null : consultationType,
        minAddOrderPrice,
        maxAddOrderPrice,
        dealStartDate: this.timeParams.startDate
          ? this.$moment(this.timeParams.startDate).format("YYYY-MM-DD")
          : null,
        dealEndDate: this.timeParams.endDate
          ? this.$moment(this.timeParams.endDate).format("YYYY-MM-DD")
          : null,
      };
      dealApi.getContentPlatFormOrderDealInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.contentPlatFormOrderDealInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
  },
};
</script>
<style scoped>
.page_wrap {
  text-align: right;
  margin-top: 10px;
}
.content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.left,
.right {
  width: 49.5%;
}
.title{
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #000;
}
</style>
