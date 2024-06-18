<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyWord"
            placeholder="请输入关键字"
            style="width: 160px; "
            @keyup.enter.native="getListWithPageByCustomerCompensation()"
          />
          <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 120px;margin-left: .625rem"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束日期"
            style="width: 120px; margin-left: .625rem"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <Select
            v-model="query.belongEmpId"
            placeholder="请选择归属客服"
            filterable
            style="width: 140px;margin-left:10px"
          >
            <Option
              v-for="item in params.employeePositionAdmin"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.chooseHospitalId"
            placeholder="请选择医院"
            filterable
            style="width: 140px;margin-left:10px"
          >
            <Option
              v-for="item in params.hospitallist"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.isOldCustoemr"
            placeholder="请选择业绩"
            filterable
            style="width: 120px;margin-left:10px"
          >
            <Option
              v-for="item in params.isOldCustoemrList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select> 
          <Select
            v-model="query.createEmpId"
            placeholder="请选择上传人"
            filterable
            style="width: 140px;margin-left:10px"
          >
            <Option
              v-for="item in params.creteEmpNameList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select> 
          <Select
            v-model="query.isGenerateSalry"
            placeholder="请选择生成薪资状态"
            filterable
            style="width: 120px;margin-left:10px"
          >
            <Option
              v-for="item in isGenerateSalryList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select> 
          <!-- <Select
            v-model="query.checkState"
            placeholder="请选择审核状态"
            filterable
            style="width: 150px;margin-left:10px"
          >
            <Option
              v-for="item in params.checkStateListAll"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select> -->
          <Select
            v-model="query.orderFrom"
            placeholder="请选择平台"
            filterable
            style="width: 120px;margin-left:10px"
          >
            <Option
              v-for="item in params.contentPalteForms"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.addOrderPrice"
            placeholder="请选择金额"
            filterable
            style="width: 140px;margin-left:10px"
          >
            <Option
              v-for="item in params.addOrderPriceList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getListWithPageByCustomerCompensation()"
            >查询</Button
          >
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="invoiceClick()"
            >生成薪资</Button
          >
        </div>
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data" @on-select="handleSelect"
          @on-select-cancel="handleCancels"
          @on-select-all="handleSelectAll"
          @on-select-all-cancel="handleSelectAll"></Table>
      </div>
      <div class="page_wrap">
        <div class="bottom_title">
          <span class="bottom_right">
            <span class="title_00">合计提成金额：</span> 
            <span style="color:red;font-weight:bold">{{
              commissionPrice == 0 ? 0 : commissionPrice.toFixed(2)
            }}</span></span
          >
          <span class="bottom_right">
            <span  class="title_00">合计审核客服业绩：</span>
            <span style="color:red;font-weight:bold">{{
              checkedPrice == 0 ? 0 : checkedPrice.toFixed(2)
            }}</span></span
          >
        </div>
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
    <!-- 生成薪资 -->
    <generateSalary :generateSalaryModel.sync="generateSalaryModel" :generateSalaryParams="generateSalaryParams" :params="params" @getListWithPageByCustomerCompensation="getListWithPageByCustomerCompensation"/>
  </div>
</template>
<script>
import * as api from "@/api/reconciliationDocumentsSettle";
import generateSalary from "../components/generateSalary.vue";

