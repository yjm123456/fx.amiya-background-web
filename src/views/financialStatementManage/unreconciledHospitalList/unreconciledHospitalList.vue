<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
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
          <Select
            v-model="query.hospitalId"
            placeholder="请选择医院"
            filterable
            style="width: 240px;margin-left:10px"
          >
            <Option
              v-for="item in hospitalAllList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getHospitalInfo()"
            >查询</Button
          >
        </div>
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data" :row-class-name="rowClassName"></Table>
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
import * as api from "@/api/reconciliationDocuments";
import * as hospitalApi from "@/api/hospitalManage";
export default {
  data() {
    return {
      // 查询
      query: {
        pageNum: 1,
        pageSize: 10,
        startDate: null,
        endDate: null,
        hospitalId:-1,
        columns: [
          {
            title: "医院名称",
            key: "hospitalName",
            width:200,
            align:'center',
          },
          {
            title: "未对账总金额",
            key: "totalUnCheckPrice",
            align:'center',
          },
          {
            title: "未对账总单量",
            key: "totalUnCheckOrderCount",
            align:'center',
          },
          {
            title: "未对账总金额",
            key: "totalUnCheckPrice",
            align:'center',
          },
          {
            title: "天猫未对账金额",
            key: "tmallUnCheckPrice",
            align:'center',
          },
          {
            title: "天猫未对账单量",
            key: "tmallUnCheckOrderCount",
            align:'center',
          },
          {
            title: "内容平台未对账金额",
            key: "contentPlatFormUnCheckPrice",
            align:'center',
            width:180,
          },
          {
            title: "内容平台未对账单量",
            key: "contentPlatFormUnCheckOrderCount",
            align:'center',
            width:180,
          },

          {
            title: "升单未对账金额",
            key: "hospitalCustomerConsumeUnCheckPrice",
            align:'center',
          },{
            title: "升单未对账单量",
            key: "hospitalCustomerConsumeUnCheckOrderCount",
            align:'center',
          },
        ],
        data: [],
        totalCount: 0,
      },
      hospitalAllList:[{id:-1,name:'全部医院'}]
    };
  },
  methods: {
    // 获取医院名称列表
    getHospitalInfonameList() {
      hospitalApi.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          this.hospitalAllList = [...this.hospitalAllList,...res.data.hospitalInfo];
        }
      });
    },
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
    // 获取未对账列表
    getHospitalInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,startDate,endDate,hospitalId} = this.query;
      const data = { 
        pageNum, 
        pageSize ,
        startDate:startDate ? this.$moment(new Date(startDate)).format("YYYY-MM-DD") : null,
        endDate:endDate ? this.$moment(new Date(endDate)).format("YYYY-MM-DD") : null,
        hospitalId:hospitalId == -1 ? null : hospitalId
      };
      api.getListByUnCheckHospitalOrder(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.reconciliationDocumentsInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取未对账列表分页
    handlePageChange(pageNum) {
        const {  pageSize ,startDate,endDate,hospitalId} = this.query;
        const data = { 
          pageNum, 
          pageSize ,
          startDate:startDate ? this.$moment(new Date(startDate)).format("YYYY-MM-DD") : null,
          endDate:endDate ? this.$moment(new Date(endDate)).format("YYYY-MM-DD") : null,
          hospitalId:hospitalId == -1 ? null : hospitalId
        };
        api.getListByUnCheckHospitalOrder(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.reconciliationDocumentsInfo;
            this.query.data = list;
            this.query.totalCount = totalCount;
            }
        });
    },
  },
  created() {
    this.getHospitalInfo();
    this.getHospitalInfonameList()
  },
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