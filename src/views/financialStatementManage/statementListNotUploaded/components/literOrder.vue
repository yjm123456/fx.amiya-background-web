<template>
  <div>
    <Card class="container">
      <div class="content">
        <div class="left">
          <div>
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
import * as api from "@/api/customerManage.js";
export default {
  components: {},
  props: {
    timeParams: Object,
  },
  data() {
    return {
      positionId:sessionStorage.getItem('positionId'),
      // 查询
      query: {
        // 升单开始时间
        consumeStartDate:'',
        // 升单结束时间
        consumeEndDate:'',
        // 是否确认升单
        isConfirmOrder:-1,
        liveAnchorId:null,
        // 升单渠道
        channel:null,
        checkStateListAll:[{id:-1,name:'全部审核状态'}],
        // 审核状态
        checkState:-1,
        // 跟进人员
        addedBy:-1,
        employee: [{ name: "全部客服", id: -1 },{ name: "医院添加", id: 0 }],
        // 升单类型
        buyAgainType:'',
        // modal title
        startDate: '',
        endDate: '',
        // 关键字
        keyword: "",
        // 医院编号
        hospitalId: -1,
        // 医院列表
        hospitalInfo: [{ name: "全部医院", id: -1 }],
        // 消费类型
        consumeType: "",
        // 消费类型列表
        consumeTypeList: [
          {
            name: "全部消费",
            value: -1,
          },
          {
            name: "当天其他消费",
            value: 0,
          },
          {
            name: "再消费",
            value: 1,
          },
        ],
        pageNum: 1,
        pageSize: 10,
        columns: [
            {
            type: "selection",
            key: "_checked",
            align: "center",
            minWidth: 60,
          },
          {
            title: "升单订单号",
            key: "consumeId",
            minWidth: 200,
            align:'center'
          },
          {
            title: "客户电话",
            key: "phone",
            minWidth: 130,
            align:'center'
          },
          {
            title: "升单时间",
            key: "buyAgainTime",
            minWidth: 160,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.buyAgainTime ? this.$moment(params.row.buyAgainTime).format(
                  "YYYY-MM-DD"
                ):""
              );
            },
          },
          {
            title: "升单金额",
            key: "price",
            minWidth: 120,
            align:'center'
          },
          {
            title: "升单医院",
            key: "hospitalName",
            minWidth: 220,
            align:'center'
          },
        ],
        data: [],
        totalCount: 0,
        rightData:[],
        rightColumns:[
          {
            title: "升单订单号",
            key: "consumeId",
            minWidth: 200,
            align:'center'
          },
          {
            title: "客户电话",
            key: "phone",
            minWidth: 130,
            align:'center'
          },
          {
            title: "升单时间",
            key: "buyAgainTime",
            minWidth: 160,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.buyAgainTime ? this.$moment(params.row.buyAgainTime).format(
                  "YYYY-MM-DD"
                ):""
              );
            },
          },
          {
            title: "升单金额",
            key: "price",
            minWidth: 120,
            align:'center'
          },
          {
            title: "升单医院",
            key: "hospitalName",
            minWidth: 220,
            align:'center'
          },
        ],
      },
    };
  },
  methods: {
    handlePageSizeChange(pageSize) {
      this.query.rightData = [];
      this.query.pageSize = pageSize;
      this.getContentPlatFormOrderDealInfo();
    },
    handleSelect(selection, row) {
      this.query.rightData.push(row);
    },
    handleCancels(selection, row) {
      this.query.rightData.map((item, index) => {
        if (item.id == row.id) {
          this.query.rightData.splice(index, 1);
        }
      });
    },
    handleSelectAll(selection) {
      if (selection && selection.length === 0) {
        this.query.rightData = [];
      } else {
        this.query.rightData = selection;
      }
    },
    // 获取医院推荐列表
    getCustomerHospitalConsume() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        startDate,
        endDate,
        keyword,
        hospitalId,
        consumeType,
        pageNum,
        pageSize,
        addedBy,
        buyAgainType,
        checkState,
        channel,
        liveAnchorId,
        isConfirmOrder,
        consumeStartDate,
        consumeEndDate
      } = this.query;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        keyword:this.timeParams.assemblyKeyword,
        hospitalId: this.timeParams.assemblyHospitalId === -1 ? null : this.timeParams.assemblyHospitalId,
        consumeType: consumeType === -1 ? null : consumeType,
        pageNum,
        pageSize,
        addedBy,
        buyAgainType,
        checkState: this.timeParams.assemblyChecked,
        channel,
        liveAnchorId,
        isConfirmOrder:this.timeParams.startDate && this.timeParams.endDate ? true : null,
        consumeStartDate:isConfirmOrder ?   this.$moment(this.timeParams.startDate).format("YYYY-MM-DD"): null,
        consumeEndDate:isConfirmOrder ?  this.$moment(this.timeParams.endDate).format("YYYY-MM-DD") : null,
        dataFrom:this.positionId == '13' ? true : false
      };
      if(!this.timeParams.startDate || !this.timeParams.endDate){
        this.$Message.warning('请选择时间')
        return
      }
      api.getCustomerHospitalConsume(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customerHospitalConsumes;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取医院推荐列表分页
    handlePageChange(pageNum) {
      const {
        startDate,
        endDate,
        keyword,
        hospitalId,
        consumeType,
        pageSize,
        addedBy,
        buyAgainType,
        checkState,
        channel,
        liveAnchorId,
        isConfirmOrder,
        consumeStartDate,
        consumeEndDate
      } = this.query;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        keyword:this.timeParams.assemblyKeyword,
        hospitalId: this.timeParams.assemblyHospitalId === -1 ? null : this.timeParams.assemblyHospitalId,
        consumeType: consumeType === -1 ? null : consumeType,
        pageNum,
        pageSize,
        addedBy,
        buyAgainType,
        checkState: this.timeParams.assemblyChecked,
        channel,
        liveAnchorId,
        isConfirmOrder:this.timeParams.startDate && this.timeParams.endDate ? true : null,
        consumeStartDate:isConfirmOrder ?   this.$moment(this.timeParams.startDate).format("YYYY-MM-DD"): null,
        consumeEndDate:isConfirmOrder ?  this.$moment(this.timeParams.endDate).format("YYYY-MM-DD") : null,
        dataFrom:this.positionId == '13' ? true : false
      };
      api.getCustomerHospitalConsume(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customerHospitalConsumes;
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
.content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.left,
.right {
  width: 49.5%;
}
</style>
