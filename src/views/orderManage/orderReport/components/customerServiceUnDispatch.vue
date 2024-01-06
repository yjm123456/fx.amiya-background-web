<template>
  <div>
    <Modal
      v-model="customerServiceUnDispatchModels"
      title="客服未派单报表"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="100%"
      fullscreen
    >
        <Select
          v-model="query.employeeId"
          style="width: 200px;margin-left: 10px"
          placeholder="请选择客服"
          :disabled="positionName == '客服'"
        >
          <Option
            v-for="item in employee"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
          >
        </Select>
        <DatePicker
          type="date"
          placeholder="下单开始日期"
          style="width: 160px; margin-left: 10px"
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
        <Button type="primary" style="margin:0 10px" @click="getCustomerServiceUnDispatch(1)">查询</Button>
        <Button type="primary" @click="exportsendOrder" v-has="{ role: ['fx.amiya.permission.EXPORT'] }">导出</Button>
        <Card class="container">
          <div>
              <Table border :columns="query.columns" :data="query.data"  height="700"></Table>
          </div>
        </Card>
        <div slot="footer" class=" foot">
          <div style="display:flex">
            <div class="num">合计实付款：<div style="color:red">{{actualPaymentNum}}</div></div>
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
    customerServiceUnDispatchModel: {
        type: Boolean,
    },
  },
  data() {
    return{
      employeeIds:null,
      positionName:'',
      employee: [{ name: "全部客服", id: -1 }],
        pageCount:0,
        customerServiceUnDispatchModels:false,
        actualPaymentNum:0,
        query:{
          statusCodeList:[
            {
              name: "等待买家付款",
              value: "WAIT_BUYER_PAY",
            },
            {
              name: "等待卖家发货",
              value: "WAIT_SELLER_SEND_GOODS",
            },
            {
              name: "等待买家确认收货",
              value: "WAIT_BUYER_CONFIRM_GOODS",
            },
            {
              name: "买家已签收",
              value: "TRADE_BUYER_SIGNED",
            },
            {
              name: "交易成功",
              value: "TRADE_FINISHED",
            },
            {
              name: "退款成功交易关闭",
              value: "TRADE_CLOSED",
            },
            {
              name: "付款前交易关闭",
              value: "TRADE_CLOSED_BY_TAOBAO",
            },
            {
              name: "退款中",
              value: "REFUNDING",
            },
            {
              name: "咨询订单",
              value: "SEEK_ADVICE",
            },
            {
              name: "定金订单",
              value: "BARGAIN_MONEY",
            },
          ],
          startDate:this.$moment().startOf('month').format("YYYY-MM-DD"),
          endDate:this.$moment(new Date()).format("YYYY-MM-DD"),
          employeeId:-1,
          columns: [
            {
              title: "客服",
              key: "bindCustomerServiceName",
              minWidth: 150,
            },
            {
              title: "订单号",
              key: "orderId",
              minWidth: 220,
            },
            {
              title: "下单平台",
              key: "appTypeText",
              minWidth: 150,
              
            },
            
            {
              title: "下单日期",
              tooltip:true,
              minWidth: 200,
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
              title: "预约医院",
              key: "appointmentHospital",
              minWidth: 220,
            },
           
            {
              title: "商品",
              key: "goodsName",
              minWidth: 300,
            },
            {
              title: "订单状态",
              key: "statusText",
              minWidth: 150,
            },
            
            {
              title: "实付款",
              key: "actualPayment",
              minWidth: 150,
            },
            {
              title: "手机号",
              key: "encryptPhone",
              minWidth: 150,
            }
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
          this.employee = [...this.employee, ...employee];
           this.employee.map(item=>{
            if(this.positionName == '客服'){
              if(item.id == this.employeeIds){
                this.query.employeeId = item.id
              }
            }
          })
          this.getCustomerServiceUnDispatch()
        }
      });
    },
    // 获取客户预约报表
    getCustomerServiceUnDispatch(val) {
      const { startDate,endDate ,employeeId} = this.query;
      const data = { 
            startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
            endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
            employeeId
      };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      api.getCustomerUnSendOrderReport(data).then((res) => {
        if (res.code === 0) {
          const { customerUnSendOrderReport} = res.data;
          this.query.data = customerUnSendOrderReport;
          this.pageCount = this.query.data.length
          let actualPaymentNum = 0
          this.query.data.map((item,index)=>{
            actualPaymentNum +=Number(item.actualPayment)
          })
          this.actualPaymentNum = Math.floor(actualPaymentNum * 100) / 100
        }
      });
    },
    // 导出
    exportsendOrder(){
      const { startDate,endDate,employeeId} = this.query;
      const data = { 
        startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
        endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        employeeId
      };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      if(this.query.data.length==0){
          this.$Message.error('没有数据时不支持导出')
          return
      }
      api.getcustomerUnSendOrderReportExport(data).then((res) => {
        let name = this.$moment(new Date(startDate)).format("YYYY-MM-DD") + '-' + this.$moment(new Date(endDate)).format("YYYY-MM-DD") + '客服未派单报表'
          download(res,name);
      });
    },
    handleModalVisibleChange(value){
        if (!value) {
          this.isEdit = false;
          this.$emit("update:customerServiceUnDispatchModel", false);
          this.query.data = []
          this.query.startDate =  this.$moment().startOf('month').format("YYYY-MM-DD")
          this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
          this.query.employeeId = -1
          this.pageCount = 0
          this.actualPaymentNum=0
      }
    },
    // 取消
    cancelSubmits(name) {
      this.isEdit = false;
      this.control = false;
      this.$emit("update:customerServiceUnDispatchModel", false);
      this.query.data = []
      this.query.startDate =  this.$moment().startOf('month').format("YYYY-MM-DD")
      this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
      this.query.employeeId = -1
      this.pageCount = 0
      this.actualPaymentNum=0
    },
    
  },
  created(){
    const positionName = sessionStorage.getItem("positionName")
    const employeeIds = sessionStorage.getItem("employeeId")
    this.positionName = positionName
    this.employeeIds = employeeIds
   
  },
  watch: {
    customerServiceUnDispatchModel(value){
        this.customerServiceUnDispatchModels = value;
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
