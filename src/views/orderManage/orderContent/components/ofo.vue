<template>
  <div>
      <div class="order_message">
        <div class="message_title"><span class="line"></span>客资登记信息</div>
        <div class="order_content">
          <div  class="item_list">
            <div class="mr_top  items">
              <span class=" mr_top  title_bold">来源渠道：</span>
              <span>{{shoppingCartRegistrationInfo.contentPlatFormName}} </span>
            </div>
            <div  class="mr_top items">
              <span class="title_bold">主播IP：</span>
              <span>{{shoppingCartRegistrationInfo.liveAnchorName}}</span>
            </div>
            <div class="mr_top items">
              <span class="title_bold">主播微信号：</span>
              <span>{{ shoppingCartRegistrationInfo.liveAnchorWechatNo }} </span>
            </div>
          </div>
           <div  class="item_list">
            <div class="mr_top items">
              <span class="title_bold">抖音昵称：</span>
              <span>{{ shoppingCartRegistrationInfo.customerNickName }} </span>
            </div>
            <div class="mr_top items">
              <span class="title_bold">手机号：</span>
              <span>{{ shoppingCartRegistrationInfo.phone }} </span>
            </div>
            <div class="mr_top items">
              <span class="title_bold">辅助手机号：</span>
              <span>{{ shoppingCartRegistrationInfo.subPhone }}</span>
            </div>
          </div>
          <div  class="item_list">
            <div class="mr_top items">
              <span class="title_bold">下单金额：</span>
              <span>{{ shoppingCartRegistrationInfo.price }}</span>
            </div>
            <div class="mr_top items">
              <span class="title_bold">面诊方式：</span>
              <span>{{ shoppingCartRegistrationInfo.consultationTypeText }}</span>
            </div>
            <div class="mr_top items">
              <span class="title_bold">录单触达：</span>
              <i-switch v-model="shoppingCartRegistrationInfo.isCreateOrder" disabled />
            </div>
          </div>
          <div  class="item_list">
            <div class="mr_top items">
              <span class="title_bold">派单触达：</span>
              <i-switch v-model="shoppingCartRegistrationInfo.isSendOrder" disabled />
            </div>
            <div class="mr_top items">
              <span class="title_bold">是否加V：</span>
              <i-switch v-model="shoppingCartRegistrationInfo.isAddWeChat" disabled />
            </div>
            <div class="mr_top items">
              <span class="title_bold">是否核销：</span>
              <i-switch v-model="shoppingCartRegistrationInfo.isWriteOff" disabled />
            </div>
          </div>
          <div  class="item_list">
            <div class="mr_top items">
              <span class="title_bold">是否面诊：</span>
              <i-switch v-model="shoppingCartRegistrationInfo.isConsultation" disabled />
            </div>
            <div class="mr_top items">
              <span class="title_bold">面诊时间：</span>
              <span>{{
                  shoppingCartRegistrationInfo.consultationDate
                    ? this.$moment(shoppingCartRegistrationInfo.consultationDate).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )
                    : ""
                }}</span>
            </div>
            <div class="mr_top items">
              <span class="title_bold">是否退款：</span>
              <i-switch v-model="shoppingCartRegistrationInfo.isReturnBackPrice" disabled />
            </div>
          </div>
          <div  class="item_list">
            <div class="mr_top items">
              <span class="title_bold">是否核销：</span>
              <span>{{shoppingCartRegistrationInfo.createBy}}</span>
            </div>
            <div class="mr_top items">
              <span class="title_bold">接诊人员：</span>
              <span>{{shoppingCartRegistrationInfo.assignEmpName}}</span>
            </div>
            <div class="mr_top items">
              <span class="title_bold">创建时间：</span>
              <span>{{
                  this.$moment(shoppingCartRegistrationInfo.createDate).format("YYYY-MM-DD HH:mm:ss") == '0001-01-01 00:00:00' ? '' :this.$moment(shoppingCartRegistrationInfo.createDate).format("YYYY-MM-DD HH:mm:ss")
                }}</span>
            </div>
          </div>
          <div  class="item_list">
            <div class="mr_top items">
              <span class="title_bold">退款时间：</span>
              <span>{{
                  shoppingCartRegistrationInfo.refundDate
                    ? this.$moment(shoppingCartRegistrationInfo.refundDate).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )
                    : ""
                }}</span>
            </div>
            <div class="mr_top items">
              <span class="title_bold">是否差评：</span>
              <i-switch v-model="shoppingCartRegistrationInfo.isBadReview" disabled />
            </div>
            <div class="mr_top items">
              <span class="title_bold">差评时间：</span>
              <span>{{
                  shoppingCartRegistrationInfo.badReviewDate
                    ? this.$moment(shoppingCartRegistrationInfo.badReviewDate).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )
                    : ""
                }}</span>
            </div>
          </div>
          <div  class="item_list">
            <div class="mr_top items">
              <span class="title_bold">是否追评：</span>
              <i-switch v-model="shoppingCartRegistrationInfo.isReContent" disabled />
            </div>
            <div class="mr_top items">
              <span class="title_bold">重要程度：</span>
              <span>{{ shoppingCartRegistrationInfo.emergencyLevelText }} </span>
            </div>
            <div class="mr_top items">
              <span class="title_bold">获客方式：</span>
              <span>{{ shoppingCartRegistrationInfo.getCustomerTypeText }} </span>
            </div>
          </div>
          <div class="mr_top">
            <span class="title_bold">退款原因：</span>
            <span>{{ shoppingCartRegistrationInfo.refundReason }}</span>
          </div>
          <div class="mr_top">
            <span class="title_bold">差评原因：</span>
            <span>{{ shoppingCartRegistrationInfo.badReviewReason }}</span>
          </div>
          <div class="mr_top">
            <span class="title_bold">差评内容：</span>
            <span>{{ shoppingCartRegistrationInfo.badReviewContent }}</span>
          </div>
          
          <div class="mr_top">
            <span class="title_bold">追评内容：</span>
            <span>{{ shoppingCartRegistrationInfo.reContent }}</span>
          </div>
          <div class="mr_top">
            <span class="title_bold">备注：</span>
            <span>{{ shoppingCartRegistrationInfo.remark }}</span>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
