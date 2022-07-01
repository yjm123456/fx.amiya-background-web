<template>
  <div>
    <Modal
      v-model="paymentOrderReportModals"
      title="订单付款报表"
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
          v-model="query.belongEmpId"
          style="width: 200px;margin-left: 10px"
          placeholder="请选择归属客服"
        >
          <Option
            v-for="item in query.employee"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
          >
        </Select>
      <Button type="primary" style="margin:0 10px" @click="getpaymentOrderReport">查询</Button>
      <Button type="primary" @click="exportsendOrder">导出</Button>
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
    paymentOrderReportModal: {
        type: Boolean,
    },
  },
  data() {
    return{
        paymentOrderReportModals:false,
        actualPaymentNum:0,
        quantityNum:0,
        pageCount:0,
        query:{
          belongEmpId:null,
          employee: [{ name: "全部客服", id: -1 }],
          startDate:this.$moment().startOf('month').format("YYYY-MM-DD"),
          endDate:this.$moment(new Date()).format("YYYY-MM-DD"),
          columns: [
            {
              title: "订单号",
              key: "id",
              width: 180,
              align:'center'
            },
            {
              title: "下单平台",
              key: "appTypeText",
              width: 100,
              align:'center'
            },
            {
              title: "下单时间",
              tooltip:true,
              width: 170,
              key: "createDate",
              render: (h, params) => {
                return h(
                  "div",
                  this.$moment(params.row.createDate).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )
                );
              },
              align:'center'
            },
            {
              title: "付款时间",
              tooltip:true,
              width: 170,
              key: "updateDate",
              align:'center',
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
              width: 220,
              align:'center'
            },
            {
              title: "实付款",
              key: "actualPayment",
              width: 80,
              align:'center'
            },
            {
              title: "购买数量",
              key: "quantity",
              width: 100,
              align:'center'
            },
            {
              title: "订单状态",
              key: "statusText",
              width: 160,
              align:'center'
            },
            {
              title: "客户昵称",
              key: "nickName",
              width: 160,
              align:'center'
            },
            {
              title: "手机号",
              key: "phone",
              width: 120,
              align:'center'
            },
            {
              title: "预约门店",
              key: "appointmentHospital",
              width: 220,
              align:'center'
            },
            {
              title: "归属客服",
              key: "belongEmpName",
              align:'center'
            },
          ],
          data: [],
        }
    }
  },
  methods:{
    // 获取客服列表
    getCustomerServiceList() {
      api.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.query.employee = [...this.query.employee, ...employee];
        }
      });
    },
    // 获取客户预约报表
    getpaymentOrderReport() {
      const { startDate,endDate ,belongEmpId} = this.query;
      const data = { 
            startDate: this.$moment(startDate).format("YYYY-MM-DD")  ,
            endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
            belongEmpId:belongEmpId == -1 ? null : belongEmpId
        };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      api.getOrderBuyReport(data).then((res) => {
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
      const { startDate,endDate,belongEmpId} = this.query;
      const data = { 
        startDate: this.$moment(startDate).format("YYYY-MM-DD")  ,
        endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        belongEmpId:belongEmpId == -1 ? null : belongEmpId
      };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      if(this.query.data.length==0){
          this.$Message.error('没有数据时不支持导出')
          return
      }
      api.getOrderBuyReportExport(data).then((res) => {
        let name = this.$moment(new Date(startDate)).format("YYYY-MM-DD") + '-' + this.$moment(new Date(endDate)).format("YYYY-MM-DD") + '订单付款报表'
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
          this.$emit("update:paymentOrderReportModal", false);
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
      this.quantityNum = 0
      this.actualPaymentNum=0
      this.$emit("update:paymentOrderReportModal", false);
    },
  },
  created(){
    this.getCustomerServiceList()
  },
  watch: {
    paymentOrderReportModal(value){
        this.paymentOrderReportModals = value;
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
