<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyWord"
            placeholder="请输入关键字"
            style="width: 200px; "
            @keyup.enter.native="getContentPlatFormOrderAddWork()"
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
            v-model="query.hospitalId"
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
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getContentPlatFormOrderAddWork()"
            >查询</Button
          >
        </div>
        <div class="right">
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="addRecordingModel = true"
            >添加</Button
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
    <!-- 录单申请 -->
    <addRecording :addRecordingModel.sync="addRecordingModel" :editRecordingApplicationParams="editRecordingApplicationParams" :hospitalList="params.hospitalInfo" @getContentPlatFormOrderAddWork="getContentPlatFormOrderAddWork"/>
    <!-- 编辑录单申请 -->
    <editRecordingApplication
      :recordingApplicationModel.sync="recordingApplicationModel"
      :hospitalList="params.hospitalInfo"
      :title="title"
      :editRecordingApplicationParams="editRecordingApplicationParams"
      @getContentPlatFormOrderAddWork="getContentPlatFormOrderAddWork"
    />
    <!-- 录单 -->
    <recording
      :recordingModel.sync="recordingModel"
      :recordingNormalParams="recordingNormalParams"
    />
    <!-- 转移 -->
    <transfer :transferModel.sync="transferModel" :transferParams="transferParams" @getContentPlatFormOrderAddWork="getContentPlatFormOrderAddWork"/>
  </div>
</template>
<script>
import * as api from "@/api/contentPlatFormOrderAddWork";
import * as orderApi from "@/api/orderManage";
import * as contentPlatForm from "@/api/baseDataMaintenance";
import * as emApi from "@/api/employeeManage";

