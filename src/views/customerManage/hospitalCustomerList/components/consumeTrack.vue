<template>
  <div>
    <Modal
      @on-visible-change="close"
      :mask-closable="false"
      title="添加客户在医院的消费信息"
      width = "1000"
      v-model="control"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="110"
      >
        <Row :gutter="30">
          <Col span="8">
              <FormItem label="项目名称" prop="itemName">
                <Input
                  v-model="form.itemName"
                  style="width: 100%"
                  placeholder="请输入项目名称"
                ></Input>
              </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="金额" prop="price">
              <InputNumber
                v-model="form.price"
                style="width: 100%"
                placeholder="请输入金额"
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="消费类型" prop="consumeType">
              <Select v-model="form.consumeType" placeholder="请选择消费类型">
                <Option
                  :value="item.value"
                  v-for="item in consumeTypeList"
                  :key="item.value"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="客户昵称" prop="nickName"  >
              <Input v-model="form.nickName" placeholder="请输入客户昵称"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="升单类型" prop="buyAgainType" key="升单类型">
              <Select
                v-model="form.buyAgainType"
                placeholder="请选择升单类型"
                filterable
              >
                <Option
                  v-for="item in buyAgainType"
                  :value="item.type"
                  :key="item.type"
                  >{{ item.typeText }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="升单日期" prop="buyAgainTime"  >
              <DatePicker
                type="date"
                placeholder="升单日期"
                style="width: 200px"
                :value="form.buyAgainTime"
                v-model="form.buyAgainTime"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="人次" prop="personTime">
              <Input v-model="form.personTime" placeholder="请输入人次"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否携带订单号" prop="isAddedOrder">
              <i-switch v-model="form.isAddedOrder" />
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isAddedOrder === true" key="订单号">
            <FormItem label="订单号" prop="orderId" >
              <Input v-model="form.orderId" placeholder="多个订单号请用逗号隔开"></Input>
            </FormItem>
          </Col>
          <Col span="8"  v-if="form.isAddedOrder === true" key="核销日期">
            <FormItem label="核销日期" prop="writeOffDate">
              <DatePicker
                type="date"
                placeholder="核销日期"
                style="width: 200px"
                :value="form.writeOffDate"
                v-model="form.writeOffDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否有升单证明" prop="hasBuyagainEvidence" >
              <i-switch v-model="form.hasBuyagainEvidence" />
            </FormItem>
          </Col>
          <Col span="8" v-if="form.hasBuyagainEvidence === true">
            <FormItem label="升单证明" prop="buyagainEvidencePic" key="升单证明">
              <upload :uploadObj="uploadObj" @uploadChange="handleUploadChange" />
            </FormItem>
          </Col>
          <Col span="8" >
            <FormItem label="医院核实截图" prop="checkToHospitalPic">
              <upload :uploadObj="uploadObjHospital" @uploadChange="handleUploadHospitalChange" />
            </FormItem>
          </Col>
          <!-- <Col span="8">
          
          </Col> -->
        </Row>
        <!-- <FormItem label="项目名称" prop="itemName">
          <Input
            v-model="form.itemName"
            style="width: 100%"
            placeholder="请输入项目名称"
          ></Input>
        </FormItem>
        <FormItem label="金额" prop="price">
          <InputNumber
            v-model="form.price"
            style="width: 100%"
            placeholder="请输入金额"
          ></InputNumber>
        </FormItem>
        <FormItem label="消费类型" prop="consumeType">
          <Select v-model="form.consumeType" placeholder="请选择消费类型">
            <Option
              :value="item.value"
              v-for="item in consumeTypeList"
              :key="item.value"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem> -->
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/customerManage";
import upload from "@/components/upload/upload";
export default {
  components:{
    upload
  },
  props: {
    controlModal: Boolean,
    encryptPhone: String,
  },
  data() {
    return {
      control: false,
      // 升单类型
      buyAgainType:[],
      uploadObjHospital: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      uploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      form: {
        // 项目名称
        itemName: null,
        // 金额
        price: null,
        // 消费类型（0=当天其他消费，1=再消费）
        consumeType: "",
        // 客户昵称
        nickName: "",
        // 是否携带订单号
        isAddedOrder:false,
        // 订单号
        orderId:"",
        // 核销日期
        writeOffDate:"",
        // 升单类型
        buyAgainType:null,
        // 升单日期
        buyAgainTime:"",
        // 是否有升单证明
        hasBuyagainEvidence:false,
        // 升单证明截图
        buyagainEvidencePic:"",
        // 医院确认截图
        checkToHospitalPic:"",
        // 人次
        personTime:""

      },

      // 消费类型列表
      consumeTypeList: [
        {
          name: "当天其他消费",
          value: 0,
        },
        {
          name: "再消费",
          value: 1,
        },
      ],

      ruleValidate: {
        itemName: [
          {
            required: true,
            message: "请输入项目名称",
          },
        ],
        price: [
          {
            required: true,
            message: "请输入金额",
          },
        ],
        consumeType: [
          {
            required: true,
            message: "请选择消费类型",
          },
        ],
        nickName: [
          {
            required: true,
            message: "请输入客户昵称",
          },
        ],
        orderId: [
          {
            required: true,
            message: "请输入订单号",
          },
        ],
        writeOffDate: [
          {
            required: true,
            message: "请选择核销日期",
          },
        ],
        buyAgainType: [
          {
            required: true,
            message: "请选择升单类型",
          },
        ],
        buyAgainTime: [
          {
            required: true,
            message: "请选择升单日期",
          },
        ],
        personTime: [
          {
            required: true,
            message: "请输入人次",
          },
        ],
      },
    };
  },
  watch: {
    controlModal: {
      handler(controlModal) {
        this.control = controlModal;
      },
    },
  },
  methods: {
    // 获取升单类型
    getAppTypeList(){
      api.appTypeList().then((res) => {
        if(res.code === 0){
          const {buyAgainType} = res.data
          this.buyAgainType = buyAgainType
        }
      })
    },
    // 医院核实截图
    handleUploadHospitalChange(values) {
      this.form.checkToHospitalPic = values[0];
    },
    // 图片
    handleUploadChange(values) {
      this.form.buyagainEvidencePic = values[0];
    },
    close(value) {
      if (value === false) {
        this.$emit("handleConsumeTrackModalChange");
        this.$refs["form"].resetFields();
      }
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {itemName,price,consumeType,nickName,isAddedOrder,orderId,writeOffDate,buyAgainType,buyAgainTime,hasBuyagainEvidence,buyagainEvidencePic,checkToHospitalPic,personTime} = this.form
          const data = {
            encryptPhone: this.encryptPhone,
            itemName,
            price,
            consumeType,
            nickName,
            isAddedOrder,
            orderId: isAddedOrder === true ? orderId : "",
            writeOffDate : isAddedOrder === true ? this.$moment(writeOffDate).format("YYYY-MM-DD") : null,
            buyAgainType,
            buyAgainTime : buyAgainTime ? this.$moment(buyAgainTime).format("YYYY-MM-DD") : null,
            hasBuyagainEvidence,
            buyagainEvidencePic: hasBuyagainEvidence === true ? buyagainEvidencePic : "",
            checkToHospitalPic,
            personTime
            // ...this.form,
          };
          api.addCustomerHospitalConsume(data).then((res) => {
            if (res.code === 0) {
              this.cancelSubmit("form");
              this.$Message.success({
                content: "添加成功",
                duration: 3,
              });
            }
          });
        }
      });
    },

    // 取消
    cancelSubmit(name) {
      this.uploadObj.uploadList = [];
      this.uploadObjHospital.uploadList = [];
      this.$emit("handleConsumeTrackModalChange");
      this.$refs[name].resetFields();
    },
  },
  created(){
    this.getAppTypeList()
  }
};
</script>
<style lang="less" scoped>
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
