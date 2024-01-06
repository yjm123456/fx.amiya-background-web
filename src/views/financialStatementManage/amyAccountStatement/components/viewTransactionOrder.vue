<template>
  <div>
    <Modal
      v-model="control"
      title="成交单"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="91%"
    >
      <Card class="container">
        <Tabs ref="tabs" v-model="actives"  type="card" v-if="viewTransactionOrderParams.tabFlag==true">
            <TabPane label="下单平台成交情况" name="dealOrder">
              <div>
                <dealOrder
                  :actives="actives"
                  ref="dealOrder"
                  :viewTransactionOrderParams="viewTransactionOrderParams"
                ></dealOrder>  
              </div> 
            </TabPane>
            <TabPane label="内容平台成交情况" name="dealContentOrder">
              <div>
                <dealContentOrder
                  :actives="actives"  
                  ref="dealContentOrder"
                  :viewTransactionOrderParams="viewTransactionOrderParams"
                ></dealContentOrder>
              </div>
            </TabPane>
            <TabPane label="升单情况" name="dealLiter">
              <div>
                <dealLiter
                  :actives="actives"  
                  ref="dealLiter"
                  :viewTransactionOrderParams="viewTransactionOrderParams"
                ></dealLiter>
              </div>
            </TabPane>
          </Tabs>
      </Card>

      <div slot="footer">
        <Button @click="handleCancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import dealOrder from "./deal/dealOrder.vue"
import dealContentOrder from "./deal/dealContentOrder.vue"
import dealLiter from "./deal/dealLiter.vue"
export default {
  components: {
    dealOrder,
    dealContentOrder,
    dealLiter
  },
  props: {
    viewTransactionOrderModel: Boolean,
    viewTransactionOrderParams: Object,
  },
  data() {
    return {
      actives:'dealOrder',
      control: false,
    };
  },
  methods: {
    handleCancel(name) {
      this.$emit("update:viewTransactionOrderModel", false);
      this.actives = 'dealOrder'
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel();
      }
    },
  },
  watch: {
    viewTransactionOrderModel(value) {
      this.control = value;
      if(value == true){
        this.$nextTick(()=>{
          this.$refs.dealOrder.getContentPlatFormOrderDealInfo()
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
</style>
