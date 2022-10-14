<template>
  <div>
    <Card :dis-hover="true">
      <div>
        <Table border :columns="query.columns" :data="query.data" ref="table"></Table>
      </div>
      <div class="page_wrap">
        <Page
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          show-total
          show-elevator
          @on-change="handlePageChange"
        />
      </div>
      <!-- 查看详情 -->
    <fillInIndicators :controlModal.sync="controlModal" :indicatorsId="indicatorsId" :hospitalId="hospitalId" :detailTitle="detailTitle"></fillInIndicators>
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/GreatHospitalOperationHealth";
import fillInIndicators from "@/components/indicatorModule/fillInIndicators.vue";

export default {
  components:{
    fillInIndicators
  },
  props:{
    activeName:String
  },
  data() {
    return {
      // 查询
      query: {
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "指标名称",
            key: "indicatorName",
          },
          {
            title: "描述",
            key: "describe",
          },
          {
            title: "开始时间",
            key: "startDate",
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.startDate).format(
                  "YYYY-MM-DD"
                )
              );
            },
          },
          {
            title: "结束时间",
            key: "endDate",
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.endDate).format(
                  "YYYY-MM-DD"
                )
              );
            },
          },
          {
            title: "是否批注",
            key: "isRemark",
            align: "center",
            width:100,
            render: (h, params) => {
              if (params.row.isRemark == true) {
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
            title: "操作",
            key: "",
            width: 150,
            align:'center',
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { indicatorId,hospitalId } = params.row;
                        this.controlModal = true
                        this.indicatorsId = indicatorId
                        this.hospitalId = hospitalId
                        this.detailTitle = '查看详情'
                      },
                    },
                  },
                  "查看详情"
                ),
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },
      controlModal:false,
      indicatorsId:'',
      hospitalId:null,
      detailTitle:''
    };
  },
  methods: {
     // 获取未提报数据列表
    HospitalIndicatorFill() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize} = this.query;
      const data = { pageNum, pageSize,submit:true };
      api.HospitalIndicatorFill(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.hospitalIndicatorFillData;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取未提报数据列表分页
    handlePageChange(pageNum) {
        const {  pageSize} = this.query;
        const data = { pageNum, pageSize ,submit:true};
        api.HospitalIndicatorFill(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.hospitalIndicatorFillData;
            this.query.data = list;
            this.query.totalCount = totalCount;
            }
        });
    },
  },
  created() {
  },
  watch:{
    activeName: {
      handler(value) {
          if (value === "reportedIndicators") {
              this.HospitalIndicatorFill()
          }
      },
      immediate: true,
      },
    }
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
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
