<template>
  <div>
    <Modal
      v-model="control"
      title="生成开票单"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="70%"
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
            <FormItem label="客户" prop="hospitalId">
              <Select v-model="form.hospitalId" placeholder="请选择客户" filterable disabled>
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
            <FormItem label="对账金额" prop="dealPrice">
              <Input
                v-model="form.dealPrice"
                placeholder="请输入对账金额"
                type="number"
                number
                disabled
              ></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="信息服务费" prop="returnBackPriceNum">
              <Input
                v-model="form.returnBackPriceNum"
                placeholder="请输入信息服务费"
                type="number"
                number
                disabled
              ></Input>
            </FormItem>
            </Col>
            
        </Row>
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="系统使用费" prop="systemUpdatePriceNum">
              <Input
                v-model="form.systemUpdatePriceNum"
                placeholder="请输入系统使用费"
                type="number"
                number
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="总发票金额" prop="billPrice">
              <Input
                v-model="form.billPrice"
                placeholder="请输入总发票金额"
                type="number"
                number
                disabled
              ></Input>
            </FormItem>
            </Col>
            <!-- <Col span="8">
            <FormItem label="税率(%)" prop="taxRate">
              <Input
                v-model="form.taxRate"
                placeholder="请输入税率"
                type="number"
                number
                @on-change="taxRateChange(form.taxRate)"
              ></Input>
            </FormItem>
          </Col> -->
          
          <!-- <Row :gutter="30">
            <Col span="8">
            <FormItem label="税额" prop="taxPrice">
              <Input
                v-model="form.taxPrice"
                placeholder="请输入税额"
                type="number"
                number
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="不含税金额" prop="notInTaxPrice">
              <Input
                v-model="form.notInTaxPrice"
                placeholder="请输入不含税金额"
                type="number"
                number
                disabled
              ></Input>
            </FormItem>
          </Col>
            <Col span="8">
            <FormItem label="其他费用" prop="otherPrice">
              <Input
                v-model="form.otherPrice"
                placeholder="请输入其他费用"
                type="number"
                number
              ></Input>
            </FormItem>
            </Col>
            
            
        </Row> -->
          <!-- <Col span="8">
          <FormItem label="费用备注" prop="otherPriceRemark">
              <Input
                v-model="form.otherPriceRemark"
                placeholder="请输入费用"
                type="textarea"
                :rows="4"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="收款公司" prop="collectionCompanyId">
              <Select v-model="form.collectionCompanyId" placeholder="请选择收款公司" filterable>
                <Option
                  v-for="item in companyNameList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
            </Col> -->
          <Col span="8">
            <FormItem label="开票时间" prop="createDate">
              <DatePicker
                type="date"
                placeholder="开票时间"
                style="width: 100%;"
                :value="form.createDate"
                v-model="form.createDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="账单归属时间" prop="time">
              <DatePicker
                :value="form.time"
                v-model="form.time"
                format="yyyy-MM-dd"
                type="daterange"
                placement="bottom-end"
                placeholder="账单归属时间"
                style="width: 100%"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="票据类型" prop="billType">
              <Select v-model="form.billType" placeholder="请选择票据类型" filterable disabled>
                <Option
                  v-for="item in billTypeList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="开票事由" prop="createBillReason">
              <Input
                v-model="form.createBillReason"
                placeholder="请输入开票事由"
                type="textarea"
                :rows="4"
              ></Input>
            </FormItem>
          </Col>

          <Divider style="margin-top:-6px"/>
          <!-- 开多张票 -->
          <multipleTicketsCom :companyNameList="companyNameList" @handle="handle" ref="multipleTicketsCom"/>
        </Row>
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
        <Button @click="handleCancel('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确认</Button>
      </div>
    </Modal>
    
  </div>
