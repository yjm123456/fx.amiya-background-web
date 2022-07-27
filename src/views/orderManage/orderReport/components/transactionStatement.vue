<template>
  <div>
    <Modal
      v-model="transactionStatementModals"
      title="成交情况报表"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="100%"
      fullscreen
    >
      <div class="containers">
        <div class="left">
            <div>
             <DatePicker
                type="date"
                placeholder="登记开始日期"
                style="width: 180px;"
                :value="query.startDate"
                v-model="query.startDate"
            ></DatePicker>
            <DatePicker
                type="date"
                placeholder="登记结束日期"
                style="width: 180px; margin-left: 10px"
                :value="query.endDate"
                v-model="query.endDate"
            ></DatePicker>
            <Input
              v-model="query.keyWord"
              placeholder="请输入关键字"
              style="width: 180px; margin-left: 10px "
              @keyup.enter.native="transactionStatement()"
            />
            <Select
              v-model="query.isToHospital"
              style="width: 180px;margin-left:10px"
              placeholder="请选择到院状态"
            >
              <Option
                v-for="item in query.toTheHospitalList"
                :value="item.type"
                :key="item.type"
                >{{ item.name }}</Option
              >
            </Select>
            <DatePicker
              type="date"
              placeholder="到院开始日期"
              style="width: 180px;margin-left: 10px"
              :value="query.tohospitalStartDate"
              v-model="query.tohospitalStartDate"
              transfer
              :disabled="query.isToHospital!='true'"
              
            ></DatePicker>
            <DatePicker
              type="date"
              placeholder="到院结束日期"
              style="width: 180px; margin-left: 10px"
              :value="query.toHospitalEndDate"
              v-model="query.toHospitalEndDate"
              transfer
              :disabled="query.isToHospital!='true'"
            ></DatePicker>
            <Select
              v-model="query.toHospitalType"
              placeholder="请选择到院类型"
              clearable
              style="width: 180px; margin-left: 10px"
              filterable
              :disabled="query.isToHospital!='true'"
            >
              <Option
                v-for="item in transactionParams.toHospitalTypeList"
                :value="item.orderType"
                :key="item.orderType"
                >{{ item.orderTypeText }}</Option
              >
            </Select>
            <Select
                v-model="query.customerServiceId"
                style="width: 180px;margin-left:10px"
                placeholder="请选择跟进人员"
            >
            <Option
                v-for="item in transactionParams.employee"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
            >
            </Select>
            
            
        
            </div>
            <div style="margin-top:10px">
                <Select
                    v-model="query.isAccompanying"
                    style="width: 180px;"
                    placeholder="是否陪诊"
                    >
                    <Option
                        v-for="item in query.isAccompanyingList"
                        :value="item.type"
                        :key="item.type"
                        >{{ item.name }}</Option
                    >
                    </Select>
                    <Select
                    v-model="query.isOldCustomer"
                    style="width: 180px;margin-left:10px"
                    placeholder="新老客业绩"
                    >
                    <Option
                        v-for="item in query.isOldCustomerList"
                        :value="item.type"
                        :key="item.type"
                        >{{ item.name }}</Option
                    >
                </Select>
                <Select
                    v-model="query.checkState"
                    placeholder="审核状态"
                    style="width: 180px; margin-left: 10px"
                >
                    <Option
                    v-for="item in query.checkStateListAll"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.name }}</Option
                    >
                </Select>
                <Select
                    v-model="query.isReturnBakcPrice"
                    style="width: 180px;margin-left:10px"
                    placeholder="是否回款"
                    >
                    <Option
                        v-for="item in query.isReturnBakcPriceList"
                        :value="item.type"
                        :key="item.type"
                        >{{ item.name }}</Option
                    >
                </Select>
                <DatePicker
                    type="date"
                    placeholder="回款开始时间"
                    style="width: 180px;margin-left:10px"
                    :value="query.returnBackPriceStartDate"
                    v-model="query.returnBackPriceStartDate"
                    :disabled="query.isReturnBakcPrice!='true'"
                ></DatePicker>
                <DatePicker
                    type="date"
                    placeholder="回款结束时间"
                    style="width: 180px; margin-left: .625rem"
                    :value="query.returnBackPriceEndDate"
                    v-model="query.returnBackPriceEndDate"
                    :disabled="query.isReturnBakcPrice!='true'"
                ></DatePicker>
                <Select
                  v-model="query.isDeal"
                  style="width: 180px; margin-left: 10px"
                  placeholder="请选择成交状态"
                >
                  <Option
                    v-for="item in query.dealList"
                    :value="item.type"
                    :key="item.type"
                    >{{ item.name }}</Option
                  >
                </Select>
                <Select
                    v-model="query.lastDealHospitalId"
                    style="width: 180px; margin-left: 10px"
                    placeholder="请选择成交医院"
                    filterable
                    :disabled="query.isDeal!='true'"
                >
                    <Option
                    v-for="item in transactionParams.dealHospitalList"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.name }}</Option
                    >
                </Select>
            </div>
        </div>
        <div class="right">
            <Button type="primary" style="margin:0 10px" @click="transactionStatement">查询</Button>
            <Button type="primary" @click="exportsendOrder"  v-has="{ role: ['fx.amiya.permission.EXPORT'] }">导出</Button>
        </div>
      </div>
      
      
      <Card class="container">
        <div>
            <Table border :columns="query.columns" :data="query.data" height="700"></Table>
        </div>
       </Card>
        <div slot="footer" class=" foot">
          <div  style="display:flex">
            <div class="num">合计审核金额：<div style="color:red">{{checkPrice}}</div></div>
            <div class="num">合计结算金额：<div style="color:red">{{settlePrice}}</div></div>
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
    transactionStatementModal: {
        type: Boolean,
    },
    contentPalteForms:{
      type:Array
    },
    transactionParams:{
      type:Object
    }
  },
  data() {
    return{
      // 主播IP账号
        liveAnchors:[],
        checkPrice:0,
        settlePrice:0,
        pageCount:0,
        transactionStatementModals:false,
        query:{
          // 成交医院  
          dealHospitalId:-1,
          // 审核状态
          checkState:-1,
        //   是否到院
        isToHospital:-1,
        // 到院开始时间
        tohospitalStartDate:'',
        // 到院结束时间
        toHospitalEndDate:'',
        //到院类型
        toHospitalType:-1,
        // 是否成交
        isDeal:-1,
        // 成交医院
        lastDealHospitalId:-1,
        // 是否陪诊
        isAccompanying:-1,
        // 新老客业绩
        isOldCustomer:-1,
        // 是否回款
        isReturnBakcPrice:-1,
        // 回款开始时间
        returnBackPriceStartDate:'',
        // 回款结束时间
        returnBackPriceEndDate:'',
        // 跟进人员
        customerServiceId:-1,
          startDate:this.$moment().startOf('month').format("YYYY-MM-DD"),
          endDate:this.$moment(new Date()).format("YYYY-MM-DD"),
          keyWord:'',
          columns: [
          {
            title: "编号",
            key: "id",
            minWidth: 180,
            align:'center'
          },
          {
            title: "登记时间",
            key: "createDate",
            minWidth: 170,
            align:'center',
            render: (h, params) => {
              return params.row.createDate
                ? h(
                    "div",
                    this.$moment(params.row.createDate).format("YYYY-MM-DD HH:mm:ss")
                  )
                : "";
            },
          },
          {
            title: "订单编号",
            key: "contentPlatFormOrderId",
            minWidth: 180,
            align:'center'
          },
          {
            title: "下单时间",
            key: "orderCreateDate",
            minWidth: 120,
            align:'center',
            render: (h, params) => {
              return params.row.orderCreateDate
                ? h(
                    "div",
                    this.$moment(params.row.orderCreateDate).format("YYYY-MM-DD")
                  )
                : "";
            },
          },
          {
            title: "派单时间",
            key: "sendOrderDate",
            minWidth: 120,
            align:'center',
            render: (h, params) => {
              return params.row.sendOrderDate
                ? h(
                    "div",
                    this.$moment(params.row.sendOrderDate).format("YYYY-MM-DD")
                  )
                : "";
            },
          },
          {
            title: "平台",
            key: "contentPlatFormName",
            minWidth: 130,
            align:'center'
          },
          {
            title: "主播",
            key: "liveAnchorName",
            minWidth: 130,
            align:'center'
          },
          {
            title: "项目",
            key: "goodsName",
            minWidth: 130,
            align:'center'
          },
          {
            title: "客户昵称",
            key: "goodsName",
            minWidth: 130,
            align:'center'
          },
          {
            title: "手机号",
            key: "phone",
            minWidth: 130,
            align:'center'
          },
          {
            title: "是否到院",
            key: "isToHospital",
            minWidth: 120,
            align: "center",
            
          },
          {
            title: "到院类型",
            key: "toHospitalTypeText",
            minWidth: 120,
            align:'center'
          },
          
          {
            title: "到院时间",
            key: "tohospitalDate",
            minWidth: 120,
            align:'center',
            render: (h, params) => {
              return params.row.tohospitalDate
                ? h(
                    "div",
                    this.$moment(params.row.tohospitalDate).format("YYYY-MM-DD")
                  )
                : "";
            },
          },
          {
            title: "成交医院",
            key: "lastDealHospital",
            minWidth: 220,
            align:'center'
          },
          {
            title: "是否成交",
            key: "isDeal",
            minWidth: 120,
            align: "center",
            
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 200,
            align:'center'
          },
          {
            title: "成交金额",
            key: "price",
            minWidth: 120,
            align:'center'
          },
          {
            title: "成交时间",
            key: "dealDate",
            minWidth: 120,
            align:'center',
            render: (h, params) => {
              return params.row.dealDate
                ? h(
                    "div",
                    this.$moment(params.row.dealDate).format("YYYY-MM-DD")
                  )
                : "";
            },
          },
          {
            title: "三方订单号",
            key: "otherOrderId",
            minWidth: 180,
            align:'center'
          },
          {
            title: "新老客业绩",
            key: "isOldCustomer",
            minWidth: 120,
            align:'center',
          },
          {
            title: "是否陪诊",
            key: "isAcompanying",
            minWidth: 120,
            align: "center",
          },
          {
            title: "佣金比例(%)",
            key: "commissionRatio",
            minWidth: 180,
            align:'center',
            render: (h, params) => {
              return h(
                    "div",
                    params.row.commissionRatio  ? params.row.commissionRatio + '%' : '0%'
                  )
                ;
            }
          },
          {
            title: "审核状态",
            key: "checkStateText",
            minWidth: 120,
            align:'center',
            render: (h, params) => {
              if (params.row.checkStateText == "审核通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.checkStateText
                );
              } else if (params.row.checkStateText == "未审核") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.checkStateText
                );
              } else if (params.row.checkStateText == "审核不通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.checkStateText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.checkStateText
                );
              }
            },
          },
          {
            title: "审核金额",
            key: "checkPrice",
            minWidth: 120,
            align:'center'
          },
          {
            title: "审核时间",
            key: "checkDate",
            minWidth: 120,
            align:'center',
            render: (h, params) => {
              return params.row.checkDate
                ? h(
                    "div",
                    this.$moment(params.row.checkDate).format("YYYY-MM-DD")
                  )
                : "";
            },
          },
          {
            title: "结算金额",
            key: "settlePrice",
            minWidth: 120,
            align:'center'
          },
          {
            title: "审核人",
            key: "checkByEmpName",
            minWidth: 120,
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
          {
            title: "面诊员",
            key: "consultationEmpName",
            minWidth: 120,
            align:'center'
          },
          {
            title: "跟进人员",
            key: "createByEmpName",
            minWidth: 120,
            align:'center'
          },
          ],
          data: [],
          checkStateListAll:[{id:-1,name:'全部审核状态'}],
          // 是否到院
            toTheHospitalList:[
                {
                    type:-1,
                    name:'全部到院状态'
                },
                {
                    type:'true',
                    name:'已到院'
                },
                {
                    type:'false',
                    name:'未到院'
                }
            ],
            // 成交列表
            dealList:[
                {
                    type:-1,
                    name:'全部成交状态'
                },
                {
                    type:'true',
                    name:'已成交'
                },
                {
                    type:'false',
                    name:'未成交'
                }
            ],
            // 陪诊列表
            isAccompanyingList:[
                {
                    type:-1,
                    name:'全部陪诊状态'
                },
                {
                    type:'true',
                    name:'是'
                },
                {
                    type:'false',
                    name:'否'
                }
            ],
            // 新老客列表
            isOldCustomerList:[
                {
                    type:-1,
                    name:'全部客户业绩'
                },
                {
                    type:'true',
                    name:'老客'
                },
                {
                    type:'false',
                    name:'新客'
                }
            ],
            // 回款列表
            isReturnBakcPriceList:[
                {
                    type:-1,
                    name:'全部回款状态'
                },
                {
                    type:'true',
                    name:'已回款'
                },
                {
                    type:'false',
                    name:'未回款'
                }
            ],
        }
    }
  },
  methods:{
    contentPlateChange(value){
      if(!value){
        return
      }
      this.getLiveValidList(value)
    },
    // 根据平台id去获取IP账号
    getLiveValidList(value){
      const data={
        contentPlatFormId:value
      }
      api.getLiveValidList(data).then((res) => {
        if(res.code === 0){
          const {liveAnchors} = res.data
          this.liveAnchors = liveAnchors
        }
      })
    },
      // 获取审核情况（下拉框）
    getCheckStateList(){
      apis.getCheckStateList().then((res) => {
        if(res.code === 0){
          const {checkStateList} = res.data
          this.checkStateList = checkStateList
          this.query.checkStateListAll = [...this.query.checkStateListAll,...checkStateList]
        }
      })
    },
    // 获取内容平台成交订单报表
    transactionStatement() {
      const { startDate,endDate ,checkState,liveAnchorId,dealHospitalId,isToHospital,tohospitalStartDate,toHospitalEndDate,toHospitalType,isDeal
      ,lastDealHospitalId,isAccompanying,isOldCustomer,isReturnBakcPrice,returnBackPriceStartDate,returnBackPriceEndDate,customerServiceId,keyWord} = this.query;
      const data = { 
            startDate: this.$moment(startDate).format("YYYY-MM-DD")  ,
            endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
            checkState:checkState == -1 ? null : checkState,
            liveAnchorId,
            dealHospitalId: dealHospitalId == -1 ? null : dealHospitalId,

            toHospitalType:toHospitalType== -1 ? null : toHospitalType,
            isToHospital : isToHospital == -1 ? null : isToHospital,
            tohospitalStartDate : isToHospital =='true' ? (tohospitalStartDate ? this.$moment(tohospitalStartDate).format("YYYY-MM-DD") : null)  : null ,
            toHospitalEndDate: isToHospital =='true' ? (toHospitalEndDate ? this.$moment(toHospitalEndDate).format("YYYY-MM-DD") : null) : null ,
            isDeal : isDeal == -1 ? null : isDeal,
            lastDealHospitalId: isDeal =='true' ? (lastDealHospitalId == -1 ? null : lastDealHospitalId): null  ,
            isAccompanying:isAccompanying == -1 ? null : isAccompanying,
            isOldCustomer:isOldCustomer == -1 ? null : isOldCustomer,
            isReturnBakcPrice : isReturnBakcPrice == -1 ? null : isReturnBakcPrice,
            returnBackPriceStartDate: isReturnBakcPrice =='true' ?  (returnBackPriceStartDate ? this.$moment(returnBackPriceStartDate).format("YYYY-MM-DD") : null) : null ,
            returnBackPriceEndDate: isReturnBakcPrice =='true' ? (returnBackPriceEndDate ? this.$moment(returnBackPriceEndDate).format("YYYY-MM-DD") : null) : null ,
            customerServiceId: customerServiceId == -1 ?  null : customerServiceId,
            keyWord
        };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      api.contentPlatFormOrderDealInfoReport(data).then((res) => {
        if (res.code === 0) {
          const { contentPlatFormOrderDealInfo} = res.data;
          this.query.data = contentPlatFormOrderDealInfo;
          this.pageCount = this.query.data.length
          let checkPrice = 0
          let settlePrice = 0
          this.query.data.map((item,index)=>{
            checkPrice +=Number(item.checkPrice)
            settlePrice +=Number(item.settlePrice)
          })
          this.checkPrice = Math.floor(checkPrice * 100) / 100
          this.settlePrice = Math.floor(settlePrice * 100) /100
        }
      });
    },
    // 导出
    exportsendOrder(){
      const { startDate,endDate ,checkState,liveAnchorId,dealHospitalId,isToHospital,tohospitalStartDate,toHospitalEndDate,toHospitalType,isDeal
      ,lastDealHospitalId,isAccompanying,isOldCustomer,isReturnBakcPrice,returnBackPriceStartDate,returnBackPriceEndDate,customerServiceId,keyWord} = this.query;
      const data = { 
        startDate: this.$moment(startDate).format("YYYY-MM-DD")  ,
        endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        checkState:checkState == -1 ? null : checkState,
        liveAnchorId,
        dealHospitalId: dealHospitalId == -1 ? null : dealHospitalId,
        toHospitalType:toHospitalType== -1 ? null : toHospitalType,
        isToHospital : isToHospital == -1 ? null : isToHospital,
        tohospitalStartDate : isToHospital =='true' ? (tohospitalStartDate ? this.$moment(tohospitalStartDate).format("YYYY-MM-DD") : null)  : null ,
        toHospitalEndDate: isToHospital =='true' ? (toHospitalEndDate ? this.$moment(toHospitalEndDate).format("YYYY-MM-DD") : null) : null ,
        isDeal : isDeal == -1 ? null : isDeal,
        lastDealHospitalId: isDeal =='true' ? (lastDealHospitalId == -1 ? null : lastDealHospitalId): null  ,
        isAccompanying:isAccompanying == -1 ? null : isAccompanying,
        isOldCustomer:isOldCustomer == -1 ? null : isOldCustomer,
        isReturnBakcPrice : isReturnBakcPrice == -1 ? null : isReturnBakcPrice,
        returnBackPriceStartDate: isReturnBakcPrice =='true' ?  (returnBackPriceStartDate ? this.$moment(returnBackPriceStartDate).format("YYYY-MM-DD") : null) : null ,
        returnBackPriceEndDate: isReturnBakcPrice =='true' ? (returnBackPriceEndDate ? this.$moment(returnBackPriceEndDate).format("YYYY-MM-DD") : null) : null ,
        customerServiceId: customerServiceId == -1 ?  null : customerServiceId,
        keyWord
      };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      if(this.query.data.length==0){
          this.$Message.error('没有数据时不支持导出')
          return
      }
      api.exportContentPlatFormOrderDealInfo(data).then((res) => {
        let name = this.$moment(new Date(startDate)).format("YYYY-MM-DD") + '-' + this.$moment(new Date(endDate)).format("YYYY-MM-DD") + '成交情况报表'
        download(res,name);
      });
    },
    handleModalVisibleChange(value){
        if (!value) {
          this.isEdit = false;
          // this.$refs["form"].resetFields();
          this.$emit("update:transactionStatementModal", false);
      }
    },
    handleModalVisibleChange(value){
        if (!value) {
          this.isEdit = false;
          // this.$refs["form"].resetFields();
          this.$emit("update:transactionStatementModal", false);
          this.query.data = []
          
          this.pageCount = 0
          this.query.checkState = -1
          this.checkPrice = 0
          this.settlePrice = 0
          this.query.liveAnchorId = null 
          this.query.contentPlatFormId = null
          this.liveAnchors = []
          this.query={}
          this.query.startDate = this.$moment().startOf('month').format("YYYY-MM-DD")
          this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
      }
    },
    // 取消
    cancelSubmits(name) {
      this.isEdit = false;
      this.control = false;
      this.$emit("update:transactionStatementModal", false);
      this.query.data = []
      this.pageCount = 0
      this.query.checkState = -1
      this.checkPrice = 0
      this.settlePrice = 0
      this.query.liveAnchorId = null 
      this.query.contentPlatFormId = null
      this.liveAnchors = []
      this.query={}
      this.query.startDate =this.$moment().startOf('month').format("YYYY-MM-DD")
      this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
    },
  },
  created(){
    // this.transactionStatement()
    this.getCheckStateList()
  },
  watch: {
    transactionStatementModal(value){
        this.transactionStatementModals = value;
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
.containers{
    display: flex;
    align-items: center;
}

</style>
