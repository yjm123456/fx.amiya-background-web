<!-- 折叠侧边 -->
<template>
  <div class="">
    <Icon
      @click.native="collapsedSider"
      :class="rotateIcon"
      :style="{ margin: '0 20px' }"
      type="md-menu"
      size="24"
    ></Icon>
  </div>
</template>

<script>
export default {
  props: ["isCollapsed"],
  data() {
    return {};
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
  },
  methods: {
    collapsedSider() {
      this.$emit("toggleCollapse");
      this.$forceUpdate();
    },
  },
};
</script>
<style lang="less" scoped>
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
</style>
