<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <DatePicker
            type="year"
            placeholder="请选择年"
            style="width: 200px"
            v-model="query.year"
          ></DatePicker>
          <Select
            v-model="query.month"
            style="width: 180px; margin-left: 10px"
            placeholder="请选择月份"
            filterable
          >
            <Option
              v-for="item in monthList"
              :value="item.month"
              :key="item.month"
              >{{ item.name }}
            </Option>
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
            @click="getLiveAnchorMonthlyTargetInfo(1)"
            >查询</Button
          >
        </div>
        <div class="right">
          <Button
            type="primary"
            @click="
              controlModal = true;
              title = '添加';
            "
            v-if="positionId != 19 && positionId != 9 && positionId != 2"
            >添加</Button
          >
        </div>
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table
          border
          :columns="
            positionId == 19
              ? query.columns1
              : positionId == 9
              ? query.columns2
              : positionId == 2
              ? query.columns3
              : query.columns
          "
          :data="query.data"
        ></Table>
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
        :label-width="170"
      >
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="主播平台" prop="contentPlatFormId">
              <Select
                v-model="form.contentPlatFormId"
                placeholder="请选择主播平台"
                @on-change="contentPlateChange(form.contentPlatFormId)"
                filterable
              >
                <Option
                  v-for="item in contentPalteForms"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.contentPlatformName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="主播IP账号" prop="liveAnchorId">
              <Select
                v-model="form.liveAnchorId"
                placeholder="请选择主播IP账号"
                :disabled="form.contentPlatFormId === ''"
                filterable
              >
                <Option
                  v-for="item in liveAnchors"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.hostAccountName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="年份选择" prop="year">
              <DatePicker
                type="year"
                placeholder="请选择年"
                v-model="form.year"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="月份选择" prop="year">
              <Select
                v-model="form.month"
                placeholder="请选择生日月份"
                filterable
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
            <FormItem label="经营目标名称" prop="monthlyTargetName">
              <Input
                v-model="form.monthlyTargetName"
                placeholder="例: x月xxx平台经营目标"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="月发布目标"
              prop="releaseTarget"
              :rules="[
                {
                  required: true,
                  message: '请输入月度目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="月发布目标"
            >
              <Input
                v-model="form.releaseTarget"
                placeholder="请输入月发布目标"
                type="number"
                number
              />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="8">
            <FormItem
              label="视频号投流目标"
              prop="flowInvestmentTarget"
              :rules="[
                {
                  required: true,
                  message: '视频号投流目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="视频号投流目标"
            >
              <Input
                v-model="form.flowInvestmentTarget"
                placeholder="请输入视频号投流目标"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="直播间投流目标"
              prop="livingRoomFlowInvestmentTarget"
              :rules="[
                {
                  required: true,
                  message: '直播间投流目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="直播间投流目标"
            >
              <Input
                v-model="form.livingRoomFlowInvestmentTarget"
                placeholder="请输入直播间投流目标"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="线索目标"
              prop="cluesTarget"
              :rules="[
                {
                  required: true,
                  message: '请输入线索目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="线索目标"
            >
              <Input
                v-model="form.cluesTarget"
                placeholder="请输入线索目标"
                type="number"
                number
              />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="8">
            <FormItem
              label="涨粉目标"
              prop="addFansTarget"
              :rules="[
                {
                  required: true,
                  message: '请输入涨粉目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="涨粉目标"
            >
              <Input
                v-model="form.addFansTarget"
                placeholder="请输入涨粉量"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="目标加V量"
              prop="addWechatTarget"
              :rules="[
                {
                  required: true,
                  message: '请输入目标加V量(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="目标加V量"
            >
              <Input
                v-model="form.addWechatTarget"
                placeholder="请输入目标加V量"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="99面诊卡下单数量目标"
              prop="consultationTarget"
              :rules="[
                {
                  required: true,
                  message: '99面诊卡下单数量目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="99面诊卡下单数量目标"
            >
              <Input
                v-model="form.consultationTarget"
                placeholder="99面诊卡下单数量目标"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="199面诊卡下单数量目标"
              prop="consultationTarget2"
              :rules="[
                {
                  required: true,
                  message: '199面诊卡下单数量目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="199面诊卡下单数量目标"
            >
              <Input
                v-model="form.consultationTarget2"
                placeholder="199面诊卡下单数量目标"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="99消耗卡目标"
              prop="consultationCardConsumedTarget"
              :rules="[
                {
                  required: true,
                  message: '99消耗卡目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="99消耗卡目标"
            >
              <Input
                v-model="form.consultationCardConsumedTarget"
                placeholder="请输入99消耗卡目标"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="199消耗卡目标"
              prop="consultationCardConsumedTarget2"
              :rules="[
                {
                  required: true,
                  message: '199消耗卡目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="199消耗卡目标"
            >
              <Input
                v-model="form.consultationCardConsumedTarget2"
                placeholder="请输入199消耗卡目标"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="激活历史面诊数量目标"
              prop="activateHistoricalConsultationTarget"
              :rules="[
                {
                  required: true,
                  message: '激活历史面诊数量目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="激活历史面诊数量目标"
            >
              <Input
                v-model="form.activateHistoricalConsultationTarget"
                placeholder="请输入激活历史面诊数量目标"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="派单目标"
              prop="sendOrderTarget"
              :rules="[
                {
                  required: true,
                  message: '请输入派单目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="派单目标"
            >
              <Input
                v-model="form.sendOrderTarget"
                placeholder="请输入派单目标"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="上门目标"
              prop="visitTarget"
              :rules="[
                {
                  required: true,
                  message: '请输入上门目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="上门目标"
            >
              <Input
                v-model="form.visitTarget"
                placeholder="请输入上门目标"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="成交人数目标"
              prop="dealTarget"
              :rules="[
                {
                  required: true,
                  message: '请输入成交人数(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="成交人数目标"
            >
              <Input
                v-model="form.dealTarget"
                placeholder="请输入成交人数目标"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="带货结算佣金目标"
              prop="cargoSettlementCommissionTarget"
              :rules="[
                {
                  required: true,
                  message: '带货结算佣金(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="带货结算佣金目标"
            >
              <Input
                v-model="form.cargoSettlementCommissionTarget"
                placeholder="请输入带货结算佣金目标"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="业绩目标"
              prop="performanceTarget"
              :rules="[
                {
                  required: true,
                  message: '请输入业绩目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="业绩目标"
            >
              <Input
                v-model="form.performanceTarget"
                placeholder="请输入业绩目标"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="小黄车退单量上限"
              prop="minivanRefundTarget"
              :rules="[
                {
                  required: true,
                  message: '请输入小黄车退单量上限(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="小黄车退单量上限"
            >
              <Input
                v-model="form.minivanRefundTarget"
                placeholder="请输入小黄车退单量上限"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="差评总量上限"
              prop="miniVanBadReviewsTarget"
              :rules="[
                {
                  required: true,
                  message: '请输入差评总量上限(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="差评总量上限"
            >
              <Input
                v-model="form.miniVanBadReviewsTarget"
                placeholder="请输入差评总量上限"
                type="number"
                number
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
      positionId: sessionStorage.getItem("positionId"),
      // 查询
      query: {
        contentPlatFormId: null,
        liveAnchorId: null,
        year: this.$moment(new Date()).format("yyyy"),
        month: Number(this.$moment(new Date()).format("MM")),
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        // 其他角色展示
        columns: [
          {
            title: "主播名称",
            key: "liveAnchorName",
            minWidth: 140,
            align: "center",
          },
          {
            title: "年份",
            key: "year",
            minWidth: 90,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.year + "年");
            },
          },
          {
            title: "月份",
            key: "month",
            minWidth: 80,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.month + "月");
            },
          },
          {
            title: "经营目标名称",
            key: "monthlyTargetName",
            minWidth: 190,
            align: "center",
          },
          {
            title: "月发布目标",
            key: "releaseTarget",
            minWidth: 110,
            align: "center",
          },
          {
            title: "月累计发布条数",
            key: "cumulativeRelease",
            minWidth: 140,
            align: "center",
          },
          {
            title: "发布目标完成率",
            key: "releaseCompleteRate",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.releaseCompleteRate + "%");
            },
          },
          {
            title: "视频号投流目标",
            key: "flowInvestmentTarget",
            minWidth: 140,
            align: "center",
          },
          {
            title: "月累计视频号投流数量",
            key: "cumulativeFlowInvestment",
            minWidth: 180,
            align: "center",
          },
          {
            title: "视频号投流完成率",
            key: "flowInvestmentCompleteRate",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.flowInvestmentCompleteRate + "%");
            },
          },
          {
            title: "直播间投流目标",
            key: "livingRoomFlowInvestmentTarget",
            minWidth: 140,
            align: "center",
          },
          {
            title: "月累计直播间投流数量",
            key: "livingRoomCumulativeFlowInvestment",
            minWidth: 180,
            align: "center",
          },
          {
            title: "直播间投流完成率",
            key: "livingRoomFlowInvestmentCompleteRate",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.livingRoomFlowInvestmentCompleteRate + "%"
              );
            },
          },
          {
            title: "目标线索量",
            key: "cluesTarget",
            minWidth: 110,
            align: "center",
          },
          {
            title: "月累计线索量",
            key: "cumulativeClues",
            minWidth: 130,
            align: "center",
          },
          {
            title: "线索完成率",
            key: "cluesCompleteRate",
            minWidth: 110,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.cluesCompleteRate + "%");
            },
          },
          {
            title: "涨粉目标",
            key: "addFansTarget",
            minWidth: 100,
            align: "center",
          },
          {
            title: "累计涨粉量",
            key: "cumulativeAddFans",
            minWidth: 110,
            align: "center",
          },
          {
            title: "涨粉完成率",
            key: "addFansCompleteRate",
            minWidth: 110,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.addFansCompleteRate + "%");
            },
          },
          {
            title: "目标加V量",
            key: "addWechatTarget",
            minWidth: 110,
            align: "center",
          },
          {
            title: "月加V累计",
            key: "cumulativeAddWechat",
            minWidth: 110,
            align: "center",
          },
          {
            title: "加V完成率",
            key: "addWechatCompleteRate",
            minWidth: 110,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.addWechatCompleteRate + "%");
            },
          },
          {
            title: "99面诊卡下单数量目标",
            key: "consultationTarget",
            minWidth: 180,
            align: "center",
          },
          {
            title: "累计99面诊卡下单数量",
            key: "cumulativeConsultation",
            minWidth: 180,
            align: "center",
          },
          {
            title: "99面诊卡下单数量完成率",
            key: "consultationCompleteRate",
            minWidth: 200,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.consultationCompleteRate + "%");
            },
          },
          {
            title: "199面诊卡下单数量目标",
            key: "consultationTarget2",
            minWidth: 200,
            align: "center",
          },
          {
            title: "累计199面诊卡下单数量",
            key: "cumulativeConsultation2",
            minWidth: 200,
            align: "center",
          },
          {
            title: "199面诊卡下单数量完成率",
            key: "consultationCompleteRate2",
            minWidth: 210,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.consultationCompleteRate2 + "%");
            },
          },
          {
            title: "99消耗卡目标",
            key: "consultationCardConsumedTarget",
            minWidth: 150,
            align: "center",
          },
          {
            title: "99累计消耗卡",
            key: "cumulativeConsultationCardConsumed",
            minWidth: 150,
            align: "center",
          },
          {
            title: "99消耗卡完成率",
            key: "consultationCardConsumedCompleteRate",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.consultationCardConsumedCompleteRate + "%"
              );
            },
          },
          {
            title: "199消耗卡目标",
            key: "consultationCardConsumedTarget2",
            minWidth: 150,
            align: "center",
          },
          {
            title: "199累计消耗卡",
            key: "cumulativeConsultationCardConsumed2",
            minWidth: 150,
            align: "center",
          },
          {
            title: "199消耗卡完成率",
            key: "consultationCardConsumedCompleteRate2",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.consultationCardConsumedCompleteRate2 + "%"
              );
            },
          },
          {
            title: "激活历史面诊数量目标",
            key: "activateHistoricalConsultationTarget",
            minWidth: 180,
            align: "center",
          },
          {
            title: "累计激活历史面诊数量",
            key: "cumulativeActivateHistoricalConsultation",
            minWidth: 180,
            align: "center",
          },
          {
            title: "激活历史面诊数量完成率",
            key: "activateHistoricalConsultationCompleteRate",
            minWidth: 200,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.activateHistoricalConsultationCompleteRate + "%"
              );
            },
          },
          {
            title: "派单目标",
            key: "sendOrderTarget",
            minWidth: 100,
            align: "center",
          },
          {
            title: "累计派单",
            key: "cumulativeSendOrder",
            minWidth: 100,
            align: "center",
          },
          {
            title: "派单完成率",
            key: "sendOrderCompleteRate",
            minWidth: 110,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.sendOrderCompleteRate + "%");
            },
          },
          {
            title: "上门目标",
            key: "visitTarget",
            minWidth: 100,
            align: "center",
          },
          {
            title: "累计上门数",
            key: "cumulativeVisit",
            minWidth: 110,
            align: "center",
          },
          {
            title: "上门完成率",
            key: "visitCompleteRate",
            minWidth: 110,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.visitCompleteRate + "%");
            },
          },
          {
            title: "成交人数目标",
            key: "dealTarget",
            minWidth: 140,
            align: "center",
          },
          {
            title: "累计成交人数",
            key: "cumulativeDealTarget",
            minWidth: 140,
            align: "center",
          },
          {
            title: "成交率",
            key: "dealRate",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.dealRate + "%");
            },
          },
          {
            title: "带货结算佣金目标",
            key: "cargoSettlementCommissionTarget",
            minWidth: 150,
            align: "center",
          },
          {
            title: "月累计带货结算佣金",
            key: "cumulativeCargoSettlementCommission",
            minWidth: 170,
            align: "center",
          },
          {
            title: "带货结算佣金完成率",
            key: "cargoSettlementCommissionCompleteRate",
            minWidth: 170,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.cargoSettlementCommissionCompleteRate + "%"
              );
            },
          },
          {
            title: "业绩目标",
            key: "performanceTarget",
            minWidth: 100,
            align: "center",
          },
          {
            title: "月累计业绩金额",
            key: "cumulativePerformance",
            minWidth: 140,
            align: "center",
          },

          {
            title: "业绩完成率",
            key: "performanceCompleteRate",
            minWidth: 110,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.performanceCompleteRate + "%");
            },
          },
          {
            title: "小黄车退单量上限",
            key: "minivanRefundTarget",
            minWidth: 150,
            align: "center",
          },
          {
            title: "月累计小黄车退款",
            key: "cumulativeMinivanRefund",
            minWidth: 150,
            align: "center",
          },
          {
            title: "小黄车退款率",
            key: "minivanRefundCompleteRate",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.minivanRefundCompleteRate + "%");
            },
          },
          {
            title: "差评总量上限",
            key: "miniVanBadReviewsTarget",
            minWidth: 150,
            align: "center",
          },
          {
            title: "月累计小黄车差评",
            key: "cumulativeMiniVanBadReviews",
            minWidth: 150,
            align: "center",
          },
          {
            title: "小黄车差评率",
            key: "miniVanBadReviewsCompleteRate",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.miniVanBadReviewsCompleteRate + "%");
            },
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
            minWidth: 200,
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
                        api.byIdLiveAnchorMonthlyTargets(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              year,
                              // 月度
                              month,
                              // 经营目标名称
                              monthlyTargetName,
                              // 下单平台
                              contentPlatFormId,
                              // 主播ID,
                              liveAnchorId,
                              // 月发布目标
                              releaseTarget,
                              // 投流目标
                              flowInvestmentTarget,
                              // 目标加V量
                              addWechatTarget,
                              // 派单目标
                              sendOrderTarget,
                              // 上门目标
                              visitTarget,
                              // 成交人数目标
                              dealTarget,
                              // 业绩目标
                              performanceTarget,
                              // 涨粉目标
                              addFansTarget,
                              // 目标线索量
                              cluesTarget,
                              // 直播间投流目标
                              livingRoomFlowInvestmentTarget,
                              // 99面诊卡目标
                              consultationTarget,
                              // 199面诊卡目标
                              consultationTarget2,
                              // 带货结算佣金目标
                              cargoSettlementCommissionTarget,
                              // 99消耗卡目标
                              consultationCardConsumedTarget,
                              // 199消耗卡目标
                              consultationCardConsumedTarget2,
                              // 激活历史面诊数量目标
                              activateHistoricalConsultationTarget,
                              // 小黄车退单量上限
                              minivanRefundTarget,
                              // 差评总量上限
                              miniVanBadReviewsTarget,
                            } = res.data.liveAnchorMonthlyTargetInfo;
                            this.contentPlateChange(contentPlatFormId);
                            this.isEdit = true;
                            this.form.year = String(year);
                            this.form.month = month;
                            this.form.monthlyTargetName = monthlyTargetName;
                            this.form.contentPlatFormId = contentPlatFormId;
                            this.form.liveAnchorId = liveAnchorId;
                            this.form.releaseTarget = releaseTarget;
                            this.form.flowInvestmentTarget = flowInvestmentTarget;
                            this.form.addWechatTarget = addWechatTarget;
                            this.form.sendOrderTarget = sendOrderTarget;
                            this.form.visitTarget = visitTarget;
                            this.form.dealTarget = dealTarget;
                            this.form.performanceTarget = performanceTarget;
                            this.form.addFansTarget = addFansTarget;
                            this.form.cluesTarget = cluesTarget;
                            this.form.livingRoomFlowInvestmentTarget = livingRoomFlowInvestmentTarget;
                            this.form.consultationTarget = consultationTarget;
                            this.form.consultationTarget2 = consultationTarget2;
                            this.form.cargoSettlementCommissionTarget = cargoSettlementCommissionTarget;
                            this.form.consultationCardConsumedTarget = consultationCardConsumedTarget;
                            this.form.consultationCardConsumedTarget2 = consultationCardConsumedTarget2;
                            this.form.activateHistoricalConsultationTarget = activateHistoricalConsultationTarget;
                            this.form.minivanRefundTarget = minivanRefundTarget;
                            this.form.miniVanBadReviewsTarget = miniVanBadReviewsTarget;
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
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "删除提示",
                          content: "是否确认删除？",
                          onOk: () => {
                            const { id } = params.row;
                            api
                              .deleteLiveAnchorMonthlyTarget(id)
                              .then((res) => {
                                if (res.code === 0) {
                                  this.getLiveAnchorMonthlyTargetInfo();
                                  this.$Message.success({
                                    content: "删除成功",
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
                  "删除"
                ),
              ]);
            },
          },
        ],
        // 运营咨询（直播前）
        columns1: [
          {
            title: "主播名称",
            key: "liveAnchorName",
            minWidth: 140,
            align: "center",
          },
          {
            title: "年份",
            key: "year",
            minWidth: 90,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.year + "年");
            },
          },
          {
            title: "月份",
            key: "month",
            minWidth: 80,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.month + "月");
            },
          },
          {
            title: "经营目标名称",
            key: "monthlyTargetName",
            minWidth: 190,
            align: "center",
          },
          {
            title: "月发布目标",
            key: "releaseTarget",
            minWidth: 110,
            align: "center",
          },
          {
            title: "月累计发布条数",
            key: "cumulativeRelease",
            minWidth: 140,
            align: "center",
          },
          {
            title: "发布目标完成率",
            key: "releaseCompleteRate",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.releaseCompleteRate + "%");
            },
          },
          {
            title: "视频号投流目标",
            key: "flowInvestmentTarget",
            minWidth: 140,
            align: "center",
          },
          {
            title: "月累计视频号投流数量",
            key: "cumulativeFlowInvestment",
            minWidth: 180,
            align: "center",
          },
          {
            title: "视频号投流完成率",
            key: "flowInvestmentCompleteRate",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.flowInvestmentCompleteRate + "%");
            },
          },
          {
            title: "目标线索量",
            key: "cluesTarget",
            minWidth: 110,
            align: "center",
          },
          {
            title: "月累计线索量",
            key: "cumulativeClues",
            minWidth: 130,
            align: "center",
          },
          {
            title: "线索完成率",
            key: "cluesCompleteRate",
            minWidth: 110,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.cluesCompleteRate + "%");
            },
          },
          {
            title: "涨粉目标",
            key: "addFansTarget",
            minWidth: 100,
            align: "center",
          },
          {
            title: "累计涨粉量",
            key: "cumulativeAddFans",
            minWidth: 110,
            align: "center",
          },
          {
            title: "涨粉完成率",
            key: "addFansCompleteRate",
            minWidth: 110,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.addFansCompleteRate + "%");
            },
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
        ],
        // 直播间（直播中）
        columns2: [
          {
            title: "主播名称",
            key: "liveAnchorName",
            minWidth: 140,
            align: "center",
          },
          {
            title: "年份",
            key: "year",
            minWidth: 90,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.year + "年");
            },
          },
          {
            title: "月份",
            key: "month",
            minWidth: 80,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.month + "月");
            },
          },
          {
            title: "经营目标名称",
            key: "monthlyTargetName",
            minWidth: 190,
            align: "center",
          },

          {
            title: "直播间投流目标",
            key: "livingRoomFlowInvestmentTarget",
            minWidth: 140,
            align: "center",
          },
          {
            title: "月累计直播间投流数量",
            key: "livingRoomCumulativeFlowInvestment",
            minWidth: 180,
            align: "center",
          },
          {
            title: "直播间投流完成率",
            key: "livingRoomFlowInvestmentCompleteRate",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.livingRoomFlowInvestmentCompleteRate + "%"
              );
            },
          },

          {
            title: "99面诊卡下单数量目标",
            key: "consultationTarget",
            minWidth: 180,
            align: "center",
          },
          {
            title: "累计99面诊卡下单数量",
            key: "cumulativeConsultation",
            minWidth: 180,
            align: "center",
          },
          {
            title: "99面诊卡下单数量完成率",
            key: "consultationCompleteRate",
            minWidth: 200,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.consultationCompleteRate + "%");
            },
          },
          {
            title: "199面诊卡下单数量目标",
            key: "consultationTarget2",
            minWidth: 200,
            align: "center",
          },
          {
            title: "累计199面诊卡下单数量",
            key: "cumulativeConsultation2",
            minWidth: 200,
            align: "center",
          },
          {
            title: "199面诊卡下单数量完成率",
            key: "consultationCompleteRate2",
            minWidth: 210,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.consultationCompleteRate2 + "%");
            },
          },
          {
            title: "带货结算佣金目标",
            key: "cargoSettlementCommissionTarget",
            minWidth: 150,
            align: "center",
          },
          {
            title: "月累计带货结算佣金",
            key: "cumulativeCargoSettlementCommission",
            minWidth: 170,
            align: "center",
          },
          {
            title: "带货结算佣金完成率",
            key: "cargoSettlementCommissionCompleteRate",
            minWidth: 170,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.cargoSettlementCommissionCompleteRate + "%"
              );
            },
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
        ],
        // 客服（直播后）
        columns3: [
          {
            title: "主播名称",
            key: "liveAnchorName",
            minWidth: 140,
            align: "center",
          },
          {
            title: "年份",
            key: "year",
            minWidth: 90,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.year + "年");
            },
          },
          {
            title: "月份",
            key: "month",
            minWidth: 80,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.month + "月");
            },
          },
          {
            title: "经营目标名称",
            key: "monthlyTargetName",
            minWidth: 190,
            align: "center",
          },

          {
            title: "目标加V量",
            key: "addWechatTarget",
            minWidth: 110,
            align: "center",
          },
          {
            title: "月加V累计",
            key: "cumulativeAddWechat",
            minWidth: 110,
            align: "center",
          },
          {
            title: "加V完成率",
            key: "addWechatCompleteRate",
            minWidth: 110,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.addWechatCompleteRate + "%");
            },
          },
          {
            title: "99消耗卡目标",
            key: "consultationCardConsumedTarget",
            minWidth: 150,
            align: "center",
          },
          {
            title: "99累计消耗卡",
            key: "cumulativeConsultationCardConsumed",
            minWidth: 150,
            align: "center",
          },
          {
            title: "99消耗卡完成率",
            key: "consultationCardConsumedCompleteRate",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.consultationCardConsumedCompleteRate + "%"
              );
            },
          },
          {
            title: "199消耗卡目标",
            key: "consultationCardConsumedTarget2",
            minWidth: 150,
            align: "center",
          },
          {
            title: "199累计消耗卡",
            key: "cumulativeConsultationCardConsumed2",
            minWidth: 150,
            align: "center",
          },
          {
            title: "199消耗卡完成率",
            key: "consultationCardConsumedCompleteRate2",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.consultationCardConsumedCompleteRate2 + "%"
              );
            },
          },
          {
            title: "激活历史面诊数量目标",
            key: "activateHistoricalConsultationTarget",
            minWidth: 180,
            align: "center",
          },
          {
            title: "累计激活历史面诊数量",
            key: "cumulativeActivateHistoricalConsultation",
            minWidth: 180,
            align: "center",
          },
          {
            title: "激活历史面诊数量完成率",
            key: "activateHistoricalConsultationCompleteRate",
            minWidth: 200,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.activateHistoricalConsultationCompleteRate + "%"
              );
            },
          },
          {
            title: "派单目标",
            key: "sendOrderTarget",
            minWidth: 100,
            align: "center",
          },
          {
            title: "累计派单",
            key: "cumulativeSendOrder",
            minWidth: 100,
            align: "center",
          },
          {
            title: "派单完成率",
            key: "sendOrderCompleteRate",
            minWidth: 110,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.sendOrderCompleteRate + "%");
            },
          },
          {
            title: "上门目标",
            key: "visitTarget",
            minWidth: 100,
            align: "center",
          },
          {
            title: "累计上门数",
            key: "cumulativeVisit",
            minWidth: 110,
            align: "center",
          },
          {
            title: "上门完成率",
            key: "visitCompleteRate",
            minWidth: 110,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.visitCompleteRate + "%");
            },
          },
          {
            title: "成交人数目标",
            key: "dealTarget",
            minWidth: 140,
            align: "center",
          },
          {
            title: "累计成交人数",
            key: "cumulativeDealTarget",
            minWidth: 140,
            align: "center",
          },
          {
            title: "成交率",
            key: "dealRate",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.dealRate + "%");
            },
          },
          {
            title: "业绩目标",
            key: "performanceTarget",
            minWidth: 100,
            align: "center",
          },
          {
            title: "月累计业绩金额",
            key: "cumulativePerformance",
            minWidth: 140,
            align: "center",
          },

          {
            title: "业绩完成率",
            key: "performanceCompleteRate",
            minWidth: 110,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.performanceCompleteRate + "%");
            },
          },
          {
            title: "小黄车退单量上限",
            key: "minivanRefundTarget",
            minWidth: 150,
            align: "center",
          },
          {
            title: "月累计小黄车退款",
            key: "cumulativeMinivanRefund",
            minWidth: 150,
            align: "center",
          },
          {
            title: "小黄车退款率",
            key: "minivanRefundCompleteRate",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.minivanRefundCompleteRate + "%");
            },
          },
          {
            title: "差评总量上限",
            key: "miniVanBadReviewsTarget",
            minWidth: 150,
            align: "center",
          },
          {
            title: "月累计小黄车差评",
            key: "cumulativeMiniVanBadReviews",
            minWidth: 150,
            align: "center",
          },
          {
            title: "小黄车差评率",
            key: "miniVanBadReviewsCompleteRate",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.miniVanBadReviewsCompleteRate + "%");
            },
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
        ],
        data: [],
        totalCount: 0,
      },
      //   下单平台
      contentPalteForms: [],
      // ip账号
      liveAnchors: [],
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
      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        //年度
        year: this.$moment(new Date()).format("yyyy"),
        // 月度
        month: Number(this.$moment(new Date()).format("MM")),
        // 经营目标名称
        monthlyTargetName: "",
        // 下单平台
        contentPlatFormId: "",
        // 主播ID,
        liveAnchorId: "",
        // 月发布目标
        releaseTarget: null,
        // 投流目标
        flowInvestmentTarget: null,
        // 目标加V量
        addWechatTarget: null,
        // 派单目标
        sendOrderTarget: null,
        // 上门目标
        visitTarget: null,
        // 成交人数目标
        dealTarget: null,
        // 业绩目标
        performanceTarget: null,
        id: "",
        // 涨粉目标
        addFansTarget: null,
        // 投流目标
        cluesTarget: null,
        // 直播间投流目标
        livingRoomFlowInvestmentTarget: null,
        // 99面诊卡目标
        consultationTarget: null,
        // 199面诊卡数量
        consultationTarget2: null,
        // 带货结算佣金目标
        cargoSettlementCommissionTarget: null,
        // 小黄车退单量上限
        minivanRefundTarget: null,
        // 差评总量上限
        miniVanBadReviewsTarget: null,
        // 99消耗卡目标
        consultationCardConsumedTarget: null,
        // 199消耗卡目标
        consultationCardConsumedTarget2: null,
        // 激活历史面诊数量目标
        activateHistoricalConsultationTarget: null,
      },

      ruleValidate: {
        year: [
          {
            required: true,
            message: "请选择年",
          },
        ],
        month: [
          {
            required: true,
            message: "请选择月份",
          },
        ],
        monthlyTargetName: [
          {
            required: true,
            message: "请输入经营目标名称",
          },
        ],
        contentPlatFormId: [
          {
            required: true,
            message: "请选择下单平台",
          },
        ],
        liveAnchorId: [
          {
            required: true,
            message: "请选择主播ID",
          },
        ],
        // releaseTarget: [
        //   {
        //     required: true,
        //     message: "请输入月发布目标",
        //   },
        // ],
        flowInvestmentTarget: [
          {
            required: true,
            message: "请输入视频号投流目标",
          },
        ],
        addWechatTarget: [
          {
            required: true,
            message: "请输入目标加V量",
          },
        ],
        sendOrderTarget: [
          {
            required: true,
            message: "请输入派单目标",
          },
        ],
        visitTarget: [
          {
            required: true,
            message: "请输入上门目标",
          },
        ],
        dealTarget: [
          {
            required: true,
            message: "请输入成交人数目标",
          },
        ],
        performanceTarget: [
          {
            required: true,
            message: "请输入业绩目标",
          },
        ],
        addFansTarget: [
          {
            required: true,
            message: "请输入涨粉目标",
          },
        ],
        cluesTarget: [
          {
            required: true,
            message: "请输入线索目标",
          },
        ],
        livingRoomFlowInvestmentTarget: [
          {
            required: true,
            message: "请输入直播间投流目标",
          },
        ],
        consultationTarget: [
          {
            required: true,
            message: "请输入99面诊卡目标",
          },
        ],
        cargoSettlementCommissionTarget: [
          {
            required: true,
            message: "请输入带货结算佣金目标",
          },
        ],
      },
    };
  },
  methods: {
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
    // 获取主播月度运营目标情况列表
    getLiveAnchorMonthlyTargetInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize, month, year, liveAnchorId } = this.query;
      const data = {
        pageNum,
        pageSize,
        month,
        year: Number(this.$moment(new Date(year)).format("yyyy")),
        liveAnchorId,
      };
      if (!year) {
        this.$Message.error("请选择年份");
        return;
      } else {
        api.getLiveAnchorMonthlyTargetList(data).then((res) => {
          if (res.code === 0) {
            const { list, totalCount } = res.data.liveAnchorMonthlyTargetInfo;
            this.query.data = list;
            this.query.totalCount = totalCount;
          }
        });
      }
    },

    // 获取主播月度运营目标情况列表分页
    handlePageChange(pageNum) {
      const { pageSize, month, year, liveAnchorId } = this.query;
      const data = {
        pageNum,
        pageSize,
        month,
        year: Number(this.$moment(new Date(year)).format("yyyy")),
        liveAnchorId,
      };
      api.getLiveAnchorMonthlyTargetList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.liveAnchorMonthlyTargetInfo;
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
            api.editLiveAnchorMonthlyTarget(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getLiveAnchorMonthlyTargetInfo();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const {
              year,
              month,
              monthlyTargetName,
              liveAnchorId,
              releaseTarget,
              flowInvestmentTarget,
              addWechatTarget,
              sendOrderTarget,
              visitTarget,
              dealTarget,
              performanceTarget,
              cluesTarget,
              addFansTarget,
              livingRoomFlowInvestmentTarget,
              consultationTarget,
              cargoSettlementCommissionTarget,
              consultationCardConsumedTarget,
              consultationCardConsumedTarget2,
              activateHistoricalConsultationTarget,
              minivanRefundTarget,
              miniVanBadReviewsTarget,
              consultationTarget2,
            } = this.form;
            const data = {
              year: Number(this.$moment(new Date(year)).format("yyyy")),
              month,
              monthlyTargetName,
              liveAnchorId: Number(liveAnchorId),
              releaseTarget,
              flowInvestmentTarget,
              addWechatTarget,
              sendOrderTarget,
              visitTarget,
              dealTarget,
              performanceTarget,
              cluesTarget,
              addFansTarget,
              livingRoomFlowInvestmentTarget,
              consultationTarget,
              cargoSettlementCommissionTarget,
              consultationCardConsumedTarget,
              consultationCardConsumedTarget2,
              activateHistoricalConsultationTarget,
              minivanRefundTarget,
              miniVanBadReviewsTarget,
              consultationTarget2,
            };
            // 添加
            api.AddLiveAnchorMonthlyTarget(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getLiveAnchorMonthlyTargetInfo();
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
    this.getLiveAnchorMonthlyTargetInfo();
    this.getContentValidList();
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
