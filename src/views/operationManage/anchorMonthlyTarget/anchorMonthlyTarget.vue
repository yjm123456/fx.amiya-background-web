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
        :label-width="170"
      >
        <div class="bor">
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
                  message: '月发布目标(最小是1)',
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
                disabled
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="运营渠道投流费用目标"
              prop="flowInvestmentTarget"
              :rules="[
                {
                  required: true,
                  message: '运营渠道投流费用目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="运营渠道投流费用目标"
            >
              <Input
                v-model="form.flowInvestmentTarget"
                placeholder="请输入运营渠道投流费用目标"
                type="number"
                number
                disabled
              />
            </FormItem>
          </Col>
          </Row>
        </div>
        <div class="bor">
          <Row :gutter="30">
            <Col span="8">
              <FormItem
                label="抖音发布目标"
                prop="tikTokReleaseTarget"
                :rules="[
                  {
                    required: true,
                    message: '抖音发布目标(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="抖音发布目标"
              >
                <Input
                  v-model="form.tikTokReleaseTarget"
                  placeholder="请输入抖音发布目标"
                  type="number"
                  number
                  @on-change="tikTokReleaseTargetChange"
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="抖音投流费用目标"
                prop="tikTokFlowinvestmentTarget"
                :rules="[
                  {
                    required: true,
                    message: '抖音投流费用目标(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="抖音投流费用目标"
              >
                <Input
                  v-model="form.tikTokFlowinvestmentTarget"
                  placeholder="请输入抖音投流费用目标"
                  type="number"
                  number
                  @on-change="zhihuFlowinvestmentTargetChange"
                />
              </FormItem>
            </Col>
            
            <Col span="8">
              <FormItem
                label="抖音涨粉目标"
                prop="tikTokIncreaseFansTarget"
                :rules="[
                  {
                    required: true,
                    message: '抖音涨粉目标(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="抖音涨粉目标"
              >
                <Input
                  v-model="form.tikTokIncreaseFansTarget"
                  placeholder="请输入抖音涨粉目标"
                  type="number"
                  number
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="抖音涨粉付费预算"
                prop="tikTokIncreaseFansFeesTarget"
                :rules="[
                  {
                    required: true,
                    message: '抖音涨粉付费预算(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="抖音涨粉付费预算"
              >
                <Input
                  v-model="form.tikTokIncreaseFansFeesTarget"
                  placeholder="请输入抖音涨粉付费预算"
                  type="number"
                  number
                />
              </FormItem>
            </Col>
            <!-- <Col span="8">
              <FormItem
                label="抖音涨粉成本目标"
                prop="tikTokIncreaseFansFeesCostTarget"
                :rules="[
                  {
                    required: true,
                    message: '抖音涨粉成本目标(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="抖音涨粉成本目标"
              >
                <Input
                  v-model="form.tikTokIncreaseFansFeesCostTarget"
                  placeholder="请输入抖音涨粉成本目标"
                  type="number"
                  number
                />
              </FormItem>
            </Col> -->
            <Col span="8">
              <FormItem
                label="抖音线索量目标"
                prop="tikTokCluesTarget"
                :rules="[
                  {
                    required: true,
                    message: '抖音线索量目标(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="抖音线索量目标"
              >
                <Input
                  v-model="form.tikTokCluesTarget"
                  placeholder="请输入抖音线索量目标"
                  type="number"
                  number
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="抖音橱窗收入目标"
                prop="tikTokShowcaseIncomeTarget"
                :rules="[
                  {
                    required: true,
                    message: '抖音橱窗收入目标(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="抖音橱窗收入目标"
              >
                <Input
                  v-model="form.tikTokShowcaseIncomeTarget"
                  placeholder="请输入抖音橱窗收入目标"
                  type="number"
                  number
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="抖音橱窗付费预算"
                prop="tikTokShowCaseFeeTarget"
                :rules="[
                  {
                    required: true,
                    message: '抖音橱窗付费预算(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="抖音橱窗付费预算"
              >
                <Input
                  v-model="form.tikTokShowCaseFeeTarget"
                  placeholder="请输入抖音橱窗付费预算"
                  type="number"
                  number
                />
              </FormItem>
            </Col>
          </Row>
        </div>
        <div class="bor">
          <Row :gutter="30">
            <Col span="8">
              <FormItem
                label="视频号发布目标"
                prop="videoReleaseTarget"
                :rules="[
                  {
                    required: true,
                    message: '视频号发布目标(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="视频号发布目标"
              >
                <Input
                  v-model="form.videoReleaseTarget"
                  placeholder="请输入视频号发布目标"
                  type="number"
                  number
                  @on-change="tikTokReleaseTargetChange"
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="视频号投流费用目标"
                prop="videoFlowinvestmentTarget"
                :rules="[
                  {
                    required: true,
                    message: '视频号投流费用目标(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="视频号投流费用目标"
              >
                <Input
                  v-model="form.videoFlowinvestmentTarget"
                  placeholder="请输入视频号投流费用目标"
                  type="number"
                  number
                  @on-change="zhihuFlowinvestmentTargetChange"
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="视频号涨粉目标"
                prop="videoIncreaseFansTarget"
                :rules="[
                  {
                    required: true,
                    message: '视频号涨粉目标(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="视频号涨粉目标"
              >
                <Input
                  v-model="form.videoIncreaseFansTarget"
                  placeholder="请输入视频号涨粉目标"
                  type="number"
                  number
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="视频号涨粉付费预算"
                prop="videoIncreaseFansFeesTarget"
                :rules="[
                  {
                    required: true,
                    message: '视频号涨粉付费预算(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="视频号涨粉付费预算"
              >
                <Input
                  v-model="form.videoIncreaseFansFeesTarget"
                  placeholder="请输入视频号涨粉付费预算"
                  type="number"
                  number
                />
              </FormItem>
            </Col>
            <!-- <Col span="8">
              <FormItem
                label="视频号涨粉成本目标"
                prop="videoIncreaseFansFeesCostTarget"
                :rules="[
                  {
                    required: true,
                    message: '视频号涨粉成本目标(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="视频号涨粉成本目标"
              >
                <Input
                  v-model="form.videoIncreaseFansFeesCostTarget"
                  placeholder="请输入视频号涨粉成本目标"
                  type="number"
                  number
                />
              </FormItem>
            </Col> -->
            <Col span="8">
              <FormItem
                label="视频号线索量目标"
                prop="videoCluesTarget"
                :rules="[
                  {
                    required: true,
                    message: '视频号线索量目标(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="视频号线索量目标"
              >
                <Input
                  v-model="form.videoCluesTarget"
                  placeholder="请输入视频号线索量目标"
                  type="number"
                  number
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="视频号橱窗收入目标"
                prop="videoShowcaseIncomeTarget"
                :rules="[
                  {
                    required: true,
                    message: '视频号橱窗收入目标(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="视频号橱窗收入目标"
              >
                <Input
                  v-model="form.videoShowcaseIncomeTarget"
                  placeholder="请输入视频号橱窗收入目标"
                  type="number"
                  number
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="视频号橱窗付费预算"
                prop="videoShowCaseFeeTarget"
                :rules="[
                  {
                    required: true,
                    message: '视频号橱窗付费预算(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="视频号橱窗付费预算"
              >
                <Input
                  v-model="form.videoShowCaseFeeTarget"
                  placeholder="请输入视频号橱窗付费预算"
                  type="number"
                  number
                />
              </FormItem>
            </Col>
          </Row>
        </div>
        <div class="bor">
          <Row :gutter="30">
            <Col span="8">
              <FormItem
                label="小红书发布目标"
                prop="xiaoHongShuReleaseTarget"
                :rules="[
                  {
                    required: true,
                    message: '小红书发布目标(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="小红书发布目标"
              >
                <Input
                  v-model="form.xiaoHongShuReleaseTarget"
                  placeholder="请输入小红书发布目标"
                  type="number"
                  number
                  @on-change="tikTokReleaseTargetChange"
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="小红书投流费用目标"
                prop="xiaoHongShuFlowinvestmentTarget"
                :rules="[
                  {
                    required: true,
                    message: '小红书投流费用目标(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="小红书投流费用目标"
              >
                <Input
                  v-model="form.xiaoHongShuFlowinvestmentTarget"
                  placeholder="请输入小红书投流费用目标"
                  type="number"
                  number
                  @on-change="zhihuFlowinvestmentTargetChange"
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="小红书涨粉目标"
                prop="xiaoHongShuIncreaseFansTarget"
                :rules="[
                  {
                    required: true,
                    message: '小红书涨粉目标(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="小红书涨粉目标"
              >
                <Input
                  v-model="form.xiaoHongShuIncreaseFansTarget"
                  placeholder="请输入小红书涨粉目标"
                  type="number"
                  number
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="小红书涨粉付费预算"
                prop="xiaoHongShuIncreaseFansFeesTarget"
                :rules="[
                  {
                    required: true,
                    message: '小红书涨粉付费预算(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="小红书涨粉付费预算"
              >
                <Input
                  v-model="form.xiaoHongShuIncreaseFansFeesTarget"
                  placeholder="请输入小红书涨粉付费预算"
                  type="number"
                  number
                />
              </FormItem>
            </Col>
            <!-- <Col span="8">
              <FormItem
                label="小红书涨粉成本目标"
                prop="xiaoHongShuIncreaseFansFeesCostTarget"
                :rules="[
                  {
                    required: true,
                    message: '小红书涨粉成本目标(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="小红书涨粉成本目标"
              >
                <Input
                  v-model="form.xiaoHongShuIncreaseFansFeesCostTarget"
                  placeholder="请输入小红书涨粉成本目标"
                  type="number"
                  number
                />
              </FormItem>
            </Col> -->
            <Col span="8">
              <FormItem
                label="小红书线索量目标"
                prop="xiaoHongShuCluesTarget"
                :rules="[
                  {
                    required: true,
                    message: '小红书线索量目标(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="小红书线索量目标"
              >
                <Input
                  v-model="form.xiaoHongShuCluesTarget"
                  placeholder="请输入小红书线索量目标"
                  type="number"
                  number
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="小红书橱窗收入目标"
                prop="xiaoHongShuShowcaseIncomeTarget"
                :rules="[
                  {
                    required: true,
                    message: '小红书橱窗收入目标(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="小红书橱窗收入目标"
              >
                <Input
                  v-model="form.xiaoHongShuShowcaseIncomeTarget"
                  placeholder="请输入小红书橱窗收入目标"
                  type="number"
                  number
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="小红书橱窗付费预算"
                prop="xiaoHongShuShowCaseFeeTarget"
                :rules="[
                  {
                    required: true,
                    message: '小红书橱窗付费预算(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="小红书橱窗付费预算"
              >
                <Input
                  v-model="form.xiaoHongShuShowCaseFeeTarget"
                  placeholder="请输入小红书橱窗付费预算"
                  type="number"
                  number
                />
              </FormItem>
            </Col>
          </Row>
        </div>
        <div class="bor">
          <Row :gutter="30">
            <Col span="8">
              <FormItem
                label="知乎发布目标"
                prop="zhihuReleaseTarget"
                :rules="[
                  {
                    required: true,
                    message: '知乎发布目标(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="知乎发布目标"
              >
                <Input
                  v-model="form.zhihuReleaseTarget"
                  placeholder="请输入知乎发布目标"
                  type="number"
                  number
                  @on-change="tikTokReleaseTargetChange"
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="知乎投流费用目标"
                prop="zhihuFlowinvestmentTarget"
                :rules="[
                  {
                    required: true,
                    message: '知乎投流费用目标(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="知乎投流费用目标"
              >
                <Input
                  v-model="form.zhihuFlowinvestmentTarget"
                  placeholder="请输入知乎投流费用目标"
                  type="number"
                  number
                  @on-change="zhihuFlowinvestmentTargetChange"
                />
              </FormItem>
            </Col>
          </Row>
        </div>
        <div class="bor">
          <Row :gutter="30">
            <Col span="8">
              <FormItem
                label="微博发布目标"
                prop="sinaWeiBoReleaseTarget"
                :rules="[
                  {
                    required: true,
                    message: '微博发布目标(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="微博发布目标"
              >
                <Input
                  v-model="form.sinaWeiBoReleaseTarget"
                  placeholder="请输入微博发布目标"
                  type="number"
                  number
                  @on-change="tikTokReleaseTargetChange"
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="微博投流费用目标"
                prop="sinaWeiBoFlowinvestmentTarget"
                :rules="[
                  {
                    required: true,
                    message: '微博投流费用目标(最小是1)',
                    trigger: 'change',
                    type: 'number',
                    min: 1,
                  },
                ]"
                key="微博投流费用目标"
              >
                <Input
                  v-model="form.sinaWeiBoFlowinvestmentTarget"
                  placeholder="请输入微博投流费用目标"
                  type="number"
                  number
                  @on-change="zhihuFlowinvestmentTargetChange"
                />
              </FormItem>
            </Col>

            <Spin fix v-if="isflag == true">
              <Icon
                type="ios-loading"
                size="18"
                class="demo-spin-icon-load"
              ></Icon>
              <div>加载中...</div>
            </Spin>
          </Row>
        </div>
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
      isflag: false,
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

        // 运营咨询（直播前）
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
            title: "运营渠道投流费用目标",
            key: "flowInvestmentTarget",
            minWidth: 190,
            align: "center",
          },
          {
            title: "月累计运营渠道投流数量",
            key: "cumulativeFlowInvestment",
            minWidth: 200,
            align: "center",
          },
          {
            title: "运营渠道投流完成率",
            key: "flowInvestmentCompleteRate",
            minWidth: 170,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.flowInvestmentCompleteRate + "%");
            },
          },
          {
            title: "抖音发布目标",
            key: "tikTokReleaseTarget",
            minWidth: 130,
            align: "center",
          },
          {
            title: "月累计抖音发布条数",
            key: "cumulativeTikTokRelease",
            minWidth: 170,
            align: "center",
          },
          {
            title: "抖音发布目标完成率",
            key: "tikTokReleaseCompleteRate",
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.tikTokReleaseCompleteRate + "%");
            },
          },
          {
            title: "抖音投流费用目标",
            key: "tikTokFlowinvestmentTarget",
            minWidth: 150,
            align: "center",
          },
          {
            title: "累计抖音投流费用",
            key: "cumulativeTikTokFlowinvestment",
            minWidth: 170,
            align: "center",
          },
          {
            title: "抖音投流费用完成率",
            key: "tikTokFlowinvestmentCompleteRate",
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.tikTokFlowinvestmentCompleteRate + "%"
              );
            },
          },
          
          {
            title: "抖音涨粉目标",
            key: "tikTokIncreaseFansTarget",
            minWidth: 130,
            align: "center",
          },
          {
            title: "抖音涨粉累计",
            key: "cumulativeTikTokIncreaseFans",
            minWidth: 140,
            align: "center",
          },
          {
            title: "抖音涨粉目标完成率",
            key: "tikTokIncreaseFanseCompleteRate",
            minWidth: 170,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.tikTokIncreaseFanseCompleteRate + "%");
            },
          },
          {
            title: "抖音涨粉付费预算",
            key: "tikTokIncreaseFansFeesTarget",
            minWidth: 190,
            align: "center",
          },
          {
            title: "抖音涨粉付费累计",
            key: "cumulativeTikTokIncreaseFansFees",
            minWidth: 200,
            align: "center",
          },
          {
            title: "抖音涨粉付费预算完成率",
            key: "tikTokIncreaseFansFeesCompleteRate",
            minWidth: 200,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.tikTokIncreaseFansFeesCompleteRate + "%"
              );
            },
          },
          {
            title: "抖音涨粉成本目标",
            key: "tikTokIncreaseFansFeesCostTarget",
            minWidth: 150,
            align: "center",
          },
          {
            title: "抖音涨粉成本累计",
            key: "cumulativeTikTokIncreaseFansFeesCost",
            minWidth: 150,
            align: "center",
          },
          {
            title: "抖音涨粉成本",
            key: "tikTokIncreaseFansFeesCostCompleteRate",
            minWidth: 170,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.tikTokIncreaseFansFeesCostCompleteRate + "%"
              );
            },
          },
          {
            title: "抖音线索量目标",
            key: "tikTokCluesTarget",
            minWidth: 150,
            align: "center",
          },
          {
            title: "抖音线索累计",
            key: "cumulativeTikTokClues",
            minWidth: 140,
            align: "center",
          },
          {
            title: "抖音线索目标完成率",
            key: "tikTokCluesCompleteRate",
            minWidth: 170,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.tikTokCluesCompleteRate + "%");
            },
          },
          {
            title: "抖音橱窗收入目标",
            key: "tikTokShowcaseIncomeTarget",
            minWidth: 150,
            align: "center",
          },
          {
            title: "累计抖音橱窗收入",
            key: "cumulativeTikTokShowcaseIncome",
            minWidth: 170,
            align: "center",
          },
          {
            title: "抖音橱窗收入完成率",
            key: "tikTokShowcaseIncomeCompleteRate",
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.tikTokShowcaseIncomeCompleteRate + "%"
              );
            },
          },
          {
            title: "抖音橱窗付费预算",
            key: "tikTokShowCaseFeeTarget",
            minWidth: 150,
            align: "center",
          },
          {
            title: "抖音橱窗付费累计",
            key: "cumulativeTikTokShowCaseFee",
            minWidth: 170,
            align: "center",
          },
          {
            title: "抖音橱窗付费目标完成率",
            key: "tikTokShowCaseFeeCompleteRate",
            minWidth: 200,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.tikTokShowCaseFeeCompleteRate + "%"
              );
            },
          },
          {
            title: "视频号发布目标",
            key: "videoReleaseTarget",
            minWidth: 150,
            align: "center",
          },
          {
            title: "月累计视频号发布条数",
            key: "cumulativeVideoRelease",
            minWidth: 190,
            align: "center",
          },
          {
            title: "视频号发布目标完成率",
            key: "videoReleaseCompleteRate",
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.videoReleaseCompleteRate + "%");
            },
          },
          {
            title: "视频号投流费用目标",
            key: "videoFlowinvestmentTarget",
            minWidth: 170,
            align: "center",
          },
          {
            title: "累计视频号投流费用",
            key: "cumulativeVideoFlowinvestment",
            minWidth: 170,
            align: "center",
          },
          {
            title: "视频号投流费用完成率",
            key: "videoFlowinvestmentCompleteRate",
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.videoFlowinvestmentCompleteRate + "%");
            },
          },
          {
            title: "视频号涨粉目标",
            key: "videoIncreaseFansTarget",
            minWidth: 150,
            align: "center",
          },
          {
            title: "视频号涨粉累计",
            key: "cumulativeVideoIncreaseFans",
            minWidth: 140,
            align: "center",
          },
          {
            title: "视频号涨粉目标完成率",
            key: "videoIncreaseFanseCompleteRate",
            minWidth: 190,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.videoIncreaseFanseCompleteRate + "%");
            },
          },
          {
            title: "视频号涨粉付费预算",
            key: "videoIncreaseFansFeesTarget",
            minWidth: 180,
            align: "center",
          },
          {
            title: "视频号涨粉付费累计",
            key: "cumulativeVideoIncreaseFansFees",
            minWidth: 180,
            align: "center",
          },
          {
            title: "视频号涨粉付费预算完成率",
            key: "videoIncreaseFansFeesCompleteRate",
            minWidth: 210,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.videoIncreaseFansFeesCompleteRate + "%"
              );
            },
          },
          {
            title: "视频号涨粉成本目标",
            key: "videoIncreaseFansFeesCostTarget",
            minWidth: 180,
            align: "center",
          },
          {
            title: "视频号涨粉成本累计",
            key: "cumulativeVideoIncreaseFansFeesCost",
            minWidth: 180,
            align: "center",
          },
          {
            title: "视频号涨粉成本完成率",
            key: "videoIncreaseFansFeesCostCompleteRate",
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.videoIncreaseFansFeesCostCompleteRate + "%"
              );
            },
          },
          {
            title: "视频号线索量目标",
            key: "videoCluesTarget",
            minWidth: 180,
            align: "center",
          },
          {
            title: "视频号线索累计",
            key: "cumulativeVideoClues",
            minWidth: 180,
            align: "center",
          },
          {
            title: "视频号线索目标完成率",
            key: "videoCluesCompleteRate",
            minWidth: 190,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.videoCluesCompleteRate + "%");
            },
          },
          {
            title: "视频号橱窗收入目标",
            key: "videoShowcaseIncomeTarget",
            minWidth: 170,
            align: "center",
          },
          {
            title: "视频号橱窗收入累计",
            key: "cumulativeVideoShowcaseIncome",
            minWidth: 180,
            align: "center",
          },
          {
            title: "视频号橱窗收入目标完成率",
            key: "videoShowcaseIncomeCompleteRate",
            minWidth: 210,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.videoShowcaseIncomeCompleteRate + "%");
            },
          },
          {
            title: "视频号橱窗付费预算",
            key: "videoShowCaseFeeTarget",
            minWidth: 170,
            align: "center",
          },
          {
            title: "视频号橱窗付费累计",
            key: "cumulativeVideoShowCaseFee",
            minWidth: 180,
            align: "center",
          },
          {
            title: "视频号橱窗付费目标完成率",
            key: "videoShowCaseFeeCompleteRate",
            minWidth: 210,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.videoShowCaseFeeCompleteRate + "%");
            },
          },
          {
            title: "小红书发布目标",
            key: "xiaoHongShuReleaseTarget",
            minWidth: 170,
            align: "center",
          },
          {
            title: "月累计小红书发布条数",
            key: "cumulativeXiaoHongShuRelease",
            minWidth: 180,
            align: "center",
          },
          {
            title: "小红书发布目标完成率",
            key: "xiaoHongShuReleaseCompleteRate",
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.xiaoHongShuReleaseCompleteRate + "%");
            },
          },
          {
            title: "小红书投流费用目标",
            key: "xiaoHongShuFlowinvestmentTarget",
            minWidth: 170,
            align: "center",
          },
          {
            title: "累计小红书投流费用",
            key: "cumulativeXiaoHongShuFlowinvestment",
            minWidth: 180,
            align: "center",
          },
          {
            title: "小红书投流费用完成率",
            key: "xiaoHongShuFlowinvestmentCompleteRate",
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.xiaoHongShuFlowinvestmentCompleteRate + "%"
              );
            },
          },
          {
            title: "小红书涨粉目标",
            key: "xiaoHongShuIncreaseFansTarget",
            minWidth: 150,
            align: "center",
          },
          {
            title: "小红书涨粉累计",
            key: "cumulativeXiaoHongShuIncreaseFans",
            minWidth: 140,
            align: "center",
          },
          {
            title: "小红书涨粉目标完成率",
            key: "xiaoHongShuIncreaseFanseCompleteRate",
            minWidth: 190,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.xiaoHongShuIncreaseFanseCompleteRate + "%"
              );
            },
          },
          {
            title: "小红书涨粉付费预算",
            key: "xiaoHongShuIncreaseFansFeesTarget",
            minWidth: 180,
            align: "center",
          },
          {
            title: "小红书涨粉付费累计",
            key: "cumulativeXiaoHongShuIncreaseFansFees",
            minWidth: 180,
            align: "center",
          },
          {
            title: "小红书涨粉付费预算完成率",
            key: "xiaoHongShuIncreaseFansFeesCompleteRate",
            minWidth: 210,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.xiaoHongShuIncreaseFansFeesCompleteRate + "%"
              );
            },
          },
          {
            title: "小红书涨粉成本目标",
            key: "xiaoHongShuIncreaseFansFeesCostTarget",
            minWidth: 180,
            align: "center",
          },
          {
            title: "小红书涨粉成本累计",
            key: "cumulativeXiaoHongShuIncreaseFansFeesCost",
            minWidth: 180,
            align: "center",
          },
          {
            title: "小红书涨粉成本完成率",
            key: "xiaoHongShuIncreaseFansFeesCostCompleteRate",
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.xiaoHongShuIncreaseFansFeesCostCompleteRate + "%"
              );
            },
          },
          {
            title: "小红书线索量目标",
            key: "xiaoHongShuCluesTarget",
            minWidth: 180,
            align: "center",
          },
          {
            title: "小红书线索累计",
            key: "cumulativeXiaoHongShuClues",
            minWidth: 180,
            align: "center",
          },
          {
            title: "小红书线索目标完成率",
            key: "xiaoHongShuCluesCompleteRate",
            minWidth: 190,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.xiaoHongShuCluesCompleteRate + "%");
            },
          },
          {
            title: "小红书橱窗收入目标",
            key: "xiaoHongShuShowcaseIncomeTarget",
            minWidth: 170,
            align: "center",
          },
          {
            title: "小红书橱窗收入累计",
            key: "cumulativeXiaoHongShuShowcaseIncome",
            minWidth: 180,
            align: "center",
          },
          {
            title: "小红书橱窗收入目标完成率",
            key: "xiaoHongShuShowcaseIncomeCompleteRate",
            minWidth: 210,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.xiaoHongShuShowcaseIncomeCompleteRate + "%"
              );
            },
          },
          {
            title: "小红书橱窗付费预算",
            key: "xiaoHongShuShowCaseFeeTarget",
            minWidth: 170,
            align: "center",
          },
          {
            title: "小红书橱窗付费累计",
            key: "cumulativeXiaoHongShuShowCaseFee",
            minWidth: 180,
            align: "center",
          },
          {
            title: "小红书橱窗付费目标完成率",
            key: "xiaoHongShuShowCaseFeeCompleteRate",
            minWidth: 230,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.xiaoHongShuShowCaseFeeCompleteRate + "%"
              );
            },
          },

          
          {
            title: "知乎发布目标",
            key: "zhihuReleaseTarget",
            minWidth: 130,
            align: "center",
          },
          {
            title: "月累计知乎发布条数",
            key: "cumulativeZhihuRelease",
            minWidth: 170,
            align: "center",
          },
          {
            title: "知乎发布目标完成率",
            key: "zhihuReleaseCompleteRate",
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.zhihuReleaseCompleteRate + "%");
            },
          },
          {
            title: "知乎投流费用目标",
            key: "zhihuFlowinvestmentTarget",
            minWidth: 160,
            align: "center",
          },
          {
            title: "累计知乎投流费用",
            key: "cumulativeZhihuFlowinvestment",
            minWidth: 170,
            align: "center",
          },
          {
            title: "知乎投流费用完成率",
            key: "zhihuFlowinvestmentCompleteRate",
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.zhihuFlowinvestmentCompleteRate + "%");
            },
          },
          {
            title: "微博发布目标",
            key: "sinaWeiBoReleaseTarget",
            minWidth: 130,
            align: "center",
          },
          {
            title: "月累计微博发布条数",
            key: "cumulativeSinaWeiBoRelease",
            minWidth: 170,
            align: "center",
          },
          {
            title: "微博发布目标完成率",
            key: "sinaWeiBoReleaseCompleteRate",
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.sinaWeiBoReleaseCompleteRate + "%");
            },
          },
          {
            title: "微博投流费用目标",
            key: "sinaWeiBoFlowinvestmentTarget",
            minWidth: 150,
            align: "center",
          },
          {
            title: "累计微博投流费用",
            key: "cumulativeSinaWeiBoFlowinvestment",
            minWidth: 170,
            align: "center",
          },
          {
            title: "微博投流费用完成率",
            key: "sinaWeiBoFlowinvestmentCompleteRate",
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.sinaWeiBoFlowinvestmentCompleteRate + "%"
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
                        api
                          .byIdLiveAnchorMonthlyTargetBeforeLiving(id)
                          .then((res) => {
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
                                // 知乎发布目标
                                zhihuReleaseTarget,
                                // 知乎投流费用目标
                                zhihuFlowinvestmentTarget,
                                // 抖音发布目标
                                tikTokReleaseTarget,
                                // 抖音投流费用目标
                                tikTokFlowinvestmentTarget,
                                // 视频号发布目标
                                videoReleaseTarget,
                                // 视频号投流费用目标
                                videoFlowinvestmentTarget,
                                // 小红书发布目标
                                xiaoHongShuReleaseTarget,
                                // 小红书投流费用目标
                                xiaoHongShuFlowinvestmentTarget,
                                // 微博发布目标
                                sinaWeiBoReleaseTarget,
                                // 微博投流费用目标
                                sinaWeiBoFlowinvestmentTarget,
                                // 月发布目标
                                releaseTarget,
                                // 投流目标
                                flowInvestmentTarget,
                                // 抖音橱窗收入目标
                                tikTokShowcaseIncomeTarget,
                                // 抖音涨粉目标
                                tikTokIncreaseFansTarget,
                                // 抖音涨粉付费预算
                                tikTokIncreaseFansFeesTarget,
                                // 抖音涨粉成本目标
                                // tikTokIncreaseFansFeesCostTarget,
                                // 抖音线索量目标
                                tikTokCluesTarget,
                                // 小红书涨粉目标
                                xiaoHongShuIncreaseFansTarget,
                                // 小红书涨粉付费预算
                                xiaoHongShuIncreaseFansFeesTarget,
                                // 小红书涨粉成本目标
                                // xiaoHongShuIncreaseFansFeesCostTarget,
                                // 小红书线索量目标
                                xiaoHongShuCluesTarget,
                                // 小红书橱窗收入目标
                                xiaoHongShuShowcaseIncomeTarget,
                                // 视频号涨粉目标
                                videoIncreaseFansTarget,
                                // 视频号涨粉付费预算
                                videoIncreaseFansFeesTarget,
                                // 视频号涨粉成本目标
                                // videoIncreaseFansFeesCostTarget,
                                // 视频号线索量目标
                                videoCluesTarget,
                                // 视频号橱窗收入目标
                                videoShowcaseIncomeTarget,
                                // 小红书橱窗付费
                                xiaoHongShuShowCaseFeeTarget,
                                // 视频号橱窗付费
                                videoShowCaseFeeTarget,
                                // 抖音橱窗付费
                                tikTokShowCaseFeeTarget,
        

                              } = res.data.liveAnchorMonthlyTargetBeforeLivingInfo;
                              this.contentPlateChange(contentPlatFormId);
                              this.form.id = id;
                              this.isEdit = true;
                              this.form.year = String(year);
                              this.form.month = month;
                              this.form.monthlyTargetName = monthlyTargetName;
                              this.form.tikTokShowcaseIncomeTarget = tikTokShowcaseIncomeTarget;
                              this.form.contentPlatFormId = contentPlatFormId;
                              this.form.liveAnchorId = liveAnchorId;
                              this.form.zhihuReleaseTarget = zhihuReleaseTarget;
                              this.form.tikTokReleaseTarget = tikTokReleaseTarget;
                              this.form.xiaoHongShuReleaseTarget = xiaoHongShuReleaseTarget;
                              this.form.sinaWeiBoReleaseTarget = sinaWeiBoReleaseTarget;
                              this.form.zhihuFlowinvestmentTarget = zhihuFlowinvestmentTarget;
                              this.form.videoReleaseTarget = videoReleaseTarget;
                              this.form.videoFlowinvestmentTarget = videoFlowinvestmentTarget;
                              this.form.tikTokFlowinvestmentTarget = tikTokFlowinvestmentTarget;
                              this.form.xiaoHongShuFlowinvestmentTarget = xiaoHongShuFlowinvestmentTarget;
                              this.form.sinaWeiBoFlowinvestmentTarget = sinaWeiBoFlowinvestmentTarget;
                              this.form.releaseTarget = releaseTarget;
                              this.form.flowInvestmentTarget = flowInvestmentTarget;
                              this.controlModal = true;
                              this.form.tikTokIncreaseFansTarget = tikTokIncreaseFansTarget;
                              this.form.tikTokIncreaseFansFeesTarget = tikTokIncreaseFansFeesTarget;
                              // this.form.tikTokIncreaseFansFeesCostTarget = tikTokIncreaseFansFeesCostTarget;
                              this.form.tikTokCluesTarget = tikTokCluesTarget;
                              this.form.xiaoHongShuIncreaseFansTarget = xiaoHongShuIncreaseFansTarget;
                              this.form.xiaoHongShuIncreaseFansFeesTarget = xiaoHongShuIncreaseFansFeesTarget;
                              // this.form.xiaoHongShuIncreaseFansFeesCostTarget = xiaoHongShuIncreaseFansFeesCostTarget;
                              this.form.xiaoHongShuCluesTarget = xiaoHongShuCluesTarget;
                              this.form.xiaoHongShuShowcaseIncomeTarget = xiaoHongShuShowcaseIncomeTarget;
                              this.form.videoIncreaseFansTarget = videoIncreaseFansTarget;
                              this.form.videoIncreaseFansFeesTarget = videoIncreaseFansFeesTarget;
                              this.form.xiaoHongShuShowCaseFeeTarget = xiaoHongShuShowCaseFeeTarget;
                              this.form.videoShowCaseFeeTarget = videoShowCaseFeeTarget;
                              this.form.tikTokShowCaseFeeTarget = tikTokShowCaseFeeTarget;
                              // this.form.videoIncreaseFansFeesCostTarget = videoIncreaseFansFeesCostTarget;
                              this.form.videoCluesTarget = videoCluesTarget;
                              this.form.videoShowcaseIncomeTarget = videoShowcaseIncomeTarget;
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
                              .deleteLiveAnchorMonthlyTargetBeforeLiving(id)
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
        // 知乎发布目标
        zhihuReleaseTarget: 1,
        // 知乎投流费用目标
        zhihuFlowinvestmentTarget: 1,
        // 视频号发布目标
        videoReleaseTarget: 1,
        // 视频号投流费用目标
        videoFlowinvestmentTarget: 1,
        // 抖音发布目标
        tikTokReleaseTarget: 1,
        // 抖音投流费用目标
        tikTokFlowinvestmentTarget: 1,
        // 小红书发布目标
        xiaoHongShuReleaseTarget: 1,
        // 小红书投流费用目标
        xiaoHongShuFlowinvestmentTarget: 1,
        // 微博发布目标
        sinaWeiBoReleaseTarget: 1,
        // 微博投流费用目标
        sinaWeiBoFlowinvestmentTarget: 1,
        // 月发布目标
        releaseTarget: 1,
        // 投流目标
        flowInvestmentTarget: 1,
        // 抖音橱窗收入目标
        tikTokShowcaseIncomeTarget: 1,
        // 抖音投流费用目标
        tikTokFlowinvestmentTarget: 1,
        id: "",
        // 抖音涨粉目标
        tikTokIncreaseFansTarget: 1,
        // 抖音涨粉付费预算
        tikTokIncreaseFansFeesTarget: 1,
        // 抖音涨粉成本目标
        // tikTokIncreaseFansFeesCostTarget: 1,
        // 抖音线索量目标
        tikTokCluesTarget: 1,
        // 抖音橱窗付费
        tikTokShowCaseFeeTarget: 1,
        // 小红书涨粉目标
        xiaoHongShuIncreaseFansTarget: 1,
        // 小红书涨粉付费预算
        xiaoHongShuIncreaseFansFeesTarget: 1,
        // 小红书涨粉成本目标
        // xiaoHongShuIncreaseFansFeesCostTarget: 1,
        // 小红书线索量目标
        xiaoHongShuCluesTarget: 1,
        // 小红书橱窗收入目标
        xiaoHongShuShowcaseIncomeTarget: 1,
        // 小红书橱窗付费
        xiaoHongShuShowCaseFeeTarget: 1,
        // 视频号涨粉目标
        videoIncreaseFansTarget: 1,
        // 视频号涨粉付费预算
        videoIncreaseFansFeesTarget: 1,
        // 视频号涨粉成本目标
        // videoIncreaseFansFeesCostTarget: 1,
        // 视频号线索量目标
        videoCluesTarget: 1,
        // 视频号橱窗收入目标
        videoShowcaseIncomeTarget: 1,
        // 视频号橱窗付费
        videoShowCaseFeeTarget: 1,
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

        flowInvestmentTarget: [
          {
            required: true,
            message: "请输入运营渠道投流费用目标",
          },
        ],
      },
    };
  },
  methods: {
    // 计算运营渠道投流费用目标
    zhihuFlowinvestmentTargetChange() {
      this.form.flowInvestmentTarget =
        Number(this.form.zhihuFlowinvestmentTarget) +
        Number(this.form.videoFlowinvestmentTarget) +
        Number(this.form.tikTokFlowinvestmentTarget) +
        Number(this.form.xiaoHongShuFlowinvestmentTarget) +
        Number(this.form.sinaWeiBoFlowinvestmentTarget);
      this.form.flowInvestmentTarget =
        Math.floor(this.form.flowInvestmentTarget * 100) / 100;
    },
    // 计算月发布目标
    tikTokReleaseTargetChange() {
      this.form.releaseTarget =
        Number(this.form.zhihuReleaseTarget) +
        Number(this.form.xiaoHongShuReleaseTarget) +
        Number(this.form.sinaWeiBoReleaseTarget) +
        Number(this.form.tikTokReleaseTarget) +
        Number(this.form.videoReleaseTarget);
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
        api.getLiveAnchorMonthlyTargetBeforeLiving(data).then((res) => {
          if (res.code === 0) {
            const {
              list,
              totalCount,
            } = res.data.liveAnchorMonthlyTargetBeforeLivingInfo;
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
      api.getLiveAnchorMonthlyTargetBeforeLiving(data).then((res) => {
        if (res.code === 0) {
          const {
            list,
            totalCount,
          } = res.data.liveAnchorMonthlyTargetBeforeLivingInfo;
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
            this.isflag = true;
            // 修改
            api
              .editLiveAnchorMonthlyTargetBeforeLiving(this.form)
              .then((res) => {
                if (res.code === 0) {
                  this.isflag = false;
                  this.isEdit = false;
                  this.cancelSubmit("form");
                  this.getLiveAnchorMonthlyTargetInfo();
                  this.$Message.success({
                    content: "修改成功",
                    duration: 3,
                  });
                } else {
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
              zhihuReleaseTarget,
              zhihuFlowinvestmentTarget,
              videoReleaseTarget,
              videoFlowinvestmentTarget,
              tikTokReleaseTarget,
              tikTokFlowinvestmentTarget,
              xiaoHongShuReleaseTarget,
              xiaoHongShuFlowinvestmentTarget,
              sinaWeiBoReleaseTarget,
              sinaWeiBoFlowinvestmentTarget,
              releaseTarget,
              flowInvestmentTarget,
              tikTokShowcaseIncomeTarget,
              tikTokIncreaseFansTarget,
              tikTokIncreaseFansFeesTarget,
              // tikTokIncreaseFansFeesCostTarget,
              tikTokCluesTarget,
              xiaoHongShuIncreaseFansTarget,
              xiaoHongShuIncreaseFansFeesTarget,
              // xiaoHongShuIncreaseFansFeesCostTarget,
              xiaoHongShuCluesTarget,
              xiaoHongShuShowcaseIncomeTarget,
              videoIncreaseFansTarget,
              videoIncreaseFansFeesTarget,
              // videoIncreaseFansFeesCostTarget,
              videoCluesTarget,
              videoShowcaseIncomeTarget,
              xiaoHongShuShowCaseFeeTarget,
              videoShowCaseFeeTarget,
              tikTokShowCaseFeeTarget,
            } = this.form;
            const data = {
              year: Number(this.$moment(new Date(year)).format("yyyy")),
              month,
              monthlyTargetName,
              liveAnchorId: Number(liveAnchorId),
              zhihuReleaseTarget,
              zhihuFlowinvestmentTarget,
              videoReleaseTarget,
              videoFlowinvestmentTarget,
              tikTokReleaseTarget,
              tikTokFlowinvestmentTarget,
              xiaoHongShuReleaseTarget,
              xiaoHongShuFlowinvestmentTarget,
              sinaWeiBoReleaseTarget,
              sinaWeiBoFlowinvestmentTarget,
              releaseTarget,
              flowInvestmentTarget,
              tikTokShowcaseIncomeTarget,
              tikTokIncreaseFansTarget,
              tikTokIncreaseFansFeesTarget,
              // tikTokIncreaseFansFeesCostTarget,
              tikTokCluesTarget,
              xiaoHongShuIncreaseFansTarget,
              xiaoHongShuIncreaseFansFeesTarget,
              // xiaoHongShuIncreaseFansFeesCostTarget,
              xiaoHongShuCluesTarget,
              xiaoHongShuShowcaseIncomeTarget,
              videoIncreaseFansTarget,
              videoIncreaseFansFeesTarget,
              // videoIncreaseFansFeesCostTarget,
              videoCluesTarget,
              videoShowcaseIncomeTarget,
              xiaoHongShuShowCaseFeeTarget,
              videoShowCaseFeeTarget,
              tikTokShowCaseFeeTarget,
            };
            this.isflag = true;
            // 添加
            api.AddLiveAnchorMonthlyTargetBeforeLiving(data).then((res) => {
              if (res.code === 0) {
                this.isflag = false;
                this.cancelSubmit("form");
                this.getLiveAnchorMonthlyTargetInfo();
                this.$Message.success({
                  content: "添加成功",
                  duration: 3,
                });
              } else {
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
    this.tikTokReleaseTargetChange();
    this.zhihuFlowinvestmentTargetChange();
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
.bor{
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px 10px 0px 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
</style>
