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
    viewTransactionOrderParams: Object,
    actives:String,
  },
data() {
    return {
      query: {
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "订单号",
            key: "id",
            minWidth: 170,
            align: "center",
          },
          {
            title: "成交时间",
            key: "writeOffDate",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return params.row.writeOffDate
                ? h(
                    "div",
                    this.$moment(params.row.writeOffDate).format("YYYY-MM-DD")
                  )
                : "";
            },
          },
          {
            title: "成交金额",
            key: "actualPayment",
            minWidth: 120,
            align: "center",
          },
          {
            title: "审核状态",
            key: "checkState",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              if (params.row.checkState == "审核通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.checkState
                );
              } else if (params.row.checkState == "未审核") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.checkState
                );
              } else if (params.row.checkState == "审核不通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.checkState
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.checkState
                );
              }
            },
          },
          {
            title: "审核时间",
            key: "checkDate",
            minWidth: 120,
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
            minWidth: 120,
            align: "center",
          },
          {
            title: "服务费合计",
            key: "settlePrice",
            minWidth: 120,
            align: "center",
          },

          {
            title: "审核人",
            key: "checkByEmpName",
            minWidth: 120,
            align: "center",
          },
          {
            title: "是否回款",
            key: "isReturnBackPrice",
            minWidth: 120,
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
            minWidth: 120,
            align: "center",
          },
          {
            title: "回款时间",
            key: "returnBackDate",
            minWidth: 120,
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
            key: "liveAnchor",
            minWidth: 120,
            align: "center",
          },
          {
            title: "归属客服",
            key: "belongEmpName",
            minWidth: 120,
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
        .getOrderByReconciliationDocumentsIdLlistWithPage(data)
        .then((res) => {
          if (res.code === 0) {
            const { list, totalCount } = res.data.order;
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
        .getOrderByReconciliationDocumentsIdLlistWithPage(data)
        .then((res) => {
          if (res.code === 0) {
            const { list, totalCount } = res.data.order;
            this.query.data = list;
            this.query.totalCount = totalCount;
          }
        });
    },
  },
  watch: {
    actives: {
      handler(value) {
        if (value === "dealOrder") {
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
