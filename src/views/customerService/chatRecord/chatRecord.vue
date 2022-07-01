<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Select
            v-model="employeeId"
            style="width: 200px;"
            placeholder="请选择客服"
            transfer
          >
            <Option
              v-for="item in employeeList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="byCustomerServiceIdGetUChatserList()"
            >查询</Button
          >
        </div>
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table border :columns="columns" :data="data"></Table>
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

    <chatRecord :chatRecordParams="chatRecordParams" @handleChatRecordModalChange="chatRecordParams.controlChatRecordModal = false"></chatRecord>
  </div>
</template>

<script>
import * as customerManage from "@/api/customerManage";
import * as api from "@/api/customerService";
import chatRecord from "./components/chatRecord";
export default {
  components: {
    chatRecord,
  },
  data() {
    return {
      employeeList: [],

      employeeId: "",

      pageNum: 1,

      pageSize: 10,

      columns: [
        {
          title: "头像",
          key: "avatar",
          render: (h, params) => {
            return h(
              "viewer",
              {
                props: {
                  zoomable: false,
                },
              },
              [
                h("img", {
                  style: {
                    width: "50px",
                    height: "50px",
                    margin: "5px 15px 5px 5px",
                    verticalAlign: "middle",
                  },
                  attrs: {
                    src: params.row.avatar,
                  },
                }),
                params.row.nickName,
              ]
            );
          },
        },
        {
          title: "电话",
          key: "phone",
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      const { userId, avatar } = params.row;
                      this.chatRecordParams.controlChatRecordModal = true;
                      this.chatRecordParams.avatar = avatar;
                      this.chatRecordParams.employeeId = this.employeeId;
                      this.chatRecordParams.userId = userId;
                    },
                  },
                },
                "聊天记录"
              ),
            ]);
          },
        },
      ],

      data: [],

      totalCount: 0,

      chatRecordParams: {
        avatar: "",
        controlChatRecordModal: false,
        employeeId: "",
        userId: "",
      },
    };
  },
  methods: {
    // 获取客服列表
    getCustomerServiceList() {
      customerManage.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employeeList = employee;
          this.employeeId = this.employeeList[0].id;
          this.byCustomerServiceIdGetUChatserList();
        }
      });
    },

    // 获取预约列表
    byCustomerServiceIdGetUChatserList() {
      const data = {
        employeeId: this.employeeId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      api.byCustomerServiceIdGetUChatserList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.chatRecord;
          this.data = list;
          this.totalCount = totalCount;
        }
      });
    },

    // 获取预约列表分页
    handlePageChange(pageNum) {
      const data = {
        employeeId: this.employeeId,
        pageNum,
        pageSize: this.pageSize,
      };
      api.byCustomerServiceIdGetUChatserList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.chatRecord;
          this.data = list;
          this.totalCount = totalCount;
        }
      });
    },
  },
  created() {
    this.getCustomerServiceList();
  },
};
</script>

<style lang="less" scoped>
.header_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.container {
  margin-top: 16px;
}

.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
