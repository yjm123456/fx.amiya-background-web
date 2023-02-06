<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getBillList()"
          />
          <Select
            v-model="query.hospitalId"
            placeholder="请选择客户"
            filterable
            style="width: 180px; margin-left: 10px"
          >
            <Option
              v-for="item in hospitalAllList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.valid"
            placeholder="是否作废"
            filterable
            style="width: 130px; margin-left: 10px"
          >
            <Option
              v-for="item in validList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select>

          <Select
            v-model="query.billType"
            placeholder="请选择票据类型"
            filterable
            style="width: 130px; margin-left: 10px"
          >
            <Option
              v-for="item in billTypeList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.returnBackState"
            placeholder="请选择回款状态"
            filterable
            style="width: 130px; margin-left: 10px"
          >
            <Option
              v-for="item in billReturnBackStateAllList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <DatePicker
            type="date"
            placeholder="开票开始日期"
            style="width: 130px; margin-left: .625rem"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="开票结束时间"
            style="width: 130px;margin-left: .625rem;"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <Select
            v-model="query.companyId"
            placeholder="请选择收款公司"
            filterable
            style="width: 180px; margin-left: 10px"
          >
            <Option
              v-for="item in companyNameAllList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getBillList()"
            >查询</Button
          >
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="exportBillList()"
            >导出</Button
          >
        </div>
        <div class="right">
          <Button
            type="primary"
            @click="
              addControOverModel = true;
            "
            >添加</Button
          >
        </div>
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data"></Table>
      </div>
      <div class="page_wrap">
        <Page
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          show-total
          show-elevator
          @on-change="handlePageChange"
        />
      </div>
    </Card>

    <Modal
      v-model="controlModal"
      title="修改"
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
                :disabled="form.billType =='0'"
              >
                <Option
                  v-for="item in hospitalInfo"
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
                :disabled="form.billType =='0'"
                @on-change="taxRateChange()"
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
                @on-change="taxRateChange()"
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
                  v-for="item in companyNameList"
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
                  v-for="item in billTypeList"
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
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确认</Button>
      </div>
    </Modal>
    <!-- 回款 -->
    <collection
      :collectionModel.sync="collectionModel"
      :collectionParams="collectionParams"
    />
    <!-- 查看详情 -->
    <detail :detailModel.sync="detailModel" :detailParams="detailParams"/>
    <!-- 添加弹窗 -->
    <addControOver :addControOverModel.sync="addControOverModel" @getBillList="getBillList" :addControOverParams="addControOverParams"/>
  </div>
</template>
<script>
import * as api from "@/api/bill";
import * as hospitalApi from "@/api/hospitalManage";
import * as corApi from "@/api/corporateManagement";
import collection from "./components/collection.vue";
import detail from "./components/detail.vue"
import addControOver from "./components/addControOver.vue"
import { download } from "@/utils/util";

