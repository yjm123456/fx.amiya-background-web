<template>
  <div>
    <Card :dis-hover="true">
      <div class="content">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 180px; "
            @keyup.enter.native="getHospitalInfo()"
          />
          <Select
            v-model="query.hospitalId"
            placeholder="请选择医院"
            filterable
            style="width: 200px;margin-left:10px"
            v-if="employeeType == 'amiyaEmployee'"
          >
            <Option
              v-for="item in hospitalAllList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          
          <Select
            v-model="query.isCreateBill"
            style="margin-left: 10px; width: 130px"
            placeholder="开票状态"
          >
            <Option v-for="item in isCreateBillList" :value="item.type" :key="item.type" >{{
              item.name
            }}</Option>
          </Select>
          <Select
            v-model="query.reconciliationState"
            style="margin-left: 10px; width: 130px"
            placeholder="对账状态"
          >
            <Option v-for="item in typeList" :value="item.id" :key="item.id" >{{
              item.name
            }}</Option>
          </Select>
          <DatePicker
            type="date"
            placeholder="创建开始日期"
            style="width: 130px; margin-left: .625rem"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="创建结束时间"
            style="width: 130px;margin-left: .625rem;"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="成交开始日期"
            style="width: 130px; margin-left: .625rem"
            :value="query.startDealDate"
            v-model="query.startDealDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="成交结束时间"
            style="width: 130px;margin-left: .625rem;"
            :value="query.endDealDate"
            v-model="query.endDealDate"
          ></DatePicker>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getHospitalInfo()"
            >查询</Button
          >
          <!-- <Button
            type="primary"
            @click="collection"
            style="margin-left: 10px"
            v-if="employeeType == 'amiyaEmployee' && query.reconciliationState == 3"
            >回款</Button
          > -->
          <Button type="primary" @click="invoiceClick" style="margin-left: 10px"
            >开票</Button
          >
          <Button
            type="primary"
            @click="exportChange"
            style="margin-left: 10px"
            v-if="employeeType == 'amiyaEmployee'"
            >导出</Button
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
          height="540"
        ></Table>
      </div>
      <div class="page_wrap">
        <div class="bottom_title">
          <span  class="bottom_right"> <span class="title_00">信息服务费合计: </span><span style="color:red;font-weight:bold">{{returnBackPriceNum == 0 ? 0 : returnBackPriceNum.toFixed(2)}}</span></span>
          <span  class="bottom_right"> <span class="title_00">系统维护费合计: </span><span style="color:red;font-weight:bold">{{systemUpdatePriceNum == 0 ? 0 : systemUpdatePriceNum.toFixed(2)}}</span></span>
          <span class="bottom_right"> <span class="title_00">服务费合计: </span><span style="color:red;font-weight:bold">{{collectionNum == 0 ? 0 : collectionNum.toFixed(2)}}</span></span>
          <span class="bottom_right"> <span class="title_00"> 对账业绩合计:</span><span style="color:red;font-weight:bold">{{reconciliationPerformanceNum == 0 ? 0 : reconciliationPerformanceNum.toFixed(2)}}</span></span>
        </div>
        <Page
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
           show-total
          show-sizer
          :page-size-opts="[10,50,100,200]"
          @on-change="handlePageChange"
          @on-page-size-change="handlePageSizeChange"
          transfer
        />
      </div>
    </Card>

    <Modal
      v-model="controlModal"
      title="回款"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="25%"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="140"
      >
        <FormItem label="回款时间" prop="returnBackDate">
          <DatePicker
            type="date"
            placeholder="回款时间"
            style="width: 100%"
            :value="form.returnBackDate"
            v-model="form.returnBackDate"
          ></DatePicker>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
    <!-- 导入 -->
    <importFile
      :importControlModal.sync="importControlModal"
      @handleRefreshCustomerTrackList="getHospitalInfo()"
    ></importFile>
    <!-- 成交单 -->
    <viewTransactionOrder
      :viewTransactionOrderModel.sync="viewTransactionOrderModel"
      :viewTransactionOrderParams="viewTransactionOrderParams"
      ref="viewTransactionOrder"
    />
    <!-- 生成发票 -->
    <invoice
      :invoiceModel.sync="invoiceModel"
      :invoiceParams="invoiceParams"
      :hospitalInfo="hospitalInfo"
      @hanledgetHospitalInfo="hanledgetHospitalInfo"
      :companyNameList="companyNameList"
      :billTypeList="billTypeList"
    />
  </div>
