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
        <Table border :columns="query.columns" :data="query.data" height="600" :span-method="handleSpan"></Table>
        <div class="bottom">
            <div class="company">本表单位为：千元（K）</div>
          </div>
      </div>
      <!-- <div class="h1">机构分析</div>
      <Input
        v-model="query.hospitalConsultRemark"
        style="width: 100%; "
        type="textarea"
        :rows="3"
        disabled
      />
      <div class="h1">啊美雅批注</div>
      <Input
        v-model="query.amiyaConsultRemark"
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
  props: {
    hospitalId: Number,
    indicatorsId: String,
  },
  data() {
    return {
      // 查询
      query: {
        amiyaConsultRemark: "",
        hospitalConsultRemark: "",
        keyword: "",
        indicatorsId: "",
        hospitalId: null,
        columns: [
          {
            title: "科室",
            key: "sectionOffice",
            width: '100px',
          },
          {
            title: "咨询师",
            key: "consulationName",
            width:'100px',
          },
          {
            title: "派单数",
            key: "sendOrderNum",
            width:'90px',
          },
          {
            title: "新客上门数",
            key: "newCustomerVisitNum",
            width:'120px',
          },
          {
            title: "新客上门率",
            key: "newCustomerVisitRate",
            width:'120px',
            render: (h, params) => {
              return h("div", params.row.newCustomerVisitRate + "%");
            },
          },
          {
            title: "新客成交数",
            key: "newCustomerDealNum",
            width:'90px',
          },
          {
            title: "新客成交率",
            key: "newCustomerDealRate",
            width:'90px',
            render: (h, params) => {
              return h("div", params.row.newCustomerDealRate + "%");
            },
          },
          {
            title: "新客业绩",
            key: "newCustomerDealPrice",
            width:'90px',
          },
          {
            title: "新客客单价",
            key: "newCustomerUnitPrice",
            width:'90px',
          },
          {
            title: "老客上门数",
            key: "oldCustomerVisitNum",
            width:'90px',
          },
          {
            title: "老客成交数",
            key: "oldCustomerDealNum",
            width:'90px',
          },
          {
            title: "老客成交率",
            key: "oldCustomerDealRate",
            width:'90px',
            render: (h, params) => {
              return h("div", params.row.oldCustomerDealRate + "%");
            },
          },

          {
            title: "老客业绩",
            key: "oldCustomerDealPrice",
            width:'90px',
          },
          {
            title: "老客客单价",
            key: "oldCustomerUnitPrice",
            width:'90px',
          },
          {
            title: "总业绩",
            key: "lasttMonthTotalAchievement",
            width:'90px',
          },
          {
            title: "老客业绩占比",
            key: "oldCustomerAchievementRate",
            width:'90px',
            render: (h, params) => {
              return h("div", params.row.oldCustomerAchievementRate + "%");
            },
          },
          
        ],
        data: [],
        totalCount: 0,
      },
      employeeType: sessionStorage.getItem("employeeType"),
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
    };
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
    // 被整理的数组中相同nickName的元素需放在一块，否则还要再整理数据（暂未处理）
    integratedData(data) {
        let that = this;
        // 获取所有的不同年龄值
        let arrId = [];
        data.forEach(i => {
            !arrId.includes(i.sectionOffice) ? arrId.push(i.sectionOffice) : arrId;
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
                k.sectionOffice === l.id ? l.num ++ : l.num;
            })
        })
        data.forEach(m => {
            arrObj.forEach((n,index) => {
                if(m.sectionOffice === n.id){
                    if(arrId.includes(m.sectionOffice)){
                        m.mergeCol = n.num;
                        arrId.splice(arrId.indexOf(m.sectionOffice),1);
                    }else{
                        m.mergeCol = 0;
                    }
                }
            })
        })
        return data;
    },
    // 只针对相同sectionOffice字段合并列，sectionOffice位于第一列，columnIndex为0
    handleSpan ({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
            return {
                rowspan: row.mergeCol === 0 ? 0:row.mergeCol,
                colspan: row.mergeCol === 0 ? 0:1
            };
        }
    },
    getHospitalConsultRemark(val1,val2) {
      const data = {
        indicatorId: val1,
        hospitalId: val2,
      };
      api.getHospitalConsultRemark(data).then((res) => {
        if (res.code === 0) {
          const { hospitalConsultRemark } = res.data;
          this.query.amiyaConsultRemark =
            hospitalConsultRemark.amiyaConsultRemark;
          this.query.hospitalConsultRemark =
            hospitalConsultRemark.hospitalConsultRemark;
        }
      });
    },
    // 获取本机构网咨运营数据列表
    getHospitalInfo(val1,val2) {
      const { indicatorsId, hospitalId, keyword } = this.query;
      const data = {
        indicatorsId: val1,
        hospitalId: val2,
        keyword,
      };
      api.getHospitalConsulationOperationData(data).then((res) => {
        if (res.code === 0) {
          const { hospitalOperationDataInfo } = res.data;
          this.query.data = hospitalOperationDataInfo;
          this.integratedData(this.query.data)
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
  watch: {
   
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
.h1 {
  font-size: 20px;
  color: #000;
  font-weight: bold;
  margin: 5px 0;
}
.button {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.left {
  width: 100%;
  margin: 10px 0;
  display: flex;
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
