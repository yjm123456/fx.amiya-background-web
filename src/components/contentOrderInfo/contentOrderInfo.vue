<template>
  <div>
    <Drawer
      title="内容平台订单信息"
      v-model="controlModal"
      class-name="ivu-drawer-wrap"
      width="470"
      @on-visible-change="handleShowHide"
    >
      <div class="list_wrap" ref="list_wrap">
        <div class="item" v-for="item in data" :key="item.id">
          <div class="item_title">
            <span class="item_title_left"> 订单号：{{ item.id }} </span>
            <span class="item_title_center"> 所属平台：{{ item.contentPlatformName }} </span>
            <!-- <span class="item_title_center"> {{ item.orderStatusText }} </span> -->
            <!-- <span
              class="item_title_right"
              :style="{ color: item.isAppointment ? '#19be6b' : '#fc4444' }"
            >
              {{ item.isAppointment ? "已预约" : "未预约" }}
            </span> -->
          </div>
           <div class="item_title2">
            <span class="item_title_center"> 订单状态：{{ item.orderStatusText }} </span>
             <span class="item_title_center"> 订单类型：{{ item.orderTypeText }} </span>
            <!-- <span
              class="item_title_right"
              :style="{ color: item.isAppointment ? '#19be6b' : '#fc4444' }"
            >
              {{ item.isAppointment ? "已预约" : "未预约" }}
            </span> -->
          </div>
          <div class="item_content">
            <div class="item_content_goods_name">
              项目：{{ item.goodsName }}
            </div>
            <div class="item_content_goods_name">
              项目描述：{{ item.consultingContent ? item.consultingContent :'暂无描述'}}
            </div>
            <div class="item_content_appointment_hospital">
              预约时间：{{ $moment(item.appointmentDate).format("YYYY-MM-DD") }}
            </div>
            <div class="item_content_appointment_hospital">
              预约门店：{{ item.appointmentHospitalName }}
            </div>
            <!-- <div class="item_content_phone">手机号：{{ item.phone }}</div> -->
            <div class="item_content_footer">
              
              <div class="price">
                <span>定金金额：</span>
                <span>{{ item.depositAmount }}</span>
              </div>
              <div class="price">
                <span>成交金额：</span>
                <span>{{ item.dealAmount  ? item.dealAmount : 0 }}</span>
              </div>
            </div>
          </div>
        </div>
        <Divider v-show="nextPage === false">暂无更多数据</Divider>
        <Divider v-show="data.length === 0">暂无数据</Divider>
      </div>
    </Drawer>
  </div>
</template>
<script>
import * as common from "@/api/common";
export default {
  props: {
    controlContentOrderInfoModal: Boolean,
    encryptPhone: String,
  },
  data() {
    return {
      controlModal: false,
      data: [],
      pageNum: 1,
      pageSize: 10,
      nextPage: true,
      isScrolling: false,
    };
  },
  methods: {
    // 根据客户编号获取订单列表
    byCustomerIdGetOrderList(callback) {
      const data = {
        encryptPhone: this.encryptPhone,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      common.byContentOrderList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.order;
          this.pageNum++;
          callback && callback();
          this.data = [...this.data, ...list];
          if (this.data.length === totalCount) {
            this.nextPage = false;
          } else {
            this.nextPage = true;
          }
        }
      });
    },

    handleScroll(e) {
      const scrollTop = e.target.scrollTop;
      const windowHeight = e.target.clientHeight;
      const scrollHeight = e.target.scrollHeight;
      if (scrollTop + windowHeight === scrollHeight) {
        if (this.nextPage) {
          if (this.isScrolling === true) return;
          this.isScrolling = true;
          this.byCustomerIdGetOrderList(() => {
            this.isScrolling = false;
          });
        }
      }
    },

    handleShowHide(value) {
      if (value === true) {
        this.$refs.list_wrap.addEventListener(
          "scroll",
          this.handleScroll,
          true
        );
      }
      if (value === false) {
        this.$refs.list_wrap.removeEventListener(
          "scroll",
          this.handleScroll,
          true
        );
        this.pageNum = 1;
        this.nextPage = true;
        this.data = [];
        this.$emit("handleContentOrderInfoModalChange");
      }
    },
  },
  watch: {
    controlContentOrderInfoModal(controlContentOrderInfoModal) {
      if (controlContentOrderInfoModal) {
        this.controlModal = controlContentOrderInfoModal;
        this.byCustomerIdGetOrderList();
      }
    },
  },
};
</script>
<style lang="less" scoped>
/deep/ .ivu-drawer-wrap {
  z-index: 9999;
}
/deep/ .ivu-drawer-body {
  padding: 0;
  background-color: #e6e7e9;
}
.list_wrap {
  height: 100%;
  overflow-y: auto;
  .item {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
    .item_title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 15px 0;
      background-color: #fff;
      font-size: 15px;
      .item_title_left,
      .item_title_center {
        color: #333333;
      }
      .item_title_right {
        color: #fc4444;
      }
    }
    .item_title2 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding:5px 15px 10px;
      background-color: #fff;
      font-size: 15px;
      .item_title_left,
      .item_title_center {
        color: #333333;
      }
      .item_title_right {
        color: #fc4444;
      }
    }
    .item_content {
      margin-top: 1px;
      background-color: #fff;
      padding: 10px 15px;
      color: #333333;
      .item_content_appointment_hospital {
        margin-top: 5px;
      }
      .item_content_phone {
        margin-top: 5px;
      }
      .item_content_footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 15px;
        .status_text {
        }
        .price {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-left: 20px;
          span:first-child {
            font-size: 15px;
          }
          span:last-child {
            font-size: 18px;
            color: #7c86c1;
          }
        }
      }
    }
  }
}
</style>
