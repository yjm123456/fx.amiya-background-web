<template>
  <div>
    <Modal
      v-model="control"
      title="生成薪资单"
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
        <div class="bor">
          <Row :gutter="30">
            <Col span="8">
              <FormItem label="薪资名称" prop="name">
                <Input v-model="form.name" placeholder="请输入薪资名称"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="助理" prop="belongEmpId">
                <Select
                  v-model="form.belongEmpId"
                  placeholder="请选择助理"
                  filterable
                  @on-change="checkBelongEmpIdChange(1)"
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
              <FormItem label="职位" prop="positionName">
                <Input
                  v-model="form.positionName"
                  placeholder="请输入职位"
                  disabled
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="底薪" prop="salary">
                <Input
                  v-model="form.salary"
                  placeholder="请输入底薪"
                  type="number"
                  number
                  @on-change="amountChange"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="提成金额" prop="customerServicePerformance">
                <Input
                  v-model="form.customerServicePerformance"
                  placeholder="请输入提成金额"
                  type="number"
                  number
                  @on-change="amountChange"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="其他奖励" prop="otherPrice">
                <Input
                  v-model="form.otherPrice"
                  placeholder="请输入其他奖励"
                  type="number"
                  number
                  @on-change="amountChange"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="其他扣款" prop="otherChargebacks">
                <Input
                  v-model="form.otherChargebacks"
                  placeholder="请输入其他扣款"
                  type="number"
                  number
                  @on-change="amountChange"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="合计" prop="totalPrice">
                <Input
                  v-model="form.totalPrice"
                  placeholder="请输入合计"
                  type="number"
                  number
                  disabled
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="备注" prop="remark">
                <Input
                  v-model="form.remark"
                  placeholder="请输入备注"
                  type="textarea"
                  :rows="3"
                ></Input>
              </FormItem>
            </Col>
          </Row>
        </div>
        <div class="bor" v-if="form.positionId == 30">
          <Row :gutter="30">
            <Col span="8">
              <FormItem label="医美客资加V业绩" prop="beautyAddWechatPrice">
                <Input
                  v-model="form.beautyAddWechatPrice"
                  placeholder="请输入医美客资加V业绩"
                  type="number"
                  number
                  @on-change="administrativeCustomerService"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="带货客资加V业绩" prop="takeGoodsAddWechatPrice">
                <Input
                  v-model="form.takeGoodsAddWechatPrice"
                  placeholder="请输入带货客资加V业绩"
                  type="number"
                  number
                  @on-change="administrativeCustomerService"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="引导面诊卡下单金额" prop="consulationCardPrice">
                <Input
                  v-model="form.consulationCardPrice"
                  placeholder="请输入引导面诊卡下单金额"
                  type="number"
                  number
                  @on-change="administrativeCustomerService"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="引导面诊卡下单加v金额"
                prop="consulationCardAddWechatPrice"
              >
                <Input
                  v-model="form.consulationCardAddWechatPrice"
                  placeholder="请输入引导面诊卡下单加v金额"
                  type="number"
                  number
                  @on-change="administrativeCustomerService"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="供应链达人派单提成金额"
                prop="cooperationLiveAnchorSendOrderPrice"
              >
                <Input
                  v-model="form.cooperationLiveAnchorSendOrderPrice"
                  placeholder="请输入供应链达人派单提成金额"
                  type="number"
                  number
                  @on-change="administrativeCustomerService"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="供应链达人上门提成金额"
                prop="cooperationLiveAnchorToHospitalPrice"
              >
                <Input
                  v-model="form.cooperationLiveAnchorToHospitalPrice"
                  placeholder="请输入供应链达人上门提成金额"
                  type="number"
                  number
                  @on-change="administrativeCustomerService"
                ></Input>
              </FormItem>
            </Col>
          </Row>
        </div>
        <div
          class="bor"
          v-if="form.positionId && form.positionId != 30"
        >
          <Row :gutter="30">
            <Col span="8">
              <FormItem label="上门率(%)" prop="toHospitalRate">
                <Input
                  v-model="form.toHospitalRate"
                  placeholder="请输入上门率"
                  type="number"
                  number
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="上门率奖励" prop="toHospitalRateReword">
                <Input
                  v-model="form.toHospitalRateReword"
                  placeholder="请输入上门率奖励"
                  type="number"
                  number
                  @on-change="amountChange"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="复购率(%)" prop="repeatPurchasesRate">
                <Input
                  v-model="form.repeatPurchasesRate"
                  placeholder="请输入复购率"
                  type="number"
                  number
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="复购率奖励" prop="repeatPurchasesRateReword">
                <Input
                  v-model="form.repeatPurchasesRateReword"
                  placeholder="请输入复购率奖励"
                  type="number"
                  number
                  @on-change="amountChange"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="新客上门奖励" prop="newCustomerToHospitalReword">
                <Input
                  v-model="form.newCustomerToHospitalReword"
                  placeholder="请输入新客上门奖励"
                  type="number"
                  number
                  @on-change="amountChange"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="老客上门奖励" prop="oldCustomerToHospitalReword">
                <Input
                  v-model="form.oldCustomerToHospitalReword"
                  placeholder="请输入老客上门奖励"
                  type="number"
                  number
                  @on-change="amountChange"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="目标达成奖励" prop="targetFinishReword">
                <Input
                  v-model="form.targetFinishReword"
                  placeholder="请输入目标达成奖励"
                  type="number"
                  number
                  @on-change="amountChange"
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
        <Button type="primary" @click="handleSubmit('form')">确认</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/customerServiceCompensation";
