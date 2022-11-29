<template>
  <div>
    <Card class="container">
      <div>
        <div class="title">啊美雅健康参考值：新客上门率20% 新客成交率80% 新客客单价50K 老客复购率30% 老客客单价40K</div>
        <Table :row-class-name="rowClassName" border :columns="query.columns" :data="query.data" height="500"></Table>
        <div class="price_con">
          <div class="num">前月新客客单价总额：<span>{{query.lastNewCustomerUnitPriceNum}}</span></div>
          <div class="num">上月新客客单价总额：<span>{{query.thisNewCustomerUnitPriceNum}}</span></div>
          <div class="num">前月老客客单价总额：<span>{{query.lastOldCustomerUnitPriceNum}}</span></div>
          <div class="num">上月老客客单价总额：<span>{{query.thisOldCustomerUnitPriceNum}}</span></div>
          <div class="num">总条数：<span>{{query.totalNum}}</span></div>
        </div>
        <div>
          <div class="bottom">
            <div class="company">本表单位为：千元（K）</div>
            <div class="bottom_memo">（说明：数据统计时间上月与前月，机构展现不以业绩为导向）</div>
          </div>
        <!-- <div class="h1">啊美雅批注</div>
        <Input
            v-model="query.remark"
            style="width: 100%; "
            type="textarea"
            :rows="4"
            disabled
        /> -->
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/GreatHospitalOperationHealth";

