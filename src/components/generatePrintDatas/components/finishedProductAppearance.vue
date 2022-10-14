<template>
  <div>
    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data" height="390"></Table>
      </div>
      <div class="h1">机构分析</div>
        <Input
            v-model="query.hospitalDealRemark"
            style="width: 100%; "
            type="textarea"
            :rows="3"
            disabled
        />
        <div class="h1">啊美雅批注</div>
        <Input
            v-model="query.amiyaDealRemark"
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
        active:String,
        hospitalId:Number,
        indicatorsId:String,
    },
  data() {
    return {
      // 查询
      query: {
        amiyaDealRemark:'',
        hospitalDealRemark:'',
        keyword: "",
        indicatorsId: '',
        hospitalId: null,
        columns: [
          {
            title: "成交品项",
            key: "dealItemName",
          },
          {
            title: "成交数量",
            key: "dealCount",
          },
          {
            title: "成交金额",
            key: "dealPrice",
          },
          {
            title: "业绩占比",
            key: "performanceRatio",
            render: (h, params) => {
              return h("div", params.row.performanceRatio + "%");
            },
          },
        ],
        data: [],
        totalCount: 0,
      },
      employeeType:sessionStorage.getItem('employeeType'),
      // 控制 modal
      controlModal: false,
    };
  },
  methods: {
    //批注
    gethospitalDealRemark(val1,val2){
      const data = { 
        indicatorId:val1,
        hospitalId:val2
      };
      api.getHospitalDealRemark(data).then((res) => {
        if (res.code === 0) {
          const {hospitalDealRemark } = res.data;
            this.query.amiyaDealRemark = hospitalDealRemark.amiyaDealRemark;
            this.query.hospitalDealRemark = hospitalDealRemark.hospitalDealRemark
        }
      });
    },
   
    // 获取本机构网咨运营数据列表
    getHospitalInfo(val1,val2) {
      const { indicatorsId, hospitalId ,keyword} = this.query;
      const data = { 
        indicatorsId:val1, 
        hospitalId:val2 ,
        keyword 
       };
      api.getHospitalDealItemOperation(data).then((res) => {
        if (res.code === 0) {
          const { hospitalDealItemData } = res.data;
          this.query.data = hospitalDealItemData;
        }
      });
    },
  },
  created() {
  },
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