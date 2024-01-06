<template>
  <div id="app">
    <telephone v-if="control"></telephone>
    <router-view></router-view>
    <!-- <button @click="handleClick">点击</button> -->
  </div>
</template>

<script>
import telephone from "@/components/telephone/telephone";
export default {
  name: "app",
  components: {
    telephone, 
  },
  computed: {
    control() {
      return this.$store.state.callCenter.control;
    },
  },
  methods:{
    // handleClick() {
    //   this.$store.dispatch("message/getMessage")
    // }
  }
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
}
</style>
