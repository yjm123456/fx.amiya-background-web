<!-- 订单 -->
<template>
  <div>
    <Card :dis-hover="true">
      <Input
        v-model="query.id"
        style="width:200px;"
        placeholder="请输入订单号"
        @keyup.enter.native="byIdGetOrderInfo()"
      />
      <Button
        type="primary"
        style="margin-left: 10px"
        @click="byIdGetOrderInfo()"
        >查询</Button
      >
    </Card>
    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data"></Table>
      </div>
    </Card>
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
export default {
  data() {
    return {
      query: {
        columns: [
          {
            title: "订单编号",
            key: "id",
            minWidth: 200,
          },
          {
            title: "下单平台",
            key: "appTypeText",
            minWidth: 160,
          },
          {
            title: "商品编号",
            key: "goodsId",
            minWidth: 200,
          },
          {
            title: "商品",
            key: "thumbPicUrl",
            minWidth: 400,
            render: (h, params) => {
              return h(
                "viewer",
                {
                  props: {
                    zoomable: false,
                  },
                  style: {
                    display: "flex",
                  },
                },
                [
                  h("img", {
                    style: {
                      width: "50px",
                      height: "50px",
                      margin: "5px 15px 5px 5px",
                      verticalAlign: "middle",
                    },
                    attrs: {
                      src: params.row.thumbPicUrl,
                    },
                  }),
                  h("div", params.row.goodsName),
                ]
              );
            },
          },
          {
            title: "实付款",
            key: "actualPayment",
            minWidth: 200,
          },
          {
            title: "状态",
            key: "statusText",
            minWidth: 200,
          },
          {
            title: "手机号",
            key: "phone",
            minWidth: 200,
          },
          {
            title: "操作",
            key: "",
            width: 150,
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "退款提示",
                          content: "确定修改该订单状态为退款吗？",
                          onOk: () => {
                            const { id } = params.row;
                            api.editJDRefundSuccessOrder(id).then((res) => {
                              if (res.code === 0) {
                                this.$Message.success({
                                  content: "提交成功",
                                  duration: 3,
                                });
                                this.byIdGetOrderInfo();
                              }
                            });
                          },
                        });
                      },
                    },
                  },
                  "退款"
                ),
              ]);
            },
          },
        ],
        data: [],
        id: "",
      },
    };
  },
  methods: {
    // 根据订单编号获取订单信息
    byIdGetOrderInfo() {
      const { id } = this.query;
      if (!id) {
        this.$Message["warning"]({
          background: true,
          content: "请输入订单编号",
          duration: 5,
        });
        return;
      }
      api.byIdGetOrderInfo(id).then((res) => {
        if (res.code === 0) {
          this.query.data = [res.data.order];
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 16px;
}
</style>
