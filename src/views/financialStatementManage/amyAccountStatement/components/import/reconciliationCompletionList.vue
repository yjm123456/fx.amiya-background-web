<template>
  <div>
    <Modal
      v-model="control"
      title="成交情况"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="85%"
    >
      <Card class="container">
        <div style="margin-bottom:10px">当前对账单编号： <span style="color:#f46544">{{reconciliationParams.id}}</span></div>
        <div>
          <Tabs ref="tabs" v-model="active"  type="card" v-if="reconciliationParams.tabFlag==true">
            <TabPane label="下单平台成交情况" name="order">
              <div>
                <order
                  :active="active"
                  :reconciliationParams="reconciliationParams"
                  ref="order"
                  @settlePriceChange="settlePriceChange"
                ></order>  
              </div> 
            </TabPane>
            <TabPane label="内容平台成交情况" name="contentOrder">
              <div>
                <contentOrder
                  :active="active"  
                  :reconciliationParams="reconciliationParams"
                  ref="contentOrder"
                  @settlePriceChange="settlePriceChange"
                ></contentOrder>
              </div>
            </TabPane>
            <TabPane label="升单情况" name="liter">
              <div>
                <liter
                  :active="active"  
                  :reconciliationParams="reconciliationParams"
                  ref="liter"
                  @settlePriceChange="settlePriceChange"
                ></liter>
              </div>
            </TabPane>
             <Spin fix v-if="isLoading == true">
                <Icon
                  type="ios-loading"
                  size="18"
                  class="demo-spin-icon-load"
                ></Icon>
                <div>加载中...</div>
            </Spin>
          </Tabs>
        </div>
      </Card>
      <div slot="footer" class="foot">
        <div class="foot_left">
          <div class="foot_title">当前对账单合计服务费：<span style="color:red;font-weight:bold">{{reconciliationParams.returnBackTotalPrice == 0 ? 0 : reconciliationParams.returnBackTotalPrice.toFixed(2)}}</span></div>
          <div class="foot_title">累计审核服务费合计：<span style="color:red;font-weight:bold">{{settlePriceNum.toFixed(2) }}</span></div>
        </div>
        <div>
          <Button @click="handleCancel">取消</Button>
          <Button type="primary" @click="submitRecon">对账完成</Button>
        </div>
        
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/contentPlatFormOrderDealInfo";
import * as reconapi from "@/api/reconciliationDocuments";
import upload from "@/components/upload/upload";
import * as orderapi from "@/api/orderManage";
import order from "../order.vue"
import contentOrder from "../contentOrder.vue"
import liter from "../liter.vue"
export default {
  components: {
    upload,
    order,
    contentOrder,
    liter
  },
  props: {
    reconciliationCompletionListModel: Boolean,
    reconciliationParams: Object,
  },
  data() {
    return {
      isLoading:false,
      active:"order",
      control: false,
      settlePriceNum:0,
      settlePriceNum1:0,
      settlePriceNum2:0,
      settlePriceNum3:0,
    };
  },
  methods: {
    settlePriceChange(value){
      this.settlePriceNum = value
    },
    settlePriceChange1(value){
      this.settlePriceNum1 = value
    },
    settlePriceChange2(value){
      this.settlePriceNum2 = value
    },
    settlePriceChange3(value){
      this.settlePriceNum3 = value
    },
    submitRecon() {
      // let settlePriceNum = (this.settlePriceNum1+this.settlePriceNum2+this.settlePriceNum3).toFixed(2)
      // if(this.reconciliationParams.returnBackTotalPrice != settlePriceNum){
      if((this.reconciliationParams.returnBackTotalPrice).toFixed(2) != (this.settlePriceNum).toFixed(2)){
        this.$Message.warning('当前对账服务费合计金额有偏差，无法完成对账，请检查！')
        return
      }
      this.$Modal.confirm({
        title: "对账完成提示",
        content: "是否确定完成对账？",
        onOk: () => {
          const data = {
            idList: this.reconciliationParams.idList,
            reconciliationState: 3,
            questionReason: "",
          };
          this.isLoading = true
          reconapi.tagReconciliationState(data).then((res) => {
            if (res.code === 0) {
              this.isLoading = false
              this.$Message.success("已成功对账");
              this.$emit("update:reconciliationCompletionListModel", false);
            }else{
              setTimeout(() => {
                this.isLoading = false
              }, 3000);
            }
          });
        },
        onCancel: () => {},
      });
    },
    handleCancel(name) {
      this.$emit("update:reconciliationCompletionListModel", false);
      this.$emit("getHospitalInfo");
      this.active ="order"
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel("importFileForm");
        this.active ="order"
      }
    },
  },
  created(){
   
  },
  watch: {
    reconciliationCompletionListModel(value) {
      this.control = value;
      if(value == true){  
        this.$nextTick(()=>{
          this.$refs.order.getContentPlatFormOrderDealInfo(this.reconciliationParams.customerPhone)
          this.$refs.contentOrder.getContentPlatFormOrderDealInfo(this.reconciliationParams.customerPhone)
          this.$refs.liter.getContentPlatFormOrderDealInfo(this.reconciliationParams.customerPhone)
          this.$refs.order.getTotalCheckReturnBackPriceByIdChange(this.reconciliationParams.id)
        })
      }
      
    },
  },
};
</script>
<style scoped>
.page_wrap {
  text-align: right;
  margin-top: 10px;
}
.foot{
  display: flex;
  justify-content: space-between;
}
.foot_left{
  display: flex;
}
.foot_title{
  font-size: 16px;
  margin-right: 30px;
}
.form_content{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.form_left,.form_right{
  width: 49%;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
