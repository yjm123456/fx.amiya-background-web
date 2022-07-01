<template>
  <div>
    <Drawer
      title="已领取礼品"
      v-model="controlModal"
      class-name="ivu-drawer-wrap"
      width="470"
      @on-visible-change="handleShowHide"
    >
      <div class="list_wrap" ref="list_wrap">
        <div class="item" v-for="item in data" :key="item.id">
          <div class="item_title">
            <span class="item_title_left">
              <span v-show="item.orderId">绑定订单号：{{ item.orderId }}</span>
            </span>
            <span
              class="item_title_right"
              :style="{ color: item.isSendGoods ? '#19be6b' : '#fc4444' }"
            >
              {{ item.isSendGoods ? "已发货" : "未发货" }}
            </span>
          </div>
          <div class="item_content">
            <div class="item_content_goods_img">
              <img :src="item.thumbPicUrl" alt="" />
            </div>
            <div class="item_content_goods_info">
              <div class="item_content_goods_name">
                礼品名称：{{ item.giftName }}
              </div>
              <div
                class="item_content_courier_number"
                v-show="item.courierNumber"
              >
                快递单号：{{ item.courierNumber }}
              </div>
              <div class="item_content_phone" v-show="item.receivePhone">
                收件人手机号：{{ item.receivePhone }}
              </div>
              <div class="item_content_footer">
                <div class="status_text">
                  <span v-show="item.sendGoodsDate">
                    发货时间：{{
                      $moment(item.sendGoodsDate).format("YYYY-MM-DD HH:mm:ss")
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="item_footer">
            领取时间：{{ $moment(item.date).format("YYYY-MM-DD HH:mm:ss") }}
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
    controlAlreadyReceiveGiftModal: Boolean,
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
    // 根据手机号加密文本获取领取礼品列表
    byEncryptPhoneGetUserAlreadyReceiveGift(callback) {
      const data = {
        encryptPhone: this.encryptPhone,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      common.byEncryptPhoneGetUserAlreadyReceiveGift(data).then((res) => {
        if (res.code === 0) {
          if (res.code === 0) {
            const { list, totalCount } = res.data.receiveGift;
            this.pageNum++;
            callback && callback();
            this.data = [...this.data, ...list];
            if (this.data.length === totalCount) {
              this.nextPage = false;
            } else {
              this.nextPage = true;
            }
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
          this.byEncryptPhoneGetUserAlreadyReceiveGift(() => {
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
        this.$emit("handleAlreadyReceiveGiftModalChange");
      }
    },
  },
  watch: {
    controlAlreadyReceiveGiftModal(controlAlreadyReceiveGiftModal) {
      if (controlAlreadyReceiveGiftModal) {
        this.controlModal = controlAlreadyReceiveGiftModal;
        this.byEncryptPhoneGetUserAlreadyReceiveGift();
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
      padding: 15px;
      background-color: #fff;
      font-size: 15px;
      .item_title_left {
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
      display: flex;
      .item_content_goods_img {
        width: 100px;
        height: 100px;
        margin-right: 15px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .item_content_goods_info {
        flex: 1;
        .item_content_courier_number {
          margin-top: 5px;
          width: 100%;
        }
        .item_content_phone {
          margin-top: 5px;
          width: 100%;
        }
        .item_content_footer {
          width: 100%;
          display: flex;
          align-items: center;
          margin-top: 5px;
          .status_text {
          }
        }
      }
    }
    .item_footer {
      background-color: #fff;
      padding: 5px 15px;
      margin-top: 1px;
    }
  }
}
</style>
