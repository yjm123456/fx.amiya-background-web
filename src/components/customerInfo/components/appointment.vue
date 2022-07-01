<!-- 预约信息 -->
<template>
  <div class="appointment">
    <Table
      border
      :columns="appointmentInfo.columns"
      :data="appointmentInfo.data"
    ></Table>
    <div class="page_wrap">
      <Page
        ref="pages"
        :current="appointmentInfo.pageNum"
        :page-size="appointmentInfo.pageSize"
        :total="appointmentInfo.totalCount"
        show-total
        show-elevator
        @on-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import * as common from "@/api/common";
export default {
  data() {
    return {
      // 预约列表
      appointmentInfo: {
        columns: [
          {
            title: "预约日期",
            key: "appointmentDate",
            width: 200,
            render: (h, params) => {
              return h("div", [
                this.$moment(params.row.appointmentDate).format("YYYY-MM-DD"),
                params.row.time,
              ]);
            },
          },
          {
            title: "医院名称",
            key: "hospitalName",
            width: 300,
          },
          {
            title: "预约状态",
            key: "statusText",
            width: 100,
          },
          {
            title: "项目名称",
            key: "itemName",
            width: 300,
          },
          {
            title: "项目规格",
            key: "itemStandard",
            width: 100,
          },
          {
            title: "预约电话",
            key: "phone",
            width: 200,
          },
          {
            title: "提交时间",
            key: "submitDate",
            width: 200,
            render: (h, params) => {
              return h("div",this.$moment(params.row.submitDate).format("YYYY-MM-DD HH:mm:ss"));
            },
          },
          {
            title: "备注",
            key: "remark",
            width: 200,
          },
        ],
        data: [],
        encryptPhone: "",
        pageNum: 1,
        pageSize: 8,
        totalCount: 0,
      },
    };
  },
  methods: {
    // 根据用户编号获取预约列表
    byUserIdGetAppointmentList(encryptPhone) {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      this.appointmentInfo.encryptPhone = encryptPhone;
      const { pageNum, pageSize } = this.appointmentInfo;
      const data = {
        encryptPhone,
        pageNum,
        pageSize,
      };
      common.byEncryptPhoneGetAppointmentList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.appointment;
          this.appointmentInfo.data = list;
          this.appointmentInfo.totalCount = totalCount;
        }
      });
    },

    handlePageChange(pageNum) {
      const { encryptPhone, pageSize } = this.appointmentInfo;
      const data = { encryptPhone, pageNum, pageSize };
      common.byEncryptPhoneGetAppointmentList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.appointment;
          this.appointmentInfo.data = list;
          this.appointmentInfo.totalCount = totalCount;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.appointment {
  height: 500px;
  overflow: auto;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
