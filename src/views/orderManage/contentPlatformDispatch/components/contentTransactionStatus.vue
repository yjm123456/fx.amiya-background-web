<template>
  <div class="content">
    <!--成交情况 -->
    <Modal
      title="成交情况"
      footer-hide
      v-model="submitDealParams.transactionStatusModel"
      width="85%"
      @on-visible-change="handleModalVisibleChange"
    >
      <div>
        <Table
          border
          :columns="query.columns"
          :data="query.data"
          @on-select="handleSelect"
          @on-select-cancel="handleCancels"
          @on-select-all="handleSelectAll"
          @on-select-all-cancel="handleSelectAll"
        ></Table>
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
        <div class="footer">
          <Button @click="cancel" style="margin-right: 10px">关闭</Button>
          <Button type="primary" @click="submit">确认</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
export default {
  props: {
    submitDealParams:Object
  },
  data() {
    return {
      query: {
        pageNum:1, 
        pageSize:10,
        repeateOrderPictureUrl: "",
        columns: [
          {
            type: "selection",
            key: "_checked",
            align: "center",
            minWidth: 80,
          },
          {
            title: "登记日期",
            key: "createDate",
            minWidth: 170,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.createDate).format(
                  "YYYY-MM-DD  HH:mm:ss"
                )
              );
            },
          },
          {
            title: "是否重单深度",
            key: "isRepeatProfundityOrder",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              return h(
                "i-switch",
                {
                  props: {
                    value: params.row.isRepeatProfundityOrder,
                    size: "default",
                    disabled:
                      params.row.isRepeatProfundityOrder === true ||
                      params.row.isRepeatProfundityOrder === false,
                  },
                },
                h("span", { isRepeatProfundityOrder: "open" }, "开"),
                h("span", { isRepeatProfundityOrder: "close" }, "关")
              );
            },
          },
          {
            title: "是否到院",
            key: "isToHospital",
            minWidth: 120,
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
            title: "到院类型",
            key: "toHospitalTypeText",
            minWidth: 120,
            align:'center',
          },
          {
            title: "到院时间",
            key: "tohospitalDate",
            minWidth: 150,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.tohospitalDate
                  ? this.$moment(params.row.tohospitalDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          {
            title: "到院医院",
            key: "dealHospital",
            minWidth: 220,
          },
          {
            title: "是否陪诊",
            key: "isAcompanying",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return h(
                "i-switch",
                {
                  props: {
                    value: params.row.isAcompanying,
                    size: "default",
                    disabled:
                      params.row.isAcompanying === true ||
                      params.row.isAcompanying === false,
                  },
                },
                h("span", { isAcompanying: "open" }, "开"),
                h("span", { isAcompanying: "close" }, "关")
              );
            },
          },
          {
            title: "是否成交",
            key: "isDeal",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return h(
                "i-switch",
                {
                  props: {
                    value: params.row.isDeal,
                    size: "default",
                    disabled:
                      params.row.isDeal === true || params.row.isDeal === false,
                  },
                },
                h("span", { isDeal: "open" }, "开"),
                h("span", { isDeal: "close" }, "关")
              );
            },
          },

          {
            title: "成交时间",
            key: "dealDate",
            minWidth: 120,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.dealDate
                  ? this.$moment(params.row.dealDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          {
            title: "成交金额",
            key: "price",
            minWidth: 140,
            align:'center',
            renderHeader: (h, { column }) => {
                return h('span', [
                //   column.title,
                    h('span', {
                    style: {
                        color: 'orange',
                    },
                    domProps: {
                        innerHTML: '成交金额'
                    //   + ' *',
                    },
                    }),
                ]);
            },
          },
          {
            title: "业绩类型",
            key: "dealPerformanceTypeText",
            minWidth: 140,
            align:'center',
            renderHeader: (h, { column }) => {
                return h('span', [
                //   column.title,
                    h('span', {
                    style: {
                        color: 'orange',
                    },
                    domProps: {
                        innerHTML: '业绩类型'
                    //   + ' *',
                    },
                    }),
                ]);
            },
          },
          {
            title: "消费类型",
            key: "consumptionTypeText",
            minWidth: 120,
            align:'center',
          },
          
          {
            title: "新老客业绩",
            key: "isOldCustomer",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.isOldCustomer == true ? "老客业绩" : "新客业绩"
              );
            },
          },
          // {
          //   title: "佣金比例(%)",
          //   key: "commissionRatio",
          //   minWidth: 140,
          //   render: (h, params) => {
          //     return h(
          //           "div",
          //           params.row.commissionRatio!=0  ? params.row.commissionRatio + '%' : '0%'
          //         )
          //       ;
          //   }
          // },
          {
            title: "截图",
            key: "dealPicture",
            minWidth: 140,
            align:'center',
            render: (h, params) => {
              return params.row.dealPicture
                ? h(
                    "viewer",
                    {
                      props: {
                        zoomable: false,
                      },
                      style: {
                        display: "flex",
                      },
                    },
                    [
                      h("img", {
                        style: {
                          width: "50px",
                          height: "50px",
                          margin: "5px 15px 5px 5px",
                          verticalAlign: "middle",
                        },
                        attrs: {
                          src: params.row.dealPicture,
                        },
                      }),
                      //   h("div", params.row.goodsName,)
                    ]
                  )
                : "";
            },
          },

          {
            title: "三方单号",
            key: "otherOrderId",
            minWidth: 150,
            align:'center',
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 200,
          },
        ],
        data:[],
        totalCount:0
      },
      //选择的数据
      dealList:[]
    };
  },
  methods: {
    handleSelect(selection, row) {
      this.dealList.push(row)
    },

    handleCancels(selection, row) {
      let list = this.dealList.filter(item=> item.id != row.id);
      this.dealList = list
    },

    handleSelectAll(selection) {
      if (selection && selection.length === 0) {
        this.dealList = []
      } else {
        selection.forEach((item) => {
          this.dealList.push(item)
        });
      }
    },
    submit(){
      
      if(this.dealList.length == 0 || this.dealList == []){
        this.$Message.warning('请选择数据！')
        return
      }else if(this.dealList.length > 1){
        this.$Message.warning('只能选择一条数据！')
        return
      }
      this.$emit('handlerChange',this.dealList)
      this.cancel();
      this.dealList = []
    },
    // 取消
    cancel(name) {
      this.submitDealParams.transactionStatusModel = false;
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel();
      }
    },
    // 获取成交情况列表
    geTransactionStatus() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        orderId,
        isHospital,
      } = this.submitDealParams;
      const { pageNum, pageSize } = this.query;
      const data = {
        pageNum,
        pageSize,
        contentPlatFormOrderId:orderId,
      };
      //   等于2是医院端成交情况接口
      if (isHospital == 2) {
        api.hospitalContentPlatFormOrderDealInfo(data).then((res) => {
          if (res.code === 0) {
            const { list, totalCount } = res.data.contentPlatFormOrderDealInfo;
            this.query.data = list;
            this.query.totalCount = totalCount;
          }
        });
      } else {
        api.contentPlatFormOrderDealInfo(data).then((res) => {
          if (res.code === 0) {
            const { list, totalCount } = res.data.contentPlatFormOrderDealInfo;
            this.query.data = list;
            this.query.totalCount = totalCount;
          }
        });
      }
    },

    // 获取列表分页
    handlePageChange(pageNum) {
      const { orderId } = this.submitDealParams;
      const { pageSize } = this.query;
      const data = {
        pageNum,
        pageSize,
        contentPlatFormOrderId:orderId,
      };
      api.contentPlatFormOrderDealInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.contentPlatFormOrderDealInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
  },
  created() {

  },
  watch: {
    submitDealParams: {
      handler(value) {
        if(value.transactionStatusModel == true){
          this.geTransactionStatus()
        }
      },
      deep: true,
    },
  },
};
</script>
<style scoped lang="less">
.page {
  display: flex;
  margin: 20px 0;
  justify-content: flex-end;
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
