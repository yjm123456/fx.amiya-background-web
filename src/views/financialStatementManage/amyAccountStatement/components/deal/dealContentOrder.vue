<template>
    <div>
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
    </div>
</template>
<script>
import * as api from "@/api/reconciliationDocuments";
export default {
  components: {},
  props: {
    actives: String,
    viewTransactionOrderParams: Object,
  },
data() {
    return {
      query: {
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "登记时间",
            key: "createDate",
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              return params.row.createDate
                ? h(
                    "div",
                    params.row.createDate  == '0001-01-01T00:00:00' ?  '' : this.$moment(params.row.createDate).format("YYYY-MM-DD HH:mm:ss")
                  )
                : "";
            },
          },
          {
            title: "成交编号",
            key: "id",
            minWidth: 170,
            align: "center",
          },
          {
            title: "订单号",
            key: "contentPlatFormOrderId",
            minWidth: 170,
            align: "center",
          },
          {
            title: "是否重单深度",
            key: "isRepeatProfundityOrder",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              return h(
                "i-switch",
                {
                  props: {
                    value: params.row.isRepeatProfundityOrder,
                    size: "default",
                    disabled:
                      params.row.isRepeatProfundityOrder === true ||
                      params.row.isRepeatProfundityOrder === false,
                  },
                },
                h("span", { isRepeatProfundityOrder: "open" }, "开"),
                h("span", { isRepeatProfundityOrder: "close" }, "关")
              );
            },
          },
          {
            title: "是否成交",
            key: "isDeal",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              return h(
                "i-switch",
                {
                  props: {
                    value: params.row.isDeal,
                    size: "default",
                    disabled:
                      params.row.isDeal === true || params.row.isDeal === false,
                  },
                },
                h("span", { isDeal: "open" }, "开"),
                h("span", { isDeal: "close" }, "关")
              );
            },
          },
          {
            title: "成交时间",
            key: "dealDate",
            minWidth: 110,
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
            title: "成交医院",
            key: "dealHospital",
            minWidth: 220,
            align: "center",
          },
          {
            title: "成交金额",
            key: "price",
            minWidth: 100,
            align: "center",
          },
          {
            title: "消费类型",
            key: "consumptionTypeText",
            minWidth: 120,
            align: "center",
          },
          {
            title: "审核状态",
            key: "checkStateText",
            minWidth: 110,
            align: "center",
            render: (h, params) => {
              if (params.row.checkStateText == "审核通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.checkStateText
                );
              } else if (params.row.checkStateText == "未审核") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.checkStateText
                );
              } else if (params.row.checkStateText == "审核不通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.checkStateText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.checkStateText
                );
              }
            },
          },
          {
            title: "审核时间",
            key: "checkDate",
            minWidth: 110,
            align: "center",
            render: (h, params) => {
              return params.row.checkDate
                ? h(
                    "div",
                    this.$moment(params.row.checkDate).format("YYYY-MM-DD")
                  )
                : "";
            },
          },
          {
            title: "对账金额",
            key: "checkPrice",
            minWidth: 100,
            align: "center",
          },
          {
            title: "服务费合计",
            key: "settlePrice",
            minWidth: 110,
            align: "center",
          },

          {
            title: "审核人",
            key: "checkByEmpName",
            minWidth: 100,
            align: "center",
          },
          {
            title: "是否回款",
            key: "isReturnBackPrice",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              return h(
                "i-switch",
                {
                  props: {
                    value: params.row.isReturnBackPrice,
                    size: "default",
                    disabled:
                      params.row.isReturnBackPrice === true ||
                      params.row.isReturnBackPrice === false,
                  },
                },
                h("span", { isReturnBackPrice: "open" }, "开"),
                h("span", { isReturnBackPrice: "close" }, "关")
              );
            },
          },
          {
            title: "回款金额",
            key: "returnBackPrice",
            minWidth: 100,
            align: "center",
          },
          {
            title: "回款时间",
            key: "returnBackDate",
            minWidth: 110,
            align: "center",
            render: (h, params) => {
              return params.row.returnBackDate
                ? h(
                    "div",
                    this.$moment(params.row.returnBackDate).format("YYYY-MM-DD")
                  )
                : "";
            },
          },
          {
            title: "归属主播",
            key: "belongLiveAnchor",
            minWidth: 100,
            align: "center",
          },
          {
            title: "归属客服",
            key: "createByEmpName",
            minWidth: 100,
            align: "center",
          },
        ],
        data: [],
        totalCount: 0,
      },
    };
  },
  methods: {
    //获取成交单列表
    getContentPlatFormOrderDealInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize } = this.query;
      const data = {
        pageNum,
        pageSize,
        reconciliationDocumentsId: this.viewTransactionOrderParams.id,
      };
      api
        .getContentPlatFormOrderDealInfoByReconciliationDocumentsId(data)
        .then((res) => {
          if (res.code === 0) {
            const { list, totalCount } = res.data.contentPlatFormOrderDealInfo;
            this.query.data = list;
            this.query.totalCount = totalCount;
          }
        });
    },
    //获取成交单列表分页
    handlePageChange(pageNum) {
      const { pageSize } = this.query;
      const data = {
        pageNum,
        pageSize,
        reconciliationDocumentsId: this.viewTransactionOrderParams.id,
      };
      api
        .getContentPlatFormOrderDealInfoByReconciliationDocumentsId(data)
        .then((res) => {
          if (res.code === 0) {
            const { list, totalCount } = res.data.contentPlatFormOrderDealInfo;
            this.query.data = list;
            this.query.totalCount = totalCount;
          }
        });
    },
  },
  watch: {
    actives: {
      handler(value) {
        if (value === "dealContentOrder") {
            this.getContentPlatFormOrderDealInfo()
        }
      },
      immediate: true,
    },
  },
};
</script>
<style scoped>
.page_wrap {
  text-align: right;
  margin-top: 10px;
}
</style>