export default {
  components: {
    collection,
    detail,
    addControOver
  },
  data() {
    return {
      isLoading:false,
      // 查询
      query: {
        startDate: this.$moment().startOf("month").format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        hospitalId: -1,
        valid: "true",
        billType: "0",
        returnBackState: -1,
        companyId: -1,
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "发票编号",
            key: "id",
            minWidth: 150,
          },
          {
            title: "客户",
            key: "hospitalName",
            minWidth: 220,
            align: "center",
          },
          {
            title: "发票金额",
            key: "billPrice",
            minWidth: 110,
            align: "center",
          },
          {
            title: "税率(%)",
            key: "taxRate",
            minWidth: 110,
            align: "center",
          },
          {
            title: "税额",
            key: "taxPrice",
            minWidth: 110,
            align: "center",
          },
          {
            title: "不含税金额",
            key: "notInTaxPrice",
            minWidth: 110,
            align: "center",
          },
          {
            title: "其他费用",
            key: "otherPrice",
            minWidth: 110,
            align: "center",
          },
          {
            title: "费用备注",
            key: "otherPriceRemark",
            minWidth: 300,
            align: "center",
          },
          {
            title: "收款公司",
            key: "collectionCompanyName",
            minWidth: 220,
            align: "center",
          },
          {
            title: "开票时间",
            key: "createDate",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.createDate).format("YYYY-MM-DD") 
              );
            },
          },
          {
            title: "票据归属时间",
            key: "billPrice",
            minWidth: 200,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.belongStartTime).format("YYYY-MM-DD") +
                  " - " +
                  this.$moment(params.row.belongEndTime).format("YYYY-MM-DD")
              );
            },
          },
          {
            title: "票据类型",
            key: "billTypeText",
            minWidth: 110,
            align: "center",
          },
          {
            title: "开票事由",
            key: "createBillReason",
            minWidth: 300,
            align: "center",
          },

          {
            title: "回款状态",
            key: "returnBackStateText",
            minWidth: 110,
            align: "center",
            render: (h, params) => {
              if (params.row.returnBackStateText == "已回款") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.returnBackStateText
                );
              } else if (params.row.returnBackStateText == "未回款") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.returnBackStateText
                );
              }  else if (params.row.returnBackStateText == "回款中") {
                return h(
                  "div",
                  {
                    style: {
                      color: "orange",
                    },
                  },
                  params.row.returnBackStateText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.returnBackStateText
                );
              }
            },
          },
          {
            title: "回款时间",
            key: "returnBackPriceDate",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.returnBackPriceDate ? this.$moment(params.row.returnBackPriceDate).format("YYYY-MM-DD")  : ''
              );
            },
          },
          {
            title: "已回款金额",
            key: "returnBackPrice",
            minWidth: 110,
            align: "center",
          },
          {
            title: "开票人",
            key: "createByEmployeeName",
            minWidth: 130,
            align: "center",
          },
          {
            title: "发票状态",
            key: "validText",
            minWidth: 100,
            align: "center",
          },
          {
            title: "操作",
            key: "",
            width: 260,
            fixed: "right",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        api.byIdBill(id).then((res) => {
                          if (res.code === 0) {
                           this.detailParams = res.data.bill;
                           this.detailModel = true;
                          }
                        });
                      },
                    },
                  },
                  "查看详情"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled:params.row.returnBackStateText == '已回款' || params.row.validText == '作废'
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id,billPrice,otherPrice,returnBackPrice } = params.row;
                        this.collectionParams.id = id;
                        this.collectionParams.billPrice = billPrice;
                        this.collectionParams.otherPrice = otherPrice;
                        this.collectionParams.returnBackPrice = returnBackPrice;
                        this.collectionModel = true;
                      },
                    },
                  },
                  "回款"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled:params.row.returnBackStateText == '已回款'|| params.row.validText == '作废'
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        api.byIdBill(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              // 客户 医院
                              hospitalId,
                              // 发票金额
                              billPrice,
                              // 其他费用
                              otherPrice,
                              // 费用备注
                              otherPriceRemark,
                              // 开票时间
                              createDate,
                              // 税率
                              taxRate,
                              // 税额
                              taxPrice,
                              // 不含税金额
                              notInTaxPrice,
                              // 收款公司
                              collectionCompanyId,
                              // 开票事由
                              createBillReason,
                              // 票据类型
                              billType,
                              // 票据归属时间
                              belongStartTime,
                              belongEndTime,
                            } = res.data.bill;
                            this.isEdit = true;
                            this.form.id = id;
                            this.form.hospitalId = hospitalId;
                            this.form.billPrice = billPrice;
                            this.form.otherPrice = otherPrice;
                            this.form.otherPriceRemark = otherPriceRemark;
                            this.form.createDate = createDate;
                            this.form.taxRate = taxRate;
                            this.form.taxPrice = taxPrice;
                            this.form.notInTaxPrice = notInTaxPrice;
                            this.form.collectionCompanyId = collectionCompanyId;
                            this.form.createBillReason = createBillReason;
                            this.form.billType = String(billType);
                            this.form.time = [belongStartTime, belongEndTime];
                            this.form.id = id;
                            this.controlModal = true;
                          }
                        });
                      },
                    },
                  },
                  "修改"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small",
                      disabled:params.row.returnBackStateText != '未回款' || params.row.validText == '作废'
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "作废提示",
                          content: "是否确认作废？",
                          onOk: () => {
                            const { id } = params.row;
                            api.deleteBill(id).then((res) => {
                              if (res.code === 0) {
                                this.getBillList();
                                this.$Message.success({
                                  content: "作废成功",
                                  duration: 3,
                                });
                              }
                            });
                          },
                          onCancel: () => {},
                        });
                      },
                    },
                  },
                  "作废"
                ),
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },
      // 控制 modal
      controlModal: false,
      // modal title
      title: "添加",
      // 是否是编辑
      isEdit: false,
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
        billType: 0,
        // 开票时间
        createBillDate:'',

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
      hospitalInfo: [],
      hospitalAllList: [{ id: -1, name: "全部客户" }],
      companyNameAllList: [{ id: -1, name: "全部收款公司" }],
      billReturnBackStateAllList: [{ id: -1, name: "全部回款状态" }],
      // 公司管理
      companyNameList: [],
      // 发票
      billTypeList: [],
      validList: [
        {
          type: "true",
          name: "正常",
        },
        {
          type: "false",
          name: "作废",
        },
      ],
      // 回款 model
      collectionModel: false,
      // 回款参数
      collectionParams: {
        id: "",
        billPrice:null,
        otherPrice:null,
        returnBackPrice:null
      },
      // 查看详情 model
      detailModel:false,
      // 查看详情 参数
      detailParams:{},
      // 添加
      addControOverModel:false,
      // 添加参数
      addControOverParams:{
        billTypeList:[],
        companyNameList:[],
        hospitalInfo:[]
      },
    };
  },
  methods: {
    // 导出
    exportBillList() {
      const {
        pageNum,
        pageSize,
        keyword,
        hospitalId,
        valid,
        billType,
        returnBackState,
        companyId,
        startDate,
        endDate,

      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        valid,
        billType,
        hospitalId: hospitalId == -1 ? null : hospitalId,
        returnBackState: returnBackState == -1 ? null : returnBackState,
        companyId: companyId == -1 ? null : companyId,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
      };
      if (!startDate || !endDate) {
        this.$Message.error("请选择日期");
        return;
      }
      if (this.query.data.length == 0) {
        this.$Message.error("没有数据时不支持导出");
        return;
      }
      api.exportBillList(data).then((res) => {
        let name =
          this.$moment(new Date(startDate)).format("YYYY-MM-DD") +
          "-" +
          this.$moment(new Date(endDate)).format("YYYY-MM-DD") +
          "发票信息";
        download(res, name);
      });
    },
    taxRateChange(value){
      const {billPrice,taxRate} = this.form
      // 税率
      let num = (taxRate/100).toFixed(2)
      // 含税计算公式 （发票金额/（（1+税率）*税率）--保留2位小数）
      this.form.taxPrice = ((billPrice / (1+Number(num))) * Number(num)).toFixed(2)
      // 不含税
      this.form.notInTaxPrice = (billPrice - this.form.taxPrice).toFixed(2)
    },
    // 获取票据回款状态下拉框
    billReturnBackStateList() {
      api.billReturnBackStateList().then((res) => {
        if (res.code === 0) {
          this.billReturnBackStateAllList = [
            ...this.billReturnBackStateAllList,
            ...res.data.billReturnBackStateList,
          ];
        }
      });
    },
    // 获取医院名称列表下拉框
    getHospitalInfonameList() {
      hospitalApi.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          this.hospitalInfo = res.data.hospitalInfo;
          this.addControOverParams.hospitalInfo = res.data.hospitalInfo;
          this.hospitalAllList = [
            ...this.hospitalAllList,
            ...res.data.hospitalInfo,
          ];
        }
      });
    },
    // 获取公司管理数据下拉框
    getCompany() {
      corApi.getCompanyBaseInfoNameList().then((res) => {
        if (res.code === 0) {
          this.companyNameList = res.data.nameList;
          this.addControOverParams.companyNameList = res.data.nameList;
          this.companyNameAllList = [
            ...this.companyNameAllList,
            ...res.data.nameList,
          ];
        }
      });
    },
    // 获取发票下拉框
    getBillTypeList() {
      api.getBillTypeList().then((res) => {
        if (res.code === 0) {
          this.billTypeList = res.data.billTypeList;
          this.addControOverParams.billTypeList = res.data.billTypeList;
        }
      });
    },
    // 获取发票管理列表
    getBillList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        keyword,
        hospitalId,
        valid,
        billType,
        returnBackState,
        companyId,
        startDate,
        endDate,

      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        valid,
        billType,
        hospitalId: hospitalId == -1 ? null : hospitalId,
        returnBackState: returnBackState == -1 ? null : returnBackState,
        companyId: companyId == -1 ? null : companyId,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
      };
      api.getBillList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.bill;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取发票管理列表分页
    handlePageChange(pageNum) {
      const { 
        pageSize,
        keyword,
        hospitalId,
        valid,
        billType,
        returnBackState,
        companyId,
        startDate,
        endDate,} = this.query;
      const data = { 
        // pageNum, 
        // pageSize, 
        // keyword ,
        // startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        // endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        pageNum,
        pageSize,
        keyword,
        valid,
        billType,
        hospitalId: hospitalId == -1 ? null : hospitalId,
        returnBackState: returnBackState == -1 ? null : returnBackState,
        companyId: companyId == -1 ? null : companyId,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
      };
      api.getBillList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.bill;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            const { id,time,hospitalId,billPrice,taxRate,taxPrice,notInTaxPrice,otherPrice,otherPriceRemark,collectionCompanyId,createDate,billType,createBillReason} = this.form;
            const data = {
              id,
              hospitalId,
              billPrice,
              taxRate,
              taxPrice:Number(taxPrice),
              notInTaxPrice:Number(notInTaxPrice),
              otherPrice:otherPrice ? otherPrice : 0,
              otherPriceRemark,
              collectionCompanyId,
              createDate,
              billType,
              createBillReason,
              belongStartTime:this.$moment(time[0]).format("YYYY-MM-DD"),
              belongEndTime:this.$moment(time[1]).format("YYYY-MM-DD"),
              createBillDate:createDate ? this.$moment(createDate).format("YYYY-MM-DD") : null
            };
            this.isLoading = true
            // 修改
            api.updateBill(data).then((res) => {
              if (res.code === 0) {
                this.isLoading = false
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getBillList();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }else{
                setTimeout(()=>{
                  this.isLoading = false
                },3000)
              }
            });
          } 
        }
      });
    },

    // 取消
    cancelSubmit(name) {
      this.isEdit = false;
      this.controlModal = false;
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    this.getBillList();
    this.getHospitalInfonameList();
    this.getCompany();
    this.getBillTypeList();
    this.billReturnBackStateList();
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
