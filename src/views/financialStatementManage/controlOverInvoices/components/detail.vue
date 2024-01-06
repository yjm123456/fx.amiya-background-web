<template>
  <div>
    <Modal
      v-model="control"
      title="查看详情"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="70%"
    >
    <div class="title">收款公司开票</div>
    <div class="top">
        <span class="span">收款公司：{{detailParams.collectionCompanyName}}</span>
        <div class="num_con">
            <span class="span">对账单合计金额：{{ dealAmount.toFixed(2)}}元</span>
            <span class="span">发票金额：{{ billPrice}}元</span>
            <span class="span">其他费用：{{ otherPrice}}元</span>
            <span class="span">发票总金额：{{totalNumAll }}元</span>
        </div>
       
    </div>
     <div  class="center">
        <div class="title2">发票区域</div>
        <div class="table_con">
            <Table border :columns="query.columns" :data="query.collectionList" ></Table>
        </div>
     </div>
     <div  class="center">
        <div class="title2">明细区域</div>
        <Table border :columns="query.columns2" :data="detailParams.reconciliationDocumentList"></Table>
     </div>
      <div slot="footer">
        <Button @click="handleCancel('form')">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/bill";
export default {
  components: {},
  props: {
    detailModel: Boolean,
    detailParams: Object,
  },
  data() {
    return {
      control: false,
      query:{
        //发票区域  
        collectionList:[],
        columns: [
            {
            title: "序号",
            key: "id",
            align:'center',
            minWidth:50
          },
          {
            title: "开票时间",
            key: "createDate",
            align:'center',
            minWidth:140,
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.createDate).format("YYYY-MM-DD") 
                 
              );
            },
          },
          {
            title: "发票金额",
            key: "billPrice",
            align:'center',
            minWidth:140
          },
          {
            title: "客户",
            key: "hospitalName",
            align:'center',
            minWidth:220
          },
        ],
        columns2: [
            {
            title: "对账单编号",
            key: "id",
            align:'center',
            minWidth: 180,
          },
          {
            title: "客户",
            key: "hospitalName",
            align:'center',
            minWidth: 240,
          },
          {
            title: "成交金额",
            key: "totalDealPrice",
            align:'center',
            minWidth: 120,
          },
          {
            title: "信息服务费比例(%)",
            key: "returnBackPricePercent",
            align:'center',
            minWidth: 160,
            
          },
          {
            title: "信息服务费金额",
            key: "returnBackPrice",
            align:'center',
            minWidth: 140,
          },
          {
            title: "系统维护费比例(%)",
            key: "systemUpdatePricePercent",
            align:'center',
            minWidth: 160,
          },
          {
            title: "系统维护费金额",
            key: "systemUpdatePrice",
            align:'center',
            minWidth: 140,
          },
          {
            title: "服务费合计",
            key: "returnBackTotalPrice",
            align:'center',
            minWidth: 150,
          },
        ],
      },
      dealAmount:0,
      billPrice:0,
      otherPrice:0,
      totalNumAll:0
    };
  },
  methods: {
    handleCancel(name) {
      this.$emit("update:detailModel", false);
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.$emit("update:detailModel", false);
      }
    },
  },
  created() {},
  watch: {
    detailModel(value) {
      this.control = value;
      this.query.collectionList = [
        {
            id:1,
            createDate:this.detailParams.createDate,
            billPrice:this.detailParams.billPrice,
            hospitalName:this.detailParams.hospitalName,
        }
      ]
      let totalNum = 0
    //   合计明细区域的成交金额
    this.detailParams.reconciliationDocumentList.map(item=>{
     totalNum += Number(item.totalDealPrice);
    })
    this.dealAmount = Math.floor(totalNum * 100) / 100;
    // billPrice:0,
    //   otherPrice:0,
    //   totalNumAll:0
    this.billPrice = (this.detailParams.billPrice).toFixed(2)
    this.otherPrice = (this.detailParams.otherPrice).toFixed(2)
    this.totalNumAll = (this.detailParams.billPrice + this.detailParams.otherPrice).toFixed(2)

    },
  },
};
</script>
<style scoped>
.page_wrap {
  text-align: right;
  margin-top: 10px;
}
.title,.title2{
  font-weight: 16px;
    font-weight: bold;
    color: black;
    margin: 10px 0 ;
}
.title{
    text-align: center;
}
.span{
    margin-right: 70px;
}
.center{
    margin: 40px 0;
}
.num_con{
    margin-top: 25px;
}
.table_con{
    width: 70%;
}
</style>
