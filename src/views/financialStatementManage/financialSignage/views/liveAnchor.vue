<template>
  <div class="content">
    <Card :dis-hover="true">
      <DatePicker
        type="date"
        placeholder="开始日期"
        style="width: 180px;"
        :value="query.startDate"
        v-model="query.startDate"
      ></DatePicker>
      <DatePicker
        type="date"
        placeholder="结束时间"
        style="width: 180px;margin-left: .625rem;"
        :value="query.endDate"
        v-model="query.endDate"
      ></DatePicker>
      <Select
        v-model="query.contentPlatFormId"
        placeholder="请选择主播平台"
        @on-change="contentPlateChange(query.contentPlatFormId)"
        style="width: 180px; margin-left: .625rem"
        filterable
      >
        <Option
          v-for="item in contentPalteForms"
          :value="item.id"
          :key="item.id"
          >{{ item.contentPlatformName }}</Option
        >
      </Select>
      <Select
        v-model="query.liveAnchorId"
        placeholder="请选择主播IP账号"
        style="width: 500px; margin-left: 10px"
        :disabled="query.contentPlatFormId === ''"
        filterable
        multiple
        @on-change="liveAnchorIdChange(query.liveAnchorId)"
      >
        <Option v-for="item in liveAnchors" :value="item.id" :key="item.id">{{
          item.hostAccountName
        }}</Option>
      </Select>
      
      <Button type="primary" style="margin-left: 10px" @click="getSubsidiary()"
        >查询</Button
      >
    </Card>

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data" height="580"></Table>
        <div class="bottom">
          <div class="num"><span>对账业绩总计：</span><span class="nums">{{dealPriceNum == 0 ? 0.00 : dealPriceNum.toFixed(2)}}</span></div>
          <div class="num"><span>服务费总计：</span><span class="nums">{{totalServicePriceNum== 0 ? 0.00 : totalServicePriceNum.toFixed(2)}}</span></div>
          <div class="num"><span>新客业绩总计：</span><span class="nums">{{newCustomerPriceNum== 0 ? 0.00 : newCustomerPriceNum.toFixed(2)}}</span></div>
          <div class="num"><span>新客服务费总计：</span><span class="nums">{{newCustomerServicePriceNum== 0 ? 0.00 : newCustomerServicePriceNum.toFixed(2)}}</span></div>
          <div class="num"><span>老客业绩总计：</span><span class="nums">{{oldCustomerPriceNum== 0 ? 0.00 : oldCustomerPriceNum.toFixed(2)}}</span></div>
          <div class="num"><span>老客服务费总计：</span><span class="nums">{{oldCustomerServicePriceNum== 0 ? 0.00 : oldCustomerServicePriceNum.toFixed(2)}}</span></div>
        </div>
      </div>
    </Card>
    
  </div>
</template>
<script>
import * as api from "@/api/financialboard";
import * as contentPlatForm from "@/api/baseDataMaintenance";
import * as orderApi from "@/api/orderManage";

