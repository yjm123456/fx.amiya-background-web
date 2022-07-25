<template>
  <div>
    <Modal
      v-model="moneyReportModels"
      title="客户订单应收款统计"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="100%"
      fullscreen
    >
       <Input
          v-model="query.customerName"
          placeholder="请输入客户昵称"
          style="width: 200px;"
          @keyup.enter.native="getcustomerOrderReceivableReports()"
        />
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
      <Select
        v-model="query.checkState"
        placeholder="审核状态"
        style="width: 140px; margin-left: 10px"
      >
        <Option
          v-for="item in checkStateListAll"
          :value="item.id"
          :key="item.id"
          >{{ item.name }}</Option
        >
      </Select>
      <Select
        v-model="query.ReturnBackPriceState"
        placeholder="回款状态"
        style="width: 140px; margin-left: 10px"
      >
        <Option
          v-for="item in query.ReturnBackPriceStateList"
          :value="item.status"
          :key="item.status"
          >{{ item.name }}</Option
        >
      </Select>
      <Button type="primary" style="margin:0 10px" @click="getcustomerOrderReceivableReports">查询</Button>
      <Button type="primary" @click="exportsendOrder"  v-has="{ role: ['fx.amiya.permission.EXPORT'] }">导出</Button>
      <Card class="container">
        <div>
            <Table border :columns="query.columns" :data="query.data" :span-method="handleSpan" height="700"></Table>
        </div>
       </Card>
        <div slot="footer" class=" foot">
          <div style="display:flex">
            <div class="num">订单价格总额：<div style="color:red">{{actualPaymentNum}}</div></div>
            <div class="num">派单价格总额：<div style="color:red">{{sendOrderPirceNum}}</div></div>
            <div class="num">应收款总额：<div style="color:red">{{accountReceivableNum}}</div></div>

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
    moneyReportModel: {
        type: Boolean,
    },
    checkStateListAll:{
      type:Array
    }
  },
  data() {
    return{
        moneyReportModels:false,
        actualPaymentNum:0,
        sendOrderPirceNum:0,
        accountReceivableNum:0,
        quantityNum:0,
        // 总订单数量
        pageCount:0,
        query:{
          checkState:-1,
          ReturnBackPriceState:'-1',
          ReturnBackPriceStateList:[
              {
                status:'-1',
                name:'全部回款状态'
              },
              {
                status:'true',
                name:'已回款'
              },
              {
                status:'false',
                name:'未回款'
              }
          ],
          customerName:"",
          startDate:this.$moment().startOf('month').format("YYYY-MM-DD"),
          endDate:this.$moment(new Date()).format("YYYY-MM-DD"),
          columns: [
            {
              title: "客户昵称",
              key: "nickName",
              minWidth: 160,
            },
            {
              title: "客户手机",
              key: "encryptPhone",
              minWidth: 140,
            },
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
              title: "订单价格",
              key: "acturalPayment",
              minWidth: 150,
            },
            
            {
              title: "应收款",
              key: "accountReceivable",
              minWidth: 150,
            },
            {
              title: "派单价格",
              key: "sendOrderPirce",
              minWidth: 150,
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
              title: "预约医院",
              key: "appointmentHospital",
              minWidth: 220,
            },
            {
              title: "派单医院",
              key: "sendOrderHospital",
              minWidth: 220,
            },
            {
              title: "最终消费医院",
              key: "finalConsumptionHospital",
              minWidth: 220,
            },
            {
              title: "派单人员",
              key: "sendHospitalEmployeeName",
              minWidth: 120,
            },
            {
              title: "归属客服",
              key: "belongEmployeeName",
              minWidth: 120,
            },
            {
            title: "审核时间",
            key: "checkDate",
            minWidth: 170,
            align:'center',
            render: (h, params) => {
              return params.row.checkDate ? h("div",this.$moment(params.row.checkDate).format("YYYY-MM-DD HH:mm:ss")) : '';
            },
          },
          {
            title: "审核状态",
            key: "checkState",
            minWidth: 120,
            align:'center',
            render: (h, params) => {
              if (params.row.checkState == "审核通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.checkState
                );
              } else if (params.row.checkState == "未审核") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.checkState
                );
              } else if (params.row.checkState == "审核不通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.checkState
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.checkState
                );
              }
            },
          },
          {
            title: "审核金额",
            key: "checkPrice",
            minWidth: 100,
            align:'center'
          },
          {
            title: "结算金额",
            key: "settlePrice",
            minWidth: 100,
            align:'center'
          },
          {
            title: "审核人",
            key: "checkByEmpName",
            minWidth: 100,
            align:'center'
          },
          {
            title: "审核备注",
            key: "checkRemark",
            minWidth: 200,
            align:'center'
          },
          
          {
            title: "是否回款",
            key: "isReturnBackPrice",
            minWidth: 120,
            align:'center',
            render: (h, params) => {
              if (params.row.isReturnBackPrice == true) {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.isReturnBackPrice == true ? '已回款':'未回款'
                );
              } else if (params.row.isReturnBackPrice == false) {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.isReturnBackPrice == true ? '已回款':'未回款'
                );
              }else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.isReturnBackPrice == true ? '已回款':'未回款'
                );
              }
            },
          },
          {
            title: "回款金额",
            key: "returnBackPrice",
            minWidth: 100,
            align:'center'
          },
          {
            title: "回款时间",
            key: "returnBackDate",
            minWidth: 170,
            align:'center',
            render: (h, params) => {
              return params.row.returnBackDate ? h("div",this.$moment(params.row.returnBackDate).format("YYYY-MM-DD HH:mm:ss")) : '';
            },
          },
            
          ],
          data: [],
        }
    }
  },
  methods:{
    // 获取客户预约报表
    getcustomerOrderReceivableReports() {
      const { startDate,endDate ,customerName,checkState,ReturnBackPriceState} = this.query;
      const data = { 
            startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
            endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
            customerName,
            checkState: checkState == -1 ? null : checkState,
            ReturnBackPriceState:ReturnBackPriceState=='-1' ? null : ReturnBackPriceState
        };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      api.getcustomerOrderReceivableReport(data).then((res) => {
        if (res.code === 0) {
          const { customerOrderReceivableReport} = res.data;
          this.query.data = customerOrderReceivableReport;
          this.integratedData(this.query.data)
          let actualPaymentNum = 0
          let accountReceivableNum=0
          let sendOrderPirceNum = 0
          let quantityNum = 0
          this.pageCount = this.query.data.length
          this.query.data.map((item,index)=>{
            actualPaymentNum +=Number(item.acturalPayment)
            accountReceivableNum +=Number(item.accountReceivable)
            sendOrderPirceNum +=Number(item.sendOrderPirce)
            
            quantityNum +=Number(item.quantity)
          })
          this.actualPaymentNum = Math.floor(actualPaymentNum * 100) / 100
          this.accountReceivableNum = Math.floor(accountReceivableNum * 100) / 100
          this.sendOrderPirceNum = Math.floor(sendOrderPirceNum * 100) / 100

          this.quantityNum = quantityNum
        }
      });
    },
    // 导出
    exportsendOrder(){
      const { startDate,endDate ,customerName,checkState,ReturnBackPriceState} = this.query;
      const data = { 
        startDate: this.$moment(startDate).format("YYYY-MM-DD")  ,
        endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        customerName,
        checkState: checkState == -1 ? null : checkState,
        ReturnBackPriceState:ReturnBackPriceState=='-1' ? null : ReturnBackPriceState
      };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      if(this.query.data.length==0){
          this.$Message.error('没有数据时不支持导出')
          return
      }
      api.getcustomerOrderReceivableExport(data).then((res) => {
        let name = this.$moment(new Date(startDate)).format("YYYY-MM-DD") + '-' + this.$moment(new Date(endDate)).format("YYYY-MM-DD") + '客户订单应收款统计'
        download(res,name);
      });
    },
    handleModalVisibleChange(value){
        if (!value) {
          this.isEdit = false;
          this.$emit("update:moneyReportModel", false);
          this.query.data = []
          this.query.startDate =  this.$moment().startOf('month').format("YYYY-MM-DD")
          this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
          this.query.customerName = ""
      }
    },
    // 取消
    cancelSubmits(name) {
      this.isEdit = false;
      this.control = false;
      this.$emit("update:moneyReportModel", false);
      this.query.data = []
      this.query.startDate =  this.$moment().startOf('month').format("YYYY-MM-DD")
      this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
      this.query.customerName = ""
    },
    // 被整理的数组中相同nickName的元素需放在一块，否则还要再整理数据（暂未处理）
    integratedData(data) {
        let that = this;
        // 获取所有的不同年龄值
        let arrId = [];
        data.forEach(i => {
            !arrId.includes(i.nickName) ? arrId.push(i.nickName) : arrId;
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
                k.nickName === l.id ? l.num ++ : l.num;
            })
        })
        data.forEach(m => {
            arrObj.forEach((n,index) => {
                if(m.nickName === n.id){
                    if(arrId.includes(m.nickName)){
                        m.mergeCol = n.num;
                        arrId.splice(arrId.indexOf(m.nickName),1);
                    }else{
                        m.mergeCol = 0;
                    }
                }
            })
        })
        return data;
    },
    // 只针对相同nickName字段合并列，nickName位于第一列，columnIndex为0
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
  },
  watch: {
    moneyReportModel(value){
        this.moneyReportModels = value;
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
