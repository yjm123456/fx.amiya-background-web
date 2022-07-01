<template>
  <div>
    <Modal
      v-model="customerUpgradeModels"
      title="客户升单报表"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="100%"
      fullscreen
    >
        <Input
            v-model="query.customerName"
            placeholder="请输入客户昵称"
            style="width: 200px;"
            @keyup.enter.native="getcustomerUpgrade()"
        />
        <DatePicker
          type="date"
          placeholder="下单开始日期"
          style="width: 160px;margin-left: 10px"
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
        <DatePicker
          type="date"
          placeholder="审核开始日期"
          style="width: 160px;margin-left: 10px"
          :value="query.checkDateStart"
          v-model="query.checkDateStart"
        ></DatePicker>
        <DatePicker
          type="date"
          placeholder="审核结束日期"
          style="width: 160px; margin-left: 10px"
          :value="query.checkDateEnd"
          v-model="query.checkDateEnd"
        ></DatePicker>
        <Select
            v-model="query.channel"
            style="width: 160px; margin-left: 10px"
            placeholder="升单渠道"
          >
            <Option
              v-for="item in channelType"
              :value="item.type"
              :key="item.type"
              >{{ item.typeText }}</Option
            >
          </Select>
          <Select
            v-model="query.checkState"
            placeholder="审核状态"
            style="width: 160px; margin-left: 10px"
          >
            <Option
              v-for="item in query.checkStateListAll"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.hospitalId"
            style="width: 210px; margin-left: 10px"
            placeholder="医院"
            filterable
          >
            <Option
              v-for="item in hospitalNameList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
      <Button type="primary" style="margin:0 10px" @click="getcustomerUpgrade">查询</Button>
      <Button type="primary" @click="exportcustomerUpgrade">导出</Button>
      <Card class="container">
        <div>
            <Table border :columns="query.columns" :data="query.data" height="700"></Table>
        </div>
       </Card>
        <div slot="footer" class=" foot">
          <div style="display:flex;">
            <div class="num">合计总金额：<div style="color:red">{{actualPaymentNum}}</div></div>
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
import * as apis from "@/api/customerManage.js";
import { download } from "@/utils/util";
export default {
  props: {
    customerUpgradeModel: {
        type: Boolean,
    },
    hospitalNameList:{
      type:Array
    }
  },
  data() {
    return{
        // 圣诞渠道
        channelType:[],
        actualPaymentNum:0,
        pageCount:0,
        customerUpgradeModels:false,
        query:{
          hospitalId:-1,
          // 审核状态
          checkState:-1,
          checkStateListAll:[{id:-1,name:'全部审核状态'}],
          // 升单渠道
          channel:'',
          customerName:"",
          startDate:this.$moment().startOf('month').format("YYYY-MM-DD"),
          endDate:this.$moment(new Date()).format("YYYY-MM-DD"),
          checkDateStart:'',
          checkDateEnd:'',
          columns: [
            {
              title: "登记日期",
              tooltip:true,
              minWidth: 180,
              key: "time",
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
              title: "升单订单号",
              key: "consumeId",
              minWidth: 150,
              align:'center'
            },
            {
              title: "升单渠道",
              key: "channel",
              minWidth: 140,
              align:'center',

            },
            {
              title: "归属主播",
              key: "liveAnchorName",
              minWidth: 140,
              align:'center',

            },
            {
              title: "抖店订单号",
              key: "otherContentPlatFormOrderId",
              minWidth: 180,
              align:'center'
            },
            {
              title: "客户昵称",
              key: "nickName",
              minWidth: 180,
              tooltip:true,
              align:'center'
            },
            {
              title: "手机号",
              key: "phone",
              minWidth: 140,
              tooltip:true,
              align:'center'
            },
            {
              title: "是否携带订单",
              key: "isAddedOrder",
              minWidth: 140,
              tooltip:true,
              align:'center'
            },
            {
              title: "订单号",
              key: "orderId",
              minWidth: 200,
              align:'center'
            },
            {
              title: "核销日期",
              tooltip:true,
              minWidth: 180,
              key: "time",
              align:'center',
              render: (h, params) => {
                return h(
                  "div",
                  params.row.writeOffDate ?this.$moment(params.row.writeOffDate).format(
                    "YYYY-MM-DD HH:mm:ss"
                  ):""
                );
              },
            },
            {
              title: "消费类型",
              key: "consumeTypeText",
              minWidth: 140,
              align:'center'
            },
            {
              title: "项目",
              key: "itemName",
              minWidth: 160,
              align:'center'
            },
            {
              title: "是否为面诊卡",
              key: "isCconsultationCard",
              minWidth: 140,
              align:'center'
            },
            {
              title: "医院",
              key: "hospitalName",
              minWidth: 220,
              align:'center'
            },
            
            {
              title: "升单类型",
              key: "buyAgainTypeText",
              minWidth: 120,
              align:'center'
            },
            {
              title: "金额",
              key: "price",
              minWidth: 120,
              align:'center'
            },
            {
              title: "是否为外播",
              key: "isSelfLiving",
              minWidth: 140,
              align:'center'
            },
            {
              title: "升单日期",
              tooltip:true,
              minWidth: 180,
              key: "time",
              align:'center',
              render: (h, params) => {
                return h(
                  "div",
                  this.$moment(params.row.buyAgainTime).format(
                    "YYYY-MM-DD"
                  )
                );
              },
            },
            {
              title: "是否有升单证明",
              key: "hasBuyagainEvidence",
              minWidth: 140,
              align:'center'
            },
            {
              title: "是否与医院核实",
              key: "isCheckToHospital",
              minWidth: 140,
              align:'center'
            },
            {
              title: "跟进人员",
              key: "employeeName",
              minWidth: 140,
              align:'center'
            },
            {
              title: "人次",
              key: "personTime",
              minWidth: 80,
              align:'center'
            },
            {
              title: "是否领取加购礼",
              key: "isReceiveAdditionalPurchase",
              minWidth: 140,
              align:'center'
            },
            {
              title: "审核时间",
              tooltip:true,
              minWidth: 180,
              key: "time",
              align:'center',
              render: (h, params) => {
                return h(
                  "div",
                  params.row.checkDate?this.$moment(params.row.checkDate).format(
                    "YYYY-MM-DD HH:mm:ss"
                  ):''
                );
              },
            },
            {
              title: "审核状态",
              key: "checkState",
              minWidth: 140,
              align:'center',
              render: (h, params) => {
                if(params.row.checkState == '审核通过'){
                  return h('div',{
                    'style': {
                      'color': '#04B05D'
                    }
                  },params.row.checkState)
                }else if(params.row.checkState == '未审核'){
                  return h('div',{
                    'style': {
                      'color': 'red'
                    }
                  },params.row.checkState)
                }else if(params.row.checkState == '审核不通过'){
                  return h('div',{
                    'style': {
                      'color': 'blue'
                    }
                  },params.row.checkState)
                } else{
                  return h('div',{
                    'style': {
                      'color': '#515a6e'
                    }
                  },params.row.checkState)
                }
              },
            },
            {
              title: "审核升单金额",
              key: "checkBuyAgainPrice",
              minWidth: 140,
              align:'center'

            },
            {
              title: "审核结算金额",
              key: "checkSettlePrice",
              minWidth: 140,
              align:'center'

            },
            
            {
              title: "审核人员",
              key: "checkByEmpName",
              minWidth: 140,
              align:'center'
            },
            {
              title: "备注",
              key: "remark",
              minWidth: 300,
            },
            {
              title: "审核备注",
              key: "checkRemark",
              minWidth: 300,
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
              minWidth: 120,
              align:'center'
            },
            {
              title: "回款时间",
              key: "returnBackDate",
              minWidth: 180,
              align:'center',
              render: (h, params) => {
                return params.row.returnBackDate
                  ? h(
                      "div",
                      this.$moment(params.row.returnBackDate).format("YYYY-MM-DD HH:mm:ss")
                    )
                  : "";
              },
            },
          ],
          data: [],
        }
    }
  },
  methods:{
    // 获取审核情况（下拉框）
    getCheckStateList(){
      apis.getCheckStateList().then((res) => {
        if(res.code === 0){
          const {checkStateList} = res.data
          this.query.checkStateListAll = [...this.query.checkStateListAll,...checkStateList]
        }
      })
    },
    // 获取升单渠道
    getAppChannelList(){
      apis.appChannelList().then((res) => {
        if(res.code === 0){
          const {channelType} = res.data
          this.channelType = channelType
        }
      })
    },
    // 获取客户预约报表
    getcustomerUpgrade() {
      const { startDate,endDate  ,customerName,channel,checkDateStart,checkDateEnd,checkState,hospitalId} = this.query;
      const data = { 
            startDate: this.$moment(startDate).format("YYYY-MM-DD")  ,
            endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
            checkDateStart: checkDateStart ? this.$moment(checkDateStart).format("YYYY-MM-DD") : ''  ,
            checkDateEnd  :checkDateEnd ? this.$moment(checkDateEnd).format("YYYY-MM-DD") : "",
            customerName,
            channel,
            checkState:checkState == -1 ? null : checkState,
            hospitalId:hospitalId == -1 ? null : hospitalId
        };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      api.getcustomerBuyAgainReport(data).then((res) => {
        if (res.code === 0) {
          const { customerBuyAgainReport} = res.data;
          this.query.data = customerBuyAgainReport;
          this.pageCount = this.query.data.length
          let actualPaymentNum = 0
          this.query.data.map((item,index)=>{
            actualPaymentNum +=Number(item.price)
          })
          this.actualPaymentNum = Math.floor(actualPaymentNum * 100) / 100
        }
      });
    },
    // 导出
    exportcustomerUpgrade(){
      const { startDate,endDate  ,customerName,channel,checkDateStart,checkDateEnd,checkState,hospitalId} = this.query;
      const data = { 
        startDate: this.$moment(startDate).format("YYYY-MM-DD")  ,
        endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        checkDateStart: checkDateStart ? this.$moment(checkDateStart).format("YYYY-MM-DD") : ''  ,
        checkDateEnd  :checkDateEnd ? this.$moment(checkDateEnd).format("YYYY-MM-DD") : "",
        customerName,
        channel,
        checkState:checkState == -1 ? null : checkState,
        hospitalId:hospitalId == -1 ? null : hospitalId
      };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      if(this.query.data.length==0){
          this.$Message.error('没有数据时不支持导出')
          return
      }
      api.getcustomerBuyAgainReportExport(data).then((res) => {
        let name = this.$moment(new Date(startDate)).format("YYYY-MM-DD") + '-' + this.$moment(new Date(endDate)).format("YYYY-MM-DD") + '客户升单报表'
          download(res,name);
      });
    },
    handleModalVisibleChange(value){
        if (!value) {
          this.isEdit = false;
          this.query.data = []
          this.query.startDate =  this.$moment().startOf('month').format("YYYY-MM-DD")
          this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
          this.query.customerName = ''
          this.query.channel = ''
          this.$emit("update:customerUpgradeModel", false);
      }
    },
    // 取消
    cancelSubmits(name) {
      this.isEdit = false;
      this.control = false;
      this.query.data = []
      this.query.startDate =  this.$moment().startOf('month').format("YYYY-MM-DD")
      this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
      this.query.customerName = ''
      this.query.channel = ''
      this.$emit("update:customerUpgradeModel", false);
    },
  },
  created(){
    this.getAppChannelList()
    this.getCheckStateList()
  },
  watch: {
    customerUpgradeModel(value){
        this.customerUpgradeModels = value;
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
