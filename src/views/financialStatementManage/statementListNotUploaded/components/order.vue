<template>
  <div>
    <Card class="container">
      <div class="content">
        <div class="left">
            <div>
              <div class="title">未对账订单</div>
              <Table
                border
                :columns="query.columns"
                :data="query.data"
                @on-select="handleSelect"
                @on-select-cancel="handleCancels"
                @on-select-all="handleSelectAll"
                @on-select-all-cancel="handleSelectAll"
              ></Table>
            </div>
            <div class="page_wrap">
              <Page
                ref="pages"
                :current="query.pageNum"
                :page-size="query.pageSize"
                :total="query.totalCount"
                show-total
                show-sizer
                :page-size-opts="[10, 20, 50, 100, 200, 500]"
                @on-change="handlePageChange"
                @on-page-size-change="handlePageSizeChange"
                transfer
              />
            </div>
        </div>
        <div class="right">
          <div class="title">已选中订单</div>
          <Table
                border
                :columns="query.rightColumns"
                :data="query.rightData"
                
              ></Table>
        </div>
      </div>
      
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
export default {
  components: {},
  props: {
    timeParams: Object,
  },
  data() {
    return {
      query: {
        checkState: -1,
        ReturnBackPriceState: "-1",
        ReturnBackPriceStateList: [
          {
            status: "-1",
            name: "全部回款状态",
          },
          {
            status: "true",
            name: "已回款",
          },
          {
            status: "false",
            name: "未回款",
          },
        ],
        orderAppTypes: [{ orderType: -1, appTypeText: "全部平台" }],
        writeOffStartDate: "",
        writeOffEndDate: "",
        keyword: "",
        appType: null,
        orderNature: null,
        pageNum: 1,
        pageSize: 10,
        showDirection: 1,
        columns: [
          {
            type: "selection",
            key: "_checked",
            align: "center",
            minWidth: 60,
          },
          {
            title: "成交编号",
            key: "id",
            minWidth: 190,
            align: "center",
          },
          {
            title: "客户电话",
            key: "phone",
            minWidth: 120,
            align: "center",
          },
          {
            title: "成交时间",
            key: "writeOffDate",
            minWidth: 170,
            align: "center",
            render: (h, params) => {
              return params.row.writeOffDate
                ? h(
                    "div",
                    this.$moment(params.row.writeOffDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  )
                : "";
            },
          },
          {
            title: "成交金额",
            key: "actualPayment",
            minWidth: 100,
            align: "center",
          },
          {
            title: "成交医院",
            key: "finalConsumptionHospital",
            minWidth: 200,
            align: "center",
          },
        ],
        rightColumns: [
          {
            title: "成交编号",
            key: "id",
            minWidth: 190,
            align: "center",
          },
          {
            title: "客户电话",
            key: "phone",
            minWidth: 120,
            align: "center",
          },
          {
            title: "成交时间",
            key: "writeOffDate",
            minWidth: 170,
            align: "center",
            render: (h, params) => {
              return params.row.writeOffDate
                ? h(
                    "div",
                    this.$moment(params.row.writeOffDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  )
                : "";
            },
          },
          {
            title: "成交金额",
            key: "actualPayment",
            minWidth: 100,
            align: "center",
          },
          {
            title: "成交医院",
            key: "finalConsumptionHospital",
            minWidth: 200,
            align: "center",
          },
        ],
        data: [],
        totalCount: 0,
        rightData:[]
      },
    };
  },
  methods: {
    handleSelect(selection, row) {
      this.query.rightData.push(row)
    },
    handleCancels(selection, row) {
      this.query.rightData.map((item,index)=>{
        if(item.id == row.id){
          this.query.rightData.splice(index,1)
        }
      })
    },
    handleSelectAll(selection) {
      if (selection && selection.length === 0) {
         this.query.rightData = []
      } else {
        this.query.rightData = selection
      }
    },
    // 分页切换条数
    handlePageSizeChange(pageSize) {
      this.query.rightData = []
      this.query.pageSize = pageSize;
      this.gettmallOrderFinishLlistWithPage();
    },
    // 获取下单平台已成交列表
    gettmallOrderFinishLlistWithPage() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        keyword,
        writeOffStartDate,
        writeOffEndDate,
        appType,
        orderNature,
        checkState,
        ReturnBackPriceState,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword:this.timeParams.assemblyKeyword,
        writeOffStartDate: this.timeParams.startDate
          ? this.$moment(this.timeParams.startDate).format("YYYY-MM-DD")
          : "",
        writeOffEndDate: this.timeParams.endDate
          ? this.$moment(this.timeParams.endDate).format("YYYY-MM-DD")
          : "",
        appType,
        orderNature,
        checkState: checkState == -1 ? null : checkState,
        ReturnBackPriceState:
          ReturnBackPriceState == "-1" ? null : ReturnBackPriceState,
      };
      api.tmallOrderFinishLlistWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.order;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取下单平台已成交列表分页
    handlePageChange(pageNum) {
      const {
        pageSize,
        keyword,
        writeOffStartDate,
        writeOffEndDate,
        appType,
        orderNature,
        checkState,
        ReturnBackPriceState,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword:this.timeParams.assemblyKeyword,
        writeOffStartDate: this.timeParams.startDate
          ? this.$moment(this.timeParams.startDate).format("YYYY-MM-DD")
          : "",
        writeOffEndDate: this.timeParams.endDate
          ? this.$moment(this.timeParams.endDate).format("YYYY-MM-DD")
          : "",
        appType,
        orderNature,
        checkState: checkState == -1 ? null : checkState,
        ReturnBackPriceState:
          ReturnBackPriceState == "-1" ? null : ReturnBackPriceState,
      };
      api.tmallOrderFinishLlistWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.order;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
  },
};
</script>
<style scoped>
.page_wrap {
  text-align: right;
  margin-top: 10px;
}
.content{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.left,.right{
  width: 49.5%;
}
.title{
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #000;
}
</style>
