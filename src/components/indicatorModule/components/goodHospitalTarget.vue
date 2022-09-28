<template>
  <div>
    <Card class="container">
      <div>
        <Table :row-class-name="rowClassName" border :columns="query.columns" :data="query.data" ></Table>
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
          },
          {
            title: "上月新客上门率",
            key: "thisNewCustomerVisitRate",
          },
          {
            title: "新客上门率环比",
            key: "newCustomerVisitChainRatio",
          },
          {
            title: "前月新客成交率",
            key: "lastNewCustomerDealRate",
          },
          {
            title: "上月新客成交率",
            key: "thisNewCustomerDealRate",
          },

          {
            title: "新客成交率环比",
            key: "newCustomerDealChainRatio",
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
          },
        ],
        data: [],
        totalCount: 0,
      },

    };
  },
  methods: {
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
</style>