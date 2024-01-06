<template>
  <div class="content">
    <Modal
      title="详情"
      footer-hide
      v-model="detailModels"
      width="80%"
      :mask-closable="false"
      :closable="false"

    >
   <Card class="container">
      <div>
        <Table
          border
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          show-total
          show-elevator
          :columns="query.columns"
          :data="query.data"
          @on-change="handlePageChange"
        ></Table>
      </div>
      <div class="page_wrap">
        <Page
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          show-total
          show-elevator
          @on-change="handlePageChange"
        />
      </div>
    </Card>
      <div class="footer" >
          <Button @click="cancel" style="margin-right: 10px" >取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/customerAppointmentSchedule";

export default {
  components:{
      
  },
  props: {
    detailModel: Boolean,
    params:Object
  },
  data() {
    return {
      detailModels:false,
      query: {
        // 重要程度
        emergencyLevelListAll: [{ emergencyLevel: -1, emergencyLevelText: "全部重要程度" },],
        keyWord: "",
        appointmentType:-1,
        importantType: -1,
        pageNum: 1,
        pageSize: 10,
        isFinish: -1,
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        columns: [
          {
            title: "创建人",
            key: "createByEmpName",
            minWidth: 150,
            align:'center'
          },
          {
            title: "客户昵称",
            key: "customerName",
            minWidth: 150,
            align:'center'
          },
          {
            title: "手机号",
            key: "phone",
            minWidth: 150,
            align:'center'
          },
          {
            title: "预约类型",
            key: "appointmentTypeText",
            minWidth: 150,
            align:'center'
          },
          {
            title: "预约时间",
            key: "appointmentDate",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.appointmentDate
                  ? this.$moment(params.row.appointmentDate).format(
                      "YYYY-MM-DD"
                    )
                  : ""
              );
            },
          },
          {
            title: "是否完成",
            key: "phone",
            minWidth: 150,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.isFinish == true ? "已完成" : "未完成"
              );
            },
          },
          {
            title: "重要程度",
            key: "importantTypeText",
            minWidth: 150,
            align:'center'
          },
          {
            title: "备注",
            key: "remark",
            tooltip: true,
            minWidth: 300,
            align:'center'
          },
        ],
        data: [],
        totalCount: 0,
      },
    };
  },
  methods: {
       // 获取客户预约日程列表
    getCustomerAppointmentSchedule() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        keyWord,
        startDate,
        endDate,
        isFinish,
        importantType,
        appointmentType
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        startDate: this.params.startDate
          ? this.$moment(this.params.startDate).format("YYYY-MM-DD")
          : null,
        endDate: this.params.startDate
          ? this.$moment(this.params.startDate).format("YYYY-MM-DD")
          : null,
        isFinish: isFinish == -1 ? null : isFinish,
        importantType: importantType == -1 ? null : importantType,
        appointmentType: appointmentType == -1 ? null : appointmentType,

      };
      api.getCustomerAppointmentSchedule(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customerAppointmentScheduleInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取客户预约日程列表分页
    handlePageChange(pageNum) {
      const {
        pageSize,
        keyWord,
        startDate,
        endDate,
        isFinish,
        importantType,
        appointmentType
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        isFinish: isFinish == -1 ? null : isFinish,
        importantType: importantType == -1 ? null : importantType,
        appointmentType: appointmentType == -1 ? null : appointmentType,
      };
      api.getCustomerAppointmentSchedule(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customerAppointmentScheduleInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
    // 取消
    cancel(name) {
      this.$emit("update:detailModel", false);
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.$emit("update:detailModel", false);
      }
        
    },
  },
  watch: {
    detailModel: {
      handler(detailModel) {
        this.detailModels = detailModel
        if(this.detailModels == true){
          this.getCustomerAppointmentSchedule()
        }
      },
      deep: true,
    },
  },
};
</script>
<style scoped lang="less">
.footer{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>

