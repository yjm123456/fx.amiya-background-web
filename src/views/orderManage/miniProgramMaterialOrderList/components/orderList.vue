<template>
  <div>
    <Modal
      v-model="control"
      title="订单列表"
      :mask-closable="false"
      width="80%"
      footer-hide
      @on-visible-change="handleModalVisibleChange"
    >
      <div>
        <Table border :columns="columns" :data="orders"></Table>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
export default {
  props: {
    controlModal: Boolean,
    tradeId: String,
  },
  data() {
    return {
      control: false,

      orders: [],

      columns: [
        {
          title: "订单编号",
          key: "id",
        },
        {
          title: "商品",
          key: "thumbPicUrl",
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
          title: "订单类型",
          key: "orderTypeText",
        },
        {
          title: "购买数量",
          key: "quantity",
        },
        {
          title: "实付积分",
          key: "integrationQuantity",
        },
        {
          title: "交易类型",
          key: "exchangeTypeText",
        },
      ],
    };
  },
  methods: {
    byTradeIdGetOrderList() {
      api.byTradeIdGetOrderList(this.tradeId).then((res) => {
        if (res.code === 0) {
          this.orders = res.data.orders;
        }
      });
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.$emit("update:controlModal", false);
      }
    },
  },
  watch: {
    controlModal(value) {
      this.byTradeIdGetOrderList();
      this.control = value;
    },
  },
};
</script>