<template>
  <div>
    <Modal
      @on-visible-change="close"
      title="今天订单状态发生改变的订单列表"
      footer-hide
      v-model="control"
      width="80%"
    >
      <div>
        <div>
          <Table :columns="columns" :data="data" border height="500"></Table>
        </div>
        <div class="page_wrap">
          <Page
            ref="pages"
            :current="pageNum"
            :page-size="pageSize"
            :total="totalCount"
            show-total
            show-elevator
            @on-change="handlePageChange"
          />
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
export default {
  props: {
    controlModal: Boolean,
    employeeId: Number,
    keyword: String,
    statusCode: String,
  },
  data() {
    return {
      control: false,
      columns: [
        {
          title: "订单编号",
          key: "id",
          minWidth: 170,
        },
        {
          title: "下单平台",
          key: "appTypeText",
          minWidth: 170,
        },
        {
          title: "商品",
          key: "thumbPicUrl",
          minWidth: 250,
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  padding: "3px 0",
                },
              },
              [
                h(
                  "viewer",
                  {
                    props: {
                      options: {
                        toolbar: false,
                        title: false,
                        navbar: false,
                      },
                    },
                  },
                  [
                    h("img", {
                      style: {
                        width: "50px",
                        height: "50px",
                        margin: "5px 15px 5px 5px",
                        verticalAlign: "top",
                        fontSize: 0,
                      },
                      attrs: { src: params.row.thumbPicUrl },
                    }),
                  ]
                ),
                h("div", params.row.goodsName),
              ]
            );
          },
        },
        {
          title: "实付款",
          key: "actualPayment",
          minWidth: 170,
        },
        {
          title: "状态",
          key: "statusText",
          minWidth: 170,
        },
        {
          title: "手机号",
          key: "phone",
          minWidth: 170,
        },
        {
          title: "下单时间",
          key: "createDate",
          minWidth: 170,
          render: (h, params) => {
            return h(
              "div",
              this.$moment(params.row.createDate).format("YYYY-MM-DD HH:mm:ss")
            );
          },
        },
        {
          title: "更新时间",
          key: "updateDate",
          minWidth: 170,
          render: (h, params) => {
            return h(
              "div",
              this.$moment(params.row.updateDate).format("YYYY-MM-DD HH:mm:ss")
            );
          },
        },
        {
          title: "预约门店",
          key: "appointmentHospital",
          minWidth: 170,
        },
      ],
      data: [],
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,
    };
  },
  watch: {
    controlModal: {
      handler(controlModal) {
        if (!controlModal) return;
        this.control = controlModal;
        this.getTodayStatusChangeOrderList();
      },
    },
  },
  methods: {
    getTodayStatusChangeOrderList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const data = {
        employeeId: this.employeeId,
        keyword: this.keyword,
        statusCode: this.statusCode,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      api.getTodayStatusChangeOrderList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.order;
          this.data = list;
          this.totalCount = totalCount;
        }
      });
    },

    handlePageChange(pageNum) {
      const data = {
        employeeId: this.employeeId,
        keyword: this.keyword,
        statusCode: this.statusCode,
        pageNum,
        pageSize: this.pageSize,
      };
      api.getTodayStatusChangeOrderList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.order;
          this.data = list;
          this.totalCount = totalCount;
        }
      });
    },
    close(value) {
      if (value === false) {
        this.$emit("handleModalChange");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
