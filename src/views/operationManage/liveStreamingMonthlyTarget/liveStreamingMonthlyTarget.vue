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
        :label-width="180"
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
              label="直播间投流费用目标"
              prop="livingRoomFlowInvestmentTarget"
              :rules="[
                {
                  required: true,
                  message: '直播间投流费用目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="直播间投流费用目标"
            >
              <Input
                v-model="form.livingRoomFlowInvestmentTarget"
                placeholder="请输入直播间投流费用目标"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="照片面诊卡下单数量目标"
              prop="consultationTarget"
              :rules="[
                {
                  required: true,
                  message: '照片面诊卡下单数量目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="照片面诊卡下单数量目标"
            >
              <Input
                v-model="form.consultationTarget"
                placeholder="照片面诊卡下单数量目标"
                type="number"
                number
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="视频面诊卡下单数量目标"
              prop="consultationTarget2"
              :rules="[
                {
                  required: true,
                  message: '视频面诊卡下单数量目标(最小是1)',
                  trigger: 'change',
                  type: 'number',
                  min: 1,
                },
              ]"
              key="视频面诊卡下单数量目标"
            >
              <Input
                v-model="form.consultationTarget2"
                placeholder="视频面诊卡下单数量目标"
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
        // 直播间（直播中）
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
            title: "直播间投流费用目标",
            key: "livingRoomFlowInvestmentTarget",
            minWidth: 170,
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
            title: "照片面诊卡下单数量目标",
            key: "consultationTarget",
            minWidth: 200,
            align: "center",
          },
          {
            title: "累计照片面诊卡下单数量",
            key: "cumulativeConsultation",
            minWidth: 200,
            align: "center",
          },
          {
            title: "照片面诊卡下单数量完成率",
            key: "consultationCompleteRate",
            minWidth: 230,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.consultationCompleteRate + "%");
            },
          },
          {
            title: "视频面诊卡下单数量目标",
            key: "consultationTarget2",
            minWidth: 200,
            align: "center",
          },
          {
            title: "累计视频面诊卡下单数量",
            key: "cumulativeConsultation2",
            minWidth: 200,
            align: "center",
          },
          {
            title: "视频面诊卡下单数量完成率",
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
                        api.byIdLiveAnchorMonthlyTargetLiving(id).then((res) => {
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
                                // 直播间投流费用目标
                              livingRoomFlowInvestmentTarget,
                                // 照片面诊卡目标
                              consultationTarget,
                                // 视频面诊卡目标
                              consultationTarget2,
                                // 带货结算佣金目标
                              cargoSettlementCommissionTarget,
                           
                            } = res.data.liveAnchorMonthlyTargetLivingInfo;
                            this.contentPlateChange(contentPlatFormId);
                            this.isEdit = true;
                            this.form.year = String(year);
                            this.form.month = month;
                            this.form.monthlyTargetName = monthlyTargetName;
                            this.form.contentPlatFormId = contentPlatFormId;
                            this.form.liveAnchorId = liveAnchorId;
                            this.form.livingRoomFlowInvestmentTarget = livingRoomFlowInvestmentTarget;
                            this.form.consultationTarget = consultationTarget;
                            this.form.consultationTarget2 = consultationTarget2;
                            this.form.cargoSettlementCommissionTarget = cargoSettlementCommissionTarget;
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
                              .deleteLiveAnchorMonthlyTargetLiving(id)
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
        // 直播间投流费用目标
        livingRoomFlowInvestmentTarget: null,
        // 照片面诊卡目标
        consultationTarget: null,
        // 视频面诊卡数量
        consultationTarget2: null,
        // 带货结算佣金目标
        cargoSettlementCommissionTarget: null,
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
        api.getLiveAnchorMonthlyTargetLiving(data).then((res) => {
          if (res.code === 0) {
            const { list, totalCount } = res.data.liveAnchorMonthlyTargetLivingInfo;
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
      api.getLiveAnchorMonthlyTargetLiving(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.liveAnchorMonthlyTargetLivingInfo;
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
            this.isflag = true
            // 修改
            api.editLiveAnchorMonthlyTargetLiving(this.form).then((res) => {
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
              livingRoomFlowInvestmentTarget,
              consultationTarget,
              cargoSettlementCommissionTarget,
              consultationTarget2,
            } = this.form;
            const data = {
              year: Number(this.$moment(new Date(year)).format("yyyy")),
              month,
              monthlyTargetName,
              liveAnchorId: Number(liveAnchorId),
              livingRoomFlowInvestmentTarget,
              consultationTarget,
              cargoSettlementCommissionTarget,
              consultationTarget2,
            };
            this.isflag = true
            // 添加
            api.AddLiveAnchorMonthlyTargetLiving(data).then((res) => {
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