export default {
  props:{
    indicatorsId:String,
    active:String
  },
  data() {
    return {
      // 查询
      query: {
        remark:'',
        keyword: "",
        valid:'true',
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "医院",
            key: "hospitalName",
            width:220
          },
          {
            title: "指标名称",
            key: "indicatorsName",
            width:180,
          },
          {
            title: "前月新客上门率",
            key: "lastNewCustomerVisitRate",
            render: (h, params) => {
              return h("div", params.row.lastNewCustomerVisitRate + "%");
            },
            width:140,
            align:'center'
          },
          {
            title: "上月新客上门率",
            key: "thisNewCustomerVisitRate",
            render: (h, params) => {
              return h("div", params.row.thisNewCustomerVisitRate + "%");
            },
            width:140,
            align:'center'
          },
          {
            title: "新客上门率环比",
            key: "newCustomerVisitChainRatio",
            render: (h, params) => {
              return h("div", params.row.newCustomerVisitChainRatio + "%");
            },
            width:140,
            align:'center'
          },
          {
            title: "前月新客成交率",
            key: "lastNewCustomerDealRate",
            render: (h, params) => {
              return h("div", params.row.lastNewCustomerDealRate + "%");
            },
            width:140,
            align:'center'
          },
          {
            title: "上月新客成交率",
            key: "thisNewCustomerDealRate",
            render: (h, params) => {
              return h("div", params.row.thisNewCustomerDealRate + "%");
            },
            width:140,
            align:'center',
            
          },

          {
            title: "新客成交率环比",
            key: "newCustomerDealChainRatio",
            render: (h, params) => {
              return h("div", params.row.newCustomerDealChainRatio + "%");
            },
            width:140,
            align:'center'
          },
          {
            title: "前月新客客单价",
            key: "lastNewCustomerUnitPrice",
            width:140,
            align:'center'
          },
          {
            title: "上月新客客单价",
            key: "thisNewCustomerUnitPrice",
            width:140,
            align:'center'
          },

          {
            title: "新客客单价环比",
            width:140,
            key: "newCustomerUnitPriceChainRatio",
            render: (h, params) => {
              return h("div", params.row.newCustomerUnitPriceChainRatio + "%");
            },
            align:'center'
          },
          {
            title: "前月老客复购率",
            key: "lastOldCustomerRepurchaseRate",
            width:140,
            align:'center',
            render: (h, params) => {
              return h("div", params.row.lastOldCustomerRepurchaseRate + "%");
            },
          },
          {
            title: "上月老客复购率",
            key: "thisOldCustomerRepurchaseRate",
            width:140,
            align:'center',
            render: (h, params) => {
              return h("div", params.row.thisOldCustomerRepurchaseRate + "%");
            },
          },

          {
            title: "老客复购率环比",
            key: "oldCustomerRepurchaseChainRatio",
            width:140,
            align:'center',
            render: (h, params) => {
              return h("div", params.row.oldCustomerRepurchaseChainRatio + "%");
            },
          },
          {
            title: "前月老客客单价",
            key: "lastOldCustomerUnitPrice",
            width:140,
            align:'center',
          },
          {
            title: "上月老客客单价",
            key: "thisOldCustomerUnitPrice",
            width:140,
            align:'center',
          },

          {
            title: "老客客单价环比",
            key: "oldCustomerUnitPriceChainRatio",
            width:140,
            align:'center',
            render: (h, params) => {
              return h("div", params.row.oldCustomerUnitPriceChainRatio + "%");
            },
          },
        ],
        data: [],
        totalCount: 0,
        lastNewCustomerUnitPriceNum:0,  
        thisNewCustomerUnitPriceNum:0,
        lastOldCustomerUnitPriceNum:0,
        thisOldCustomerUnitPriceNum:0,
        totalNum:0,
      },

    };
  },
  methods: {
    byIdRemark(){
      const data = {
        indicatorId:this.indicatorsId
      }
      api.getAmiyaRemark(data).then((res) => {
        this.query.remark = res.data.amiyaRemark.amiyaRemark
      })
    },
    rowClassName (row, index) {
        if (index === 0) {
            return 'one';
        }else if (index === 1) {
            return 'two';
        }else if (index === 2) {
            return 'three';
        }
        return '';
    },
    // 获取优秀机构指标列表
    getGreatHospitalOperationHealth() {
      const data = { 
        keyword:'',
        indicatorsId:this.indicatorsId
       };
      api.getGreatHospitalOperationHealth(data).then((res) => {
        if (res.code === 0) {
          let lastNewCustomerUnitPriceNums= 0
          let thisNewCustomerUnitPriceNums= 0
          let lastOldCustomerUnitPriceNums= 0
          let thisOldCustomerUnitPriceNums= 0
          const { greatHospitalOperationHealthInfo } = res.data
          this.query.data = greatHospitalOperationHealthInfo;
          this.query.totalNum = this.query.data.length
          this.query.data.map(item=>{
            lastNewCustomerUnitPriceNums +=Number(item.lastNewCustomerUnitPrice)
            thisNewCustomerUnitPriceNums +=Number(item.thisNewCustomerUnitPrice)
            lastOldCustomerUnitPriceNums +=Number(item.lastOldCustomerUnitPrice)
            thisOldCustomerUnitPriceNums +=Number(item.thisOldCustomerUnitPrice)
          })
          this.query.lastNewCustomerUnitPriceNum  =   Math.floor(lastNewCustomerUnitPriceNums * 100) / 100;
          this.query.thisNewCustomerUnitPriceNum  =   Math.floor(thisNewCustomerUnitPriceNums * 100) / 100;
          this.query.lastOldCustomerUnitPriceNum  =   Math.floor(lastOldCustomerUnitPriceNums * 100) / 100;
          this.query.thisOldCustomerUnitPriceNum  =   Math.floor(thisOldCustomerUnitPriceNums * 100) / 100;
        }
      });
    },
    // 取消
    cancelSubmit(name) {
      this.isEdit = false;
      this.controlModal = false;
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    
  },
  watch:{
    active: {
      handler(value) {
          if (value === "goodHospitalTarget") {
              this.getGreatHospitalOperationHealth();
              this.byIdRemark()
          }
      },
      immediate: true,
      },
    }
};
</script>
<style lang="less" >
.header_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
.ivu-table .one td{
    color: red;
}
.ivu-table .two td{
    color:  #ff6600;
}
.ivu-table .three td{
    color: orange;
}
.h1{
  font-size: 20px;
  color: #000;
  font-weight: bold;
  margin: 15px 0;
}
.title{
  margin-bottom: 10px;
  font-size: 16px;
  color: red;
}
.bottom{
  text-align: end;
  display: block;
  color: red;
  margin-top: 10px;
}
.company{
  font-size: 14px;
  font-weight: bold;
  margin-top:5px
}
.price_con{
  display: flex;
  margin-top: 20px;
}
.num{
  font-size: 16px;
  margin-right: 20px;
}
.num span{
  color: red;
}
</style>