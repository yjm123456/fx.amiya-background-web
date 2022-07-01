<template>
  <div>
    <Modal
      v-model="controlModal"
      title="待完成需求"
      :mask-closable="false"
      width="1000"
      footer-hide
      @on-visible-change="handleVisibleChange"
    >
      <div class="todo_confirmed_wrap">
        <Card
          style="width:300px"
          v-for="item in data"
          :key="item.id"
          class="card_wrap"
        >
          <div slot="title">
            <div style="display:flex;justify-content: space-between;">
              <Icon type="ios-film-outline"></Icon>
              <a @click="handleConfirmClick(item.id)">确认完成</a>
            </div>
          </div>
          <div class="content_wrap">
            <div>
              <span>
                <a>创建时间</a>
              </span>
              <span>
                {{ $moment(item.createDate).format("YYYY-MM-DD HH:mm:ss") }}
              </span>
            </div>
            <div>
              <span>
                <a>直播间类型</a>
              </span>
              <span>
                {{ item.liveTypeName }}
              </span>
            </div>
            <div>
              <span>
                <a>需求类型</a>
              </span>
              <span>
                {{ item.requirementTypeName }}
              </span>
            </div>
            <div>
              <span>
                <a>主播</a>
              </span>
              <span>
                {{ item.anchor }}
              </span>
            </div>
            <div>
              <span>
                <a>优先级</a>
              </span>
              <span>
                {{ item.priorityLevelText }}
              </span>
            </div>
            <div>
              <span>
                <a>指派部门</a>
              </span>
              <span>
                {{ item.departmentName }}
              </span>
            </div>
            <div>
              <span>
                <a>执行人</a>
              </span>
              <span>
                {{ item.executeByName }}
              </span>
            </div>
            <div>
              <span>
                <a>执行时间</a>
              </span>
              <span>
                {{ $moment(item.executeDate).format("YYYY-MM-DD HH:mm:ss") }}
              </span>
            </div>
            <div>
              <span>
                <a>执行说明</a>
              </span>
              <span>
                {{ item.executeRemark }}
              </span>
            </div>
            <div>
              <span>
                <a>需求描述</a>
              </span>
              <span>
                {{ item.description }}
              </span>
            </div>
          </div>
        </Card>
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
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/liveRequirementManage";
export default {
  props: {
    controlStayCompleteDemandModal: Boolean,
  },
  data() {
    return {
      controlModal: false,

      pageNum: 1,

      pageSize: 3,

      totalCount: 0,

      data: [],
    };
  },
  watch: {
    controlStayCompleteDemandModal: {
      handler(value) {
        if (value) {
          this.controlModal = true;
          this.getUnConfirmLiveRequirementList();
        }
      },
    },
  },
  methods: {
    getUnConfirmLiveRequirementList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize } = this;
      const data = {
        pageNum,
        pageSize,
      };
      api.getUnConfirmLiveRequirementList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.unConfirmRequirement;
          this.data = list;
          this.totalCount = totalCount;
        }
      });
    },

    // 分页
    handlePageChange(pageNum) {
      const { pageSize } = this;
      const data = {
        pageNum,
        pageSize,
      };
      api.getUnConfirmLiveRequirementList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.unConfirmRequirement;
          this.data = list;
          this.totalCount = totalCount;
        }
      });
    },

    handleConfirmClick(id) {
      this.$Modal.confirm({
        title: "确认提示",
        content: "是否确认完成？",
        onOk: () => {
          api.confirmFinishLiveRequirement(id).then((res) => {
            if (res.code === 0) {
              this.$Message.success({
                content: "提交成功",
                duration: 3,
              });
              this.getUnConfirmLiveRequirementList();
            }
          });
        },
      });
    },

    handleVisibleChange(value) {
      if (!value) {
        this.$emit("handleStayCompleteDemandVisibleChange");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.todo_confirmed_wrap {
  display: flex;
  align-items: center;
  .card_wrap:nth-child(2) {
    margin: 0 34px;
  }
  .content_wrap {
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      > span:first-child {
        flex: 1;
      }
      > span:last-child {
        flex: 2;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: right;
      }
    }
  }
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
