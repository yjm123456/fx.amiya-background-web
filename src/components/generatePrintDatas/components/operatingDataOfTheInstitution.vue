<template>
  <div class="a">
    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data" height="730"></Table>
      </div>
      <div class="h1">机构分析</div>
        <Input
            v-model="query.hospitalOperationRemark"
            style="width: 100%; "
            type="textarea"
            :rows="3"
            disabled
        />
        <div class="h1">啊美雅批注</div>
        <Input
            v-model="query.amiyaOperationRemark"
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
        indicatorsId:String,
        indicatorNameList:Array,
        hospitalInfo:Array,
        hospitalId:Number,
    },
    components:{
    },
  data() {
    return {
       
      // 查询
      query: {
        amiyaOperationRemark:'',
        hospitalOperationRemark:'',
        keyword: "",
        indicatorsId:'',
        hospitalId:-1,
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "运营维度",
            key: "operationName",
            width:'300px',
          },
          {
            title: "上月数据",
            key: "lastMonthData",
            width:'300px',
          },
          {
            title: "前月数据",
            key: "beforeMonthData",
            width:'300px',
          },
          {
            title: "环比",
            key: "chainRatio",
            width:'310px',
            render: (h, params) => {
              return h("div", params.row.chainRatio + "%");
            },
          },
          {
            title: "优秀机构",
            key: "greatHospital",
            width:'310px',
            renderHeader:(h,params)=>{
              return h('div',[
                h('strong',this.hospitalName),
              ])
            }
          },
        ],
        data: [],
        totalCount: 0,
      },
      employeeType:sessionStorage.getItem('employeeType'),

      // 控制 modal
      controlModal: false,
      editcontrolModal:false,
      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,
    };
    
    
  },
  methods: {
    getHospitalOperationRemark(val1,val2){
      const data = { 
        indicatorId:val1,
        hospitalId:val2
      };
      api.getHospitalOperationRemark(data).then((res) => {
        if (res.code === 0) {
          const {hospitalOperationRemark } = res.data;
          this.query.amiyaOperationRemark = hospitalOperationRemark.amiyaOperationRemark;
          this.query.hospitalOperationRemark = hospitalOperationRemark.hospitalOperationRemark
        }
      });
    },
   
    // 获取机构运营数据列表
    getHospitalOperationData(val1,val2) {
      const { keyword,indicatorsId,hospitalId } = this.query;
      const data = { 
        keyword ,
        indicatorsId:val1,
        hospitalId:val2
        };
      api.getHospitalOperationData(data).then((res) => {
        if (res.code === 0) {
          const {hospitalOperationDataInfo } = res.data;
          this.query.data = hospitalOperationDataInfo;
        }
      });
    },
    // 根据ID获取
    getbyIdHospitalOperationIndicator(val1) {
      
      api.byIdHospitalOperationIndicator(val1).then((res) => {
        if (res.code === 0) {
          this.hospitalName= res.data.hospitalOperationIndicatorInfo.excellentHospital;
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
   
      
    }
};
</script>
<style lang="less" scoped>
.header_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
// .container {
//   margin-top: 16px;
// }
// .page_wrap {
//   margin-top: 16px;
//   text-align: right;
// }
.line {
  display: flex;
}
.h1{
  font-size: 20px;
  color: #000;
  font-weight: bold;
  margin: 5px 0;
}
// .button{
//   display: flex;
//   justify-content: center;
//   margin-top: 10px;
// }
</style>
