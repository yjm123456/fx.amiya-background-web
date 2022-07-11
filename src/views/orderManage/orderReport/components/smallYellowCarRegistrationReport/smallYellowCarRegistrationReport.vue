<template>
  <div>
    <Modal
      v-model="smallYellowCarRegistrationModels"
      title="小黄车登记报表"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="100%"
      fullscreen
    >
      <DatePicker
        type="date"
        placeholder="开始日期"
        style="width: 160px;"
        :value="query.startDate"
        v-model="query.startDate"
      ></DatePicker>
      <DatePicker
        type="date"
        placeholder="结束日期"
        style="width: 160px; margin-left: 10px"
        :value="query.endDate"
        v-model="query.endDate"
      ></DatePicker>
      <Select
        v-model="query.contentPlatFormId"
        placeholder="请选择渠道"
        @on-change="contentPlateChange(query.contentPlatFormId)"
        filterable
        style="width: 160px; margin-left: 10px"
      >
        <Option
          v-for="item in contentPalteForms"
          :value="item.id"
          :key="item.id"
          >{{ item.contentPlatformName }}</Option
        >
      </Select>
      <Select
        v-model="query.LiveAnchorId"
        placeholder="请选择主播IP账号"
        :disabled="query.contentPlatFormId === ''"
        filterable
        style="width: 160px; margin-left: 10px"
      >
        <Option v-for="item in liveAnchors" :value="item.id" :key="item.id">{{
          item.hostAccountName
        }}</Option>
      </Select>
      <Select
            v-model="query.isAddWechat"
            placeholder="请选择加v状态"
            filterable
            style="width: 140px; margin-left: 10px"
          >
            <Option
              v-for="item in isAddWeChatList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.isWriteOff"
            placeholder="请选择核销状态"
            filterable
            style="width: 140px; margin-left: 10px"
          >
            <Option
              v-for="item in isWriteOffList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.isConsultation"
            placeholder="请选择面诊状态"
            filterable
            style="width: 140px; margin-left: 10px"
          >
            <Option
              v-for="item in isConsultationList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.isReturnBackPrice"
            placeholder="请选择退款状态"
            filterable
            style="width: 140px; margin-left: 10px"
          >
            <Option
              v-for="item in isReturnBackPriceList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select>
      <Button
        type="primary"
        style="margin:0 10px"
        @click="getshoppingCartRegistrationReport"
        >查询</Button
      >
      <Button type="primary" @click="exportsendOrder">导出</Button>
      <Card class="container">
        <div>
          <Table
            border
            :columns="query.columns"
            :data="query.data"
            height="700"
          ></Table>
        </div>
      </Card>
      <div slot="footer" class=" foot">
        <div style="display:flex">
          <div class="num">
            合计下单金额：
            <div style="color:red">{{ priceNum }}</div>
          </div>
          <div class="num">
            总条数：
            <div style="color:red">{{ pageCount }}</div>
          </div>
        </div>
        <Button @click="cancelSubmits()">关闭页面</Button>
        <!-- <Button type="primary" @click="handleSubmit()">确定</Button> -->
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
import { download } from "@/utils/util";
export default {
  props: {
    smallYellowCarRegistrationModel: {
      type: Boolean,
    },
    contentPalteForms: Array,
  },
  data() {
    return {
        // 主播
        liveAnchors:[],
      smallYellowCarRegistrationModels: false,
      priceNum: 0,
      pageCount: 0,
      // 是否加v
        isAddWeChatList:[{
          type:-1,
          name:'全部加V状态'
        },{
          type:'true',
          name:'是'
        },{
          type:'false',
          name:'否'
        }],
        isWriteOffList:[{
          type:-1,
          name:'全部核销状态'
        },{
          type:'true',
          name:'是'
        },{
          type:'false',
          name:'否'
        }],
        isConsultationList:[{
          type:-1,
          name:'全部面诊状态'
        },{
          type:'true',
          name:'是'
        },{
          type:'false',
          name:'否'
        }],
        isReturnBackPriceList:[{
          type:-1,
          name:'全部退款状态'
        },{
          type:'true',
          name:'是'
        },{
          type:'false',
          name:'否'
        }],
      query: {
        isAddWechat:-1,
        isWriteOff:-1,
        isConsultation:-1,
        isReturnBackPrice:-1,
        contentPlatFormId: "",
        LiveAnchorId: "",
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        columns: [
          {
            title: "序号",
            key: "id",
            minWidth: 220,
          },

          {
            title: "登记日期",
            tooltip: true,
            minWidth: 180,
            key: "recordDate",
            render: (h, params) => {
              return h(
                "div",
                params.row.recordDate
                  ? this.$moment(params.row.recordDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : ""
              );
            },
          },
          {
            title: "渠道",
            key: "contentPlatFormName",
            minWidth: 100,
          },
          {
            title: "主播IP",
            key: "liveAnchorName",
            minWidth: 150,
          },
          {
            title: "主播微信号",
            key: "liveAnchorWechatNo",
            minWidth: 160,
          },
          {
            title: "客户抖音昵称",
            key: "customerNickName",
            minWidth: 160,
          },
          {
            title: "联系方式",
            key: "phone",
            minWidth: 160,
          },
          {
            title: "下单金额",
            key: "price",
            minWidth: 120,
          },
          {
            title: "面诊方式",
            key: "consultationTypeText",
            minWidth: 120,
            align: "center",
            // render: (h, params) => {
            //   return h(
            //     "div",
            //     params.row.consultationType == 1 ? "视频" : "图片"
            //   );
            // },
          },
          {
            title: "是否加V",
            key: "isAddWechat",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              if (params.row.isAddWechat == true) {
                return h("Icon", {
                  props: {
                    type: "md-checkmark",
                  },
                  style: {
                    fontSize: "18px",
                    color: "#559DF9",
                  },
                });
              } else {
                return h("Icon", {
                  props: {
                    type: "md-close",
                  },
                  style: {
                    fontSize: "18px",
                    color: "red",
                  },
                });
              }
            },
          },
          {
            title: "是否核销",
            key: "isWriteOff",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              if (params.row.isWriteOff == true) {
                return h("Icon", {
                  props: {
                    type: "md-checkmark",
                  },
                  style: {
                    fontSize: "18px",
                    color: "#559DF9",
                  },
                });
              } else {
                return h("Icon", {
                  props: {
                    type: "md-close",
                  },
                  style: {
                    fontSize: "18px",
                    color: "red",
                  },
                });
              }
            },
          },
          {
            title: "是否面诊",
            key: "isConsultation",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              if (params.row.isConsultation == true) {
                return h("Icon", {
                  props: {
                    type: "md-checkmark",
                  },
                  style: {
                    fontSize: "18px",
                    color: "#559DF9",
                  },
                });
              } else {
                return h("Icon", {
                  props: {
                    type: "md-close",
                  },
                  style: {
                    fontSize: "18px",
                    color: "red",
                  },
                });
              }
            },
          },

          {
            title: "是否退款",
            key: "isReturnBackPrice",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              if (params.row.isReturnBackPrice == true) {
                return h("Icon", {
                  props: {
                    type: "md-checkmark",
                  },
                  style: {
                    fontSize: "18px",
                    color: "#559DF9",
                  },
                });
              } else {
                return h("Icon", {
                  props: {
                    type: "md-close",
                  },
                  style: {
                    fontSize: "18px",
                    color: "red",
                  },
                });
              }
            },
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 200,
            align: "center",
          },
          {
            title: "创建人",
            key: "createBy",
            minWidth: 150,
            align: "center",
          },
          {
            title: "创建日期",
            key: "createDate",
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.createDate
                  ? this.$moment(params.row.createDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : ""
              );
            },
          },
        ],
        data: [],
      },
    };
  },
  methods: {
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
    // 小黄陈登记报表
    getshoppingCartRegistrationReport() {
      const { startDate, endDate, contentPlatFormId,LiveAnchorId,isAddWechat,isWriteOff,isConsultation,isReturnBackPrice} = this.query;
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD"),
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        contentPlatFormId,
        LiveAnchorId,
        isAddWechat:isAddWechat == -1 ? null : isAddWechat,
        isWriteOff:isWriteOff == -1 ? null : isWriteOff,
        isConsultation:isConsultation == -1 ? null : isConsultation,
        isReturnBackPrice:isReturnBackPrice == -1 ? null : isReturnBackPrice
      };
      if (!startDate || !endDate) {
        this.$Message.error("请选择日期");
        return;
      }
      api.shoppingCartRegistrationReport(data).then((res) => {
        if (res.code === 0) {
          const { OrderWriteOffReport } = res.data;
          this.query.data = OrderWriteOffReport;
          this.pageCount = this.query.data.length;
          let priceNum = 0;
          this.query.data.map((item, index) => {
            priceNum += Number(item.price);
          });
          this.priceNum = Math.floor(priceNum * 100) / 100;
        }
      });
    },
    // 导出
    exportsendOrder() {
      const { startDate, endDate, contentPlatFormId,LiveAnchorId,isAddWechat,isWriteOff,isConsultation,isReturnBackPrice} = this.query;
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD"),
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        contentPlatFormId,
        LiveAnchorId,
        isAddWechat:isAddWechat == -1 ? null : isAddWechat,
        isWriteOff:isWriteOff == -1 ? null : isWriteOff,
        isConsultation:isConsultation == -1 ? null : isConsultation,
        isReturnBackPrice:isReturnBackPrice == -1 ? null : isReturnBackPrice
      };
      if (!startDate || !endDate) {
        this.$Message.error("请选择日期");
        return;
      }
      if (this.query.data.length == 0) {
        this.$Message.error("没有数据时不支持导出");
        return;
      }
      api.shoppingCartRegistrationExport(data).then((res) => {
        let name =
          this.$moment(new Date(startDate)).format("YYYY-MM-DD") +
          "-" +
          this.$moment(new Date(endDate)).format("YYYY-MM-DD") +
          "小黄车登记报表";
        download(res, name);
      });
    },
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.query.data = [];
        this.query.startDate = this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD");
        this.query.endDate = this.$moment(new Date()).format("YYYY-MM-DD");
        this.pageCount = 0;
        this.priceNum = 0;
        this.query.contentPlatFormId = ''
        this.query.LiveAnchorId = ''
        this.$emit("update:smallYellowCarRegistrationModel", false);
      }
    },
    // 取消
    cancelSubmits(name) {
      this.isEdit = false;
      this.control = false;
      this.query.data = [];
      this.query.startDate = this.$moment()
        .startOf("month")
        .format("YYYY-MM-DD");
      this.query.endDate = this.$moment(new Date()).format("YYYY-MM-DD");
      this.pageCount = 0;
      this.priceNum = 0;
      this.query.contentPlatFormId = ''
      this.query.LiveAnchorId = ''
      this.$emit("update:smallYellowCarRegistrationModel", false);
    },
  },
  created() {
    // this.getsendOrderReport()
  },
  watch: {
    smallYellowCarRegistrationModel(value) {
      this.smallYellowCarRegistrationModels = value;
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
.num {
  margin-right: 20px;
  font-size: 18px;
  display: flex;
}
</style>
