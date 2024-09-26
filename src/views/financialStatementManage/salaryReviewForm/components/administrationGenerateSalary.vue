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
                  @on-change="checkBelongEmpIdChange"
                >
                  <!-- params.employeeList -->
                  <Option
                    v-for="item in params.employeePosition"
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
                  placeholder="请输入底薪(最小是0)"
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
                  style="width:84%"
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
                ></Input>
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
          <Row :gutter="30">
            <Col span="4">
              <FormItem label="特定医院上门奖励" prop="valid">
                <i-switch v-model="form.valid" />
              </FormItem>
            </Col>
            <Select
              v-model="form.hospitalIdList"
              placeholder="请选择医院"
              filterable
              multiple
              style="width:200px"
              v-if="form.valid == true"
            >
              <Option
                v-for="item in params.hospitalInfo"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            <Button
              type="primary"
              style="margin-left: 10px"
              @click="getQuery()"
              v-if="form.valid == true"
              >查询</Button
            >
            <Col span="8" v-if="form.valid == true">
              <FormItem
                label="奖励金额"
                prop="specialHospitalVisitPrice"
                :rules="[
                {
                  required: true,
                  message: '奖励金额(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
              >
                <Input
                  v-model="form.specialHospitalVisitPrice"
                  placeholder="奖励金额(最小是0)"
                  type="number"
                  number
                  @on-change="amountChange"
                  style="width:85%;"
                ></Input>

                <Tooltip placement="top-start">
                  <i
                    class="iconfont icon-info"
                    style="color:rgb(58 143 233);margin-left:10px;font-size:22px"
                  ></i>
                  <template #content>
                    <p>{{ rewardAmountPeople }}</p>
                  </template>
                </Tooltip>
              </FormItem>
            </Col>
            
            
          </Row>
        </div>
        <div class="bor" v-if="form.positionId == 30">
          <Row :gutter="30">
            <Col span="8">
              <FormItem
                label="加v达成业绩"
                prop="addWechatCompletePrice"
              >
                <Input
                  v-model="form.addWechatCompletePrice"
                  placeholder="加v达成业绩(最小是0)"
                  type="number"
                  number
                  @on-change="amountChange"
                  style="width:85%;"
                ></Input>

                <Tooltip placement="top-start">
                  <i
                    class="iconfont icon-info"
                    style="color:rgb(58 143 233);margin-left:10px;font-size:22px"
                  ></i>
                  <template #content>
                    <p>{{ centent5 }}</p>
                  </template>
                </Tooltip>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="线索登记业绩"
                prop="addClueCompletePrice"
              >
                <Input
                  v-model="form.addClueCompletePrice"
                  placeholder="线索登记业绩(最小是0)"
                  type="number"
                  number
                  @on-change="amountChange"
                  style="width:85%;"
                ></Input>

                <Tooltip placement="top-start">
                  <i
                    class="iconfont icon-info"
                    style="color:rgb(58 143 233);margin-left:10px;font-size:22px"
                  ></i>
                  <template #content>
                    <p>{{ centent6 }}</p>
                    <p>{{ centent7 }}</p>
                    <p>{{ centent8 }}</p>
                  </template>
                </Tooltip>
              </FormItem>
            </Col>
            <!-- @on-change="administrativeCustomerService" -->
            <Col span="8">
              <FormItem
                label="医美客资加V业绩（单个15元）"
                prop="beautyAddWechatPrice"
                :rules="[
                  {
                    required: true,
                    message: '医美客资加V业绩(最小是0)',
                    trigger: 'change',
                    type: 'number',
                    min: 0,
                  },
                ]"
              >
                <Input
                  v-model="form.beautyAddWechatPrice"
                  placeholder="医美客资加V业绩(最小是0)"
                  type="number"
                  number
                  @on-change="amountChange"
                  style="width:85%;"
                ></Input>

                <Tooltip :content="centent1" placement="top-start">
                  <i
                    class="iconfont icon-info"
                    style="color:rgb(58 143 233);margin-left:10px;font-size:22px"
                  ></i>
                </Tooltip>
              </FormItem>
            </Col>
            <!-- @on-change="administrativeCustomerService" -->
            <Col span="8">
              <FormItem
                label="带货客资加V业绩（单个5元）"
                prop="takeGoodsAddWechatPrice"
                :rules="[
                  {
                    required: true,
                    message: '带货客资加V业绩(最小是0)',
                    trigger: 'change',
                    type: 'number',
                    min: 0,
                  },
                ]"
              >
                <Input
                  v-model="form.takeGoodsAddWechatPrice"
                  placeholder="带货客资加V业绩(最小是0)"
                  type="number"
                  number
                  @on-change="amountChange"
                  style="width:85%;"
                ></Input>
                <Tooltip :content="centent2" placement="top-start">
                  <i
                    class="iconfont icon-info"
                    style="color:rgb(58 143 233);margin-left:10px;font-size:22px"
                  ></i>
                </Tooltip>
              </FormItem>
            </Col>
            <!-- @on-change="administrativeCustomerService" -->
            <Col span="8">
              <FormItem
                label="引导面诊卡下单金额"
                prop="consulationCardPrice"
                :rules="[
                  {
                    required: true,
                    message: '引导面诊卡下单金额(最小是0)',
                    trigger: 'change',
                    type: 'number',
                    min: 0,
                  },
                ]"
              >
                <Input
                  v-model="form.consulationCardPrice"
                  placeholder="引导面诊卡下单金额(最小是0)"
                  type="number"
                  number
                  @on-change="amountChange"
                ></Input>
              </FormItem>
            </Col>
            <!--  @on-change="administrativeCustomerService" -->
            <Col span="8">
              <FormItem
                label="引导面诊卡下单加v金额"
                prop="consulationCardAddWechatPrice"
                :rules="[
                  {
                    required: true,
                    message: '引导面诊卡下单加v金额(最小是0)',
                    trigger: 'change',
                    type: 'number',
                    min: 0,
                  },
                ]"
              >
                <Input
                  v-model="form.consulationCardAddWechatPrice"
                  placeholder="引导面诊卡下单加v金额(最小是0)"
                  type="number"
                  number
                  @on-change="amountChange"
                ></Input>
              </FormItem>
            </Col>
            <!-- @on-change="administrativeCustomerService" -->
            <Col span="8">
              <FormItem
                label="供应链达人派单提成金额（单个7元）"
                prop="cooperationLiveAnchorSendOrderPrice"
                :rules="[
                  {
                    required: true,
                    message: '供应链达人派单提成金额(最小是0)',
                    trigger: 'change',
                    type: 'number',
                    min: 0,
                  },
                ]"
              >
                <Input
                  v-model="form.cooperationLiveAnchorSendOrderPrice"
                  placeholder="供应链达人派单提成金额(最小是0)"
                  type="number"
                  number
                  @on-change="amountChange"
                  style="width:85%;"
                ></Input>
                <Tooltip :content="centent3" placement="top-start">
                  <i
                    class="iconfont icon-info"
                    style="color:rgb(58 143 233);margin-left:10px;font-size:22px"
                  ></i>
                </Tooltip>
              </FormItem>
            </Col>
            <!-- @on-change="administrativeCustomerService" -->
            <Col span="8">
              <FormItem
                label="供应链达人上门提成金额（单个20元）"
                prop="cooperationLiveAnchorToHospitalPrice"
                :rules="[
                  {
                    required: true,
                    message: '供应链达人上门提成金额(最小是0)',
                    trigger: 'change',
                    type: 'number',
                    min: 0,
                  },
                ]"
              >
                <Input
                  v-model="form.cooperationLiveAnchorToHospitalPrice"
                  placeholder="供应链达人上门提成金额(最小是0)"
                  type="number"
                  number
                  @on-change="amountChange"
                  style="width:85%;"
                ></Input>
                <Tooltip :content="centent4" placement="top-start">
                  <i
                    class="iconfont icon-info"
                    style="color:rgb(58 143 233);margin-left:10px;font-size:22px"
                  ></i>
                </Tooltip>
              </FormItem>
            </Col>
          </Row>
        </div>
        <div class="bor" v-if="form.positionId && form.positionId != 30">
          <Row :gutter="30">
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
                ></Input>
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
          </Row>
          
        </div>
        

        <Spin fix v-if="isLoading == true">
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div>加载中...</div>
        </Spin>
      </Form>
      <div slot="footer">
        <Button
          type="primary"
          @click="JiaVHandleSubmit"
          v-if="form.positionName == '行政客服'"
          >自动填写（线索、加v）</Button
        >
        <Button
          type="primary"
          @click="visitHandleSubmit"
          style="margin-right:30px"
          v-if="form.positionName == '行政客服'"
          >自动填写（派单上门）</Button
        >

        <Button @click="handleCancel('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确认</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/customerServiceCompensation";
