<template>
  <div>
    <Modal
      v-model="control"
      title="成交单"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="90%"
    >
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

      <div slot="footer">
        <Button @click="handleCancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/reconciliationDocuments";
export default {
  components: {},
  props: {
    viewTransactionOrderModel: Boolean,
    viewTransactionOrderParams: Object,
  },
  data() {
    return {
      control: false,
      query: {
        pageNum: 1,
        pageSize: 10,
        columns: [
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
            title: "是否成交",
            key: "isDeal",
            minWidth: 120,
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
            title: "审核状态",
            key: "checkStateText",
            minWidth: 120,
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

    handleCancel(name) {
      this.$emit("update:viewTransactionOrderModel", false);
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel();
      }
    },
  },
  watch: {
    viewTransactionOrderModel(value) {
      this.control = value;
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
