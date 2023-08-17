<template>
  <div>
    <Card :dis-hover="true">
      <div class="content">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px; "
            @keyup.enter.native="getHospitalInfo()"
          />
          <Select
            v-model="query.hospitalId"
            placeholder="请选择医院"
            filterable
            style="width: 240px;margin-left:10px"
            v-if="employeeType == 'amiyaEmployee'"
          >
            <Option
              v-for="item in hospitalInfo"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <DatePicker
            type="date"
            placeholder="创建开始日期"
            style="width: 180px; margin-left: .625rem"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="创建结束时间"
            style="width: 180px;margin-left: .625rem;"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="成交开始日期"
            style="width: 180px; margin-left: .625rem"
            :value="query.startDealDate"
            v-model="query.startDealDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="成交结束时间"
            style="width: 180px;margin-left: .625rem;"
            :value="query.endDealDate"
            v-model="query.endDealDate"
          ></DatePicker>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getHospitalInfo()"
            >查询</Button
          >
          <Button
            type="primary"
            @click="markStatement()"
            style="margin-left: 10px"
            >标记对账单状态</Button
          >
        </div>
      </div>
    </Card>

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
        ></Table>
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

  
    <!-- 标记对账单 -->
    <Modal
      v-model="markStatementModel"
      title="标记对账单"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="30%"
    >
      <Form
        ref="markStatementform"
        :model="markStatementform"
        :rules="markStatementruleValidate"
        label-position="left"
        :label-width="110"
      >
        <FormItem label="对账单状态" prop="reconciliationState">
          <Select
            v-model="markStatementform.reconciliationState"
            placeholder="请选择对账单状态"
            disabled
            @on-change="reconciliationStateChange"
          >
            <Option
              v-for="item in employeeType == 'hospitalEmployee'
                ? markStatementList
                : markStatementList2"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem
          label="问题原因"
          prop="questionReason"
          v-if="markStatementform.reconciliationState == 2"
        >
          <Input
            v-model="markStatementform.questionReason"
            placeholder="请输入问题原因"
            type="textarea"
            :rows="4"
          ></Input>
        </FormItem>
        <Spin fix v-if="isLoading == true">
            <Icon
              type="ios-loading"
              size="18"
              class="demo-spin-icon-load"
            ></Icon>
            <div>加载中...</div>
          </Spin>
      </Form>
      <div slot="footer">
        <Button @click="markStatementhandSubmit('markStatementform')"
          >取消</Button
        >
        <Button
          type="primary"
          @click="markStatementhandleSubmit('markStatementform')"
          >确定</Button
        >
      </div>
    </Modal>
    <!-- 对账完成列表 -->
    <reconciliationCompletionList
      :reconciliationCompletionListModel.sync="
        reconciliationCompletionListModel
      "
      :reconciliationParams="reconciliationParams"
      ref="reconciliationCompletionList"
      @getHospitalInfo="getHospitalInfo"
    />
  </div>
</template>
<script>
import * as api from "@/api/reconciliationDocuments";
import { download } from "@/utils/util";
import reconciliationCompletionList from "../../components/import/reconciliationCompletionList.vue";

