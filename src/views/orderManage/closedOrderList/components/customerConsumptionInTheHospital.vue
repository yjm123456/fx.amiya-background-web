<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
            <DatePicker
              type="date"
              placeholder="开始时间"
              style="width: 140px;"
              :value="query.startDate"
              v-model="query.startDate"
            ></DatePicker>
            <DatePicker
              type="date"
              placeholder="结束时间"
              style="width: 140px; margin-left: .625rem"
              :value="query.endDate"
              v-model="query.endDate"
            ></DatePicker>
          <Input
            v-model="query.keyWord"
            placeholder="请输入关键字"
            style="width: 180px; margin-left: 10px"
            @keyup.enter.native="getCustomerHospitalDealInfo()"
          />
            <Select
              v-model="query.type"
              placeholder="请选择医院成交类型"
              style="width: 180px;margin-left: .625rem"
            >
              <Option
                v-for="item in hospitalParams.hospitalDealTypeList"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            <Select
              v-model="query.consumptionType"
              placeholder="医院消费类型"
              style="width: 180px; margin-left: 10px"
            >
              <Option
                v-for="item in hospitalParams.hospitalConsumptionTypeList"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            <Select
              v-model="query.refundType"
              placeholder="医院退款类型"
              style="width: 180px; margin-left: 10px"
            >
              <Option
                v-for="item in hospitalParams.hospitalRefundTypeList"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            <Select
              v-model="query.hospitalId"
              placeholder="医院"
              style="width: 180px; margin-left: 10px"
            >
              <Option
                v-for="item in hospitalParams.hospitalList"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getCustomerHospitalDealInfo()"
            >查询</Button
          >
        </div>
        <div class="right">
          
        </div>
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data"></Table>
      </div>
      <div class="page_wrap">
        <Page
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          show-total
          show-elevator
          @on-change="handlePageChange"
        />
      </div>
    </Card>
    <!-- 查看订单 -->
    <viewOrder :viewOrderModel.sync="viewOrderModel" ref="viewOrder"/>
    <!-- 查看详情 -->
    <viewDetail :viewDetailModel.sync="viewDetailModel" :viewDetailList="viewDetailList"/>

  </div>
</template>
<script>
import * as api from "@/api/orderManage";
import viewOrder from "../components/components/viewOrder.vue"
import viewDetail from "../components/components/viewDetail.vue"

export default {
  components:{
    viewOrder,
    viewDetail
  },
  props: {
    activeName:String,
    hospitalParams:Object
  },
  data() {
    return {
      // 查看订单
      viewOrderModel:false,
      // 查看详情
      viewDetailModel:false,
      viewDetailList:[],
      query: {
        type: '-1',
        consumptionType: '-1',
        refundType: '-1',
        hospitalId:-1,
        startDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        keyWord:'',
        pageNum: 1,
        pageSize: 10,
        columns:[
          {
            title: "医院",
            key: "hospitalName",
            align: "center",
            minWidth:200,
            tooltip:true
          },
          {
            title: "消费金额",
            key: "totalCashAmount",
            align: "center",
            minWidth:120,
            tooltip:true,
          },
          
          {
            title: "成交类型",
            key: "typeText",
            align: "center",
            minWidth:100,
            tooltip:true
          },
          {
            title: "消费类型",
            key: "consumptionTypeText",
            align: "center",
            minWidth:100,
            tooltip:true
          },
          {
            title: "退款类型",
            key: "refundTypeText",
            align: "center",
            minWidth:100,
            tooltip:true
          },
          {
            title: "消费日期",
            key: "date",
            minWidth: 150,
            tooltip:true,
            align: "center",
            render: (h, params) => {
              return params.row.date
                ? h(
                    "div",
                    this.$moment(params.row.date).format("YYYY-MM-DD")
                  )
                : "";
            },
          },
          {
            title: "客户姓名",
            key: "customerName",
            align: "center",
            minWidth:100,
            tooltip:true
          },
          {
            title: "客户手机号",
            key: "customerPhone",
            align: "center",
            minWidth:140,
            tooltip:true
          },
          
          {
            title: "操作",
            align: "center",
            width: 200,
            fixed:'right',
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    style: {
                      marginRight: ".3125rem",
                    },
                    on: {
                      click: () => {
                        const {hospitalId,encryptPhone} = params.row;
                        const data = {
                          encryptPhone:encryptPhone
                        }
                        api.decryptoPhonesNew(data).then(res=>{
                          if(res.code === 0) {
                            this.$refs.viewOrder.getContentPlateFormOrderLlistWithPage(hospitalId,res.data.phone)
                          }
                        })
                        
                        setTimeout(() => {
                          this.viewOrderModel = true
                        },10)
                      },
                    },
                  },
                  "查看订单"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        const {id} = params.row;
                        const data = {
                          keyWord:'',
                          pageNum:1,
                          pageSize:999,
                          customerHospitalDealId:id,
                          startDate:null,
                          endDate:null
                        }
                        api.getCustomerHospitalDealDetails(data).then(res=>{
                          if(res.code ==0){
                            const {list,totalCount} =res.data.customerHospitalDealDetailsDetails
                            this.viewDetailList = list
                            this.viewDetailModel = true
                          }
                        })
                      },
                    },
                  },
                  "查看详情"
                ),
              ]);
            },
          },

        ],
        data: [],
        totalCount: 0,
      },
    };
  },
  methods: {
   // 获取内容平台已成交列表
    getCustomerHospitalDealInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,type,startDate,endDate,consumptionType,refundType,hospitalId,keyWord} = this.query;
      const data = { 
          pageNum, 
          pageSize ,
          type : type == '-1' ? null : type,
          startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : "",
          endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
          consumptionType: consumptionType == '-1' ? null : consumptionType,
          refundType: refundType == '-1' ? null : refundType,
          hospitalId: hospitalId == -1 ? null : hospitalId,
          keyWord
        };
      api.getCustomerHospitalDealInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customerHospitalDealInfoInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取内容平台已成交列表分页
    handlePageChange(pageNum) {
      const { pageSize ,type,startDate,endDate,consumptionType,refundType,hospitalId,keyWord} = this.query;
      const data = { 
          pageNum, 
          pageSize ,
          type : type == '-1' ? null : type,
          startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : "",
          endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
          consumptionType: consumptionType == '-1' ? null : consumptionType,
          refundType: refundType == '-1' ? null : refundType,
          hospitalId: hospitalId == -1 ? null : hospitalId,
          keyWord
        };
        api.getCustomerHospitalDealInfo(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.customerHospitalDealInfoInfo;
            this.query.data = list;
            this.query.totalCount = totalCount;
            }
        });
    },
  },
  created() {
    
  },
  watch:{
    activeName: {
      handler(value) {
        if (value == "customerConsumptionInTheHospital") {
          this.getCustomerHospitalDealInfo();
          
        }
      },
      immediate: true,
    },
  }
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
</style>
