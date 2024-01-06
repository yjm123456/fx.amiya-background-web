<template>
  <div>
    <Modal
      v-model="customerServiceOrderModels"
      title="客服已派单报表"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="100%"
      fullscreen
    >
       <!-- <Input
          v-model="query.customerName"
          placeholder="请输入客服"
          style="width: 200px;"
          @keyup.enter.native="getcustomerServiceOrder()"
        /> -->
        <Select
          v-model="query.employeeId"
          style="width: 200px;margin-left: 10px"
          placeholder="请选择客服"
          :disabled="positionName == '客服'"
        >
          <Option
            v-for="item in employee"
            :value="item.id"
            >{{ item.name }}</Option
          >
        </Select>
        <Select
          v-model="query.orderStatus"
          style="width: 12.5rem;margin-left: .625rem"
          placeholder="请选择订单状态"
        >
          <Option
            v-for="item in query.statusCodeList"
            :value="item.value"
            :key="item.value"
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
        <Button type="primary" style="margin:0 10px" @click="getcustomerServiceOrder(1)">查询</Button>
        <Button type="primary" @click="exportsendOrder" v-has="{ role: ['fx.amiya.permission.EXPORT'] }">导出</Button>
        <Card class="container">
          <div>
              <Table border :columns="query.columns" :data="query.data" :span-method="handleSpan" height="700"></Table>
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
    customerServiceOrderModel: {
        type: Boolean,
    },
  },
  data() {
    return{
        employeeIds:null,
        positionName:'',
        employee: [{ name: "全部客服", id: 0 }],
        pageCount:0,
        customerServiceOrderModels:false,
        actualPaymentNum:0,
        query:{
          orderStatus:"",
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
          employeeId: 0,
          startDate:this.$moment().startOf('month').format("YYYY-MM-DD"),
          endDate:this.$moment(new Date()).format("YYYY-MM-DD"),
          columns: [
            {
              title: "客服",
              key: "sendName",
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
              minWidth: 100,
              
            },
            
            {
              title: "派单日期",
              tooltip:true,
              minWidth: 180,
              key: "sendDate",
              render: (h, params) => {
                return h(
                  "div",
                  this.$moment(params.row.sendDate).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )
                );
              },
            },
            {
              title: "派单医院",
              key: "hospitalName",
              minWidth: 220,
            },
            {
              title: "预约时间",
              tooltip:true,
              minWidth: 150,
              key: "time",
              render: (h, params) => {
                return h(
                  "div",
                  params.row.time !='未明确时间' ? params.row.time : '未明确时间'
                );
              },
            },
            {
              title: "商品",
              key: "goodsName",
              minWidth: 300,
            },
            {
              title: "采购单价",
              key: "purchaseSinglePrice",
              minWidth: 120,
            },
            {
              title: "采购数量",
              key: "purchaseNum",
              minWidth: 100,
            },
            {
              title: "采购总价",
              key: "purchasePrice",
              minWidth: 120,
            },
            {
              title: "订单状态",
              key: "statusText",
              minWidth: 150,
            },
            {
              title: "描述",
              key: "description",
              minWidth: 200,
            },
            {
              title: "规格",
              key: "standard",
              minWidth: 150,
            },
            
            {
              title: "实付款",
              key: "actualPayment",
              minWidth: 120,
            },
            {
              title: "手机号",
              key: "encryptPhone",
              minWidth: 140,
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
          this.getcustomerServiceOrder();  
        }
      });
      
    },
    // 获取客户预约报表
    getcustomerServiceOrder(val) {
      const { startDate,endDate ,employeeId,orderStatus} = this.query;
      const data = { 
            startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
            endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
            employeeId,
            orderStatus
      };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      // // 查询的时候提示必须输入客服字段 一进页面不提示文字
      // if(val==1){
      //   if(!employeeId){
      //     this.$Message.error('请输入客服名字')
      //     return
      //   }
      // }
      // if(!employeeId){
      //   return
      // }
      api.getcustomerSendOrderReport(data).then((res) => {
        if (res.code === 0) {
          const { customerSendOrderReport} = res.data;
          this.query.data = customerSendOrderReport;
          this.pageCount = this.query.data.length
          this.integratedData(this.query.data)
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
      if(this.query.data.length==0){
          this.$Message.error('没有数据时不支持导出')
          return
      }
      api.getcustomerSendOrderReportExport(data).then((res) => {
        let name = this.$moment(new Date(startDate)).format("YYYY-MM-DD") + '-' + this.$moment(new Date(endDate)).format("YYYY-MM-DD") + '客服已派单报表'
          download(res,name);
      });
    },
    handleModalVisibleChange(value){
        if (!value) {
          this.isEdit = false;
          this.$emit("update:customerServiceOrderModel", false);
          this.query.data = []
          this.query.startDate =  this.$moment().startOf('month').format("YYYY-MM-DD")
          this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
          this.query.employeeId = 0
          this.query.orderStatus = ""
          this.pageCount = 0
          this.actualPaymentNum=0
      }
    },
    // 取消
    cancelSubmits(name) {
      this.isEdit = false;
      this.control = false;
      this.$emit("update:customerServiceOrderModel", false);
      this.query.data = []
      this.query.startDate =  this.$moment().startOf('month').format("YYYY-MM-DD")
      this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
      this.query.employeeId = 0
      this.query.orderStatus = ""
      this.pageCount = 0
      this.actualPaymentNum=0
    },
    // 被整理的数组中相同hospitalName的元素需放在一块，否则还要再整理数据（暂未处理）
    integratedData(data) {
        let that = this;
        // 获取所有的不同年龄值
        let arrId = [];
        data.forEach(i => {
            !arrId.includes(i.sendName) ? arrId.push(i.sendName) : arrId;
        });
        // 提前为每个年龄值设置跨行数为0
        let arrObj = [];
        arrId.forEach(j => {
            arrObj.push({
                id: j,
                num: 0
            })
        })
        // 计算每个年龄的可跨行数
        data.forEach(k => {
            arrObj.forEach(l => {
                k.sendName === l.id ? l.num ++ : l.num;
            })
        })
        data.forEach(m => {
            arrObj.forEach((n,index) => {
                if(m.sendName === n.id){
                    if(arrId.includes(m.sendName)){
                        m.mergeCol = n.num;
                        arrId.splice(arrId.indexOf(m.sendName),1);
                    }else{
                        m.mergeCol = 0;
                    }
                }
            })
        })
        return data;
    },
    // 只针对相同sendName字段合并列，sendName位于第一列，columnIndex为0
    handleSpan ({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
            return {
                rowspan: row.mergeCol === 0 ? 0:row.mergeCol,
                colspan: row.mergeCol === 0 ? 0:1
            };
        }
    }
  },
  created(){
    // this.getcustomerOrderReceivableReports()
    const positionName = sessionStorage.getItem("positionName")
    const employeeIds = sessionStorage.getItem("employeeId")
    this.positionName = positionName
    this.employeeIds = employeeIds
  },
  watch: {
    customerServiceOrderModel(value){
        this.customerServiceOrderModels = value;
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
