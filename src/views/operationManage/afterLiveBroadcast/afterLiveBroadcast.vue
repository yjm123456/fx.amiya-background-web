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
          <Button type="primary" @click="controlModal = true">添加</Button>
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
                @on-change ="liveanchorMonthlyTargetIdChange(form.liveanchorMonthlyTargetId)"
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
            <FormItem
              label="网咨人员"
              prop="netWorkConsultingEmployeeId"
              :rules="[
                {
                  required: true,
                  message: '请选择网咨人员',
                },
              ]"
            >
              <Select
                v-model="form.netWorkConsultingEmployeeId"
                placeholder="请选择网咨人员"
                filterable
              >
                <Option
                  v-for="item in netWorkConsultingNameList"
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
            <FormItem
              label="今日照片消耗卡数量"
              prop="consultationCardConsumed"
              :rules="[
                {
                  required: true,
                  message: '请输入今日照片消耗卡数量',
                },
              ]"
              key="今日照片消耗卡数量"
            >
              <Input
                v-model="form.consultationCardConsumed"
                placeholder="请输入今日照片消耗卡数量"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="今日视频消耗卡数量"
              prop="consultationCardConsumed2"
              :rules="[
                {
                  required: true,
                  message: '请输入今日视频消耗卡数量',
                },
              ]"
              key="今日视频消耗卡数量"
            >
              <Input
                v-model="form.consultationCardConsumed2"
                placeholder="请输入今日视频消耗卡数量"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="今日激活历史面诊数量"
              prop="activateHistoricalConsultation"
              :rules="[
                {
                  required: true,
                  message: '请输入今日激活历史面诊数量',
                },
              ]"
              key="今日激活历史面诊数量"
            >
              <Input
                v-model="form.activateHistoricalConsultation"
                placeholder="请输入今日激活历史面诊数量"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="今日加V量" prop="addWechatNum">
              <Input
                v-model="form.addWechatNum"
                placeholder="请输入今日加V量"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="今日派单量"
              prop="sendOrderNum"
              :rules="[
                {
                  required: true,
                  message: '请输入今日派单量',
                },
              ]"
            >
              <Input
                v-model="form.sendOrderNum"
                placeholder="请输入今日派单量"
                type="number"
                number
              />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="8">
            <FormItem
              label="新诊上门量"
              prop="newVisitNum"
              :rules="[
                {
                  required: true,
                  message: '请输入新诊上门量',
                },
              ]"
            >
              <Input
                v-model="form.newVisitNum"
                placeholder="请输入新诊上门量"
                type="number"
                number
                @on-change="newVisitChange"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="新诊成交量"
              prop="newDealNum"
              :rules="[
                {
                  required: true,
                  message: '请输入新诊成交量',
                },
              ]"
            >
              <Input
                v-model="form.newDealNum"
                placeholder="请输入新诊成交量"
                type="number"
                number
                @on-change="newDealNumChange"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="新诊业绩"
              prop="newPerformanceNum"
              :rules="[
                {
                  required: true,
                  message: '请输入新诊业绩',
                },
              ]"
            >
              <Input
                v-model="form.newPerformanceNum"
                placeholder="请输入新诊业绩"
                type="number"
                number
                @on-change="newPerformanceNumChange"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="复诊上门量"
              prop="subsequentVisitNum"
              :rules="[
                {
                  required: true,
                  message: '请输入复诊上门量',
                },
              ]"
            >
              <Input
                v-model="form.subsequentVisitNum"
                placeholder="请输入复诊上门量"
                type="number"
                number
                @on-change="followUpVisitChange"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="复诊成交量"
              prop="subsequentDealNum"
              :rules="[
                {
                  required: true,
                  message: '请输入复诊成交量',
                },
              ]"
            >
              <Input
                v-model="form.subsequentDealNum"
                placeholder="请输入复诊成交量"
                type="number"
                number
                @on-change="subsequentDealNumChange"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="复诊业绩"
              prop="subsequentPerformanceNum"
              :rules="[
                {
                  required: true,
                  message: '请输入复诊业绩',
                },
              ]"
            >
              <Input
                v-model="form.subsequentPerformanceNum"
                placeholder="请输入复诊业绩"
                type="number"
                number
                @on-change="subsequentPerformanceNumChange"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客上门量"
              prop="oldCustomerVisitNum"
              :rules="[
                {
                  required: true,
                  message: '请输入老客上门量',
                },
              ]"
            >
              <Input
                v-model="form.oldCustomerVisitNum"
                placeholder="请输入老客上门量"
                type="number"
                number
                @on-change="oldVisitChange"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客成交量"
              prop="oldCustomerDealNum"
              :rules="[
                {
                  required: true,
                  message: '请输入老客成交量',
                },
              ]"
            >
              <Input
                v-model="form.oldCustomerDealNum"
                placeholder="请输入老客成交量"
                type="number"
                number
                @on-change="oldCustomerNumChange"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客业绩"
              prop="oldCustomerPerformanceNum"
              :rules="[
                {
                  required: true,
                  message: '请输入老客业绩',
                },
              ]"
            >
              <Input
                v-model="form.oldCustomerPerformanceNum"
                placeholder="请输入老客业绩"
                type="number"
                number
                @on-change="oldCustomerPerformanceNumChange"
              />
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem
              label="今日总上门量"
              prop="visitNum"
              :rules="[
                {
                  required: true,
                  message: '请输入今日总上门量',
                },
              ]"
            >
              <Input
                v-model="form.visitNum"
                placeholder="请输入今日总上门量"
                type="number"
                number
                disabled
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="今日总成交量"
              prop="dealNum"
              :rules="[
                {
                  required: true,
                  message: '请输入今日总成交量',
                },
              ]"
            >
              <Input
                v-model="form.dealNum"
                placeholder="请输入今日总成交量"
                type="number"
                number
                disabled
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="总新客业绩"
              prop="newCustomerPerformanceCountNum"
              :rules="[
                {
                  required: true,
                  message: '请输入总新客业绩',
                },
              ]"
            >
              <Input
                v-model="form.newCustomerPerformanceCountNum"
                placeholder="请输入总新客业绩"
                type="number"
                number
                disabled
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="今日小黄车退款量"
              prop="minivanRefund"
              :rules="[
                {
                  required: true,
                  message: '请输入今日小黄车退款量',
                },
              ]"
            >
              <Input
                v-model="form.minivanRefund"
                placeholder="请输入今日小黄车退款量"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="今日小黄车差评量"
              prop="miniVanBadReviews"
              :rules="[
                {
                  required: true,
                  message: '请输入今日小黄车差评量',
                },
              ]"
            >
              <Input
                v-model="form.miniVanBadReviews"
                placeholder="请输入今日小黄车差评量"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="今日总业绩"
              prop="performanceNum"
              :rules="[
                {
                  required: true,
                  message: '请输入今日总业绩',
                },
              ]"
            >
              <Input
                v-model="form.performanceNum"
                placeholder="请输入今日总业绩"
                type="number"
                number
                disabled
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="autoFillSubmit">自动填写</Button>
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/operationManage";
import * as employeeManageApi from "@/api/employeeManage";
import * as orderApi from "@/api/orderManage";
import * as contentPlatForm from "@/api/baseDataMaintenance";
export default {
  data() {
    return {
      employeeList: [],
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
            title: "网咨人员",
            key: "netWorkConsultingEmployeeName",
            minWidth: 100,
            align: "center",
          },
          {
            title: "更新时间",
            key: "afterLivingUpdateDate",
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.afterLivingUpdateDate ? this.$moment(params.row.afterLivingUpdateDate).format("YYYY-MM-DD HH:mm:ss") : ''
              );
            },
          },
          {
            title: "今日加V量",
            key: "addWechatNum",
            minWidth: 110,
            align: "center",
          },
          {
            title: "今日照片消耗卡数量",
            key: "consultationCardConsumed",
            minWidth: 170,
            align: "center",
          },
          {
            title: "今日视频消耗卡数量",
            key: "consultationCardConsumed2",
            minWidth: 180,
            align: "center",
          },
          {
            title: "今日激活历史面诊数量",
            key: "activateHistoricalConsultation",
            minWidth: 180,
            align: "center",
          },
          {
            title: "今日派单量",
            key: "sendOrderNum",
            minWidth: 110,
            align: "center",
          },
          {
            title: "今日新诊上门量",
            key: "newVisitNum",
            minWidth: 150,
            align: "center",
          },
          {
            title: "今日复诊上门量",
            key: "subsequentVisitNum",
            minWidth: 150,
            align: "center",
          },
          {
            title: "今日老客上门量",
            key: "oldCustomerVisitNum",
            minWidth: 150,
            align: "center",
          },
          {
            title: "今日总上门量",
            key: "visitNum",
            minWidth: 130,
            align: "center",
          },
          {
            title: "今日新诊成交量",
            key: "newDealNum",
            minWidth: 150,
            align: "center",
          },
          {
            title: "今日复诊成交量",
            key: "subsequentDealNum",
            minWidth: 150,
            align: "center",
          },
          {
            title: "今日老客成交量",
            key: "oldCustomerDealNum",
            minWidth: 150,
            align: "center",
          },
          {
            title: "今日总成交量",
            key: "dealNum",
            minWidth: 130,
            align: "center",
          },
          {
            title: "今日新诊业绩",
            key: "newPerformanceNum",
            minWidth: 130,
            align: "center",
          },
          {
            title: "今日复诊业绩",
            key: "subsequentPerformanceNum",
            minWidth: 130,
            align: "center",
          },
          {
            title: "今日老客业绩",
            key: "oldCustomerPerformanceNum",
            minWidth: 130,
            align: "center",
          },
          {
            title: "今日总新客业绩",
            key: "newCustomerPerformanceCountNum",
            minWidth: 140,
            align: "center",
          },
          {
            title: "今日总业绩",
            key: "performanceNum",
            minWidth: 120,
            align: "center",
          },
          {
            title: "今日小黄车退款量",
            key: "minivanRefund",
            minWidth: 150,
            align: "center",
          },
          {
            title: "今日小黄车差评量",
            key: "miniVanBadReviews",
            minWidth: 150,
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
                              netWorkConsultingEmployeeId,
                              addWechatNum,
                              sendOrderNum,
                              visitNum,
                              dealNum,
                              performanceNum,
                              recordDate,
                              newVisitNum,
                              subsequentVisitNum,
                              oldCustomerVisitNum,
                              newDealNum,
                              subsequentDealNum,
                              newPerformanceNum,
                              subsequentPerformanceNum,
                              oldCustomerPerformanceNum,
                              newCustomerPerformanceCountNum,
                              oldCustomerDealNum,
                              miniVanBadReviews,
                              minivanRefund,
                              consultationCardConsumed,
                              consultationCardConsumed2,
                              activateHistoricalConsultation,
                            } = res.data.liveAnchorDailyTargetInfo;
                            this.isEdit = true;
                            this.form.id = id;
                            this.controlModal = true;
                            this.form.liveanchorMonthlyTargetId = liveanchorMonthlyTargetId;
                            this.form.netWorkConsultingEmployeeId = netWorkConsultingEmployeeId== 0 ? null : netWorkConsultingEmployeeId;
                            this.form.addWechatNum = addWechatNum;
                            this.form.sendOrderNum = sendOrderNum;
                            this.form.visitNum = visitNum;
                            this.form.dealNum = dealNum;
                            this.form.performanceNum = performanceNum;
                            this.form.newVisitNum = newVisitNum;
                            this.form.subsequentVisitNum = subsequentVisitNum;
                            this.form.oldCustomerVisitNum = oldCustomerVisitNum;
                            this.form.newDealNum = newDealNum;
                            this.form.subsequentDealNum = subsequentDealNum;
                            this.form.newPerformanceNum = newPerformanceNum;
                            this.form.subsequentPerformanceNum = subsequentPerformanceNum;
                            this.form.oldCustomerPerformanceNum = oldCustomerPerformanceNum;
                            this.form.newCustomerPerformanceCountNum = newCustomerPerformanceCountNum;
                            this.form.oldCustomerDealNum = oldCustomerDealNum;
                            this.form.miniVanBadReviews = miniVanBadReviews;
                            this.form.minivanRefund = minivanRefund;
                            this.form.consultationCardConsumed = consultationCardConsumed;
                            this.form.consultationCardConsumed2 = consultationCardConsumed2;
                            this.form.activateHistoricalConsultation = activateHistoricalConsultation;
                            this.form.recordDate = this.$moment(
                              new Date(recordDate)
                            ).format("YYYY-MM-DD");
                            this.liveanchorMonthlyTargetIdChange(this.form.liveanchorMonthlyTargetId)

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
        // 网咨人员Id
        netWorkConsultingEmployeeId: "",
        // 今日加V量
        addWechatNum: null,
        // 今日派单量
        sendOrderNum: "",
        // 今日上门人数
        visitNum: "",
        // 今日成交人数
        dealNum: "",
        // 今日业绩
        performanceNum: "",
        // 填报日期
        recordDate: "",
        //年度
        year: this.$moment(new Date()).format("yyyy"),
        // 月度
        month: Number(this.$moment(new Date()).format("MM")),
        // 新诊上门量
        newVisitNum: null,
        // 复诊上门
        subsequentVisitNum: null,
        // 老客上门
        oldCustomerVisitNum: null,
        // 今日新客成交人数
        newDealNum: null,
        // 今日复诊成交人数
        subsequentDealNum: null,
        // 今日新诊业绩
        newPerformanceNum: null,
        // 今日复诊业绩
        subsequentPerformanceNum: null,
        // 今日老客业绩
        oldCustomerPerformanceNum: null,
        // 老客成交
        oldCustomerDealNum: null,
        // 总新客业绩
        newCustomerPerformanceCountNum: null,
        // 今日小黄车差评量
        miniVanBadReviews: null,
        // 今日小黄车退款量
        minivanRefund: null,
        // 今日照片消耗卡数量
        consultationCardConsumed: null,
        // 今日视频消耗卡数量
        consultationCardConsumed2: null,
        // 今日激活历史面诊数量
        activateHistoricalConsultation: null,
        // 主播IP(自动填写用的字段)
        liveAnchorId:null,
       
      },

      ruleValidate: {
        
        netWorkConsultingEmployeeId: [
          {
            required: true,
            message: "请选择网咨人员",
          },
        ],
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
        addWechatNum: [
          {
            required: true,
            message: "请输入今日加V量",
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
        cluesNum: [
          {
            required: true,
            message: "请输入今日线索量",
          },
        ],
        addFansNum: [
          {
            required: true,
            message: "请输入今日涨粉量",
          },
        ],
        livingRoomFlowInvestmentNum: [
          {
            required: true,
            message: "请输入今日直播间投流",
          },
        ],
      },
    };
  },
  methods: {
    // 根据月名称获取主播id
    liveanchorMonthlyTargetIdChange(value){
      if(value){
        api.byIdLiveAnchorMonthlyTargets(this.form.liveanchorMonthlyTargetId).then((res) => {
          if (res.code === 0) {
            this.form.liveAnchorId = res.data.liveAnchorMonthlyTargetInfo.liveAnchorId
          }
        })
      }
    },
    // 自动填写
    autoFillSubmit(){
      const {liveanchorMonthlyTargetId , netWorkConsultingEmployeeId , recordDate,liveAnchorId} = this.form
      if(!liveanchorMonthlyTargetId){
        this.$Message.warning('请选择月目标名称')
        return
      } 
      if(!netWorkConsultingEmployeeId){
        this.$Message.warning('请选择网咨人员')
        return
      } 
      if(!recordDate){
        this.$Message.warning('请选择填报日期')
        return
      } 
      const data = {
        liveAnchorId:liveAnchorId,
        recordDate:this.$moment(new Date(recordDate)).format("YYYY-MM-DD")
      }
      api.getLiveAnchorPerformance(data).then((res) => {
       
        this.form.addWechatNum = res.addWechatNum
        this.form.sendOrderNum = res.sendOrderNum
        this.form.visitNum = res.visitNum
        this.form.dealNum = res.dealNum
        this.form.performanceNum = res.performanceNum
        this.form.newVisitNum = res.newVisitNum
        this.form.subsequentVisitNum = res.subsequentVisitNum
        this.form.oldCustomerVisitNum = res.oldCustomerVisitNum
        this.form.newDealNum = res.newDealNum
        this.form.subsequentDealNum = res.subsequentDealNum
        this.form.newPerformanceNum = res.newPerformanceNum
        this.form.subsequentPerformanceNum = res.subsequentPerformanceNum
        this.form.oldCustomerPerformanceNum = res.oldCustomerPerformanceNum
        this.form.newCustomerPerformanceCountNum = res.newCustomerPerformanceCountNum
        this.form.oldCustomerDealNum = res.oldCustomerDealNum
        this.form.miniVanBadReviews = res.miniVanBadReviews
        this.form.minivanRefund = res.minivanRefund
        this.form.consultationCardConsumed = res.consultationCardConsumed
        this.form.consultationCardConsumed2 = res.consultationCardConsumed2
        this.form.activateHistoricalConsultation = res.activateHistoricalConsultation
      })

    },
    // 老客成交
    oldCustomerNumChange() {
      this.form.dealNum =
        this.form.newDealNum +
        this.form.subsequentDealNum +
        this.form.oldCustomerDealNum;
    },
    // 新诊上门
    newVisitChange() {
      this.form.visitNum =
        this.form.newVisitNum +
        this.form.oldCustomerVisitNum +
        this.form.subsequentVisitNum;
    },
    // 老客上门
    oldVisitChange() {
      this.form.visitNum =
        this.form.newVisitNum +
        this.form.oldCustomerVisitNum +
        this.form.subsequentVisitNum;
    },
    // 复诊上门
    followUpVisitChange() {
      this.form.visitNum =
        this.form.newVisitNum +
        this.form.oldCustomerVisitNum +
        this.form.subsequentVisitNum;
    },
    // 新诊成交量
    newDealNumChange() {
      this.form.dealNum =
        this.form.newDealNum +
        this.form.subsequentDealNum +
        this.form.oldCustomerDealNum;
    },
    // 复诊成交
    subsequentDealNumChange() {
      this.form.dealNum =
        this.form.newDealNum +
        this.form.subsequentDealNum +
        this.form.oldCustomerDealNum;
    },
    // 新诊业绩
    newPerformanceNumChange() {
      this.form.performanceNum =
        this.form.newPerformanceNum +
        this.form.subsequentPerformanceNum +
        this.form.oldCustomerPerformanceNum;
      this.form.newCustomerPerformanceCountNum =
        this.form.newPerformanceNum + this.form.subsequentPerformanceNum;
    },
    // 复诊业绩
    subsequentPerformanceNumChange() {
      this.form.performanceNum =
        this.form.newPerformanceNum +
        this.form.subsequentPerformanceNum +
        this.form.oldCustomerPerformanceNum;
      this.form.newCustomerPerformanceCountNum =
        this.form.newPerformanceNum + this.form.subsequentPerformanceNum;
    },
    // 老客业绩
    oldCustomerPerformanceNumChange() {
      this.form.performanceNum =
        this.form.newPerformanceNum +
        this.form.subsequentPerformanceNum +
        this.form.oldCustomerPerformanceNum;
    },
    yearChange() {
      this.getLiveAnchorMonthlyTarget();
    },
    monthChange() {
      this.getLiveAnchorMonthlyTarget();
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
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            // 修改
            const {
              id,
              liveanchorMonthlyTargetId,
              netWorkConsultingEmployeeId,
              addWechatNum,
              sendOrderNum,
              visitNum,
              dealNum,
              performanceNum,
              recordDate,
              newVisitNum,
              subsequentVisitNum,
              oldCustomerVisitNum,
              newDealNum,
              subsequentDealNum,
              newPerformanceNum,
              subsequentPerformanceNum,
              oldCustomerPerformanceNum,
              newCustomerPerformanceCountNum,
              oldCustomerDealNum,
              miniVanBadReviews,
              minivanRefund,
              consultationCardConsumed,
              consultationCardConsumed2,
              activateHistoricalConsultation,
            } = this.form;
            const data = {
              id,
              liveanchorMonthlyTargetId,
              netWorkConsultingEmployeeId: netWorkConsultingEmployeeId
                ? netWorkConsultingEmployeeId
                : 0,
              addWechatNum: addWechatNum ? addWechatNum : 0,
              sendOrderNum: sendOrderNum ? sendOrderNum : 0,
              visitNum: visitNum ? visitNum : 0,
              dealNum: dealNum ? dealNum : 0,
              performanceNum: performanceNum ? performanceNum : 0,
              recordDate: this.$moment(new Date(recordDate)).format(
                "YYYY-MM-DD"
              ),
              newVisitNum: newVisitNum ? newVisitNum : 0,
              subsequentVisitNum: subsequentVisitNum ? subsequentVisitNum : 0,
              oldCustomerVisitNum: oldCustomerVisitNum
                ? oldCustomerVisitNum
                : 0,
              newDealNum: newDealNum ? newDealNum : 0,
              subsequentDealNum: subsequentDealNum ? subsequentDealNum : 0,
              newPerformanceNum: newPerformanceNum ? newPerformanceNum : 0,
              subsequentPerformanceNum: subsequentPerformanceNum
                ? subsequentPerformanceNum
                : 0,
              oldCustomerPerformanceNum: oldCustomerPerformanceNum
                ? oldCustomerPerformanceNum
                : 0,
              newCustomerPerformanceCountNum: newCustomerPerformanceCountNum
                ? newCustomerPerformanceCountNum
                : 0,
              oldCustomerDealNum: oldCustomerDealNum ? oldCustomerDealNum : 0,
              miniVanBadReviews: miniVanBadReviews ? miniVanBadReviews : 0,
              minivanRefund: minivanRefund ? minivanRefund : 0,
              consultationCardConsumed: consultationCardConsumed
                ? consultationCardConsumed
                : 0,
              consultationCardConsumed2: consultationCardConsumed2
                ? consultationCardConsumed2
                : 0,
              activateHistoricalConsultation: activateHistoricalConsultation
                ? activateHistoricalConsultation
                : 0,
            };
            api.afterLivingUpdate(data).then((res) => {
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
              netWorkConsultingEmployeeId,
              addWechatNum,
              sendOrderNum,
              visitNum,
              dealNum,
              performanceNum,
              recordDate,
              newVisitNum,
              subsequentVisitNum,
              oldCustomerVisitNum,
              newDealNum,
              subsequentDealNum,
              newPerformanceNum,
              subsequentPerformanceNum,
              oldCustomerPerformanceNum,
              newCustomerPerformanceCountNum,
              oldCustomerDealNum,
              miniVanBadReviews,
              minivanRefund,
              consultationCardConsumed,
              consultationCardConsumed2,
              activateHistoricalConsultation,
            } = this.form;
            const data = {
              liveanchorMonthlyTargetId,
              netWorkConsultingEmployeeId,
              addWechatNum: addWechatNum ? addWechatNum : 0,
              sendOrderNum: sendOrderNum ? sendOrderNum : 0,
              visitNum: visitNum ? visitNum : 0,
              dealNum: dealNum ? dealNum : 0,
              performanceNum: performanceNum ? performanceNum : 0,
              recordDate: this.$moment(new Date(recordDate)).format(
                "YYYY-MM-DD"
              ),
              newVisitNum: newVisitNum ? newVisitNum : 0,
              subsequentVisitNum: subsequentVisitNum ? subsequentVisitNum : 0,
              oldCustomerVisitNum: oldCustomerVisitNum
                ? oldCustomerVisitNum
                : 0,
              newDealNum: newDealNum ? newDealNum : 0,
              subsequentDealNum: subsequentDealNum ? subsequentDealNum : 0,
              newPerformanceNum: newPerformanceNum ? newPerformanceNum : 0,
              subsequentPerformanceNum: subsequentPerformanceNum
                ? subsequentPerformanceNum
                : 0,
              oldCustomerPerformanceNum: oldCustomerPerformanceNum
                ? oldCustomerPerformanceNum
                : 0,
              newCustomerPerformanceCountNum: newCustomerPerformanceCountNum
                ? newCustomerPerformanceCountNum
                : 0,
              oldCustomerDealNum: oldCustomerDealNum ? oldCustomerDealNum : 0,
              miniVanBadReviews: miniVanBadReviews ? miniVanBadReviews : 0,
              minivanRefund: minivanRefund ? minivanRefund : 0,
              consultationCardConsumed: consultationCardConsumed
                ? consultationCardConsumed
                : 0,
              consultationCardConsumed2: consultationCardConsumed2
                ? consultationCardConsumed2
                : 0,
              activateHistoricalConsultation: activateHistoricalConsultation
                ? activateHistoricalConsultation
                : 0,
            };
            // 添加
            api.afterLivingAdd(data).then((res) => {
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
    this.getLiveAnchorMonthlyTarget();
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
</style>
