<template>
  <div class="content">
    <Modal
      title="留言板"
      footer-hide
      v-model="messageBoardParams.messageBoard"
      width="40%"
    >
      <div class="con" v-for="(item,index) in messageBoardPage.data" :key="index">
        <div class="item" >
          <img
            :src="logoMin"
            alt=""
            class="img"
            v-if="item.type==0"
          />
          <img
            :src="item.hospitalLogo"
            alt=""
            class="img"
            v-if="item.type==1"
          />
          <div class="name">{{item.typeName}}</div>
          <div class="time">{{$moment(item.date).format('YYYY-MM-DD HH:mm:ss')}}</div>
        </div>
        <div class="item-message">
          <div class="message-content">{{item.content}}</div>
        </div>
      </div>
      <Divider v-show="messageBoardPage.data.length === 0">暂无数据</Divider>
      <div class="pages">
        <Page
          ref="pages"
          :current="messageBoardPage.pageNum"
          :page-size="messageBoardPage.pageSize"
          :total="messageBoardPage.totalCount"
          show-total
          show-elevator
          @on-change="handlePageChange"
          style="display: flex; justify-content: flex-end"
        />
        <Form
          ref="form"
          :model="form"
          :rules="ruleValidate"
          label-position="left"
          :label-width="70"
          style="margin-top: 50px"
        >
          <FormItem label="内容" prop="content">
            <Input
              v-model="form.content"
              type="textarea"
              style="width: 500px"
            ></Input>
          </FormItem>
        </Form>
        <div class="footer" slot="form">
          <Button @click="cancel('form')" style="margin-right: 10px"
            >取消</Button
          >
          <Button type="primary" @click="submit('form')">确定</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
import logoMin from "@/assets/images/logo_min.png"
export default {
  components:{
      
  },
  props: {
    messageBoardParams: {
      type: Object,
    },
  },
  data() {
    return {
      messageBoardPage: {
        pageNum: 1,
        pageSize: 5,
        data: [],
        totalCount: 0,
      },
      form: {
        content: "",
      },
      ruleValidate: {
        content: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur"
          }
        ]
      },
      logoMin
    };
  },
  methods: {
    // 获取留言板列表
    getMessageBoardList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { id } = this.messageBoardParams;
      const { pageNum, pageSize } = this.messageBoardPage;
      const data = {
        pageNum,
        pageSize,
        id,
      };
      api.bySendInfoIdGetSendMessageList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.sendOrderMessageBoards;
          this.messageBoardPage.data = list;
          this.messageBoardPage.totalCount = totalCount;
        }
      });
    },

    // 获取列表分页
    handlePageChange(pageNum) {
      const { id } = this.messageBoardParams;
      const { pageSize } = this.messageBoardPage;
      const data = {
        pageNum,
        pageSize,
        id,
      };
      api.bySendInfoIdGetSendMessageList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.sendOrderMessageBoards;
          this.messageBoardPage.data = list;
          this.messageBoardPage.totalCount = totalCount;
        }
      });
    },

    // 修改
    submit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { content } = this.form;
          const { hospitalId, id } = this.messageBoardParams;
          const data = {
            content,
            hospitalId,
            id,
          };
          api.addSendMessageBoard(data).then((res) => {
            if (res.code === 0) {
              this.cancel("form");
              this.$Message.success({
                content: "添加成功",
                duration: 3,
              });
            }
          });

        }
      })
    },

    // 取消
    cancel(name) {
      this.messageBoardParams.messageBoard = false;
      this.$refs[name].resetFields();
      this.openAllHospital = false;
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel("form");
      }
    },
  },
  watch: {
    messageBoardParams: {
      handler(messageBoardParams) {
        const { hospitalId, id } = messageBoardParams;
        this.getMessageBoardList();
      },
      deep: true,
    },
  },
};
</script>
<style scoped lang="less">
.con {
  margin-bottom: 30px;
  .item {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 24px;
    }
    .name {
      margin-right: 50px;
    }
  }
  .item-message {
    margin-left: 10%;
  }
}
.footer {
  display: flex;
  justify-content: flex-end;
}
</style>
