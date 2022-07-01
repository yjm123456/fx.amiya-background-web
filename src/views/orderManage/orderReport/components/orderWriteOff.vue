<template>
  <div>
    <Modal
      v-model="control"
      title="订单核销报表"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="100%"
      fullscreen
    >
      <DatePicker
        type="date"
        placeholder="下单开始日期"
        style="width: 160px;"
        :value="query.startDate"
        v-model="query.startDate"
      ></DatePicker>
      <DatePicker
        type="date"
        placeholder="下单结束日期"
        style="width: 160px; margin-left: 10px"
        :value="query.endDate"
        v-model="query.endDate"
      ></DatePicker>
      <Button type="primary" style="margin:0 10px" @click="getOrderWriteOffReport">查询</Button>
      <Button type="primary" @click="exportOrderWrite">导出</Button>
      <Card class="container">
        <div>
            <Table border :columns="query.columns" :data="query.data"  height="700"></Table>
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
    orderWriteOffModal: {
        type: Boolean,
    },
  },
  data() {
    return{
      actualPaymentNum:0,
      quantityNum:0,
      pageCount:0,
        control:false,
        query:{
          startDate:this.$moment().startOf('month').format("YYYY-MM-DD"),
          endDate:this.$moment(new Date()).format("YYYY-MM-DD"),
          columns: [
            
            {
              title: "订单号",
              key: "id",
              minWidth: 200,
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
              title: "核销时间",
              tooltip:true,
              minWidth: 180,
              key: "writeOffDate",
              render: (h, params) => {
                return h(
                  "div",
                  this.$moment(params.row.writeOffDate).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )
                );
              },
            },
            {
              title: "商品名称",
              key: "goodsName",
              minWidth: 300,
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
              minWidth: 120,
            },
            {
              title: "客户昵称",
              key: "nickName",
              minWidth: 160,
            },
            {
              title: "手机号",
              key: "encryptPhone",
              minWidth: 120,
              tooltip:true
            },
            {
              title: "预约门店",
              key: "appointmentHospital",
              minWidth: 220,
            },
            {
              title: "派单门店",
              key: "sendOrderHospital",
              minWidth: 220,
            },
          ],
          data: [],
        }
    }
  },
  methods:{
    // 获取订单核销报表
    getOrderWriteOffReport() {
      const { startDate,endDate } = this.query;
      const data = { 
        startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
        endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
      };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      api.getOrderWriteOffReport(data).then((res) => {
        if (res.code === 0) {
          const { OrderWriteOffReport} = res.data;
          this.query.data = OrderWriteOffReport;
          let actualPaymentNum = 0
          let quantityNum = 0
          this.pageCount = this.query.data.length
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
    exportOrderWrite(){
      const { startDate,endDate } = this.query;
      const data = { 
        startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
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
      api.getOrderWriteOffReportExportt(data).then((res) => {
        let name = this.$moment(new Date(startDate)).format("YYYY-MM-DD") + '-' + this.$moment(new Date(endDate)).format("YYYY-MM-DD") + '订单核销报表'
        download(res,name);
      });
    },
    handleModalVisibleChange(value){
        if (!value) {
          this.isEdit = false;
          // this.$refs["form"].resetFields();
          this.query.data = []
          this.query.startDate =  this.$moment().startOf("month").format("YYYY-MM-DD") 
          this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
          this.actualPaymentNum = 0
          this.quantityNum = 0
          this.$emit("update:orderWriteOffModal", false);
      }
    },
    // 取消
    cancelSubmits(name) {
      this.isEdit = false;
      this.control = false;
      this.query.data = []
      this.query.startDate =  this.$moment().startOf("month").format("YYYY-MM-DD")
      this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
      this.actualPaymentNum = 0
      this.quantityNum = 0
      this.$emit("update:orderWriteOffModal", false);
    },
  },
  created(){
    // 你在这调用了  因为要根据当天时间去获取表格
    // this.getOrderWriteOffReport()
  },
  watch: {
    orderWriteOffModal(value){
        this.control = value;
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