import * as employeeManageApi from "@/api/employeeManage";
import * as healthValueApi from "@/api/healthValue";

export default {
  props: {
    administrationGenerateSalaryModel: Boolean,
    filterCriteria: Object,
    params: Object,
  },
  data() {
    return {
      // 奖励金额
      rewardAmountPeople:'当前助理在选中医院上门顾客 0 人',
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
        salary: 0,
        // 提成金额
        customerServicePerformance: null,
        // 上门率
        toHospitalRate: 0,
        // 上门率奖励
        toHospitalRateReword: 0,
        // 复购率
        repeatPurchasesRate: 0,
        // 复购率奖励
        repeatPurchasesRateReword: 0,
        // 新客上门奖励
        newCustomerToHospitalReword: 0,
        // 老客上门奖励
        oldCustomerToHospitalReword: 0,
        // 目标达成奖励
        targetFinishReword: 0,
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
        // 加v达成业绩
        addWechatCompletePrice: 0,
        // 线索登记业绩
        addClueCompletePrice: 0,
        // 老带新提成
        oldTakeNewCustomerPrice: 0,
        // 特定医院上门奖励
        valid:false,
        // 医院
        hospitalIdList:[],
        // 奖励金额
        specialHospitalVisitPrice:0
      },

      ruleValidate: {
        oldTakeNewCustomerPrice: [
          {
            required: true,
            message: "请输入老带新提成",
          },
        ],
        addWechatCompletePrice: [
          {
            required: true,
            message: "请输入加v达成业绩",
          },
        ],
        addClueCompletePrice: [
          {
            required: true,
            message: "请输入线索登记业绩",
          },
        ],
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
      // 医美客资加v业绩
      centent1: "当前组医美客资加V：0个",
      // 当前组带货客资加V
      centent2: "当前组带货客资加V：0个",
      // 供应链达人派单提成金额
      centent3: "供应链达人派单人数：0人",
      // 供应链达人上门提成功能金额
      centent4: "供应链达人上门人数：0人",
      // 加v达成业绩
      centent5: "当前组加v率：0%",
      // 供线索登记完成率
      centent6: "当前助理线索登记量：0",
      centent7: "当前助理线索登记目标：0",
      centent8: "当前助理线索登记完成率：0%",
      // 当月加v率健康值
      AddWeChatHealthValueThisMonth: 0,
      // 老带新人数
      oldTakeNewCustomerNum: "老带新0人",
    };
  },
  methods: {
    // 查询
    getQuery(){
      const {belongEmpId,hospitalIdList,valid} = this.form
      const data = {
        startDate:this.$moment(new Date(this.filterCriteria.startDate)).format("YYYY-MM-DD"),
        endDate:this.$moment(new Date(this.filterCriteria.endDate)).format("YYYY-MM-DD"),
        assistantId:belongEmpId,
        hospitalIdList:String(hospitalIdList),
      }
      if (!belongEmpId) {
        this.$Message.warning("请先选择助理！");
        return;
      }
      if(valid == true && hospitalIdList == [] || hospitalIdList.length == 0){
        this.$Message.warning('请选择医院')
        return
      }
      if (this.$moment(new Date(this.filterCriteria.startDate)).format("YYYY-MM") != this.$moment(new Date(this.filterCriteria.endDate)).format("YYYY-MM") ) {
        this.$Message.warning("列表开始时间和结束时间必须是同年月！");
        return;
      }
      api.getToHospitalCount(data).then(res=>{
        if(res.code == 0){
          const {toHospitalCount} = res.data.data
          this.rewardAmountPeople = '当前助理在选中医院上门顾客 ' +  toHospitalCount + ' 人'
          this.form.specialHospitalVisitPrice =  Math.round(toHospitalCount * 100 * 100) / 100
          this.amountChange()
        }
      })
      
    },
    // 获取当月获客情况数据
    getHealthValueLists() {
      healthValueApi.getHealthValid().then((res) => {
        if (res.code == 0) {
          const { list } = res.data;
          // 当月加v健康值
          this.AddWeChatHealthValueThisMonth = list.find(
            (item) => item.id == "AddWeChatHealthValueThisMonth"
          ).rate;
        }
      });
    },
    // 加v自动获取
    JiaVHandleSubmit() {
      const data = {
        employeeId: this.form.belongEmpId,
        sartDate: this.$moment(this.filterCriteria.startDate).format(
          "YYYY-MM-DD"
        ),
        endDate: this.$moment(this.filterCriteria.endDate).format("YYYY-MM-DD"),
      };
      api.getAddWechatNumByCreateEmpInfoAndDate(data).then((res) => {
        if (res.code == 0) {
          const {
            beautyCustomerAddWechatNum,
            takeGoodsCustomerAddWechatNum,
            addWeChatRate,
            shoppingCartRegistionAddNumAndCompleteRateVo,
          } = res.data.AddWechatNumByCreateEmpInfoAndDate;
          // this.form.beautyAddWechatPrice = Math.round( (beautyCustomerAddWechatNum * 5) *1000 / 10 ) / 100
          // this.form.takeGoodsAddWechatPrice = Math.round( (takeGoodsCustomerAddWechatNum * 15) *1000 / 10 ) / 100
          this.form.beautyAddWechatPrice =
            Math.round((beautyCustomerAddWechatNum * 15 * 1000) / 10) / 100;
          this.form.takeGoodsAddWechatPrice =
            Math.round((takeGoodsCustomerAddWechatNum * 5 * 1000) / 10) / 100;
          this.centent1 =
            "当前组医美客资加V：" + beautyCustomerAddWechatNum + "个";
          this.centent2 =
            "当前组带货客资加V：" + takeGoodsCustomerAddWechatNum + "个";
          // 加v达成业绩
          this.centent5 = "当前组加v率：" + addWeChatRate + "%";
          // 当前组加v率 大于 当月加v健康值的话是0 小于扣除300
          this.form.addWechatCompletePrice =
            addWeChatRate >= this.AddWeChatHealthValueThisMonth ? 0 : -300;
          // 供线索登记完成率
          this.centent6 =
            "当前助理线索登记量：" +
            shoppingCartRegistionAddNumAndCompleteRateVo.createNum;
          this.centent7 =
            "当前助理线索登记目标：" +
            shoppingCartRegistionAddNumAndCompleteRateVo.createNumTarget;
          this.centent8 =
            "当前助理线索登记完成率：" +
            shoppingCartRegistionAddNumAndCompleteRateVo.createNumCompleteRate +
            "%";
          // 供线索登记完成率 大于等于100 奖励500 小于扣除300
          this.form.addClueCompletePrice =
            shoppingCartRegistionAddNumAndCompleteRateVo.createNumCompleteRate >=
            100
              ? 500
              : -300;
          this.amountChange();
        }
      });
    },
    // 自动获取
    visitHandleSubmit() {
      const data = {
        sendStartDate: this.$moment(this.filterCriteria.startDate).format(
          "YYYY-MM-DD"
        ),
        sendEndDate: this.$moment(this.filterCriteria.endDate).format(
          "YYYY-MM-DD"
        ),
        employeeId: this.form.belongEmpId,
      };
      api.getCooperationLiveAnchorSendAndVisitNum(data).then((res) => {
        if (res.code == 0) {
          const {
            sendOrderNum,
            visitNum,
            oldTakeNewDealNum,
          } = res.data.CooperationLiveAnchorSendAndVisitNum;
          // 派单
          this.form.cooperationLiveAnchorSendOrderPrice =
            Math.round((sendOrderNum * 7 * 1000) / 10) / 100;
          this.form.cooperationLiveAnchorToHospitalPrice =
            Math.round((visitNum * 20 * 1000) / 10) / 100;
          this.centent3 = "供应链达人派单人数" + sendOrderNum + "人";
          this.centent4 = "供应链达人上门人数" + visitNum + "人";
          // 老带新人数
          this.oldTakeNewCustomerNum = "老带新" + oldTakeNewDealNum + "人";
          // 老带新提成
          this.form.oldTakeNewCustomerPrice = Number(
            Math.round(oldTakeNewDealNum * 200 * 100) / 100
          );
          this.amountChange();
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
        Number(salary) +
        Number(customerServicePerformance) +
        Number(otherPrice) -
        Number(otherChargebacks) +
        Number(beautyAddWechatPrice) +
        Number(takeGoodsAddWechatPrice) +
        Number(consulationCardPrice) +
        Number(consulationCardAddWechatPrice) +
        Number(cooperationLiveAnchorSendOrderPrice) +
        Number(cooperationLiveAnchorToHospitalPrice);
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
      // 加v达成业绩
      this.form.addWechatCompletePrice = 0;
      // 线索登记完成率
      this.form.addClueCompletePrice = 0;
    },
    //根据员工id查询提成比例
    checkBelongEmpIdChange() {
      // 弹窗
      if (this.control == true) {
        employeeManageApi
          .byIdGetAmiyaEmployee(this.form.belongEmpId)
          .then((res) => {
            if (res.code === 0) {
              const { positionName, positionId } = res.data.employeeInfo;
              this.form.positionName = positionName;
              this.form.positionId = positionId;
              if (positionName == "行政客服") {
                this.clearCustomer();
                // this.administrativeCustomerService();
                this.amountChange();
              } else {
                this.clearCustomer2();
                this.amountChange();
              }
            }
          });
      }
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
        beautyAddWechatPrice,
        takeGoodsAddWechatPrice,
        consulationCardPrice,
        consulationCardAddWechatPrice,
        cooperationLiveAnchorSendOrderPrice,
        cooperationLiveAnchorToHospitalPrice,
        addWechatCompletePrice,
        addClueCompletePrice,
        oldTakeNewCustomerPrice,
        specialHospitalVisitPrice

      } = this.form;
      if (positionId != 30) {
        let price =
          Number(salary) +
          Number(customerServicePerformance) +
          Number(toHospitalRateReword) +
          Number(repeatPurchasesRateReword) +
          Number(newCustomerToHospitalReword) +
          Number(oldCustomerToHospitalReword) +
          Number(targetFinishReword) +
          Number(otherPrice) +
          Number(specialHospitalVisitPrice) +
          Number(oldTakeNewCustomerPrice) -
          Number(otherChargebacks);
        this.form.totalPrice = Math.round(price * 100) / 100;
      } else {
        let price =
          Number(salary) +
          Number(customerServicePerformance) +
          Number(beautyAddWechatPrice) +
          Number(takeGoodsAddWechatPrice) +
          Number(consulationCardPrice) +
          Number(consulationCardAddWechatPrice) +
          Number(cooperationLiveAnchorSendOrderPrice) +
          Number(cooperationLiveAnchorToHospitalPrice) +
          Number(otherPrice) -
          Number(otherChargebacks) +
          Number(addWechatCompletePrice) +
          Number(oldTakeNewCustomerPrice) +
          Number(specialHospitalVisitPrice) +
          Number(addClueCompletePrice);
        this.form.totalPrice = Math.round(price * 100) / 100;
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.isLoading = true;
          // 生成薪资
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
      this.$emit("update:administrationGenerateSalaryModel", false);
      this.$emit("getListData");
      this.$refs["form"].resetFields();
      this.form.positionId = null;
      this.centent1 = "当前组医美客资加V：0个";
      this.centent2 = "当前组带货客资加V：0个";
      this.centent3 = "供应链达人派单人数：0人";
      this.centent4 = "供应链达人上门人数：0人";
      this.centent5 = "当前组加v率：0%";
      this.centent6 = "当前助理线索登记量：0";
      this.centent7 = "当前助理线索登记目标：0";
      this.centent8 = "当前助理线索登记完成率：0%";
      this.oldTakeNewCustomerNum = "老带新0人";
      this.form.hospitalIdList = []
      this.rewardAmountPeople = '当前助理在选中医院上门顾客 0 人'
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.$emit("update:administrationGenerateSalaryModel", false);
        this.$emit("getListData");
        this.$refs["form"].resetFields();
        this.form.positionId = null;
        this.centent1 = "当前组医美客资加V：0个";
        this.centent2 = "当前组带货客资加V：0个";
        this.centent3 = "供应链达人派单人数：0人";
        this.centent4 = "供应链达人上门人数：0人";
        this.centent5 = "当前组加v率：0%";
        this.centent6 = "当前助理线索登记量：0";
        this.centent7 = "当前助理线索登记目标：0";
        this.centent8 = "当前助理线索登记完成率：0%";
        this.oldTakeNewCustomerNum = "老带新0人";
        this.form.hospitalIdList = []
        this.rewardAmountPeople = '当前助理在选中医院上门顾客 0 人'
      }
    },
  },
  created() {},
  watch: {
    administrationGenerateSalaryModel(value) {
      this.control = value;

      if (value == true) {
        const {
          assistantPerformanceList,
          auditPerformanceList,
        } = this.filterCriteria;
        let orderId = [];
        let price = 0;
        // 合并助理业绩和稽查业绩数据
        let list = assistantPerformanceList.concat(auditPerformanceList);
        list.map((item) => {
          orderId.push(item.id);
          price += item.customerServicePerformance;
          return price;
        });
        // id集合
        this.form.recommandDocumentSettleIdList = orderId;
        // 提成金额
        this.form.customerServicePerformance = Math.round(price * 100) / 100;
        this.getHealthValueLists();
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
.bor {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px 10px 0px 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.icon-info{
  position: relative;
  top: 4px;
}
</style>
