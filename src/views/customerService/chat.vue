<template>
  <div class="content">
    <mycard></mycard>
    <div class="msglist">
      <search></search>
      <chatlist v-show="searchedChatlist.length" @selectSession="selectSession"></chatlist>
      <noConversation v-show="!searchedChatlist.length"></noConversation>
    </div>
    <div class="chatbox">
      <message v-if="selectedChat" :params="params"></message>
      <v-text v-if="selectedChat"></v-text>
      <noConversation v-show="!selectedChat"></noConversation>
    </div>
  </div>
</template>

<script>
import mycard from "./components/mycard/mycard";
import search from "./components/search/search";
import chatlist from "./components/chatlist/chatlist";
import noConversation from "./components/noConversation/noConversation";
import message from "./components/message/message";
import vText from "./components/text/text";
import { mapGetters } from "vuex";
export default {
  components: {
    mycard,
    search,
    chatlist,
    noConversation,
    message,
    vText,
  },
  data() {
    return {
      params: null,
    };
  },
  computed: {
    // 好友列表
    ...mapGetters("chat", {
      searchedChatlist: "searchedChatlist",
      selectedChat: "selectedChat",
    }),
  },
  methods: {
    selectSession(params) {
      this.params = params;
    },
  },
  destroyed() {
    this.$store.dispatch("chat/resetSelectId");
  },
};
</script>

<style lang="less" scoped>
/deep/ input {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-weight: normal;
  vertical-align: baseline;
}
/* 设置滚动条的样式 */
/deep/ ::-webkit-scrollbar {
  width: 8px;
}
/* 滚动条滑块 */
/deep/ ::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.1);
}
.content {
  display: flex;
  width: 860px;
  background-color: #fff;
  margin: 20px auto;
  .msglist {
    width: 250px;
    background: rgb(230, 230, 230);
  }
  .chatbox {
    flex: 1;
  }
}
</style>
