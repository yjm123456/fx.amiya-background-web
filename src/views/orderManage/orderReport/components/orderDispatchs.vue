<template>
  <div>
    <Modal
      v-model="orderDispatchModels"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="100%"
      fullscreen
      :footer-hide = "false"
    >   
      <div class="top">
        <Tabs ref="tabs" v-model="activeName">
            <TabPane label="下单平台派单报表" name="orderDistribution">
                <div>
                    <div class="header">
                        <Select
                            v-model="query.status"
                            placeholder="请选择订单状态"
                            style="width:250px;margin-right:10px">
                            <Option
                                v-for="item in query.orderType"
                                :value="item.status"
                                :key="item.status"
                                >{{ item.statusText }}</Option
                            >
                        </Select>
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
                        <Button type="primary" style="margin:0 10px" @click="getsendOrderReport">查询</Button>
                        <Button type="primary" @click="exportsendOrder" v-has="{ role: ['fx.amiya.permission.EXPORT'] }">导出</Button>
                    </div>
                    <Table border :columns="query.columns" :data="query.data" height="600" ></Table>
                </div>
            </TabPane>
            <TabPane label="内容平台派单报表" name="contentDispatch">
                <div>
                    内容平台
                </div>
            </TabPane>
        </Tabs>
      </div>
      <div slot="footer" class="footer"></div> 
      <div slot="footer" class=" foot">
        <div  style="display:flex" v-if="activeName=='orderDistribution'">
          <div class="num">合计采购总价：<div style="color:red">{{totalPurchasePrice}}</div></div>
          <div class="num">合计实付款：<div style="color:red">{{actualPaymentNum}}</div></div>
        </div>
        <div v-else>1</div>
        <Button @click="cancelSubmits()">关闭页面</Button>
      </div> 
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
import { download } from "@/utils/util";
export default {
    props: {
        orderDispatchModel: {
            type: Boolean,
        },
    },
  data() {
    return{
      activeName: "orderDistribution",
      orderDispatchModels:false,
        actualPaymentNum:0,
        totalPurchasePrice:0,
        dispatchReportModals:false,
        query:{
          orderType:[
            {
              statusText:'等待买家付款',
              status:'WAIT_BUYER_PAY'
            },
            {
              statusText:'等待卖家发货',
              status:'WAIT_SELLER_SEND_GOODS'
            },
            {
              statusText:'等待买家确认收货',
              status:'WAIT_BUYER_CONFIRM_GOODS'
            },
            {
              statusText:'买家已签收,货到付款专用',
              status:'TRADE_BUYER_SIGNED'
            },
            {
              statusText:'交易成功',
              status:'TRADE_FINISHED'
            },
            {
              statusText:'付款以后用户退款成功，交易自动关闭',
              status:'TRADE_CLOSED'
            },
            {
              statusText:'付款以前，卖家或买家主动关闭交易',
              status:'TRADE_CLOSED_BY_TAOBAO'
            }
          ],
          status:"",
          startDate:this.$moment().startOf('month').format("YYYY-MM-DD"),
          endDate:this.$moment(new Date()).format("YYYY-MM-DD"),
          columns: [
            
            {
              title: "订单号",
              key: "orderId",
              minWidth: 200,
            },
            {
              title: "下单平台",
              key: "appTypeText",
              minWidth: 150,
              
            },
            {
              title: "派单医院",
              key: "hospitalName",
              minWidth: 300,
            },
            {
              title: "预约时间",
              tooltip:true,
              minWidth: 200,
              key: "time",
              render: (h, params) => {
                return h(
                  "div",
                  params.row.time != '未明确时间' ? params.row.time:"未明确时间"
                );
              },
            },
            {
              title: "商品名称",
              key: "goodsName",
              minWidth: 300,
            },
            {
              title: "订单状态",
              key: "statusText",
              minWidth: 150,
            },
            {
              title: "采购单价",
              key: "purchaseSinglePrice",
              minWidth: 150,
              tooltip:true
            },
            {
              title: "采购数量",
              key: "purchaseNum",
              minWidth: 150,
              tooltip:true
            },
            {
              title: "采购总价",
              key: "purchasePrice",
              minWidth: 150,
              tooltip:true
            },
            
            {
              title: "实付款",
              key: "actualPayment",
              minWidth: 150,
              tooltip:true
            },
            {
              title: "手机号",
              key: "encryptPhone",
              minWidth: 200,
            },
            {
              title: "派单人",
              key: "sendName",
              minWidth: 200,
            },
            {
              title: "派单日期",
              tooltip:true,
              minWidth: 200,
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
          ],
          data: [],
        }
    }
  },
  methods:{
    // 获取订单核销报表
    getsendOrderReport() {
      const { startDate,endDate ,status} = this.query;
      const data = { 
            startDate: this.$moment(startDate).format("YYYY-MM-DD")  ,
            endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
            status:status
        };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      api.getsendOrderReport(data).then((res) => {
        if (res.code === 0) {
          const { sendOrderReport} = res.data;
          this.query.data = sendOrderReport;
          let actualPaymentNum = 0
          let totalPurchasePrice = 0
          this.query.data.map((item,index)=>{
            actualPaymentNum +=Number(item.actualPayment)
            totalPurchasePrice +=Number(item.purchasePrice)
          })
          this.actualPaymentNum = Math.floor(actualPaymentNum * 100) / 100
          this.totalPurchasePrice = Math.floor(totalPurchasePrice * 100) / 100
        }
      });
    },
    // 导出
    exportsendOrder(){
      const { startDate,endDate ,status} = this.query;
      const data = { 
        startDate: this.$moment(startDate).format("YYYY-MM-DD")  ,
        endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        status:status
      };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      if(this.query.data.length==0){
          this.$Message.error('没有数据时不支持导出')
          return
      }
      api.getsendOrderReportExport(data).then((res) => {
        let name = this.$moment(new Date(startDate)).format("YYYY-MM-DD") + '-' + this.$moment(new Date(endDate)).format("YYYY-MM-DD") + '订单派单报表'
        download(res,name);
      });
    },
    handleModalVisibleChange(value){
        if (!value) {
          this.$emit("update:orderDispatchModel", false);
      }
    },
    handleModalVisibleChange(value){
        if (!value) {
          this.query.data = []
          this.query.startDate = this.$moment().startOf('month').format("YYYY-MM-DD")
          this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
          this.actualPaymentNum = 0
          this.totalPurchasePrice = 0
          this.query.status =""
          this.$emit("update:orderDispatchModel", false);

      }
    },
    // 取消
    cancelSubmits(name) {
      this.control = false;
      this.query.data = []
      this.query.startDate =this.$moment().startOf('month').format("YYYY-MM-DD")
      this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
      this.actualPaymentNum = 0
      this.totalPurchasePrice = 0
      this.query.status =""
      this.$emit("update:orderDispatchModel", false);
    },
  },
  created(){
    // this.getsendOrderReport()
  },
  watch: {
    orderDispatchModel(value){
        this.orderDispatchModels = value;
    },
    
  },

};
</script>
<style lang="less" scoped>
.top{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 20px;
  box-sizing: border-box;
}
.header{
  margin-bottom: 20px;
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