export default {
  components: {
    generateSalary
  },
  props: {
    activeName: String,
    params: Object,
  },
  data() {
    return {
      // 查询
      query: {
        orderFrom:0,
        addOrderPrice:-1,
        isGenerateSalry:1,
        keyWord: "",
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        chooseHospitalId:-1,
        isOldCustoemr:-1,
        belongEmpId:-1,
        checkState:2,
        createEmpId:-1,
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            type: "selection",
            key: "_checked",
            align: "center",
            minWidth: 60,
            fixed:'left'
          },
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
            title: "下单金额",
            key: "contentPlatFormOrderAddOrderPrice",
            minWidth: 120,
            align: "center",
            tooltip: true,
          },
          {
            title: "新/老客业绩",
            key: "isOldCustomerText",
            minWidth: 140,
            align: "center",
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
            title: "助理提成比例",
            key: "performancePercent",
            minWidth: 160,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                 params.row.performancePercent ? params.row.performancePercent + '%' : 0
                  
              );
            },
          },
          {
            title: "助理提成金额",
            key: "customerServicePerformance",
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
            title: "上传人",
            key: "createEmpName",
            minWidth: 120,
            align: "center",
            tooltip:true
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
          {
            title: "是否为稽查订单",
            key: "isInspectPerformance",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              if (params.row.isInspectPerformance == true) {
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
            title: "稽查提成比例",
            key: "inspectPercent",
            minWidth: 160,
            align: "center",
            tooltip:true,
            render: (h, params) => {
              return h(
                "div",
                params.row.inspectPercent
                  ? params.row.inspectPercent + '%'
                  : 0
              );
            },
          },
          {
            title: "稽查提成金额",
            key: "inspectPrice",
            minWidth: 160,
            align: "center",
            tooltip:true
          },
          {
            title: "薪资审核类型",
            key: "checkTypeText",
            minWidth: 140,
            align: "center",
            tooltip:true
          },
          
          {
            title: "助理确认业绩",
            key: "customerServiceOrderPerformance",
            minWidth: 140,
            align: "center",
            tooltip:true
          },
          
        ],
        data: [],
        totalCount: 0,

      },
      // 审核客服业绩金额
      returnBackPrice:0,
      // 生成薪资参数
      generateSalaryParams:{
        generateSalaryList: new Set(),
        // 
        returnBackPrice:0
      },
      // 生成薪资model
      generateSalaryModel:false,
      isGenerateSalryList:[
        {
          id:1,
          name:'未生成薪资单'
        },
        {
          id:2,
          name:'已生成薪资单'
        }
      ],
      // 提成金额
      commissionPrice:0,
      // 客服审核业绩
      checkedPrice:0
     
     
    };
  },
  methods: {
    // 生成薪资
    invoiceClick() {
      if (!this.generateSalaryParams.generateSalaryList.length) {
        this.$Message.warning({
          content: "请选择订单",
          duration: 3,
        });
        return;
      }
      let checkBelongEmpName = this.generateSalaryParams.generateSalaryList.map(item=>item.checkBelongEmpName)
      let firstValue = checkBelongEmpName[0]
      let isFlag = checkBelongEmpName.every(value => value === firstValue)
      if(isFlag == true){
        this.generateSalaryModel = true
      }else{
        this.$Message.warning('生成薪资存在多名助理数据，请核对后重新选择！')
      }
      // for (var i = 0; i < this.generateSalaryParams.generateSalaryList.length; i++) {
      //     if (this.generateSalaryParams.generateSalaryList[i].customerServiceCompensationId) {
      //       this.$Message.warning("您选中的订单存在已经生成过的薪资单，请认真核对后重试！");
      //       this.generateSalaryModel = false
      //       break;
      //     }else{
      //         this.generateSalaryModel = true
      //       }
      // }
      
        //  this.generateSalaryModel =  (this.isModel == 1 || !this.generateSalaryParams.generateSalaryList) ? false : true ;
        // this.generateSalaryParams.returnBackPrice =this.returnBackPrice == 0 ? 0 : this.returnBackPrice.toFixed(2);
    },
    handleSelect(selection, row) {
      // console.log(row.returnBackPrice)
      //   this.returnBackPrice += row.returnBackPrice
      // console.log(this.returnBackPrice)
      // 生成薪资单
      this.generateSalaryParams.generateSalaryList = selection
      // 提成金额合计
      this.commissionPrice+=row.customerServicePerformance
      // 审核客服业绩合计
      this.checkedPrice += row.customerServiceSettlePrice
    },
    handleCancels(selection, row) {
      // 生成薪资单
      this.generateSalaryParams.generateSalaryList = selection
      // this.returnBackPrice = this.returnBackPrice - row.returnBackPrice
      // 提成金额合计
      this.commissionPrice = this.commissionPrice - row.customerServicePerformance;
      // 审核客服业绩合计
      this.checkedPrice = this.checkedPrice - row.customerServiceSettlePrice;
    },

    handleSelectAll(selection) {
      if (selection && selection.length === 0) {
        // this.form.reconciliationDocumentsIdList.clear();
        // 生成薪资单
        this.generateSalaryParams.generateSalaryList = []
        // 提成金额合计
        this.commissionPrice = 0;
        // 审核客服业绩合计
        this.checkedPrice = 0;

        // this.returnBackPrice = 0
      } else {
        this.generateSalaryParams.generateSalaryList = selection
        
        // selection.forEach((item) => {
        //   this.returnBackPrice += item.returnBackTotalPrice
        // });
        selection.forEach((item) => {
          // 提成金额合计
          this.commissionPrice += item.customerServicePerformance;
          // 审核客服业绩合计
          this.checkedPrice += item.customerServiceSettlePrice;
        });
      }
    },
    // 获取薪资审核表
    getListWithPageByCustomerCompensation() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });

      const {
        pageNum,
        pageSize,
        keyWord,
        startDate,
        endDate,
        chooseHospitalId,
        checkState,
        belongEmpId,
        isOldCustoemr,
        createEmpId,
        isGenerateSalry,
        orderFrom,
        addOrderPrice
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        startDate: startDate
          ? this.$moment(new Date(startDate)).format("YYYY-MM-DD")
          : null,
        endDate: endDate
          ? this.$moment(new Date(endDate)).format("YYYY-MM-DD")
          : null,
        chooseHospitalId: chooseHospitalId == -1 ? null : chooseHospitalId,
        checkState,
        belongEmpId: belongEmpId == -1 ? null : belongEmpId,
        isOldCustoemr: isOldCustoemr == -1 ? null : isOldCustoemr,
        createEmpId: createEmpId == -1 ? null : createEmpId,
        isGenerateSalry,
        orderFrom,
        addOrderPrice
      };
      api.getListWithPageByCustomerCompensation(data).then((res) => {
        if (res.code === 0) {
          this.generateSalaryParams.generateSalaryList = []
          const { list, totalCount } = res.data.reconciliationDocumentsSettleInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
          // 防止勾选了在进行调用接口时 数值没有清0
          // 提成金额合计
          this.commissionPrice = 0
          // 审核客服业绩合计
          this.checkedPrice  = 0
        }
      });
    },

    // 获取录单申请列表分页
    handlePageChange(pageNum) {
      const {
        pageSize,
        keyWord,
        startDate,
        endDate,
        chooseHospitalId,
        checkState,
        belongEmpId,
        isOldCustoemr,
        createEmpId,
        isGenerateSalry,
        orderFrom,
        addOrderPrice
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        startDate: startDate
          ? this.$moment(new Date(startDate)).format("YYYY-MM-DD")
          : null,
        endDate: endDate
          ? this.$moment(new Date(endDate)).format("YYYY-MM-DD")
          : null,
        chooseHospitalId: chooseHospitalId == -1 ? null : chooseHospitalId,
        checkState,
        belongEmpId: belongEmpId == -1 ? null : belongEmpId,
        isOldCustoemr: isOldCustoemr == -1 ? null : isOldCustoemr,
        createEmpId: createEmpId == -1 ? null : createEmpId,
        isGenerateSalry,
        orderFrom,
        addOrderPrice
      };
      api.getListWithPageByCustomerCompensation(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.reconciliationDocumentsSettleInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
          // 提成金额合计
          this.commissionPrice = 0
          // 审核客服业绩合计
          this.checkedPrice  = 0
        }
      });
    },
    handlePageSizeChange(pageSize) {
      this.query.pageSize = pageSize;
      this.getListWithPageByCustomerCompensation();
    },
  },
  created() {
    
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "audited") {
          this.getListWithPageByCustomerCompensation();
          // 提成金额合计
          this.commissionPrice = 0
          // 审核客服业绩合计
          this.checkedPrice  = 0
        }
      },
      immediate: true,
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
.title_00{
  color: #000;
}
</style>
