<template>
  <div>
    <!-- 稽查业绩 -->
    <Card class="container">
      <div>
        <Table
          border
          :columns="query.columns"
          :data="query.data"
        ></Table>
      </div>
      <div class="end">
        <Page
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          show-total
          show-sizer
          :page-size-opts="[10, 20, 50, 100, 200]"
          @on-change="handlePageChange"
          @on-page-size-change="handlePageSizeChange"
        />
      </div>
      <Spin fix v-if="isLoading == true">
        <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
        <div>加载中...</div>
      </Spin>
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/customerServiceCheckPerformance";

export default {
  components: {},
  props: {
    detailParams: Object,
    activeName:String
  },
  data() {
    return {
      isLoading: false,
      // 查询
      query: {
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            type: "selection",
            key: "_checked",
            align: "center",
            minWidth: 80,
            fixed:'left'
          },
          {
            title: "成交编号",
            key: "dealInfoId",
            align: "center",
            minWidth: 170,
          },

          {
            title: "订单编号",
            key: "orderId",
            align: "center",
            minWidth: 170,
            tooltip: true,
          },
          {
            title: "订单来源",
            key: "orderFromText",
            align: "center",
            minWidth: 110,
            tooltip: true,
          },
          {
            title: "成交金额",
            key: "dealPrice",
            minWidth: 120,
            align: "center",
            tooltip: true,
          },
          {
            title: "成交单创建时间",
            key: "dealCreateDate",
            minWidth: 140,
            align: "center",
            tooltip:true,
            render: (h, params) => {
              return h(
                "div",
                params.row.dealCreateDate ? this.$moment(params.row.dealCreateDate).format("YYYY-MM-DD") : ''
              );
            },
          },
          {
            title: "业绩类型",
            key: "performanceTypeText",
            minWidth: 110,
            align: "center",
            tooltip: true,
          },
          {
            title: "归属客服",
            key: "belongEmpName",
            minWidth: 120,
            align: "center",
            tooltip: true,
          },
          {
            title: "稽查提点",
            key: "point",
            minWidth: 100,
            align: "center",
            tooltip: true,
            renderHeader: (h, { column }) => {
                return h('span', [
                //   column.title,
                    h('span', {
                    style: {
                        color: 'orange',
                    },
                    domProps: {
                        innerHTML: '稽查提点'
                    //   + ' *',
                    },
                    }),
                ]);
            },
            render: (h, params) => {
              return h(
                "div",
                params.row.point ? params.row.point + '%' : '0%'
              );
            },
          },
          
          {
            title: "稽查提成",
            key: "performanceCommisionCheck",
            minWidth: 140,
            align:'center',
            renderHeader: (h, { column }) => {
                return h('span', [
                //   column.title,
                    h('span', {
                    style: {
                        color: 'orange',
                    },
                    domProps: {
                        innerHTML: '稽查提成'
                    //   + ' *',
                    },
                    }),
                ]);
            },
          },
          {
            title: "稽查人员",
            key: "checkEmpName",
            minWidth: 140,
            align: "center",
            tooltip: true,
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 220,
            align: "center",
            tooltip: true,
          },
        ],
        data: [],
        totalCount: 0,
      },
      
    };
  },
  methods: {
  
    // 获取薪资审核表
    getListWithPageByCustomerInspectData() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });

      const {
        id,
        belongEmpId,
      } = this.detailParams;
      const data = {
        pageNum:this.query.pageNum,
        pageSize:this.query.pageSize,
        customerServiceCompensationId:id,
        valid:true,
        checkEmpId:belongEmpId,
        performanceTypeList:'3',
      };
      this.isLoading = true;
      api.getCustomerServiceCheckPerformance(data).then((res) => {
        if (res.code === 0) {
          const {
            list,
            totalCount,
          } = res.data.customerServiceCheckPerformance;
          this.isLoading = false;
          this.query.data = list;
          this.query.totalCount = totalCount;
          
        }
      });
    },

    // 获取录单申请列表分页
    handlePageChange(pageNum) {
      const {
        id,
        belongEmpId,
      } = this.detailParams;
      const data = {
        pageNum:pageNum,
        pageSize:this.query.pageSize,
        customerServiceCompensationId:id,
        valid:true,
        checkEmpId:belongEmpId,
        performanceTypeList:'3',
      };
      
      api.getCustomerServiceCheckPerformance(data).then((res) => {
        if (res.code === 0) {
          const {
            list,
            totalCount,
          } = res.data.customerServiceCheckPerformance;
          this.query.data = list;
          this.query.totalCount = totalCount;
         
        }
      });
    },
    handlePageSizeChange(pageSize) {
      this.query.pageSize = pageSize;
      this.getListWithPageByCustomerInspectData();
    },
  },
  created() {},
  watch: {
    activeName: {
      handler(value) {
        if (value == "auditPerformance") {
          this.getListWithPageByCustomerInspectData();
        }
      },
      deep: true,
    },
  },
};
</script>
<style lang="less" scoped>
.header_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container {
  margin-top: 16px;
}
// .page_wrap {
//   margin-top: 16px;
//   text-align: right;
// }
.page_wrap {
  text-align: right;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.bottom_title {
  font-size: 16px;
}
.bottom_right {
  margin-right: 20px;
}
.title_00 {
  color: #000;
}
.end {
  text-align: end;
  margin-top: 10px;
}
</style>
