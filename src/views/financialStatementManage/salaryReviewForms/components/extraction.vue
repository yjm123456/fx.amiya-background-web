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
        :label-width="110"
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
            <FormItem label="成交编号" prop="dealInfoId">
              <Input
                v-model="form.dealInfoId"
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
            <FormItem label="总成交金额" prop="dealPrice">
              <Input
                v-model="form.dealPrice"
                placeholder="请输入总成交金额"
                type="number"
                number
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="归属客服" prop="belongEmpId">
              <Select
                v-model="form.belongEmpId"
                placeholder="请选择归属客服"
                filterable
                @on-change="getByDealIdAndEmployeeClick()"
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
                label="总提点(%)" 
                prop="point" 
                :rules="[
                    {
                    required: true,
                    message: '请输入总提点',
                    trigger: 'change',
                    type: 'number',
                    },
                ]">
              <Input
                v-model="form.point"
                placeholder="请输入总提点"
                type="number"
                number
                @on-change="pointChange"
                
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="助理提点(%)" prop="customerRemind">
              <Input
                v-model="form.customerRemind"
                placeholder="请输入助理提点"
                type="number"
                number
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="助理提成" prop="performanceCommision">
              <Input
                v-model="form.performanceCommision"
                placeholder="请输入助理提成"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="提取备注" prop="remark">
              <Input
                v-model="form.remark"
                placeholder="请输入提取备注"
                type="textarea"
                :rows="3"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8" >
              <FormItem label="是否为稽查订单" prop="isInspection">
                <i-switch
                  v-model="form.isInspection"
                  :disabled="!form.point"
                  @on-change="pointChange"
                />
              </FormItem>
          </Col>
          <Col span="8" v-if="form.isInspection == true">
            <FormItem label="稽查人员" prop="checkEmpId">
              <Select
                v-model="form.checkEmpId"
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
            <FormItem label="稽查提点(%)" prop="customerRemind">
              <Input
                v-model="form.customerRemind"
                placeholder="请输入稽查提点"
                type="number"
                number
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isInspection == true">
            <FormItem label="稽查提成" prop="performanceCommisionCheck">
              <Input
                v-model="form.performanceCommisionCheck"
                placeholder="请输入稽查提成"
                type="number"
                number
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
import * as api from "@/api/customerServiceCheckPerformance";

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
        dealInfoId:'',
        // 总成交金额
        dealPrice: null,
        // 归属客服
        belongEmpId: null,
        // 提取备注
        remark: "",
        // 总提点
        point: null,
        // 助理提点
        customerRemind:null,
        // 助理提成
        performanceCommision:null,
        // 是否为稽查
        isInspection:false,
        // 稽查人员
        checkEmpId:null,
        // 稽查提点
        inspectionRemind:null,
        // 稽查提成
        performanceCommisionCheck:null,

      },
      ruleValidates: {
        performanceCommision: [
          {
            required: true,
            message: "请输入助理提成",
          },
        ],
        performanceCommisionCheck: [
          {
            required: true,
            message: "请输入稽查提成",
          },
        ],
        orderId: [
          {
            required: true,
            message: "请输入订单号",
          },
        ],
        dealInfoId: [
          {
            required: true,
            message: "请输入成交编号",
          },
        ],
        dealPrice: [
          {
            required: true,
            message: "请输入总成交金额",
          },
        ],
        belongEmpId: [
          {
            required: true,
            message: "请选择归属客服",
          },
        ],
        checkEmpId: [
          {
            required: true,
            message: "请选择稽查人员",
          },
        ],
        point: [
          {
            required: true,
            message: "请输入业绩提点",
          },
        ],
      }
    };
  },
  methods: {
    // // 业绩提点变化时计算助理提成
    // pointChange(){
    //   let price = this.form.dealPrice * (this.form.point /100)
    //   this.form.performanceCommision =  Math.round( price *1000 / 10 ) / 100
    // },
    // 获取提点
    getByDealIdAndEmployeeClick(){
      const {dealInfoId,belongEmpId} = this.form
      const data = {
        dealId:dealInfoId,
        employeeId:belongEmpId
      }
      if(!belongEmpId){
        this.form.point = null
        return
      }
      api.getByDealIdAndEmployee(data).then(res=>{
        if(res.code == 0){
          this.form.point = res.data.point
          this.pointChange()
        }
      })
    },
    // 计算助理提点和稽查提点
    pointChange(){
        if(this.form.isInspection == true){
            let point = this.form.point / 2
            this.form.customerRemind = Math.round( point *1000 / 10 ) / 100
            // 计算稽查提成
            let price = this.form.dealPrice * (this.form.customerRemind / 100)
            this.form.performanceCommisionCheck =  Math.round( price *1000 / 10 ) / 100
            // 如为稽查订单 助理提成 = 总成交金额 * 助理提点
            this.form.performanceCommision =  Math.round( price *1000 / 10 ) / 100
        }else{
            this.form.customerRemind = this.form.point
            // 计算助理提成
            let price = this.form.dealPrice * (this.form.point /100)
            this.form.performanceCommision =  Math.round( price *1000 / 10 ) / 100
            this.form.checkEmpId = null
            
        }
        
        
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
              orderId,
              dealInfoId,
              dealPrice,
              belongEmpId,
              remark,
              customerRemind,
              performanceCommision,
              isInspection,
              checkEmpId,
              performanceCommisionCheck,
          } = this.form;
          const data = {
            dealInfoId,
            orderId,
            orderFrom:2,
            dealPrice,
            dealCreateDate:this.extractionParams.dealCreateDate,
            performanceType:isInspection == true ? 3 : 1,
            belongEmpId,
            point:customerRemind,
            performanceCommision: performanceCommision ? performanceCommision : 0,
            performanceCommisionCheck: performanceCommisionCheck ? performanceCommisionCheck : 0,
            checkEmpId:isInspection == false ? null : checkEmpId,
            remark
          };
          this.isLoading = true;
          api.addCustomerServiceCheckPerformance(data).then((res) => {
            if (res.code === 0) {
              this.isLoading = false;
              this.handleCancel("form");
              this.$emit("getListWithPageByCustomerCompensation");
              this.$Message.success({
                content: "提交成功",
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
      this.form.dealInfoId = this.extractionParams.dealId
      this.form.dealPrice = this.extractionParams.dealPrice
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
