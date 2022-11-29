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
      <Button type="primary" @click="exportsendOrder"  v-has="{ role: ['fx.amiya.permission.EXPORT'] }">导出</Button>
      <Card class="container">
        <div>
            <Table border :columns="query.columns" :data="query.data" height="700"></Table>
        </div>
       </Card>
        <div slot="footer" class=" foot">
          <div style="display:flex">
            <div class="num">总条数：<div style="color:red">{{pageCount}}</div></div>
            <div class="bottom_title">往期数据已存储，请进行新数据填写，若需要更早期数据可联系研发部</div>
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
                title: "抖音运营人员",
                key: "tikTokOperationEmployeeName",
                minWidth: 160,
                align:'center'
            },
            {
                title: "抖音直播前运营数据更新时间",
                key: "tikTokUpdateDate",
                minWidth: 250,
                align:'center',
                render: (h, params) => {
                    return h(
                        "div",
                        params.row.tikTokUpdateDate ? this.$moment(params.row.tikTokUpdateDate).format("YYYY-MM-DD HH:mm:ss") : ''
                    );
                },
            },
            {
              title: "今日抖音发布量",
              key: "tikTokSendNum",
              minWidth: 160,
              align: "center",
            },
            {
              title: "月抖音发布目标",
              key: "tikTokReleaseTarget",
              minWidth: 160,
              align: "center",
            },
            {
              title: "月累计抖音发布条数",
              key: "tikTokCumulativeRelease",
              minWidth: 180,
              align: "center",
            },
            {
              title: "抖音发布目标完成率",
              key: "tikTokReleaseCompleteRate",
              minWidth: 180,
              align: "center",
            },
            {
              title: "抖音今日投流费用",
              key: "tikTokFlowInvestmentNum",
              minWidth: 160,
              align: "center",
            },
            {
              title: "抖音投流费用目标",
              key: "tikTokFlowinvestmentTarget",
              minWidth: 160,
              align: "center",
            },
            {
              title: "累计抖音投流费用",
              key: "cumulativeTikTokFlowinvestment",
              minWidth: 180,
              align: "center",
            },
            {
              title: "抖音投流费用完成率",
              key: "tikTokFlowinvestmentCompleteRate",
              minWidth: 180,
              align: "center",
            },
            {
              title: "小红书运营人员",
              key: "xiaoHongShuOperationEmployeeName",
              minWidth: 160,
              align: "center",
          },
            {
              title: "今日小红书发布量",
              key: "xiaoHongShuSendNum",
              minWidth: 160,
              align: "center",
          },
          {
            title: "月小红书发布目标",
            key: "xiaoHongShuReleaseTarget",
            minWidth: 160,
            align: "center",
          },
          {
            title: "月累计小红书发布条数",
            key: "xiaoHongShuCumulativeRelease",
            minWidth: 180,
            align: "center",
          },
          {
            title: "小红书发布目标完成率",
            key: "xiaoHongShuReleaseCompleteRate",
            minWidth: 180,
            align: "center",
          },
          {
              title: "小红书今日投流费用",
              key: "xiaoHongShuFlowInvestmentNum",
              minWidth: 170,
              align: "center",
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
          },
          {
            title: "微博运营人员",
            key: "sinaWeiBoOperationEmployeeName",
            minWidth: 150,
            align: "center",
          },
          {
            title: "今日微博发布量",
            key: "sinaWeiBoSendNum",
            minWidth: 150,
            align: "center",
          },
          {
            title: "月微博发布目标",
            key: "sinaWeiBoReleaseTarget",
            minWidth: 150,
            align: "center",
          },
          {
            title: "月累计微博发布条数",
            key: "sinaWeiBoCumulativeRelease",
            minWidth: 170,
            align: "center",
          },
          {
            title: "微博发布目标完成率",
            key: "sinaWeiBoReleaseCompleteRate",
            minWidth: 180,
            align: "center",
          },
          {
            title: "微博今日投流费用",
            key: "sinaWeiBoFlowInvestmentNum",
            minWidth: 150,
            align: "center",
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
          },
          {
            title: "视频号运营人员",
            key: "videoOperationEmployeeName",
            minWidth: 150,
            align: "center",
          },
          {
            title: "今日视频号发布量",
            key: "videoSendNum",
            minWidth: 150,
            align: "center",
          },
          {
            title: "月视频号发布目标",
            key: "videoReleaseTarget",
            minWidth: 150,
            align: "center",
          },
          {
            title: "月累计视频号发布条数",
            key: "videoCumulativeRelease",
            minWidth: 180,
            align: "center",
          },
          {
            title: "视频号发布目标完成率",
            key: "videoReleaseCompleteRate",
            minWidth: 180,
            align: "center",
          },
          {
            title: "视频号今日投流费用",
            key: "videoFlowInvestmentNum",
            minWidth: 170,
            align: "center",
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
          },
          {
            title: "知乎运营人员",
            key: "zhihuOperationEmployeeName",
            minWidth: 180,
            align: "center",
          },
          {
            title: "今日知乎发布量",
            key: "zhihuSendNum",
            minWidth: 180,
            align: "center",
          },
          {
            title: "月知乎发布目标",
            key: "zhihuReleaseTarget",
            minWidth: 180,
            align: "center",
          },
          {
            title: "月累计知乎发布条数",
            key: "zhihuCumulativeRelease",
            minWidth: 180,
            align: "center",
          },
          {
            title: "知乎发布目标完成率",
            key: "zhihuReleaseCompleteRate",
            minWidth: 180,
            align: "center",
          },
          {
            title: "知乎今日投流费用",
            key: "zhihuFlowInvestmentNum",
            minWidth: 180,
            align: "center",
          },
          {
            title: "知乎投流费用目标",
            key: "zhihuFlowinvestmentTarget",
            minWidth: 180,
            align: "center",
          },
          {
            title: "累计知乎投流费用",
            key: "cumulativeZhihuFlowinvestment",
            minWidth: 180,
            align: "center",
          },
          {
            title: "知乎投流费用完成率",
            key: "zhihuFlowinvestmentCompleteRate",
            minWidth: 180,
            align: "center",
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
                title: "今日运营渠道投流费用",
                key: "flowInvestmentNum",
                minWidth: 180,
                align:'center'
            },
            {
                title: "运营渠道投流费用目标",
                key: "flowInvestmentTarget",
                minWidth: 180,
                align:'center'
            },
            {
                title: "月累计运营渠道投流费用数",
                key: "cumulativeFlowInvestment",
                minWidth: 210,
                align:'center'
            },
            {
                title: "运营渠道投流费用完成率",
                key: "flowInvestmentCompleteRate",
                minWidth: 200,
                align:'center'
            },
            {
                title: "今日直播间投流费用",
                key: "livingRoomFlowInvestmentNum",
                minWidth: 190,
                align:'center'
            },
            {
                title: "直播间投流费用目标",
                key: "livingRoomFlowInvestmentTarget",
                minWidth: 190,
                align:'center'
            },
            {
                title: "月累计直播间投流费用",
                key: "livingRoomCumulativeFlowInvestment",
                minWidth: 180,
                align:'center'
            },
            {
                title: "直播间投流费用完成率",
                key: "livingRoomFlowInvestmentCompleteRate",
                minWidth: 200,
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
                title: "照片今日面诊卡下单数",
                key: "consultation",
                minWidth: 180,
                align:'center',
            },
            {
                title: "照片面诊卡下单数量目标",
                key: "consultationTarget",
                minWidth: 200,
                align:'center',
            },
            {
                title: "照片累计面诊卡下单数量",
                key: "cumulativeConsultation",
                minWidth: 200,
                align:'center',
            },
            {
                title: "照片面诊卡下单数量完成率",
                key: "consultationCompleteRate",
                minWidth: 210,
                align:'center',
            },
            {
                title: "视频今日面诊卡下单数",
                key: "consultation2",
                minWidth: 190,
                align:'center',
            },
            {
                title: "视频面诊卡下单数量目标",
                key: "consultationTarget2",
                minWidth: 200,
                align:'center',
            },
            {
                title: "视频累计面诊卡下单数量",
                key: "cumulativeConsultation2",
                minWidth: 200,
                align:'center',
            },
            {
                title: "视频面诊卡下单数量完成率",
                key: "consultationCompleteRate2",
                minWidth: 220,
                align:'center',
            },
            {
                title: "照片今日消耗卡数量",
                key: "consultationCardConsumed",
                minWidth: 180,
                align:'center',
            },
            {
                title: "照片消耗卡目标",
                key: "consultationCardConsumedTarget",
                minWidth: 150,
                align:'center',
            },
            {
                title: "照片累计消耗卡",
                key: "cumulativeConsultationCardConsumed",
                minWidth: 150,
                align:'center',
            },
            {
                title: "照片消耗卡完成率",
                key: "consultationCardConsumedCompleteRate",
                minWidth: 150,
                align:'center',
            },
            {
                title: "视频今日消耗卡数量",
                key: "consultationCardConsumed2",
                minWidth: 170,
                align:'center',
            },
            {
                title: "视频消耗卡目标",
                key: "consultationCardConsumedTarget2",
                minWidth: 150,
                align:'center',
            },
            {
                title: "视频累计消耗卡",
                key: "cumulativeConsultationCardConsumed2",
                minWidth: 150,
                align:'center',
            },
            {
                title: "视频消耗卡完成率",
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
                title: "直播中人员",
                key: "livingTrackingEmployeeName",
                minWidth: 150,
                align: "center",
            },    
            {
                title: "直播中运营数据更新时间",
                key: "livingUpdateDate",
                minWidth: 200,
                align:'center',
                render: (h, params) => {
                    return h(
                        "div",
                        params.row.livingUpdateDate ? this.$moment(params.row.livingUpdateDate).format("YYYY-MM-DD HH:mm:ss") : ''
                    );
                },
            },
            {
                title: "网咨人员",
                key: "netWorkConsultingEmployeeName",
                align:'center',
                minWidth: 140,
            },
            {
                title: "直播后运营数据更新时间",
                key: "afterLivingUpdateDate",
                minWidth: 200,
                align:'center',
                render: (h, params) => {
                    return h(
                        "div",
                        params.row.afterLivingUpdateDate ? this.$moment(params.row.afterLivingUpdateDate).format("YYYY-MM-DD HH:mm:ss") : ''
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
.bottom_title{
  font-size: 14px;
  font-weight: bold;
  color: red;
  margin: 3px 0 0 10px;
}
</style>
