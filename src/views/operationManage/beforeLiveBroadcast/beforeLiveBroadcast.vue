<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <DatePicker
            type="date"
            placeholder="请选择开始时间"
            style="width: 10rem;"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="请选择结束时间"
            style="width: 10rem;margin-left:10px"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <Select
            v-model="query.contentPlatFormId"
            placeholder="请选择主播平台"
            @on-change="contentPlateChange(query.contentPlatFormId)"
            style="width: 180px; margin-left: 10px"
            filterable
          >
            <Option
              v-for="item in contentPalteForms"
              :value="item.id"
              :key="item.id"
              >{{ item.contentPlatformName }}</Option
            >
          </Select>
          <Select
            v-model="query.liveAnchorId"
            placeholder="请选择主播IP账号"
            style="width: 180px; margin-left: 10px"
            :disabled="query.contentPlatFormId === null"
            filterable
          >
            <Option
              v-for="item in liveAnchors"
              :value="item.id"
              :key="item.id"
              >{{ item.hostAccountName }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getLiveAnchorDayList(1)"
            >查询</Button
          >
        </div>
        <div class="right">
          <Button type="primary" @click="controlModal = true;getLiveAnchorMonthlyTarget()">添加</Button>
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
      <div class="bottom_title">往期数据已存储，请进行新数据填写，若需要更早期数据可联系研发部</div>
    </Card>

    <Modal
      v-model="controlModal"
      :title="title"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="1200"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="160"
      >
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="年份选择" prop="year">
              <DatePicker
                type="year"
                placeholder="请选择年"
                v-model="form.year"
                @on-change="yearChange"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="月份选择" prop="month">
              <Select
                v-model="form.month"
                placeholder="请选择生日月份"
                filterable
                @on-change="monthChange"
              >
                <Option
                  v-for="item in monthList"
                  :value="item.month"
                  :key="item.month"
                  >{{ item.name }}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="月目标名称" prop="liveanchorMonthlyTargetId">
              <Select
                v-model="form.liveanchorMonthlyTargetId"
                placeholder="请选择月目标名称"
                filterable
              >
                <Option
                  v-for="item in liveAnchorMonthlyTarget"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="抖音运营人员" prop="tikTokOperationEmployeeId">
              <Select
                v-model="form.tikTokOperationEmployeeId"
                placeholder="请选择抖音运营人员"
                filterable
              >
                <Option
                  v-for="item in employee"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="填报日期" prop="recordDate">
              <DatePicker
                type="date"
                placeholder="请选择填报日期"
                :value="form.recordDate"
                v-model="form.recordDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="抖音今日发布量" prop="tikTokSendNum">
              <Input
                v-model="form.tikTokSendNum"
                placeholder="请输入抖音今日发布量"
                type="number"
                number
                @on-change="tikTokSendNumChange"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="抖音今日投流费用" prop="tikTokFlowInvestmentNum">
              <Input
                v-model="form.tikTokFlowInvestmentNum"
                placeholder="请输入抖音今日投流费用"
                type="number"
                number
                @on-change="tikTokFlowInvestmentNumChange"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="抖音橱窗收入" prop="tikTokShowcaseIncome">
              <Input
                v-model="form.tikTokShowcaseIncome"
                placeholder="请输入抖音橱窗收入"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="抖音涨粉" prop="tikTokIncreaseFans">
              <Input
                v-model="form.tikTokIncreaseFans"
                placeholder="请输入抖音涨粉"
                type="number"
                number
                @on-change="costChange"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="抖音涨粉付费" prop="tikTokIncreaseFansFees">
              <Input
                v-model="form.tikTokIncreaseFansFees"
                placeholder="请输入抖音涨粉付费"
                type="number"
                number
                @on-change="costChange"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="抖音涨粉成本" prop="tikTokIncreaseFansFeescost">
              <Input
                v-model="form.tikTokIncreaseFansFeescost"
                placeholder="请输入抖音涨粉成本"
                type="number"
                number
                disabled
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="抖音橱窗付费" prop="tikTokShowCaseFee">
              <Input
                v-model="form.tikTokShowCaseFee"
                placeholder="请输入抖音橱窗付费"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="抖音线索量" prop="tikTokClues">
              <Input
                v-model="form.tikTokClues"
                placeholder="请输入抖音线索量"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Spin fix v-if="isflag==true">
              <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
              <div>加载中...</div>
          </Spin>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/operationManage";
import * as orderApi from "@/api/orderManage";
import * as contentPlatForm from "@/api/baseDataMaintenance";
export default {
  data() {
    return {
      isflag:false,
      // 查询
      query: {
        contentPlatFormId: null,
        liveAnchorId: null,
        startDate: this.$moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD"),
        endDate: this.$moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD"),
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "填报日期",
            key: "recordDate",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.recordDate).format("YYYY-MM-DD")
              );
            },
          },
          {
            title: "主播",
            key: "liveAnchor",
            minWidth: 160,
            align: "center",
          },
          {
            title: "抖音运营人员",
            key: "operationEmpName",
            minWidth: 170,
            align: "center",
          },
          {
            title: "更新时间",
            key: "updateDate",
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.updateDate ? this.$moment(params.row.updateDate).format("YYYY-MM-DD HH:mm:ss") : ''
              );
            },
          },
          {
            title: "今日发布量",
            key: "sendNum",
            minWidth: 130,
            align: "center",
          },
          {
            title: "今日投流费用",
            key: "flowInvestmentNum",
            minWidth: 130,
            align: "center",
          },
          {
            title: "今日涨粉",
            key: "increaseFans",
            minWidth: 150,
            align: "center",
          },
          {
            title: "今日涨粉付费",
            key: "increaseFansFees",
            minWidth: 150,
            align: "center",
          },
          {
            title: "今日橱窗收入",
            key: "tikTokShowcaseIncome",
            minWidth: 150,
            align: "center",
          },
          {
            title: "今日橱窗付费",
            key: "showCaseFee",
            minWidth: 150,
            align: "center",
          },
          {
            title: "今日线索量",
            key: "clues",
            minWidth: 150,
            align: "center",
          },
          {
            title: "今日加V人数",
            key: "addWechatNum",
            minWidth: 150,
            align: "center",
          },
          {
            title: "今日派单人数",
            key: "sendOrderNum",
            minWidth: 150,
            align: "center",
          },
          {
            title: "今日成交人数",
            key: "dealNum",
            minWidth: 150,
            align: "center",
          },
          {
            title: "今日总业绩",
            key: "performanceNum",
            minWidth: 140,
            align: "center",
          },
          {
            title: "操作",
            key: "",
            width: 120,
            align: "center",
            fixed: "right",
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
                        this.title = "修改";
                        this.flag = true;
                        const data = {
                          id:id,
                          type:1
                        }
                        api.byIdLiveAnchorDailyTarget(data).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              liveanchorMonthlyTargetId,
                              tikTokOperationEmployeeId,
                              tikTokSendNum,
                              tikTokFlowInvestmentNum,
                              todaySendNum,
                              flowInvestmentNum,
                              recordDate,

                              zhihuSendNum,
                              xiaoHongShuSendNum,
                              sinaWeiBoSendNum,
                              videoSendNum,


                              zhihuFlowInvestmentNum,
                              xiaoHongShuFlowInvestmentNum,
                              sinaWeiBoFlowInvestmentNum,
                              videoFlowInvestmentNum,
                              tikTokShowcaseIncome,
                              tikTokIncreaseFans,
                              tikTokIncreaseFansFees,
                              tikTokClues,
                              tikTokShowcaseFee
                            } = res.data.liveAnchorDailyTargetInfo;
                            this.getLiveAnchorMonthlyTarget()
                            this.isEdit = true;
                            this.form.id = id;
                            this.controlModal = true;
                            this.form.liveanchorMonthlyTargetId = liveanchorMonthlyTargetId;
                            this.form.tikTokShowCaseFee = tikTokShowcaseFee;
                            this.form.tikTokIncreaseFans = tikTokIncreaseFans;
                            this.form.tikTokIncreaseFansFees = tikTokIncreaseFansFees;
                            this.form.tikTokClues = tikTokClues;
                            this.form.tikTokOperationEmployeeId = tikTokOperationEmployeeId==0 ?  null : tikTokOperationEmployeeId ;
                            this.form.tikTokSendNum = tikTokSendNum;
                            this.form.tikTokFlowInvestmentNum = tikTokFlowInvestmentNum;
                            this.form.tikTokShowcaseIncome = tikTokShowcaseIncome;
                            this.form.todaySendNum = Number(zhihuSendNum)+Number(xiaoHongShuSendNum)+Number(sinaWeiBoSendNum)+Number(videoSendNum)
                            this.form.alltodaySendNum = Math.floor(this.form.todaySendNum * 100) / 100;
                            this.form.flowInvestmentNum = Number(zhihuFlowInvestmentNum)+Number(xiaoHongShuFlowInvestmentNum)
                            +Number(sinaWeiBoFlowInvestmentNum)+Number(videoFlowInvestmentNum)
                            this.form.allflowInvestmentNum = Math.floor(this.form.flowInvestmentNum * 100) / 100;
                            this.form.recordDate = this.$moment(
                              new Date(recordDate)
                            ).format("YYYY-MM-DD");
                             // 银行家算法保留两位小数
                            const price = this.form.tikTokIncreaseFansFees / this.form.tikTokIncreaseFans
                            this.form.tikTokIncreaseFansFeescost =  Math.round(price * 100) / 100 
                          }
                        });
                      },
                    },
                  },
                  "修改"
                ),
                // h(
                //   "Button",
                //   {
                //     props: {
                //       type: "error",
                //       size: "small",
                //     },
                //     on: {
                //       click: () => {
                //         this.$Modal.confirm({
                //           title: "删除提示",
                //           content: "是否确认删除？",
                //           onOk: () => {
                //             const { id } = params.row;
                //             api.deleteLiveAnchorDailyTarget(id).then((res) => {
                //               if (res.code === 0) {
                //                 this.getLiveAnchorDayList();
                //                 this.$Message.success({
                //                   content: "删除成功",
                //                   duration: 3,
                //                 });
                //               }
                //             });
                //           },
                //           onCancel: () => {},
                //         });
                //       },
                //     },
                //   },
                //   "删除"
                // ),
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },
      monthList: [
        {
          month: 1,
          name: "一月",
        },
        {
          month: 2,
          name: "二月",
        },
        {
          month: 3,
          name: "三月",
        },
        {
          month: 4,
          name: "四月",
        },
        {
          month: 5,
          name: "五月",
        },
        {
          month: 6,
          name: "六月",
        },
        {
          month: 7,
          name: "七月",
        },
        {
          month: 8,
          name: "八月",
        },
        {
          month: 9,
          name: "九月",
        },
        {
          month: 10,
          name: "十月",
        },
        {
          month: 11,
          name: "十一月",
        },
        {
          month: 12,
          name: "十二月",
        },
      ],
      //   下单平台
      contentPalteForms: [],
      // ip账号
      liveAnchors: [],
      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",
      flag: false,

      // 是否是编辑
      isEdit: false,
      //   月度
      liveAnchorMonthlyTarget: [],
      //   获取运营
      employee: [],
      employeeAll: [{ id: "", name: "全部人员" }],
      netWorkConsultingNameList: [],
      netWorkConsultingNameListAll: [{ id: "", name: "全部人员" }],
      form: {
        // 主播月目标关联id
        liveanchorMonthlyTargetId: "",
        // 运营人员Id
        tikTokOperationEmployeeId: "",
        // 抖音今日发布量
        tikTokSendNum:null,
        // 抖音今日投流费用
        tikTokFlowInvestmentNum:null,
        // 今日发布量
        todaySendNum: null,
        // 今日运营渠道投流费用
        flowInvestmentNum: null,
        // 填报日期
        recordDate: "",
        //年度
        year: this.$moment(new Date()).format("yyyy"),
        // 月度
        month: Number(this.$moment(new Date()).format("MM")),
        allflowInvestmentNum:null,
        alltodaySendNum:null,
        // 抖音橱窗收入目标
        tikTokShowcaseIncome:null,
        // 抖音涨粉
        tikTokIncreaseFans:null,
         // 抖音涨粉付费
        tikTokIncreaseFansFees:null,
         // 抖音线索量
        tikTokClues:null,
        // 涨粉成本
        tikTokIncreaseFansFeescost:null,
        // 抖音橱窗付费
        tikTokShowCaseFee:null
      },

      ruleValidate: {
        tikTokShowCaseFee: [
          {
            required: true,
            message: "请输入抖音橱窗付费",
          },
        ],
        tikTokIncreaseFansFeescost: [
          {
            required: true,
            message: "请输入抖音涨粉成本",
          },
        ],
        tikTokIncreaseFans: [
          {
            required: true,
            message: "请输入抖音涨粉",
          },
        ],
        tikTokIncreaseFansFees: [
          {
            required: true,
            message: "请输入抖音涨粉付费",
          },
        ],
        tikTokClues: [
          {
            required: true,
            message: "请输入抖音线索量",
          },
        ],
        liveanchorMonthlyTargetId: [
          {
            required: true,
            message: "请选择月目标名称",
          },
        ],
        tikTokOperationEmployeeId: [
          {
            required: true,
            message: "请选择运营人员",
          },
        ],
        tikTokSendNum: [
          {
            required: true,
            message: "请输入抖音今日发布量",
          },
        ],
        tikTokFlowInvestmentNum: [
          {
            required: true,
            message: "请输入抖音今日投流费用",
          },
        ],
        tikTokShowcaseIncome: [
          {
            required: true,
            message: "请输入抖音橱窗收入",
          },
        ],
        todaySendNum: [
          {
            required: true,
            message: "请输入今日发布量",
          },
        ],
        flowInvestmentNum: [
          {
            required: true,
            message: "请输入今日投流量",
          },
        ],
        recordDate: [
          {
            required: true,
            message: "请选择报报日期",
          },
        ],
        year: [
          {
            required: true,
            message: "请选择年",
          },
        ],
        month: [
          {
            required: true,
            message: "请选择月",
          },
        ],
      },
    };
  },
  methods: {
    // 计算涨粉成本
    costChange(){
      // 银行家算法保留两位小数
      const price = this.form.tikTokIncreaseFansFees / this.form.tikTokIncreaseFans
      this.form.tikTokIncreaseFansFeescost =  Math.round(price * 100) / 100 
    },
    tikTokSendNumChange(){
      this.form.todaySendNum = Number(this.form.tikTokSendNum) 
    },
    tikTokFlowInvestmentNumChange(){
      this.form.flowInvestmentNum = Number(this.form.tikTokFlowInvestmentNum)
    },
    yearChange() {
      this.getLiveAnchorMonthlyTarget();
    },
    monthChange() {
      this.getLiveAnchorMonthlyTarget();
    },
    //   获取平台（下拉框）
    getContentValidList() {
      contentPlatForm.getContentPlatFormValidList().then((res) => {
        if (res.code === 0) {
          const { contentPalteForms } = res.data;
          this.contentPalteForms = contentPalteForms;
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
      orderApi.getLiveValidList(data).then((res) => {
        if (res.code === 0) {
          const { liveAnchors } = res.data;
          this.liveAnchors = liveAnchors;
        }
      });
    },
    // 获取运营（下拉框）
    getCustomerServiceList() {
      api.operatingConsultingNameList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employee = employee;
          this.employeeAll = [...this.employeeAll, ...employee];
        }
      });
    },
    // 获取网咨 客服（下拉框）
    getnetWorkConsultingNameList() {
      orderApi.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.netWorkConsultingNameList = employee;
          this.netWorkConsultingNameListAll = [
            ...this.netWorkConsultingNameListAll,
            ...employee,
          ];
        }
      });
    },
    //   获取月度（下拉框）
    getLiveAnchorMonthlyTarget() {
      const { year, month } = this.form;
      const data = {
        year: this.$moment(new Date(year)).format("YYYY"),
        month,
      };
      api.getLiveAnchorMonthlyTargetBeforeLivingName(data).then((res) => {
        if (res.code === 0) {
          const { liveAnchorMonthlyTargetBeforeLiving } = res.data;
          if(liveAnchorMonthlyTargetBeforeLiving.length == 0 || !liveAnchorMonthlyTargetBeforeLiving){
            this.$Message.warning({
              content: "主播IP月目标暂未生成，无法填写数据，请联系管理员进行月目标数据完善！",
              duration: 3,
            });
            return
          }
          this.liveAnchorMonthlyTarget = liveAnchorMonthlyTargetBeforeLiving;
        }
      });
    },
    // 获取主播日经营数据列表
    getLiveAnchorDayList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        day,
        startDate,
        endDate,
        liveAnchorId,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        // day: this.$moment(new Date(day)).format("YYYY-MM-DD"),
        startDate: this.$moment(new Date(startDate)).format("YYYY-MM-DD"),
        endDate: this.$moment(new Date(endDate)).format("YYYY-MM-DD"),
        liveAnchorId,
        type:1
      };
      if (!startDate || !endDate) {
        this.$Message.error("请选择日期");
        return;
      } else {
        api.getBeforeListWithPage(data).then((res) => {
          if (res.code === 0) {
            const { list, totalCount } = res.data.liveAnchorDailyTargetInfo;
            this.query.data = list;
            this.query.totalCount = totalCount;
          }
        });
      }
    },

    // 获取主播日经营数据列表分页
    handlePageChange(pageNum) {
      const {
        pageSize,
        startDate,
        endDate,
        liveAnchorId,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        startDate: this.$moment(new Date(startDate)).format("YYYY-MM-DD"),
        endDate: this.$moment(new Date(endDate)).format("YYYY-MM-DD"),
        liveAnchorId,
        type:1
      };
      api.getBeforeListWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.liveAnchorDailyTargetInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            // 修改
            const {
              id,
              liveanchorMonthlyTargetId,
              tikTokOperationEmployeeId,
              tikTokSendNum,
              tikTokFlowInvestmentNum,
              todaySendNum,
              flowInvestmentNum,
              recordDate,
              allflowInvestmentNum,
              alltodaySendNum,
              tikTokShowcaseIncome,
              tikTokIncreaseFans,
              tikTokIncreaseFansFees,
              tikTokClues,
              tikTokShowCaseFee
            } = this.form;
            const data = {
              id,
              liveanchorMonthlyTargetId,
              tikTokOperationEmployeeId: tikTokOperationEmployeeId
                ? tikTokOperationEmployeeId
                : 0,
              tikTokSendNum: tikTokSendNum ? tikTokSendNum : 0,
              tikTokFlowInvestmentNum: tikTokFlowInvestmentNum ? tikTokFlowInvestmentNum : 0,
              todaySendNum:Number(alltodaySendNum)+Number(tikTokSendNum),
              recordDate: this.$moment(new Date(recordDate)).format(
                "YYYY-MM-DD"
              ),
              flowInvestmentNum:Math.floor((allflowInvestmentNum + tikTokFlowInvestmentNum) * 100) /100,
              tikTokShowcaseIncome,
              tikTokIncreaseFans,
              tikTokIncreaseFansFees,
              tikTokClues,
              tikTokShowCaseFee
            };
            this.isflag = true;
            api.BeforeLivingTikTokUpdate(data).then((res) => {
              if (res.code === 0) {
                this.isflag = false;
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getLiveAnchorDayList();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }else {
                  setTimeout(() => {
                    this.isflag = false;
                  }, 3000);
                }
            });
          } else {
            const {
              liveanchorMonthlyTargetId,
              tikTokOperationEmployeeId,
              tikTokSendNum,
              tikTokFlowInvestmentNum,
              todaySendNum,
              flowInvestmentNum	,
              recordDate,
              tikTokShowcaseIncome,
              tikTokIncreaseFans,
              tikTokIncreaseFansFees,
              tikTokClues,
              tikTokShowCaseFee
             
            } = this.form;
            const data = {
              liveanchorMonthlyTargetId,
              tikTokOperationEmployeeId,
              tikTokSendNum: tikTokSendNum ? tikTokSendNum : 0,
              tikTokFlowInvestmentNum	: tikTokFlowInvestmentNum	 ? tikTokFlowInvestmentNum	 : 0,
              todaySendNum,
              flowInvestmentNum	,
              recordDate: this.$moment(new Date(recordDate)).format(
                "YYYY-MM-DD"
              ),
              tikTokShowcaseIncome,
              tikTokIncreaseFans,
              tikTokIncreaseFansFees,
              tikTokClues,
              tikTokShowCaseFee
            };
            this.isflag = true;
            // 添加
            api.BeforeTikTokLivingAdd(data).then((res) => {
              if (res.code === 0) {
                this.isflag = false;
                this.cancelSubmit("form");
                this.getLiveAnchorDayList();
                this.$Message.success({
                  content: "添加成功",
                  duration: 3,
                });
              }else {
                  setTimeout(() => {
                    this.isflag = false;
                  }, 3000);
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
      this.title = "添加";
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.title = "添加";
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    this.getContentValidList();
    this.getLiveAnchorDayList();
    this.getCustomerServiceList();
    this.getnetWorkConsultingNameList();
    // this.getLiveAnchorMonthlyTarget();
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
.bottom_title{
  font-size: 14px;
  font-weight: bold;
  color: red;
  text-align: end;
  margin-top: 10px;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
</style>
