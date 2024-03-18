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
            <FormItem label="直播中人员" prop="livingTrackingEmployeeId">
              <Select
                v-model="form.livingTrackingEmployeeId"
                placeholder="请选择直播中人员"
                filterable
              >
                <Option
                  v-for="item in employeeList"
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
          <!-- <Col span="8">
            <FormItem 
              label="抖+投流费用" 
              prop="tikTokPlusNum"
              :rules="[
                { required: true, message: '请输入抖+投流费用',},
                { message: '抖+投流费用只能是大于0的整数', trigger:'blur', pattern:/^[0-9]+$/}
              ]"
            >
              <Input
                v-model="form.tikTokPlusNum"
                placeholder="请输入抖+投流费用"
                type="number"
                number
                @on-change="livingRoomFlowInvestmentNum()"
              />
            </FormItem>
          </Col> -->
          <Col span="8">
            <FormItem 
              label="千川投流" 
              prop="qianChuanNum"
              :rules="[
                { required: true, message: '请输入千川投流',},
                { message: '千川投流只能是大于0的整数', trigger:'blur', pattern:/^[0-9]+$/}
              ]"
            >
              <Input
                v-model="form.qianChuanNum"
                placeholder="请输入千川投流"
                type="number"
                number
                @on-change="livingRoomFlowInvestmentNum()"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem 
              label="随心推" 
              prop="shuiXinTuiNum"
              :rules="[
                { required: true, message: '请输入随心推',},
                { message: '随心推只能是大于0的整数', trigger:'blur', pattern:/^[0-9]+$/}
              ]"
            >
              <Input
                v-model="form.shuiXinTuiNum"
                placeholder="请输入随心推"
                type="number"
                number
                @on-change="livingRoomFlowInvestmentNum()"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem 
              label="微信豆" 
              prop="weiXinDou"
              :rules="[
                { required: true, message: '请输入微信豆',},
                { message: '微信豆只能是大于0的整数', trigger:'blur', pattern:/^[0-9]+$/}
              ]"
            >
              <Input
                v-model="form.weiXinDou"
                placeholder="请输入微信豆"
                type="number"
                number
                @on-change="livingRoomFlowInvestmentNum()"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem 
              label="今日直播间投流费用" 
              prop="livingRoomFlowInvestmentNum"
              :rules="[
                { required: true, message: '请输入今日直播间投流费用',},
                { message: '直播间投流只能是大于0的整数', trigger:'blur', pattern:/^[0-9]+$/}
              ]"
            >
              <Input
                v-model="form.livingRoomFlowInvestmentNum"
                placeholder="请输入今日直播间投流费用"
                type="number"
                number
                disabled
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="今日设计卡下卡量"
              prop="consultation"
              :rules="[
                {
                  required: title === '修改' ? true : false,
                  message: '请输入今日设计卡下卡量',
                },
              ]"
              key="今日设计卡下卡量"
            >
              <Input
                v-model="form.consultation"
                placeholder="请输入今日设计卡下卡量"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <!-- <Col span="8">
            <FormItem
              label="今日视频面诊卡下单数量"
              prop="consultation2"
              :rules="[
                {
                  required: title === '修改' ? true : false,
                  message: '请输入视频今日面诊卡下单数量',
                },
              ]"
              key="今日视频面诊卡下单数量"
            >
              <Input
                v-model="form.consultation2"
                placeholder="请输入今日视频面诊卡下单数量"
                type="number"
                number
              />
            </FormItem>
          </Col> -->
          <!-- <Col span="8">
            <FormItem
              label="今日带货结算佣金"
              prop="cargoSettlementCommission"
              key="今日带货结算佣金"
              :rules="[
                {
                  required: title === '修改' ? true : false,
                  message: '请输入今日带货结算佣金',
                },
              ]"
            >
              <Input
                v-model="form.cargoSettlementCommission"
                placeholder="请输入今日带货结算佣金"
                type="number"
                number
              />
            </FormItem>
          </Col> -->
          <Col span="8">
            <FormItem
              label="今日设计卡退卡量"
              prop="refundCard"
              key="今日设计卡退卡量"
              :rules="[
                {
                  required: true,
                  message: '请输入今日设计卡退卡量',
                },
              ]"
            >
              <Input
                v-model="form.refundCard"
                placeholder="请输入今日设计卡退卡量"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <!-- <Col span="8">
            <FormItem
              label="今日GMV"
              prop="gmv"
              key="今日GMV"
              :rules="[
                {
                  required: true,
                  message: '请输入今日GMV',
                },
              ]"
            >
              <Input
                v-model="form.gmv"
                placeholder="请输入今日GMV"
                type="number"
                number
              />
            </FormItem>
          </Col> -->
          <Col span="8">
            <FormItem
              label="今日带货GMV"
              prop="eliminateCardGMV"
              key="今日带货GMV"
              :rules="[
                {
                  required: true,
                  message: '请输入今日带货GMV',
                },
              ]"
            >
              <Input
                v-model="form.eliminateCardGMV"
                placeholder="请输入今日带货GMV"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="今日退款GMV"
              prop="refundGMV"
              key="今日退款GMV"
              :rules="[
                {
                  required: true,
                  message: '请输入今日退款GMV',
                },
              ]"
            >
              <Input
                v-model="form.refundGMV"
                placeholder="请输入今日退款GMV"
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
        <Button type="primary" @click="autoFill">自动填写</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/operationManage";
