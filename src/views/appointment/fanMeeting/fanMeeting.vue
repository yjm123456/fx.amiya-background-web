<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyWord"
            placeholder="请输入关键字"
            style="width: 200px; "
            @keyup.enter.native="getFansMeetingInfo()"
          />
          <DatePicker
            type="date"
            placeholder="开始时间"
            :value="query.startDate"
            v-model="query.startDate"
            style="width: 150px; margin-left: 10px"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束时间"
            :value="query.endDate"
            v-model="query.endDate"
            style="width: 150px; margin-left: 10px"
          ></DatePicker>
          <Select
            v-model="query.hospitalId"
            placeholder="请选择医院"
            filterable
            transfer
            style="width: 220px; margin-left: 10px"
            :disabled="employeeType == 'hospitalEmployee'"
          >
            <Option
              v-for="item in hospitalList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.valid"
            placeholder="请选择是否有效状态"
            filterable
            transfer
            style="width: 150px; margin-left: 10px"
            :disabled="employeeType == 'hospitalEmployee'"
          >
            <Option
              v-for="item in validList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getFansMeetingInfo()"
            >查询</Button
          >
        </div>
        <div class="right" v-if="employeeType == 'amiyaEmployee'">
          <Button type="primary" @click="fansMeetingModel = true" v-if="isDirector=='true'">添加</Button>
        </div>
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table border :columns="employeeType == 'amiyaEmployee' ? query.columns : query.columns2" :data="query.data"></Table>
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
    <!-- 添加/编辑 -->
    <fansMeetingCom
      :fansMeetingModel.sync="fansMeetingModel"
      :fansMeetingParams="fansMeetingParams"
      @getFansMeetingInfo="getFansMeetingInfo"
    />
    <!-- 详情 -->
    <detail 
      :detailModel.sync="detailModel" 
      :detailParams="detailParams"
    />
  </div>
</template>
<script>
import * as api from "@/api/fansMeeting";
import * as hospitalManage from "@/api/hospitalManage";
import fansMeetingCom from "./components/fansMeetingCom/fansMeetingCom.vue";
import detail from "./components/detail/detail.vue"

export default {
  components: {
    fansMeetingCom,
    detail
  },
  data() {
    return {
      validList:[{type:'true',name:'有效'},{type:'false',name:'过期'}],
      // 是否为 管理员
      isDirector:sessionStorage.getItem('isDirector'),
      employeeType:sessionStorage.getItem('employeeType'),
      // model
      fansMeetingModel: false,
      // 参数
      fansMeetingParams: {
        title: "添加",
        // 根据id获取参数
        byIdParams: {},
        // 医院
        hospitalInfo: [],
        // 见面会开始时间
        startDate:'',
        // 见面会结束时间
        endDate:'',
      },
      // 详情model
      detailModel:false,
      // 详情参数
      detailParams:{
        id:'',
        name:''
      },
      // dateTime: '',
      // 查询
      query: {
        valid:'true',
        keyWord: "",
        startDate: null,
        endDate: null,
        hospitalId:sessionStorage.getItem('employeeType') == 'hospitalEmployee' ? Number(sessionStorage.getItem('hospitalId')) : -1,
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "粉丝见面会名称",
            key: "name",
            minWidth: 200,
            align: "center",
          },
          {
            title: "见面会开始时间",
            key: "startDate",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.startDate
                  ? this.$moment(params.row.startDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          {
            title: "见面会结束时间",
            key: "endDate",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.endDate
                  ? this.$moment(params.row.endDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          {
            title: "医院",
            key: "hospitalName",
            minWidth: 200,
            align: "center",
          },

          {
            title: "操作",
            key: "",
            width: 190,
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
                        const { id ,name} = params.row;
                        this.detailModel = true;
                        this.detailParams.id = id
                        this.detailParams.startDate = this.$moment(params.row.startDate).format("YYYY-MM-DD")
                        this.detailParams.endDate = this.$moment(params.row.endDate).format("YYYY-MM-DD")
                        this.detailParams.name = name
                      },
                    },
                  },
                  "详情"
                ),
                sessionStorage.getItem('isDirector') == 'true' ? h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled:params.row.valid == false
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        this.fansMeetingParams.title = "编辑";
                        api.byIdFansMeeting(id).then((res) => {
                          if (res.code === 0) {
                            this.fansMeetingModel = true;
                            this.fansMeetingParams.byIdParams =
                              res.data.fansMeeting;
                          }
                        });
                      },
                    },
                  },
                  "修改"
                ):'',
                sessionStorage.getItem('isDirector') == 'true' ? h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small",
                      disabled:params.row.valid == false
                    },
                    on: {
                      click: () => {
                        
                        this.$Modal.confirm({
                          title: "过期提示",
                          content: "是否确认过期？",
                          onOk: () => {
                            const { id } = params.row;
                            api.deleteFansMeeting(id).then((res) => {
                              if (res.code === 0) {
                                this.getFansMeetingInfo();
                                this.$Message.success({
                                  content: "已操作成功",
                                  duration: 3,
                                });
                              }
                            });
                          },
                          onCancel: () => {},
                        });
                      },
                    },
                  },
                  "过期"
                ):'',
              ]);
            },
          },
        ],
        columns2: [
          {
            title: "粉丝见面会名称",
            key: "name",
            minWidth: 200,
            align: "center",
          },
          {
            title: "见面会开始时间",
            key: "startDate",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.startDate
                  ? this.$moment(params.row.startDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          {
            title: "见面会结束时间",
            key: "endDate",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.endDate
                  ? this.$moment(params.row.endDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          {
            title: "医院",
            key: "hospitalName",
            minWidth: 200,
            align: "center",
          },
          {
            title: "操作",
            key: "",
            width: 120,
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
                        const { id,name } = params.row;
                        this.detailModel = true;
                        this.detailParams.id = id
                        this.detailParams.name = name
                      },
                    },
                  },
                  "详情"
                ),
                
              ]);
            },
          },

        ],
        data: [],
        totalCount: 0,
      },
      //   医院
      hospitalList: [{ name: "全部医院", id: -1 }],
    };
  },
  methods: {
    // 获取医院名称列表
    getHospitalInfonameList() {
      hospitalManage.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          const { hospitalInfo } = res.data;
          this.fansMeetingParams.hospitalInfo = hospitalInfo;
          this.hospitalList = [...this.hospitalList, ...hospitalInfo];
        }
      });
    },
    // 获取粉丝见面会列表
    getFansMeetingInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        keyWord,
        startDate,
        endDate,
        hospitalId,
        valid
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        hospitalId:hospitalId == -1 ? null : hospitalId,
        valid
      };
      api.getFansMeeting(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.fansMeeting;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取粉丝见面会列表分页
    handlePageChange(pageNum) {
      const { pageSize, keyWord, startDate, endDate, hospitalId,valid } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        hospitalId:hospitalId == -1 ? null : hospitalId,
        valid
      };
      api.getFansMeeting(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.fansMeeting;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
  },
  created() {
    this.getFansMeetingInfo();
    this.getHospitalInfonameList();
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
