<template>
  <div>
    <!-- 录单 -->
    <Modal
      v-model="control"
      :title="recordingNormalParams.title"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="1000"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidates"
        label-position="left"
        :label-width="110"
      >
        <Row :gutter="30">
          <Col span="8">
            <FormItem
              label="绑定客服"
              prop="belongEmpId"
              :rules="[
                {
                  required: true,
                  message: '请选择绑定客服',
                },
              ]"
            >
              <Select
                v-model="form.belongEmpId"
                placeholder="请选择绑定客服"
                filterable
                disabled
              >
                <Option
                  v-for="item in recordingNormalParams.employeeList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <!-- 客服和客服管理员不能更改（positionId==2 || positionId==4） :disabled="title=='录单编辑' && (positionId==2 || positionId==4)"-->
          <Col span="8">
            <FormItem label="主播平台" prop="contentPlateFormId">
              <Select
                v-model="form.contentPlateFormId"
                placeholder="请选择主播平台"
                @on-change="contentPlateChange(form.contentPlateFormId)"
                filterable
                :disabled="
                  recordingNormalParams.title == '录单编辑' &&
                    buttonFlag == false
                "
              >
                <Option
                  v-for="item in recordingNormalParams.contentPalteForms"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.contentPlatformName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="主播IP账号" prop="liveAnchorId">
              <Select
                v-model="form.liveAnchorId"
                placeholder="请选择主播IP账号"
                :disabled="
                  form.contentPlateFormId === '' ||
                    (recordingNormalParams.title == '录单编辑' &&
                      buttonFlag == false)
                "
                filterable
                @on-change="liveAnchorChange(form.liveAnchorId)"
              >
                <Option
                  v-for="(item, index) in liveAnchors"
                  :value="item.id"
                  :key="index"
                  >{{ item.hostAccountName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="主播微信号" prop="liveAnchorWeChatNo">
              <Select
                v-model="form.liveAnchorWeChatNo"
                placeholder="请选择主播微信号"
               
                filterable
              >
                <Option
                  v-for="(item, indexs) in weChatList"
                  :value="item.id"
                  :key="indexs"
                  >{{ item.weChatNo }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="科室" prop="hospitalDepartmentId">
              <Select
                v-model="form.hospitalDepartmentId"
                placeholder="请选择科室"
                filterable
                @on-change="departmentChange(form.hospitalDepartmentId)"
              >
                <Option
                  v-for="item in recordingNormalParams.AmiyaHospitalDepartmentListDepartment"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.departmentName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="需求" prop="goodsId">
              <Select
                v-model="form.goodsId"
                placeholder="请选择需求"
                filterable
                :disabled="form.hospitalDepartmentId === ''"
              >
                <Option
                  v-for="item in AmiyaHospitalDepartmentList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.projectName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="订单类型" prop="orderType">
              <Select v-model="form.orderType" placeholder="请选择订单类型">
                <Option
                  v-for="item in recordingNormalParams.statusCodeArr2"
                  :value="item.orderType"
                  :key="item.orderType"
                  >{{ item.orderTypeText }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="定金金额"
              prop="depositAmount"
              ref="depositAmount"
              :rules="{
                required: form.orderType == 2,
                message: '请输入定金金额',
              }"
            >
              <Input
                v-model="form.depositAmount"
                type="number"
                :disabled="form.orderType == 1 || form.orderType == 3"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="预约门店" prop="appointmentHospitalId">
              <Select
                v-model="form.appointmentHospitalId"
                placeholder="请选择预约门店"
                filterable
                disabled
              >
                <Option
                  v-for="item in recordingNormalParams.hospitalNameList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <!-- <Col span="8">
            <FormItem label="预约日期" prop="appointmentDate">
              <DatePicker
                type="date"
                placeholder="预约日期"
                :value="form.appointmentDate"
                v-model="form.appointmentDate"
              ></DatePicker>
            </FormItem>
          </Col> -->
          <Col span="8">
            <FormItem label="订单来源" prop="orderSource">
              <Select
                v-model="form.orderSource"
                placeholder="请选择订单来源"
                filterable
                :disabled="
                  recordingNormalParams.title == '录单编辑' &&
                    buttonFlag == false
                "
              >
                <Option
                  v-for="item in recordingNormalParams.orderSourcesList"
                  :value="item.orderSource"
                  :key="item.orderSource"
                  >{{ item.orderSourceText }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <!-- <Col span="8">
            <FormItem label="面诊员" prop="consultationEmpId">
              <Select
                v-model="form.consultationEmpId"
                placeholder="请选择面诊员"
                filterable
              >
                <Option
                  v-for="item in consultationNameList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="接诊咨询" prop="acceptConsulting">
              <Input
                v-model="form.acceptConsulting"
                placeholder="请输入接诊咨询"
              ></Input>
            </FormItem>
          </Col> -->

          <Col span="8">
            <FormItem label="面诊类型" prop="consultationType">
              <Select
                v-model="form.consultationType"
                placeholder="请选择面诊类型"
                filterable
                :disabled="
                  recordingNormalParams.title == '录单编辑' &&
                    buttonFlag == false
                "
              >
                <Option
                  v-for="item in recordingNormalParams.consultationTypeList"
                  :value="item.orderType"
                  :key="item.orderType"
                  >{{ item.orderTypeText }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="归属月份" prop="belongMonth">
              <Select
                v-model="form.belongMonth"
                placeholder="请选择归属月份"
                filterable
              >
                <Option
                  v-for="item in belongMonthList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="下单金额"
              prop="addOrderPrice"
              :rules="{
                required: true,
                message: '请输入下单金额',
              }"
            >
              <Input
                v-model="form.addOrderPrice"
                type="number"
                number
                placeholder="请输入下单金额"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8" >
            <FormItem label="是否为辅助客服" prop="isCustomer">
              <div>
                <Radio-group v-model="form.isCustomer">
                  <Radio label="是" disabled>是</Radio>
                  <Radio label="否" disabled>否</Radio>
                </Radio-group>
              </div>
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isCustomer == '是'">
            <FormItem
              label="辅助客服"
              prop="auxiliaryCustomerService"
              :rules="[
                {
                  required: form.isCustomer == '是' ? true : false,
                  message: '请选择辅助客服',
                },
              ]"
            >
              <Select
                v-model="form.auxiliaryCustomerService"
                placeholder="请选择辅助客服"
                filterable
                disabled
              >
                <Option
                  v-for="item in recordingNormalParams.employeeList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="获客方式" prop="getCustomerType">
              <Select
                v-model="form.getCustomerType"
                placeholder="请选择获客方式"
                filterable
                
              >
                <Option
                  v-for="item in recordingNormalParams.customerTypeList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          
          <Col span="8" >
            <FormItem label="客户类型" prop="customerType" :rules="[
                    {
                      required:true,
                      message: '请输入客户类型',
                    },
                  ]">
              <Select
                v-model="form.customerType"
                placeholder="请选择客户类型"
                filterable
                
              >
                <Option
                  v-for="item in recordingNormalParams.shoppingCartRegistrationCustomerTypeList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="客户来源" prop="customerSource">
              <Select
                v-model="form.customerSource"
                placeholder="请选择客户来源"
                filterable
              >
                <Option
                  v-for="item in recordingNormalParams.sourceList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
        </Row>
        <div class="h3">客户信息</div>
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
                maxlength="20"
                placeholder="请输入手机号"
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="性别" prop="sex">
              <div>
                <Radio-group v-model="form.sex">
                  <Radio label="男">男</Radio>
                  <Radio label="女">女</Radio>
                </Radio-group>
              </div>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="生日" prop="birthday">
              <DatePicker
                type="date"
                placeholder="选择日期"
                :value="form.birthday"
                v-model="form.birthday"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="职业" prop="occupation">
              <Input v-model="form.occupation" placeholder="请输入职业" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="微信备注" prop="wechatNumber">
              <Input v-model="form.wechatNumber" placeholder="请输入微信备注" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="城市" prop="city">
              <Input v-model="form.city" placeholder="请输入城市" />
            </FormItem>
          </Col>
          <Col span="20">
            <FormItem label="顾客照片" prop="imageUrl" key="customerPictures">
              <upload
                :uploadObj="customerUploadObj"
                @uploadChange="customerHandleUploadChange"
              />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="12">
            <FormItem label="咨询内容" prop="consultingContent">
              <Input
                v-model="form.consultingContent"
                type="textarea"
                :rows="5"
                placeholder="请输入咨询内容"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="未派单原因" prop="unSendReason">
              <Input
                v-model="form.unSendReason"
                type="textarea"
                :rows="5"
                placeholder="请输入未派单原因"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="12">
            <FormItem label="后期项目铺垫" prop="lateProjectStage">
              <Input
                v-model="form.lateProjectStage"
                type="textarea"
                :rows="5"
                placeholder="请输入后期项目铺垫"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="备注" prop="remark">
              <Input
                v-model="form.remark"
                type="textarea"
                :rows="5"
                placeholder="请输入备注"
              ></Input>
            </FormItem>
          </Col>
          <Spin fix v-if="flag == true">
            <Icon
              type="ios-loading"
              size="18"
              class="demo-spin-icon-load"
            ></Icon>
            <div>加载中...</div>
          </Spin>
        </Row>
      </Form>

      <div slot="footer">
        <Button @click="handleCancel('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
import * as liveAnchorApi from "@/api/liveAnchorWechatInfo";

import upload from "@/components/upload/upload";
export default {
  components: {
    upload,
  },
  props: {
    recordingModel: Boolean,
    recordingNormalParams: Object,
  },
  data() {
    return {
      flag: false,
      // 按钮权限
      buttonFlag: false,
      control: false,
      form: {
        //   订单类型（1：咨询:2：定金）
        orderType: "",
        //   内容平台id（下单平台）
        contentPlateFormId: "",
        // 主播账号id
        liveAnchorId: "",
        // 主播微信号
        liveAnchorWeChatNo: "",
        // 客户昵称
        customerName: "",
        // 手机号
        phone: "",
        // 预约日期
        appointmentDate: "",
        // 预约门店
        appointmentHospitalId: "",
        // 定金金额
        depositAmount: "",
        // 项目id
        goodsId: "",
        // 咨询内容
        consultingContent: "",
        // 备注
        remark: "",
        // 铺垫
        lateProjectStage: "",
        id: "",
        // 科室
        hospitalDepartmentId: "",
        // 订单来源
        orderSource: null,
        // 未派单原因
        unSendReason: "",
        // 接诊咨询
        acceptConsulting: "",
        // 顾客照片（最多上传5张）
        customerPictures: [],
        // 录单人员
        belongEmpId: Number(sessionStorage.getItem("employeeId"))
          ? Number(sessionStorage.getItem("employeeId"))
          : "",
        // 面诊人员
        consultationEmpId: null,
        // 面诊类型
        consultationType: 0,
        // 归属月份
        belongMonth: null,
        // 下单金额
        addOrderPrice: null,
        // 性别
        sex: "",
        // 生日
        birthday: null,
        // 职业
        occupation: "",
        // 微信号
        wechatNumber: "",
        // 城市
        city: "",
        // 是否为辅助客服
        isCustomer: "",
        // 辅助客服
        auxiliaryCustomerService: null,
        // 获客方式
        getCustomerType:null,
        // 客户来源
        customerSource:null,
        // 客户类型
        customerType:null,
      },
      ruleValidates: {
        sex: [
          {
            required: true,
            message: "请选择性别",
          },
        ],
        getCustomerType: [
          {
            required: true,
            message: "请选择获客方式",
          },
        ],
         customerSource: [
          {
            required: true,
            message: "请选择客户来源",
          },
        ],
        customerType: [
          {
            required: true,
            message: "请选择客户类型",
          },
        ],
        city: [
          {
            required: true,
            message: "请输入城市",
          },
        ],
        belongMonth: [
          {
            required: true,
            message: "请选择归属月份",
          },
        ],
        // consultationType: [
        //   {
        //     required: true,
        //     message: "请选择面诊类型",
        //   },
        // ],
        consultationEmpId: [
          {
            required: true,
            message: "请输入面诊人",
          },
        ],
        orderSource: [
          {
            required: true,
            message: "请选择订单来源",
          },
        ],
        hospitalDepartmentId: [
          {
            required: true,
            message: "请选择科室",
          },
        ],
        contentPlateFormId: [
          {
            required: true,
            message: "请选择主播平台",
          },
        ],
        liveAnchorId: [
          {
            required: true,
            message: "请选择IP账号",
          },
        ],
        liveAnchorWeChatNo: [
          {
            required: true,
            message: "请选择主播微信号",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
          },
        ],
        customerName: [
          {
            required: true,
            message: "请输入客户昵称",
          },
        ],

        goodsId: [
          {
            required: true,
            message: "请选择需求",
          },
        ],
        // depositAmount: [
        //   {
        //     required: true,
        //     message: "请输入付款金额",
        //   },
        // ],
        orderType: [
          {
            required: true,
            message: "请选择订单状态",
          },
        ],
        appointmentHospitalId: [
          {
            required: true,
            message: "请选择预约门店",
          },
        ],
        buyerNick: [
          {
            required: true,
            message: "请输入客户昵称",
          },
        ],
      },
      //   主播ip
      liveAnchors: [],
      // 主播微信号
      weChatList: [],
      // 需求
      AmiyaHospitalDepartmentList: [],
      // 归属月份
      belongMonthList: [
        {
          id: 0,
          name: "当月",
        },
        {
          id: 1,
          name: "历史",
        },
      ],
      customerUploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 5,
        // 文件列表
        uploadList: [],
      },
      flag: false,
    };
  },
  methods: {
    // 顾客照片
    customerHandleUploadChange(values) {
      this.form.customerPictures = values;
    },
    // 科室change
    departmentChange(value) {
      if (!value) {
        return;
      }
      this.getgetAmiyaHospitalDepartmentList(value);
    },
    // 获取商品名称和id
    getgetAmiyaHospitalDepartmentList(value) {
      const data = {
        hospitalDepartmentId: value,
      };
      api.getgetAmiyaHospitalDepartmentList(data).then((res) => {
        if (res.code === 0) {
          const { AmiyaGoodsDemandList } = res.data;
          this.AmiyaHospitalDepartmentList = AmiyaGoodsDemandList;
        }
      });
    },
    // 根据平台id去获取IP账号
    getLiveValidList(value) {
      const data = {
        contentPlatFormId: value,
      };
      api.getLiveValidList(data).then((res) => {
        if (res.code === 0) {
          const { liveAnchors } = res.data;
          this.liveAnchors = liveAnchors;
        }
      });
    },
    //
    contentPlateChange(value) {
      if (!value) {
        return;
      }
      this.form.liveAnchorWeChatNo = "";
      this.getLiveValidList(value);
    },
    //
    liveAnchorChange(value) {
      if (!value) {
        return;
      }
      // this.getWeChatList(value);
    },
    //  根据主播获取主播微信号
    getWeChatList(value) {
      const data = {
        liveanchorId: '',
      };
      liveAnchorApi.getvalidList(data).then((res) => {
        if (res.code === 0) {
          const { liveAnchorWechatInfos } = res.data;
          this.weChatList = liveAnchorWechatInfos;
        }
      });
    },
    // 提交
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.recordingNormalParams.title == "录单") {
            const {
              orderType,
              contentPlateFormId,
              phone,
              liveAnchorId,
              customerName,
              appointmentDate,
              appointmentHospitalId,
              depositAmount,
              goodsId,
              consultingContent,
              remark,
              lateProjectStage,
              hospitalDepartmentId,
              orderSource,
              unSendReason,
              acceptConsulting,
              customerPictures,
              belongEmpId,
              consultationEmpId,
              liveAnchorWeChatNo,
              consultationType,
              addOrderPrice,
              belongMonth,
              sex,
              birthday,
              occupation,
              wechatNumber,
              city,
              isCustomer,
              auxiliaryCustomerService,
              getCustomerType,
              customerSource,
              customerType
            } = this.form;
            const data = {
              orderType,
              contentPlateFormId,
              phone,
              liveAnchorId,
              customerName,
              appointmentDate: appointmentDate
                ? this.$moment(appointmentDate).format("YYYY-MM-DD")
                : null,
              appointmentHospitalId,
              depositAmount: depositAmount ? depositAmount : 0,
              goodsId,
              consultingContent,
              remark,
              lateProjectStage,
              hospitalDepartmentId,
              orderSource,
              unSendReason,
              acceptConsulting,
              customerPictures,
              belongEmpId,
              consultationEmpId: consultationEmpId ? consultationEmpId : 0,
              liveAnchorWeChatNo,
              consultationType,
              addOrderPrice,
              belongMonth,
              sex,
              birthday: birthday
                ? this.$moment(birthday).format("YYYY-MM-DD")
                : null,
              occupation,
              wechatNumber,
              city,
              isSupportOrder: isCustomer == "否" ? false : true,
              supportEmpId: isCustomer == '否' ? 0 : ( auxiliaryCustomerService ? auxiliaryCustomerService : 0),
                getCustomerType,
              customerSource,
              customerType
            };
           
            if (phone) {
              // if (!/^1[3456789]\d{9}$/.test(phone)) {
              //   this.$Message.error("请输入正确的手机号");
              //   return false;
              // }
              this.flag = true;
              api.AddContentPlateFormAddOrder(data).then((res) => {
                if (res.code === 0) {
                  this.flag = false;
                  this.handleCancel("form");
                  this.$Message.success({
                    content: "录单成功，请到订单列表查看！",
                    duration: 3,
                  });
                }else {
                  setTimeout(() => {
                    this.flag = false;
                  }, 3000);
                }
              });
            }
          }
        }
      });
    },
    // 取消
    handleCancel(name) {
      this.isEdit = false;
      this.title = "录单";
      this.controlModal = false;
      this.customerUploadObj.uploadList = [];
      this.$refs[name].resetFields();
      this.$emit("update:recordingModel", false);
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.title = "录单";
        this.customerUploadObj.uploadList = [];
        // this.$emit("update:editRecordingModel", false);
        this.$emit("update:recordingModel", false);
        this.$refs["form"].resetFields();
      }
    },
    
  },
  created() {
    this.getWeChatList()
  },
  watch: {
    recordingModel(value) {
      this.control = value;
      this.form.belongEmpId = Number(this.recordingNormalParams.belongEmpId);
      this.form.phone = this.recordingNormalParams.phone;
      this.form.isCustomer = this.recordingNormalParams.isCustomer;
      this.form.appointmentHospitalId = this.recordingNormalParams.hospitalId;
      this.form.auxiliaryCustomerService = this.recordingNormalParams.acceptBy;
      const currentRole = JSON.parse(sessionStorage.getItem("permissions"));
      const flag = currentRole.some((ele) => {
        return "fx.amiya.permission.UPDATE_CONTENT_PLAT_FORM_ORDER".includes(
          ele
        );
      });
      this.buttonFlag = flag;
    },
  },
};
</script>
<style scoped>
.content {
  text-align: center;
}
.green {
  color: green;
  margin: 20px 0;
}
.red {
  color: red;
  margin: 20px 0;
}
.ts {
  margin-top: 20px;
}
.h3 {
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin-bottom: 20px;
}
</style>
