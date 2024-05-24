<template>
  <div>
    <Modal
      v-model="control"
      title="审核"
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
        <div class="bor">
          <Row :gutter="30">
            <Col span="8">
              <FormItem label="审核状态" prop="checkState">
                <Select v-model="form.checkState" placeholder="请选择审核状态">
                  <Option
                    v-for="item in checkStateList"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="归属客服" prop="checkBelongEmpId">
                <Select
                  v-model="form.checkBelongEmpId"
                  placeholder="请选择归属客服"
                  filterable
                  @on-change="checkBelongEmpIdChange"
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
              <FormItem label="审核类型" prop="checkType">
                <Select
                  v-model="form.checkType"
                  placeholder="请选择审核类型"
                  @on-change="checkTypeChange"
                >
                  <Option
                    v-for="item in params.reconciliationtCheckType"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="8" v-if="form.checkType == 1">
              <FormItem label="是否为稽查订单" prop="valid">
                <i-switch
                  v-model="form.valid"
                  @on-change="validChange(form.valid)"
                  :disabled="
                    !form.checkBelongEmpId || form.checkBelongEmpId == null
                  "
                />
              </FormItem>
            </Col>
            <Col span="16">
              <FormItem label="审核备注" prop="checkRemark">
                <Input
                  v-model="form.checkRemark"
                  type="textarea"
                  :rows="2"
                ></Input>
              </FormItem>
            </Col>
          </Row>
        </div>
        <div class="bor" v-if="form.checkBelongEmpId && form.checkType != null">
          <div class="title" >助理业绩</div>
          <Row :gutter="30">
            <Col span="8" >
              <FormItem label="业绩类型" prop="type">
                <Input
                  v-model="form.type"
                  placeholder="请输入业绩类型"
                  disabled
                ></Input>
              </FormItem>
            </Col>
            <Col span="8" v-if="form.checkBelongEmpId">
              <FormItem :label="checkTitle" prop="customerServiceSettlePrice">
                <Input
                  v-model="form.customerServiceSettlePrice"
                  placeholder="请输入审核客服业绩"
                  type="number"
                  number
                  disabled
                ></Input>
              </FormItem>
            </Col>
            <Col span="8" v-if="form.checkBelongEmpId">
              <FormItem
                label="助理确认业绩"
                prop="customerServiceOrderPerformance"
              >
                <Input
                  v-model="form.customerServiceOrderPerformance"
                  placeholder="请输入助理确认业绩"
                  type="number"
                  number
                  @on-change="customerServiceOrderPerformanceChange"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8" v-if="form.checkBelongEmpId">
              <FormItem label="提成比例(%)" prop="performancePercent">
                <Input
                  v-model="form.performancePercent"
                  placeholder="请输入提成比例"
                  type="number"
                  number
                  :disabled="form.valid == false"
                  @on-change="performancePercentChange"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8" v-if="form.checkBelongEmpId">
              <FormItem label="提成金额" prop="customerServicePerformance">
                <Input
                  v-model="form.customerServicePerformance"
                  placeholder="请输入提成金额"
                  type="number"
                  number
                ></Input>
              </FormItem>
            </Col>
          </Row>
        </div>
        <div class="bor" v-if="form.valid == true && form.checkType == 1">
          <div class="title">稽查人员业绩</div>
          <Row :gutter="30">
            <Col span="8" >
              <FormItem label="稽查人员" prop="inspectEmpId">
                <Select
                  v-model="form.inspectEmpId"
                  placeholder="请选择稽查人员"
                  filterable
                  @on-change="inspectEmpIdChange"
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
            <Col span="8" >
              <FormItem label="稽查比例(%)" prop="inspectPercent">
                <Input
                  v-model="form.inspectPercent"
                  placeholder="请输入稽查比例"
                  type="number"
                  number
                  @on-change="inspectPercentChange"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8" >
              <FormItem label="稽查金额" prop="inspectPrice">
                <Input
                  v-model="form.inspectPrice"
                  placeholder="请输入稽查金额"
                  type="number"
                  number
                ></Input>
              </FormItem>
            </Col>
          </Row>
        </div>
       
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
import * as employeeManageApi from "@/api/employeeManage";

