<template>
  <div>
    <Modal
      v-model="control"
      title="详情"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="80%"
    >
      <Card class="container">
        <div>
          <Table border :columns="query.columns" :data="query.data" ></Table>
        </div>
        <div class="page_wrap">
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
      <div slot="footer" class="footer">
        <Button @click="cancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/reconciliationDocumentsSettle";


export default {
    props:{
        id:String,
        detailModal:Boolean
    },
   data(){
    return{
        query: {
        keyWord: "",
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        chooseHospitalId:-1,
        isOldCustoemr:-1,
        belongEmpId:-1,
        checkState:2,
        pageNum: 1,
        pageSize: 10,
        columns: [
          
          {
            title: "对账单编号",
            key: "recommandDocumentId",
            align: "center",
            minWidth: 180,
          },
          
          {
            title: "医院",
            key: "hospitalName",
            align: "center",
            minWidth: 180,
            tooltip:true
          },
          {
            title: "来源",
            key: "orderFromText",
            minWidth: 120,
            align: "center",
            tooltip:true
          },
          {
            title: "订单号",
            key: "orderId",
            minWidth: 180,
            align: "center",
          },
          {
            title: "成交编号",
            key: "dealInfoId",
            minWidth: 180,
            align: "center",
          },
          {
            title: "成交时间",
            key: "dealDate",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.dealDate
                  ? this.$moment(params.row.dealDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          {
            title: "订单金额",
            key: "orderPrice",
            minWidth: 100,
            align: "center",
          },
          {
            title: "对账金额",
            key: "returnBackPrice",
            minWidth: 160,
            align: "center",
          },
          {
            title: "审核客服业绩金额",
            key: "customerServiceSettlePrice",
            minWidth: 180,
            align: "center",
          },
          {
            title: "归属主播",
            key: "belongLiveAnchor",
            minWidth: 150,
            align: "center",
            tooltip:true
          },
          {
            title: "归属客服",
            key: "belongEmpName",
            minWidth: 120,
            align: "center",
            tooltip:true
          },
          
          {
            title: "新/老客业绩",
            key: "isOldCustomerText",
            minWidth: 140,
            align: "center",
          },
          {
            title: "审核状态",
            key: "compensationCheckStateText",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              if (params.row.compensationCheckStateText == "审核通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.compensationCheckStateText
                );
              } else if (params.row.compensationCheckStateText == "未审核") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.compensationCheckStateText
                );
              } else if (params.row.compensationCheckStateText == "审核不通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.compensationCheckStateText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.compensationCheckStateText
                );
              }
            },
          },
          {
            title: "薪资单状态",
            key: "customerServiceCompensationId",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.customerServiceCompensationId
                  ? '已生成薪资单'
                  : "未生成薪资单"
              );
            },
          },
          {
            title: "最终归属客服",
            key: "checkBelongEmpName",
            minWidth: 140,
            align: "center",
            tooltip:true
          },
          {
            title: "审核备注",
            key: "checkRemark",
            minWidth: 150,
            align: "center",
          },
          {
            title: "审核时间",
            key: "checkDate",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.checkDate
                  ? this.$moment(params.row.checkDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          
        ],
        data: [],
        totalCount: 0,

      },
      control:false
    }
   },
   methods:{
    // 详情
    getDetail() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord:this.id,
      };
      api.getListWithPageByCustomerCompensation(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.reconciliationDocumentsSettleInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取详情分页
    handlePageChange(pageNum) {
      const {
        pageSize,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord:this.id,
      };
      api.getListWithPageByCustomerCompensation(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.reconciliationDocumentsSettleInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.$emit("update:detailModal", false);
      }
    },
    cancel(value) {
        this.$emit("update:detailModal", false);
    },
    handlePageSizeChange(pageSize) {
      this.query.pageSize = pageSize;
      this.getDetail();
    },
   },
   watch:{
    detailModal(value){
        this.control = value
    }
   }
}
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
