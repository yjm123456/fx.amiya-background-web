<template>
  <div class="contents">
    <div class="h3">成交明细</div>
    <Form
      ref="form"
      :model="form"
      label-position="left"
      :label-width="90"
    >
      <Row :gutter="30">
        <Col span="8">
            <FormItem label="项目名称" prop="goodsName">
              <Input
                v-model="form.goodsName"
                placeholder="请输入项目名称"
              ></Input>
            </FormItem>
            </Col>
        <Col span="8">
          <FormItem label="项目规格" prop="goodsSpec">
            <Input
              v-model="form.goodsSpec"
              placeholder="请输入项目规格"
            ></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="数量" prop="quantity" >
            <Input
              v-model="form.quantity"
              placeholder="请输入数量(最小是0)"
              type="number"
              number
            ></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="金额" prop="price">
            <Input
              v-model="form.price"
              placeholder="请输入金额(最小是0)"
              type="number"
              number
            ></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <Button type="primary" @click="addDetail">添加明细</Button>
        </Col>
      </Row>
    </Form>
    
    <Divider style="margin-top:5px"/>
    <div class="h3">明细栏</div>
    <Table
      border
      :columns="query.columns"
      :data="query.data"
    ></Table>
    <Divider style="margin-top:5px"/>
    <div class="h3">客户在院消费列表</div>
    <div class="search">
      <div style="width:60%">
        
        <Input
          v-model="confirmParams.phone"
          placeholder="请输入关键字"
          style="width:180px;"
          disabled
        ></Input>
        <DatePicker
          type="date"
          placeholder="开始日期"
          style="width: 180px;margin-left: .625rem"
          :value="query2.startDate"
          v-model="query2.startDate"
        ></DatePicker>
        <DatePicker
          type="date"
          placeholder="结束日期"
          style="width: 180px;margin-left: .625rem"
          :value="query2.endDate"
          v-model="query2.endDate"
        ></DatePicker>
        
        <div style="margin-top:10px">
          <Select
          v-model="query2.type"
          placeholder="请选择成交类型"
          clearable
          filterable
          style="width:180px;"
        >
          <Option
            v-for="item in confirmParams.hospitalDealTypeList"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
          >
        </Select>
            <Select
              v-model="query2.consumptionType"
              placeholder="请选择消费类型"
              clearable
              filterable
              style="width:180px;margin-left:10px;"
            >
              <Option
                v-for="item in confirmParams.hospitalConsumptionTypeList"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            <Select
              v-model="query2.refundType"
              placeholder="请选择退款类型"
              clearable
              filterable
              style="width:180px;;margin-left:10px;margin-bottom:10px"
            >
              <Option
                v-for="item in confirmParams.hospitalRefundTypeList"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            <Button type="primary" @click="getCustomerHospitalDealInfo" style="margin-left:10px;margin-bottom:10px">查询</Button>
        </div>
        
      </div>
      <div style="width:40%">
        <div class="h3" style="margin-left:12px;margin-top:50px">详情</div>
      </div>
    </div>
    <div class="con_search">
      <div style="width:60%">
        <Table
          border
          :columns="query2.columns"
          :data="query2.data"
          style="width:100%;height:280px"
        ></Table>
        <div class="pages">
        <Page
          ref="pages"
          :current="query2.pageNum"
          :page-size="query2.pageSize"
          :total="query2.totalCount"
          show-total
          show-elevator
          @on-change="handleProjectPageChange"
        />
      </div>
      </div>
      <div style="width:40%">
        <Table
          border
          :columns="query3.columns"
          :data="query3.data"
          style="width:100%;margin-left:10px;height:280px"
        ></Table>
        <div class="pages">
        <Page
          ref="pages"
          :current="query3.pageNum"
          :page-size="query3.pageSize"
          :total="query3.totalCount"
          show-total
          show-elevator
          @on-change="handleProjectPageChange2"
        />
      </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
