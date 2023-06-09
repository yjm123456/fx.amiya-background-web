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
            <FormItem label="预约日期" prop="appointmentDate" key="预约日期">
              <DatePicker
                type="date"
                placeholder="请选择预约日期"
                style="width: 100%"
                v-model="form.appointmentDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="预约时间" prop="time" key="预约时间">
              <TimePicker
                format="HH:mm"
                placeholder="请选择预约时间"
                style="width: 100%"
                :disabled-minutes="[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,
                ]"
                hide-disabled-options
                v-model="form.time"
              />
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
          <Col span="8">
            <FormItem label="顾客照片" prop="customerPic" key="customerPic">
              <upload
                :uploadObj="uploadObj"
                @uploadChange="handleUploadChange"
              />
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
import upload from "@/components/upload/upload";
import * as orderApi from "@/api/orderManage";

export default {
  props: {
    appointmentScheduleModel: Boolean,
    appointmentParams: Object,
    detailObj:Object
  },
  components:{
    upload
  },
  data() {
    return {
      hospitalInfo:[],
      isLoading:false,
      controlModal: false,
      uploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 3,
        // 文件列表
        uploadList: [],
      },
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
        // 预约时间
        time: "",
        // 是否完成
        isFinish: false,
        // 重要程度
        importantType: 3,
        // 备注
        remark: "",
        // 预约医院
        appointmentHospitalId:null,
        // 接诊咨询
        consultation:'',
        // 顾客照片
        customerPic: [],
        
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
        time: [
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
    getCustomerPic(orderId){
      const data = {
        pageNum:1,
        pageSize:5,
        contentPlatFormOrderId:orderId,
        description:'顾客照片'
      }
      orderApi.ContentPlatFormCustomerPicture(data).then(res=>{
        if(res.code ==0){
          const {list} = res.data.contentPlatFormCustomerPictureInfo
          if(list){
            list.map(item=>{
              this.uploadObj.uploadList.push(item.customerPicture)
            })
          }
          
        }
      })
    },
    // 图片
    handleUploadChange(values) {
      this.uploadObj.uploadList = values;
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
    handleCancel(name) {
      this.$emit("update:appointmentScheduleModel", false);
      this.uploadObj.uploadList = [];
      this.$refs[name].resetFields();
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {customerName,phone,appointmentDate,appointmentType,appointmentHospitalId,isFinish,importantType,remark,consultation,time,customerPic} = this.form
          const data = {
            customerName,
            phone,
            appointmentDate:this.$moment(appointmentDate).format("YYYY-MM-DD"),
            appointmentType,
            appointmentHospitalId,
            isFinish,
            importantType,
            remark,
            consultation,
            appointmentDate:this.$moment(new Date(appointmentDate)).format("YYYY-MM-DD") + "T" + time + ":00",
            customerPic1: this.uploadObj.uploadList.length > 0 ? this.uploadObj.uploadList[0] : "",
            customerPic2: this.uploadObj.uploadList.length > 1 ? this.uploadObj.uploadList[1] : "",
            customerPic3: this.uploadObj.uploadList.length > 2 ? this.uploadObj.uploadList[2] : "",
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
      // 获取顾客照片
      if(value == true){
        this.getCustomerPic(this.appointmentParams.orderId)
      }
      
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
