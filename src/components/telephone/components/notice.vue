<template>
  <div>
    <div class="wrapper">
      <div class="info">
        <div>
          <span>呼入电话</span><span>{{ data.PhoneNumber }}</span>
        </div>
      </div>
      <p class="handle">
        <span><Button type="primary" @click="answer">接听</Button></span>
        <span><Button type="error" @click="reject">拒接</Button></span>
      </p>
    </div>
  </div>
</template>

<script>
import store from "./../../../store/index"
export default {
  props: ["data"],
  methods: {
    // 接听
    answer() {
      store.dispatch("callCenter/answer", this.data);
    },

    //拒接
    reject() {
      store.dispatch("callCenter/reject", this.data);
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  .info {
    font-size: 15px;
    > div {
      margin-bottom: 8px;
      > span:first-child {
        margin-right: 10px;
      }
      > span:last-child {
        font-weight: bold;
      }
    }
  }
  .handle {
    padding-bottom: 10px;
    > span:first-child {
      margin-right: 10px;
    }
  }
}
</style>
