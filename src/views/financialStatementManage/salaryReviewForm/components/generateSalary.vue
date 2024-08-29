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
              label="底薪"
              prop="salary"
              :rules="[
                {
                  required: true,
                  message: '底薪(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.salary"
                placeholder="底薪(最小是0)"
                type="number"
                number
                @on-change="amountChange"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="提成金额"
              prop="customerServicePerformance"
              :rules="[
                {
                  required: true,
                  message: '提成金额(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.customerServicePerformance"
                placeholder="提成金额(最小是0)"
                type="number"
                number
                @on-change="amountChange"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="上门率(%)"
              prop="toHospitalRate"
              :rules="[
                {
                  required: true,
                  message: '上门率(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.toHospitalRate"
                placeholder="上门率(最小是0)"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="上门率奖励"
              prop="toHospitalRateReword"
              :rules="[
                {
                  required: true,
                  message: '上门率奖励(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.toHospitalRateReword"
                placeholder="上门率奖励(最小是0)"
                type="number"
                number
                @on-change="amountChange"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="复购率(%)"
              prop="repeatPurchasesRate"
              :rules="[
                {
                  required: true,
                  message: '复购率(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.repeatPurchasesRate"
                placeholder="复购率(最小是0)"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="复购率奖励"
              prop="repeatPurchasesRateReword"
              :rules="[
                {
                  required: true,
                  message: '复购率奖励(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.repeatPurchasesRateReword"
                placeholder="复购率奖励(最小是0)"
                type="number"
                number
                @on-change="amountChange"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="新客上门奖励"
              prop="newCustomerToHospitalReword"
              :rules="[
                {
                  required: true,
                  message: '新客上门奖励(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.newCustomerToHospitalReword"
                placeholder="新客上门奖励(最小是0)"
                type="number"
                number
                @on-change="amountChange"
                style="width:86%"
              ></Input>
              <Tooltip
                :content="newCustomerToHospitalRewordPeople"
                placement="top-start"
              >
                <i
                  class="iconfont icon-info"
                  style="color:rgb(58 143 233);margin-left:10px;font-size:22px;"
                ></i>
              </Tooltip>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客上门奖励"
              prop="oldCustomerToHospitalReword"
              :rules="[
                {
                  required: true,
                  message: '老客上门奖励(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.oldCustomerToHospitalReword"
                placeholder="老客上门奖励(最小是0)"
                type="number"
                number
                @on-change="amountChange"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="目标达成奖励"
              prop="targetFinishReword"
              :rules="[
                {
                  required: true,
                  message: '目标达成奖励(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.targetFinishReword"
                placeholder="目标达成奖励(最小是0)"
                type="number"
                number
                @on-change="amountChange"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老带新提成"
              prop="oldTakeNewCustomerPrice"
              :rules="[
                {
                  required: true,
                  message: '老带新提成(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.oldTakeNewCustomerPrice"
                placeholder="老带新提成(最小是0)"
                type="number"
                number
                @on-change="amountChange"
                style="width:86%"
              ></Input>
              <Tooltip :content="oldTakeNewCustomerNum" placement="top-start">
                <i
                  class="iconfont icon-info"
                  style="color:rgb(58 143 233);margin-left:10px;font-size:22px;"
                ></i>
              </Tooltip>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="其他奖励"
              prop="otherPrice"
              :rules="[
                {
                  required: true,
                  message: '其他奖励(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.otherPrice"
                placeholder="其他奖励(最小是0)"
                type="number"
                number
                @on-change="amountChange"
                style="width:86%"
              ></Input>
              <Tooltip :content="targetCompletionRate" placement="top-start">
                <i
                  class="iconfont icon-info"
                  style="color:rgb(58 143 233);margin-left:10px;font-size:22px;"
                ></i>
              </Tooltip>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="其他扣款"
              prop="otherChargebacks"
              :rules="[
                {
                  required: true,
                  message: '其他扣款(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.otherChargebacks"
                placeholder="其他扣款(最小是0)"
                type="number"
                number
                @on-change="amountChange"
                style="width:86%"
              ></Input>
              <Tooltip :content="targetCompletionRate" placement="top-start">
                <i
                  class="iconfont icon-info"
                  style="color:rgb(58 143 233);margin-left:10px;font-size:22px;"
                ></i>
              </Tooltip>
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
        <Spin fix v-if="isLoading == true">
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div>加载中...</div>
        </Spin>
      </Form>
      <div slot="footer">
        <Button
          type="primary"
          style="margin-left: 10px"
          @click="automaticFilling()"
          >自动填写（助理目标奖励）</Button
        >
        <Button @click="handleCancel('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确认</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/customerServiceCompensation";
export default {
  props: {
    generateSalaryModel: Boolean,
    generateSalaryParams: Object,
    params: Object,
    startDate: String,
    endDate: String,
  },
  data() {
    return {
      // 新客奖励人数
      newCustomerToHospitalRewordPeople: "新客上门 0 人",
      // 目标完成率
      targetCompletionRate: "总业绩目标完成率 0%",
      // 老带新人数
      oldTakeNewCustomerNum: "老带新0人",
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
        // 对账单id集合
        recommandDocumentSettleIdList: [],
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
        // 老带新提成
        oldTakeNewCustomerPrice: 0,
      },

      ruleValidate: {
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
        oldTakeNewCustomerPrice: [
          {
            required: true,
            message: "请输入老带新提成",
          },
        ],
      },
    };
  },
  methods: {
    // 自动填写
    automaticFilling() {
      if (!this.form.belongEmpId) {
        this.$Message.warning("请先选择助理！");
        return;
      }
      if (
        this.$moment(new Date(this.startDate)).format("YYYY-MM") !=
        this.$moment(new Date(this.endDate)).format("YYYY-MM")
      ) {
        this.$Message.warning("列表开始时间和结束时间必须是同年月！");
        return;
      }
      const data = {
        startDate: this.startDate,
        endDate: this.endDate,
        empId: this.form.belongEmpId,
      };

      api.getNewCustomerToHospiatlAndTargetComplete(data).then((res) => {
        if (res.code == 0) {
          const {
            newCustomerToHospitalCount,
            targetComplete,
            oldTakeNewCustomerNum,
          } = res.data.data;
          this.newCustomerToHospitalRewordPeople =
            "新客上门 " + newCustomerToHospitalCount + " 人";
          this.targetCompletionRate =
            "总业绩目标完成率 " + targetComplete + "%";

          // 老带新人数
          this.oldTakeNewCustomerNum = "老带新" + oldTakeNewCustomerNum + "人";
          // 老带新提成
          this.form.oldTakeNewCustomerPrice =
            Math.round(oldTakeNewCustomerNum * 200 * 100) / 100;
          // 1、助理：个人总体目标完成情况下：总目标低于80% 扣款1000；完成100-110%奖励1000；完成110-120%：奖励1500；完成>=120%，奖励2000

          if (targetComplete < 80) {
            this.form.otherChargebacks = 1000;
            this.form.otherPrice = 0;
          } else if (targetComplete >= 100 && targetComplete < 110) {
            this.form.otherPrice = 1000;
            this.form.otherChargebacks = 0;
          } else if (targetComplete >= 110 && targetComplete < 120) {
            this.form.otherPrice = 1500;
            this.form.otherChargebacks = 0;
          } else if (targetComplete >= 120) {
            this.form.otherPrice = 2000;
            this.form.otherChargebacks = 0;
          }
          // 2、新客目标：条件 ：总体目标完成>=100%奖励新客上门每个人100；
          if (targetComplete >= 100) {
            this.form.newCustomerToHospitalReword =
              Math.round(newCustomerToHospitalCount * 100 * 100) / 100;
          }
          this.amountChange();
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
        oldTakeNewCustomerPrice,
      } = this.form;
      let price =
        salary + 
        customerServicePerformance +
        toHospitalRateReword +
        repeatPurchasesRateReword +
        newCustomerToHospitalReword +
        oldCustomerToHospitalReword +
        targetFinishReword +
        otherPrice +
        oldTakeNewCustomerPrice -
        otherChargebacks;
      this.form.totalPrice = Math.round(price * 100) / 100;
    },

    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.isLoading = true;
          // 生成发票
          api.addCustomerServiceCompensation(this.form).then((res) => {
            if (res.code === 0) {
              this.isLoading = false;
              this.handleCancel("form");
              this.$Message.success({
                content: "已成功生成助理薪资单",
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
      this.$emit("update:generateSalaryModel", false);
      this.$emit("getListWithPageByCustomerCompensation");
      this.$refs["form"].resetFields();
      this.newCustomerToHospitalRewordPeople = "新客上门 0 人";
      // 目标完成率
      this.targetCompletionRate = "总业绩目标完成率 0%";
      // 老带新
      this.oldTakeNewCustomerNum = "老带新0人";
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.$emit("update:generateSalaryModel", false);
        this.$emit("getListWithPageByCustomerCompensation");
        this.$refs["form"].resetFields();
      }
    },
  },
  mounted() {},
  watch: {
    generateSalaryModel(value) {
      let orderId = [];
      this.control = value;
      let price = 0;
      if (value == true) {
        // 取orderid
        // 合计提成金额
        this.generateSalaryParams.generateSalaryList.map((item) => {
          orderId.push(item.id);
          price += item.customerServicePerformance;
          return price;
        });
        this.form.recommandDocumentSettleIdList = orderId;
        // 银行家算法保留两位小数
        this.form.customerServicePerformance = Math.round(price * 100) / 100;
      }
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
