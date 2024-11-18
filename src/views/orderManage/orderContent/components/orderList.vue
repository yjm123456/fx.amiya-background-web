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
    <!-- 派单详情 -->
    <dispatch :dispatchModel.sync="dispatchModel"  :id="id"/>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
import dispatch from "./dispatch.vue"

export default {
  props:{
    isOrder:Boolean
  },
  components:{
    dispatch
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
            minWidth:200,
            align:'center',
            tooltip:true
          },
          {
            title: "预约医院",
            key: "appointmentHospital",
            minWidth:280,
            align:'center',
            tooltip:true
          },
          {
            title: "派单医院",
            key: "sendHospital",
            minWidth:280,
            tooltip:true
          },
          {
            title: "订单状态",
            key: "orderStatus",
            minWidth:100,
            align:'center',
            tooltip:true
          },
          {
            title: "是否到院",
            key: "isToHospital",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              return h(
                "i-switch",
                {
                  props: {
                    value: params.row.isToHospital,
                    size: "default",
                    disabled:
                      params.row.isToHospital === true ||
                      params.row.isToHospital === false,
                  },
                },
                h("span", { isToHospital: "open" }, "开"),
                h("span", { isToHospital: "close" }, "关")
              );
            },
          },
          {
            title: "操作",
            align: "center",
            minWidth: 100,
            fixed: "right",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      // disabled:params.row.statusText != '交易成功'
                    },
                    style: {
                      marginRight: ".3125rem",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        this.dispatchModel = true
                        this.id = id
                      },
                    },
                  },
                  "派单详情"
                ),
               
              ]);
            },
          },
          
        ],
        data: [],
        totalCount: 0,
      },
      // 订单号
      id:'',
      // 派单model
      dispatchModel:false,
      
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
