<template>
  <div>
    <Modal
      v-model="control"
      title="提取"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="60%"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidates"
        label-position="left"
        :label-width="130"
      >
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="订单号" prop="orderId">
              <Input
                v-model="form.orderId"
                placeholder="请输入订单号"
                type="number"
                number
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="成交编号" prop="dealId">
              <Input
                v-model="form.dealId"
                placeholder="请输入成交编号"
                type="number"
                number
                disabled
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="总成交金额" prop="orderAmount">
              <Input
                v-model="form.orderAmount"
                placeholder="请输入总成交金额"
                type="number"
                number
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="归属客服" prop="checkBelongEmpId">
              <Select
                v-model="form.checkBelongEmpId"
                placeholder="请选择归属客服"
                filterable
              >
                <Option
                  v-for="item in params.employeeList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem 
                label="总提点" 
                prop="remind" 
                :rules="[
                    {
                    required: true,
                    message: '总提点(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                    },
                ]">
              <Input
                v-model="form.remind"
                placeholder="请输入总提点"
                type="number"
                number
                @on-change="remindChange"
                
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="助理提点" prop="customerRemind">
              <Input
                v-model="form.customerRemind"
                placeholder="请输入助理提点"
                type="number"
                number
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="16">
            <FormItem label="提取备注" prop="remark">
              <Input
                v-model="form.remark"
                placeholder="请输入提取备注"
                type="textarea"
                :rows="2"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8" >
              <FormItem label="是否为稽查订单" prop="isInspection">
                <i-switch
                  v-model="form.isInspection"
                  :disabled="!form.remind"
                  @on-change="remindChange"
                />
              </FormItem>
          </Col>
          <Col span="8" v-if="form.isInspection == true">
            <FormItem label="稽查人员" prop="inspectionCustomer">
              <Select
                v-model="form.inspectionCustomer"
                placeholder="请选择稽查人员"
                filterable
              >
                <Option
                  v-for="item in params.employeeList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
            <Col span="8" v-if="form.isInspection == true"> 
            <FormItem label="稽查提点" prop="customerRemind">
              <Input
                v-model="form.customerRemind"
                placeholder="请输入稽查提点"
                type="number"
                number
                disabled
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Spin fix v-if="isLoading == true">
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div>加载中...</div>
        </Spin>
      </Form>
      <div slot="footer">
        <Button @click="handleCancel('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/reconciliationDocumentsSettle";

export default {
  components: {},
  props: {
    extractionModel: Boolean,
    extractionParams: Object,
    params:Object
  },
  data() {
    return {
      isLoading:false,
      control: false,
      form: {
        // 订单id
        orderId:'',
        // 成交id
        dealId:'',
        // 总成交金额
        orderAmount: null,
        // 归属客服
        checkBelongEmpId: null,
        // 提取备注
        remark: "",
        // 总提点
        remind: null,
        // 助理提点
        customerRemind:null,
        // 是否为稽查
        isInspection:false,
        // 稽查人员
        inspectionCustomer:null,
        // 稽查提点
        inspectionRemind:null,

      },
      ruleValidates: {
        orderId: [
          {
            required: true,
            message: "请输入订单号",
          },
        ],
        dealId: [
          {
            required: true,
            message: "请输入成交编号",
          },
        ],
        orderAmount: [
          {
            required: true,
            message: "请输入总成交金额",
          },
        ],
        checkBelongEmpId: [
          {
            required: true,
            message: "请选择归属客服",
          },
        ],
        inspectionCustomer: [
          {
            required: true,
            message: "请选择稽查人员",
          },
        ],
        remind: [
          {
            required: true,
            message: "请输入业绩提点",
          },
        ],
      }
    };
  },
  methods: {
    // 计算助理提点和稽查提点
    remindChange(){
        if(this.form.isInspection == true){
            let remind = this.form.remind / 2
            this.form.customerRemind = Math.round( remind *1000 / 10 ) / 100
        }else{
            this.form.customerRemind = this.form.remind
        }
        
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            orderId,
            dealId,
            orderAmount,
            checkBelongEmpId,
            remind,
            customerRemind,
            isInspection,
            inspectionCustomer,
            remark

          } = this.form;
          const data = {
            orderId,
            dealId,
            orderAmount,
            checkBelongEmpId,
            remind,
            customerRemind,
            isInspection,
            inspectionCustomer:isInspection == true ? inspectionCustomer : null,
            remark
          };
          console.log(data)
          
          // this.isLoading = true;
          // api.checkReconciliationDocumentsSettle(data).then((res) => {
          //   if (res.code === 0) {
          //     this.isLoading = false;
          //     this.handleCancel("form");
          //     this.$emit("getListWithPageByCustomerCompensation");
          //     this.$Message.success({
          //       content: "提交成功",
          //       duration: 3,
          //     });
          //   } else {
          //     setTimeout(() => {
          //       this.isLoading = false;
          //     }, 3000);
          //   }
          // });
        }
      });
    },

    handleCancel(name) {
      this.$emit("update:extractionModel", false);
      this.$refs[name].resetFields();
      this.$parent.getListWithPageByCustomerCompensation()
      this.$parent.batchExtractionParams.list = []
      this.form.customerRemind = null
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel("form");
      }
    },
  },
  watch: {
    extractionModel(value) {
      this.control = value;
      this.form.orderId = this.extractionParams.contentPaltformOrderId
      this.form.dealId = this.extractionParams.dealId
      this.form.orderAmount = this.extractionParams.dealPrice
    },
  },
};
</script>
<style scoped>
.bor {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px 10px 0px 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.title {
  font-size: 14px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}
.form_text{
  font-size: 14px;
  color: red;
  font-weight: bold;
}
</style>
