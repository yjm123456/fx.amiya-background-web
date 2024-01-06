<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px;"
            @keyup.enter.native="getHospitalInfo()"
          />
          <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 150px; margin-left: .625rem"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束时间"
            style="width: 150px;margin-left: .625rem;"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <Select
            v-model="query.isSettle"
            placeholder="是否回款"
            style="width: 150px;margin-left:10px"
          >
            <Option
              v-for="item in isSettleList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.accountType"
            placeholder="请选择对账单类型"
            filterable
            style="width: 150px;margin-left:10px"
          >
            <Option
              v-for="item in accountTypeList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin: 0 10px"
            @click="getHospitalInfo()"
            >查询</Button
          >
          <Button
            type="primary"
            @click="exportReconciliation"
            v-has="{ role: ['fx.amiya.permission.EXPORT'] }"
            >导出</Button
          >
        </div>
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data"></Table>
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
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/reconciliationDocumentsSettle";
import { download } from "@/utils/util";

export default {
  props:{
    activeName:String
  },
  data() {
    return {
      positionId:sessionStorage.getItem('positionId'),
      // 查询
      query: {
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        isSettle:-1,
        accountType:-1,
        columns: [
          {
            title: "审核时间",
            key: "createDate",
            minWidth: 170,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.createDate
                  ? this.$moment(params.row.createDate).format("YYYY-MM-DD HH:mm:ss")
                  : ""
              );
            },
          },
          {
            title: "对账单编号",
            key: "recommandDocumentId",
            align: "center",
            minWidth: 170,
          },
          {
            title: "医院",
            key: "hospitalName",
            align: "center",
            minWidth: 220,
            tooltip:true
          },
          {
            title: "是否开票",
            key: "isCerateBill",
            align: "center",
            minWidth: 100,
          },
          {
            title: "收款公司",
            key: "belongCompany",
            align: "center",
            minWidth: 200,
            tooltip:true
          },
          {
            title: "收款公司",
            key: "belongCompany2",
            align: "center",
            minWidth: 200,
            tooltip:true
          },
          {
            title: "订单号",
            key: "orderId",
            align: "center",
            minWidth: 170,
          },
          {
            title: "成交编号",
            key: "dealInfoId",
            align: "center",
            minWidth: 170,
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
            title: "成交项目",
            key: "goodsName",
            minWidth: 130,
            align: "center",
          },
          {
            title: "顾客手机号",
            key: "phone",
            minWidth: 130,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                this.positionId == 13 ? params.row.phone : '*'
              );
            },
          },
          {
            title: "订单来源",
            key: "orderFromText",
            align: "center",
            minWidth: 100,
          },
          {
            title: "订单金额",
            key: "orderPrice",
            align: "center",
            minWidth: 100,
          },
          {
            title: "对账金额",
            key: "recolicationPrice",
            align: "center",
            minWidth: 100,
          },
          {
            title: "新老客业绩",
            key: "isOldCustomerText",
            align: "center",
            minWidth: 120,
          },
          {
            title: "信息服务费",
            key: "informationPrice",
            minWidth: 110,
            align: "center",
            // render: (h, params) => {
            //   return h(
            //     "div",
            //     this.positionId == 13 ? params.row.informationPrice : '*'
            //   );
            // },
          },
          {
            title: "系统服务费",
            key: "systemUpdatePrice",
            minWidth: 110,
            align: "center",
            // render: (h, params) => {
            //   return h(
            //     "div",
            //     this.positionId == 13 ? params.row.systemUpdatePrice : '*'
            //   );
            // },
          },
          {
            title: "服务费合计",
            key: "returnBackPrice",
            minWidth:140,
            align: "center",
          },
          {
            title: "助理服务费合计",
            key: "customerServiceSettlePrice",
            minWidth: 140,
            align:'center',
            
          },
          {
            title: "是否回款",
            key: "isSettle",
            align: "center",
            minWidth: 100,
          },
          {
            title: "回款时间",
            key: "settleDate",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.settleDate
                  ? this.$moment(params.row.settleDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          {
            title: "归属主播",
            key: "belongLiveAnchor",
            align: "center",
            minWidth:180,
            tooltip:true
          },
          {
            title: "归属客服",
            key: "belongEmpName",
            align: "center",
            minWidth:120,
          },
          {
            title: "业绩上传人员",
            key: "createEmpName",
            align: "center",
            minWidth:140,
          },
          {
            title: "操作人",
            key: "createByEmpName",
            align: "center",
            minWidth:120,
          },
          {
            title: "账单类型",
            key: "accountTypeText",
            align: "center",
            minWidth:100,
          },
          {
            title: "出入账金额",
            key: "accountPrice",
            align: "center",
            minWidth:120,
          },
        ],
        data: [],
        totalCount: 0,
      },
    //   是否回款
    isSettleList:[
        {
            type:-1,
            name:' 全部回款状态'
        },
        {
            type:'true',
            name:' 是'
        },
        {
             type:'false',
             name:'否'
        }
    ],
    // 对账单类型
    accountTypeList:[
        {
            type:-1,
            name:'全部账单类型'
        },
        {
            type:'false',
            name:'入账'
        },
        {
            type:'true',
            name:'出账'
        }
    ]
    };
  },
  methods: {
    // 获取对账单审核记录列表
    getHospitalInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,keyword,isSettle,accountType,startDate,endDate} = this.query;
      const data = { 
        pageNum, 
        pageSize ,
        keyword ,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        isSettle:isSettle == -1 ? null : isSettle,
        accountType:accountType == -1 ? null : accountType,
        chooseHospitalId:16
       };
       if(!startDate || !endDate){
            this.$Message.error('请选择日期')
            return
        }
      api.getReconciliationDocumentsSettle(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.reconciliationDocumentsSettleInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取对账单审核记录列表分页
    handlePageChange(pageNum) {
        const {  pageSize ,keyword,isSettle,accountType,startDate,endDate} = this.query;
        const data = { 
            pageNum, 
            pageSize ,
            keyword,
            startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
            endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            isSettle:isSettle == -1 ? null : isSettle,
            accountType:accountType == -1 ? null : accountType,
            chooseHospitalId:16
        };
        if(!startDate || !endDate){
            this.$Message.error('请选择日期')
            return
        }
        api.getReconciliationDocumentsSettle(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.reconciliationDocumentsSettleInfo;
            this.query.data = list;
            this.query.totalCount = totalCount;
            }
        });
    },
    exportReconciliation(){
        const { pageNum, pageSize ,keyword,isSettle,accountType,startDate,endDate} = this.query;
        const data = { 
            pageNum, 
            pageSize ,
            keyword ,
            startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
            endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            isSettle:isSettle == -1 ? null : isSettle,
            accountType:accountType == -1 ? null : accountType,
            chooseHospitalId:16
        };
        if(!startDate || !endDate){
            this.$Message.error('请选择日期')
            return
        }
        if(this.query.data.length==0){
            this.$Message.error('没有数据时不支持导出')
            return
        }
        api.exportReconciliationDocumentsDetails(data).then((res) => {
            let name = this.$moment(new Date(startDate)).format("YYYY-MM-DD") + '-' + this.$moment(new Date(endDate)).format("YYYY-MM-DD") + '对账单审核记录'
            download(res,name);
        });
    }
  },
  created() {
    // this.getLogisticsCompanyList()
  },
  watch:{
    activeName: {
      handler(value) {
        if (value === "liantianmei") {
          this.getHospitalInfo();
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