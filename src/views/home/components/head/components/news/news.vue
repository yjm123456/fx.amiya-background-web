<!-- 消息 -->
<template>
  <div class="news">
    <Dropdown
      @on-click="handleClick"
      v-has="{ role: ['fx.amiya.permission.LIST_UNREAD_MESSAGE'] }"
    >
      <div class="messages_title" >
        <span style="font-size:12px" :class="unreadMessage.length ? 'active' : ''" >未读消息</span>
        <span class="ivu-icon ivu-icon-md-arrow-dropdown"></span>
        <div class="dot" v-show="unreadMessage.length"></div>
      </div>
      <DropdownMenu slot="list">
        <DropdownItem v-for="item in unreadMessage" :key="item.id" name="chat">
          <div class="sessionlist">
            <div class="list-left">
              <img
                class="avatar"
                width="42"
                height="42"
                :alt="item.user.name"
                :src="item.user.img"
              />
            </div>
            <div class="list-right">
              <p class="name">{{ item.user.name }}</p>
              <p class="lastmsg">
                {{ item.messages[item.messages.length - 1].content }}
              </p>
            </div>
          </div>
        </DropdownItem>
        <DropdownItem v-show="!unreadMessage.length" >
          <div>
            暂无消息
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    // 好友列表
    ...mapGetters("chat", {
      searchedChatlist: "searchedChatlist",
    }),
    // 未读消息
    unreadMessage() {
      return this.searchedChatlist.filter((item) => {
        return item.unReadedCount > 0;
      });
    },
  },
  created() {
    const currentRole = JSON.parse(sessionStorage.getItem("permissions"));
    const flag = currentRole.some((ele) => {
      return 'fx.amiya.permission.LIST_UNREAD_MESSAGE'.includes(ele);
    });
    if (flag) {
      this.$store.dispatch("chat/getChatUserList").then((nextPage) => {});
    }
  },
  methods: {
    handleClick(name) {
      switch (name) {
        case "chat":
          this.$router.push("/chat");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.news {
  .messages_title {
    color: #2d8cf0;
    cursor: pointer;
    position: relative;
  }
  .dot {
    top: 12px;
    right: -6px;
    position: absolute;
    height: 8px;
    width: 8px;
    border-radius: 100%;
    background: #ed4014;
    z-index: 10;
    -webkit-box-shadow: 0 0 0 1px #fff;
    box-shadow: 0 0 0 1px #fff;
  }
  .sessionlist {
    display: flex;
    transition: background-color 0.1s;
    font-size: 0;
  }
  .sessionlist .list-left {
    position: relative;
  }
  .sessionlist .list-left .avatar {
    border-radius: 2px;
    margin-right: 12px;
  }
  .sessionlist .list-right {
    position: relative;
    flex: 1;
    margin-top: 4px;
  }
  .sessionlist .list-right .name {
    display: inline-block;
    vertical-align: top;
    font-size: 14px;
  }
  .sessionlist .list-right .lastmsg {
    font-size: 12px;
    width: 100px;
    height: 15px;
    line-height: 15px;
    color: #999;
    bottom: 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  @keyframes active {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    /* 添加兼容性前缀 */
    
    @-webkit-keyframes active {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    
    @-moz-keyframes active {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    
    @-ms-keyframes active {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    
    @-o-keyframes active {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    /* 定义blink类*/
    
    .active {
        color: #2d8cf0;
        font-size: 46px;
        animation: active 1s linear infinite;
        /* 其它浏览器兼容性前缀 */
        -webkit-animation: active 1s linear infinite;
        -moz-animation: active 1s linear infinite;
        -ms-animation: active 1s linear infinite;
        -o-animation: active 1s linear infinite;
    }
}
</style>
