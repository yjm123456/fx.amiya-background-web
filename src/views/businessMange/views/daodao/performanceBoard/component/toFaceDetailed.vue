<template>
  <div>
    <Modal
      v-model="control"
      title="面诊明细"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="80%"
    >
      <div>
        <Table
          border
          :columns="query.columns"
          :data="toFaceDetailedList"
          height="600"
        ></Table>
      </div>
      <div slot="footer" class="footers">
        <div class="left">
          <div  class="r">合计成交金额：<span class="text">{{price.toFixed(2)}}</span></div>
          <div  class="r">总条数：<span class="text">{{total}}</span></div>
        </div>
        <Button @click="handleCancel()">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>

export default {
  props: {
    toFaceDetailedModel: Boolean,
    toFaceDetailedList:Array
  },
  data() {
    return {
      total:0,
      addOrderPrice:0,
      price:0,
      control :false,
      query: {
        repeateOrderPictureUrl: "",
        columns: [
            {
            title: "记录日期",
            key: "recordDate",
            minWidth: 120,
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.recordDate).format(
                  "YYYY-MM-DD"
                )
              );
            },
          },
          {
            title: "紧急程度",
            key: "emergencyLevelText",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              if (params.row.emergencyLevelText == "非常重要") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.emergencyLevelText
                );
              } else if (params.row.emergencyLevelText == "重要") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#ff9800",
                    },
                  },
                  params.row.emergencyLevelText
                );
              } else if (params.row.emergencyLevelText == "一般") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#2098ee",
                    },
                  },
                  params.row.emergencyLevelText
                );
              } else if (params.row.emergencyLevelText == "轻微") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#009688",
                    },
                  },
                  params.row.emergencyLevelText
                );
              } else if (params.row.emergencyLevelText == "可忽略") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.emergencyLevelText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.emergencyLevelText
                );
              }
            },
          },
          {
            title: "客户昵称",
            key: "customerNickName",
            minWidth: 120,
          },
          {
            title: "客户手机号",
            key: "phone",
            minWidth: 120,
          },
          {
            title: "成交金额",
            key: "price",
            minWidth: 120,
            render: (h, params) => {
              return h(
                "div",
                Number.isInteger(params.row.price) == true ? params.row.price + '.00' :  params.row.price
              )
            },
          },
          {
            title: "录单触达",
            key: "isCreateOrder",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              if (params.row.isCreateOrder == true) {
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
            title: "派单触达",
            key: "isSendOrder",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              if (params.row.isSendOrder == true) {
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
            title: "是否加V",
            key: "isAddWeChat",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              if (params.row.isAddWeChat == true) {
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
            title: "是否核销",
            key: "isWriteOff",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              if (params.row.isWriteOff == true) {
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
            title: "是否退款",
            key: "isReturnBackPrice",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              if (params.row.isReturnBackPrice == true) {
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
            title: "是否差评",
            key: "isBadReview",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              if (params.row.isBadReview == true) {
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
        ]
      },
      toFaceDetailedLists:[]
    }
  },
  methods: {

    handleCancel(name) {
      this.$emit("update:toFaceDetailedModel", false);
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel();
      }
    },
  },
  watch: {
    toFaceDetailedModel(value) {
      this.control = value;
    },
    itemInfo(value){
      if(value.price){
       this.form.checkBuyAgainPrice = value.price
      }
    },
    toFaceDetailedList(value){
      this.total = value.length
      let prices=0
      value.map((item,index)=>{
        prices +=Number(item.price)
        
      })
      this.price = Math.floor(prices * 100) / 100
    }
  },
};
</script>
<style scoped>
.footers{
  display: flex;
  justify-content: space-between;

}
.left{
  display: flex;
}
.r{
  margin-right: 15px;
}
.text{
  color: red;
  font-size: 16px;
}
</style>