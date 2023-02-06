<template>
  <div>
    <Modal
      v-model="transactionStatementModals"
      title="成交情况报表"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="100%"
      fullscreen
    >
      <div class="containers">
        <div class="left">
          <div>
            <DatePicker
              type="date"
              placeholder="登记开始日期"
              style="width: 150px;"
              :value="query.startDate"
              v-model="query.startDate"
            ></DatePicker>
            <DatePicker
              type="date"
              placeholder="登记结束日期"
              style="width: 150px; margin-left: 10px"
              :value="query.endDate"
              v-model="query.endDate"
            ></DatePicker>
            <DatePicker
              type="date"
              placeholder="派单开始日期"
              style="width: 150px; margin-left: 10px"
              :value="query.sendStartDate"
              v-model="query.sendStartDate"
            ></DatePicker>
            <DatePicker
              type="date"
              placeholder="派单结束日期"
              style="width: 150px; margin-left: 10px"
              :value="query.sendEndDate"
              v-model="query.sendEndDate"
            ></DatePicker>
            <Input
              v-model="query.keyWord"
              placeholder="请输入关键字"
              style="width: 180px; margin-left: 10px "
              @keyup.enter.native="transactionStatement()"
            />
            <Select
              v-model="query.isToHospital"
              style="width: 170px;margin-left:10px"
              placeholder="请选择到院状态"
            >
              <Option
                v-for="item in query.toTheHospitalList"
                :value="item.type"
                :key="item.type"
                >{{ item.name }}</Option
              >
            </Select>
            <DatePicker
              type="date"
              placeholder="到院开始日期"
              style="width: 150px;margin-left: 10px"
              :value="query.tohospitalStartDate"
              v-model="query.tohospitalStartDate"
              transfer
              :disabled="query.isToHospital != 'true'"
            ></DatePicker>
            <DatePicker
              type="date"
              placeholder="到院结束日期"
              style="width: 150px; margin-left: 10px"
              :value="query.toHospitalEndDate"
              v-model="query.toHospitalEndDate"
              transfer
              :disabled="query.isToHospital != 'true'"
            ></DatePicker>
            <Select
              v-model="query.toHospitalType"
              placeholder="请选择到院类型"
              clearable
              style="width: 150px; margin-left: 10px"
              filterable
              :disabled="query.isToHospital != 'true'"
            >
              <Option
                v-for="item in transactionParams.toHospitalTypeList"
                :value="item.orderType"
                :key="item.orderType"
                >{{ item.orderTypeText }}</Option
              >
            </Select>
            
          </div>
          <div style="margin:10px 0">
            <Select
              v-model="query.isDeal"
              style="width: 150px;"
              placeholder="请选择成交状态"
            >
              <Option
                v-for="item in query.dealList"
                :value="item.type"
                :key="item.type"
                >{{ item.name }}</Option
              >
            </Select>
            <Select
              v-model="query.checkState"
              placeholder="审核状态"
              style="width: 150px; margin-left: 10px"
            >
              <Option
                v-for="item in query.checkStateListAll"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            <DatePicker
              type="date"
              placeholder="审核开始日期"
              style="width: 150px;margin-left: 10px"
              :value="query.checkStartDate"
              v-model="query.checkStartDate"
              transfer
              :disabled="query.checkState != 2"
            ></DatePicker>
            <DatePicker
              type="date"
              placeholder="审核结束日期"
              style="width: 150px; margin-left: 10px"
              :value="query.checkEndDate"
              v-model="query.checkEndDate"
              transfer
              :disabled="query.checkState != 2"
            ></DatePicker>
            <Select
                v-model="query.isCreateBill"
                style="width: 180px;margin-left: .625rem"
                placeholder="是否开票"
              >
                <Option
                  v-for="item in query.isCreateBillList"
                  :value="item.type"
                  :key="item.type"
                  >{{ item.name }}</Option
                >
              </Select>
              <Select
                v-model="query.belongCompanyId"
                style="width: 170px;margin-left: .625rem"
                placeholder="请选择开票公司"
              >
                <Option
                  v-for="item in companyNameAllList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            <Select
              v-model="query.isReturnBakcPrice"
              style="width: 150px;margin-left:10px"
              placeholder="是否回款"
            >
              <Option
                v-for="item in query.isReturnBakcPriceList"
                :value="item.type"
                :key="item.type"
                >{{ item.name }}</Option
              >
            </Select>
            <DatePicker
              type="date"
              placeholder="回款开始时间"
              style="width: 150px;margin-left:10px"
              :value="query.returnBackPriceStartDate"
              v-model="query.returnBackPriceStartDate"
              :disabled="query.isReturnBakcPrice != 'true'"
            ></DatePicker>
            <DatePicker
              type="date"
              placeholder="回款结束时间"
              style="width: 150px; margin-left: .625rem"
              :value="query.returnBackPriceEndDate"
              v-model="query.returnBackPriceEndDate"
              :disabled="query.isReturnBakcPrice != 'true'"
            ></DatePicker>
            
           
            
          </div>
          <div>
             <Select
              v-model="query.customerServiceId"
              style="width: 150px; "
              placeholder="请选择绑定客服"
              :disabled="positionId == 2 || positionId == 4"
            >
              <Option
                v-for="item in transactionParams.employee"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            <Select
              v-model="query.isAccompanying"
              style="width: 150px; margin-left: 10px"
              placeholder="是否陪诊"
            >
              <Option
                v-for="item in query.isAccompanyingList"
                :value="item.type"
                :key="item.type"
                >{{ item.name }}</Option
              >
            </Select>
            <Select
              v-model="query.isOldCustomer"
              style="width: 150px;margin-left: 10px"
              placeholder="新老客业绩"
            >
              <Option
                v-for="item in query.isOldCustomerList"
                :value="item.type"
                :key="item.type"
                >{{ item.name }}</Option
              >
            </Select>
            <Select
              v-model="query.consultationType"
              style="width: 150px;margin-left:10px"
              placeholder="请选择完成情况"
              filterable
            >
              <Option
                v-for="item in consultationTypeList"
                :value="item.orderType"
                :key="item.orderType"
                >{{ item.orderTypeText }}</Option
              >
            </Select>
            <Select
              v-model="query.lastDealHospitalId"
              style="width: 220px; margin-left: 10px"
              placeholder="请选择到院医院"
              filterable
            >
              <Option
                v-for="item in transactionParams.dealHospitalList"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            <Input
                v-model="query.minAddOrderPrice"
                placeholder="请输入最小下单金额"
                style="width: 180px;margin-left:10px"
                type="number"
                namber
              />
              <span> — </span>
              <Input
                v-model="query.maxAddOrderPrice"
                placeholder="请输入最大下单金额"
                style="width: 180px;"
                type="number"
                namber
              />
              
          </div>
          <div></div>
        </div>
        <div class="right">
          <Button
            type="primary"
            style="margin:0 10px"
            @click="transactionStatement"
            >查询</Button
          >
          <Button
            type="primary"
            @click="exportsendOrder"
            v-has="{ role: ['fx.amiya.permission.EXPORT'] }"
            >导出</Button
          >
        </div>
      </div>

      <Card class="container">
        <div>
          <Table
            border
            :columns="query.columns"
            :data="query.data"
            height="620"
          ></Table>
        </div>
      </Card>
      <div slot="footer" class=" foot">
        <div class="foots">
          <div class="">
            <div style="display:flex">
              <div class="num">
                合计对账金额：
                <div style="color:red">{{ checkPrice }}</div>
              </div>
              <div class="num">
                服务费合计：
                <div style="color:red">{{ settlePrice }}</div>
              </div>
              <div class="num">
                初诊上门：
                <div style="color:red">{{ toHospitalTypeText1 }}</div>
              </div>
              <div class="num">
                复诊上门：
                <div style="color:red">{{ toHospitalTypeText2 }}</div>
              </div>
              <div class="num">
                再消费上门：
                <div style="color:red">{{ toHospitalTypeText3 }}</div>
              </div>
              <div class="num">
                其他上门：
                <div style="color:red">{{ toHospitalTypeText4 }}</div>
              </div>
              <div class="num">
                初诊成交：
                <div style="color:red">{{ dealNum1 }}</div>
              </div>
              <div class="num">
                复诊成交：
                <div style="color:red">{{ dealNum2 }}</div>
              </div>
              <div class="num">
                再消费成交：
                <div style="color:red">{{ dealNum3 }}</div>
              </div>
              <div class="num">
                其他成交：
                <div style="color:red">{{ dealNum4 }}</div>
              </div>
              
              
            </div>
            <div style="display:flex;margin-top:5px">
              <div class="num">
                初诊业绩：
                <div style="color:red">{{ deal1 }}</div>
              </div>
              <div class="num">
                复诊业绩：
                <div style="color:red">{{ deal2 }}</div>
              </div>
              <div class="num">
                再消费业绩：
                <div style="color:red">{{ deal3 }}</div>
              </div>
              <div class="num">
                其他业绩：
                <div style="color:red">{{ deal4 }}</div>
              </div>
              <div class="num">
                退款业绩：
                <div style="color:red">{{ deal5 }}</div>
              </div>
              <div class="num">
                新客业绩：
                <div style="color:red">{{ newCustomer }}</div>
              </div>
              <div class="num">
                总业绩：
                <div style="color:red">{{ totalPerformance }}</div>
              </div>
              <div class="num">
                回款总金额：
                <div style="color:red">{{ paymentCollection }}</div>
              </div>
              <div class="num">
                协作完成：
                <div style="color:red">{{ cooperation }}</div>
              </div>
              <div class="num">
                独立跟进：
                <div style="color:red">{{ independent }}</div>
              </div>
              <div class="num">
                总条数：
                <div style="color:red">{{ pageCount }}</div>
              </div>
            </div>
          </div>
          <Button @click="cancelSubmits()">关闭页面</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
