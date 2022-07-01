<template>
  <div>
    <Modal
      v-model="hospitalOrderQuantityModels"
      title="医院订单量报表"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="100%"
      fullscreen
    >
       <Input
          v-model="query.hospitalName"
          placeholder="请输入医院名称"
          style="width: 200px;"
          @keyup.enter.native="gethospitalOrderQuantitys()"
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
      <Button type="primary" style="margin:0 10px" @click="gethospitalOrderQuantitys">查询</Button>
      <Button type="primary" @click="exportsendOrder">导出</Button>
      <Card class="container">
        <div>
            <Table border :columns="query.columns" :data="query.data" :span-method="handleSpan" height="700"></Table>
        </div>
       </Card>
        <div slot="footer" class=" foot">
          <div style="display:flex">
            <div class="num">合计采购总价：<div style="color:red">{{totalPurchasePrice}}</div></div>
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
    hospitalOrderQuantityModel: {
        type: Boolean,
    },
  },
  data() {
    return{
        hospitalOrderQuantityModels:false,
        totalPurchasePrice:0,
        actualPaymentNum:0,
        pageCount:0,
        query:{
          hospitalName:"",
          startDate:this.$moment().startOf('month').toDate(),
          endDate:this.$moment(new Date()).format("YYYY-MM-DD"),
          columns: [
            {
              title: "医院名称",
              key: "hospitalName",
              minWidth: 220,
            },
            
             {
              title: "订单号",
              key: "orderId",
              minWidth: 200,
            },
            {
              title: "下单平台",
              key: "appTypeText",
              minWidth: 100,
              
            },
            
            {
              title: "预约时间",
              tooltip:true,
              minWidth: 180,
              key: "time",
              render: (h, params) => {
                  
                return h(
                  "div",
                  params.row.time != '未明确时间' ?params.row.time:'未明确时间'
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
              minWidth: 120,
              tooltip:true
            },
            {
              title: "采购数量",
              key: "purchaseNum",
              minWidth: 100,
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
              minWidth: 120,
            },
            {
              title: "手机号",
              key: "encryptPhone",
              minWidth: 130,
            },
            
            {
              title: "派单人姓名",
              key: "sendName",
              minWidth: 130,
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
            
          ],
          data: [],
        }
    }
  },
  methods:{
    // 获取医院订单量报表
    gethospitalOrderQuantitys() {
      const { startDate,endDate ,hospitalName} = this.query;
      const data = { 
            startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
            endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
            hospitalName,
        };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      api.gethospitalOrderReport(data).then((res) => {
        if (res.code === 0) {
          const { hospitalOrderReport} = res.data;
          this.query.data = hospitalOrderReport;
          this.integratedData(this.query.data)
          let actualPaymentNum = 0
          let totalPurchasePrice = 0
          this.pageCount = this.query.data.length
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
      const { startDate,endDate ,hospitalName} = this.query;
      const data = { 
        startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
        endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        hospitalName
      };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      if(this.query.data.length==0){
          this.$Message.error('没有数据时不支持导出')
          return
      }
      api.gethospitalOrderReportExport(data).then((res) => {
        let name = this.$moment(new Date(startDate)).format("YYYY-MM-DD") + '-' + this.$moment(new Date(endDate)).format("YYYY-MM-DD") + '医院订单量报表'
        download(res,name);
      });
    },
    handleModalVisibleChange(value){
        if (!value) {
          this.isEdit = false;
          this.query.data = []
          this.query.startDate =  this.$moment().startOf('month').format("YYYY-MM-DD") 
          this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
          this.query.hospitalName = ""
          this.totalPurchasePrice = 0
          this.$emit("update:hospitalOrderQuantityModel", false);
      }
    },
    // 取消
    cancelSubmits(name) {
      this.isEdit = false;
      this.control = false;
      this.query.data = []
      this.query.startDate =  this.$moment().startOf('month').format("YYYY-MM-DD") 
      this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
      this.query.hospitalName = ""
      this.totalPurchasePrice = 0
      this.$emit("update:hospitalOrderQuantityModel", false);
    },
    // 被整理的数组中相同hospitalName的元素需放在一块，否则还要再整理数据（暂未处理）
    integratedData(data) {
        let that = this;
        // 获取所有的不同年龄值
        let arrId = [];
        data.forEach(i => {
            !arrId.includes(i.hospitalName) ? arrId.push(i.hospitalName) : arrId;
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
                k.hospitalName === l.id ? l.num ++ : l.num;
            })
        })
        data.forEach(m => {
            arrObj.forEach((n,index) => {
                if(m.hospitalName === n.id){
                    if(arrId.includes(m.hospitalName)){
                        m.mergeCol = n.num;
                        arrId.splice(arrId.indexOf(m.hospitalName),1);
                    }else{
                        m.mergeCol = 0;
                    }
                }
            })
        })
        return data;
    },
    // 只针对相同hospitalName字段合并列，hospitalName位于第一列，columnIndex为0
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
  },
  watch: {
    hospitalOrderQuantityModel(value){
        this.hospitalOrderQuantityModels = value;
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
