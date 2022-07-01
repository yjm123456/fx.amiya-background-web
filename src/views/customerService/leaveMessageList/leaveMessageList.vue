<template>
  <div class="wrap">
    <Card>
      <div class="leaveMessage_list">
        <div class="leaveMessage_list_item" v-for="item in data" :key="item.id">
          <!-- meta -->
          <div class="leaveMessage_list_item_meta">
            <!-- avatar -->
            <div class="leaveMessage_list_item_meta_avatar">
              <span class="avatar"><img :src="item.avatar"/></span>
              <span class="nickName">{{ item.nickName }}</span>
            </div>
            <!-- action -->
            <div class="leaveMessage_list_item_meta_action">
              <a v-if="!item.flag" @click="handleFlag(item,true)">展开回复</a>
              <a v-else @click="handleFlag(item,false)">收起</a>
            </div>
          </div>
          <!-- content -->
          <div class="leaveMessage_list_item_content" v-for="leaveMessageDate in item.leaveMessageDateList" :key="leaveMessageDate.date">
            <!-- date -->
            <div class="leaveMessage_list_item_content_date">
              {{$moment(leaveMessageDate.date).format("YYYY/MM/DD")}}
            </div>
            <!-- list -->
            <Card>
              <div class="leaveMessage_list_item_content_list" v-for="leaveMessage in leaveMessageDate.leaveMessageList" :key="leaveMessage.msgId">
                <!-- 文本类型 -->
                <div class="leaveMessage_list_item_content_list_content" v-if="leaveMessage.msgType === 'text'">
                  <span class="type" v-if="leaveMessage.type === 2" style="color:#4b4b4b;font-weight: 600;">{{leaveMessage.employeeName}}：</span><span class="text" v-html="replaceFace(leaveMessage.content)"></span>
                </div>
                <!-- 图片类型 -->
                <div class="leaveMessage_list_item_content_list_content" v-else-if="leaveMessage.msgType === 'image'">
                  <span class="type" v-if="leaveMessage.type === 2" style="color:#4b4b4b;font-weight: 600;">{{leaveMessage.employeeName}}：</span>
                  <img
                    class="image"
                    :src="leaveMessage.content"
                    v-viewer="{ toolbar: false }"
                  />
                </div>
              </div>
            </Card>
          </div>
          <Card v-if="item.flag" :padding="0" style="margin-left: 60px;display: inline-block;">
            <v-text @sendMessage="sendMessage" :loading="item.loading"></v-text>
          </Card>
        </div>
      </div>

      <div class="page_wrap">
        <Page
          ref="pages"
          :current="pageNum"
          :page-size="pageSize"
          :total="totalCount"
          show-total
          show-elevator
          @on-change="handlePageChange"
        />
      </div>
    </Card>
  </div>
</template>

<script>
import * as api from "@/api/customerService";
import { mapState } from "vuex";
import vText from "./components/text";
export default {
  components:{
    vText,
  },
  data() {
    return {
      pageNum: 1,

      pageSize: 10,

      data: [],

      totalCount: 0,

      // 当天回复项
      currentItemInfo:null
    };
  },
  computed:{
    ...mapState({
      emojis: (state) => state.chat.emojis,
    }),
  },
  methods: {
    // 获取留言板列表
    getLeaveMessage() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize } = this;
      const data = {
        pageNum,
        pageSize,
      };
      api.getLeaveMessage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.leaveMessage;
          this.data = list.map((item) => {
            return {
              ...item,
              flag: false,
              loading: false,
            };
          });
          this.totalCount = totalCount;
        }
      });
    },

    // 获取预约列表分页
    handlePageChange(pageNum) {
      const { pageSize } = this;
      const data = {
        pageNum,
        pageSize,
      };
      api.getLeaveMessage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.leaveMessage;
          this.data = list.map((item) => {
            return {
              ...item,
              flag: false,
              loading: false,
            };
          });
          this.totalCount = totalCount;
        } 
      });
    },

    handleFlag(item,flag) {
      this.data.forEach(el=>{
        el.flag = false;
      })
      item.flag = flag;
      if(item.flag){
        this.currentItemInfo = item;
      } else {
        this.currentItemInfo = null;
      }
    },

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

    // 回复
    sendMessage(msg) {
      let { userId } = this.currentItemInfo;
      const {content, msgType} = msg
      const data = {
        userId,
        content,
        msgType
      }
      api.replyLeaveMessage(data).then(res=>{
        if(res.code === 0) {
          this.getLeaveMessage();
          this.$Message.success({
            content: "回复成功",
            duration: 3,
          });
        }
      })
    }
  },
  created() {
    this.getLeaveMessage();
  },
};
</script>
<style lang="less" scoped>
.leaveMessage_list_item {
  padding: 12px 0;
  border-bottom: 1px solid #e8eaec;
  &:last-child {
    border: none;
  }
  // meta
  .leaveMessage_list_item_meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .leaveMessage_list_item_meta_avatar {
      display: flex;
      align-items: center;
      .avatar {
        margin-right: 10px;
        display: inline-block;
        text-align: center;
        background: #ccc;
        color: #fff;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        vertical-align: middle;
        width: 50px;
        height: 50px;
        line-height: 50px;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .nickName {
        font-weight: 600;
        font-size:18px;
      }
    }
  }
  // content
  .leaveMessage_list_item_content{
    padding: 6px 0;
    margin-left: 60px;
    .leaveMessage_list_item_content_date{
      font-weight: 600;
      color: #6d757a;
      font-size:15px;
      margin-bottom: 6px;
    }
    .leaveMessage_list_item_content_list{
      border-bottom: 1px solid  #e8eaec;
      padding-bottom: 6px;
      margin-bottom: 6px;
      &:last-child{
        border: none;
        padding: 0;
        margin:0;
      }
      .leaveMessage_list_item_content_list_content{
        .image{
          max-width: 200px;
          max-height: 130px;
          white-space: normal;
          word-wrap: break-word;
          word-break: break-all;
          padding: 6px 0;
          cursor: pointer;
          vertical-align: top;
        }
      }
    }
  }
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