export default {
  components: {},
  props: {
    examineModel: Boolean,
    params: Object,
    checkedParams: Object,
  },
  data() {
    return {
      checkTitle: "审核客服业绩",
      isLoading: false,
      checkStateList: [
        {
          id: 2,
          name: "审核通过",
        },
        {
          id: 1,
          name: "审核不通过",
        },
      ],
      control: false,
      form: {
        // 审核状态
        checkState: null,
        // 归属客服
        checkBelongEmpId: null,
        // 审核备注
        checkRemark: "",
        // 是否为稽查订单
        valid: false,
        // 提成点数
        performancePercent: 0,
        // 提成金额
        customerServicePerformance: null,
        // 业绩类型
        type: "",
        // 订单金额
        customerServiceSettlePrice: 0,
        orderPrice:0,
        // 审核类型
        checkType: null,
        // 稽查人员 
        inspectEmpId: null,
        // 稽查比例-稽查人员
        inspectPercent: null,
        // 稽查金额-稽查人员
        inspectPrice: null,
        // 助理确认薪资
        customerServiceOrderPerformance: null,
      },
      ruleValidates: {
        customerServiceOrderPerformance: [
          {
            required: true,
            message: "请输入助理确认业绩",
          },
        ],
        checkType: [
          {
            required: true,
            message: "请选择审核类型",
          },
        ],
        inspectEmpId: [
          {
            required: true,
            message: "请选择稽查人员",
          },
        ],
        inspectPercent: [
          {
            required: true,
            message: "请输入稽查比例",
          },
        ],
        inspectPrice: [
          {
            required: true,
            message: "请输入稽查金额",
          },
        ],
        type: [
          {
            required: true,
            message: "请选择业绩类型",
          },
        ],
        customerServiceSettlePrice: [
          {
            required: true,
            message: "请输入订单金额",
          },
        ],
        performancePercent: [
          {
            required: true,
            message: "请输入提成比例",
          },
        ],
        customerServicePerformance: [
          {
            required: true,
            message: "请输入提成金额",
          },
        ],
        checkState: [
          {
            required: true,
            message: "请选择审核状态",
          },
        ],
        checkBelongEmpId: [
          {
            required: true,
            message: "请选择归属客服",
          },
        ],
      },
      // 审核类型
      checkTypeList: [
        {
          type: 0,
          name: "其他",
        },
        {
          type: 1,
          name: "自播达人",
        },
        {
          type: 2,
          name: "供应链达人",
        },
        {
          type: 3,
          name: "天猫升单",
        },
      ],
    };
  },
  methods: {
    // 稽查人员
    inspectEmpIdChange(){
      // 弹窗
      if (this.examineModel == true) {
        employeeManageApi.byIdGetAmiyaEmployee(this.form.inspectEmpId).then((res) => {
            if (res.code === 0) {
              const { administrativeInspectionCommission} = res.data.employeeInfo;
                // 稽查比例
                this.form.inspectPercent = administrativeInspectionCommission
                // 稽查金额
                let inspectPrice = this.form.customerServiceOrderPerformance == 0 ? 0 : this.form.customerServiceOrderPerformance * (administrativeInspectionCommission / 100);
                this.form.inspectPrice = Math.round(inspectPrice * 100) / 100;
                return;
            }
          });
      }
    },
    // 计算稽查金额
    inspectPercentChange(){
      // 稽查金额
      let inspectPrice = this.form.customerServiceOrderPerformance == 0 ? 0 : this.form.customerServiceOrderPerformance * (this.form.inspectPercent / 100);
      this.form.inspectPrice = Math.round(inspectPrice * 100) / 100;
    },
    // 防止切换归属客服时  值不改变情况
    isCheckType(){
      if(this.form.checkType == 2){
        // 供应链达人 助理确认薪资 = 订单金额*对应比例 
        let price2 = this.checkedParams.recolicationPrice * 0.1
        this.form.customerServiceOrderPerformance = Math.round(price2 * 100) / 100;
      }else if(this.form.checkType == 3){
        // 天猫升单 助理确认薪资 = 订单金额*对应比例
        let price3 = this.checkedParams.recolicationPrice * 0.25
        this.form.customerServiceOrderPerformance = Math.round(price3 * 100) / 100;
      }
    },
    // 根据助理确认业绩计算提成金额
    customerServiceOrderPerformanceChange(){
      if(this.form.checkType == 1){
        // 自播达人
        let price = this.form.customerServiceOrderPerformance * (this.form.performancePercent /100)
        this.form.customerServicePerformance = Math.round(price * 100) / 100 
        // 稽查金额
        this.inspectPercentChange()
      }else if(this.form.checkType == 2){
        //供应链 提成金额 = 助理确认业绩 * 提成比例
          let customerServicePerformance2 = this.form.customerServiceOrderPerformance * (this.form.performancePercent / 100)
          this.form.customerServicePerformance = Math.round(customerServicePerformance2 * 100) / 100;
      }else if(this.form.checkType == 3){
        //天猫升单 提成金额 = 助理确认业绩 * 提成比例 
          let customerServicePerformance = this.form.customerServiceOrderPerformance * (this.form.performancePercent / 100)
          this.form.customerServicePerformance = Math.round(customerServicePerformance * 100) / 100;
      }
    },
    // 根据审核类型判断提成金额计算方式
    checkTypeChange() {
      const { checkType,checkBelongEmpId,customerServiceOrderPerformance } = this.form;
      // let price = this.checkedParams.customerServiceSettlePrice * (this.form.performancePercent / 100);
      if(checkType == 2 || checkType == 3){
        this.form.orderPrice = this.checkedParams.recolicationPrice
      }else{
        this.form.orderPrice = this.checkedParams.customerServiceSettlePrice
      }
      // 防止直接选择审核类型会报错 因为下面调用了根据归属客服查询详情接口
      if(this.control == true){
        if(!checkBelongEmpId){
          this.$Message.warning('请先选择归属客服')
          return
        }
      }
      switch (checkType) {
        case '0':
          this.form.performancePercent = 0;
          this.form.customerServicePerformance = 0;
          this.form.customerServiceOrderPerformance = 0;
          this.checkTitle = "审核客服业绩";
          this.form.valid = false;
          this.form.customerServiceSettlePrice = this.checkedParams.customerServiceSettlePrice
          break;
        case '1':
          this.checkBelongEmpIdChange();
          // 自播达人 助理确认薪资取列表审核客服业绩金额
          this.form.customerServiceOrderPerformance = this.checkedParams.customerServiceSettlePrice;
          this.checkTitle = "审核客服业绩";
          this.form.valid = false;
          this.form.customerServiceSettlePrice = this.checkedParams.customerServiceSettlePrice
          break;
        case '2':
          this.checkBelongEmpIdChange();
          // 供应链达人 助理确认薪资 = 订单金额*对应比例 
          // let price2 = this.checkedParams.orderPrice * 0.1
          let price2 = this.checkedParams.recolicationPrice * 0.1
          this.form.customerServiceOrderPerformance = Math.round(price2 * 100) / 100;
          // 提成金额 = 助理确认业绩 * 提成比例
          let customerServicePerformance2 = customerServiceOrderPerformance * (this.form.performancePercent / 100)
          this.form.customerServicePerformance = Math.round(customerServicePerformance2 * 100) / 100;
          this.checkTitle = "对账单面值";
          this.form.valid = false;
          this.form.customerServiceSettlePrice = this.checkedParams.recolicationPrice
          break;
        case '3':
          this.checkBelongEmpIdChange();
          // 天猫升单 助理确认薪资 = 订单金额*对应比例
          let price3 = this.checkedParams.recolicationPrice * 0.25
          this.form.customerServiceOrderPerformance = Math.round(price3 * 100) / 100;
          // 提成金额 = 助理确认业绩 * 提成比例
          let customerServicePerformance = customerServiceOrderPerformance * (this.form.performancePercent / 100)
          this.form.customerServicePerformance = Math.round(customerServicePerformance * 100) / 100;
          this.checkTitle = "对账单面值";
          this.form.valid = false;
          this.form.customerServiceSettlePrice = this.checkedParams.recolicationPrice
          break;
      }
    },
    // 根据稽查比例计算
    performancePercentChange() {
      // 计算提成金额
      let customerServicePerformance = this.form.customerServiceOrderPerformance == 0 ? 0 : this.form.customerServiceOrderPerformance * (this.form.performancePercent / 100);
      this.form.customerServicePerformance = Math.round(customerServicePerformance * 100) / 100;
    },
    // 切换Switch时title赋值
    validChange(value) {
      this.form.valid = value;
      // 切换时 稽查人员业绩相关字段清空 防止有值直接穿给后端
      this.form.inspectEmpId = null 
      this.form.inspectPercent = null 
      this.form.inspectPrice = null 
      this.checkBelongEmpIdChange();
    },
    //根据员工id查询提成比例
    checkBelongEmpIdChange() {
      // 弹窗
      if (this.examineModel == true) {
        employeeManageApi.byIdGetAmiyaEmployee(this.form.checkBelongEmpId).then((res) => {
            if (res.code === 0) {
              const { newCustomerCommission,oldCustomerCommission,inspectionCommission,administrativeInspectionCommission,cooperateLiveanchorNewCustomerCommission, cooperateLiveanchorOldCustomerCommission,tmallOrderCommission} = res.data.employeeInfo;
              const { type, valid,checkType } = this.form;
              if (valid == true) {
                // 提成比例
                this.form.performancePercent = inspectionCommission;
                // 计算提成金额
                let customerServiceSettlePrice = this.checkedParams.customerServiceSettlePrice == 0 ? 0 : this.checkedParams.customerServiceSettlePrice * (inspectionCommission / 100);
                this.form.customerServicePerformance = Math.round(customerServiceSettlePrice * 100) / 100;
                // // 稽查比例
                // this.form.inspectPercent = administrativeInspectionCommission
                // // 稽查金额
                // let inspectPrice = this.form.customerServiceOrderPerformance == 0 ? 0 : this.form.customerServiceOrderPerformance * (administrativeInspectionCommission / 100);
                // this.form.inspectPrice = Math.round(inspectPrice * 100) / 100;
                return;
              } else {
                // if (type == "新客业绩") {
                //   // 提成比例
                //   this.form.performancePercent = newCustomerCommission;
                //   // 计算提成金额
                //   let customerServiceSettlePrice = this.form.customerServiceOrderPerformance == 0 ? 0 : this.form.customerServiceOrderPerformance * (newCustomerCommission / 100);
                //   this.form.customerServicePerformance = Math.round(customerServiceSettlePrice * 100) / 100;
                //   this.isCheckType()
                //   return;
                // } else if (type == "老客业绩") {
                //   // 提成比例
                //   this.form.performancePercent = oldCustomerCommission;
                //   // 计算提成金额
                //   let customerServiceSettlePrice = this.form.customerServiceOrderPerformance == 0 ? 0 : this.form.customerServiceOrderPerformance * (oldCustomerCommission / 100);
                //   this.form.customerServicePerformance = Math.round(customerServiceSettlePrice * 100) / 100;
                //   this.isCheckType()
                //   return;
                // } else {
                //   // 审核类型为其他 提成比例和提成金额为0
                //   // 提成比例
                //   this.form.performancePercent = 0;
                //   // 计算提成金额
                //   this.form.customerServicePerformance = 0;
                // }
                switch (checkType) {
                    case '0':
                      this.form.performancePercent = 0;
                      this.form.customerServicePerformance = 0;
                      break;
                    case '1':
                        if (type == "新客业绩") {
                          // 提成比例
                          this.form.performancePercent = newCustomerCommission;
                          // 计算提成金额
                          let customerServiceSettlePrice = this.form.customerServiceOrderPerformance == 0 ? 0 : this.form.customerServiceOrderPerformance * (newCustomerCommission / 100);
                          this.form.customerServicePerformance = Math.round(customerServiceSettlePrice * 100) / 100;
                          this.isCheckType()
                          return;
                        } else if (type == "老客业绩") {
                          // 提成比例
                          this.form.performancePercent = oldCustomerCommission;
                          
                          // 计算提成金额
                          let customerServiceSettlePrice = this.form.customerServiceOrderPerformance == 0 ? 0 : this.form.customerServiceOrderPerformance * (oldCustomerCommission / 100);
                          this.form.customerServicePerformance = Math.round(customerServiceSettlePrice * 100) / 100;
                          this.isCheckType()
                          return;
                        } else {
                          // 审核类型为其他 提成比例和提成金额为0
                          // 提成比例
                          this.form.performancePercent = 0;
                          // 计算提成金额
                          this.form.customerServicePerformance = 0;
                        }
                      break;
                    case '2':
                      if (type == "新客业绩") {
                        // 提成比例
                        this.form.performancePercent = cooperateLiveanchorNewCustomerCommission;
                        // 计算提成金额
                        let customerServiceSettlePrice = this.form.customerServiceOrderPerformance == 0 ? 0 : this.form.customerServiceOrderPerformance * (cooperateLiveanchorNewCustomerCommission / 100);
                        this.form.customerServicePerformance = Math.round(customerServiceSettlePrice * 100) / 100;
                        this.isCheckType()
                        return;
                      } else if (type == "老客业绩") {
                        
                        // 提成比例
                        this.form.performancePercent = cooperateLiveanchorOldCustomerCommission;
                        // 计算提成金额
                        let customerServiceSettlePrice = this.form.customerServiceOrderPerformance == 0 ? 0 : this.form.customerServiceOrderPerformance * (cooperateLiveanchorOldCustomerCommission / 100);
                        this.form.customerServicePerformance = Math.round(customerServiceSettlePrice * 100) / 100;
                        this.isCheckType()
                        return;
                      } else {
                        // 审核类型为其他 提成比例和提成金额为0
                        // 提成比例
                        this.form.performancePercent = 0;
                        // 计算提成金额
                        this.form.customerServicePerformance = 0;
                      }
                      break;
                    case '3':
                      // 提成比例
                      this.form.performancePercent = tmallOrderCommission;
                      // 计算提成金额
                      let customerServiceSettlePrice = this.form.customerServiceOrderPerformance == 0 ? 0 : this.form.customerServiceOrderPerformance * (tmallOrderCommission / 100);
                      this.form.customerServicePerformance = Math.round(customerServiceSettlePrice * 100) / 100;
                      this.isCheckType()
                      break;
                  }
              }
            }
          });
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            checkState,
            checkBelongEmpId,
            checkRemark,
            performancePercent,
            customerServicePerformance,
            checkType,
            customerServiceOrderPerformance,
            inspectEmpId,
            inspectPercent,
            inspectPrice,
            valid
          } = this.form;
          const data = {
            id: this.checkedParams.id,
            checkState,
            checkBelongEmpId,
            checkRemark,
            performancePercent,
            customerServicePerformance,
            checkType,
            isInspectPerformance:valid,
            customerServiceOrderPerformance,
            inspectEmpId,
            inspectPercent:inspectPercent ? inspectPercent : 0,
            inspectPrice:inspectPrice ? inspectPrice : 0,
          };
          if(checkBelongEmpId == inspectEmpId){
            this.$Message.warning('归属客服不能和稽查人员不能为同一人！')
            return
          }
          this.isLoading = true;
          api.checkReconciliationDocumentsSettle(data).then((res) => {
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
      this.$emit("update:examineModel", false);
      this.$refs[name].resetFields();
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel("form");
      }
    },
  },
  watch: {
    examineModel(value) {
      this.control = value;
      const {
        isOldCustomerText,
        customerServiceSettlePrice,
      } = this.checkedParams;
      this.form.type = isOldCustomerText;
      this.form.customerServiceSettlePrice = customerServiceSettlePrice;
    },
    itemInfo(value) {
      if (value.price) {
        this.form.checkBuyAgainPrice = value.price;
      }
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
</style>
