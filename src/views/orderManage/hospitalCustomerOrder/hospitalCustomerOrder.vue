<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Select
            v-model="query.hospitalId"
            placeholder="请选择医院"
            filterable
            style="width: 240px;"
          >
            <Option
              v-for="item in query.hospitalInfo"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 180px;margin-left:10px"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束日期"
            style="width: 180px; margin-left: .625rem"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <Input
            v-model="query.customerName"
            placeholder="请输入客户昵称"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getRecordsOfConsumption()"
          />
          <Input
            v-model="query.customerPhone"
            placeholder="请输入客户手机号"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getRecordsOfConsumption()"
          />
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getRecordsOfConsumption()"
            >查询</Button
          >
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
  </div>
</template>
<script>
import * as api from "@/api/customerManage";
export default {
  data() {
    return {
      // 查询
      query: {
        startDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        customerName: "",
        customerPhone: "",
        hospitalId: null,
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "客户编号",
            key: "customerID",
            align: "center",
            width: 180,
          },
          {
            title: "消费日期",
            key: "date",
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.date).format("YYYY-MM-DD")
              );
            },
            align: "center",
            width: 110,
          },
          {
            title: "会员卡号",
            key: "memberCardNum",
            align: "center",
            width: 120,
          },
          {
            title: "客户姓名",
            key: "customerName",
            align: "center",
            width: 120,
          },
          {
            title: "现场咨询",
            key: "sceneName",
            align: "center",
            width: 120,
          },
          {
            title: "渠道分类",
            key: "channelCategory",
            align: "center",
            width: 120,
          },
          {
            title: "来源渠道",
            key: "channelName",
            align: "center",
            width: 150,
          },
          {
            title: "单据类型",
            key: "docType",
            align: "center",
            width: 120,
          },
          {
            title: "项目名称",
            key: "itemName",
            align: "center",
            width: 200,
          },
          {
            title: "规格",
            key: "itemStandard",
            align: "center",
            width: 120,
          },
          {
            title: "数量",
            key: "quantity",
            align: "center",
            width: 100,
          },
          {
            title: "总金额",
            key: "amount",
            align: "center",
            width: 100,
          },
          {
            title: "货币金额",
            key: "cashAmount",
            align: "center",
            width: 100,
          },
          {
            title: "预交冲款",
            key: "prepaymentAmount",
            align: "center",
            width: 100,
          },
          {
            title: "金额卡(真实金额)",
            key: "cashOfMoneyCardAmount",
            align: "center",
            width: 150,
          },

          {
            title: "年卡冲款",
            key: "yearCardAmount",
            align: "center",
            width: 100,
          },
          {
            title: "金额卡(虚拟金额)",
            key: "handselOfMoneyCardAmount",
            align: "center",
            width: 150,
          },
          {
            title: "渠道类别",
            key: "channelCategory",
            align: "center",
            width: 100,
          },
          {
            title: "积分冲款",
            key: "integrationAmount",
            align: "center",
            width: 100,
          },
          {
            title: "代金券消费",
            key: "insteadMoneyAmount",
            align: "center",
            width: 120,
          },
          {
            title: "欠款",
            key: "arrearsAmount",
            align: "center",
            width: 100,
          },
        ],
        data: [],
        totalCount: 0,
        // 医院
        hospitalInfo: [],
      },
    };
  },
  methods: {
    // 获取医院名称列表
    getHospitalInfonameList() {
      api.getDockingHospitalInfo().then((res) => {
        if (res.code === 0) {
          this.query.hospitalInfo = res.data.hospitalInfo;
        }
      });
    },
    // 获取医院客户列表
    getRecordsOfConsumption() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        customerName,
        customerPhone,
        startDate,
        endDate,
        hospitalId,
      } = this.query;
      console.log(Number(this.query.hospitalId));
      if (!hospitalId) {
        this.$Message.warning("请先选择医院");
        return;
      }
      if (!startDate) {
        this.$Message.warning("请选择开始日期");
        return;
      }
      if (!endDate) {
        this.$Message.warning("请选择结束日期");
        return;
      }

      const data = {
        pageNum,
        pageSize,
        customerName,
        customerPhone,
        startDate: startDate
          ? this.$moment(new Date(startDate)).format("YYYY-MM-DD")
          : null,
        endDate: endDate
          ? this.$moment(new Date(endDate)).format("YYYY-MM-DD")
          : null,
        hospitalId,
      };
      api.getOrderlistWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.hospitalCustomerInfoOutfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取医院客户列表分页
    handlePageChange(pageNum) {
      const {
        pageSize,
        customerName,
        customerPhone,
        startDate,
        endDate,
        hospitalId,
      } = this.query;
      if (!hospitalId) {
        this.$Message.warning("请先选择医院");
        return;
      }
      if (!startDate) {
        this.$Message.warning("请选择开始日期");
        return;
      }
      if (!endDate) {
        this.$Message.warning("请选择结束日期");
        return;
      }

      const data = {
        pageNum,
        pageSize,
        customerName,
        customerPhone,
        startDate: startDate
          ? this.$moment(new Date(startDate)).format("YYYY-MM-DD")
          : null,
        endDate: endDate
          ? this.$moment(new Date(endDate)).format("YYYY-MM-DD")
          : null,
        hospitalId,
      };
      api.getOrderlistWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.hospitalCustomerInfoOutfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
  },
  created() {
    this.getHospitalInfonameList();
    // this.getLogisticsCompanyList()
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
</style>