export default {
  components: {},
  props: {
    activeName: String,
  },
  data() {
    return {
      //   下单平台
      contentPalteForms: [],
      // ip账号
      liveAnchors: [],
      dealPriceNum: 0,
      totalServicePriceNum: 0,
      newCustomerPriceNum: 0,
      newCustomerServicePriceNum: 0,
      oldCustomerPriceNum: 0,
      oldCustomerServicePriceNum: 0,
      query: {
        contentPlatFormId: "",
        liveAnchorId: [],
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "主播",
            key: "liveAnchorName",
            align: "center",
            minWidth: 150,
            align: "center",
          },
          {
            title: "收款公司",
            key: "companyName",
            tooltip: true,
            minWidth: 300,
            align: "center",
          },

          {
            title: "对账业绩",
            key: "dealPrice",
            tooltip: true,
            minWidth: 150,
            align: "center",
          },
          {
            title: "服务费合计",
            key: "totalServicePrice",
            minWidth: 150,
            align: "center",
          },
          {
            title: "新客业绩",
            key: "newCustomerPrice",
            minWidth: 150,
            align: "center",
          },
          {
            title: "新客服务费",
            key: "newCustomerServicePrice",
            minWidth: 120,
            align: "center",
          },
          {
            title: "老客业绩",
            key: "oldCustomerPrice",
            minWidth: 150,
            align: "center",
          },
          {
            title: "老客服务费",
            key: "oldCustomerServicePrice",
            minWidth: 120,
            align: "center",
          },
          
        ],
        data: [],
        totalCount: 0,
      },
    };
  },
  methods: {
    liveAnchorIdChange(value){
      this.query.liveAnchorId = value
    },
    //   获取平台（下拉框）
    getContentValidList() {
      contentPlatForm.getContentPlatFormValidList().then((res) => {
        if (res.code === 0) {
          const { contentPalteForms } = res.data;
          this.contentPalteForms = contentPalteForms;
        }
      });
    },
    // 根据平台id去获取IP账号
    getLiveValidList(value) {
      const data = {
        contentPlatFormId: value,
      };
      orderApi.getLiveValidList(data).then((res) => {
        if (res.code === 0) {
          const { liveAnchors } = res.data;
          this.liveAnchors = liveAnchors;
        }
      });
    },
    //
    contentPlateChange(value) {
      if (!value) {
        return;
      }
      this.getLiveValidList(value);
    },
    // 获取主播看板列表
    getSubsidiary() {
      console.log(this.query.liveAnchorId)
      const {
        startDate,
        endDate,
        liveAnchorId,
      } = this.query;
      const data = {
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        liveAnchorIds:this.query.liveAnchorId ? this.query.liveAnchorId : [],
      };
      console.log(this.query.liveAnchorId,data)
      api.getLiveAnchorBoardData(data).then((res) => {
        if (res.code === 0) {
          const { data} = res.data;
          this.query.data = data;
          let dealPriceNum = 0
          let totalServicePriceNum = 0
          let newCustomerPriceNum = 0
          let newCustomerServicePriceNum = 0
          let oldCustomerPriceNum = 0
          let oldCustomerServicePriceNum = 0

          this.query.data.map(item=>{
            dealPriceNum +=Number(item.dealPrice)
            totalServicePriceNum +=Number(item.totalServicePrice)
            newCustomerPriceNum +=Number(item.newCustomerPrice)
            newCustomerServicePriceNum +=Number(item.newCustomerServicePrice)
            oldCustomerPriceNum +=Number(item.oldCustomerPrice)
            oldCustomerServicePriceNum +=Number(item.oldCustomerServicePrice)
          })
          this.dealPriceNum = Math.floor(dealPriceNum * 100) / 100
          this.totalServicePriceNum = Math.floor(totalServicePriceNum * 100) / 100
          this.newCustomerPriceNum = Math.floor(newCustomerPriceNum * 100) / 100
          this.newCustomerServicePriceNum = Math.floor(newCustomerServicePriceNum * 100) / 100
          this.oldCustomerPriceNum = Math.floor(oldCustomerPriceNum * 100) / 100
          this.oldCustomerServicePriceNum = Math.floor(oldCustomerServicePriceNum * 100) / 100

        }
      });
    },
  },
  created() {
    this.getContentValidList();
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "liveAnchor") {
          this.query.contentPlatFormId = ""
          this.query.liveAnchorId = ""
          this.query.startDate = this.$moment().startOf("month").format("YYYY-MM-DD")
          this.query.endDate = this.$moment(new Date()).format("YYYY-MM-DD")
          this.liveAnchors=[]
          this.getSubsidiary();
        }
      },
      immediate: true,
    },
  },
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
.bottom{
  width: 100%;
  height: 40px;
  display: flex;
  margin-top: 10px;
  align-items: center;
  font-size: 15px;
  color: #000;
}
.num{
  margin-right: 20px;
}
.nums{
    color: red;
}

</style>
