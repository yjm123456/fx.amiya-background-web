<template>
  <div>
    <Card class="container">
      <div>
        <div class="title">啊美雅健康参考值：新客上门率20% 新客成交率80% 新客客单价50K 老客复购率30% 老客客单价40K</div>
        <Table :row-class-name="rowClassName" border :columns="query.columns" :data="query.data" height="500"></Table>
        <div>
          <div class="bottom">
            <div class="bottom_memo">（说明：数据统计时间11月1日-11月30日，机构展现不以业绩为导向）</div>
            <div class="company">本表单位为：千元（K）</div>
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
          },
          {
            title: "前月新客上门率",
            key: "lastNewCustomerVisitRate",
            render: (h, params) => {
              return h("div", params.row.lastNewCustomerVisitRate + "%");
            },
          },
          {
            title: "上月新客上门率",
            key: "thisNewCustomerVisitRate",
            render: (h, params) => {
              return h("div", params.row.thisNewCustomerVisitRate + "%");
            },
          },
          {
            title: "新客上门率环比",
            key: "newCustomerVisitChainRatio",
            render: (h, params) => {
              return h("div", params.row.newCustomerVisitChainRatio + "%");
            },
          },
          {
            title: "前月新客成交率",
            key: "lastNewCustomerDealRate",
            render: (h, params) => {
              return h("div", params.row.lastNewCustomerDealRate + "%");
            },
          },
          {
            title: "上月新客成交率",
            key: "thisNewCustomerDealRate",
            render: (h, params) => {
              return h("div", params.row.thisNewCustomerDealRate + "%");
            },
          },

          {
            title: "新客成交率环比",
            key: "newCustomerDealChainRatio",
            render: (h, params) => {
              return h("div", params.row.newCustomerDealChainRatio + "%");
            },
          },
          {
            title: "前月新客客单价",
            key: "lastNewCustomerUnitPrice",
          },
          {
            title: "上月新客客单价",
            key: "thisNewCustomerUnitPrice",
          },

          {
            title: "新客客单价环比",
            key: "newCustomerUnitPriceChainRatio",
            render: (h, params) => {
              return h("div", params.row.newCustomerUnitPriceChainRatio + "%");
            },
          },
        ],
        data: [],
        totalCount: 0,
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
          const { greatHospitalOperationHealthInfo } = res.data
          this.query.data = greatHospitalOperationHealthInfo;
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
</style>