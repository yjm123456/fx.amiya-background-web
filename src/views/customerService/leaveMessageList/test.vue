<template>
  <div class="wrap">
    <Card>
      <div class="list-item" v-for="item in data" :key="item.id">
        <div class="list-item-meta">
          <div class="list-item-meta-avatar">
            <span class="avatar"><img :src="item.avatar"/></span>
          </div>
          <div class="list-item-meta-content">
            <div class="list-item-meta-title">
              <span class="nickName">{{ item.nickName }}</span>
            </div>
            <div class="list-item-meta-description">
              3123123
            </div>
            <div class="list-item-meta-reply" v-if="item.flag">
              <div class="reply-list">
                <div
                  class="reply-list-item"
                  v-for="replyLeaveMessages in item.replyLeaveMessages"
                  :key="replyLeaveMessages.id"
                >
                  <span class="name">{{ replyLeaveMessages.employeeName }}：</span>
                  <span class="text-con">{{ replyLeaveMessages.content }}</span>
                </div>
              </div>
              <div class="reply-inp">
                <Input
                  v-model="item.inp_value"
                  placeholder="回复"
                  style="width: 500px"
                  type="textarea"
                />
                <Button
                  type="primary"
                  class="reply-btn"
                  @click="submit(item)"
                  :loading="item.loading"
                  >提交</Button
                >
              </div>
            </div>
          </div>
        </div>
        <!-- action -->
        <div class="list-item-action">
          <a v-if="!item.flag" @click="item.flag = true">展开回复</a>
          <a v-else @click="item.flag = false">收起</a>
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
export default {
  data() {
    return {
      pageNum: 1,

      pageSize: 10,

      data: [],

      totalCount: 0,
    };
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
              inp_value: "",
              loading:false
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
              inp_value: "",
              loading:false
            };
          });
          this.totalCount = totalCount;
        }
      });
    },

    submit(item) {
      if (!item.inp_value) {
        this.$Message.info({
          content: "请输入回复内容",
          duration: 5,
        });
        return;
      }
      const data = {
        leaveMessageId: item.id,
        content: item.inp_value,
      };
      item.loading = true;
      api.replyLeaveMessage(data).then((res) => {
        if (res.code === 0) {
          item.loading = false;
          this.getLeaveMessage();
          this.$Message.success({
            content: "回复成功",
            duration: 3,
          });
        }
      });
    },
  },
  created() {
    this.getLeaveMessage();
  },
};
</script>
<style lang="less" scoped>
.list-item {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #e8eaec;
}
.list-item:last-child {
  border: none;
}
.list-item-meta {
  display: flex;
  flex: 1;
}
.list-item-meta-avatar {
  margin-right: 16px;
  .avatar {
    display: inline-block;
    text-align: center;
    background: #ccc;
    color: #fff;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.list-item-meta-content {
  flex: 1;
  .list-item-meta-title {
    margin-bottom: 4px;
    font-size: 14px;
    line-height: 22px;
    .nickName {
      font-weight: 600;
      color: #6d757a;
      margin-right: 10px;
    }
  }
  .list-item-meta-description {
    font-size: 14px;
    border:1px solid red;
  }
  .list-item-meta-reply {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    .reply-list {
      .reply-list-item {
        margin-bottom: 12px;
        &:last-child {
          margin-bottom: 0;
        }
        .name {
          font-weight: 600;
          color: #6d757a;
          margin-right: 10px;
        }
        .text-con {
          color: #99a2aa;
        }
      }
    }
    .reply-inp {
      padding-top: 12px;
      .reply-btn {
        margin-left: 4px;
        height: 52px;
      }
    }
  }
}
.list-item-action {
  font-size: 14px;
  color: #2d8cf0;
  margin-left: 48px;
  font-size: 14px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
