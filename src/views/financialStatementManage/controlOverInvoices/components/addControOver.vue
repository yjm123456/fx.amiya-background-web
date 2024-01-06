<template>
  <div>
    <Modal
      v-model="control"
      title="添加"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="1200"
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
              <Select
                v-model="form.hospitalId"
                placeholder="请选择客户"
                filterable
              >
                <Option
                  v-for="item in addControOverParams.hospitalInfo"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="发票金额" prop="billPrice">
              <Input
                v-model="form.billPrice"
                placeholder="请输入发票金额"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="税率(%)" prop="taxRate">
              <Input
                v-model="form.taxRate"
                placeholder="请输入税率"
                type="number"
                number
                @on-change="taxRateChange(form.taxRate)"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="30">
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
                placeholder="请输入税额"
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
        </Row>
        <Row :gutter="30">
          <Col span="8">
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
              <Select
                v-model="form.collectionCompanyId"
                placeholder="请选择收款公司"
                filterable
              >
                <Option
                  v-for="item in addControOverParams.companyNameList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
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
        </Row>
        <Row :gutter="30">
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
              <Select
                v-model="form.billType"
                placeholder="请选择票据类型"
                filterable
                disabled
              >
                <Option
                  v-for="item in addControOverParams.billTypeList"
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
export default {
  components: {},
  props: {
    addControOverModel: Boolean,
    addControOverParams: Object,
  },
  data() {
    return {
      isLoading:false,
      control: false,
      form: {
        id:'',
        // 客户 医院
        hospitalId: null,
        // 信息服务费
        returnBackPriceNum: null,
        // 系统使用费
        systemUpdatePriceNum: null,
        // 发票金额
        billPrice: null,
        // 其他费用
        otherPrice: null,
        // 费用备注
        otherPriceRemark: "",
        // 开票时间
        createDate: "",
        // 账单归属时间
        time: "",
        // 税率
        taxRate: null,
        // 税额
        taxPrice: null,
        // 不含税金额
        notInTaxPrice: null,
        // 收款公司
        collectionCompanyId: null,
        // 开票事由
        createBillReason: "",
        // 票据类型
        billType: 1,
      },

      ruleValidate: {
        hospitalId: [
          {
            required: true,
            message: "请选择客户",
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
            message: "请输入发票金额",
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
    };
  },
  methods: {
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
            const { time,hospitalId,billPrice,taxRate,taxPrice,notInTaxPrice,otherPrice,otherPriceRemark,collectionCompanyId,createDate,billType,createBillReason} = this.form;
            // const data = {
            //   hospitalId,
            //   billPrice,
            //   taxRate,
            //   taxPrice:Number(taxPrice),
            //   notInTaxPrice:Number(notInTaxPrice),
            //   otherPrice:otherPrice ? otherPrice : 0,
            //   otherPriceRemark,
            //   collectionCompanyId,
            //   createDate:this.$moment(createDate).format("YYYY-MM-DD"),
            //   billType:Number(billType),
            //   createBillReason,
            //   belongStartTime:this.$moment(time[0]).format("YYYY-MM-DD"),
            //   belongEndTime:this.$moment(time[1]).format("YYYY-MM-DD"),
            //   reconciliationDocumentsIdList:[],
            //   dealPrice:0,
            //   informationPrice:0,
            //   systemUpdatePrice:0,
            // };
            const data = {
              hospitalId,
              billPrice,
              createDate:this.$moment(createDate).format("YYYY-MM-DD"),
              billType:Number(billType),
              createBillReason,
              belongStartTime:this.$moment(time[0]).format("YYYY-MM-DD"),
              belongEndTime:this.$moment(time[1]).format("YYYY-MM-DD"),
              reconciliationDocumentsIdList:[],
              dealPrice:0,
              informationPrice:0,
              systemUpdatePrice:0,
              details:[{
                separateBillPrice:billPrice,
                taxRate,
                taxPrice:Number(taxPrice),
                notInTaxPrice:Number(notInTaxPrice),
                otherPrice:otherPrice ? otherPrice : 0,
                otherPriceRemark,
                collectionCompanyId
              }]
            }
            this.isLoading = true
            // 添加
            api.addBill(data).then((res) => {
              if (res.code === 0) {
                this.isLoading =false
                this.$emit("update:addControOverModel", false);
                this.$emit('getBillList')
                this.handleCancel("form");
                this.$Message.success({
                  content: "添加成功",
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
      this.$emit("update:addControOverModel", false);
      this.$refs["form"].resetFields();
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.$emit("update:addControOverModel", false);
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {},
  watch: {
    addControOverModel(value) {
      this.control = value;
      this.form.billType = "1"
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
