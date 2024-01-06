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
          :columns="query.columns"
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
              label="照片消耗卡目标"
              prop="consultationCardConsumedTarget"
              :rules="[
                {
                  required: true,
                  message: '照片消耗卡目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="照片消耗卡目标"
            >
              <Input
                v-model="form.consultationCardConsumedTarget"
                placeholder="请输入照片消耗卡目标"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="视频消耗卡目标"
              prop="consultationCardConsumedTarget2"
              :rules="[
                {
                  required: true,
                  message: '视频消耗卡目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="视频消耗卡目标"
            >
              <Input
                v-model="form.consultationCardConsumedTarget2"
                placeholder="请输入视频消耗卡目标"
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
              label="新客上门目标"
              prop="newCustomerVisitTarget"
              :rules="[
                {
                  required: true,
                  message: '新客上门目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="新客上门目标"
            >
              <Input
                v-model="form.newCustomerVisitTarget"
                placeholder="请输入新客上门目标"
                type="number"
                number
                @on-change="newCustomerVisitTargetChange"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客上门目标"
              prop="oldCustomerVisitTarget"
              :rules="[
                {
                  required: true,
                  message: '老客上门目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="老客上门目标"
            >
              <Input
                v-model="form.oldCustomerVisitTarget"
                placeholder="请输入老客上门目标"
                type="number"
                number
                @on-change="oldCustomerVisitTargetChange"
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
                disabled
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="新客成交人数目标"
              prop="newCustomerDealTarget"
              :rules="[
                {
                  required: true,
                  message: '新客成交人数(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="新客成交人数目标"
            >
              <Input
                v-model="form.newCustomerDealTarget"
                placeholder="新客成交人数目标"
                type="number"
                number
                @on-change="newCustomerDealTargetChange"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客成交人数目标"
              prop="oldCustomerDealTarget"
              :rules="[
                {
                  required: true,
                  message: '老客成交人数(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="老客成交人数目标"
            >
              <Input
                v-model="form.oldCustomerDealTarget"
                placeholder="老客成交人数目标"
                type="number"
                number
                @on-change="oldCustomerDealTargetChange"
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
                disabled
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="新诊业绩目标"
              prop="newCustomerPerformanceTarget"
              :rules="[
                {
                  required: true,
                  message: '请输入新诊业绩目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="新诊业绩目标"
            >
              <Input
                v-model="form.newCustomerPerformanceTarget"
                placeholder="请输入新诊业绩目标"
                type="number"
                number
                @on-change="newCustomerPerformanceTargetChange"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="复诊业绩目标"
              prop="subsequentPerformanceTarget"
              :rules="[
                {
                  required: true,
                  message: '请输入复诊业绩目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="复诊业绩目标"
            >
              <Input
                v-model="form.subsequentPerformanceTarget"
                placeholder="请输入复诊业绩目标"
                type="number"
                number
                @on-change="subsequentPerformanceTargetChange"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客业绩目标"
              prop="oldCustomerPerformanceTarget"
              :rules="[
                {
                  required: true,
                  message: '请输入老客业绩目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="老客业绩目标"
            >
              <Input
                v-model="form.oldCustomerPerformanceTarget"
                placeholder="请输入老客业绩目标"
                type="number"
                number
                @on-change="oldCustomerPerformanceTargetChange"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="总业绩目标"
              prop="performanceTarget"
              :rules="[
                {
                  required: true,
                  message: '请输入总业绩目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="总业绩目标"
            >
              <Input
                v-model="form.performanceTarget"
                placeholder="请输入总业绩目标"
                type="number"
                number
                disabled
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
          <Col span="8">
            <FormItem
              label="有效业绩"
              prop="effectivePerformanceTarget"
              :rules="[
                {
                  required: true,
                  message: '请输入有效业绩(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="有效业绩"
            >
              <Input
                v-model="form.effectivePerformanceTarget"
                placeholder="请输入有效业绩"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="潜在业绩"
              prop="potentialPerformanceTarget"
              :rules="[
                {
                  required: true,
                  message: '请输入潜在业绩(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="潜在业绩"
            >
              <Input
                v-model="form.potentialPerformanceTarget"
                placeholder="请输入潜在业绩"
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
        // 客服（直播后）
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
            minWidth: 240,
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
            title: "照片消耗卡目标",
            key: "consultationCardConsumedTarget",
            minWidth: 150,
            align: "center",
          },
          {
            title: "照片累计消耗卡",
            key: "cumulativeConsultationCardConsumed",
            minWidth: 150,
            align: "center",
          },
          {
            title: "照片消耗卡完成率",
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
            title: "视频消耗卡目标",
            key: "consultationCardConsumedTarget2",
            minWidth: 150,
            align: "center",
          },
          {
            title: "视频累计消耗卡",
            key: "cumulativeConsultationCardConsumed2",
            minWidth: 150,
            align: "center",
          },
          {
            title: "视频消耗卡完成率",
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
            title: "新客上门目标",
            key: "newCustomerVisitTarget",
            minWidth: 130,
            align: "center",
          },
          {
            title: "累计新客上门数",
            key: "cumulativeNewCustomerVisit",
            minWidth: 140,
            align: "center",
          },
          {
            title: "新客上门完成率",
            key: "newCustomerVisitCompleteRate",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.newCustomerVisitCompleteRate + "%");
            },
          },
          {
            title: "老客上门目标",
            key: "cumulativeOldCustomerVisit",
            minWidth: 130,
            align: "center",
          },
          {
            title: "累计老客上门数",
            key: "oldCustomerVisitTarget",
            minWidth: 140,
            align: "center",
          },
          {
            title: "老客上门完成率",
            key: "oldCustomerVisitCompleteRate",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.oldCustomerVisitCompleteRate + "%");
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
            title: "新客成交人数目标",
            key: "newCustomerDealTarget",
            minWidth: 170,
            align: "center",
          },
          {
            title: "累计新客成交人数",
            key: "cumulativeNewCustomerDealTarget",
            minWidth: 170,
            align: "center",
          },
          {
            title: "新客成交率",
            key: "newCustomerDealRate",
            minWidth: 130,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.newCustomerDealRate + "%");
            },
          },
          {
            title: "老客成交人数目标",
            key: "oldCustomerDealTarget",
            minWidth: 170,
            align: "center",
          },
          {
            title: "累计老客成交人数",
            key: "cumulativeOldCustomerDealTarget",
            minWidth: 170,
            align: "center",
          },
          {
            title: "老客成交率",
            key: "oldCustomerDealRate",
            minWidth: 130,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.oldCustomerDealRate + "%");
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
            title: "新诊业绩目标",
            key: "newCustomerPerformanceTarget",
            minWidth: 140,
            align: "center",
          },
          {
            title: "月累计新诊业绩金额",
            key: "cumulativeNewCustomerPerformance",
            minWidth: 180,
            align: "center",
          },

          {
            title: "新诊业绩完成率",
            key: "newCustomerPerformanceCompleteRate",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.newCustomerPerformanceCompleteRate + "%");
            },
          },
          {
            title: "复诊业绩目标",
            key: "subsequentPerformanceTarget",
            minWidth: 140,
            align: "center",
          },
          {
            title: "月累计复诊业绩金额",
            key: "cumulativeSubsequentPerformance",
            minWidth: 180,
            align: "center",
          },

          {
            title: "复诊业绩完成率",
            key: "subsequentPerformanceCompleteRate",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.subsequentPerformanceCompleteRate + "%");
            },
          },
          {
            title: "老客业绩目标",
            key: "oldCustomerPerformanceTarget",
            minWidth: 140,
            align: "center",
          },
          {
            title: "月累计老客业绩金额",
            key: "cumulativeOldCustomerPerformance",
            minWidth: 180,
            align: "center",
          },

          {
            title: "老客业绩完成率",
            key: "oldCustomerPerformanceCompleteRate",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.oldCustomerPerformanceCompleteRate + "%");
            },
          },
          {
            title: "总业绩目标",
            key: "performanceTarget",
            minWidth: 120,
            align: "center",
          },
          {
            title: "月累计总业绩金额",
            key: "cumulativePerformance",
            minWidth: 160,
            align: "center",
          },

          {
            title: "总业绩完成率",
            key: "performanceCompleteRate",
            minWidth: 130,
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
            title: "有效业绩目标",
            key: "effectivePerformanceTarget",
            minWidth: 150,
            align: "center",
          },
          {
            title: "累计有效业绩",
            key: "cumulativeEffectivePerformance",
            minWidth: 150,
            align: "center",
          },
          {
            title: "有效业绩完成率",
            key: "effectivePerformanceCompleteRate",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.effectivePerformanceCompleteRate + "%");
            },
          },
          {
            title: "潜在业绩目标",
            key: "potentialPerformanceTarget",
            minWidth: 150,
            align: "center",
          },
          {
            title: "累计潜在业绩",
            key: "cumulativePotentialPerformance",
            minWidth: 150,
            align: "center",
          },
          {
            title: "潜在业绩目标完成率",
            key: "potentialPerformanceCompleteRate",
            minWidth: 170,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.potentialPerformanceCompleteRate + "%");
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
                        api.byIdLiveAnchorMonthlyTargetAfterLiving(id).then((res) => {
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
                              // 目标加V量
                              addWechatTarget,
                              // 派单目标
                              sendOrderTarget,
                              // 新客上门目标
                              newCustomerVisitTarget,
                              // 老客上门目标
                              oldCustomerVisitTarget,
                              // 上门目标
                              visitTarget,
                              // 新客成交
                              newCustomerDealTarget,
                              // 老客成交
                              oldCustomerDealTarget,
                              // 成交人数目标
                              dealTarget,
                              // 新诊业绩
                              newCustomerPerformanceTarget,
                              // 复诊业绩
                              subsequentPerformanceTarget,
                              // 老客业绩
                              oldCustomerPerformanceTarget,
                              // 总业绩目标
                              performanceTarget,
                              // 照片消耗卡目标
                              consultationCardConsumedTarget,
                              // 视频消耗卡目标
                              consultationCardConsumedTarget2,
                              // 激活历史面诊数量目标
                              activateHistoricalConsultationTarget,
                              // 小黄车退单量上限
                              minivanRefundTarget,
                              // 差评总量上限
                              miniVanBadReviewsTarget,
                              // 有效业绩目标
                              effectivePerformanceTarget,
                              // 潜在业绩
                              potentialPerformanceTarget
                            } = res.data.liveAnchorMonthlyTargetAfterLivingInfo;
                            this.contentPlateChange(contentPlatFormId);
                            this.isEdit = true;
                            this.form.year = String(year);
                            this.form.month = month;
                            this.form.monthlyTargetName = monthlyTargetName;
                            this.form.contentPlatFormId = contentPlatFormId;
                            this.form.liveAnchorId = liveAnchorId;
                            this.form.addWechatTarget = addWechatTarget;
                            this.form.sendOrderTarget = sendOrderTarget;
                            this.form.newCustomerVisitTarget = newCustomerVisitTarget;
                            this.form.oldCustomerVisitTarget = oldCustomerVisitTarget;
                            this.form.visitTarget = visitTarget;
                            this.form.newCustomerDealTarget = newCustomerDealTarget;
                            this.form.oldCustomerDealTarget = oldCustomerDealTarget;
                            this.form.dealTarget = dealTarget;
                            this.form.newCustomerPerformanceTarget = newCustomerPerformanceTarget;
                            this.form.subsequentPerformanceTarget = subsequentPerformanceTarget;
                            this.form.oldCustomerPerformanceTarget = oldCustomerPerformanceTarget;
                            this.form.performanceTarget = performanceTarget;
                            this.form.consultationCardConsumedTarget = consultationCardConsumedTarget;
                            this.form.consultationCardConsumedTarget2 = consultationCardConsumedTarget2;
                            this.form.activateHistoricalConsultationTarget = activateHistoricalConsultationTarget;
                            this.form.minivanRefundTarget = minivanRefundTarget;
                            this.form.miniVanBadReviewsTarget = miniVanBadReviewsTarget;
                            this.form.effectivePerformanceTarget = effectivePerformanceTarget;
                            this.form.potentialPerformanceTarget = potentialPerformanceTarget;
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
                              .deleteLiveAnchorMonthlyTargetAfterLiving(id)
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
       
        // 目标加V量
        addWechatTarget: null,
        // 派单目标
        sendOrderTarget: null,
        // 新客上门目标
        newCustomerVisitTarget:null,
        // 老客上门目标
        oldCustomerVisitTarget:null,
        // 上门目标
        visitTarget: null,
        // 新客成交
        newCustomerDealTarget:null,
        // 老客成交
        oldCustomerDealTarget:null,
        // 成交人数目标
        dealTarget: null,
        // 新诊业绩目标
        newCustomerPerformanceTarget: null,
        // 复诊业绩目标
        subsequentPerformanceTarget: null,
        // 老客业绩目标
        oldCustomerPerformanceTarget: null,
        // 总业绩目标
        performanceTarget: null,
        id: "",
        // 涨粉目标
        addFansTarget: null,
        // 投流目标
        cluesTarget: null,
        // 直播间投流费用目标
        livingRoomFlowInvestmentTarget: null,
        // 照片面诊卡目标
        consultationTarget: null,
        // 视频面诊卡数量
        consultationTarget2: null,
        // 带货结算佣金目标
        cargoSettlementCommissionTarget: null,
        // 小黄车退单量上限
        minivanRefundTarget: null,
        // 差评总量上限
        miniVanBadReviewsTarget: null,
        // 照片消耗卡目标
        consultationCardConsumedTarget: null,
        // 视频消耗卡目标
        consultationCardConsumedTarget2: null,
        // 激活历史面诊数量目标
        activateHistoricalConsultationTarget: null,
        // 有效业绩目标
        effectivePerformanceTarget: null,
        // 潜在业绩
        potentialPerformanceTarget: null
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
            message: "请输入运营渠道投流费用目标",
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
            message: "请输入总业绩目标",
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
            message: "请输入直播间投流费用目标",
          },
        ],
        consultationTarget: [
          {
            required: true,
            message: "请输入照片面诊卡目标",
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

    newCustomerDealTargetChange(){
      this.form.dealTarget = Number(this.form.newCustomerDealTarget) + Number(this.form.oldCustomerDealTarget)
    },
    oldCustomerDealTargetChange(){
      this.form.dealTarget = Number(this.form.newCustomerDealTarget) + Number(this.form.oldCustomerDealTarget)
    },
    newCustomerVisitTargetChange(){
      this.form.visitTarget = Number(this.form.newCustomerVisitTarget) + Number(this.form.oldCustomerVisitTarget)
    },
    oldCustomerVisitTargetChange(){
      this.form.visitTarget = Number(this.form.newCustomerVisitTarget) + Number(this.form.oldCustomerVisitTarget)
    },
    newCustomerPerformanceTargetChange(){
      this.form.performanceTarget = Number(this.form.newCustomerPerformanceTarget) + Number(this.form.subsequentPerformanceTarget) + Number(this.form.oldCustomerPerformanceTarget)
    },
    subsequentPerformanceTargetChange(){
      this.form.performanceTarget = Number(this.form.newCustomerPerformanceTarget) + Number(this.form.subsequentPerformanceTarget) + Number(this.form.oldCustomerPerformanceTarget)
    },
    oldCustomerPerformanceTargetChange(){
      this.form.performanceTarget = Number(this.form.newCustomerPerformanceTarget) + Number(this.form.subsequentPerformanceTarget) + Number(this.form.oldCustomerPerformanceTarget)
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
        api.getLiveAnchorMonthlyTargetAfterLiving(data).then((res) => {
          if (res.code === 0) {
            const { list, totalCount } = res.data.liveAnchorMonthlyTargetAfterLivingInfo;
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
      api.getLiveAnchorMonthlyTargetAfterLiving(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.liveAnchorMonthlyTargetAfterLivingInfo;
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
            const {
              id,
              year,
              month,
              monthlyTargetName,
              liveAnchorId,
              addWechatTarget,
              sendOrderTarget,
              newCustomerVisitTarget,
              oldCustomerVisitTarget,
              visitTarget,
              newCustomerDealTarget,
              oldCustomerDealTarget,
              dealTarget,
              performanceTarget,
              consultationCardConsumedTarget,
              consultationCardConsumedTarget2,
              activateHistoricalConsultationTarget,
              minivanRefundTarget,
              miniVanBadReviewsTarget,
              newCustomerPerformanceTarget,
              subsequentPerformanceTarget,
              oldCustomerPerformanceTarget,
              effectivePerformanceTarget,
              potentialPerformanceTarget
            } = this.form;
            const data = {
              id,
              year: Number(this.$moment(new Date(year)).format("yyyy")),
              month,
              monthlyTargetName,
              liveAnchorId: Number(liveAnchorId),
              addWechatTarget,
              sendOrderTarget,
              newCustomerVisitTarget,
              oldCustomerVisitTarget,
              visitTarget,
              dealTarget,
              performanceTarget,
              consultationCardConsumedTarget,
              consultationCardConsumedTarget2,
              activateHistoricalConsultationTarget,
              minivanRefundTarget,
              miniVanBadReviewsTarget,
              newCustomerPerformanceTarget,
              subsequentPerformanceTarget,
              oldCustomerPerformanceTarget,
              newCustomerDealTarget,
              oldCustomerDealTarget,
              effectivePerformanceTarget,
              potentialPerformanceTarget
              
            };
            this.isflag = true
            // 修改
            api.editLiveAnchorMonthlyTargetAfterLiving(data).then((res) => {
              if (res.code === 0) {
                this.isflag = false
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getLiveAnchorMonthlyTargetInfo();
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
              year,
              month,
              monthlyTargetName,
              liveAnchorId,
              addWechatTarget,
              sendOrderTarget,
              newCustomerVisitTarget,
              oldCustomerVisitTarget,
              visitTarget,
              newCustomerDealTarget,
              oldCustomerDealTarget,
              dealTarget,
              performanceTarget,
              consultationCardConsumedTarget,
              consultationCardConsumedTarget2,
              activateHistoricalConsultationTarget,
              minivanRefundTarget,
              miniVanBadReviewsTarget,
              newCustomerPerformanceTarget,
              subsequentPerformanceTarget,
              oldCustomerPerformanceTarget,
              effectivePerformanceTarget,
              potentialPerformanceTarget
            } = this.form;
            const data = {
              year: Number(this.$moment(new Date(year)).format("yyyy")),
              month,
              monthlyTargetName,
              liveAnchorId: Number(liveAnchorId),
              addWechatTarget,
              sendOrderTarget,
              newCustomerVisitTarget,
              oldCustomerVisitTarget,
              visitTarget,
              dealTarget,
              performanceTarget,
              consultationCardConsumedTarget,
              consultationCardConsumedTarget2,
              activateHistoricalConsultationTarget,
              minivanRefundTarget,
              miniVanBadReviewsTarget,
              newCustomerPerformanceTarget,
              subsequentPerformanceTarget,
              oldCustomerPerformanceTarget,
              newCustomerDealTarget,
              oldCustomerDealTarget,
              effectivePerformanceTarget,
              potentialPerformanceTarget
              
            };
            this.isflag = true
            // 添加
            api.AddLiveAnchorMonthlyTargetAfterLiving(data).then((res) => {
              if (res.code === 0) {
                this.isflag = false
                this.cancelSubmit("form");
                this.getLiveAnchorMonthlyTargetInfo();
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
