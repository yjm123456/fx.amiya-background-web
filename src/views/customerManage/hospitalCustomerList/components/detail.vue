<template>
  <div>
    <Modal
      title="详情"
      v-model="control"
      footer-hide
      width="80%"
      @on-visible-change="handleModalVisibleChange"
    >
      <div>
        <Tabs ref="tabs" v-model="active" @on-click="handleTabsSwitch" v-if="isTable">
          <TabPane label="订单列表" name="orderList">
            <orderList :encryptPhone="encryptPhone" ref="orderList"></orderList>
          </TabPane>
          <TabPane label="消费追踪列表" name="consumeTrackList">
            <consumeTrackList
              :encryptPhone="encryptPhone"
              ref="consumeTrackList"
            ></consumeTrackList>
          </TabPane>
        </Tabs>
      </div>
    </Modal>
  </div>
</template>

<script>
import orderList from "./orderList";
import consumeTrackList from "./consumeTrackList";
export default {
  components: {
    orderList,
    consumeTrackList,
  },
  props: {
    encryptPhone: String,
    controlModal: Boolean,
    isTable:Boolean
  },
  data() {
    return {
      control: false,

      active: "orderList",
    };
  },
  watch: {
    controlModal: {
      handler(controlModal) {
        this.active = "orderList"
        this.$nextTick(()=>{
          this.$refs.orderList.hospitalByEncryptPhoneGetSendHospitalOrders(this.encryptPhone);
        })
        this.control = controlModal;
      },
    },
  },
  methods: {
    handleModalVisibleChange(value) {
      if (value === false) {
        this.$emit("handleDetailModalChange");
      }
    },

    handleTabsSwitch(name) {
      if (name === "orderList") {
        this.$refs.orderList.hospitalByEncryptPhoneGetSendHospitalOrders(
          this.encryptPhone
        );
        return;
      }
      if (name === "consumeTrackList") {
        this.$refs.consumeTrackList.byEncryptPhoneGetCustomerConsumptionTrackList(
          this.encryptPhone
        );
        return;
      }
    },
  },
};
</script>
