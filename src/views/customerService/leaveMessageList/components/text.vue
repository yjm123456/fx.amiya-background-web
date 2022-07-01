<!-- 文本输入框 -->
<template>
  <div class="text">
    <div class="emoji">
      <span
        class="icon iconfont icon-iconbiaoqing"
        @click="showEmoji = !showEmoji"
      ></span>
      <Upload
        :headers="headers"
        :action="baseUrl + '/fxopenoss/aliyunoss/uploadone'"
        name="uploadfile"
        :format="['jpg', 'jpeg', 'png', 'gif']"
        :show-upload-list="false"
        :max-size="5120"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleImgMaxSize"
        :on-success="handleSuccess"
        :on-error="handleError"
      >
        <span class="icon iconfont icon-tupian" style="margin-left:10px"></span>
      </Upload>
      <transition name="showbox">
        <div class="emojiBox" v-show="showEmoji">
          <li v-for="item in emojis" :key="item.file">
            <img
              :src="getImgUrl(item.file)"
              :data="item.code"
              @click="handleSelectEmoji(item.title)"
            />
          </li>
        </div>
      </transition>
    </div>
    <textarea
      ref="text"
      v-model="content"
      @keyup="onKeyup"
      @click="showEmoji = false"
    ></textarea>
    <div class="send" @click="send">
      <span>发送(Enter)</span>
    </div>
    <transition name="appear">
      <div class="warn" v-show="warn">
        <div class="description">不能发送空白信息</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { baseUrl } from "./../../../../http/baseUrl";
import { mapState } from "vuex";
export default {
  props:{
    loading:Boolean
  },
  data() {
    return {
      content: "",
      warn: false,
      showEmoji: false,
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
      baseUrl
    };
  },
  computed: {
    ...mapState({
      emojis: (state) => state.chat.emojis,
    }),
  },
  methods: {
    //获取图片地址
    getImgUrl(img) {
      return require("@/assets/images/emoji/" + img);
    },
    handleFormatError(file) {
      this.$Message.warning("文件 " + file.name + " 格式不正确");
    },
    handleImgMaxSize(file) {
      this.$Message.warning("图片 " + file.name + " 太大，不能超过 512K");
    },
    handleFileMaxSize(file) {
      this.$Message.warning("文件 " + file.name + " 太大，不能超过 10M");
    },
    handleSuccess(res, file) {
      if (res.code !== 0) return;
      let msg = {
        content: res.data.url,
        msgType: "image",
      };
      this.$emit("sendMessage",msg)
    },
    handleError: function() {
      this.$Message.error("上传错误");
    },
    // 选择表情
    handleSelectEmoji(emoji) {
      // 根据id选择器选中对象
      let elInput = this.$refs.text;
      // input 第0个字符到选中的字符
      let startPos = elInput.selectionStart;
      // 选中的字符到最后的字符
      let endPos = elInput.selectionEnd;
      if (startPos === undefined || endPos === undefined) return;
      let txt = elInput.value;
      // 将表情添加到选中的光标位置
      let result = txt.substring(0, startPos) + emoji + txt.substring(endPos);
      // 赋值给input的value
      elInput.value = result;
      // 重新定义光标位置
      elInput.focus();
      elInput.selectionStart = startPos + emoji.length;
      elInput.selectionEnd = startPos + emoji.length;
      // 赋值给表单中的的字段
      this.content = result;
      this.showEmoji = false;
    },
    // 按回车发送信息
    onKeyup(e) {
      if (e.keyCode === 13) {
        this.send();
      }
    },
    replaceFace(con) {
      if (con.includes("[")) {
        let emojis = this.emojis;
        for (let i = 0; i < emojis.length; i++) {
          con = con.replace(emojis[i].reg,`${emojis[i].code}`);
        }
        return con;
      }
      return con;
    },
    // 点击发送按钮发送信息
    send() {
      if (this.content.length < 1 || this.content.trim() === "") {
        this.warn = true;
        this.content = "";
        setTimeout(() => {
          this.warn = false;
        }, 1000);
      } else {
        let msg = {
          content: this.replaceFace(this.content),
          msgType: "text",
        };
        this.$emit("sendMessage",msg)
        this.content = "";
      }
    },
  }
};
</script>

<style lang="less" scoped>
.text {
  position: relative;
  width: 550px;
  height: 150px;
  background: #fff;
}
.text .emoji {
  position: relative;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  padding: 0 30px;
  box-sizing: border-box;
  color: #7c7c7c;
  .ivu-upload {
    display: inline-block;
  }
}
.text .emoji .icon-look {
  cursor: pointer;
}
.text .emoji .icon-look:hover {
  color: #1aad19;
}
.text .emoji .emojiBox {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  top: -210px;
  width: 300px;
  height: 200px;
  padding: 5px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-radius: 2px;
  box-shadow: 0 1px 2px 1px #d1d1d1;
}
.text .emoji .emojiBox.showbox-enter-active,
.text .emoji .emojiBox.showbox-leave-active {
  transition: all 0.1s;
}
.text .emoji .emojiBox.showbox-enter,
.text .emoji .emojiBox.showbox-leave-active {
  opacity: 0;
}
.text textarea {
  box-sizing: border-box;
  padding: 0 30px;
  height: 108px;
  width: 100%;
  border: none;
  outline: none;
  font-family: "Micrsofot Yahei";
  resize: none;
}
.text .send {
  position: absolute;
  bottom: 10px;
  right: 30px;
  width: 75px;
  height: 28px;
  line-height: 28px;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  background: #f5f5f5;
  font-size: 14px;
  color: #7c7c7c;
  cursor:pointer;
}
.text .send:hover {
  background: #129611;
  color: #fff;
}
.text .warn {
  position: absolute;
  bottom: 50px;
  right: 10px;
  width: 110px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  text-align: center;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  box-shadow: 0 1px 5px 1px #bdbdbd;
}
.text .warn.appear-enter-active,
.text .warn.appear-leave-active {
  transition: all 1s;
}
.text .warn.appear-enter,
.text .warn.appear-leave-active {
  opacity: 0;
}
.text .warn:before {
  content: " ";
  position: absolute;
  top: 100%;
  right: 20px;
  border: 7px solid transparent;
  border-top-color: #fff;
  filter: drop-shadow(1px 3px 2px #bdbdbd);
}
</style>
