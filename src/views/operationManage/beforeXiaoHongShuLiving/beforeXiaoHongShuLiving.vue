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
            v-model="query.operationEmpId"
            placeholder="请选择运营人员"
            style="width:200px;margin-left:10px"
            filterable
          >
            <Option
              v-for="item in employeeAll"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.netWorkConEmpId"
            placeholder="请选择网咨人员"
            style="width:200px;margin-left:10px"
            filterable
          >
            <Option
              v-for="item in netWorkConsultingNameListAll"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
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
            <FormItem label="小红书运营人员" prop="xiaoHongShuOperationEmployeeId">
              <Select
                v-model="form.xiaoHongShuOperationEmployeeId"
                placeholder="请选择小红书运营人员"
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
            <FormItem label="小红书今日发布量" prop="xiaoHongShuSendNum">
              <Input
                v-model="form.xiaoHongShuSendNum"
                placeholder="请输入小红书今日发布量"
                type="number"
                number
                @on-change="xiaoHongShuSendNumChange"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="小红书今日投流费用" prop="xiaoHongShuFlowInvestmentNum">
              <Input
                v-model="form.xiaoHongShuFlowInvestmentNum"
                placeholder="请输入小红书今日投流费用"
                type="number"
                number
                @on-change="xiaoHongShuFlowInvestmentNumChange"
              />
            </FormItem>
          </Col>
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
      // 查询
      query: {
        contentPlatFormId: null,
        liveAnchorId: null,
        // 运营人员
        operationEmpId: "",
        // 网咨人员
        netWorkConEmpId: "",
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
            title: "小红书运营人员",
            key: "xiaoHongShuOperationEmployeeName",
            minWidth: 170,
            align: "center",
          },
          {
            title: "小红书今日发布量",
            key: "xiaoHongShuSendNum",
            minWidth: 150,
            align: "center",
          },
          {
            title: "小红书今日投流费用",
            key: "xiaoHongShuFlowInvestmentNum",
            minWidth: 170,
            align: "center",
          },
          {
            title: "今日发布量",
            key: "todaySendNum",
            minWidth: 110,
            align: "center",
          },

          {
            title: "今日运营渠道投流费用",
            key: "flowInvestmentNum",
            minWidth: 180,
            align: "center",
          },
          {
            title: "今日加V人数",
            key: "addWechatNum",
            minWidth: 130,
            align: "center",
          },
          {
            title: "今日派单人数",
            key: "sendOrderNum",
            minWidth: 130,
            align: "center",
          },
          {
            title: "今日成交人数",
            key: "dealNum",
            minWidth: 130,
            align: "center",
          },
          {
            title: "今日总业绩",
            key: "performanceNum",
            minWidth: 120,
            align: "center",
          },
          {
            title: "创建日期",
            key: "createDate",
            minWidth: 170,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.createDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              );
            },
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
                        api.byIdLiveAnchorDailyTarget(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              liveanchorMonthlyTargetId,
                              xiaoHongShuOperationEmployeeId,
                              xiaoHongShuSendNum,
                              xiaoHongShuFlowInvestmentNum,
                              todaySendNum,
                              flowInvestmentNum,
                              recordDate,
                              tikTokSendNum,
                              zhihuSendNum,
                              sinaWeiBoSendNum,
                              videoSendNum,

                              zhihuFlowInvestmentNum,
                              sinaWeiBoFlowInvestmentNum,
                              videoFlowInvestmentNum,
                              tikTokFlowInvestmentNum

                            } = res.data.liveAnchorDailyTargetInfo;
                            this.getLiveAnchorMonthlyTarget()
                            this.isEdit = true;
                            this.form.id = id;
                            this.controlModal = true;
                            this.form.liveanchorMonthlyTargetId = liveanchorMonthlyTargetId;
                            this.form.xiaoHongShuOperationEmployeeId = xiaoHongShuOperationEmployeeId==0 ?  null : xiaoHongShuOperationEmployeeId ;
                            this.form.xiaoHongShuSendNum = xiaoHongShuSendNum;
                            this.form.xiaoHongShuFlowInvestmentNum = xiaoHongShuFlowInvestmentNum;
                            this.form.alltodaySendNum = Number(tikTokSendNum)+Number(zhihuSendNum)+Number(sinaWeiBoSendNum)+Number(videoSendNum)
                            this.form.allflowInvestmentNum = Math.floor((Number(tikTokFlowInvestmentNum)+Number(sinaWeiBoFlowInvestmentNum)
                            +Number(videoFlowInvestmentNum) + Number(zhihuFlowInvestmentNum)) * 100) / 100;
                            this.form.recordDate = this.$moment(
                              new Date(recordDate)
                            ).format("YYYY-MM-DD");
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
        xiaoHongShuOperationEmployeeId: "",
        // 小红书今日发布量
        xiaoHongShuSendNum:null,
        // 小红书今日投流费用
        xiaoHongShuFlowInvestmentNum:null,
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
        alltodaySendNum:null
      },

      ruleValidate: {
        liveanchorMonthlyTargetId: [
          {
            required: true,
            message: "请选择月目标名称",
          },
        ],
        xiaoHongShuOperationEmployeeId: [
          {
            required: true,
            message: "请选择运营人员",
          },
        ],
        xiaoHongShuSendNum: [
          {
            required: true,
            message: "请输入小红书今日发布量",
          },
        ],
        xiaoHongShuFlowInvestmentNum: [
          {
            required: true,
            message: "请输入小红书今日投流费用",
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
    xiaoHongShuSendNumChange(){
      this.form.todaySendNum = Number(this.form.xiaoHongShuSendNum) 
    },
    xiaoHongShuFlowInvestmentNumChange(){
      this.form.flowInvestmentNum = Number(this.form.xiaoHongShuFlowInvestmentNum)
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
      api.getLiveAnchorMonthlyTarget(data).then((res) => {
        if (res.code === 0) {
          const { liveAnchorMonthlyTarget } = res.data;
          if(liveAnchorMonthlyTarget.length == 0 || !liveAnchorMonthlyTarget){
            this.$Message.warning({
              content: "主播IP月目标暂未生成，无法填写数据，请联系管理员进行月目标数据完善！",
              duration: 3,
            });
            return
          }
          this.liveAnchorMonthlyTarget = liveAnchorMonthlyTarget;
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
        operationEmpId,
        netWorkConEmpId,
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
        operationEmpId,
        netWorkConEmpId,
        liveAnchorId,
      };
      if (!startDate || !endDate) {
        this.$Message.error("请选择日期");
        return;
      } else {
        api.getLiveAnchorDailyTarget(data).then((res) => {
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
        operationEmpId,
        netWorkConEmpId,
        startDate,
        endDate,
        liveAnchorId,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        startDate: this.$moment(new Date(startDate)).format("YYYY-MM-DD"),
        endDate: this.$moment(new Date(endDate)).format("YYYY-MM-DD"),
        operationEmpId,
        netWorkConEmpId,
        liveAnchorId,
      };
      api.getLiveAnchorDailyTarget(data).then((res) => {
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
              xiaoHongShuOperationEmployeeId,
              xiaoHongShuSendNum,
              xiaoHongShuFlowInvestmentNum,
              todaySendNum,
              flowInvestmentNum,
              recordDate,
              allflowInvestmentNum,
              alltodaySendNum
            } = this.form;
            const data = {
              id,
              liveanchorMonthlyTargetId,
              xiaoHongShuOperationEmployeeId: xiaoHongShuOperationEmployeeId
                ? xiaoHongShuOperationEmployeeId
                : 0,
              xiaoHongShuSendNum: xiaoHongShuSendNum ? xiaoHongShuSendNum : 0,
              xiaoHongShuFlowInvestmentNum: xiaoHongShuFlowInvestmentNum ? xiaoHongShuFlowInvestmentNum : 0,
              todaySendNum:Number(alltodaySendNum) + Number(xiaoHongShuSendNum),
              flowInvestmentNum:Math.floor((allflowInvestmentNum + xiaoHongShuFlowInvestmentNum) * 100) /100,
              recordDate: this.$moment(new Date(recordDate)).format(
                "YYYY-MM-DD"
              ),
            };
            api.BeforeLivingXiaoHongShuUpdate(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getLiveAnchorDayList();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const {
              liveanchorMonthlyTargetId,
              xiaoHongShuOperationEmployeeId,
              xiaoHongShuSendNum,
              xiaoHongShuFlowInvestmentNum,
              todaySendNum,
              flowInvestmentNum	,
              recordDate,
             
            } = this.form;
            const data = {
              liveanchorMonthlyTargetId,
              xiaoHongShuOperationEmployeeId,
              xiaoHongShuSendNum: xiaoHongShuSendNum ? xiaoHongShuSendNum : 0,
              xiaoHongShuFlowInvestmentNum	: xiaoHongShuFlowInvestmentNum	 ? xiaoHongShuFlowInvestmentNum	 : 0,
              todaySendNum,
              flowInvestmentNum	,
              recordDate: this.$moment(new Date(recordDate)).format(
                "YYYY-MM-DD"
              ),
            };
            // 添加
            api.BeforeXiaoHongShuLivingAdd(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getLiveAnchorDayList();
                this.$Message.success({
                  content: "添加成功",
                  duration: 3,
                });
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
</style>
