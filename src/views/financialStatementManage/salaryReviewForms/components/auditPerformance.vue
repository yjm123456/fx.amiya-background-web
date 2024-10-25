<template>
  <div>
    <!-- 稽查业绩 -->
    <Card class="container">
      <div>
        <Table
          border
          :columns="query.columns"
          :data="query.data"
          @on-select="handleSelect"
          @on-select-cancel="handleCancels"
          @on-select-all="handleSelectAll"
          @on-select-all-cancel="handleSelectAll"
          height="537"
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
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/customerServiceCheckPerformance";

export default {
  components: {},
  props: {
    filterCriteria: Object,
  },
  data() {
    return {
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
            minWidth: 140,
            align: "center",
            tooltip: true,
          },
          {
            title: "稽查提点",
            key: "point",
            minWidth: 120,
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
      // 审核客服业绩金额
      returnBackPrice: 0,
      // 生成薪资参数
      generateSalaryParams: {
        generateSalaryList: new Set(),
        //
        returnBackPrice: 0,
      },
      // 生成薪资model
      generateSalaryModel: false,
      isGenerateSalryList: [
        {
          id: 1,
          name: "未生成薪资单",
        },
        {
          id: 2,
          name: "已生成薪资单",
        },
      ],
    };
  },
  methods: {
    handleSelect(selection, row) {
      // 生成薪资单
      this.generateSalaryParams.generateSalaryList = selection;
    },
    handleCancels(selection, row) {
      // 生成薪资单
      this.generateSalaryParams.generateSalaryList = selection;
    },

    handleSelectAll(selection) {
      if (selection && selection.length === 0) {
        // 生成薪资单
        this.generateSalaryParams.generateSalaryList = [];
      } else {
        this.generateSalaryParams.generateSalaryList = selection;
        selection.forEach((item) => {

        });
      }
    },
    // 获取薪资审核表
    getListWithPageByCustomerInspectData() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });

      const {
        belongEmpId,
        performanceTypeList,
        keyWord,
        startDate,
        endDate,
        valid
      } = this.filterCriteria;
      const data = {
        pageNum:this.query.pageNum,
        pageSize:this.query.pageSize,
        keyWord,
        startDate: startDate ? this.$moment(new Date(startDate)).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(new Date(endDate)).format("YYYY-MM-DD") : null,
        valid,
        checkEmpId:belongEmpId == -1 ? null : belongEmpId,
        performanceTypeList:3,
      };
      api.getCustomerServiceCheckPerformance(data).then((res) => {
        if (res.code === 0) {
          this.generateSalaryParams.generateSalaryList = [];
          const {
            list,
            totalCount,
          } = res.data.customerServiceCheckPerformance;
          this.query.data = list;
          this.query.totalCount = totalCount;
          // 防止勾选了在进行调用接口时 数值没有清0
          // 提成金额合计
          this.commissionPrice = 0;
          // 审核客服业绩合计
          this.checkedPrice = 0;
          // 稽查业绩合计
          this.inspectPrice = 0;
        }
      });
    },

    // 获取录单申请列表分页
    handlePageChange(pageNum) {
      const {
        belongEmpId,
        performanceTypeList,
        keyWord,
        startDate,
        endDate,
        valid
      } = this.filterCriteria;
      const data = {
        pageNum:pageNum,
        pageSize:this.query.pageSize,
        keyWord,
        startDate: startDate
          ? this.$moment(new Date(startDate)).format("YYYY-MM-DD")
          : null,
        endDate: endDate
          ? this.$moment(new Date(endDate)).format("YYYY-MM-DD")
          : null,
        valid,
        checkEmpId:belongEmpId == -1 ? null : belongEmpId,
        performanceTypeList:3,
      };
      
      api.getCustomerServiceCheckPerformance(data).then((res) => {
        if (res.code === 0) {
          const {
            list,
            totalCount,
          } = res.data.customerServiceCheckPerformance;
          this.query.data = list;
          this.query.totalCount = totalCount;
          // 提成金额合计
          this.commissionPrice = 0;
          // 审核客服业绩合计
          this.checkedPrice = 0;
          // 稽查业绩合计
          this.inspectPrice = 0;
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
