<template>
  <div>
    <Card class="container">
      <div>
        <div class="left">
        <span>总派单数：</span>
        <Input
          v-model="indicatorOrderForm.allSendorderCount"
          style="width:130px;margin-right:10px"
          type="number"
          number
          disabled
        ></Input>
        <span  class="width:120px">本地派单：</span>
        <Input
          v-model="indicatorOrderForm.localSendorderCount"
          style="width:130px;margin-right:10px"
          type="number"
          number
          disabled
        ></Input>
        <span>外地派单：</span>
        <Input
          v-model="indicatorOrderForm.otherPlaceSendorderCount"
          style="width:130px;margin-right:10px"
          type="number"
          number
          disabled
        ></Input>
        
      </div>
      <div class="left">
        <span>无效派单：</span>
        <Input
          v-model="indicatorOrderForm.invalidSendorderCount"
          style="width:130px;margin-right:10px"
          type="number"
          number
          disabled
        ></Input>
        <span>疫情影响：</span>
        <Input
          v-model="indicatorOrderForm.epidemicCount"
          style="width:130px;margin-right:10px"
          type="number"
          number
          disabled
        ></Input>
        <span>其他问题：</span>
        <Input
          v-model="indicatorOrderForm.otherQuestion"
          style="width:130px;margin-right:10px"
          disabled
        ></Input>
      </div>
        <Table border :columns="query.columns" :data="query.data" height="600"></Table>
         <div class="buttom">说明：如现场咨询师负责邀约，本页不用填写</div>
      </div>
      <!-- <div class="h1">机构分析</div>
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
        /> -->
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
            width:'370px',
          },
          {
            title: "派单数",
            key: "sendOrderNum",
            width:'380px',
          },
          {
            title: "新客上门数",
            key: "newCustomerVisitNum",
            width:'390px',
          },
          {
            title: "新客上门率",
            key: "newCustomerVisitRate",
            width:'390px',
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
      indicatorOrderForm:{
        // 指标id
        indicatorId:'',
        // 医院id
        hospitalId:null,
        // 总派单数
        allSendorderCount:null,
        // 本地派单数
        localSendorderCount:null,
        // 外地派单数
        otherPlaceSendorderCount:null,
        // 无效派单数
        invalidSendorderCount:null,
        // 疫情影响
        epidemicCount:null,
        // 其他问题
        otherQuestion:'',
        // 判断是否填写基本信息
        isFlag:false
      },

    }
  },
  methods: {
     // 获取基本信息
    getIdMessage(val1,val2){
      const data = {
        indicatorId: val1,
        hospitaiId: val2,
      };
      api.getIndicatorOrderData(data).then((res) => {
        if (res.code === 0) {
          const { sendOrderData } = res.data;
          if(sendOrderData.indicatorId){
            this.indicatorOrderForm.isFlag = false
          }else { 
            this.indicatorOrderForm.isFlag = true
          }
          this.indicatorOrderForm.allSendorderCount = sendOrderData.allSendorderCount
          this.indicatorOrderForm.localSendorderCount = sendOrderData.localSendorderCount
          this.indicatorOrderForm.otherPlaceSendorderCount = sendOrderData.otherPlaceSendorderCount
          this.indicatorOrderForm.invalidSendorderCount = sendOrderData.invalidSendorderCount
          this.indicatorOrderForm.epidemicCount = sendOrderData.epidemicCount
          this.indicatorOrderForm.otherQuestion = sendOrderData.otherQuestion
          this.indicatorOrderForm.otherQuestion = sendOrderData.otherQuestion
        }
      });
    },
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
.left {
  width: 100%;
  margin: 10px 0;
  display: flex;
}
.buttom {
  text-align: end;
  display: block;
  color: red;
  margin-top: 20px;
  font-size: 14px;
  font-weight: bold;
}
</style>