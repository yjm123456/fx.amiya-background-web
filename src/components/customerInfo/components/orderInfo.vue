<!-- 订单信息 -->
<template>
  <div class="orderInfo">
    <Table
      border
      :columns="orderDetailInfo.columns"
      :data="orderDetailInfo.data"
    ></Table>
    <div class="page_wrap">
      <Page
        ref="pages"
        :current="orderDetailInfo.pageNum"
        :page-size="orderDetailInfo.pageSize"
        :total="orderDetailInfo.totalCount"
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
      orderDetailInfo: {
        columns: [
          {
            title: "订单号",
            key: "id",
            width: 200,
          },
          {
            title: "下单平台",
            key: "appTypeText",
            minWidth: 200,
          },
          {
            title: "商品名称",
            key: "goodsName",
            width: 300,
          },
          {
            title: "实付款",
            key: "actualPayment",
            width: 200,
          },
          {
            title: "状态",
            key: "statusText",
            width: 200,
          },
          {
            title: "手机号",
            key: "phone",
            width: 200,
          },
          {
            title: "预约门店",
            key: "appointmentHospital",
            width: 300,
          },
          {
            title: "是否预约",
            key: "isAppointment",
            width: 200,
            render: (h, params) => {
              if (params.row.isAppointment === true) {
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
    // 根据客户编号获取订单列表
    byCustomerIdGetOrderList(encryptPhone) {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      this.orderDetailInfo.encryptPhone = encryptPhone;
      const { pageNum, pageSize } = this.orderDetailInfo;
      const data = {
        encryptPhone,
        pageNum,
        pageSize,
      };
      common.byEncryptPhoneGetOrderList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.order;
          this.orderDetailInfo.data = list;
          this.orderDetailInfo.totalCount = totalCount;
        }
      });
    },

    handlePageChange(pageNum) {
      const { encryptPhone, pageSize } = this.orderDetailInfo;
      const data = { encryptPhone, pageNum, pageSize };
      common.byEncryptPhoneGetOrderList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.order;
          this.orderDetailInfo.data = list;
          this.orderDetailInfo.totalCount = totalCount;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.orderInfo {
  height: 500px;
  overflow: auto;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
