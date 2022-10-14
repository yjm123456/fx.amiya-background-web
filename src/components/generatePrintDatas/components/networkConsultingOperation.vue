<template>
  <div>
    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data" height="390"></Table>
      </div>
      <div class="h1">机构分析</div>
        <Input
            v-model="query.hospitalOnlineConsultRemark"
            style="width: 100%; "
            type="textarea"
            :rows="3"
            disabled
        />
        <div class="h1">啊美雅批注</div>
        <Input
            v-model="query.amiyaOnlineConsultRemark"
            style="width: 100%; "
            type="textarea"
            :rows="3"
            disabled
        />
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/GreatHospitalOperationHealth";
export default {
  props:{
        hospitalId:Number,
        indicatorsId:String,
    },
  data() {
    return {
      // 查询
      query: {
        amiyaOnlineConsultRemark:'',
        hospitalOnlineConsultRemark:'',
        keyword: "",
        indicatorsId: '',
        hospitalId: null,
        columns: [
          {
            title: "咨询师",
            key: "consulationName",
          },
          {
            title: "派单数",
            key: "sendOrderNum",
          },
          {
            title: "新客上门数",
            key: "newCustomerVisitNum",
          },
          {
            title: "新客上门率",
            key: "newCustomerVisitRate",
            render: (h, params) => {
              return h("div", params.row.newCustomerVisitRate + "%");
            },
          },
        ],
        data: [],
        totalCount: 0,
      },
      employeeType:sessionStorage.getItem('employeeType'),
      // 控制 modal
      controlModal: false,

    }
  },
  methods: {
    getHospitalOnlineConsultRemark(val1,val2){
      const data = { 
        indicatorId:val1,
        hospitalId:val2
      };
      api.getHospitalOnlineConsultRemark(data).then((res) => {
        if (res.code === 0) {
          const {hospitalOnlineConsultRemark } = res.data;
            this.query.amiyaOnlineConsultRemark = hospitalOnlineConsultRemark.amiyaOnlineConsultRemark;
            this.query.hospitalOnlineConsultRemark = hospitalOnlineConsultRemark.hospitalOnlineConsultRemark
        }
      });
    },
    // 获取本机构网咨运营数据列表
    getHospitalInfo(val1,val2) {
      const { indicatorsId, hospitalId ,keyword} = this.query;
      const data = { 
        indicatorsId:val1,
        hospitalId:val2,
        keyword 
       };
      api.getHospitalNetWorkConsulationOperationData(data).then((res) => {
        if (res.code === 0) {
          const { hospitalOperationDataInfo } = res.data;
          this.query.data = hospitalOperationDataInfo;
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
    
    // this.getLogisticsCompanyList()
  },
   watch:{
    // active: {
    //     handler(value) {
    //         if (value === "networkConsultingOperation") {
    //             this.getHospitalInfo();
    //             this.getHospitalOnlineConsultRemark()
    //         }
    //     },
    //     immediate: true,
    // },
   
    }
};
</script>
<style lang="less" scoped>
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
.h1{
  font-size: 20px;
  color: #000;
  font-weight: bold;
  margin: 5px 0;
}
.button{
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>