export default {
  components: {
    reconciliationCompletionList,
  },
  props: {
    activeName: String,
    hospitalInfo:Array
  },
  data() {
    return {
      isLoading:false,
      reconciliationCompletionListModel: false,
      customerPhone: "",
      reconciliationParams: {
        idList: [],
        reconciliationState: 3,
        customerPhone: "",
        questionReason: "",
        totalDealPrice: null,
        returnBackTotalPrice: 0,
        id: "",
        returnBackPrice:"",
        returnBackPricePercent:null,
        systemUpdatePricePercent:null,
        tabFlag:false,
        hospitalId:null,
        hospitalName:''
      },
      // 查询
      query: {
        // hospitalId:2,
        hospitalId:null,
        keyword: "",
        // startDate: "2022-01-01",
        startDate: this.$moment().startOf("month").format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        startDealDate: null,
        endDealDate: null,
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
            title: "对账单编号",
            key: "id",
            width: 170,
            align:'center'
          },
          {
            title: "医院",
            key: "hospitalName",
            width: 220,
          },
          {
            title: "客户姓名",
            key: "customerName",
            width: 160,
          },
          {
            title: "客户电话",
            key: "customerPhone",
            width: 160,
            align: "center",
          },
          {
            title: "成交项目",
            key: "dealGoods",
            width: 160,
            align: "center",
            tooltip:true
          },
          {
            title: "成交时间",
            key: "dealDate",
            width: 140,
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
            title: "总成交金额",
            key: "totalDealPrice",
            width: 140,
            align: "center",
          },
          {
            title: "对账状态",
            key: "reconciliationStateText",
            width: 140,
            align: "center",
          },
          {
            title: "信息服务费比例（%）",
            key: "returnBackPricePercent",
            width: 180,
            align: "center",
          },
          {
            title: "信息服务费金额",
            key: "returnBackPrice",
            width: 150,
            align: "center",
          },
          {
            title: "系统维护费比例（%）",
            key: "systemUpdatePricePercent",
            width: 200,
            align: "center",
          },
          {
            title: "系统维护金额",
            key: "systemUpdatePrice",
            width: 140,
            align: "center",
          },
          {
            title: "服务费合计",
            key: "returnBackTotalPrice",
            width: 140,
            align: "center",
          },

          {
            title: "问题原因",
            key: "questionReason",
            width: 220,
          },
          {
            title: "备注",
            key: "remark",
            width: 220,
          },
          {
            title: "创建时间",
            key: "createDate",
            width: 180,
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
            title: "创建人",
            key: "createByName",
            width: 140,
          },
          {
            title: "操作",
            key: "",
            fixed: "right",
            width: 100,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled: this.employeeType != "amiyaEmployee",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const {
                          id,
                          customerPhone,
                          totalDealPrice,
                          returnBackTotalPrice,
                          returnBackPrice,
                          returnBackPricePercent,
                          systemUpdatePricePercent,
                          hospitalId,
                          hospitalName
                        } = params.row;
                        this.reconciliationParams.idList = [id];
                        this.reconciliationParams.reconciliationState = 3;
                        this.reconciliationParams.questionReason = "";
                        this.reconciliationParams.customerPhone = customerPhone;
                        this.reconciliationParams.totalDealPrice = totalDealPrice;
                        this.reconciliationParams.returnBackTotalPrice = returnBackTotalPrice;
                        this.reconciliationParams.returnBackPrice = returnBackPrice;
                        this.reconciliationParams.returnBackPricePercent = returnBackPricePercent;
                        this.reconciliationParams.systemUpdatePricePercent = systemUpdatePricePercent;
                        this.reconciliationParams.hospitalId = hospitalId;
                        this.reconciliationParams.hospitalName = hospitalName;
                        this.reconciliationParams.id = id;
                        this.reconciliationCompletionListModel = true;
                        this.reconciliationParams.tabFlag =  true
                      },
                    },
                  },
                  "对账"
                ),
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },
      importControlModal: false,
      markStatementList: [
        {
          id: 1,
          name: "待确认",
        },
      ],
      markStatementList2: [
        {
          id: 2,
          name: "问题账单",
        },
        // {
        //   id:3,
        //   name:'对账完成'
        // },
      ],
      // 控制 modal
      controlModal: false,
      // 标记对账单弹窗
      markStatementModel: false,
      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      // 标记对账单
      markStatementform: {
        // 订单号
        orderId: new Set(),
        // 对账单状态
        reconciliationState: null,
        // 问题原因
        questionReason: "",
      },
      markStatementruleValidate: {
        reconciliationState: [
          {
            required: true,
            message: "请选择对账单状态",
          },
        ],
        questionReason: [
          {
            required: true,
            message: "请输入问题原因",
          },
        ],
      },
      employeeType: sessionStorage.getItem("employeeType"),
      orderId: new Set(),
    };
  },
  methods: {
    reconciliationStateChange() {
      if (this.markStatementform.reconciliationState != 2) {
        this.markStatementform.questionReason = "";
      }
    },
    // 标记对账单确认
    markStatementhandleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            orderId,
            reconciliationState,
            questionReason,
          } = this.markStatementform;
          const data = {
            idList: [...orderId],
            reconciliationState,
            questionReason,
          };
          this.isLoading = true
          api.tagReconciliationState(data).then((res) => {
            if (res.code === 0) {
              this.isLoading = false
              this.markStatementhandSubmit();
              this.$Message.success("已成功");
              this.getHospitalInfo();
              this.markStatementform.orderId.clear();
              
            }else{
              setTimeout(()=>{
                this.isLoading = false
              },3000)
            }
          });
        }
      })
    },
   
    // 标记对账单
    markStatement() {
      if (![...this.markStatementform.orderId].length) {
        this.$Message.warning({
          content: "请选择订单",
          duration: 3,
        });
        return;
      }
      this.markStatementModel = true;
      this.markStatementform.reconciliationState =
        this.employeeType == "hospitalEmployee" ? 1 : 2;
    },
    
    handleSelect(selection, row) {
      // 标记对账单
      this.markStatementform.orderId.add(row.id);
      this.orderId.add(row.id);
    },
    handleCancels(selection, row) {
      // 标记对账单
      this.markStatementform.orderId.delete(row.id);
      this.orderId.delete(row.id);
    },

    handleSelectAll(selection) {
      if (selection && selection.length === 0) {
        this.markStatementform.orderId.clear();
        this.orderId.clear();
      } else {
        selection.forEach((item) => {
          this.markStatementform.orderId.add(item.id);
          this.orderId.add(item.id);
        });
      }
    },
    // 获取对账单列表
    getHospitalInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        keyword,
        startDealDate,
        endDealDate,
        startDate,
        endDate,
        hospitalId
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        startDealDate: startDealDate
          ? this.$moment(startDealDate).format("YYYY-MM-DD")
          : null,
        endDealDate: endDealDate
          ? this.$moment(endDealDate).format("YYYY-MM-DD")
          : null,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        reconciliationState: 0,
        hospitalId:this.employeeType == 'amiyaEmployee' ? hospitalId : sessionStorage.getItem('hospitalId')
      };
      api.getReconciliationDocuments(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.reconciliationDocumentsInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取对账单列表分页
    handlePageChange(pageNum) {
      const {
        pageSize,
        keyword,
        startDealDate,
        endDealDate,
        startDate,
        endDate,
        hospitalId
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        startDealDate: startDealDate
          ? this.$moment(startDealDate).format("YYYY-MM-DD")
          : null,
        endDealDate: endDealDate
          ? this.$moment(endDealDate).format("YYYY-MM-DD")
          : null,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        reconciliationState: 0,
        hospitalId:this.employeeType == 'amiyaEmployee' ? hospitalId : sessionStorage.getItem('hospitalId')
      };
      api.getReconciliationDocuments(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.reconciliationDocumentsInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
    markStatementhandSubmit() {
      this.markStatementModel = false;
      this.markStatementform.reconciliationState = null;
      this.markStatementform.questionReason = "";
    },
   
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
      }
    },
  },
  created() {
    // this.getLogisticsCompanyList()
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "currentReconciliation") {
          this.getHospitalInfo();
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container {
  margin-top: 16px;
}
.page_wrap {
  text-align: right;
  margin-top: 10px;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
