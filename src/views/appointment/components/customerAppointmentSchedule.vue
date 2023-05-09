<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyWord"
            placeholder="请输入关键字"
            style="width: 200px; "
            @keyup.enter.native="getCustomerAppointmentSchedule()"
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
            v-model="query.importantType"
            placeholder="请选择重要程度"
            filterable
            style="width: 150px; margin-left: 10px"
          >
            <Option
              v-for="item in query.emergencyLevelListAll"
              :value="item.emergencyLevel"
              :key="item.emergencyLevel"
              >{{ item.emergencyLevelText }}</Option
            >
          </Select>
          <Select
            v-model="query.appointmentType"
            placeholder="请选择预约类型"
            filterable
            style="width: 150px; margin-left: 10px"
          >
            <Option
              v-for="item in appointmentTypeListAll"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.isFinish"
            placeholder="请选择完成情况"
            filterable
            style="width: 150px; margin-left: 10px"
          >
            <Option
              v-for="item in isFinishList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getCustomerAppointmentSchedule()"
            >查询</Button
          >
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="batchAssignmentClick"
            >批量指派主播</Button
          >
        </div>
        <div class="right">
          <Button
            type="primary"
            @click="
              controlModal = true;
              title = '添加';
            "
            >添加</Button
          >
        </div>
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table
          border
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          show-total
          show-elevator
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

    <Modal
      v-model="controlModal"
      :title="title"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="60%"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="120"
      >
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="客户昵称" prop="customerName">
              <Input
                v-model="form.customerName"
                placeholder="请输入客户昵称"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="手机号" prop="phone">
              <Input
                v-model="form.phone"
                placeholder="请输入手机号"
                type="number"
                maxlength="11"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="预约类型" prop="appointmentType">
              <Select
                v-model="form.appointmentType"
                placeholder="请选择预约类型"
                filterable
              >
                <Option
                  v-for="item in appointmentTypeList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="预约时间" prop="appointmentDate" key="预约时间">
              <DatePicker
                type="date"
                placeholder="请选择预约时间"
                style="width: 100%"
                v-model="form.appointmentDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="重要程度" prop="importantType" key="重要程度">
              <Select
                v-model="form.importantType"
                placeholder="请选择重要程度"
                filterable
              >
                <Option
                  v-for="item in emergencyLevelsList"
                  :value="item.emergencyLevel"
                  :key="item.emergencyLevel"
                  >{{ item.emergencyLevelText }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="预约医院" prop="appointmentHospitalId">
              <Select
                v-model="form.appointmentHospitalId"
                placeholder="请选择预约医院"
                filterable
              >
                <Option
                  v-for="item in hospitalInfo"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="接诊咨询" prop="consultation">
              <Input
                v-model="form.consultation"
                placeholder="请输入接诊咨询"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否完成" prop="isFinish" key="是否完成">
              <i-switch v-model="form.isFinish" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="备注" prop="remark">
              <Input
                v-model="form.remark"
                placeholder="请输入备注"
                type="textarea"
                :rows="4"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="指派主播" prop="assignLiveanchorId">
              <Select
                v-model="form.assignLiveanchorId"
                placeholder="请选择指派主播"
                filterable
              >
                <Option
                  v-for="item in assignParams.liveAnchorBaseInfos"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>

    <!-- 指派 -->
    <assign :assignModel.sync="assignModel" :assignParams="assignParams" @getCustomerAppointmentSchedule="getCustomerAppointmentSchedule"/>
  </div>
</template>
<script>
import * as api from "@/api/customerAppointmentSchedule";
import * as apis from "@/api/goodsManage";
import * as shoppingCartRegistrationApi from "@/api/shoppingCartRegistration";
import * as orderApi from "@/api/orderManage";
import * as liveApi from "@/api/liveAnchorBaseInfo";
import assign from "./assign.vue"
export default {
  components: {assign},
  props: ["activeName"],
  data() {
    return {
      // 完成情况
      isFinishList: [
        {
          type: -1,
          name: "全部完成情况",
        },
        {
          type: "true",
          name: "已完成",
        },
        {
          type: "false",
          name: "未完成",
        },
      ],
      //重要程度
      emergencyLevelsList: [],
      //   客服
      employee: [],
      //   预约类型
      appointmentTypeList: [],
      appointmentTypeListAll: [{ id: -1, name: "全部预约类型" },],
      query: {
        // 重要程度
        emergencyLevelListAll: [{ emergencyLevel: -1, emergencyLevelText: "全部重要程度" },],
        keyWord: "",
        appointmentType:-1,
        importantType: -1,
        pageNum: 1,
        pageSize: 10,
        isFinish: -1,
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        assignLiveanchorId:null,
        columns: [
          {
            type: "selection",
            key: "_checked",
            align: "center",
            minWidth: 80,
          },
          {
            title: "创建人",
            key: "createByEmpName",
            minWidth: 150,
            align:'center'
          },
          {
            title: "指派主播",
            key: "assignLiveanchorName",
            minWidth: 150,
            align:'center'
          },
          {
            title: "客户昵称",
            key: "customerName",
            minWidth: 150,
            align:'center'
          },
          {
            title: "手机号",
            key: "phone",
            minWidth: 150,
            align:'center'
          },
          {
            title: "预约类型",
            key: "appointmentTypeText",
            minWidth: 150,
            align:'center'
          },
          {
            title: "预约时间",
            key: "appointmentDate",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.appointmentDate
                  ? this.$moment(params.row.appointmentDate).format(
                      "YYYY-MM-DD"
                    )
                  : ""
              );
            },
          },
          {
            title: "预约医院",
            key: "appointmentHospitalName",
            minWidth: 220,
            align:'center'
          },
          {
            title: "接诊咨询",
            key: "consultation",
            minWidth: 220,
            align:'center'
          },
          {
            title: "重要程度",
            key: "importantTypeText",
            minWidth: 150,
            align:'center'
          },
          {
            title: "是否完成",
            key: "phone",
            minWidth: 150,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.isFinish == true ? "已完成" : "未完成"
              );
            },
          },
          
          {
            title: "备注",
            key: "remark",
            tooltip: true,
            minWidth: 300,
            align:'center'
          },
          

          {
            title: "操作",
            align: "center",
            minWidth: 210,
            fixed: "right",
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
                        const { id } = params.row;
                        this.assignParams.title = "指派主播"
                        this.assignParams.id = id
                        this.assignModel = true
                      },
                    },
                  },
                  "指派主播"
                ),
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
                        const { id } = params.row;
                        this.title = "修改";
                        api.byIdCustomerAppointmentSchedule(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              appointmentType,
                              appointmentDate,
                              customerName,
                              importantType,
                              isFinish,
                              phone,
                              remark,
                              appointmentHospitalId,
                              consultation,
                              assignLiveanchorId
                            } = res.data.customerAppointmentScheduleInfo;
                            this.isEdit = true;
                            this.form.id = id;
                            this.form.appointmentType = String(appointmentType);
                            this.form.appointmentDate = appointmentDate;
                            this.form.customerName = customerName;
                            this.form.importantType = importantType;
                            this.form.isFinish = isFinish;
                            this.form.phone = phone;
                            this.form.remark = remark;
                            this.form.appointmentHospitalId = appointmentHospitalId;
                            this.form.consultation = consultation;
                            this.form.assignLiveanchorId = assignLiveanchorId;
                            this.controlModal = true;
                          }
                        });
                      },
                    },
                  },
                  "修改"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "删除提示",
                          content: "是否确认删除？",
                          onOk: () => {
                            const { id } = params.row;
                            api.deleteCustomerAppointmentSchedule(id).then((res) => {
                              if (res.code === 0) {
                                this.getCustomerAppointmentSchedule();
                                this.$Message.success({
                                  content: "删除成功",
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
                  "删除"
                ),
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },

      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        id: "",
        // 客户昵称
        customerName: "",
        // 手机号
        phone: "",
        // 预约类型
        appointmentType: null,
        // 预约时间
        appointmentDate: "",
        // 是否完成
        isFinish: false,
        // 重要程度
        importantType: null,
        // 备注
        remark: "",
        // 预约医院
        appointmentHospitalId:null,
        // 接诊咨询
        consultation:''
      },

      ruleValidate: {
        customerName: [
          {
            required: true,
            message: "请输入客户昵称",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入客户手机号",
          },
        ],
        appointmentType: [
          {
            required: true,
            message: "请选择预约类型",
          },
        ],
        appointmentDate: [
          {
            required: true,
            message: "请选择预约时间",
          },
        ],
        importantType: [
          {
            required: true,
            message: "请选择重要程度",
          },
        ],
      },
      // 医院
      hospitalInfo:[],
      // 指派
      assignModel:false,
      assignParams:{
        title:"",
        // 主播
        liveAnchorBaseInfos:[],
        // 单个指派id
        id:'',
        // 批量指派
        idList: new Set(),
      }
    };
  },
  methods: {
    // 批量指派
    batchAssignmentClick() {
      if (![...this.assignParams.idList].length) {
        this.$Message.warning({
          content: "请选择订单",
          duration: 3,
        });
        return;
      }
      this.assignModel = true;
      this.assignParams.title = '批量指派主播'
    },
    handleSelect(selection, row) {
      // 批量指派
      this.assignParams.idList.add(row.id);
    },

    handleCancels(selection, row) {
      // 批量指派
      this.assignParams.idList.delete(row.id);
    },

    handleSelectAll(selection) {
      if (selection && selection.length === 0) {
        this.assignParams.idList.clear();
      } else {
        selection.forEach((item) => {
          this.assignParams.idList.add(item.id);
        });
      }
    },
    // 获取主播基础信息列表
    getLiveAnchorBaseInfoValid(){
      liveApi.getLiveAnchorBaseInfoValid().then((res) => {
        if(res.code === 0){
          const {liveAnchorBaseInfos} = res.data
          this.assignParams.liveAnchorBaseInfos = liveAnchorBaseInfos
        }
      })
    },
    // 获取医院列表（select）
    getHospital() {
      apis.getHospitalnameList().then((res) => {
        if (res.code === 0) {
          const { hospitalInfo } = res.data;
          this.hospitalInfo = hospitalInfo;
        }
      });
    },
    // 预约类型
    getAppointmentTypeList() {
      api.getAppointmentTypeList().then((res) => {
        if (res.code === 0) {
          const { appointmentTypeList } = res.data;
          this.appointmentTypeList = appointmentTypeList;
          this.appointmentTypeListAll = [...this.appointmentTypeListAll,...appointmentTypeList];
        }
      });
    },
    // 获取客服列表
    getCustomerServiceList() {
      orderApi.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employee = employee;
        }
      });
    },
    // 紧急程度（下拉框）
    getEmergencyLevels() {
      shoppingCartRegistrationApi.emergencyLevels().then((res) => {
        if (res.code === 0) {
          const { emergencyLevels } = res.data;
          this.emergencyLevelsList = emergencyLevels;
          this.query.emergencyLevelListAll = [
            ...this.query.emergencyLevelListAll,
            ...emergencyLevels,
          ];
        }
      });
    },
    // 获取客户预约日程列表
    getCustomerAppointmentSchedule() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        keyWord,
        startDate,
        endDate,
        isFinish,
        importantType,
        appointmentType
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        isFinish: isFinish == -1 ? null : isFinish,
        importantType: importantType == -1 ? null : importantType,
        appointmentType: appointmentType == -1 ? null : appointmentType,

      };
      api.getCustomerAppointmentSchedule(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customerAppointmentScheduleInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
          this.assignParams.idList.clear();
        }
      });
    },

    // 获取客户预约日程列表分页
    handlePageChange(pageNum) {
      const {
        pageSize,
        keyWord,
        startDate,
        endDate,
        isFinish,
        importantType,
        appointmentType
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        isFinish: isFinish == -1 ? null : isFinish,
        importantType: importantType == -1 ? null : importantType,
        appointmentType: appointmentType == -1 ? null : appointmentType,
      };
      api.getCustomerAppointmentSchedule(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customerAppointmentScheduleInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
          this.assignParams.idList.clear();
        }
      });
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            phone,
            customerName,
            id,
            appointmentType,
            appointmentDate,
            isFinish,
            importantType,
            remark,
            appointmentHospitalId,
            consultation,
            assignLiveanchorId
          } = this.form;
          if (phone) {
            if (!/^1[3456789]\d{9}$/.test(phone)) {
              this.$Message.warning("请输入正确的手机号");
              return false;
            }
          }
          if (this.isEdit) {
            // 修改
            const data = {
              id,
              phone,
              customerName,
              appointmentType,
              appointmentDate: this.$moment(new Date(appointmentDate)).format(
                "YYYY-MM-DD"
              ),
              isFinish,
              importantType,
              remark,
              appointmentHospitalId,
            consultation,
            assignLiveanchorId
            };
            api.updateCustomerAppointmentSchedule(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getCustomerAppointmentSchedule();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            // 添加
            const data = {
              customerName,
              phone,
              appointmentType,
              appointmentDate: this.$moment(new Date(appointmentDate)).format(
                "YYYY-MM-DD"
              ),
              isFinish,
              importantType,
              remark,
              appointmentHospitalId,
            consultation,
            assignLiveanchorId
            };
            api.addCustomerAppointmentSchedule(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getCustomerAppointmentSchedule();
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
    this.getEmergencyLevels();
    this.getCustomerServiceList();
    this.getAppointmentTypeList();
    this.getHospital()
    this.getLiveAnchorBaseInfoValid()
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "customerAppointmentSchedule") {
          this.getCustomerAppointmentSchedule();
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