export default {
  props:{
    id:String,
    contentPlatFormOrderDealDetails:Array,
    confirmParams:Object,
    confirmForm:Object
  },
  data() {
    return {
      form: {
        // 项目名称
        goodsName: '',
        // 项目规格
        goodsSpec: '',
        // 数量
        quantity: null,
        // 金额
        price: null,
        contentPlatFormOrderId:''
      },
      
      query:{
        data:[],
        columns:[
          {
            title: "项目名称",
            key: "goodsName",
            align: "center",
            minWidth:100
          },
          {
            title: "项目规格",
            key: "goodsSpec",
            align: "center",
            minWidth:100
          },
          {
            title: "数量",
            key: "quantity",
            align: "center",
            minWidth:100
          },
          {
            title: "金额",
            key: "price",
            align: "center",
            minWidth:100
          },
          {
            title: "操作",
            align: "center",
            width: 150,
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small",
                      disabled:params.row.createBy != Number(sessionStorage.getItem('employeeId'))
                    },
                    on: {
                      click: () => {
                        const {index} = params.row;
                        const findIndex = this.query.data.findIndex(item=> item.index === index);
                        this.query.data.splice(findIndex,1)
                      },
                    },
                  },
                  "删除"
                ),
              ]);
            },
          },

        ]
      },
      index:0,
      query2:{
        keyWord:'',
        // 成交类型
        type:'-1',
        // 消费类型
        consumptionType:'-1',
        // 退款类型
        refundType:'-1',
        pageNum:1,
        pageSize:5,
        totalCount:0,
        startDate: this.$moment().startOf("month").format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        data:[],
        columns:[
          {
            title: "医院",
            key: "hospitalName",
            align: "center",
            minWidth:200,
            tooltip:true
          },
          {
            title: "消费金额",
            key: "totalCashAmount",
            align: "center",
            minWidth:120,
            tooltip:true,
          },
          
          {
            title: "成交类型",
            key: "typeText",
            align: "center",
            minWidth:100,
            tooltip:true
          },
          {
            title: "消费类型",
            key: "consumptionTypeText",
            align: "center",
            minWidth:100,
            tooltip:true
          },
          {
            title: "退款类型",
            key: "refundTypeText",
            align: "center",
            minWidth:100,
            tooltip:true
          },
          {
            title: "消费日期",
            key: "date",
            minWidth: 150,
            tooltip:true,
            align: "center",
            render: (h, params) => {
              return params.row.date
                ? h(
                    "div",
                    this.$moment(params.row.date).format("YYYY-MM-DD")
                  )
                : "";
            },
          },
          {
            title: "客户姓名",
            key: "customerName",
            align: "center",
            minWidth:100,
            tooltip:true
          },
          {
            title: "客户手机号",
            key: "customerPhone",
            align: "center",
            minWidth:140,
            tooltip:true
          },
          
          {
            title: "操作",
            align: "center",
            width: 150,
            fixed:'right',
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        const {id} = params.row;
                        // const findIndex = this.query.data.findIndex(item=> item.index === index);
                        // this.query.data.splice(findIndex,1)
                        this.ids = id
                        const data = {
                          keyWord:'',
                          pageNum:this.query3.pageNum,
                          pageSize:this.query3.pageSize,
                          customerHospitalDealId:this.ids,
                          startDate:null,
                          endDate:null
                        }
                        api.getCustomerHospitalDealDetails(data).then(res=>{
                          if(res.code ==0){
                            const {list,totalCount} =res.data.customerHospitalDealDetailsDetails
                            this.query3.data = list
                            this.query3.totalCount =totalCount
                          }
                        })
                      },
                    },
                  },
                  "详情"
                ),
              ]);
            },
          },

        ]
      },
      query3:{
        pageNum:1,
        pageSize:5,
        totalCount:0,
        data:[],
        columns:[
          {
            title: "项目名称",
            key: "itemName",
            align: "center",
            minWidth:150,
            tooltip:true
          },
          
          {
            title: "项目规格",
            key: "itemStandard",
            align: "center",
            minWidth:100,
            tooltip:true
          },
          {
            title: "数量",
            key: "quantity",
            align: "center",
            minWidth:80,
            tooltip:true
          },
          {
            title: "金额",
            key: "cashAmount",
            align: "center",
            minWidth:120,
            tooltip:true
          },
          
        ]

      },
      ids:''
    };
  },
  methods:{
    // 查询
    getCustomerHospitalDealInfo(){
      const {keyWord,type,consumptionType,refundType,pageNum,pageSize,startDate,endDate} = this.query2
      const data ={
        keyWord:this.confirmParams.phone,
        type: type == '-1' ? null : type,
        consumptionType: consumptionType == '-1' ? null : consumptionType,
        refundType: refundType == '-1' ? null : refundType,
        startDate: startDate ? this.$moment(new Date(startDate)).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(new Date(endDate)).format("YYYY-MM-DD") : null,
        hospitalId:this.confirmForm.lastDealHospitalId,
        pageNum,
        pageSize
      }
      if(!this.confirmForm.lastDealHospitalId){
        this.$Message.warning('请选择到院医院！')
        return
      }
      api.getCustomerHospitalDealInfo(data).then(res=>{
        if(res.code == 0){
          const {list, totalCount} = res.data.customerHospitalDealInfoInfo
          this.query2.data = list;
          this.query2.totalCount = totalCount;
        }
      })
    },
    // 列表分页
    handleProjectPageChange(pageNum) {
      const {keyWord,type,consumptionType,refundType,pageSize,startDate,endDate} = this.query2
      const data ={
        keyWord:this.confirmParams.phone,
        type: type == '-1' ? null : type,
        consumptionType: consumptionType == '-1' ? null : consumptionType,
        refundType: refundType == '-1' ? null : refundType,
        startDate: startDate ? this.$moment(new Date(startDate)).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(new Date(endDate)).format("YYYY-MM-DD") : null,
        hospitalId:this.confirmForm.lastDealHospitalId,
        pageNum,
        pageSize
      }
      api.getCustomerHospitalDealInfo(data).then(res=>{
        if(res.code == 0){
          const {list, totalCount} = res.data.customerHospitalDealInfoInfo
          this.query2.data = list;
          this.query2.totalCount = totalCount;
        }
      })
    },
    // 详情分页
    handleProjectPageChange2(pageNum){
      const data = {
        keyWord:'',
        pageNum:pageNum,
        pageSize:this.query3.pageSize,
        customerHospitalDealId:this.ids,
        startDate:null,
        endDate:null
      }
      api.getCustomerHospitalDealDetails(data).then(res=>{
        if(res.code ==0){
          const {list,totalCount} =res.data.customerHospitalDealDetailsDetails
          this.query3.data = list
          this.query3.totalCount =totalCount
        }
      })
    },
    addDetail(){
      const { goodsName,goodsSpec,quantity,price,contentPlatFormOrderId} = this.form
      if(!goodsName){
        this.$Message.warning('请输入项目名称')
        return
      }
      if(!goodsSpec){
        this.$Message.warning('请输入项目规格')
        return
      }
      if(quantity == null){
        this.$Message.warning('请输入数量(最小是0)')
        return
      }else{
        if(quantity<0){
          this.$Message.warning('数量(最小是0)')
          return
        }
      }
      if(price == null){
        this.$Message.warning('请输入金额最小是0')
        return
      }else{
        if(price<0){
          this.$Message.warning('金额最小是0')
          return
        }
      }
      this.query.data.push({
        goodsName,
        goodsSpec,
        quantity,
        price,
        contentPlatFormOrderId:this.id,
        index:this.index++,
        createBy:Number(sessionStorage.getItem('employeeId'))
      })
      this.$emit('handle',this.query.data)
      this.form.goodsName = ''
      this.form.goodsSpec = ''
      this.form.quantity = null
      this.form.price = null
      this.form.contentPlatFormOrderId = ''
     
    }
  },
  created(){
  },
  watch:{
    contentPlatFormOrderDealDetails(value){
      if(value){
        this.query.data = value
      }
    },
  }
};
</script>
<style scoped>
.contents{
  width: 100%;
  padding: 0 18px;
  box-sizing: border-box;
}
.h3{
  font-weight: bold;
  margin-top: -10px;
  margin-bottom: 15px;
  color: #000;
}
.con_search{
  display: flex;
}
.pages{
  text-align: end;
  margin-top: 10px;
}
.search{
  display: flex;
}
</style>