export default {
  props: {
    shoppingCartRegistrationInfo: Object,
  },
  components: {
   
  },
  data() {
    return {
    };
  },

  methods: {
    // modal 显示状态发生变化时触发
    handleVisibleChange(value) {
      if (!value) {
        this.query.doubleOrderModel = false;
      }
    },
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancelClick();
        this.$emit("update:detailModel", false);
      }
    },
    // 取消
    handleCancelClick(name) {
      this.$emit("update:detailModel", false);
    },
  },
  
  watch: {
    detailModel(value) {
      this.controlModel = value;
    },
    
  },
};
</script>
<style scoped>
.order_con {
  background: #fcfcfc;
  border: 1px solid #dad0d0;
  padding: 10px 5px;
  box-sizing: border-box;
  margin-bottom: 10px;
  color: #000;
}
.order_message {
  margin-top: 20px;
  color: #000;
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
}
.order_content ,.order_content2{
  margin-top: 10px;
  padding: 10px 5px;
  box-sizing: border-box;
  border: 1px solid #dad0d0;
  margin-bottom: 20px;
}
.order_content2{
  display: flex;
}
.title_bold {
  font-weight: bold;
}
.order_type {
  display: flex;
}
.order_time {
  margin-left: 100px;
}
.mr_top {
  margin-top: 10px;
  text-align: start;
}
.mr {
  margin: 20px 0 10px;
}
.fl_end,.fl_end2 {
  display: flex;
  justify-content: space-between;
}
.img {
  width: 100%;
  height: auto;
}
.order_id {
  color: red;
}
.unImg{
  width: 40px;
  height: 40px;
  
}
.item_list{
  display: flex;
  text-align: start;
  /* justify-content: space-between; */
}
.items{
  width: 50%;
}
.fl_item{
  display: flex;
}
.items2{
  width: 360px;
}
.appoint{
  display:flex;
  justify-content:flex-end;
  margin-top:10px;
  margin-right:-5px
}
</style>
