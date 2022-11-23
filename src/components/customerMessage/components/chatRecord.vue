<!-- 聊天记录 -->
<template>
  <div class="message">
    <div class="message_wrapper" ref="customerChatRecord">
      <ul>
        <li
          v-for="(item, index) in chatRecordList"
          class="message_item"
          :key="index"
        >
          <div class="time" v-if="item.date">
            <span>{{ $moment(item.date).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </div>
          <!-- 占位 -->
          <div v-else style="height:26px"></div>
          <div class="main" :class="{ self: item.self }">
            <!-- 客服名称 -->
            <div class="nick_name" v-show="item.self">{{item.employee}}</div>
            <!-- 头像 -->
            <img
              class="avatar"
              width="36"
              height="36"
              :src="item.self ? user.img : avatar"
            />
            <!-- 文本类型 -->
            <div class="content" v-if="item.contentType === 'text'">
              <div class="text" v-html="replaceFace(item.content)"></div>
            </div>
            <!-- 图片类型 -->
            <div class="content" v-else-if="item.contentType === 'image'">
              <img class="image" :src="'https://app.hsltm.com/fxgatetest/fximserver/fxim/image?url=' + item.content" v-viewer="{ toolbar: false }" />
            </div>
            <!-- 视频类型 -->
            <div class="content" v-else-if="item.contentType === 'video'">
              <video
                class="video-js vjs-big-play-centered"
                controls
                width="250"
                height="240"
              >
                <source :src="item.content" type="video/mp4" />
              </video>
            </div>
          </div>
        </li>
      </ul>
      <Divider v-show="chatRecordList.length === 0">暂无数据</Divider>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as api from "@/api/chat";
import * as common from "@/api/common";
export default {
  props: {
    avatar: {
      type: String,
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.chat.user,
      emojis: (state) => state.chat.emojis,
    }),
  },
  data() {
    return {
      userId: "",
      pageNum: 1,
      pageSize: 3,
      nextPage: true,
      isScrolling: false,
      chatRecordList: [],
    };
  },
  methods: {
    // 根据用户编号获取聊天记录
    getChatRecordList(userId,callback) {
      this.userId = userId;
      const data = {
        userId: this.userId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      api.getChatRecordList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.chatRecordList;
          const messages = list.map((item) => {
            return {
              content: item.content,
              contentType: item.msgType,
              date: item.date,
              self: item.sender === 0 ? false : true,
              employee:item.employeeName
            };
          });
          this.pageNum++;
          callback && callback();
          this.chatRecordList = [...this.chatRecordList, ...messages];
          if (this.chatRecordList.length === totalCount) {
            this.nextPage = false;
          } else {
            this.nextPage = true;
          }
        }
      });
    },

    handleScroll(e) {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      const scrollTop = e.target.scrollTop;
      //变量windowHeight是可视区的高度
      const windowHeight = e.target.clientHeight;
      //变量scrollHeight是滚动条的总高度
      const scrollHeight = e.target.scrollHeight;
      //滚动条到底部的条件
      if (scrollTop + windowHeight === scrollHeight) {
        if (this.nextPage) {
          if (this.isScrolling === true) return;
          this.isScrolling = true;
          this.getChatRecordList(this.userId,() => {
            this.isScrolling = false;
          });
        }
      }
    },

    replaceFace(con) {
      if (con.includes("/:") || con.includes("[")) {
        let emojis = this.emojis;
        for (let i = 0; i < emojis.length; i++) {
          let url = require(`@/assets/images/emoji/${emojis[i].file}`);
          con = con.replace(
            emojis[i].reg,
            `<img src="${url}" alt="" style="vertical-align: middle; width: 24px; height: 24px" />`
          );
        }
        return con;
      }
      return con;
    },
  },
  mounted() {
    this.$refs.customerChatRecord.addEventListener(
      "scroll",
      this.handleScroll,
      true
    );
  },
};
</script>
<style lang="less" scoped>
.message .message_wrapper {
  height:240px;
  box-sizing: border-box;
  overflow-y: auto;
}
.message .message_wrapper .message_item {
  margin-bottom: 15px;
}
.message .message_wrapper .time {
  width: 100%;
  font-size: 12px;
  margin: 7px auto;
  text-align: center;
}
.message .message_wrapper .time span {
  display: inline-block;
  padding: 4px 6px;
  color: #fff;
  border-radius: 3px;
  background-color: #dcdcdc;
}
.message .message_wrapper .main {
  position: relative;
}
.message .message_wrapper .main .nick_name {
  position: absolute;
  right: 2px;
  top: 45px;
  font-size: 12px;
  width: 60px;
  text-align: center;
}
.message .message_wrapper .main .avatar {
  float: left;
  margin-left: 15px;
  border-radius: 3px;
}
.message .message_wrapper .main .content {
  display: inline-block;
  margin-left: 10px;
  position: relative;
  padding: 6px 10px;
  max-width: 330px;
  min-height: 36px;
  line-height: 24px;
  box-sizing: border-box;
  font-size: 14px;
  text-align: left;
  word-break: break-all;
  background-color: #fafafa;
  border-radius: 4px;
}
.message .message_wrapper .main .content .image {
  max-width: 310px;
  max-height: 240px;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  padding: 6px 0;
  cursor: pointer;
  vertical-align: middle;
}
.message .message_wrapper .main .content:before {
  content: " ";
  position: absolute;
  top: 12px;
  right: 100%;
  border: 6px solid transparent;
  border-right-color: #fafafa;
}
.message .message_wrapper .self {
  text-align: right;
}
.message .message_wrapper .self .avatar {
  float: right;
  margin: 0 15px;
}
.message .message_wrapper .self .content {
  background-color: #b2e281;
}
.message .message_wrapper .self .content:before {
  right: -12px;
  vertical-align: middle;
  border-right-color: transparent;
  border-left-color: #b2e281;
}
</style>
