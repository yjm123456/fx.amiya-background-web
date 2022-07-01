<!-- 暂无会话 -->
<template>
  <div class="wrapper">
    <div>
      <span class="iconfont icon-xinxi"></span>
      <!-- <span>当前没有会话</span> -->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.wrapper {
  height: 540px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #867c7c;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    span:first-child {
      font-size: 40px;
    }
  }
}
</style>
