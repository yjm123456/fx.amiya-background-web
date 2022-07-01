<!-- 消息框 -->
<template>
  <div class="message">
    <header class="header">
      <div class="friendname" @click="previewCustomerDetail">{{ selectedChat.user.name }}</div>
    </header>
    <div class="message-wrapper" ref="message">
      <ul>
        <li
          v-for="item in selectedChat.messages"
          class="message-item"
          :key="item.id"
        >
          <!-- 5分钟之内的消息，只显示一次消息 -->
          <div class="time" v-if="item.date">
            <span>{{ $moment(item.date).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </div>
          <!-- 占位 -->
          <div v-else style="height:26px"></div>
          <div class="main" :class="{ self: item.self }">
            <!-- 头像 -->
            <img
              class="avatar"
              width="36"
              height="36"
              :src="item.self ? user.img : selectedChat.user.img"
            />
            <!-- 文本类型 -->
            <div class="content" v-if="item.contentType === 'text'">
              <div class="text" v-html="replaceFace(item.content)"></div>
            </div>
            <!-- 图片类型 -->
            <div class="content" v-else-if="item.contentType === 'image'">
              <img
                @load="handleImgLoadFulfil"
                class="image"
                :src="'https://app.hsltm.com/fxgatetest/fximserver/fxim/image?url=' + item.content"
                v-viewer="{ toolbar: false }"
              />
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
    </div>
    <!-- 客户详细信息 -->
    <customerInfo :customerInfoComParams="customerInfoComParams" @resetControlCustomerInfoDisplay="resetControlCustomerInfoDisplay"></customerInfo>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import customerInfo from "@/components/customerInfo/customerInfo"
export default {
  components:{
    customerInfo
  },
  props: {
    params: {
      type: Object,
    },
  },
  data() {
    return {
      // 加载聊天记录
      flag: false,
      
      isScrolling: false,

      selectSessionInfo: {
        userId: "",
        nextPage: true,
      },

      // 上次屏幕高低
      lastTimeScreenHeight: 0,

      // 客户信息组件参数
      customerInfoComParams:{
        userId:"",
        encryptPhone:"",
        controlCustomerInfoDisplay:false,
      }
    };
  },
  computed: {
    ...mapGetters("chat", {
      selectedChat: "selectedChat",
      messages: "messages",
      isSendMessage: "isSendMessage",
    }),
    ...mapState({
      user: (state) => state.chat.user,
      emojis: (state) => state.chat.emojis,
    }),
  },
  mounted() {
    this.$refs.message.addEventListener("scroll", this.handleScroll, true);
  },
  beforedestroy() {
    this.$refs.message.removeEventListener('scroll', this.handleScroll ,false)
  },
  watch: {
    // 发送信息后,让信息滚动到最下面
    messages() {
      if (this.isSendMessage) {this.flag = false;}
      if (!this.flag) {this.$nextTick(() => {this.$refs.message.scrollTop = this.$refs.message.scrollHeight;});}
      this.$store.dispatch("chat/resetIsSendMessage");
    },

    // 聊天记录参数等
    params(params) {
      this.flag = false;
      this.$nextTick(() => {this.$refs.message.scrollTop = this.$refs.message.scrollHeight;});
      this.selectSessionInfo = params;
    },

    selectedChat: {
      handler(selectedChat) {
        const { id, user } = selectedChat;
        const { encryptPhone } = user;
        this.customerInfoComParams.userId = id;
        this.customerInfoComParams.encryptPhone = encryptPhone;
      },
      deep:true,
      immediate: true
    }
  },
  methods: {
    // 在发送信息之后，将输入的内容中属于表情的部分替换成emoji图片标签 再经过v-html 渲染成真正的图片
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

    // 监听滚动
    handleScroll(e) {
      const scrollTop = e.target.scrollTop;
      if (scrollTop === 0) {
        if (this.selectSessionInfo.nextPage) {
          if (this.isScrolling === true) return;
          this.lastTimeScreenHeight = this.$refs.message.scrollHeight;
          this.isScrolling = true;
          this.flag = true;
          this.$store.dispatch("chat/getChatRecordList",this.selectSessionInfo.userId).then(nextPage=>{
            this.$nextTick(() => {
              this.$refs.message.scrollTop = this.$refs.message.scrollHeight - this.lastTimeScreenHeight - 62;
            });
            this.selectSessionInfo.nextPage = nextPage;
            this.isScrolling = false;
          })
        }
      }
    },

    // 图片加载完成
    handleImgLoadFulfil() {
      if (this.isSendMessage) {this.flag = false;}
      if (!this.flag) {this.$nextTick(() => {this.$refs.message.scrollTop = this.$refs.message.scrollHeight;});}
      this.$store.dispatch("chat/resetIsSendMessage");
    },

    // 查看客户详情
    previewCustomerDetail() {
      this.customerInfoComParams.controlCustomerInfoDisplay = true;
    },

    resetControlCustomerInfoDisplay() {
      this.customerInfoComParams.controlCustomerInfoDisplay = false;
    }
  }
};
</script>

<style lang="less" scoped>
.message {
  width: 550px;
  height: 450px;
}
.message .header {
  height: 60px;
  padding: 28px 0 0 30px;
  box-sizing: border-box;
  border-bottom: 1px solid #e7e7e7;
}
.message .header .friendname {
  font-size: 18px;
  cursor: pointer;
}
.message .message-wrapper {
  min-height: 390px;
  max-height: 390px;
  padding: 10px 15px;
  box-sizing: border-box;
  overflow-y: auto;
  border-bottom: 1px solid #e7e7e7;
}
.message .message-wrapper .message-item {
  margin-bottom: 15px;
}
.message .message-wrapper .time {
  width: 100%;
  font-size: 12px;
  margin: 7px auto;
  text-align: center;
}
.message .message-wrapper .time span {
  display: inline-block;
  padding: 4px 6px;
  color: #fff;
  border-radius: 3px;
  background-color: #dcdcdc;
}
.message .message-wrapper .main .avatar {
  float: left;
  margin-left: 15px;
  border-radius: 3px;
}
.message .message-wrapper .main .content {
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
.message .message-wrapper .main .content .image {
  max-width: 310px;
  max-height: 240px;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  padding: 6px 0;
  cursor: pointer;
  vertical-align: middle;
}
.message .message-wrapper .main .content:before {
  content: " ";
  position: absolute;
  top: 12px;
  right: 100%;
  border: 6px solid transparent;
  border-right-color: #fafafa;
}
.message .message-wrapper .self {
  text-align: right;
}
.message .message-wrapper .self .avatar {
  float: right;
  margin: 0 15px;
}
.message .message-wrapper .self .content {
  background-color: #b2e281;
}
.message .message-wrapper .self .content:before {
  right: -12px;
  vertical-align: middle;
  border-right-color: transparent;
  border-left-color: #b2e281;
}
</style>