import * as orderApi from "@/api/orderManage";
import * as employeeManageApi from "@/api/employeeManage";
import * as contentPlatForm from "@/api/baseDataMaintenance";
export default {
  data() {
    return {
      isflag:false,
      employeeList: [],
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
            minWidth: 110,
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
            title: "直播中人员",
            key: "operationEmpName",
            minWidth: 150,
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
          // {
          //   title: "抖+投流费用",
          //   key: "tikTokPlusNum",
          //   minWidth: 130,
          //   align: "center",
          // },
          {
            title: "千川投流",
            key: "qianChuanNum",
            minWidth: 130,
            align: "center",
          },
          {
            title: "随心推",
            key: "shuiXinTuiNum",
            minWidth: 130,
            align: "center",
          },
          {
            title: "微信豆",
            key: "weiXinDou",
            minWidth: 130,
            align: "center",
          },
          {
            title: "今日直播间投流费用",
            key: "livingRoomFlowInvestmentNum",
            minWidth: 170,
            align: "center",
          },

          {
            title: "今日设计卡下卡量",
            key: "consultation",
            minWidth: 200,
            align: "center",
          },
          // {
          //   title: "今日视频面诊卡下单数量",
          //   key: "consultation2",
          //   minWidth: 200,
          //   align: "center",
          // },
          // {
          //   title: "今日带货结算佣金",
          //   key: "cargoSettlementCommission",
          //   minWidth: 160,
          //   align: "center",
          // },
          {
            title: "今日设计卡退卡量",
            key: "refundCard",
            minWidth: 150,
            align: "center",
          },
          // {
          //   title: "今日GMV",
          //   key: "gmv",
          //   minWidth: 100,
          //   align: "center",
          // },
          {
            title: "今日带货GMV",
            key: "eliminateCardGMV",
            minWidth: 180,
            align: "center",
          },
          {
            title: "今日退款GMV",
            key: "refundGMV",
            minWidth: 180,
            align: "center",
          },
          {
            title: "操作",
            key: "",
            width: 100,
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
                          type:6
                        }
                        api.byIdLiveAnchorDailyTarget(data).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              liveanchorMonthlyTargetId,
                              livingRoomFlowInvestmentNum,
                              consultation,
                              // consultation2,
                              // cargoSettlementCommission,
                              livingTrackingEmployeeId,
                              recordDate,
                              // gmv,
                              eliminateCardGMV,
                              refundCard,
                              refundGMV,
                              // tikTokPlusNum,
                              qianChuanNum,
                              shuiXinTuiNum,
                              weiXinDou
                            } = res.data.liveAnchorDailyTargetInfo;
                            this.getLiveAnchorMonthlyTarget()
                            this.isEdit = true;
                            this.form.id = id;
                            this.controlModal = true;
                            this.form.liveanchorMonthlyTargetId = liveanchorMonthlyTargetId;
                            this.form.livingRoomFlowInvestmentNum = livingRoomFlowInvestmentNum;
                            this.form.consultation = consultation;
                            // this.form.consultation2 = consultation2;
                            // this.form.cargoSettlementCommission = cargoSettlementCommission;
                            // this.form.gmv = gmv;
                            this.form.eliminateCardGMV = eliminateCardGMV;
                            this.form.refundGMV = refundGMV;
                            this.form.refundCard = refundCard;
                            // this.form.tikTokPlusNum = tikTokPlusNum;
                            this.form.qianChuanNum = qianChuanNum;
                            this.form.shuiXinTuiNum = shuiXinTuiNum;
                            this.form.weiXinDou = weiXinDou;
                            this.form.livingTrackingEmployeeId = livingTrackingEmployeeId ? livingTrackingEmployeeId : null;
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
      // 直播中
      employeeList: [],
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
        // 填报日期
        recordDate: "",
        //年度
        year: this.$moment(new Date()).format("yyyy"),
        // 月度
        month: Number(this.$moment(new Date()).format("MM")),
        // 抖+投流费用
        tikTokPlusNum: 0,
        // 千川投流
        qianChuanNum: null,
        // 随心推
        shuiXinTuiNum: null,
        // 微信豆
        weiXinDou: null,
        // 今日直播间投流费用量
        livingRoomFlowInvestmentNum: null,
        // 今日照片面诊卡数量
        consultation: null,
        // 今日视频面诊卡数量
        consultation2: 0,
        // 今日带货结算佣金
        cargoSettlementCommission: 0,
        // 直播中人员
        livingTrackingEmployeeId: null,
        // 今日设计卡退卡量
        refundCard:null,
        // 今日GMV
        gmv:0,
        // 今日去卡GMV
        eliminateCardGMV:null,
        // 今日退款GMV
        refundGMV:null
      },

      ruleValidate: {
        livingTrackingEmployeeId: [
          {
            required: true,
            message: "请选择直播中人员",
          },
        ],
        liveanchorMonthlyTargetId: [
          {
            required: true,
            message: "请选择月目标名称",
          },
        ],
        operationEmployeeId: [
          {
            required: true,
            message: "请选择运营人员",
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
        livingRoomFlowInvestmentNum: [
          {
            required: true,
            message: "请输入今日直播间投流费用",
          },
        ],
      },
    };
  },
  methods: {
    livingRoomFlowInvestmentNum(){
      const {tikTokPlusNum,qianChuanNum,shuiXinTuiNum,weiXinDou} = this.form
      this.form.livingRoomFlowInvestmentNum = tikTokPlusNum + qianChuanNum + shuiXinTuiNum + weiXinDou 

    },
    // 自动填写
    autoFill(){
      const {recordDate,liveanchorMonthlyTargetId} = this.form
      if(!liveanchorMonthlyTargetId){
        this.$Message.warning('请选择月目标！')
        return
      }
      if(!recordDate){
        this.$Message.warning('请选择填报日期！')
        return
      }
      const data ={
        recordDate:this.$moment(new Date(recordDate)).format("YYYY-MM-DD"),
        monthTargetId:liveanchorMonthlyTargetId
      }
      api.autoCompleteGMVData(data).then(res=>{
        if(res.code === 0){
          const {todayGMV,eliminateCardGMV,refundGMV} = res.data.data
          this.form.gmv = todayGMV
          this.form.eliminateCardGMV = eliminateCardGMV
          this.form.refundGMV = refundGMV
        }
      })
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
      api.getLiveAnchorMonthlyTargetLivingName(data).then((res) => {
        if (res.code === 0) {
          const { liveAnchorMonthlyTargetLiving } = res.data;
          if(liveAnchorMonthlyTargetLiving.length == 0 || !liveAnchorMonthlyTargetLiving){
            this.$Message.warning({
              content: "主播IP月目标暂未生成，无法填写数据，请联系管理员进行月目标数据完善！",
              duration: 3,
            });
            return
          }
          this.liveAnchorMonthlyTarget = liveAnchorMonthlyTargetLiving;
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
      };
      if (!startDate || !endDate) {
        this.$Message.error("请选择日期");
        return;
      } else {
        api.livingListWithPage(data).then((res) => {
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
      };
      api.livingListWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.liveAnchorDailyTargetInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
    // 根据职位获取直播中人员
    employeeManage() {
      const data = {
        positionId: 9,
      };
      employeeManageApi.getEmployeeByPositionId(data).then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employeeList = employee;
        }
      });
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            // 修改
            const {
              id,
              liveanchorMonthlyTargetId,
              recordDate,
              livingRoomFlowInvestmentNum,
              consultation,
              consultation2,
              livingTrackingEmployeeId,
              cargoSettlementCommission,
              gmv,
              eliminateCardGMV,
              refundCard,
              refundGMV,
              tikTokPlusNum,
              qianChuanNum,
              shuiXinTuiNum,
              weiXinDou
            } = this.form;
            const data = {
              id,
              liveanchorMonthlyTargetId,
              recordDate: this.$moment(new Date(recordDate)).format(
                "YYYY-MM-DD"
              ),
              livingRoomFlowInvestmentNum: livingRoomFlowInvestmentNum
                ? livingRoomFlowInvestmentNum
                : 0,
              consultation: consultation ? consultation : 0,
              consultation2: consultation2 ? consultation2 : 0,
              cargoSettlementCommission: cargoSettlementCommission
                ? cargoSettlementCommission
                : 0,
              livingTrackingEmployeeId: livingTrackingEmployeeId
                ? livingTrackingEmployeeId
                : 0,
                gmv,
              eliminateCardGMV,
              refundCard,
              refundGMV,
              tikTokPlusNum,
              qianChuanNum,
              shuiXinTuiNum,
              weiXinDou
            };
            this.isflag = true
            api.livingUpdate(data).then((res) => {
              if (res.code === 0) {
                this.isflag = false
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
              recordDate,
              livingRoomFlowInvestmentNum,
              consultation,
              consultation2,
              cargoSettlementCommission,
              livingTrackingEmployeeId,
              gmv,
              eliminateCardGMV,
              refundCard,
              refundGMV,
              tikTokPlusNum,
              qianChuanNum,
              shuiXinTuiNum,
              weiXinDou
            } = this.form;
            const data = {
              liveanchorMonthlyTargetId,
              recordDate: this.$moment(new Date(recordDate)).format(
                "YYYY-MM-DD"
              ),
              livingRoomFlowInvestmentNum: livingRoomFlowInvestmentNum
                ? livingRoomFlowInvestmentNum
                : 0,
              consultation: consultation ? consultation : 0,
              consultation2: consultation2 ? consultation2 : 0,
              cargoSettlementCommission: cargoSettlementCommission
                ? cargoSettlementCommission
                : 0,
              livingTrackingEmployeeId,
              gmv,
              eliminateCardGMV,
              refundCard,
              refundGMV,
              tikTokPlusNum,
              qianChuanNum,
              shuiXinTuiNum,
              weiXinDou
            };
            this.isflag = true
            // 添加
            api.livingAdd(data).then((res) => {
              if (res.code === 0) {
                this.isflag = false
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
    this.employeeManage();
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
</style>
