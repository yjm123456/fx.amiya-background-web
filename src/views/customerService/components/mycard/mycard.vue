<template>
  <div class="mycard">
    <header>
      <Dropdown @on-click="handleClick">
        <div class="title">
          <Avatar icon="ios-person" size="large" class="avatar"/>
          <div class="dot" :style="{'background-color' : connectState ? '#09F175' : '#ed4014'}"></div>
        </div>
        <DropdownMenu slot="list" v-show="!connectState">
          <DropdownItem name="reconnection">重新连接</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </header>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      user: (state) => state.chat.user,
      connectState: (state) => state.chat.connectState,
    }),
  },
  methods:{
    handleClick(name) {
      switch (name) {
        case "reconnection":
        if (sessionStorage.getItem("employeeId")) {
          this.$store.commit("chat/initWebsocket", sessionStorage.getItem("employeeId"));
        }
      }
    },
  }
};
</script>

<style lang="less" scoped>
.title {
  color: #2d8cf0;
  cursor: pointer;
  position: relative;
}
.mycard {
  width: 60px;
  height: 600px;
  background-color: #2b2c2f;
  .avatar {
    width: 36px;
    height: 36px;
    margin: 20px 12px 0 12px;
    border-radius: 2px;
  }
  .dot {
    bottom: 0px;
    right: 10px;
    position: absolute;
    height: 8px;
    width: 8px;
    border-radius: 100%;
    z-index: 10;
    -webkit-box-shadow: 0 0 0 1px #fff;
    box-shadow: 0 0 0 1px #fff;
  }
}
</style>
