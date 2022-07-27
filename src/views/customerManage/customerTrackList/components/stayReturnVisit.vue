<template>
  <div>
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

    <!-- 追踪回访 -->
    <trackReturnVisit
      @resetControlTrackReturnVisitDisplay="resetControlTrackReturnVisitDisplay"
      :params="trackReturnVisitComParams"
      @refreshParentComList="refreshParentComList"
    />
  </div>
</template>

<script>
import * as api from "@/api/customerManage";
import trackReturnVisit from "@/components/trackReturnVisit/trackReturnVisit";
export default {
  components: { trackReturnVisit },
  props: {
    params: Object,
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,
      columns: [
        
        {
          title: "计划回访日期",
          key: "planTrackDate",
          render: (h, params) => {
            return h(
              "div",
              this.$moment(params.row.planTrackDate).format("YYYY-MM-DD")
            );
          },
        },
        {
          title: "回访计划",
          key: "trackPlan",
        },
        {
          title: "回访主题",
          key: "trackTheme",
        },
        {
          title: "电话",
          key: "phone",
        },
        {
          title: "回访类型",
          key: "trackTypeName",
        },
        
        {
          title: "回访人",
          key: "planTrackEnmployeeName",
        },
        {
          title: "创建时间",
          key: "createDate",
          render: (h, params) => {
            return h(
              "div",
              this.$moment(params.row.createDate).format("YYYY-MM-DD HH:mm:ss")
            );
          },
        },
        {
          title: "创建人",
          key: "createName",
        },
        {
          title: "操作",
          width: 200,
          fixed: "right",
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
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      const {
                        encryptPhone,
                        id,
                        trackTypeId,
                        trackThemeId,
                      } = params.row;
                      this.trackReturnVisitComParams.encryptPhone = encryptPhone;
                      this.trackReturnVisitComParams.waitTrackId = id;
                      this.trackReturnVisitComParams.trackTypeId = trackTypeId;
                      this.trackReturnVisitComParams.trackThemeId = trackThemeId;
                      this.trackReturnVisitComParams.controlTrackReturnVisitDisplay = true;
                    },
                  },
                },
                "追踪回访"
              ),
            ]);
          },
        },
      ],
      data: [],

      // 追踪回访组件参数
      trackReturnVisitComParams: {
        device: "",
        encryptPhone: "",
        waitTrackId: "",
        trackTypeId: "",
        trackThemeId: "",
        controlTrackReturnVisitDisplay: false,
        trackTypeThemeModel:[],
        hasModel:false,
      },
    };
  },
  methods: {
    // 获取待追踪回访列表
    getstayReturnVisitList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { keyword, startDate, endDate, employeeId } = this.params;
      const { pageNum, pageSize } = this;
      const data = {
        keyword,
        startDate,
        endDate,
        employeeId,
        pageNum,
        pageSize,
      };
      api.getstayReturnVisitList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.waitTrack;
          this.data = list;
          this.totalCount = totalCount;
        }
      });
    },

    // 获取待追踪回访列表（分页）
    handlePageChange(pageNum) {
      const { keyword, startDate, endDate, employeeId } = this.params;
      const { pageSize } = this;
      const data = {
        keyword,
        startDate,
        endDate,
        employeeId,
        pageNum,
        pageSize,
      };
      api.getstayReturnVisitList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.waitTrack;
          this.data = list;
          this.totalCount = totalCount;
        }
      });
    },

    resetControlTrackReturnVisitDisplay() {
      this.trackReturnVisitComParams.controlTrackReturnVisitDisplay = false;
    },

    refreshParentComList() {
      this.getstayReturnVisitList();
    },
  },
  computed: {
    device() {
      return this.$store.state.callCenter.callableInfo.SelectedCallableID;
    },
  },
  watch: {
    device: {
      handler(device) {
        this.trackReturnVisitComParams.device = device;
      },
      immediate: true,
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
