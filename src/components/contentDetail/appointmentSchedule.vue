<template>
  <div>
    <Modal
      v-model="controlModal"
      title="生成预约日程"
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
                disabled
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
                disabled
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
                  v-for="item in appointmentParams.appointmentTypeList"
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
                disabled
              >
                <Option
                  v-for="item in appointmentParams.emergencyLevelsList"
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
                disabled
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
              <i-switch v-model="form.isFinish" disabled/>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="备注" prop="remark">
              <Input
                v-model="form.remark"
                placeholder="请输入备注"
                type="textarea"
                :rows="5"
              ></Input>
            </FormItem>
          </Col>
          <Spin fix v-if="isLoading == true">
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
import * as api from "@/api/customerAppointmentSchedule";
import * as apis from "@/api/goodsManage";

export default {
  props: {
    appointmentScheduleModel: Boolean,
    appointmentParams: Object,
    detailObj:Object
  },
  data() {
    return {
      hospitalInfo:[],
      isLoading:false,
      controlModal: false,
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
        importantType: 3,
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
    };
  },
  methods: {
    // 获取医院列表（select）
    getHospital() {
      apis.getHospitalnameList().then((res) => {
        if (res.code === 0) {
          const { hospitalInfo } = res.data;
          this.hospitalInfo = hospitalInfo;
        }
      });
    },
    handleCancel(name) {
      this.$emit("update:appointmentScheduleModel", false);
      this.$refs[name].resetFields();
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {customerName,phone,appointmentDate,appointmentType,appointmentHospitalId,isFinish,importantType,remark,consultation} = this.form
          const data = {
            customerName,
            phone,
            appointmentDate:this.$moment(appointmentDate).format("YYYY-MM-DD"),
            appointmentType,
            appointmentHospitalId,
            isFinish,
            importantType,
            remark,
            consultation
          }
          this.isLoading = true;
          api.addCustomerAppointmentSchedule(data).then((res) => {
            if (res.code === 0) {
              this.isLoading = false;
              this.handleCancel("form");
              this.$Message.success({
                content: "已生成预约日程",
                duration: 3,
              });
            } else {
              setTimeout(() => {
                this.isLoading = false;
              }, 3000);
            }
          });
        }
      });
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel("form");
      }
    },
  },
  created(){
    this.getHospital()
  },
  watch: {
    appointmentScheduleModel(value) {
      this.controlModal = value;
      if(this.detailObj){
        this.form.customerName = this.detailObj.customerName
        this.form.phone = this.detailObj.phone
        this.form.remark = this.detailObj.consultingContent
        this.form.appointmentHospitalId = this.detailObj.appointmentHospitalId
        this.form.consultation = this.detailObj.sceneConsulationName
      }
    },
  },
};
</script>
