<template>
  <div class="content">
    <Modal
      title="派单情况"
      footer-hide
      v-model="control"
      width="80%"
      @on-visible-change="handleModalChange"
    >
      <div>
            <Table border :columns="query.columns" :data="query.data"></Table>
            <div class="page">
              <div>
                <!-- <Button type="primary" @click="lookImgChange">查看重单截图</Button> -->
              </div>
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
            <div class="footer">
                <Button @click="cancel" style="margin-right: 10px">关闭页面</Button>
            </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
export default {
  components:{
      
  },
  props: {
    dispatchModel:Boolean,
    id:String
  },
  data() {
    return {
      control:false,
      query:{
        pageNum:1,
        pageSize:10,
        columns: [
          {
            title: "派单医院",
            key: "hospitalName",
            minWidth: 200,
            tooltip: true,
          },
          {
            title: "是否指定医生账号",
            key: "isSpecifyHospitalEmployee",
            minWidth: 160,
            align: "center",
            render: (h, params) => {
              if (params.row.isSpecifyHospitalEmployee == true) {
                return h("Icon", {
                  props: {
                    type: "md-checkmark",
                  },
                  style: {
                    fontSize: "18px",
                    color: "#559DF9",
                  },
                });
              } else {
                return h("Icon", {
                  props: {
                    type: "md-close",
                  },
                  style: {
                    fontSize: "18px",
                    color: "red",
                  },
                });
              }
            },
          },
          {
            title: "医生账号",
            key: "hospitalEmployeeName",
            minWidth: 200,
            align: "center",
            tooltip: true,
          },
          {
            title: "订单状态",
            key: "orderStatus",
            minWidth: 130,
            align: "center",
            render: (h, params) => {
              if (params.row.orderStatus == "已成交") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.orderStatus
                );
              } else if (params.row.orderStatus == "重单-不可深度") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.orderStatus
                );
              } else if (params.row.orderStatus == "重单-可深度") {
                return h(
                  "div",
                  {
                    style: {
                      color: "orange",
                    },
                  },
                  params.row.orderStatus
                );
              } else if (params.row.orderStatus == "已派单") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.orderStatus
                );
              } else if (params.row.orderStatus == "未成交") {
                return h(
                  "div",
                  {
                    style: {
                      color: "brown",
                    },
                  },
                  params.row.orderStatus
                );
              } else if (params.row.orderStatus == "已接单") {
                return h(
                  "div",
                  {
                    style: {
                      color: "orange",
                    },
                  },
                  params.row.orderStatus
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.orderStatus
                );
              }
            },
          },
          {
            title: "是否主派",
            key: "isMainHospital",
            minWidth: 140,
            align:'center',
            render :(h , params)=> {
                return h(
                    "i-switch",{
                    props: {
                    value: params.row.isMainHospital,
                    size:"default",
                    disabled:params.row.isMainHospital===true || params.row.isMainHospital===false
                    },
                    
                },
                h("span", {isMainHospital: "open"},"开"),
                h("span", {isMainHospital: "close"},"关")
              )
            }
          },
          
           
          {
            title: "派单人",
            key: "senderName",
            minWidth: 180,
            align:'center',
          },
          {
            title: "派单时间",
            key: "sendDate",
            minWidth: 180,
            align:'center',
            render: (h, params) => {
              return h("div",params.row.sendDate  ? this.$moment(params.row.sendDate).format("YYYY-MM-DD  HH:mm:ss") : '');
            },
          },
          {
            title: "预约到院日期",
            key: "appointmentDate",
            minWidth: 180,
            align:'center',
            render: (h, params) => {
              return h("div",params.row.appointmentDate  ? this.$moment(params.row.appointmentDate).format("YYYY-MM-DD  HH:mm:ss") : '');
            },
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 300,
            tooltip:true
          },
          {
            title: "医院备注",
            key: "hospitalRemark",
            minWidth: 300,
            tooltip:true
          },
        ],
        data:[]
      }
    };
  },
  methods: {
    
   
    // 获取派单情况列表
    getSendOrderInfoList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize } = this.query;
      const data = {
        pageNum,
        pageSize,
        contentPlatformId:this.id,
      };
      api.sendOrderInfoList(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.sendOrderInfoList;
            this.query.data = list;
            this.query.totalCount = totalCount;
            }
        });
      
    },

    // 获取列表分页
    handlePageChange(pageNum) {
      const {  pageSize } = this.query;
      const data = {
        pageNum,
        pageSize,
        contentPlatformId:this.id,
      };
      api.sendOrderInfoList(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.sendOrderInfoList;
            this.query.data = list;
            this.query.totalCount = totalCount;
            }
        });
    },
    // 取消
    cancel(name) {
      this.$emit("update:dispatchModel", false);
    },

    handleModalChange(value) {
      if (!value) {
        this.$emit("update:dispatchModel", false);
      }
    },
  },
  watch: {
    dispatchModel(value) {
        this.control = value
        if(value == true){
            this.getSendOrderInfoList()
        }
      
    },
  },
};
</script>
<style scoped lang="less">
.page{
    display: flex;
    margin: 20px 0;
    justify-content: space-between;
}
.footer {
  display: flex;
  justify-content: flex-end;
}
.img {
  width: 100%;
  height: auto;
}
</style>