</template>
<script>
import * as api from "@/api/reconciliationDocuments";
import { download } from "@/utils/util";
import importFile from "../../components/import/importModel.vue";
import viewTransactionOrder from "../../components/viewTransactionOrder.vue";
import invoice from "../../components/invoice/invoice.vue";

export default {
  components: {
    importFile,
    viewTransactionOrder,
    invoice
  },
  props: {
    activeName: String,
    hospitalAllList:Array,
    hospitalInfo: Array,
    companyNameList: Array,
    billTypeList: Array,
  },
  data() {
    return {
      // 生成发票
      invoiceModel: false,
      invoiceParams: {
        invoiceList: new Set(),
        // 信息服务费合计
        returnBackPriceNum: 0,
        // 系统维护费合计
        systemUpdatePriceNum: 0,
        // 服务费合计
        collectionNum: 0,
        // 对账业绩
        reconciliationPerformanceNum:0,
        //  医院id
        hospitalId: null,
        // 用于批量选择订单时判断有不同医院 提示报错
        invoiceHospitalList: new Set(),
        // 用于批量选择订单时判断有开票状态不同 提示报错
        invoiceTypeList: new Set(),
      },
      // 信息服务费合计
      returnBackPriceNum:0,
      // 系统维护金额合计
      systemUpdatePriceNum:0,
      // 服务费合计
      collectionNum:0,
      // 对账业绩
      reconciliationPerformanceNum:0,
      viewTransactionOrderModel: false,
      viewTransactionOrderParams: {
        id: "",
        tabFlag:false
      },
      typeList: [
        {
          id:-1,
          name:'全部回款状态'
        },
        {
          id: 3,
          name: "未回款",
        },
        {
          id: 4,
          name: "已回款",
        },
      ],
      // 查询
      query: {
        isCreateBill:-1,
        hospitalId:-1,
        reconciliationState: -1,
        keyword: "",
        startDate: this.$moment()
          .startOf("year")
          .format("YYYY-MM-DD"),
        endDate: this.$moment()
          .endOf("year")
          .format("YYYY-MM-DD"),
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
            title: "开票状态",
            key: "isCreateBill",
            width: 120,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.isCreateBill == true ? '已开票': '未开票'
                  
              );
            },
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
            width: 140,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled: this.employeeType == "hospitalEmployee",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        this.viewTransactionOrderParams.id = id;
                        this.viewTransactionOrderParams.tabFlag = true;
                        this.viewTransactionOrderModel = true;
                        // this.$refs.viewTransactionOrder.getContentPlatFormOrderDealInfo();
                      },
                    },
                  },
                  "查看成交单"
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
        {
          id: 3,
          name: "对账完成",
        },
      ],
      isCreateBillList:[
        {
          type:-1,
          name:'全部开票状态'
        },
        {
          type:'false',
          name:'未开票'
        },
        {
          type:'true',
          name:'已开票'
        },
      ],
      // 控制 modal
      controlModal: false,
      // 标记对账单弹窗
      markStatementModel: false,
      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        // 回款时间
        returnBackDate: "",
        // 回款id集合
        reconciliationDocumentsIdList: new Set(),
      },
      ruleValidate: {
        returnBackDate: [
          {
            required: true,
            message: "请选择回款时间",
          },
        ],
      },
      employeeType: sessionStorage.getItem("employeeType"),
      isHospital:null
    };
  },
  methods: {
    hanledgetHospitalInfo(){
      this.getHospitalInfo()
      // this.invoiceParams.invoiceList.clear();
      // this.invoiceParams.invoiceHospitalList.clear();
      // this.invoiceParams.invoiceTypeList.clear();
    },
    // 生成开票
    invoiceClick() {
      if (!this.invoiceParams.invoiceList.length) {
        this.$Message.warning({
          content: "请选择订单",
          duration: 3,
        });
        return;
      }
      for (var i = 0; i < this.invoiceParams.invoiceList.length; i++) {
          if(i > 0){
            if(this.invoiceParams.invoiceList[i].hospitalId != this.invoiceParams.invoiceList[i-1].hospitalId){
              this.$Message.warning("医院选择不同，请重选选择");
              this.isHospital = 1
              break 
            }else{
              this.isHospital = 0
            }
          }
          if (this.invoiceParams.invoiceList[i].isCreateBill == true) {
            this.$Message.warning("您选中的对账单存在已开票数据，请认真核对后重试！");
            this.isHospital = 1
            break;
          }else{
              this.isHospital = 0
            }
          
      }
         this.invoiceModel =  (this.isHospital == 1 || !this.invoiceParams.invoiceList) ? false : true ;
          this.invoiceParams.returnBackPriceNum =  this.returnBackPriceNum == 0 ? 0 : this.returnBackPriceNum.toFixed(2);
          this.invoiceParams.systemUpdatePriceNum = this.systemUpdatePriceNum == 0 ? 0: this.systemUpdatePriceNum.toFixed(2);
          this.invoiceParams.collectionNum =this.collectionNum == 0 ? 0 : this.collectionNum.toFixed(2);
          this.invoiceParams.reconciliationPerformanceNum = this.reconciliationPerformanceNum == 0 ? 0 : this.reconciliationPerformanceNum.toFixed(2);  
          this.invoiceParams.hospitalId = this.invoiceParams.invoiceList[0].hospitalId;
      // let hostpital = [...this.invoiceParams.invoiceHospitalList];
      // let type = [...this.invoiceParams.invoiceTypeList];
      // // 判断选择的医院是否是同一家医院
      // if (hostpital.length > 1) {
      //   this.$Message.warning("医院选择不同，请重选选择");
      //   // this.getHospitalInfo()
      //   return;
      // }
      //  // 判断选择的已开票状态不能再次开票
      // if (type.find(item=>item==1)) {
      //   this.$Message.warning("您选中的对账单存在已开票数据，请认真核对后重试！");
      //   // this.getHospitalInfo()
      //   return;
      // }
      // if (![...this.invoiceParams.invoiceList].length) {
      //   this.$Message.warning({
      //     content: "请选择订单",
      //     duration: 3,
      //   });
      //   return;
      // }
      // this.invoiceModel = true;
      // this.invoiceParams.returnBackPriceNum =
      //   this.returnBackPriceNum == 0 ? 0 : this.returnBackPriceNum.toFixed(2);
      // this.invoiceParams.systemUpdatePriceNum =
      //   this.systemUpdatePriceNum == 0
      //     ? 0
      //     : this.systemUpdatePriceNum.toFixed(2);
      // this.invoiceParams.collectionNum =
      //   this.collectionNum == 0 ? 0 : this.collectionNum.toFixed(2);
      // this.invoiceParams.reconciliationPerformanceNum =
      //   this.reconciliationPerformanceNum == 0 ? 0 : this.reconciliationPerformanceNum.toFixed(2);
      // this.invoiceParams.hospitalId = hostpital[0];
    },
    handlePageSizeChange(pageSize) {
      this.query.pageSize = pageSize;
      this.getHospitalInfo();
    },
    // 回款
    collection() {
      if (![...this.form.reconciliationDocumentsIdList].length) {
        this.$Message.warning({
          content: "请选择订单",
          duration: 3,
        });
        return;
      }
      this.controlModal = true;
    },
    handleSelect(selection, row) {
      this.collectionNum += row.returnBackTotalPrice
      this.reconciliationPerformanceNum += row.totalDealPrice
      this.returnBackPriceNum += row.returnBackPrice
      this.systemUpdatePriceNum += row.systemUpdatePrice
      // 回款
      this.form.reconciliationDocumentsIdList.add(row.id);
      // 生成发票
      this.invoiceParams.invoiceList = selection
      // this.invoiceParams.invoiceList.add(row.id);
      // this.invoiceParams.invoiceHospitalList.add(row.hospitalId);
      // let isCreateBill = row.isCreateBill == true ? 1 : 2
      // this.invoiceParams.invoiceTypeList.add(isCreateBill);
    },
    handleCancels(selection, row) {
      // 回款
      this.form.reconciliationDocumentsIdList.delete(row.id);
      this.collectionNum = this.collectionNum - row.returnBackTotalPrice
      this.reconciliationPerformanceNum = this.reconciliationPerformanceNum - row.totalDealPrice
      this.returnBackPriceNum = this.returnBackPriceNum - row.returnBackPrice
      this.systemUpdatePriceNum = this.systemUpdatePriceNum - row.systemUpdatePrice
      // 生成发票
      this.invoiceParams.invoiceList = selection
      // this.invoiceParams.invoiceList.delete(row.id);
      // this.invoiceParams.invoiceHospitalList.delete(row.hospitalId);
      // let isCreateBill = row.isCreateBill == true ? 1 : 2
      // this.invoiceParams.invoiceTypeList.delete(isCreateBill);
    },

    handleSelectAll(selection) {
      if (selection && selection.length === 0) {
        this.form.reconciliationDocumentsIdList.clear();
        // 生成发票
        this.invoiceParams.invoiceList = []
        // this.invoiceParams.invoiceList.clear();
        // this.invoiceParams.invoiceHospitalList.clear();
        // this.invoiceParams.invoiceTypeList.clear();

        this.collectionNum = 0
        this.reconciliationPerformanceNum = 0
        this.returnBackPriceNum = 0
        this.systemUpdatePriceNum = 0
      } else {
        this.invoiceParams.invoiceList = selection
        selection.forEach((item) => {
          this.form.reconciliationDocumentsIdList.add(item.id);
          // this.invoiceParams.invoiceList.add(item.id);
          // this.invoiceParams.invoiceHospitalList.add(item.hospitalId);
          // let isCreateBill = item.isCreateBill == true ? 1 : 2;
          // this.invoiceParams.invoiceTypeList.add(isCreateBill);
          this.collectionNum += item.returnBackTotalPrice
          this.reconciliationPerformanceNum += item.totalDealPrice
          this.returnBackPriceNum += item.returnBackPrice
          this.systemUpdatePriceNum += item.systemUpdatePrice
        });
      }
    },
    // 导出
    exportChange(){
      const {
        pageNum,
        pageSize,
        keyword,
        startDealDate,
        endDealDate,
        startDate,
        endDate,
        reconciliationState,
        hospitalId,
        isCreateBill
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        startDealDate: startDealDate
          ? this.$moment(startDealDate).format("YYYY-MM-DD")
          : null,
        endDealDate: endDealDate
          ? this.$moment(endDealDate).format("YYYY-MM-DD")
          : null,
        reconciliationState:reconciliationState == -1 ? null : reconciliationState,
        hospitalId:this.employeeType == 'hospitalEmployee' ? sessionStorage.getItem('hospitalId') : hospitalId == -1 ? null : hospitalId,
        isCreateBill:isCreateBill == -1 ? null : isCreateBill
      };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      // 判断开始时间与结束时间不能超过一个月
      if(this.$moment(endDate).diff(startDate, 'months')){
        this.$Message.error('开始时间与结束时间不能超过一个月，请重新选择后再进行查询')
        return
      }
      if(this.query.data.length==0){
          this.$Message.error('没有数据时不支持导出')
          return
      }
      api.exportInternalExportReconciliationDocuments(data).then((res) => {
        let name = this.$moment(new Date(startDate)).format("YYYY-MM-DD") + '-' + this.$moment(new Date(endDate)).format("YYYY-MM-DD") + '历史账单'
        download(res,name);
      });
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
        reconciliationState,
        hospitalId,
        isCreateBill
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        startDealDate: startDealDate
          ? this.$moment(startDealDate).format("YYYY-MM-DD")
          : null,
        endDealDate: endDealDate
          ? this.$moment(endDealDate).format("YYYY-MM-DD")
          : null,
        reconciliationState:reconciliationState == -1 ? null : reconciliationState,
        hospitalId:this.employeeType == 'hospitalEmployee' ? sessionStorage.getItem('hospitalId') : hospitalId == -1 ? null : hospitalId,
        isCreateBill:isCreateBill == -1 ? null : isCreateBill
      };
      api.getReconciliationDocuments(data).then((res) => {
        if (res.code === 0) {
          this.collectionNum = 0
          this.reconciliationPerformanceNum = 0
          this.returnBackPriceNum = 0
          this.systemUpdatePriceNum = 0
           this.invoiceParams.invoiceList = []
          // this.invoiceParams.invoiceList.clear();
          // this.invoiceParams.invoiceHospitalList.clear();
          // this.form.reconciliationDocumentsIdList.clear();
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
        reconciliationState,
        hospitalId,
        isCreateBill
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        startDealDate: startDealDate
          ? this.$moment(startDealDate).format("YYYY-MM-DD")
          : null,
        endDealDate: endDealDate
          ? this.$moment(endDealDate).format("YYYY-MM-DD")
          : null,
        reconciliationState:reconciliationState == -1 ? null : reconciliationState,
        hospitalId:this.employeeType == 'hospitalEmployee' ? sessionStorage.getItem('hospitalId') : hospitalId == -1 ? null : hospitalId,
        isCreateBill:isCreateBill == -1 ? null : isCreateBill
      };
      api.getReconciliationDocuments(data).then((res) => {
        if (res.code === 0) {
          this.collectionNum = 0
          this.reconciliationPerformanceNum = 0
          this.returnBackPriceNum = 0
          this.systemUpdatePriceNum = 0
          this.form.reconciliationDocumentsIdList.clear();
          const { list, totalCount } = res.data.reconciliationDocumentsInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { reconciliationDocumentsIdList, returnBackDate } = this.form;
          const data = {
            reconciliationDocumentsIdList: [...reconciliationDocumentsIdList],
            returnBackDate: this.$moment(returnBackDate).format("YYYY-MM-DD"),
          };
          // 回款
          api.reconciliationReturnBackPriceList(data).then((res) => {
            if (res.code === 0) {
              this.cancelSubmit("form");
              this.getHospitalInfo();
              this.$Message.success({
                content: "回款成功",
                duration: 3,
              });
              this.form.reconciliationDocumentsIdList.clear();
            }
          });
        }
      });
    },
    markStatementhandSubmit() {
      this.markStatementModel = false;
      this.markStatementform.reconciliationState = null;
      this.markStatementform.questionReason = "";
    },
    // 取消
    cancelSubmit(name) {
      this.isEdit = false;
      this.controlModal = false;
      this.$refs[name].resetFields();
      // this.invoiceParams.invoiceList.clear();
      // this.invoiceParams.invoiceHospitalList.clear();
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.$refs["form"].resetFields();
        // this.invoiceParams.invoiceList.clear();
        // this.invoiceParams.invoiceHospitalList.clear();
      }
    },
  },
  created() {
    // this.getLogisticsCompanyList()
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "historicalReconciliation") {
          this.getHospitalInfo();
          this.collectionNum = 0
          this.reconciliationPerformanceNum = 0
          this.returnBackPriceNum = 0
          this.systemUpdatePriceNum = 0
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.bottom_title{
  font-size: 16px;
}
.bottom_right{
  margin-right: 20px;
}
.title_00{
  color: #000;
}
</style>
