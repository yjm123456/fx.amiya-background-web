<template>
  <div>
    <Modal
      v-model="controlModel"
      title="订单详情"
      :mask-closable="false"
      width="1000"
      @on-visible-change="handleModalVisibleChange"
    > 
  
      <div class="order_con">
         <span class="title_bold">订单编号：</span><span style="color:red">{{detailObj.id}}</span>
      </div>
      <div class="mr">
        <Steps :current="time==2 ? 2 :(time ==1 ? 1 : 0)">
          <Step title="订单下单" :content="detailObj.createDate ? this.$moment(detailObj.createDate).format('YYYY-MM-DD HH:mm:ss') : ''"></Step>
          <Step title="订单更新" :content="detailObj.updateDate ? this.$moment(detailObj.updateDate).format('YYYY-MM-DD HH:mm:ss') : ''"></Step>
          <Step title="订单核销" :content="detailObj.writeOffDate ? this.$moment(detailObj.writeOffDate).format('YYYY-MM-DD HH:mm:ss') : ''"></Step>
      </Steps>
      </div>
      <div class="order_message">
        <div class="message_title"><span class="line"></span>客户信息</div>
        <div class="order_content">
          <div class="message_con">
            <span class="title_bold">客户昵称：</span>
            <span>{{detailObj.nickName}} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">手机号：</span>
            <span>{{detailObj.phone}} </span>
          </div>
        </div>
      </div>
      <div class="order_message">
        <div class="message_title"><span class="line"></span>门店信息</div>
        <div class="order_content">
          <div class="message_con">
            <span class="title_bold">预约时间：</span>
            <span>{{detailObj.appointmentDate ? this.$moment(detailObj.appointmentDate).format("YYYY-MM-DD ") : ''}} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">预约城市：</span>
            <span>{{detailObj.appointmentCity}} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">预约门店：</span>
            <span>{{detailObj.appointmentHospital}} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">派单门店：</span>
            <span>{{detailObj.sendOrderHospital}} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">核销门店：</span>
            <span>{{detailObj.finalConsumptionHospital}} </span>
          </div>
        </div>
      </div>
      
      <div class="order_message">
        <div class="message_title"><span class="line"></span>交易信息</div>
        <div class="order_content">
          <div class="message_con">
            <span class="title_bold">下单平台：</span>
            <span>{{detailObj.appTypeText}} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">订单状态：</span>
            <span>{{detailObj.statusText}} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">订单性质：</span>
            <span>{{detailObj.orderNatureText}} </span>
          </div>
        
          <div class="mr_top">
            <span class="title_bold">是否已预约：</span>
            <span>{{detailObj.isAppointment == true ? '已预约' : '未预约'}} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">实付款：</span>
            <span>{{detailObj.actualPayment}} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">应收款：</span>
            <span>{{detailObj.accountReceivable}} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">交易类型：</span>
            <span>{{detailObj.exchangeTypeText}} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">描述：</span>
            <span>{{detailObj.description }} </span>
          </div>
        </div>
      </div>
      
      <div class="order_message">
        <div class="message_title"><span class="line"></span>主播客服信息</div>
        <div class="order_content">
          <div class="mr_top">
            <span class="title_bold">主播平台：</span>
            <span>{{detailObj.liveAnchorPlatForm}} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">归属主播：</span>
            <span>{{detailObj.liveAnchor}} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">归属客服：</span>
            <span>{{detailObj.belongEmpName}} </span>
          </div>
        </div>
      </div>
      <div class="order_message">
        <div class="message_title"><span class="line"></span>财务信息</div>
        <div class="order_content">
          <div class="mr_top">
            <span class="title_bold">审核状态：</span>
            <span>{{detailObj.checkState}} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">审核金额：</span>
            <span>{{detailObj.checkPrice}} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">审核日期：</span>
            <span>{{detailObj.checkDate ? this.$moment(detailObj.checkDate).format("YYYY-MM-DD HH:mm:ss") : ''}} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">结算金额：</span>
            <span>{{detailObj.settlePrice}} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">审核人：</span>
            <span>{{detailObj.checkByEmpName}} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">审核备注：</span>
            <span>{{detailObj.checkRemark}} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">是否回款：</span>
            <span>{{detailObj.isReturnBackPrice == true ? '已回款' : '未回款'}} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">回款金额：</span>
            <span>{{detailObj.returnBackPrice}} </span>
          </div>
         <div class="mr_top">
            <span class="title_bold">回款时间：</span>
            <span>{{detailObj.returnBackDate ? this.$moment(detailObj.returnBackDate).format("YYYY-MM-DD HH:mm:ss") : ''}} </span>
          </div>
        </div>
      </div>
      <Table
        border
        :columns="query.columns"
        :data="query.data"
        height="102"
        style="margin-top:10px"
      ></Table>
      <div slot="footer">
        <Button @click="handleCancelClick()">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { time } from 'echarts';
export default {
  props: {
    detailModel: Boolean,
    detailList: Array,
  },
  data() {
    return {
      time:null,
      detailObj:{},
      controlModel: false,
      query: {
        columns: [
          {
            title: "商品",
            key: "thumbPicUrl",
            minWidth: 400,
            render: (h, params) => {
              return h(
                "viewer",
                {
                  props: {
                    zoomable: false,
                  },
                  style: {
                    display: "flex",
                  },
                },
                [
                  h("img", {
                    style: {
                      width: "3.125rem",
                      height: "3.125rem",
                      margin: ".3125rem .9375rem .3125rem .3125rem",
                      verticalAlign: "middle",
                    },
                    attrs: {
                      src: params.row.thumbPicUrl,
                    },
                  }),
                  h("div", params.row.goodsName),
                ]
              );
            },
          },
          {
            title: "实付款",
            key: "actualPayment",
            minWidth: 120,
            align: "center",
          },
          {
            title: "实付积分",
            key: "integrationQuantity",
            minWidth: 120,
            align: "center",
          },
          {
            title: "购买数量",
            key: "quantity",
            minWidth: 100,
            align: "center",
          },
        ],
        data: [],
      },
    };
  },

  methods: {
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancelClick();
        this.$emit("update:detailModel", false);
      }
    },
    // 取消
    handleCancelClick(name) {
      this.$emit("update:detailModel", false);
    },
  },
  watch: {
    detailModel(value) {
      this.controlModel = value;
    },
    detailList(value) {
      this.query.data = value;
      this.detailObj = value[0]
      this.time = value[0].writeOffDate ? 2 :(value[0].updateDate ? 1 : 0)
    },
  },
};
</script>
<style scoped>
.order_con{
  background: #fcfcfc;
  border: 1px solid #dad0d0;
  padding: 10px 5px;
  box-sizing: border-box;
  margin-bottom: 10px;
  color: #000;
}
.order_message{
  margin-top: 20px;
  color: #000;
}

.line{
  width: 1px;
  height: 20px;
  border: 2px solid #4381e6;
  background: #4381e6;
  margin-right: 5px;
  margin-left: 0;
}
.message_title{
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
}
.order_content{
  margin-top: 10px;
  padding: 10px 5px;
  box-sizing: border-box;
  border:1px solid #dad0d0;
  margin-bottom: 20px;
}
.title_bold{
  font-weight: bold;
}
.order_type{
  display: flex;
}
.order_time{
  margin-left: 100px;
}
.mr_top{
  margin-top: 10px;
}
.mr{
  margin: 20px 0 10px;
}
</style>
