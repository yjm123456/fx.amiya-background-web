<template>
  <div>
    <Modal
      v-model="control"
      title="详情"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="80%"
    >
      <div>
        <div>
          <span class="title"
            >薪资名称：<span class="num">{{ form.name }}</span>
          </span>
          <span class="title"
            >助理：<span class="num">{{ form.belongEmpName }}</span>
          </span>
          <span class="title"
            >职位：<span class="num">{{ form.positionName }}</span>
          </span>
          <span class="title"
            >底薪：<span class="num">{{ form.salary }}</span>
          </span>
          <span class="title"
            >提成金额：<span class="num">{{
              form.customerServicePerformance
            }}</span>
          </span>
          <span class="title"
            >其他奖励：<span class="num">{{ form.otherPrice }}</span>
          </span>
          <span class="title"
            >其他扣款：<span class="num">{{ form.otherChargebacks }}</span>
          </span>
          <span class="title"
            >合计：<span class="num">{{ form.totalPrice }}</span>
          </span>
        </div>
      </div>
      <div v-if="form.positionId == 30" class="m_r">
        <div>
          <span class="title"
            >加v率达成业绩：<span class="num">{{
              form.addWechatCompletePrice
            }}</span>
          </span>
          <span class="title"
            >线索登记业绩：<span class="num">{{
              form.addClueCompletePrice
            }}</span>
          </span>
          <span class="title"
            >医美客资加V业绩：<span class="num">{{
              form.beautyAddWechatPrice
            }}</span>
          </span>
          <span class="title"
            >带货客资加V业绩：<span class="num">{{
              form.takeGoodsAddWechatPrice
            }}</span>
          </span>
          <span class="title"
            >引导面诊卡下单金额：<span class="num">{{
              form.consulationCardPrice
            }}</span>
          </span>
          <span class="title"
            >引导面诊卡下单加v金额：<span class="num">{{
              form.consulationCardAddWechatPrice
            }}</span>
          </span>
          <span class="title"
            >供应链达人派单提成金额：<span class="num">{{
              form.cooperationLiveAnchorSendOrderPrice
            }}</span>
          </span>
          <span class="title"
            >供应链达人上门提成金额：<span class="num">{{
              form.cooperationLiveAnchorToHospitalPrice
            }}</span>
          </span>
        </div>
      </div>
      <div v-if="form.positionId && form.positionId != 30" class="m_r">
        <div>
          <span class="title"
            >上门率：<span class="num">{{ form.toHospitalRate }}%</span>
          </span>
          <span class="title"
            >上门率奖励：<span class="num">{{
              form.toHospitalRateReword
            }}</span>
          </span>
          <span class="title"
            >复购率：<span class="num">{{ form.repeatPurchasesRate }}%</span>
          </span>
          <span class="title"
            >复购率奖励：<span class="num">{{
              form.repeatPurchasesRateReword
            }}</span>
          </span>
          <span class="title"
            >新客上门奖励：<span class="num">{{
              form.newCustomerToHospitalReword
            }}</span>
          </span>
          <span class="title"
            >老客上门奖励：<span class="num">{{
              form.oldCustomerToHospitalReword
            }}</span>
          </span>
          <span class="title"
            >目标达成奖励：<span class="num">{{
              form.targetFinishReword
            }}</span>
          </span>
        </div>
      </div>
      <Tabs ref="tabs" v-model="activeName" type="card" style="margin-top:10px">
        <TabPane label="订单业绩" name="orderPerformance">
          <div>
            <orderPerformance
              :activeName="activeName"
              :detailParams="detailParams"
              ref="orderPerformance"
            ></orderPerformance>
          </div>
        </TabPane>
        <TabPane label="稽查业绩" name="auditPerformance">
          <div>
            <auditPerformance
              :activeName="activeName"
              :detailParams="detailParams"
              ref="auditPerformance"
            ></auditPerformance>
          </div>
        </TabPane>
      </Tabs>
      
      <div slot="footer" class="footer">
        <Button @click="cancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import orderPerformance from "./orderPerformance.vue";
import auditPerformance from "./auditPerformance.vue";
import * as employeeManageApi from "@/api/employeeManage";
import * as api from "@/api/customerServiceCompensation";

export default {
  components: {
    orderPerformance,
    auditPerformance,
  },
  props: {
    detailParams: Object,
    detailModal: Boolean,
  },
  data() {
    return {
      
      control: false,
      activeName: "orderPerformance",
      form: {
        // 薪资名称
        name: "",
        // 助理
        belongEmpName: "",
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
        positionId: null,
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
        // 加v率达成情况
        addWechatCompletePrice: 0,
        // 线索登记完成率
        addClueCompletePrice: 0,
      },
    };
  },
  methods: {
    // 根据id查询详情
    getDetail(value) {
      
      api.byIdCustomerServiceCompensation(this.detailParams.id).then((res) => {
        if (res.code === 0) {
          const {
            name,
            belongEmpName,
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
            addWechatCompletePrice,
            addClueCompletePrice,
            belongEmpId,
          } = res.data.customerServiceCompensation;
          
          this.form.name = name;
          this.form.belongEmpName = belongEmpName;
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
          this.form.addWechatCompletePrice = addWechatCompletePrice;
          this.form.addClueCompletePrice = addClueCompletePrice;
          this.getPositon();
        }
      });
    },
    // 获取职位
    getPositon() {
      employeeManageApi
        .byIdGetAmiyaEmployee(this.form.belongEmpId)
        .then((res) => {
          if (res.code === 0) {
            const { positionName, positionId } = res.data.employeeInfo;
            this.form.positionName = positionName;
            this.form.positionId = positionId;
          }
        });
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.$emit("update:detailModal", false);
      }
    },
    cancel(value) {
      this.$emit("update:detailModal", false);
    },
  },
  watch: {
    detailModal(value) {
      this.control = value;
      if (value == true) {
        this.getDetail();
        if (this.activeName == "orderPerformance") {
          this.$nextTick(() => {
            this.$refs.orderPerformance.getDetail();
          });
        } else if (this.activeName == "auditPerformance") {
          this.$nextTick(() => {
            this.$refs.auditPerformance.getListWithPageByCustomerInspectDatas();
          });
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.header_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
.title {
  font-size: 14px;
  margin-right: 15px;
}
.num {
  color: red;
}
.m_r {
  margin: 10px 0;
}
</style>