import * as apis from "@/api/customerManage.js";
import { download } from "@/utils/util";

export default {
  props: {
    transactionStatementModal: {
      type: Boolean,
    },
    contentPalteForms: {
      type: Array,
    },
    transactionParams: {
      type: Object,
    },
    companyNameAllList:Array
  },
  data() {
    return {
      positionId:sessionStorage.getItem('positionId'),
      // 初诊上门
      toHospitalTypeText1: 0,
      // 复诊上门
      toHospitalTypeText2: 0,
      // 再消费上门
      toHospitalTypeText3: 0,
      // 其他上门
      toHospitalTypeText4: 0,
      // 初诊业绩
      deal1: 0,
      // 复诊业绩
      deal2: 0,
      // 再消费业绩
      deal3: 0,
      // 其他业绩
      deal4: 0,
      // 退款业绩
      deal5: 0,
      // 新客业绩
      newCustomer: 0,
      // 总业绩
      totalPerformance: 0,
      // 初诊成交
      dealNum1:0,
      // 复诊成交
      dealNum2:0,
      // 再消费成交
      dealNum3:0,
      // 其他成交
      dealNum4:0,
      // 协作完成
      cooperation:0,
      // 独立完成
      independent:0,
      // 回款总金额
      paymentCollection:0,
      // 面诊类型
      consultationTypeList: [{ orderType: -1, orderTypeText: "全部面诊类型" }],
      // 主播IP账号
      liveAnchors: [],
      checkPrice: 0,
      settlePrice: 0,
      pageCount: 0,
      transactionStatementModals: false,
      query: {
        // 是否开票
        isCreateBill:-1,
        // 开票公司
        belongCompanyId:-1,
        // 最小金额
        minAddOrderPrice:null,
        maxAddOrderPrice:null,
        // 到院医院
        dealHospitalId: -1,
        // 审核状态
        checkState: -1,
        // 审核开始时间
        checkStartDate:'',
        // 审核结束时间
        checkEndDate:'',
        //   是否到院
        isToHospital: -1,
        // 到院开始时间
        tohospitalStartDate: "",
        // 到院结束时间
        toHospitalEndDate: "",
        //到院类型
        toHospitalType: -1,
        // 是否成交
        isDeal: -1,
        // 到院医院
        lastDealHospitalId: -1,
        // 是否陪诊
        isAccompanying: -1,
        // 新老客业绩
        isOldCustomer: -1,
        // 是否回款
        isReturnBakcPrice: -1,
        // 回款开始时间
        returnBackPriceStartDate: "",
        // 回款结束时间
        returnBackPriceEndDate: "",
        // 跟进人员
        customerServiceId: -1,
        // 派单开始时间
        sendStartDate: "",
        // 派单结束时间
        sendEndDate: "",
        // 完成情况
        consultationType: -1,
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        keyWord: "",
        columns: [
          {
            title: "编号",
            key: "id",
            minWidth: 180,
            align: "center",
          },
          {
            title: "登记时间",
            key: "createDate",
            minWidth: 170,
            align: "center",
            render: (h, params) => {
              return params.row.createDate
                ? h(
                    "div",
                    this.$moment(params.row.createDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  )
                : "";
            },
          },
          {
            title: "订单编号",
            key: "contentPlatFormOrderId",
            minWidth: 180,
            align: "center",
          },
          {
            title: "下单时间",
            key: "orderCreateDate",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return params.row.orderCreateDate
                ? h(
                    "div",
                    this.$moment(params.row.orderCreateDate).format(
                      "YYYY-MM-DD"
                    )
                  )
                : "";
            },
          },
          {
            title: "下单金额",
            key: "addOrderPrice",
            minWidth: 120,
            align: "center",
          },
          {
            title: "派单时间",
            key: "sendOrderDate",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return params.row.sendOrderDate
                ? h(
                    "div",
                    this.$moment(params.row.sendOrderDate).format("YYYY-MM-DD")
                  )
                : "";
            },
          },
          {
            title: "面诊类型",
            key: "consultationType",
            minWidth: 120,
            align: "center",
          },
          {
            title: "平台",
            key: "contentPlatFormName",
            minWidth: 130,
            align: "center",
          },
          {
            title: "主播",
            key: "liveAnchorName",
            minWidth: 130,
            align: "center",
          },
          {
            title: "项目",
            key: "goodsName",
            minWidth: 130,
            align: "center",
          },
          {
            title: "客户昵称",
            key: "customerNickName",
            minWidth: 130,
            align: "center",
          },
          {
            title: "手机号",
            key: "phone",
            minWidth: 130,
            align: "center",
          },
          {
            title: "是否到院",
            key: "isToHospital",
            minWidth: 120,
            align: "center",
          },
          {
            title: "到院类型",
            key: "toHospitalTypeText",
            minWidth: 120,
            align: "center",
          },

          {
            title: "到院时间",
            key: "tohospitalDate",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return params.row.tohospitalDate
                ? h(
                    "div",
                    this.$moment(params.row.tohospitalDate).format("YYYY-MM-DD")
                  )
                : "";
            },
          },
          {
            title: "到院医院",
            key: "lastDealHospital",
            minWidth: 220,
            align: "center",
          },
          {
            title: "是否重单深度",
            key: "isRepeatProfundityOrder",
            minWidth: 130,
            align: "center",
          },
          {
            title: "是否成交",
            key: "isDeal",
            minWidth: 120,
            align: "center",
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 200,
            align: "center",
          },
          {
            title: "成交金额",
            key: "price",
            minWidth: 120,
            align: "center",
          },
          {
            title: "成交时间",
            key: "dealDate",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return params.row.dealDate
                ? h(
                    "div",
                    this.$moment(params.row.dealDate).format("YYYY-MM-DD")
                  )
                : "";
            },
          },
          {
            title: "三方订单号",
            key: "otherOrderId",
            minWidth: 180,
            align: "center",
          },
          {
            title: "新老客业绩",
            key: "isOldCustomer",
            minWidth: 120,
            align: "center",
          },
          {
            title: "是否陪诊",
            key: "isAcompanying",
            minWidth: 120,
            align: "center",
          },
          // {
          //   title: "佣金比例(%)",
          //   key: "commissionRatio",
          //   minWidth: 180,
          //   align: "center",
          //   render: (h, params) => {
          //     return h(
          //       "div",
          //       params.row.commissionRatio
          //         ? params.row.commissionRatio + "%"
          //         : "0%"
          //     );
          //   },
          // },
          {
            title: "审核状态",
            key: "checkStateText",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              if (params.row.checkStateText == "审核通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.checkStateText
                );
              } else if (params.row.checkStateText == "未审核") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.checkStateText
                );
              } else if (params.row.checkStateText == "审核不通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.checkStateText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.checkStateText
                );
              }
            },
          },
          {
            title: "对账金额",
            key: "checkPrice",
            minWidth: 120,
            align: "center",
          },
          {
            title: "审核时间",
            key: "checkDate",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return params.row.checkDate
                ? h(
                    "div",
                    this.$moment(params.row.checkDate).format("YYYY-MM-DD")
                  )
                : "";
            },
          },
          {
            title: "服务费合计",
            key: "settlePrice",
            minWidth: 120,
            align: "center",
          },
          {
            title: "审核人",
            key: "checkBy",
            minWidth: 120,
            align: "center",
          },
          {
            title: "审核备注",
            key: "checkRemark",
            minWidth: 200,
            align: "center",
          },
          {
            title: "是否开票",
            key: "isCreateBill",
            minWidth: 100,
            align:'center'
          },
           {
            title: "开票公司",
            key: "belongCompanyName",
            minWidth: 220,
            align:'center'
          },
          {
            title: "是否回款",
            key: "isReturnBackPrice",
            minWidth: 120,
            align: "center",
          },
          {
            title: "回款金额",
            key: "returnBackPrice",
            minWidth: 120,
            align: "center",
          },
          {
            title: "回款时间",
            key: "returnBackDate",
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              return params.row.returnBackDate
                ? h(
                    "div",
                    this.$moment(params.row.returnBackDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  )
                : "";
            },
          },

          {
            title: "绑定客服",
            key: "createByEmpName",
            minWidth: 120,
            align: "center",
          },
        ],
        data: [],
        isCreateBillList:[
            {
              type:-1,
              name:'全部开票状态'
            },
            {
              type:'true',
              name:'已开票'
            },
            {
              type:'false',
              name:'未开票'
            },
          ],
        checkStateListAll: [{ id: -1, name: "全部审核状态" }],
        // 是否到院
        toTheHospitalList: [
          {
            type: -1,
            name: "全部到院状态",
          },
          {
            type: "true",
            name: "已到院",
          },
          {
            type: "false",
            name: "未到院",
          },
        ],
        // 成交列表
        dealList: [
          {
            type: -1,
            name: "全部成交状态",
          },
          {
            type: "true",
            name: "已成交",
          },
          {
            type: "false",
            name: "未成交",
          },
        ],
        // 陪诊列表
        isAccompanyingList: [
          {
            type: -1,
            name: "全部陪诊状态",
          },
          {
            type: "true",
            name: "是",
          },
          {
            type: "false",
            name: "否",
          },
        ],
        // 新老客列表
        isOldCustomerList: [
          {
            type: -1,
            name: "全部客户业绩",
          },
          {
            type: "true",
            name: "老客",
          },
          {
            type: "false",
            name: "新客",
          },
        ],
        // 回款列表
        isReturnBakcPriceList: [
          {
            type: -1,
            name: "全部回款状态",
          },
          {
            type: "true",
            name: "已回款",
          },
          {
            type: "false",
            name: "未回款",
          },
        ],
      },
    };
  },
  methods: {
    //   获取完成情况列表（下拉框）
    getOrderConsultationTypeList() {
      api.getOrderConsultationTypeList().then((res) => {
        if (res.code === 0) {
          const { orderConsultationTypes } = res.data;
          this.consultationTypeList = [
            ...this.consultationTypeList,
            ...orderConsultationTypes,
          ];
        }
      });
    },
    contentPlateChange(value) {
      if (!value) {
        return;
      }
      this.getLiveValidList(value);
    },
    // 根据平台id去获取IP账号
    getLiveValidList(value) {
      const data = {
        contentPlatFormId: value,
      };
      api.getLiveValidList(data).then((res) => {
        if (res.code === 0) {
          const { liveAnchors } = res.data;
          this.liveAnchors = liveAnchors;
        }
      });
    },
    // 获取审核情况（下拉框）
    getCheckStateList() {
      apis.getCheckStateList().then((res) => {
        if (res.code === 0) {
          const { checkStateList } = res.data;
          this.checkStateList = checkStateList;
          this.query.checkStateListAll = [
            ...this.query.checkStateListAll,
            ...checkStateList,
          ];
        }
      });
    },
    // 获取内容平台成交订单报表
    transactionStatement() {
      const {
        startDate,
        endDate,
        checkState,
        liveAnchorId,
        dealHospitalId,
        isToHospital,
        tohospitalStartDate,
        toHospitalEndDate,
        toHospitalType,
        isDeal,
        lastDealHospitalId,
        isAccompanying,
        isOldCustomer,
        isReturnBakcPrice,
        returnBackPriceStartDate,
        returnBackPriceEndDate,
        customerServiceId,
        keyWord,
        sendStartDate,
        sendEndDate,
        consultationType,
        minAddOrderPrice,
        maxAddOrderPrice,
        checkStartDate,
        checkEndDate,
        isCreateBill,
        belongCompanyId
      } = this.query;
      this.transactionParams.employee.map((item) => {
        if (Number(this.positionId) == 2 || Number(this.positionId) == 4) {
          if (item.id == sessionStorage.getItem('employeeId')) {
            this.query.customerServiceId = item.id;
          }
        }
      });
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD"),
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        checkState: checkState == -1 ? null : checkState,
        liveAnchorId,
        dealHospitalId: dealHospitalId == -1 ? null : dealHospitalId,

        toHospitalType: toHospitalType == -1 ? null : toHospitalType,
        isToHospital: isToHospital == -1 ? null : isToHospital,
        tohospitalStartDate:
          isToHospital == "true"
            ? tohospitalStartDate
              ? this.$moment(tohospitalStartDate).format("YYYY-MM-DD")
              : null
            : null,
        toHospitalEndDate:
          isToHospital == "true"
            ? toHospitalEndDate
              ? this.$moment(toHospitalEndDate).format("YYYY-MM-DD")
              : null
            : null,
        isDeal: isDeal == -1 ? null : isDeal,
        lastDealHospitalId: lastDealHospitalId == -1 ? null: lastDealHospitalId,
        isAccompanying: isAccompanying == -1 ? null : isAccompanying,
        isOldCustomer: isOldCustomer == -1 ? null : isOldCustomer,
        isReturnBakcPrice: isReturnBakcPrice == -1 ? null : isReturnBakcPrice,
        returnBackPriceStartDate:
          isReturnBakcPrice == "true"
            ? returnBackPriceStartDate
              ? this.$moment(returnBackPriceStartDate).format("YYYY-MM-DD")
              : null
            : null,
        returnBackPriceEndDate:
          isReturnBakcPrice == "true"
            ? returnBackPriceEndDate
              ? this.$moment(returnBackPriceEndDate).format("YYYY-MM-DD")
              : null
            : null,
        // customerServiceId: customerServiceId == -1 ? null : customerServiceId,
        customerServiceId: this.positionId == 2 || this.positionId == 4 ? this.query.customerServiceId : (customerServiceId == -1 ? null : customerServiceId),
        keyWord,
        sendStartDate: sendStartDate
          ? this.$moment(sendStartDate).format("YYYY-MM-DD")
          : null,
        sendEndDate: sendEndDate
          ? this.$moment(sendEndDate).format("YYYY-MM-DD")
          : null,
        consultationType: consultationType == -1 ? null : consultationType,
        minAddOrderPrice,
        maxAddOrderPrice,
        checkStartDate: checkState == 2 ? this.$moment(checkStartDate).format("YYYY-MM-DD"): null,
        checkEndDate: checkState == 2 ? this.$moment(checkEndDate).format("YYYY-MM-DD"): null,
        isCreateBill : isCreateBill == -1 ? null : isCreateBill,
        belongCompanyId: belongCompanyId == -1 ? null : belongCompanyId
      };
      if (!startDate || !endDate) {
        this.$Message.error("请选择日期");
        return;
      }
      api.contentPlatFormOrderDealInfoReport(data).then((res) => {
        if (res.code === 0) {
          const { contentPlatFormOrderDealInfo } = res.data;
          this.query.data = contentPlatFormOrderDealInfo;
          this.pageCount = this.query.data.length;
          let checkPrice = 0;
          let settlePrice = 0;
          let toHospitalTypeText1 = [];
          let toHospitalTypeText2 = [];
          let toHospitalTypeText3 = [];
          let toHospitalTypeText4 = [];
          let deal1 = 0;
          let deal2 = 0;
          let deal3 = 0;
          let deal4 = 0;
          let deal5 = 0;
          let dealNum1 = []
          let dealNum2 = []
          let dealNum3 = []
          let dealNum4 = []
          let newCustomer = 0;
          let totalPerformance = 0;
          let cooperation =[]
          let independent = []
          let paymentCollection = 0
          
          this.query.data.map((item, index) => {
            checkPrice += Number(item.checkPrice);
            settlePrice += Number(item.settlePrice);
            paymentCollection += Number(item.returnBackPrice);
            totalPerformance += Number(item.price);

            // totalPerformance += Number(item.price);
            // if (item.isOldCustomer == "新客业绩") {
            //   newCustomer += Number(item.price);
            // }
            if(item.consultationType == '协作完成'){
              cooperation.push(item)
            }else if(item.consultationType == '独立跟进'){
              independent.push(item)
            }
            if (item.toHospitalTypeText == "初诊") {
              deal1 += Number(item.price);
            } else if (item.toHospitalTypeText == "复诊") {
              deal2 += Number(item.price);
            } else if (item.toHospitalTypeText == "再消费") {
              deal3 += Number(item.price);
            } else if (item.toHospitalTypeText == "其他") {
              deal4 += Number(item.price);
            }else if (item.toHospitalTypeText == "退款") {
              deal5 += Number(item.price);
            }
            // 上门
            if (item.toHospitalTypeText == "初诊" && item.isToHospital == '是' ) {
              toHospitalTypeText1.push(item);
            } else if (item.toHospitalTypeText == "复诊"  && item.isToHospital == '是' ) {
              toHospitalTypeText2.push(item);
            } else if (item.toHospitalTypeText == "再消费"  && item.isToHospital == '是' ) {
              toHospitalTypeText3.push(item);
            }else if (item.toHospitalTypeText == "其他"  && item.isToHospital == '是' ) {
              toHospitalTypeText4.push(item);
            }
            // 成交
            if (item.toHospitalTypeText == "初诊" && item.isToHospital == '是' && item.isDeal == '是') {
              dealNum1.push(item);
            } else if (item.toHospitalTypeText == "复诊"  && item.isToHospital == '是' && item.isDeal == '是') {
              dealNum2.push(item);
            } else if (item.toHospitalTypeText == "再消费"  && item.isToHospital == '是' && item.isDeal == '是') {
              dealNum3.push(item);
            } else if (item.toHospitalTypeText == "其他"  && item.isToHospital == '是' && item.isDeal == '是') {
              dealNum4.push(item);
            }
          });
          this.toHospitalTypeText1 = toHospitalTypeText1.length;
          this.toHospitalTypeText2 = toHospitalTypeText2.length;
          this.toHospitalTypeText3 = toHospitalTypeText3.length;
          this.toHospitalTypeText4 = toHospitalTypeText4.length;
          this.dealNum1 = dealNum1.length;
          this.dealNum2 = dealNum2.length;
          this.dealNum3 = dealNum3.length;
          this.dealNum4 = dealNum4.length;
          this.independent = independent.length;
          this.cooperation = cooperation.length;
          this.deal1 = Math.floor(deal1 * 100) / 100;
          this.deal2 = Math.floor(deal2 * 100) / 100;
          this.deal3 = Math.floor(deal3 * 100) / 100;
          this.deal4 = Math.floor(deal4 * 100) / 100;
          this.deal5 = Math.floor(deal5 * 100) / 100;
          this.newCustomer = Math.floor((deal1+deal2) * 100) / 100;
          // this.totalPerformance = Math.floor((deal1+deal2+deal3) * 100) / 100;
          this.paymentCollection = Math.floor(paymentCollection * 100) / 100;
          this.totalPerformance = Math.floor(totalPerformance * 100) / 100;

          this.checkPrice = Math.floor(checkPrice * 100) / 100;
          this.settlePrice = Math.floor(settlePrice * 100) / 100;
        }
      });
    },
    // 导出
    exportsendOrder() {
      const {
        startDate,
        endDate,
        checkState,
        liveAnchorId,
        dealHospitalId,
        isToHospital,
        tohospitalStartDate,
        toHospitalEndDate,
        toHospitalType,
        isDeal,
        lastDealHospitalId,
        isAccompanying,
        isOldCustomer,
        isReturnBakcPrice,
        returnBackPriceStartDate,
        returnBackPriceEndDate,
        customerServiceId,
        keyWord,
        sendStartDate,
        sendEndDate,
        consultationType,
        minAddOrderPrice,
        maxAddOrderPrice,
        checkStartDate,
        checkEndDate,
        isCreateBill,
        belongCompanyId
      } = this.query;
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD"),
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        checkState: checkState == -1 ? null : checkState,
        liveAnchorId,
        dealHospitalId: dealHospitalId == -1 ? null : dealHospitalId,
        toHospitalType: toHospitalType == -1 ? null : toHospitalType,
        isToHospital: isToHospital == -1 ? null : isToHospital,
        tohospitalStartDate:
          isToHospital == "true"
            ? tohospitalStartDate
              ? this.$moment(tohospitalStartDate).format("YYYY-MM-DD")
              : null
            : null,
        toHospitalEndDate:
          isToHospital == "true"
            ? toHospitalEndDate
              ? this.$moment(toHospitalEndDate).format("YYYY-MM-DD")
              : null
            : null,
        isDeal: isDeal == -1 ? null : isDeal,
        lastDealHospitalId:
          lastDealHospitalId == -1
              ? null
              : lastDealHospitalId
            ,
        isAccompanying: isAccompanying == -1 ? null : isAccompanying,
        isOldCustomer: isOldCustomer == -1 ? null : isOldCustomer,
        isReturnBakcPrice: isReturnBakcPrice == -1 ? null : isReturnBakcPrice,
        returnBackPriceStartDate:
          isReturnBakcPrice == "true"
            ? returnBackPriceStartDate
              ? this.$moment(returnBackPriceStartDate).format("YYYY-MM-DD")
              : null
            : null,
        returnBackPriceEndDate:
          isReturnBakcPrice == "true"
            ? returnBackPriceEndDate
              ? this.$moment(returnBackPriceEndDate).format("YYYY-MM-DD")
              : null
            : null,
        customerServiceId: customerServiceId == -1 ? null : customerServiceId,
        keyWord,
        sendStartDate: sendStartDate
          ? this.$moment(sendStartDate).format("YYYY-MM-DD")
          : null,
        sendEndDate: sendEndDate
          ? this.$moment(sendEndDate).format("YYYY-MM-DD")
          : null,
        consultationType: consultationType == -1 ? null : consultationType,
        minAddOrderPrice,
        maxAddOrderPrice,
        checkStartDate: checkState == 2 ? this.$moment(checkStartDate).format("YYYY-MM-DD"): null,
        checkEndDate: checkState == 2 ? this.$moment(checkEndDate).format("YYYY-MM-DD"): null,
        isCreateBill : isCreateBill == -1 ? null : isCreateBill,
        belongCompanyId: belongCompanyId == -1 ? null : belongCompanyId
      };
      if (!startDate || !endDate) {
        this.$Message.error("请选择日期");
        return;
      }
      if (this.query.data.length == 0) {
        this.$Message.error("没有数据时不支持导出");
        return;
      }
      api.exportContentPlatFormOrderDealInfo(data).then((res) => {
        let name =
          this.$moment(new Date(startDate)).format("YYYY-MM-DD") +
          "-" +
          this.$moment(new Date(endDate)).format("YYYY-MM-DD") +
          "成交情况报表";
        download(res, name);
      });
    },
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        // this.$refs["form"].resetFields();
        this.$emit("update:transactionStatementModal", false);
      }
    },
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        // this.$refs["form"].resetFields();
        this.$emit("update:transactionStatementModal", false);
        this.query.data = [];

        this.pageCount = 0;
        this.query.checkState = -1;
        this.checkPrice = 0;
        this.settlePrice = 0;
        this.query.liveAnchorId = null;
        this.query.contentPlatFormId = null;
        this.liveAnchors = [];
        this.query.startDate = this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD");
        this.query.endDate = this.$moment(new Date()).format("YYYY-MM-DD");
        this.query.dealHospitalId = -1;
        this.query.isToHospital = -1;
        this.query.tohospitalStartDate = "";
        this.query.toHospitalEndDate = "";
        this.query.toHospitalType = -1;
        this.query.isDeal = -1;
        this.query.lastDealHospitalId = -1;
        this.query.isAccompanying = -1;
        this.query.isOldCustomer = -1;
        this.query.isReturnBakcPrice = -1;
        this.query.returnBackPriceStartDate = "";
        this.query.returnBackPriceEndDate = "";
        this.query.customerServiceId = -1;
        this.query.sendStartDate = "";
        this.query.sendEndDate = "";
        this.query.consultationType = -1;
        this.query.keyWord = "";
        this.query.minAddOrderPrice = null
        this.query.maxAddOrderPrice = null
        this.query.isCreateBill = -1
        this.query.belongCompanyId = -1
      }
    },
    // 取消
    cancelSubmits(name) {
      this.isEdit = false;
      this.control = false;
      this.$emit("update:transactionStatementModal", false);
      this.query.data = [];
      this.pageCount = 0;
      this.query.checkState = -1;
      this.checkPrice = 0;
      this.settlePrice = 0;
      this.query.liveAnchorId = null;
      this.query.contentPlatFormId = null;
      this.liveAnchors = [];
      this.query.startDate = this.$moment()
        .startOf("month")
        .format("YYYY-MM-DD");
      this.query.endDate = this.$moment(new Date()).format("YYYY-MM-DD");
      this.query.dealHospitalId = -1;
      this.query.isToHospital = -1;
      this.query.tohospitalStartDate = "";
      this.query.toHospitalEndDate = "";
      this.query.toHospitalType = -1;
      this.query.isDeal = -1;
      this.query.lastDealHospitalId = -1;
      this.query.isAccompanying = -1;
      this.query.isOldCustomer = -1;
      this.query.isReturnBakcPrice = -1;
      this.query.returnBackPriceStartDate = "";
      this.query.returnBackPriceEndDate = "";
      this.query.customerServiceId = -1;
      this.query.sendStartDate = "";
      this.query.sendEndDate = "";
      this.query.consultationType = -1;
      this.query.keyWord = "";
      this.query.minAddOrderPrice = null
      this.query.maxAddOrderPrice = null
      this.query.isCreateBill = -1
      this.query.belongCompanyId = -1
    },
  },
  created() {
    // this.transactionStatement()
    this.getCheckStateList();
    this.getOrderConsultationTypeList();
  },
  watch: {
    transactionStatementModal(value) {
      this.transactionStatementModals = value;
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
.foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.foots {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.num {
  margin-right: 20px;
  font-size: 15px;
  display: flex;
}
.containers {
  display: flex;
  align-items: center;
}
</style>
