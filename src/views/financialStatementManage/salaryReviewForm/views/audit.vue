<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyWord"
            placeholder="请输入关键字"
            style="width: 200px; "
            @keyup.enter.native="getListWithPageByCustomerCompensation()"
          />
          <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 150px;margin-left: .625rem"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束日期"
            style="width: 150px; margin-left: .625rem"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <Select
            v-model="query.belongEmpId"
            placeholder="请选择归属客服"
            filterable
            style="width: 200px;margin-left:10px"
          >
            <Option
              v-for="item in params.employeeAll"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.chooseHospitalId"
            placeholder="请选择医院"
            filterable
            style="width: 200px;margin-left:10px"
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
            style="width: 150px;margin-left:10px"
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
            style="width: 150px;margin-left:10px"
          >
            <Option
              v-for="item in params.creteEmpNameList"
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
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getListWithPageByCustomerCompensation()"
            >查询</Button
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
          show-sizer
          :page-size-opts="[10, 20, 50, 100, 200]"
          @on-change="handlePageChange"
          @on-page-size-change="handlePageSizeChange"
        />
      </div>
    </Card>
    <!-- 审核 -->
    <examine
      :examineModel.sync="examineModel"
      :params="params"
      :checkedParams="checkedParams"
      @getListWithPageByCustomerCompensation="getListWithPageByCustomerCompensation"
    />
    <!-- 内容平台订单详情 -->
    <detail :detailModel.sync="detailModel" :detailList="detailList"></detail>
    <!-- 消费追踪订单详情 -->
    <upgradeOrderDetail :upgradeOrderDetailModel.sync ="upgradeOrderDetailModel" :upgradeOrderObj="upgradeOrderObj"></upgradeOrderDetail>
    <!-- 下单平台订单详情 -->
    <orderDetail :detailModel.sync ="orderDetailModel" :detailList ="detailList"></orderDetail>
  </div>
</template>
<script>
import * as api from "@/api/reconciliationDocumentsSettle";
import * as orderApi from "@/api/orderManage";
import * as customerManageApi from "@/api/customerManage.js";

import examine from "../components/examine.vue";
import detail from "@/components/contentDetail/detail.vue";
import upgradeOrderDetail from "@/components/upgradeOrderDetail/upgradeOrderDetail"
import orderDetail from "@/components/orderDetail/detail.vue"

export default {
  components: {
    examine,
    detail,
    upgradeOrderDetail,
    orderDetail
  },
  props: {
    activeName: String,
    params: Object,
  },
  data() {
    return {
      
      // 查询
      query: {
        keyWord: "",
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        chooseHospitalId:-1,
        isOldCustoemr:-1,
        belongEmpId:-1,
        checkState:0,
        createEmpId:-1,
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
            title: "对账单面值",
            key: "recolicationPrice",
            minWidth: 120,
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
            title: "助理",
            key: "belongEmpName",
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
            title: "操作",
            key: "",
            width: 180,
            align: "center",
            fixed:'right',
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled: params.row.checkStateText == "审核通过",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id,isOldCustomerText, customerServiceSettlePrice,orderPrice,recolicationPrice} = params.row;
                        this.examineModel = true;
                        this.checkedParams.id = id;
                        this.checkedParams.isOldCustomerText = isOldCustomerText
                        this.checkedParams.customerServiceSettlePrice = customerServiceSettlePrice
                        this.checkedParams.orderPrice = orderPrice
                        this.checkedParams.recolicationPrice = recolicationPrice
                      },
                    },
                  },
                  "审核"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      // disabled:params.row.statusText != '交易成功'
                    },
                    style: {
                      marginRight: ".3125rem",
                    },
                    on: {
                      click: () => {
                        const { orderId,orderFromText } = params.row;
                        switch(orderFromText){
                          case '内容平台':
                            orderApi.byIdContentPlateForm(orderId).then((res) => {
                              if (res.code === 0) {
                                this.detailModel = true;
                                const { orderInfo } = res.data;
                                this.detailList = [orderInfo];
                              }
                            });
                            break;
                          case '消费追踪':
                            customerManageApi.byCustomerHospitalConsume(orderId).then((res) => {
                              if (res.code === 0) {
                                this.upgradeOrderDetailModel = true
                                this.upgradeOrderObj= res.data.CustomerManageUpdateconsume
                              }
                            })
                            break;
                          case '下单平台':
                            orderApi.byIdGetOrderInfo(orderId).then((res) => {
                              if (res.code === 0) {
                                this.orderDetailModel = true
                                const {order} = res.data;
                                this.detailList= [order]
                              }
                            })
                            break;
                          default:
                            break;
                        }
                      
                      },
                    },
                  },
                  "订单详情"
                ),
               
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },
      examineModel:false,
      
      // 审核参数
      checkedParams:{
        // 新老客业绩
        isOldCustomerText:'',
        id:'',
        // 审核客服业绩金额
        customerServiceSettlePrice:0,
        // 订单金额
        orderPrice:0,
        // 对账单面值
        recolicationPrice:0
      },

      // 内容平台订单详情model
      detailModel:false,
      // 订单详情参数
      detailList:[],
      // 消费追踪订单详情model
      upgradeOrderDetailModel:false,
      upgradeOrderObj:{},
      // 下单平台订单详情
      orderDetailModel:false,
      detailList:[]
    };
  },
  methods: {
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
        createEmpId
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
      };
      api.getListWithPageByCustomerCompensation(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.reconciliationDocumentsSettleInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
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
        createEmpId
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
      };
      api.getListWithPageByCustomerCompensation(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.reconciliationDocumentsSettleInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
    handlePageSizeChange(pageSize) {
      this.query.pageSize = pageSize;
      this.getListWithPageByCustomerCompensation();
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            // 修改
            api.editExpressManage(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getListWithPageByCustomerCompensation();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const { expressName, valid, expressCode } = this.form;
            const data = { expressName, valid, expressCode };
            // 添加
            api.addExpressManage(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getListWithPageByCustomerCompensation();
                this.$Message.success({
                  content: "添加成功",
                  duration: 3,
                });
              }
            });
          }
        }
      });
    },

    // 取消
    cancelSubmit(name) {
      this.isEdit = false;
      this.controlModal = false;
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "audit") {
          this.getListWithPageByCustomerCompensation();
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
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
