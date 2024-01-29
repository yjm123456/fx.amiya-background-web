<template>
  <div>
    <Modal
      v-model="control"
      title="详情"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="80%"
    >
        <Tabs ref="tabs" v-model="activeName" type="card">
          <TabPane label="订单业绩" name="orderPerformance">
            <div>
              <orderPerformance
                :activeName="activeName"
                :detailParams="detailParams"
                ref="orderPerformance"
              ></orderPerformance>
            </div>
          </TabPane>
          <TabPane label="稽查业绩" name="auditPerformance">
            <div>
              <auditPerformance
                :activeName="activeName"
                :detailParams="detailParams"
                ref="auditPerformance"
              ></auditPerformance>
            </div>
          </TabPane>
          
        </Tabs>
      <div slot="footer" class="footer">
        <Button @click="cancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import orderPerformance from "./orderPerformance.vue"
import  auditPerformance from "./auditPerformance.vue"

export default {
    components:{
      orderPerformance,
      auditPerformance
    },
    props:{
        detailParams:Object,
        detailModal:Boolean
    },
   data(){
    return{
      control:false,
      activeName:"orderPerformance"
    }
   },
   methods:{
    
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.$emit("update:detailModal", false);
      }
    },
    cancel(value) {
        this.$emit("update:detailModal", false);
    },
    
   },
   watch:{
    detailModal(value){
        this.control = value
        if(value == true){
          if(this.activeName == 'orderPerformance'){
            this.$nextTick(()=>{
              this.$refs.orderPerformance.getDetail()
            })
          }else if(this.activeName == 'auditPerformance'){
            this.$nextTick(()=>{
              this.$refs.auditPerformance.getListWithPageByCustomerInspectDatas()
            })
          }
          
        }
    }
   }
}
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
