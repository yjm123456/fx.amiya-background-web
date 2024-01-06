<template>
  <div>
    <Card :dis-hover="true">
      <Select
        v-model="query.hospitalId"
        placeholder="请选择医院"
        filterable
        style="width: 240px;"
      >
        <Option
          v-for="item in hospitalParams.hospitalAllList"
          :value="item.id"
          :key="item.id"
          >{{ item.name }}</Option
        >
      </Select>
      <DatePicker
        type="date"
        placeholder="开始日期"
        style="width: 180px; margin-left: .625rem"
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
      <Button type="primary" style="margin-left: 10px" @click="getHospital()"
        >查询</Button
      >
    </Card>

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data"></Table>
      </div>
      
      <div class="page_wrap">
        <div class="bottom">
          <div class="num"><span>对账业绩总计：</span><span class="nums">{{dealPriceNum == 0 ? 0.00 : dealPriceNum.toFixed(2)}}</span></div>
          <div class="num"><span>服务费总计：</span><span class="nums">{{totalServicePriceNum== 0 ? 0.00 : totalServicePriceNum.toFixed(2)}}</span></div>
          <div class="num"><span>不含税收入总计：</span><span class="nums">{{noIncludeTaxPriceNum== 0 ? 0.00 : noIncludeTaxPriceNum.toFixed(2)}}</span></div>
          <div class="num"><span>信息服务费总计：</span><span class="nums">{{informationPriceNum== 0 ? 0.00 : informationPriceNum.toFixed(2)}}</span></div>
          <div class="num"><span>系统服务费总计：</span><span class="nums">{{systemUsePriceNum== 0 ? 0.00 : systemUsePriceNum.toFixed(2)}}</span></div>
          <div class="num"><span>回款金额总计：</span><span class="nums">{{returnBackPriceNum== 0 ? 0.00 : returnBackPriceNum.toFixed(2)}}</span></div>
          <div class="num"><span>未回款金额总计：</span><span class="nums">{{unReturnBackPriceNum== 0 ? 0.00 : unReturnBackPriceNum.toFixed(2)}}</span></div>
        </div>
        <Page
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          show-total
          show-sizer
          :page-size-opts="[10,50,100,200]"
          @on-change="handlePageChange"
          @on-page-size-change="handlePageSizeChange"
        />
      </div>
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/financialboard";

export default {
  components: {},
  props: {
    activeName: String,
    hospitalParams: Object,
  },
  data() {
    return {
      dealPriceNum: 0,
      totalServicePriceNum: 0,
      noIncludeTaxPriceNum: 0,
      informationPriceNum: 0,
      systemUsePriceNum: 0,
      returnBackPriceNum: 0,
      unReturnBackPriceNum:0,
      query: {
        hospitalId: -1,
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "医院",
            key: "hospitalName",
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
            title: "不含税收入",
            key: "noIncludeTaxPrice",
            minWidth: 150,
            align: "center",
          },
          {
            title: "信息服务费",
            key: "informationPrice",
            minWidth: 120,
            align: "center",
          },
          {
            title: "系统使用费",
            key: "systemUsePrice",
            minWidth: 150,
            align: "center",
          },
          {
            title: "回款金额",
            key: "returnBackPrice",
            minWidth: 120,
            align: "center",
          },
          {
            title: "未回款金额",
            key: "unReturnBackPrice",
            align: "center",
            minWidth: 150,
          },
        ],
        data: [],
        totalCount: 0,
      },
    };
  },
  methods: {
    handlePageSizeChange(pageSize){
      this.query.pageSize = pageSize
      this.getHospital()
    },
    // 获取医院看板列表
    getHospital() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        keyword,
        startDate,
        endDate,
        hospitalId,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        hospitalId: hospitalId == -1 ? null : hospitalId,
      };
      api.getHospitalBoard(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.data;
          this.query.data = list;
          this.query.totalCount = totalCount;
          let dealPriceNum = 0
          let totalServicePriceNum = 0
          let noIncludeTaxPriceNum = 0
          let informationPriceNum = 0
          let systemUsePriceNum = 0
          let returnBackPriceNum = 0
          let unReturnBackPriceNum = 0

          this.query.data.map(item=>{
            dealPriceNum +=Number(item.dealPrice)
            totalServicePriceNum +=Number(item.totalServicePrice)
            noIncludeTaxPriceNum +=Number(item.noIncludeTaxPrice)
            informationPriceNum +=Number(item.informationPrice)
            systemUsePriceNum +=Number(item.systemUsePrice)
            returnBackPriceNum +=Number(item.returnBackPrice)
            unReturnBackPriceNum +=Number(item.unReturnBackPrice)
          })
          this.dealPriceNum = Math.floor(dealPriceNum * 100) / 100
          this.totalServicePriceNum = Math.floor(totalServicePriceNum * 100) / 100
          this.noIncludeTaxPriceNum = Math.floor(noIncludeTaxPriceNum * 100) / 100
          this.informationPriceNum = Math.floor(informationPriceNum * 100) / 100
          this.systemUsePriceNum = Math.floor(systemUsePriceNum * 100) / 100
          this.returnBackPriceNum = Math.floor(returnBackPriceNum * 100) / 100
          this.unReturnBackPriceNum = Math.floor(unReturnBackPriceNum * 100) / 100
        }
      });
    },

    // 获取医院看板列表分页
    handlePageChange(pageNum) {
      const { pageSize, keyword, startDate, endDate, hospitalId } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        hospitalId: hospitalId == -1 ? null : hospitalId,
      };
      api.getHospitalBoard(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.data;
          this.query.data = list;
          this.query.totalCount = totalCount;
          let dealPriceNum = 0
          let totalServicePriceNum = 0
          let noIncludeTaxPriceNum = 0
          let informationPriceNum = 0
          let systemUsePriceNum = 0
          let returnBackPriceNum = 0
          let unReturnBackPriceNum = 0

          this.query.data.map(item=>{
            dealPriceNum +=Number(item.dealPrice)
            totalServicePriceNum +=Number(item.totalServicePrice)
            noIncludeTaxPriceNum +=Number(item.noIncludeTaxPrice)
            informationPriceNum +=Number(item.informationPrice)
            systemUsePriceNum +=Number(item.systemUsePrice)
            returnBackPriceNum +=Number(item.returnBackPrice)
            unReturnBackPriceNum +=Number(item.unReturnBackPrice)
          })
          this.dealPriceNum = Math.floor(dealPriceNum * 100) / 100
          this.totalServicePriceNum = Math.floor(totalServicePriceNum * 100) / 100
          this.noIncludeTaxPriceNum = Math.floor(noIncludeTaxPriceNum * 100) / 100
          this.informationPriceNum = Math.floor(informationPriceNum * 100) / 100
          this.systemUsePriceNum = Math.floor(systemUsePriceNum * 100) / 100
          this.returnBackPriceNum = Math.floor(returnBackPriceNum * 100) / 100
          this.unReturnBackPriceNum = Math.floor(unReturnBackPriceNum * 100) / 100
        }
      });
    },
  },
  created() {},
  watch: {
    activeName: {
      handler(value) {
        if (value === "hospital") {
          this.query.hospitalId= -1
          this.query.startDate= this.$moment().startOf("month").format("YYYY-MM-DD")
          this.query.endDate= this.$moment(new Date()).format("YYYY-MM-DD")
          this.query.keyword= ""
          this.getHospital();
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
  display: flex;
  font-size: 16px;
}
.nums{
  color: red;
  margin-right: 10px;
}
</style>
