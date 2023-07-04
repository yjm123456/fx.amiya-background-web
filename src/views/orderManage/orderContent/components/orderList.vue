<template>
  <div  v-if="isOrder == true">
    <div class="message_title"><span class="line"></span>订单信息</div>
    <div>
      <Table border :columns="query.columns" :data="query.data"></Table>
    </div>
    <div class="page">
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
  </div>
</template>
<script>
import * as api from "@/api/orderManage";

export default {
  props:{
    isOrder:Boolean
  },
  data() {
    return {
      // 查询
      query: {
        phone:'',
        keyword: "",
        pageNum: 1,
        pageSize: 3,
        columns: [
          {
            title: "订单号",
            key: "id",
            minWidth:120,
            align:'center',
            tooltip:true
          },
          {
            title: "预约医院",
            key: "appointmentHospital",
            minWidth:180,
            align:'center',
            tooltip:true
          },
          {
            title: "订单状态",
            key: "orderStatus",
            minWidth:80,
            align:'center',
            tooltip:true
          },
          {
            title: "咨询内容",
            key: "consultContent",
            minWidth:500,
            tooltip:true
          },
        ],
        data: [],
        totalCount: 0,
      },
      
    };
  },
  methods: {
    // 根据加密手机号获取内容平台订单
    getContentPlateFormOrderSimpleInfos(phone) {
      this.query.phone = phone;
      const { pageNum, pageSize } = this.query;
      const data = {
        phone: phone,
        pageNum: pageNum,
        pageSize: pageSize,
      };
      api.getContentPlateFormOrderSimpleInfo(data).then((res) => {
        if (res.code === 0) {
            const { list, totalCount } = res.data.data;
            this.query.data = list;
            this.query.totalCount = totalCount;
        }
      });
    },
    // 获取物流公司列表分页
    handlePageChange(pageNum) {
      const { pageSize,phone } = this.query;
      const data = { pageNum, pageSize,phone };
      api.getContentPlateFormOrderSimpleInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.data;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
  },
};
</script>
<style scoped>
.page{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}
.line {
  width: 1px;
  height: 20px;
  border: 2px solid #4381e6;
  background: #4381e6;
  margin-right: 5px;
  margin-left: 0;
}
.message_title {
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  margin: 10px 0;
}
</style>
