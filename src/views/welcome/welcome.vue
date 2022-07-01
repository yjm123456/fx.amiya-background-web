<template>
  <div>
    <div @click="router">跳转</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    router() {
      let id = parseInt(Math.random() * 100000);
      this.$router.push({
        path: `/details/${id}`,
        query:{
          title:`详情 - ${id}`
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>