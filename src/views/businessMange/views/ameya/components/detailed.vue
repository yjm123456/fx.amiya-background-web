<template>
  <div>
    <Modal
      v-model="control"
      title="明细"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="80%"
    >
      <div>
        <Table
          border
          :columns="query.columns"
          :data="detailedList"
          height="600"
        ></Table>
      </div>
      <div slot="footer" class="footers">
        <div class="left">
          <div class="r">合计下单金额：<span class="text">{{addOrderPrice.toFixed(2)}}</span></div>
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
    detailedModel: Boolean,
    detailedList:Array
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
            title: "编号",
            key: "id",
            minWidth: 180,
          },
          {
            title: "订单编号",
            key: "contentPlatFormOrderId",
            minWidth: 180,
          },
          {
            title: "登记日期",
            key: "createDate",
            minWidth: 170,
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
            title: "派单日期",
            key: "sendDate",
            minWidth: 170,
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.sendDate).format(
                  "YYYY-MM-DD  HH:mm:ss"
                )
              );
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
            title: "下单金额",
            key: "addOrderPrice",
            minWidth: 120,
            render: (h, params) => {
              return h(
                "div",
                Number.isInteger(params.row.addOrderPrice) == true ? params.row.addOrderPrice + '.00' : params.row.addOrderPrice
              )
            },
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
            title: "新老客业绩",
            key: "isOldCustomer",
            minWidth: 120,
            render: (h, params) => {
              return h(
                "div",
                params.row.isOldCustomer== true ? '老客业绩' : '新客业绩'
              )
            },
          },
          {
            title: "到院类型",
            key: "toHospitalTypeText",
            minWidth: 120,
          },
        ]
      },
      detailedLists:[]
    }
  },
  methods: {

    handleCancel(name) {
      this.$emit("update:detailedModel", false);
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel();
      }
    },
  },
  watch: {
    detailedModel(value) {
      this.control = value;
    },
    itemInfo(value){
      if(value.price){
       this.form.checkBuyAgainPrice = value.price
      }
    },
    detailedList(value){
      console.log(value)
      this.total = value.length
      let prices=0
      let addOrderPrices=0
      value.map((item,index)=>{
        addOrderPrices +=Number(item.addOrderPrice)
        prices +=Number(item.price)
        
      })
      this.addOrderPrice = Math.floor(addOrderPrices * 100) / 100
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