</template>
<script>
import * as api from "@/api/bill";
import multipleTicketsCom from "../multipleTickets/multipleTickets.vue"
export default {
  components: {multipleTicketsCom},
  props: {
    invoiceModel: Boolean,
    invoiceParams: Object,
    hospitalInfo: Array,
    companyNameList:Array,
    billTypeList:Array
  },
  data() {
    return {
      isLoading:false,
      control: false,
      form: {
        // 客户 医院
        hospitalId: null,
        // 信息服务费
        returnBackPriceNum: null,
        // 系统使用费
        systemUpdatePriceNum: null,
        // 发票金额
        billPrice: null,
        // 对账金额
        dealPrice:null,
        // 其他费用
        otherPrice: null,
        // 费用备注
        otherPriceRemark: "",
        // 开票时间
        createDate: "",
        // 账单归属时间
        time:'',
        // 税率
        taxRate:null,
        // 税额
        taxPrice:null,
        // 不含税金额
        notInTaxPrice:null,
        // 收款公司
        collectionCompanyId:null,
        // 开票事由
        createBillReason:'',
        // 票据类型
        billType:0,
        details:[]
      },

      ruleValidate: {
        hospitalId: [
          {
            required: true,
            message: "请选择客户",
          },
        ],
        dealPrice: [
          {
            required: true,
            message: "请输入对账金额",
          },
        ],
        returnBackPriceNum: [
          {
            required: true,
            message: "请输入信息服务费",
          },
        ],
        systemUpdatePriceNum: [
          {
            required: true,
            message: "请输入系统服务费",
          },
        ],
        billPrice: [
          {
            required: true,
            message: "请输入总发票金额",
          },
        ],
        taxRate: [
          {
            required: true,
            message: "请输入税率",
          },
        ],
        taxPrice: [
          {
            required: true,
            message: "请输入税额",
          },
        ],
        notInTaxPrice: [
          {
            required: true,
            message: "请输入不含税金额",
          },
        ],
        notInTaxPrice: [
          {
            required: true,
            message: "请输入不含税金额",
          },
        ],
        
        createDate: [
          {
            required: true,
            message: "请选择开票时间",
          },
        ],
        time: [
          {
            required: true,
            message: "请选择票据归属时间",
          },
        ],
        collectionCompanyId: [
          {
            required: true,
            message: "请选择收款公司",
          },
        ],
        billType: [
          {
            required: true,
            message: "请选择票据类型",
          },
        ],
      },
      orderIds:[],
      // 接收子组件参数
      details:[]
    };
  },
  methods: {
    handle(value){
      this.form.details = value
    },
    taxRateChange(value){
      const {billPrice,taxRate} = this.form
      // 税率
      let num = (taxRate/100).toFixed(2)
      // 含税计算公式 （发票金额/（（1+税率）*税率）--保留2位小数）
      this.form.taxPrice = ((billPrice / (1+Number(num))) * Number(num)).toFixed(2)
      // 不含税
      this.form.notInTaxPrice = (billPrice - this.form.taxPrice).toFixed(2)
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
            const { time,hospitalId,billPrice,taxRate,taxPrice,notInTaxPrice,otherPrice,otherPriceRemark,collectionCompanyId,
            createDate,billType,createBillReason,returnBackPriceNum,systemUpdatePriceNum,dealPrice,details} = this.form;
            const data = {
              hospitalId,
              billPrice,
              // taxRate,
              // taxPrice:Number(taxPrice),
              // notInTaxPrice:Number(notInTaxPrice),
              // otherPrice:otherPrice ? otherPrice : 0,
              // otherPriceRemark,
              // collectionCompanyId,
              createDate:this.$moment(createDate).format("YYYY-MM-DD"),
              billType,
              createBillReason,
              reconciliationDocumentsIdList:this.orderIds,
              belongStartTime:this.$moment(time[0]).format("YYYY-MM-DD"),
              belongEndTime:this.$moment(time[1]).format("YYYY-MM-DD"),
              dealPrice:Number(dealPrice),
              informationPrice:Number(returnBackPriceNum),
              systemUpdatePrice:Number(systemUpdatePriceNum),
              details
            };
            let separateBillPrice = 0
            details.map(item=>{
              separateBillPrice += Number(item.separateBillPrice);
            })
            if(!details || details.length == 0){
              this.$Message.warning('发票栏数据为空，请先生成发票后再进行确认!')
              return
            }
            if(separateBillPrice.toFixed(2) != billPrice.toFixed(2)){
              this.$Message.warning('开票金额与发票总金额不一致，请认真核对后重试!')
              return
            }
            this.isLoading = true
            // 生成发票
            api.addBill(data).then((res) => {
              if (res.code === 0) {
                this.isLoading = false
                this.handleCancel("form");
                this.$Message.success({
                  content: "已成功生成发票",
                  duration: 3,
                });
              }else{
                setTimeout(()=>{
                  this.isLoading = false
                },3000)
              }
            });
        }
      });
    },
    handleCancel(name) {
      this.$emit("update:invoiceModel", false);
      this.$emit('hanledgetHospitalInfo')
      // this.invoiceParams.invoiceList.clear();
      // this.invoiceParams.invoiceHospitalList.clear();
      this.$refs["form"].resetFields();
      this.$refs.multipleTicketsCom.query.data = []
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.$emit("update:invoiceModel", false);
        this.$emit('hanledgetHospitalInfo')
        this.$refs["form"].resetFields();
        this.$refs.multipleTicketsCom.query.data = []
      }
    },
  },
  created(){
    
  },
  watch: {
    invoiceModel(value) {
      this.control = value;
      this.form.returnBackPriceNum = Number(this.invoiceParams.returnBackPriceNum)
      this.form.systemUpdatePriceNum = Number(this.invoiceParams.systemUpdatePriceNum)
      this.form.billPrice = Number(this.invoiceParams.collectionNum)
      this.form.dealPrice = Number(this.invoiceParams.reconciliationPerformanceNum)
      this.form.hospitalId = this.invoiceParams.hospitalId
      this.form.billType = "0"
      let orderId = []
      this.invoiceParams.invoiceList.map(item=>{
        orderId.push(item.id)
      })
      this.orderIds = orderId
    },
  },
};
</script>
<style scoped>
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
