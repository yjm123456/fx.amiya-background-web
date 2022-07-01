<template>
  <div>
    <Header class="header">
      <div class="left">
        <collapsedSider
          class="collapsedSider"
          :isCollapsed="isCollapsed"
          @toggleCollapse="toggleCollapse"
        ></collapsedSider>
      </div>
      <div class="right">
        <news class="news"></news>
        <loginInfo class="loginInfo"></loginInfo>
        <user class="user"></user>
      </div>
    </Header>
  </div>
</template>
<script>
import collapsedSider from "./components/collapsedSider/collapsedSider";
import news from "./components/news/news";
import loginInfo from "./components/loginInfo/loginInfo";
import user from "./components/user/user";
export default {
  props: ["isCollapsed"],
  components: {
    collapsedSider,
    news,
    loginInfo,
    user,
  },
  methods: {
    toggleCollapse() {
      this.$emit("toggleCollapse");
      this.$forceUpdate();
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  padding-left: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  line-height: normal;
  .right {
    display: flex;
    align-items: center;
    .news,.loginInfo {
      margin-right: 20px;
    }
  }
}
</style>
