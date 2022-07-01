<template>
  <div>
    <div>
      <Table :columns="columns" :data="data" border height="500"></Table>
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
  </div>
</template>

<script>
import * as api from "@/api/customerManage";
export default {
  data() {
    return {
      encryptPhone: "",
      control: false,
      columns: [
        {
          title: "电话",
          key: "phone",
          minWidth: 170,
        },
        {
          title: "医院",
          key: "hospitalName",
          minWidth: 170,
        },
        {
          title: "项目",
          key: "itemName",
          minWidth: 170,
        },
        {
          title: "金额",
          key: "price",
          minWidth: 170,
        },
        {
          title: "消费类型",
          key: "consumeTypeText",
          minWidth: 170,
        },
        {
          title: "创建时间",
          key: "createDate",
          minWidth: 170,
          render: (h, params) => {
            return h(
              "div",
              this.$moment(params.row.createDate).format("YYYY-MM-DD HH:mm:ss")
            );
          },
        },
      ],
      data: [],
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,
    };
  },
  methods: {
    byEncryptPhoneGetCustomerConsumptionTrackList(encryptPhone) {
      this.encryptPhone = encryptPhone;
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const data = {
        encryptPhone: this.encryptPhone,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      api.byEncryptPhoneGetCustomerConsumptionTrackList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customerHospitalConsume;
          this.data = list;
          this.totalCount = totalCount;
        }
      });
    },

    handlePageChange(pageNum) {
      const data = {
        encryptPhone: this.encryptPhone,
        pageNum,
        pageSize: this.pageSize,
      };
      api.byEncryptPhoneGetCustomerConsumptionTrackList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customerHospitalConsume;
          this.data = list;
          this.totalCount = totalCount;
        }
      });
    },
    close(value) {
      if (value === false) {
        this.$emit("handleModalChange");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
