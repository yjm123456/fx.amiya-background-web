<!-- 客户基础信息 -->
<template>
  <div class="page-header-content">
    <div class="avatar">
      <Avatar size="large" :src="customer.avatar" />
    </div>
    <div class="content">
      <div class="content-title">
        <span class="welcome-text">{{ customer.nickName }}</span>
        <span v-if="customerDetailInfo.name" class="messages">{{customerDetailInfo.name}} |</span>
        <span v-if="customerDetailInfo.sex"  class="message">{{customerDetailInfo.sex}} |</span>
        <span v-if="customerDetailInfo.age" class="message">{{customerDetailInfo.age}}岁 |</span>
        <span v-if="customerDetailInfo.birthday" class="message">{{this.$moment(new Date(customerDetailInfo.birthday)).format("YYYY-MM-DD")}} |</span>
        <span v-if="customerDetailInfo.wechatNumber" class="message">{{customerDetailInfo.wechatNumber}} |</span>
        <span v-if="customerDetailInfo.city" class="message">{{customerDetailInfo.city}}</span>
      </div>
      <div class="info">
        <span>{{ customer.phone }} |</span>
        <span>{{ customer.province }} - {{ customer.city }} |</span>
        <span>积分余额 {{ customerDetailInfo.integrationBalance }} |</span>
        <span v-show="customerDetailInfo.memberRank"
          >{{ customerDetailInfo.memberRank }} |</span
        >
        <span v-show="customerDetailInfo.memberCardNum"
          >会员卡号 {{ customerDetailInfo.memberCardNum }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    customer: {
      type: Object,
    },
    customerDetailInfo: {
      type: Object,
    },
  },
};
</script>
<style lang="less" scoped>

.page-header-content {
  display: flex;
  .avatar {
    flex: 0 1 72px;
    & > span {
      display: block;
      width: 72px;
      height: 72px;
      border-radius: 72px;
    }
  }
  .content {
    position: relative;
    top: 4px;
    flex: 1 1 auto;
    margin-left: 24px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 22px;

    .content-title {
      margin-bottom: 12px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
      .message,.messages{
        font-size: 14px;
        margin-left: 10px;
      }
      .messages{
        margin-left: 20px;
      }
    }

    .info {
      display: flex;
      align-items: center;
      > span:first-of-type {
      }
      > span:nth-of-type(2) {
        margin-left: 5px;
      }
      > span:nth-of-type(3) {
        margin-left: 5px;
      }
      > span:nth-of-type(4) {
        margin-left: 5px;
      }
      > span:nth-of-type(5) {
        margin-left: 5px;
      }
      > span:nth-of-type(6) {
        margin-left: 5px;
      }
    }
  }
}
</style>
