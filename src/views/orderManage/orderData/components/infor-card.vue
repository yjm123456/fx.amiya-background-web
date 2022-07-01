<template>
  <Card :shadow="shadow" class="info-card-wrapper" :padding="0">
    <div class="content-con">
      <div class="left-area" :style="{ background: background }">
        <i class="iconfont" :class="icon"></i>
      </div>
      <div class="right-area">
        <div>
          <div class="count">
            <slot></slot>
          </div>
          <p>{{ title }}</p>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
    },
    background: {
      type: String,
      default: "#2d8cf0",
    },
    title: {
      type: String,
      default: "title",
    },
    shadow: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
.size {
  width: 100%;
  height: 100%;
}
.info-card-wrapper {
  .size;
  overflow: hidden;
  /deep/ .ivu-card-body {
    .size;
  }
  .content-con {
    display: flex;
    .size;
    .left-area {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      > i {
        font-size: 36px;
        color: #fff;
      }
    }
    .right-area {
      flex: 2;
      & > div {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        > .count {
          font-size: 32px;
        }
      }
    }
  }
}
</style>
