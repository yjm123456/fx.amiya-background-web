<template>
  <div class="wrapper">
    <span class="employeeName">{{ employeeName }}</span>
    <span class="positionName">{{ positionName }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employeeName: sessionStorage.getItem("employeeName"),
      positionName: sessionStorage.getItem("positionName"),
    };
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #808695;
  .employeeName {
    font-size: 16px;
    font-weight: 600;
    color: #ae9249;
  }
  .positionName {
    color: #cccccc;
  }
}
</style>
