<template>
  <div>我是详情{{ $route.params.id }}</div>
</template>
<script>
export default {
  inject: ["reload"],
  beforeRouteUpdate(to, from, next) {
    this.reload();
    next();
  },
  mounted() {
    // console.log("重新加载了");
  },
};
</script>
<style lang="less" scoped>
</style>