import editRecordingApplication from "@/components/recordingApplication/recordingApplication";
import recording from "../components/recording.vue";
import transfer from "../components/transfer.vue"
import addRecording from "../components/addRecording.vue"
export default {
  components: {
    editRecordingApplication,
    recording,
    transfer,
    addRecording
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
        hospitalId: -1,
        checkState: -1,
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "提交日期",
            key: "createDate",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.createDate
                  ? this.$moment(params.row.createDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          {
            title: "接收人",
            key: "acceptByEmpName",
            align: "center",
            minWidth: 100,
          },
          {
            title: "客户手机号",
            key: "encryptPhone",
            minWidth: 100,
            align: "center",
          },
          {
            title: "医院",
            key: "hospitalName",
            minWidth: 200,
          },
          {
            title: "申请理由",
            key: "sendRemark",
            minWidth: 150,
          },
          {
            title: "归属客服",
            key: "belongCustomerServiceName",
            minWidth: 100,
            align: "center",
          },
          {
            title: "审核状态",
            key: "checkStateText",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              if (params.row.checkStateText == "审核通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.checkStateText
                );
              } else if (params.row.checkStateText == "未审核") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.checkStateText
                );
              } else if (params.row.checkStateText == "审核不通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.checkStateText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.checkStateText
                );
              }
            },
          },
          {
            title: "申请类型",
            key: "addWorkTypeText",
            minWidth: 100,
            align: "center",
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
            title: "操作",
            key: "",
            width: 240,
            align: "center",
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
                        const { id } = params.row;

                        api.byIdContentPlatFormOrderAddWork(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              phone,
                              acceptBy,
                              addWorkType
                            } = res.data.contentPlatFormOrderAddWork;
                            this.title = "修改录单申请";
                            this.editRecordingApplicationParams.phone = phone;
                            this.editRecordingApplicationParams.acceptBy = acceptBy;
                            this.editRecordingApplicationParams.id = id;
                            this.recordingApplicationModel = true;
                          }
                        });
                      },
                    },
                  },
                  "编辑"
                ),
                h(
                      "Button",
                      {
                        props: {
                          type: "primary",
                          size: "small",
                          disabled:params.row.checkStateText != "审核通过"
                          
                        },
                        style: {
                          marginRight: "5px",
                        },
                        on: {
                          click: () => {
                            const {
                              id,
                              phone,
                              hospitalId,
                              belongCustomerServiceId,
                              createBy
                            } = params.row;
                            this.recordingNormalParams.title = "录单";
                            this.recordingNormalParams.isCustomer = "是";
                            this.recordingNormalParams.phone = phone;
                            this.recordingNormalParams.hospitalId = hospitalId;
                            this.recordingNormalParams.acceptBy = createBy;
                            this.recordingNormalParams.belongEmpId = belongCustomerServiceId;
                            this.recordingModel = true;
                          },
                        },
                      },
                      "录单"
                    )
                  ,
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
                        const { id } = params.row;
                        this.transferModel = true
                        this.transferParams.id =id
                      },
                    },
                  },
                  "转移"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small",
                      disabled: params.row.checkStateText == "审核通过",
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "作废提示",
                          content: "是否确认作废？",
                          onOk: () => {
                            const { id } = params.row;
                            api
                              .deleteContentPlatFormOrderAddWork(id)
                              .then((res) => {
                                if (res.code === 0) {
                                  this.getContentPlatFormOrderAddWork();
                                  this.$Message.success({
                                    content: "作废成功",
                                    duration: 3,
                                  });
                                }
                              });
                          },
                          onCancel: () => {},
                        });
                      },
                    },
                  },
                  "作废"
                ),
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },
      // 编辑录单参数
      title: "",
      editRecordingApplicationParams:{
        id:'',
        phone: "",
        acceptBy:null,
        employee:[],
        // 申请类型数组
        contentPlatformOrderAddWorkTypeList:[],
      },
      // 添加录单申请
      addRecordingModel:false,
      
      id: "",
      // 编辑录单
      recordingApplicationModel: false,

      // 录单
      recordingModel: false,
      //录单参数
      recordingNormalParams: {
        // 客服
        employeeList: [],
        // 平台
        contentPalteForms: [],
        // 科室
        AmiyaHospitalDepartmentListDepartment: [],
        // 内容平台订单类型
        statusCodeArr2: [],
        // 预约门店
        hospitalNameList: [],
        // 内容平台订单来源
        orderSourcesList: [],
        // 面诊类型列表
        consultationTypeList: [],
        //
        belongMonthList: [],
        // 弹窗标题
        title: "",
        // 手机号
        phone: "",
        // 客服
        belongEmpId: null,
        hospitalId: null,
        // 是否为辅助客服
        isCustomer: "",
        // 辅助客服（接收人）
        acceptBy:null
      },
      // 商品
      AmiyaHospitalDepartmentList: [],
      // 转移
      transferModel:false,
      transferParams:{
        id:'',
        // 所有员工
        employee:[]
      },
    };
  },
  methods: {
    // 获取申请类型
    getContentPlatformOrderAddWorkTypeList(){
      api.getContentPlatformOrderAddWorkTypeList().then(res=>{
        if(res.code===0){
          const {contentPlatformOrderAddWorkTypeList} = res.data
          this.editRecordingApplicationParams.contentPlatformOrderAddWorkTypeList = contentPlatformOrderAddWorkTypeList
        }
      })
    },
    // 获取所有员工
    getEmployeeByPositionId(){
      const data ={
        // 线上职位id
        positionId:29
        // 测试1
        // positionId:1
      }
      emApi.getEmployeeByPositionId(data).then(res=>{
        if(res.code===0){
          this.transferParams.employee = res.data.employee
          this.editRecordingApplicationParams.employee = res.data.employee
        }
      })
    },
    //   获取平台（下拉框）
    getContentValidList() {
      contentPlatForm.getContentPlatFormValidList().then((res) => {
        if (res.code === 0) {
          const { contentPalteForms } = res.data;
          this.contentPalteForms = contentPalteForms;
          this.recordingNormalParams.contentPalteForms = contentPalteForms;
        }
      });
    },
    // 获取合作过的医院列表
    getHospitalList() {
      orderApi.getHospitalList().then((res) => {
        if (res.code === 0) {
          const { hospitalInfo } = res.data;
          this.recordingNormalParams.hospitalNameList = hospitalInfo;
        }
      });
    },
    //  获取内容平台订单类型
    getcontentPlateFormOrderTypeList() {
      orderApi.getcontentPlateFormOrderTypeList().then((res) => {
        if (res.code === 0) {
          this.recordingNormalParams.statusCodeArr2 = res.data.orderTypes;
        }
      });
    },
    //   获取 面诊类型列表（下拉框）
    getOrderConsultationTypeList() {
      orderApi.getOrderConsultationTypeList().then((res) => {
        if (res.code === 0) {
          const { orderConsultationTypes } = res.data;
          this.recordingNormalParams.consultationTypeList = orderConsultationTypes;
        }
      });
    },

    //   获取内容平台订单来源
    getcontentPlateFormOrderSourceList() {
      orderApi.contentPlateFormOrderSourceList().then((res) => {
        if (res.code === 0) {
          const { orderSources } = res.data;
          this.recordingNormalParams.orderSourcesList = orderSources;
        }
      });
    },
    //   获取科室
    getAmiyaHospitalDepartmentListChange() {
      orderApi.getAmiyaHospitalDepartmentList().then((res) => {
        if (res.code === 0) {
          const { AmiyaHospitalDepartmentList } = res.data;
          this.recordingNormalParams.AmiyaHospitalDepartmentListDepartment = AmiyaHospitalDepartmentList;
        }
      });
    },
    // 获取商品名称和id
    getgetAmiyaHospitalDepartmentList(value) {
      const data = {
        hospitalDepartmentId: value,
      };
      orderApi.getgetAmiyaHospitalDepartmentList(data).then((res) => {
        if (res.code === 0) {
          const { AmiyaGoodsDemandList } = res.data;
          this.AmiyaHospitalDepartmentList = AmiyaGoodsDemandList;
        }
      });
    },
    // 科室change
    departmentChange(value) {
      if (!value) {
        return;
      }
      this.getgetAmiyaHospitalDepartmentList(value);
    },
    // 获取客服列表
    getCustomerServiceList() {
      orderApi.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.recordingNormalParams.employeeList = employee;
        }
      });
    },
    // 获取录单申请列表
    getContentPlatFormOrderAddWork() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });

      const {
        pageNum,
        pageSize,
        keyWord,
        startDate,
        endDate,
        hospitalId,
        checkState,
        createBy,
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
        hospitalId: hospitalId == -1 ? null : hospitalId,
        checkState: checkState == -1 ? null : checkState,
        createBy: sessionStorage.getItem("employeeId"),
      };
      api.ContentPlatFormOrderAddWork(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.contentPlatFormOrderAddWork;
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
        hospitalId,
        checkState,
        createBy,
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
        hospitalId: hospitalId == -1 ? null : hospitalId,
        checkState: checkState == -1 ? null : checkState,
        createBy: sessionStorage.getItem("employeeId"),
      };
      api.ContentPlatFormOrderAddWork(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.contentPlatFormOrderAddWork;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
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
                this.getContentPlatFormOrderAddWork();
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
                this.getContentPlatFormOrderAddWork();
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
    this.getHospitalList();
    this.getcontentPlateFormOrderTypeList();
    this.getOrderConsultationTypeList();
    this.getcontentPlateFormOrderSourceList();
    this.getAmiyaHospitalDepartmentListChange();
    this.getCustomerServiceList();
    this.getContentValidList();
    this.getEmployeeByPositionId();
    this.getContentPlatformOrderAddWorkTypeList()
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "mySubmit") {
          this.getContentPlatFormOrderAddWork();
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
