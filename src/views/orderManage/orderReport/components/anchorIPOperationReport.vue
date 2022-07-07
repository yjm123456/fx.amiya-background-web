<template>
  <div>
    <Modal
      v-model="anchorIPOperationReportModals"
      title="主播IP运营报表"
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
      <Button type="primary" style="margin:0 10px" @click="getliveAnchorOperatingReport">查询</Button>
      <Button type="primary" @click="exportsendOrder">导出</Button>
      <Card class="container">
        <div>
            <Table border :columns="query.columns" :data="query.data" height="700"></Table>
        </div>
       </Card>
        <div slot="footer" class=" foot">
          <div style="display:flex">
            <div class="num">总条数：<div style="color:red">{{pageCount}}</div></div>
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
    anchorIPOperationReportModal: {
        type: Boolean,
    },
  },
  data() {
    return{
        anchorIPOperationReportModals:false,
        pageCount:0,
        query:{
          startDate:this.$moment().subtract(1, "days").format("YYYY-MM-DD"),
          endDate:this.$moment().subtract(1, "days").format("YYYY-MM-DD"),
          columns: [
            {
                title: "填报日期",
                key: "recordDate",
                minWidth: 140,
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
                minWidth: 130,
                align:'center'
            },
            {
                title: "今日发布量",
                key: "todaySendNum",
                minWidth: 120,
                align:'center'
            },
            {
                title: "月发布目标",
                key: "releaseTarget",
                minWidth: 120,
                align:'center'
            },
            {
                title: "月累计发布条数",
                key: "cumulativeRelease",
                minWidth: 140,
                align:'center'
            },
            {
                title: "发布目标完成率",
                key: "releaseCompleteRate",
                minWidth: 140,
                align:'center'
            },
            {
                title: "今日视频号投流量",
                key: "flowInvestmentNum",
                minWidth: 150,
                align:'center'
            },
            {
                title: "视频号投流目标",
                key: "flowInvestmentTarget",
                minWidth: 150,
                align:'center'
            },
            {
                title: "月累计视频号投流数量",
                key: "cumulativeFlowInvestment",
                minWidth: 180,
                align:'center'
            },
            {
                title: "视频号投流完成率",
                key: "flowInvestmentCompleteRate",
                minWidth: 160,
                align:'center'
            },
            {
                title: "今日直播间投流量",
                key: "livingRoomFlowInvestmentNum",
                minWidth: 150,
                align:'center'
            },
            {
                title: "直播间投流目标",
                key: "livingRoomFlowInvestmentTarget",
                minWidth: 150,
                align:'center'
            },
            {
                title: "月累计直播间投流数量",
                key: "livingRoomCumulativeFlowInvestment",
                minWidth: 180,
                align:'center'
            },
            {
                title: "直播间投流完成率",
                key: "livingRoomFlowInvestmentCompleteRate",
                minWidth: 160,
                align:'center'
            },
            {
              title: "今日线索量",
              key: "cluesNum",
              minWidth: 120,
              align:'center'
            },
            {
              title: "目标线索量",
              key: "cluesNumTarget",
              minWidth: 120,
              align:'center'
            },
            {
              title: "月累计线索量",
              key: "cumulativeCluesNum",
              minWidth: 130,
              align:'center'
            },
            {
              title: "线索完成率",
              key: "cluesCompleteRate",
              minWidth: 120,
              align:'center',
              
            },
            {
              title: "今日涨粉",
              key: "addFansNum",
              minWidth: 120,
              align:'center',
            },
            {
              title: "涨粉目标",
              key: "addFansTarget",
              minWidth: 120,
              align:'center',
            },
            {
              title: "累计涨粉量",
              key: "cumulativeAddFansNum",
              minWidth: 120,
              align:'center',
            },
            {
              title: "涨粉完成率",
              key: "addFansCompleteRate",
              minWidth: 120,
              align:'center',
              
            },
            {
                title: "今日加V量",
                key: "addWechatNum",
                minWidth: 120,
                align:'center',
            },
            {
                title: "目标加V量",
                key: "addWechatTarget",
                minWidth: 120,
                align:'center',
            },
            {
                title: "月加V累计",
                key: "cumulativeAddWechat",
                minWidth: 120,
                align:'center',
            },
            {
                title: "加V完成率",
                key: "addWechatCompleteRate",
                minWidth: 120,
                align:'center',
            },
            {
                title: "99今日面诊卡下单数",
                key: "consultation",
                minWidth: 180,
                align:'center',
            },
            {
                title: "99面诊卡下单数量目标",
                key: "consultationTarget",
                minWidth: 180,
                align:'center',
            },
            {
                title: "99累计面诊卡下单数量",
                key: "cumulativeConsultation",
                minWidth: 180,
                align:'center',
            },
            {
                title: "99面诊卡下单数量完成率",
                key: "consultationCompleteRate",
                minWidth: 200,
                align:'center',
            },
            {
                title: "199今日面诊卡下单数",
                key: "consultation2",
                minWidth: 180,
                align:'center',
            },
            {
                title: "199面诊卡下单数量目标",
                key: "consultationTarget2",
                minWidth: 190,
                align:'center',
            },
            {
                title: "199累计面诊卡下单数量",
                key: "cumulativeConsultation2",
                minWidth: 190,
                align:'center',
            },
            {
                title: "199面诊卡下单数量完成率",
                key: "consultationCompleteRate2",
                minWidth: 210,
                align:'center',
            },
            {
                title: "99今日消耗卡数量",
                key: "consultationCardConsumed",
                minWidth: 180,
                align:'center',
            },
            {
                title: "99消耗卡目标",
                key: "consultationCardConsumedTarget",
                minWidth: 150,
                align:'center',
            },
            {
                title: "99累计消耗卡",
                key: "cumulativeConsultationCardConsumed",
                minWidth: 150,
                align:'center',
            },
            {
                title: "99消耗卡完成率",
                key: "consultationCardConsumedCompleteRate",
                minWidth: 150,
                align:'center',
            },
            {
                title: "199今日消耗卡数量",
                key: "consultationCardConsumed2",
                minWidth: 150,
                align:'center',
            },
            {
                title: "199消耗卡目标",
                key: "consultationCardConsumedTarget2",
                minWidth: 150,
                align:'center',
            },
            {
                title: "199累计消耗卡",
                key: "cumulativeConsultationCardConsumed2",
                minWidth: 150,
                align:'center',
            },
            {
                title: "199消耗卡完成率",
                key: "consultationCardConsumedCompleteRate2",
                minWidth: 150,
                align:'center',
            },
            {
                title: "今日激活历史面诊数量",
                key: "activateHistoricalConsultation",
                minWidth: 190,
                align:'center',
            },
            {
                title: "累计激活历史面诊数量",
                key: "cumulativeActivateHistoricalConsultation",
                minWidth: 190,
                align:'center',
            },
            {
                title: "激活历史面诊数量目标",
                key: "activateHistoricalConsultationTarget",
                minWidth: 180,
                align:'center',
            },
            {
                title: "激活历史面诊数量完成率",
                key: "activateHistoricalConsultationCompleteRate",
                minWidth: 200,
                align:'center',
            },
            {
                title: "今日派单量",
                key: "sendOrderNum",
                minWidth: 120,
                align:'center',
            },
            {
                title: "派单目标",
                key: "sendOrderTarget",
                minWidth: 120,
                align:'center',
            },
            {
                title: "累计派单",
                key: "cumulativeSendOrder",
                minWidth: 120,
                align:'center',
            },
            {
                title: "派单完成率",
                key: "sendOrderCompleteRate",
                minWidth: 120,
                align:'center',
            },
            {
                title: "今日新诊上门人数",
                key: "newVisitNum",
                minWidth: 150,
                align:'center',
            },
            {
                title: "今日复诊上门人数",
                key: "subsequentVisitNum",
                minWidth: 150,
                align:'center',
            },
            {
                title: "今日老客上门人数",
                key: "oldCustomerVisitNum",
                minWidth: 150,
                align:'center',
            },
            {
                title: "今日上门人数",
                key: "visitNum",
                minWidth: 140,
                align:'center',
            },
            {
                title: "上门目标",
                key: "visitTarget",
                minWidth: 120,
                align:'center',
            },
            {
                title: "累计上门数",
                key: "cumulativeVisit",
                minWidth: 120,
                align:'center',
            },
            {
                title: "上门完成率",
                key: "visitCompleteRate",
                minWidth: 120,
                align:'center',
            },
            {
                title: "今日新客成交人数",
                key: "newDealNum",
                minWidth: 150,
                align:'center',
            },
            {
                title: "今日复诊成交人数",
                key: "subsequentDealNum",
                minWidth: 150,
                align:'center',
            },
            {
                title: "今日老客成交人数",
                key: "oldCustomerDealNum",
                minWidth: 150,
                align:'center',
            },
            {
                title: "今日成交人数",
                key: "dealNum",
                minWidth: 140,
                align:'center',
            },
            {
                title: "成交人数目标",
                key: "dealTarget",
                minWidth: 140,
                align:'center',
            },
            {
                title: "累计成交人数",
                key: "cumulativeDealTarget",
                minWidth: 140,
                align:'center',
            },
            {
                title: "成交率",
                key: "dealRate",
                minWidth: 120,
                align:'center',
            },
            {
                title: "今日带货结算佣金",
                key: "cargoSettlementCommission",
                minWidth: 150,
                align:'center',
            },
            {
                title: "带货结算佣金目标",
                key: "cargoSettlementCommissionTarget",
                minWidth: 150,
                align:'center',
            },
            {
                title: "月累计带货结算佣金",
                key: "cumulativeCargoSettlementCommission",
                minWidth: 180,
                align:'center',
            },
            {
                title: "带货结算佣金完成率",
                key: "cargoSettlementCommissionCompleteRate",
                minWidth: 170,
                align:'center',
            },
            {
                title: "今日新诊业绩",
                key: "newPerformanceNum",
                minWidth: 130,
                align:'center',
            },
            {
                title: "今日复诊业绩",
                key: "subsequentPerformanceNum",
                minWidth: 130,
                align:'center',
            },
            {
                title: "今日总新客业绩",
                key: "newCustomerPerformanceCountNum",
                minWidth: 150,
                align:'center',
            },
            {
                title: "今日老客业绩",
                key: "oldCustomerPerformanceNum",
                minWidth: 140,
                align:'center',
            },
            {
                title: "今日业绩",
                key: "performanceNum",
                minWidth: 120,
                align:'center',
            },
            {
                title: "业绩目标",
                key: "performanceTarget",
                minWidth: 120,
                align:'center',
            },
            {
                title: "月累计业绩金额",
                key: "cumulativePerformance",
                minWidth: 140,
                align:'center',
            },
            {
                title: "业绩完成率",
                key: "performanceCompleteRate",
                minWidth: 120,
                align:'center',
            },
            {
                title: "今日小黄车退款量",
                key: "minivanRefund",
                minWidth: 150,
                align:'center',
            },
            {
                title: "小黄车退单量上限",
                key: "minivanRefundTarget",
                minWidth: 150,
                align:'center',
            },
            {
                title: "月累计小黄车退款",
                key: "cumulativeMinivanRefund",
                minWidth: 150,
                align:'center',
            },
            {
                title: "小黄车退款率",
                key: "minivanRefundCompleteRate",
                minWidth: 140,
                align:'center',
            },
            {
                title: "今日小黄车差评量",
                key: "miniVanBadReviews",
                minWidth: 150,
                align:'center',
            },
            {
                title: "差评总量上限",
                key: "miniVanBadReviewsTarget",
                minWidth: 150,
                align:'center',
            },
            {
                title: "月累计小黄车差评",
                key: "cumulativeMiniVanBadReviews",
                minWidth: 150,
                align:'center',
            },
            {
                title: "小黄车差评率",
                key: "miniVanBadReviewsCompleteRate",
                minWidth: 140,
                align:'center',
            },
            {
                title: "运营人员",
                key: "operationEmployeeName",
                minWidth: 140,
                align:'center',
            },
            {
                title: "直播中人员",
                key: "livingTrackingEmployeeName",
                minWidth: 150,
                align: "center",
            },    
            {
                title: "网咨人员",
                key: "netWorkConsultingEmployeeName",
                align:'center',
                minWidth: 140,
            },
            {
                title: "创建日期",
                key: "createDate",
                minWidth: 200,
                align:'center',
                render: (h, params) => {
                    return h(
                        "div",
                        this.$moment(params.row.createDate).format("YYYY-MM-DD HH:mm:ss")
                    );
                },
            },
          ],
          data: [],
        }
    }
  },
  methods:{
    // 获取客户预约报表
    getliveAnchorOperatingReport() {
      const { startDate,endDate } = this.query;
      const data = { 
            startDate: this.$moment(startDate).format("YYYY-MM-DD")  ,
            endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      api.getliveAnchorOperatingReport(data).then((res) => {
        if (res.code === 0) {
          const { liveAnchorOperatingReport} = res.data;
          this.query.data = liveAnchorOperatingReport;
          this.pageCount = this.query.data.length
        }
      });
    },
    // 导出
    exportsendOrder(){
      const { startDate,endDate} = this.query;
      const data = { 
        startDate: this.$moment(startDate).format("YYYY-MM-DD")  ,
        endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
      };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      if(this.query.data.length==0){
          this.$Message.error('没有数据时不支持导出')
          return
      }
      api.getliveAnchorOperatingReportExport(data).then((res) => {
        let name = this.$moment(new Date(startDate)).format("YYYY-MM-DD") + '-' + this.$moment(new Date(endDate)).format("YYYY-MM-DD") + '主播IP运营报表'
          download(res,name);
      });
    },
    handleModalVisibleChange(value){
        if (!value) {
          this.isEdit = false;
          this.query.data = []
          this.query.startDate =  this.$moment().subtract(1, "days").format("YYYY-MM-DD")
          this.query.endDate =  this.$moment().subtract(1, "days").format("YYYY-MM-DD")
          this.pageCount = 0
          this.$emit("update:anchorIPOperationReportModal", false);
      }
    },
    // 取消
    cancelSubmits(name) {
      this.isEdit = false;
      this.control = false;
      this.query.data = []
      this.query.startDate =  this.$moment().subtract(1, "days").format("YYYY-MM-DD")
      this.query.endDate =  this.$moment().subtract(1, "days").format("YYYY-MM-DD")
      this.pageCount = 0
      this.$emit("update:anchorIPOperationReportModal", false);
    },
  },
  created(){
    // this.getsendOrderReport()
  },
  watch: {
    anchorIPOperationReportModal(value){
        this.anchorIPOperationReportModals = value;
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
.foot{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.num{
  margin-right: 20px ;
  font-size: 18px;
  display: flex;
}
</style>
