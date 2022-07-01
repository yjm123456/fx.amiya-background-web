<!-- 聊天列表 -->
<template>
  <div class="msglist" ref="chatList">
    <ul>
      <li
        v-for="item in searchedChatlist"
        class="sessionlist"
        :class="{ active: item.id === selectId }"
        @click="selectSession(item.id)"
        :key="item.id"
      >
        <div class="list-left">
          <img
            class="avatar"
            width="42"
            height="42"
            :alt="item.user.name"
            :src="item.user.img"
          />
          <span class="unread" v-if="item.unReadedCount">{{item.unReadedCount}}</span>
        </div>
        <div class="list-right">
          <p class="name">{{ item.user.name }}</p>
          <span class="time">{{item.messages[item.messages.length - 1].date | time}}</span>
          <p class="lastmsg">
            {{ item.messages[item.messages.length - 1].content }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import * as api from "@/api/chat";
export default {
  data() {
    return {
      nextPage:true,

      isScrolling:false
    };
  },
  computed: {
    ...mapState({
      selectId: (state) => state.chat.selectId,
      searchText: (state) => state.chat.searchText,
    }),
    ...mapGetters("chat", {
      searchedChatlist: "searchedChatlist",
    }),
  },
  methods: {
    // 监听滚动获取聊天用户列表
    handleScroll(e) {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      const scrollTop = e.target.scrollTop;
      //变量windowHeight是可视区的高度
      const windowHeight = e.target.clientHeight;
      //变量scrollHeight是滚动条的总高度
      const scrollHeight = e.target.scrollHeight;
      //滚动条到底部的条件
      if (scrollTop + windowHeight == scrollHeight) {
        if (this.nextPage) {
          if (this.isScrolling === true) return;
          this.isScrolling = true;
          this.$store.dispatch("chat/getChatUserList").then(nextPage=>{
            this.nextPage = nextPage;
            this.isScrolling = false;
          })
        }
      }
    },

    // 选择会话根据用户编号获取聊天记录
    selectSession(userId) {
      this.$store.dispatch("chat/resetGetChatRecordListParams");
      this.$store.dispatch("chat/getChatRecordList",userId).then(nextPage=>{
        this.$emit("selectSession", {
          userId,
          nextPage
        });
      });
    },
  },
  mounted() {
    this.$refs.chatList.addEventListener("scroll", this.handleScroll, true);
  },
  filters: {
    // 将日期过滤为 hour:minutes
    time(date) {
      if (typeof date === "string") {
        date = new Date(date);
      }
      if (date.getMinutes() < 10) {
        return date.getHours() + ":0" + date.getMinutes();
      } else {
        return date.getHours() + ":" + date.getMinutes();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.msglist {
  height: 540px;;
  overflow-y: auto;
}
.msglist .sessionlist {
  display: flex;
  padding: 12px;
  transition: background-color 0.1s;
  font-size: 0;
}
.msglist .sessionlist:hover {
  background-color: #dcdcdc;
}
.msglist .sessionlist.active {
  background-color: #c4c4c4;
}
.msglist .sessionlist .list-left {
  position: relative;
}
.msglist .sessionlist .list-left .unread {
  font-size: 12px;
  position: absolute;
  z-index: 999;
  right: 6px;
  top: -6px;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: inline-block;
  background: #fa5151;
  color: #fff;
  text-align: center;
}
.msglist .sessionlist .avatar {
  border-radius: 2px;
  margin-right: 12px;
}
.msglist .sessionlist .list-right {
  position: relative;
  flex: 1;
  margin-top: 4px;
}
.msglist .sessionlist .name {
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
}
.msglist .sessionlist .time {
  float: right;
  color: #999;
  font-size: 10px;
  vertical-align: top;
}
.msglist .sessionlist .lastmsg {
  position: absolute;
  font-size: 12px;
  width: 130px;
  height: 15px;
  line-height: 15px;
  color: #999;
  bottom: 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
