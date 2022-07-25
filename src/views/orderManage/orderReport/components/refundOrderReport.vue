<template>
  <div>
    <Modal
      v-model="refundOrderReportModals"
      title="订单退款报表"
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
      <Button type="primary" style="margin:0 10px" @click="getrefundOrderReport">查询</Button>
      <Button type="primary" @click="exportsendOrder"  v-has="{ role: ['fx.amiya.permission.EXPORT'] }">导出</Button>
      <Card class="container">
        <div>
            <Table border :columns="query.columns" :data="query.data" height="700"></Table>
        </div>
       </Card>
        <div slot="footer" class=" foot">
          <div style="display:flex">
            <div class="num">合计实付款：<div style="color:red">{{actualPaymentNum}}</div></div>
            <div class="num">合计数量：<div style="color:red">{{quantityNum}}</div></div>
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
    refundOrderReportModal: {
        type: Boolean,
    },
  },
  data() {
    return{
        refundOrderReportModals:false,
        actualPaymentNum:0,
        quantityNum:0,
        pageCount:0,
        query:{
          startDate:this.$moment().startOf('month').format("YYYY-MM-DD"),
          endDate:this.$moment(new Date()).format("YYYY-MM-DD"),
          columns: [
            {
              title: "订单号",
              key: "id",
              minWidth: 220,
            },
            {
              title: "下单平台",
              key: "appTypeText",
              minWidth: 100,
            },
            {
              title: "下单时间",
              tooltip:true,
              minWidth: 180,
              key: "createDate",
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
              title: "付款时间",
              tooltip:true,
              minWidth: 180,
              key: "updateDate",
              render: (h, params) => {
                return h(
                  "div",
                  params.row.updateDate ?this.$moment(params.row.updateDate).format(
                    "YYYY-MM-DD HH:mm:ss"
                  ):""
                );
              },
            },
            
            {
              title: "商品名称",
              key: "goodsName",
              minWidth: 220,
            },
            {
              title: "实付款",
              key: "actualPayment",
              minWidth: 100,
            },
            {
              title: "购买数量",
              key: "quantity",
              minWidth: 100,
            },
            {
              title: "订单状态",
              key: "statusText",
              minWidth: 160,
            },
            {
              title: "客户昵称",
              key: "nickName",
              minWidth: 180,
            },
            {
              title: "手机号",
              key: "phone",
              minWidth: 140,
            },
            {
              title: "预约门店",
              key: "appointmentHospital",
              minWidth: 220,
            },
          ],
          data: [],
        }
    }
  },
  methods:{
    // 获取客户预约报表
    getrefundOrderReport() {
      const { startDate,endDate } = this.query;
      const data = { 
            startDate: this.$moment(startDate).format("YYYY-MM-DD")  ,
            endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      api.getOrderCloseReport(data).then((res) => {
        if (res.code === 0) {
          const { OrderWriteOffReport} = res.data;
          this.query.data = OrderWriteOffReport;
          this.pageCount = this.query.data.length
           let actualPaymentNum = 0
           let quantityNum = 0
            this.query.data.map((item,index)=>{
                actualPaymentNum +=Number(item.actualPayment)
                quantityNum +=Number(item.quantity)
            })
            this.actualPaymentNum = Math.floor(actualPaymentNum * 100) / 100
            this.quantityNum = quantityNum
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
      api.getOrderCloseReportExport(data).then((res) => {
        let name = this.$moment(new Date(startDate)).format("YYYY-MM-DD") + '-' + this.$moment(new Date(endDate)).format("YYYY-MM-DD") + '订单退款报表'
          download(res,name);
      });
    },
    handleModalVisibleChange(value){
        if (!value) {
          this.isEdit = false;
          this.query.data = []
          this.query.startDate =  this.$moment().startOf('month').format("YYYY-MM-DD")
          this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
          this.pageCount = 0
          this.actualPaymentNum=0
          this.quantityNum = 0
          this.$emit("update:refundOrderReportModal", false);
      }
    },
    // 取消
    cancelSubmits(name) {
      this.isEdit = false;
      this.control = false;
      this.query.data = []
      this.query.startDate =  this.$moment().startOf('month').format("YYYY-MM-DD")
      this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
      this.pageCount = 0
      this.actualPaymentNum=0
      this.quantityNum = 0

      this.$emit("update:refundOrderReportModal", false);
    },
  },
  created(){
    // this.getsendOrderReport()
  },
  watch: {
    refundOrderReportModal(value){
        this.refundOrderReportModals = value;
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
