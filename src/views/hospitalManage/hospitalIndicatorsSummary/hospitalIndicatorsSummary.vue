<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
         <Select
            v-model="query.indicatorId"
            placeholder="请选择指标名称"
            style="width: 200px; margin-left: 10px"
            filterable
          >
            <Option
              v-for="item in indicatorNameList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.hospitalId"
            placeholder="请选择医院"
            style="width: 200px; margin-left: 10px"
          >
            <Option
              v-for="item in hospitalInfo"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getHospitalInfo()"
            >查询</Button
          >
        </div>
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data"></Table>
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
    <!-- 查看详情 -->
    <fillInIndicators :controlModal.sync="controlModal" :indicatorsId="indicatorsId" :hospitalId="hospitalId" :detailTitle="detailTitle"></fillInIndicators>
  </div>
</template>
<script>
import * as api from "@/api/GreatHospitalOperationHealth";
import * as hospitalManage from "@/api/hospitalManage";
import fillInIndicators from "@/components/indicatorModule/fillInIndicators.vue";
export default {
    components:{
        fillInIndicators
    },
  data() {
    return {
      // 查询
      query: {
        indicatorId:sessionStorage.getItem('goodindicatorsId'),
        hospitalId:-1,
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "指标名称",
            key: "indicatorName",
          },
          {
            title: "医院",
            key: "hospitalName",
          },
          {
            title: "医院地址",
            key: "hospitalAddress",
          },
          {
            title: "是否提报",
            key: "isSubmit",
            align: "center",
            render: (h, params) => {
              if (params.row.isSubmit == true) {
                return h("Icon", {
                  props: {
                    type: "md-checkmark",
                  },
                  style: {
                    fontSize: "18px",
                    color: "#559DF9",
                  },
                });
              } else {
                return h("Icon", {
                  props: {
                    type: "md-close",
                  },
                  style: {
                    fontSize: "18px",
                    color: "red",
                  },
                });
              }
            },
          },
          {
            title: "操作",
            key: "",
            width: 150,
            align:'center',
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
                        const { indicatorId,hospitalId } = params.row;
                        this.controlModal = true
                        this.indicatorsId = indicatorId
                        this.hospitalId = hospitalId
                        this.detailTitle = '查看详情'
                      },
                    },
                  },
                  "查看详情"
                ),
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },

      // 控制 modal
      controlModal: false,
      indicatorsId:'',
      hospitalId:null,
      hospitalInfo:[{id:-1,name:'全部医院'}],
      indicatorNameList:[],
      detailTitle:''
    };
  },
  methods: {
    // 获取机构运营指标名称列表
    getHospitalOperationIndicatorNameList() {
      api.getHospitalOperationIndicatorNameList().then((res) => {
        if (res.code === 0) {
          const {indicatorNameList} = res.data
          this.indicatorNameList = indicatorNameList;
          sessionStorage.setItem('goodindicatorsId',indicatorNameList[0].id)
          
        }
      });
    },
    // 获取医院名称列表
    getHospitalInfonameList() {
      hospitalManage.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          this.hospitalInfo = [...this.hospitalInfo,...res.data.hospitalInfo];
        }
      });
    },
    // 获取指标汇总列表
    getHospitalInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,indicatorId,hospitalId} = this.query;
      const data = { 
        pageNum, 
        pageSize ,
        indicatorId,
        hospitalId:hospitalId == -1 ? null : hospitalId
        };
      api.HospitalOperationIndicatorCollect(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.hospitalOperationIndicatorCollectData;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取指标汇总列表分页
    handlePageChange(pageNum) {
        const {  pageSize ,indicatorId,hospitalId} = this.query;
        const data = { 
            pageNum, 
            pageSize ,
            indicatorId,
            hospitalId:hospitalId == -1 ? null : hospitalId 
        };
        api.HospitalOperationIndicatorCollect(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.hospitalOperationIndicatorCollectData;
            this.query.data = list;
            this.query.totalCount = totalCount;
            }
        });
    },
  },
  created() {
    this.getHospitalInfo();
    this.getHospitalOperationIndicatorNameList()
    this.getHospitalInfonameList()
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