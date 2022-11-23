<!-- 订单信息 -->
<template>
  <div class="contentOrderList">
    <Table
      border
      :columns="orderDetailInfo.columns"
      :data="orderDetailInfo.data"
      height="185"
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
            title: "预约时间",
            key: "appointmentDate",
            minWidth: 200,
            render: (h, params) => {
              return h("div",params.row.appointmentDate == '未确认时间' ? '未确认时间':this.$moment(params.row.appointmentDate).format("YYYY-MM-DD"));
            },
          },
          {
            title: "预约门店",
            key: "appointmentHospitalName",
            width: 300,
          },
          {
            title: "项目",
            key: "goodsName",
            width: 200,
          },
          {
            title: "咨询内容",
            key: "consultingContent",
            width: 400,
          },
          {
            title: "所属平台",
            key: "contentPlatformName",
            minWidth: 200,
          },
          {
            title: "主播IP账号",
            key: "liveAnchorName",
            minWidth: 200,
          },
          {
            title: "状态",
            key: "orderStatusText",
            width: 200,
            render: (h, params) => {
              if(params.row.orderStatusText == '已成交'){
                return h('div',{
                  'style': {
                    'color': '#04B05D'
                  }
                },params.row.orderStatusText)
              }else if(params.row.orderStatusText == '医院重单'){
                return h('div',{
                  'style': {
                    'color': 'red'
                  }
                },params.row.orderStatusText)
              }else if(params.row.orderStatusText == '已派单'){
                return h('div',{
                  'style': {
                    'color': 'blue'
                  }
                },params.row.orderStatusText)
              } else if(params.row.orderStatusText == '未成交'){
                return h('div',{
                  'style': {
                    'color': 'orange'
                  }
                },params.row.orderStatusText)
              }else{
                return h('div',{
                  'style': {
                    'color': '#515a6e'
                  }
                },params.row.orderStatusText)
              }
            },
          },
          {
            title: "订单类型",
            key: "orderTypeText",
            width: 200,
          },
          {
            title: "定金金额",
            key: "depositAmount",
            width: 200,
          },
          {
            title: "成交金额",
            key: "dealAmount",
            width: 200,
          },
          {
            title: "未成交原因",
            key: "unDealReason",
            width: 200,
          },
          {
            title: "后期项目铺垫",
            key: "lateProjectStage",
            width: 400,
          },
          {
            title: "备注",
            key: "remark",
            width: 400,
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
      common.byContentOrderList(data).then((res) => {
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
      common.byContentOrderList(data).then((res) => {
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
.contentOrderList {
  height: 240px;
  overflow: auto;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
