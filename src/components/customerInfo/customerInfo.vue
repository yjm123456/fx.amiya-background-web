<template>
  <div class="wrapper">
    <Modal title="客户详细信息" footer-hide v-model="controlModal" width="80%">
      <div class="userInfo" v-if="customerInfoComParams.userId">
        <baseInfo :customer="customer" :customerDetailInfo="customerDetailInfo"></baseInfo>
      </div>
      <div class="userOtherInfo">
        <Tabs ref="tabs" v-model="tabActive" name="customerInfoCom">
          <TabPane label="聊天记录" name="chatRecord" key="chatRecord" tab="customerInfoCom">
            <chatRecord ref="chatRecord" :avatar="customer.avatar"></chatRecord>
          </TabPane>
          <TabPane label="下单订单信息" name="orderInfo" key="orderInfo" tab="customerInfoCom">
            <orderInfo ref="orderInfo"></orderInfo>
          </TabPane>
          <TabPane label="内容平台订单列表" name="contentOrderList" key="contentOrderList" tab="customerInfoCom">
            <contentOrderList ref="contentOrderList"></contentOrderList>
          </TabPane>
          <TabPane label="预约信息" name="appointment" key="appointment" tab="customerInfoCom">
            <appointment ref="appointment"></appointment>
          </TabPane>
          <TabPane label="回访记录" name="returnVisitRecord" key="returnVisitRecord" tab="customerInfoCom">
            <returnVisitRecord ref="returnVisitRecord"></returnVisitRecord>
          </TabPane>
          <TabPane label="已领取礼品" name="alreadyReceiveGift" key="alreadyReceiveGift" tab="customerInfoCom">
            <alreadyReceiveGift ref="alreadyReceiveGift"></alreadyReceiveGift>
          </TabPane>
          <TabPane label="消费追踪" name="consumeTrack" key="consumeTrack" tab="customerInfoCom">
            <consumeTrack ref="consumeTrack"></consumeTrack>
          </TabPane>
        </Tabs>
      </div>
    </Modal>
  </div>
</template>
<script>
// 客户信息
import baseInfo from "./components/baseInfo";
// 客户聊天记录
import chatRecord from "./components/chatRecord";
// 客户订单信息
import orderInfo from "./components/orderInfo";
// 内容平台订单列表
import contentOrderList from "./components/contentOrderList";
// 客户预约信息
import appointment from "./components/appointment";
// 回访记录
import returnVisitRecord from "./components/returnVisitRecord";
// 已领取礼品
import alreadyReceiveGift from "./components/alreadyReceiveGift";
// 消费追踪
import consumeTrack from  "./components/consumeTrack";
import * as common from "@/api/common";
export default {
  components: {
    baseInfo,
    chatRecord,
    orderInfo,
    contentOrderList,
    appointment,
    returnVisitRecord,
    alreadyReceiveGift,
    consumeTrack,
  },
  props: {
    customerInfoComParams:{
      type:Object
    }
  },
  data() {
    return {
      controlModal: this.customerInfoComParams.controlCustomerInfoDisplay,

      // 默认显示聊天记录
      tabActive: "chatRecord",

      // 客户信息
      customer: {},

      // 客户详细信息
      customerDetailInfo: {}
    };
  },
  watch: {
    // 弹框隐藏
    controlModal(value) {
      if (!value) {
        this.$emit("resetControlCustomerInfoDisplay");
        this.$refs.tabs.activeKey = "chatRecord";
      }
    },

    customerInfoComParams: {
      handler(customerInfoComParams) {
        const { userId, encryptPhone, controlCustomerInfoDisplay } = customerInfoComParams;
        if (controlCustomerInfoDisplay) {
          this.controlModal = controlCustomerInfoDisplay;
          if (userId) {
            // 根据用户编号获取客户详情
            this.byUserIdGetCustomerDetail(userId);
            // 根据加密电话获取客户详细信息
            this.byEncryptPhoneGetCustomerInfo(encryptPhone);
            // 根据用户编号获取聊天记录
            this.$refs.chatRecord.pageNum = 1;
            this.$refs.chatRecord.chatRecordList = [];
            this.$refs.chatRecord.getChatRecordList(userId);
            // 根据加密电话文本获取订单列表
            this.$refs.orderInfo.byCustomerIdGetOrderList(encryptPhone);
            // 根据加密电话文本获取内容平台订单列表
            this.$refs.contentOrderList.byCustomerIdGetOrderList(encryptPhone);
            // 根据加密电话文本获取预约列表
            this.$refs.appointment.byUserIdGetAppointmentList(encryptPhone);
            // 根据加密电话文本获取回访记录列表
            this.$refs.returnVisitRecord.byEncryptPhoneGetReturnVisitList(encryptPhone)
            // 根据加密电话文本获取已领取礼品列表
            this.$refs.alreadyReceiveGift.byEncryptPhoneGetUserAlreadyReceiveGift(encryptPhone)
            // 消费追踪
            this.$refs.consumeTrack.byEncryptPhoneGetCustomerConsumptionTrackList(encryptPhone)
          } else {
            // 根据加密电话获取客户详细信息
            this.byEncryptPhoneGetCustomerInfo(encryptPhone);
            // 需清空聊天记录参数
            this.$refs.chatRecord.pageNum = 1;
            this.$refs.chatRecord.chatRecordList = [];
            // 根据加密电话文本获取订单列表
            this.$refs.orderInfo.byCustomerIdGetOrderList(encryptPhone);
            // 根据加密电话文本获取内容平台订单列表
            this.$refs.contentOrderList.byCustomerIdGetOrderList(encryptPhone);
            // 根据加密电话文本获取预约列表
            this.$refs.appointment.byUserIdGetAppointmentList(encryptPhone);
            // 根据加密电话文本获取回访记录列表
            this.$refs.returnVisitRecord.byEncryptPhoneGetReturnVisitList(encryptPhone)
            // 根据加密电话文本获取已领取礼品列表
            this.$refs.alreadyReceiveGift.byEncryptPhoneGetUserAlreadyReceiveGift(encryptPhone)
            // 消费追踪
            this.$refs.consumeTrack.byEncryptPhoneGetCustomerConsumptionTrackList(encryptPhone)
          }
        }
      },
      deep:true,
    },
  },
  methods: {
    //根据用户编号获取客户详情
    byUserIdGetCustomerDetail(userId) {
      common.byUserIdGetCustomerDetail(userId).then(res => {
        if (res.code === 0) {
          this.customer = res.data.customer;
        }
      });
    },

    // 根据加密电话获取客户详细信息
    byEncryptPhoneGetCustomerInfo(encryptPhone) {
      const data = {
        encryptPhone
      }
      common.byEncryptPhoneGetCustomerInfo(data).then(res=>{
        if (res.code === 0) {
          this.customerDetailInfo = res.data.customerDetailInfo;
        }
      })
    }
  },
};
</script>
<style lang="less" scoped>
.userOtherInfo {
  margin-top: 10px;
}
</style>
