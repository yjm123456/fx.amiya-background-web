<template>
  <div>
    <Drawer
      title="预约信息"
      v-model="controlModal"
      class-name="ivu-drawer-wrap"
      width="470"
      @on-visible-change="handleShowHide"
    >
      <div class="list_wrap" ref="list_wrap">
        <div class="item" v-for="item in data" :key="item.id">
          <div class="item_left" :style="{'background-color' : item.status === 2 ? '#5ac5f4' : (item.status === 1 ? '#9080fe' : '#D81E06')}">
            <span class="iconfont icon-yiwancheng" :class="item.status === 2 ? 'icon-yiwancheng' : (item.status === 1 ? 'icon-zhihangzhong-' : 'icon-quxiao')"></span>
          </div>
          <div class="item_right">
            <div class="item_right_title">
              <span class="item_right_title_left">{{ item.statusText }}</span>
              <span class="item_right_title_right"
                >{{ $moment(item.appointmentDate).format("YYYY-MM-DD")
                }}{{ item.time }}</span
              >
            </div>
            <div class="item_right_top">
              <span>{{ item.phone }}</span>
            </div>
            <div class="item_right_hospital_name">{{ item.hospitalName }}</div>
            <div class="item_right_goods_info">
              {{ item.itemName }} {{ item.itemStandard }}
            </div>
            <div class="item_right_remark">
              备注：{{ item.remark ? item.remark : "无备注" }}
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
    controlAppointmentModal: Boolean,
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
    getAppointmentList(callback) {
      const data = {
        encryptPhone: this.encryptPhone,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      common.byEncryptPhoneGetAppointmentList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.appointment;
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
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      const scrollTop = e.target.scrollTop;
      //变量windowHeight是可视区的高度
      const windowHeight = e.target.clientHeight;
      //变量scrollHeight是滚动条的总高度
      const scrollHeight = e.target.scrollHeight;
      //滚动条到底部的条件
      if (scrollTop + windowHeight === scrollHeight) {
        if (this.nextPage) {
          if (this.isScrolling === true) return;
          this.isScrolling = true;
          this.getAppointmentList(() => {
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
        this.$emit("handleAppointmentModalChange");
      }
    },
  },
  watch: {
    controlAppointmentModal(controlAppointmentModal) {
      if (controlAppointmentModal) {
        this.controlModal = controlAppointmentModal;
        this.getAppointmentList();
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
    display: flex;
    padding: 12px;
    background-color: #fff;
    margin-bottom: 1px;
    .item_left {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      margin-right: 10px;
      .iconfont {
        font-size: 15px;
      }
    }
    .item_right {
      flex: 1;
      .item_right_title {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .item_right_top {
      }
      .item_right_hospital_name {
        color: #666;
        font-size: 18px;
        font-weight: bold;
        margin-top: 5px;
      }
      .item_right_goods_info {
        margin-top: 5px;
      }
      .item_right_remark {
        margin-top: 5px;
      }
    }
  }
}
</style>
