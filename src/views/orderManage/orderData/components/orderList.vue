<template>
  <div class="wrap">
    <div>
      <Table :columns="columns" :data="order" border :height="560"></Table>
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
</template>
<script>
import * as api from "@/api/orderManage";
export default {
  props: {
    employeeId: Number,
    keyword: String,
    statusCode: String,
  },
  data() {
    return {
      columns: [
        {
          title: "订单编号",
          key: "id",
          minWidth: 160,
        },
        {
          title: "下单平台",
          key: "appTypeText",
          minWidth: 160,
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
          minWidth: 160,
        },
        {
          title: "状态",
          key: "statusText",
          minWidth: 160,
        },
        {
          title: "手机号",
          key: "phone",
          minWidth: 160,
        },
      ],
      order: [],
      pageNum: 1,
      pageSize: 7,
      totalCount: 0,
    };
  },
  methods: {
    // 根据员工编号获取订单列表
    byEmployeeIdGetOrderList() {
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
      api.byEmployeeIdGetOrderList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.order;
          this.order = list;
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
      api.byEmployeeIdGetOrderList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.order;
          this.order = list;
          this.totalCount = totalCount;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.wrap {
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
