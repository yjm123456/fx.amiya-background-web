<template>
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
</template>

<script>
import * as api from "@/api/customerManage";
export default {
  data() {
    return {
      encryptPhone: "",
      control: false,
      columns: [
        {
          title: "订单编号",
          key: "orderId",
          minWidth: 200,
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
          title: "规格",
          key: "standard",
          minWidth: 170,
        },
        {
          title: "实付款",
          key: "actualPayment",
          minWidth: 170,
        },
        {
          title: "电话",
          key: "phone",
          minWidth: 170,
        },
      ],
      data: [],
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,
    };
  },
  methods: {
    hospitalByEncryptPhoneGetSendHospitalOrders(encryptPhone) {
      this.encryptPhone = encryptPhone;
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const data = {
        encryptPhone: this.encryptPhone,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      api.hospitalByEncryptPhoneGetSendHospitalOrders(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.sendOrderInfo;
          this.data = list;
          this.totalCount = totalCount;
        }
      });
    },

    handlePageChange(pageNum) {
      const data = {
        encryptPhone: this.encryptPhone,
        pageNum,
        pageSize: this.pageSize,
      };
      api.hospitalByEncryptPhoneGetSendHospitalOrders(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.sendOrderInfo;
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