import * as employeeManageApi from "@/api/employeeManage";
export default {
  props: {
    controlModal: Boolean,
    params: Object,
  },
  data() {
    return {
      isLoading: false,
      control: false,
      form: {
        // 薪资名称
        name: "",
        // 助理
        belongEmpId: null,
        // 总金额
        totalPrice: null,
        // 其他金额
        otherPrice: null,
        // 备注
        remark: "",
        id: "",
        // 底薪
        salary: null,
        // 提成金额
        customerServicePerformance: null,
        // 上门率
        toHospitalRate: null,
        // 上门率奖励
        toHospitalRateReword: null,
        // 复购率
        repeatPurchasesRate: null,
        // 复购率奖励
        repeatPurchasesRateReword: null,
        // 新客上门奖励
        newCustomerToHospitalReword: null,
        // 老客上门奖励
        oldCustomerToHospitalReword: null,
        // 目标达成奖励
        targetFinishReword: null,
        // 其他扣款
        otherChargebacks: null,
        // 职位
        positionName: "",
        positionId:null,
        // 医美客资加V业绩
        beautyAddWechatPrice: 0,
        // 带货客资加V业绩
        takeGoodsAddWechatPrice: 0,
        // 引导面诊卡下单金额
        consulationCardPrice: 0,
        // 引导面诊卡下单加v金额
        consulationCardAddWechatPrice: 0,
        // 供应链达人派单提成金额
        cooperationLiveAnchorSendOrderPrice: 0,
        // 供应链达人上门提成金额
        cooperationLiveAnchorToHospitalPrice: 0,
      },

      ruleValidate: {
        beautyAddWechatPrice: [
          {
            required: true,
            message: "请输入医美客资加V业绩",
          },
        ],
        takeGoodsAddWechatPrice: [
          {
            required: true,
            message: "请输入带货客资加V业绩",
          },
        ],
        consulationCardPrice: [
          {
            required: true,
            message: "请输入引导面诊卡下单金额",
          },
        ],
        consulationCardAddWechatPrice: [
          {
            required: true,
            message: "请输入引导面诊卡下单加v金额",
          },
        ],
        cooperationLiveAnchorSendOrderPrice: [
          {
            required: true,
            message: "请输入供应链达人派单提成金额",
          },
        ],
        cooperationLiveAnchorToHospitalPrice: [
          {
            required: true,
            message: "请输入供应链达人上门提成金额",
          },
        ],

        name: [
          {
            required: true,
            message: "请选择薪资名称",
          },
        ],
        belongEmpId: [
          {
            required: true,
            message: "请选择助理",
          },
        ],
        totalPrice: [
          {
            required: true,
            message: "请输入总金额",
          },
        ],
        otherPrice: [
          {
            required: true,
            message: "请输入其他奖励",
          },
        ],
        salary: [
          {
            required: true,
            message: "请输入底薪",
          },
        ],
        customerServicePerformance: [
          {
            required: true,
            message: "请输入提成金额",
          },
        ],
        toHospitalRate: [
          {
            required: true,
            message: "请输入上门率",
          },
        ],
        toHospitalRateReword: [
          {
            required: true,
            message: "请输入上门率奖励",
          },
        ],
        repeatPurchasesRate: [
          {
            required: true,
            message: "请输入复购率",
          },
        ],
        repeatPurchasesRateReword: [
          {
            required: true,
            message: "请输入复购率奖励",
          },
        ],
        newCustomerToHospitalReword: [
          {
            required: true,
            message: "请输入新客上门奖励",
          },
        ],
        oldCustomerToHospitalReword: [
          {
            required: true,
            message: "请输入老客上门奖励",
          },
        ],
        targetFinishReword: [
          {
            required: true,
            message: "请输入目标达成奖励",
          },
        ],
        otherChargebacks: [
          {
            required: true,
            message: "请输入其他扣款",
          },
        ],
      },
    };
  },
  methods: {
    // 根据id查询详情
    getDetail(value){
      api.byIdCustomerServiceCompensation(this.params.id).then((res) => {
        if (res.code === 0) {
          const {
          name,
          belongEmpId,
          totalPrice,
          otherPrice,
          remark,
          id,
          salary,
          customerServicePerformance,
          toHospitalRate,
          toHospitalRateReword,
          repeatPurchasesRate,
          repeatPurchasesRateReword,
          newCustomerToHospitalReword,
          oldCustomerToHospitalReword,
          targetFinishReword,
          otherChargebacks,
          positionName,
          beautyAddWechatPrice,
          takeGoodsAddWechatPrice,
          consulationCardPrice,
          consulationCardAddWechatPrice,
          cooperationLiveAnchorSendOrderPrice,
          cooperationLiveAnchorToHospitalPrice,
        } =  res.data.customerServiceCompensation;
        this.form.name = name;
        this.form.belongEmpId = belongEmpId;
        this.form.totalPrice = totalPrice;
        this.form.otherPrice = otherPrice;
        this.form.remark = remark;
        this.form.id = id;
        this.form.salary = salary;
        this.form.customerServicePerformance = customerServicePerformance;
        this.form.toHospitalRate = toHospitalRate;
        this.form.toHospitalRateReword = toHospitalRateReword;
        this.form.repeatPurchasesRate = repeatPurchasesRate;
        this.form.repeatPurchasesRateReword = repeatPurchasesRateReword;
        this.form.newCustomerToHospitalReword = newCustomerToHospitalReword;
        this.form.oldCustomerToHospitalReword = oldCustomerToHospitalReword;
        this.form.targetFinishReword = targetFinishReword;
        this.form.otherChargebacks = otherChargebacks;
        this.form.positionName = positionName;
        this.form.beautyAddWechatPrice = beautyAddWechatPrice;
        this.form.takeGoodsAddWechatPrice = takeGoodsAddWechatPrice;
        this.form.consulationCardPrice = consulationCardPrice;
        this.form.consulationCardAddWechatPrice = consulationCardAddWechatPrice;
        this.form.cooperationLiveAnchorSendOrderPrice = cooperationLiveAnchorSendOrderPrice;
        this.form.cooperationLiveAnchorToHospitalPrice = cooperationLiveAnchorToHospitalPrice;
          this.checkBelongEmpIdChange()
      }
      });
    },
    // 行政客服时计算方法
    administrativeCustomerService() {
      const {
        salary,
        customerServicePerformance,
        otherPrice,
        otherChargebacks,
        beautyAddWechatPrice,
        takeGoodsAddWechatPrice,
        consulationCardPrice,
        consulationCardAddWechatPrice,
        cooperationLiveAnchorSendOrderPrice,
        cooperationLiveAnchorToHospitalPrice,
      } = this.form;
      let price =
        salary +
        customerServicePerformance +
        otherPrice -
        otherChargebacks +
        beautyAddWechatPrice +
        takeGoodsAddWechatPrice +
        consulationCardPrice +
        consulationCardAddWechatPrice +
        cooperationLiveAnchorSendOrderPrice +
        cooperationLiveAnchorToHospitalPrice;
      this.form.totalPrice = Math.round(price * 100) / 100;
    },
    // 职位为行政客服时 清空数据
    clearCustomer() {
      // 上门率
      this.form.toHospitalRate = 0;
      // 上门率奖励
      this.form.toHospitalRateReword = 0;
      // 复购率
      this.form.repeatPurchasesRate = 0;
      // 复购率奖励
      this.form.repeatPurchasesRateReword = 0;
      // 新客上门奖励
      this.form.newCustomerToHospitalReword = 0;
      // 老客上门奖励
      this.form.oldCustomerToHospitalReword = 0;
      // 目标达成奖励
      this.form.targetFinishReword = 0;
    },
    // 职位为其他时 清空数据
    clearCustomer2() {
      // 医美客资加V业绩
      this.form.beautyAddWechatPrice = 0;
      // 带货客资加V业绩
      this.form.takeGoodsAddWechatPrice = 0;
      // 引导面诊卡下单金额
      this.form.consulationCardPrice = 0;
      // 引导面诊卡下单加v金额
      this.form.consulationCardAddWechatPrice = 0;
      // 供应链达人派单提成金额
      this.form.cooperationLiveAnchorSendOrderPrice = 0;
      // 供应链达人上门提成金额
      this.form.cooperationLiveAnchorToHospitalPrice = 0;
    },
    //根据员工id查询提成比例
    checkBelongEmpIdChange(value) {
      // 弹窗
      if (this.control == true) {
        this.getPositon(value)
      }
    },
    // 获取职位
    getPositon(value){
      employeeManageApi.byIdGetAmiyaEmployee(this.form.belongEmpId).then((res) => {
          if (res.code === 0) {
            const { positionName,positionId} = res.data.employeeInfo;
            this.form.positionName = positionName;
            this.form.positionId = positionId
            if(value==1){
              this.clearCustomer();
              this.clearCustomer2();
            }
            if (positionName == "行政客服") {
              this.clearCustomer();
              this.administrativeCustomerService();
            } else {
              this.clearCustomer2();
              this.amountChange();
            }
          }
        });
    },
    // 合计
    amountChange() {
      const {
        salary,
        customerServicePerformance,
        toHospitalRateReword,
        repeatPurchasesRateReword,
        newCustomerToHospitalReword,
        oldCustomerToHospitalReword,
        targetFinishReword,
        otherPrice,
        otherChargebacks,
        positionId,
        beautyAddWechatPrice , 
        takeGoodsAddWechatPrice ,
        consulationCardPrice,
        consulationCardAddWechatPrice,
        cooperationLiveAnchorSendOrderPrice ,
        cooperationLiveAnchorToHospitalPrice

      } = this.form;
      if(positionId != 30){
        let price =
        salary + customerServicePerformance + toHospitalRateReword + repeatPurchasesRateReword + newCustomerToHospitalReword +  oldCustomerToHospitalReword + targetFinishReword +
        otherPrice - otherChargebacks;
        this.form.totalPrice = Math.round(price * 100) / 100;
      }else{
        let price =
        salary + customerServicePerformance + beautyAddWechatPrice + takeGoodsAddWechatPrice +consulationCardPrice+consulationCardAddWechatPrice+cooperationLiveAnchorSendOrderPrice +cooperationLiveAnchorToHospitalPrice+otherPrice - otherChargebacks;
        this.form.totalPrice = Math.round(price * 100) / 100;
      }
      
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.isLoading = true;
          // 生成发票
          api.editCustomerServiceCompensation(this.form).then((res) => {
            if (res.code === 0) {
              this.isLoading = false;
              this.handleCancel("form");
              this.$emit("getContractListClick");
              this.$Message.success({
                content: "修改成功！",
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
      this.$emit("update:controlModal", false);
      // this.$emit("getListWithPageByCustomerCompensation");
      this.$refs["form"].resetFields();
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.$emit("update:controlModal", false);
        // this.$emit("getListWithPageByCustomerCompensation");
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {},
  watch: {
    controlModal(value) {
      this.control = value;
      // if (value === true) {
      //   const {
      //     name,
      //     belongEmpId,
      //     totalPrice,
      //     otherPrice,
      //     remark,
      //     id,
      //     salary,
      //     customerServicePerformance,
      //     toHospitalRate,
      //     toHospitalRateReword,
      //     repeatPurchasesRate,
      //     repeatPurchasesRateReword,
      //     newCustomerToHospitalReword,
      //     oldCustomerToHospitalReword,
      //     targetFinishReword,
      //     otherChargebacks,
      //     positionName,
      //     beautyAddWechatPrice,
      //     takeGoodsAddWechatPrice,
      //     consulationCardPrice,
      //     consulationCardAddWechatPrice,
      //     cooperationLiveAnchorSendOrderPrice,
      //     cooperationLiveAnchorToHospitalPrice,
      //   } = this.params.detailObj;
      //   this.form.name = name;
      //   this.form.belongEmpId = belongEmpId;
      //   this.form.totalPrice = totalPrice;
      //   this.form.otherPrice = otherPrice;
      //   this.form.remark = remark;
      //   this.form.id = id;
      //   this.form.salary = salary;
      //   this.form.customerServicePerformance = customerServicePerformance;
      //   this.form.toHospitalRate = toHospitalRate;
      //   this.form.toHospitalRateReword = toHospitalRateReword;
      //   this.form.repeatPurchasesRate = repeatPurchasesRate;
      //   this.form.repeatPurchasesRateReword = repeatPurchasesRateReword;
      //   this.form.newCustomerToHospitalReword = newCustomerToHospitalReword;
      //   this.form.oldCustomerToHospitalReword = oldCustomerToHospitalReword;
      //   this.form.targetFinishReword = targetFinishReword;
      //   this.form.otherChargebacks = otherChargebacks;
      //   this.form.positionName = positionName;
      //   this.form.beautyAddWechatPrice = beautyAddWechatPrice;
      //   this.form.takeGoodsAddWechatPrice = takeGoodsAddWechatPrice;
      //   this.form.consulationCardPrice = consulationCardPrice;
      //   this.form.consulationCardAddWechatPrice = consulationCardAddWechatPrice;
      //   this.form.cooperationLiveAnchorSendOrderPrice = cooperationLiveAnchorSendOrderPrice;
      //   this.form.cooperationLiveAnchorToHospitalPrice = cooperationLiveAnchorToHospitalPrice;
      // }
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
.bor {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px 10px 0px 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
</style>
