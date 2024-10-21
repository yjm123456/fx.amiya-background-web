<template>
  <div>
    <Modal
      v-model="control"
      :title="extractPerformanceParams.title"
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
            <FormItem label="成交编号" prop="dealInfoId">
              <Input
                v-model="form.dealInfoId"
                placeholder="请输入成交编号"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="订单号" prop="orderId">
              <Input
                v-model="form.orderId"
                placeholder="请输入订单号"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="订单来源" prop="orderFrom">
              <Select
                v-model="form.orderFrom"
                placeholder="请选择订单来源"
                filterable
              >
                <Option
                  v-for="item in contentPalteForms"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="成交金额" prop="dealPrice">
              <Input
                v-model="form.dealPrice"
                placeholder="请输入成交金额"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="成交单创建时间" prop="dealCreateDate">
              <DatePicker
                type="date"
                placeholder="成交单创建时间"
                style="width: 100%"
                :value="form.dealCreateDate"
                v-model="form.dealCreateDate"
            ></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="业绩类型" prop="performanceType">
              <Select
                v-model="form.performanceType"
                placeholder="请选择业绩类型"
                filterable
              >
                <Option
                  v-for="item in params.PerformanceTypeList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="归属客服" prop="belongEmpId">
              <Select
                v-model="form.belongEmpId"
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
            <FormItem label="薪资点数(%)" prop="point">
              <Input
                v-model="form.point"
                placeholder="请输入薪资点数"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="稽查人员" prop="checkEmpId">
              <Select
                v-model="form.checkEmpId"
                placeholder="请选择稽查人员"
                filterable
              >
                <Option
                  v-for="item in params.employeePosition"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="16">
            <FormItem label="备注" prop="remark">
              <Input
                v-model="form.remark"
                placeholder="请输入备注"
                type="textarea"
                :rows="2"
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
    controlModel: Boolean,
    extractPerformanceParams: Object,
    params:Object,
    
  },
  data() {
    return {
      // 平台
      contentPalteForms:[{id:1,name:'下单平台'},{id:2,name:'内容平台'},{id:3,name:'消费追踪'}],
      isLoading:false,
      control: false,
      form: {
        // 成交编号
        dealInfoId: '',
        // 订单号
        orderId: '',
        // 订单来源
        orderFrom:2,
        // 成交金额
        dealPrice:null,
        // 成交创建时间
        dealCreateDate:'',
        // 助理薪资业绩类型
        performanceType:1,
        // 归属客服
        belongEmpId:null,
        // 薪资点数
        point:null,
        // 稽查人员
        checkEmpId:null,
        // 备注
        remark: "",
        // // 助理薪资id
        // billId: '',
        // // 稽查人员薪资id
        // checkBillId:null
      },
      ruleValidates: {
        dealInfoId: [
          {
            required: true,
            message: "请输入成交编号",
          },
        ],
        orderId: [
          {
            required: true,
            message: "请输入订单号",
          },
        ],
        dealPrice: [
          {
            required: true,
            message: "请输入成交金额",
          },
        ],
        orderFrom: [
          {
            required: true,
            message: "请选择订单来源",
          },
        ],
        dealCreateDate: [
          {
            required: true,
            message: "请选择成交单创建时间",
          },
        ],
        performanceType: [
          {
            required: true,
            message: "请选择业绩类型",
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
            message: "请输入薪资点数",
          },
        ],
      }
    };
  },
  methods: {
    // 根据id获取订单信息
    getbyIdCustomerServiceCheckPerformance(value){
      api.byIdCustomerServiceCheckPerformance(value).then(res=>{
        if(res.code == 0){
          const {customerServiceCheckPerformance} = res.data
          this.form.dealInfoId = customerServiceCheckPerformance.dealInfoId
          this.form.orderId = customerServiceCheckPerformance.orderId
          this.form.orderFrom = customerServiceCheckPerformance.orderFrom
          this.form.dealPrice = customerServiceCheckPerformance.dealPrice
          this.form.dealCreateDate = customerServiceCheckPerformance.dealCreateDate
          this.form.performanceType = customerServiceCheckPerformance.performanceType
          this.form.belongEmpId = customerServiceCheckPerformance.belongEmpId
          this.form.point = customerServiceCheckPerformance.point
          this.form.checkEmpId = customerServiceCheckPerformance.checkEmpId
          this.form.remark = customerServiceCheckPerformance.remark
        }
      })
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
                    dealInfoId,
                    orderId,
                    orderFrom,
                    dealPrice,
                    dealCreateDate,
                    performanceType,
                    belongEmpId,
                    point,
                    checkEmpId,
                    remark,
                } = this.form;
                const data = {
                    dealInfoId,
                    orderId,
                    orderFrom,
                    dealPrice,
                    dealCreateDate:dealCreateDate ? this.$moment(new Date(dealCreateDate)).format("YYYY-MM-DD") : null,
                    performanceType,
                    belongEmpId,
                    point,
                    checkEmpId,
                    remark,
                    id:this.extractPerformanceParams.id
                };
            if(this.extractPerformanceParams.title == '编辑'){
                this.isLoading = true;
                api.updateCustomerServiceCheckPerformance(data).then((res) => {
                    if (res.code === 0) {
                        this.isLoading = false;
                        this.handleCancel("form");
                        this.$Message.success({
                            content: "编辑成功",
                            duration: 3,
                        });
                    } else {
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 3000);
                    }
                });
            }else{
                this.isLoading = true;
                api.addCustomerServiceCheckPerformance(data).then((res) => {
                    if (res.code === 0) {
                        this.isLoading = false;
                        this.handleCancel("form");
                        this.$Message.success({
                            content: "添加成功",
                            duration: 3,
                        });
                    } else {
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 3000);
                    }
                });
            }
          
        }
      });
    },

    handleCancel(name) {
      this.$parent.handlePageChange(this.$parent.extractPerformanceParams.pageNum);
      this.$emit("update:controlModel", false);
      this.$refs[name].resetFields();
      this.$parent.extractPerformanceParams.title  = '添加'
      
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel("form");
      }
    },
  },
  watch: {
    controlModel(value) {
      this.control = value;
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
