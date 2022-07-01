<!-- 已经领取礼品列表 -->
<template>
  <div class="alreadyReceiveGift">
    <Table
      border
      :columns="alreadyReceiveGift.columns"
      :data="alreadyReceiveGift.data"
    ></Table>
    <div class="page_wrap">
      <Page
        ref="pages"
        :current="alreadyReceiveGift.pageNum"
        :page-size="alreadyReceiveGift.pageSize"
        :total="alreadyReceiveGift.totalCount"
        show-total
        show-elevator
        @on-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import * as common from "@/api/common";
export default {
  data() {
    return {
      alreadyReceiveGift: {
        columns: [
          {
            title: "缩略图",
            key: "thumbPicUrl",
            align: "center",
            width: 100,
            render: (h, params) => {
              return h("viewer", {}, [
                h("img", {
                  style: {
                    width: "50px",
                    height: "50px",
                    margin: "5px 0",
                    verticalAlign: "middle",
                  },
                  attrs: {
                    src: params.row.thumbPicUrl,
                  },
                }),
              ]);
            },
          },
          {
            title: "礼品名称",
            key: "giftName",
            width: 200,
          },
          {
            title: "收货人手机号",
            key: "receivePhone",
            width: 200,
          },
          {
            title: "领取时间",
            key: "date",
            width: 200,
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.date).format("YYYY-MM-DD HH:mm:ss")
              );
            },
          },
          {
            title: "是否已发货",
            key: "isSendGoods",
            width: 200,
            render: (h, params) => {
              if (params.row.isSendGoods === true) {
                return h("Icon", {
                  props: {
                    type: "md-checkmark",
                  },
                  style: {
                    fontSize: "18px",
                    color: "#559DF9",
                  },
                });
              } else {
                return h("Icon", {
                  props: {
                    type: "md-close",
                  },
                  style: {
                    fontSize: "18px",
                    color: "red",
                  },
                });
              }
            },
          },
          {
            title: "快递单号",
            key: "courierNumber",
            width: 200,
          },
          {
            title: "发货时间",
            key: "sendGoodsDate",
            width: 200,
            render: (h, params) => {
              return h(
                "div",
                params.row.sendGoodsDate
                  ? this.$moment(params.row.sendGoodsDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : params.row.sendGoodsDate
              );
            },
          },
          {
            title: "绑定订单号",
            key: "orderId",
            width: 200,
          },
        ],
        data: [],
        encryptPhone: "",
        pageNum: 1,
        pageSize: 8,
        totalCount: 0,
      },
    };
  },
  methods: {
    // 根据手机号加密文本获取领取礼品列表
    byEncryptPhoneGetUserAlreadyReceiveGift(encryptPhone) {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      this.alreadyReceiveGift.encryptPhone = encryptPhone;
      const { pageNum, pageSize } = this.alreadyReceiveGift;
      const data = {
        encryptPhone,
        pageNum,
        pageSize,
      };
      common.byEncryptPhoneGetUserAlreadyReceiveGift(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.receiveGift;
          this.alreadyReceiveGift.data = list;
          this.alreadyReceiveGift.totalCount = totalCount;
        }
      });
    },

    // 根据手机号加密文本获取领取礼品列表（分页）
    handlePageChange(pageNum) {
      const { encryptPhone, pageSize } = this.alreadyReceiveGift;
      const data = { encryptPhone, pageNum, pageSize };
      common.byEncryptPhoneGetUserAlreadyReceiveGift(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.receiveGift;
          this.alreadyReceiveGift.data = list;
          this.alreadyReceiveGift.totalCount = totalCount;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.alreadyReceiveGift {
  height: 500px;
  overflow: auto;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
