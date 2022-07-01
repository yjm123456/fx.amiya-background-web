<template>
  <div>
    <Card :dis-hover="true">
      <div>
        <Select
          v-model="query.employeeId"
          style="width: 200px;margin-right: 10px"
          v-has="{ role: ['fx.amiya.permission.LIST_BY_CUSTOMER_SERVICE'] }"
          placeholder="请选择客服"
        >
          <Option
            v-for="item in query.employee"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
          >
        </Select>
        <DatePicker
          type="date"
          placeholder="开始日期"
          style="width: 200px;"
          :value="query.startDate"
          v-model="query.startDate"
        ></DatePicker>
        <DatePicker
          type="date"
          placeholder="结束日期"
          style="width: 200px; margin-left: 10px"
          :value="query.endDate"
          v-model="query.endDate"
        ></DatePicker>
        <Button
          type="primary"
          style="margin-left: 10px"
          @click="byEmployeeIdGetCallRecords()"
          >查询</Button
        >
      </div>
    </Card>

    <aplayer class="container" :music.sync="music" ref="aplayer" v-if="flag"></aplayer>

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
  </div>
</template>

<script>
import * as api from "@/api/customerManage";
import aplayer from "vue-aplayer";
import { callRecordBaseUrl } from "./../../../http/baseUrl";
export default {
  components: {
    aplayer,
  },
  data() {
    return {
      flag: false,

      music: {
        title: " ",
        artist: " ",
        url: ""
      },

      params:null,

      currentPlayState:null,

      // 客户列表
      query: {
        columns: [
          {
            title: "员工姓名",
            key: "employeeName",
          },
          {
            title: "拨打时间",
            key: "date",
            render: (h, params) => {
              return h("div",this.$moment(params.row.date).format("YYYY-MM-DD HH:mm:ss"));
            },
          },
          {
            title: "通话时长",
            key: "voiceTime",
          },
          {
            title: "电话",
            key: "callNumber",
          },
          {
            title: "操作",
            key: "play",
            align: "center",
            render: (h, params) => {
              if (params.row.isConnect) {
                return h("div", [
                  h("Icon", {
                    props: {
                      custom:
                        params.row.play === false
                          ? "iconfont icon-bofang"
                          : "iconfont icon-zantingtingzhi",
                    },
                    style: {
                      fontSize: "18px",
                      color: "#559DF9",
                    },
                    on: {
                      click: () => {
                        this.play(params);
                      },
                    },
                  }),
                ]);
              } else {
                return h("div", "没有录音文件");
              }
            },
          },
        ],
        data: [],
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        employee: [{ name: "全部", id: "all" }],
        employeeId: null,
        startDate: new Date(),
        endDate: new Date(),
      }
    };
  },
  methods: {
    // 播放
    play(params) {
      this.params = params;
      const { row, index } = params;
      const url = `${callRecordBaseUrl}/callrecords/voiceDataById/${row.id}`;
      if(this.music.url !== url){
        this.music = {
          artist: " ",
          title: " ",
          url,
        }
        this.flag = true;
        this.query.data.map((item) => {
          if (item.id !== row.id) {
            item.play = false;
          }
        });
        if (this.query.data[index].play === false) {
          this.$nextTick(()=>{
            this.$refs.aplayer.play();
            this.query.data[index].play = true;
          })
        } 
      } else if(this.$refs.aplayer && this.music.url === url && this.query.data[index].play === true) {
        this.$refs.aplayer.pause();
        this.query.data[index].play = false;
      } else if(this.$refs.aplayer && this.music.url === url && this.query.data[index].play === false) {
        this.$refs.aplayer.play();
        this.query.data[index].play = true;
      }

      const self = this;
      this.$nextTick(()=>{
        // 播放完毕
        this.$refs.aplayer.audio.onended = function() {
          self.flag = false;
          const index = self.query.data.findIndex(item=> item.id === row.id);
          if(index !== -1) {
            self.query.data[index].play = false;
          }
          self.currentPlayState = false;
          self.$Message.success("播放完毕");
          self.music = {
            artist: " ",
            title: " ",
            url:"",
          }
        };
        // 暂停
        this.$refs.aplayer.audio.onpause = function() {
          const index = self.query.data.findIndex(item=> item.id === row.id);
          if(index !== -1) {
            self.query.data[index].play = false;
          }
          self.currentPlayState = false;
        };
        // 继续播放
        this.$refs.aplayer.audio.onplaying = function() {
          const index = self.query.data.findIndex(item=> item.id === row.id);
          if(index !== -1) {
            self.query.data[index].play = true;
          }
          self.currentPlayState = true;
        };
      })
    },

    // 获取客服列表
    getCustomerServiceList() {
      api.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.query.employee = [...this.query.employee, ...employee];
        }
      });
    },

    // 根据员工编号获取电话记录
    byEmployeeIdGetCallRecords() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize, startDate, endDate, employeeId } = this.query;
      const data = {
        pageNum,
        pageSize,
        startDate: this.$moment(startDate).format("YYYY-MM-DD"),
        endDate: this.$moment(endDate).format("YYYY-MM-DD"),
        employeeId: employeeId === "all" ? null : employeeId,
      };
      api.byEmployeeIdGetCallRecords(data).then((res) => {
        if (res.code === 0) {
          const { records, total } = res.data.callRecords;
          this.query.data = records.map((item) => {
            return {
              ...item,
              play: false,
            };
          });
          this.query.totalCount = total;
        }
      });
    },

    // 根据员工编号获取电话记录分页
    handlePageChange(pageNum) {
      const { pageSize, startDate, endDate, employeeId } = this.query;
      const data = {
        pageNum,
        pageSize,
        startDate: this.$moment(startDate).format("YYYY-MM-DD"),
        endDate: this.$moment(endDate).format("YYYY-MM-DD"),
        employeeId: employeeId === "all" ? null : employeeId,
      };
      api.byEmployeeIdGetCallRecords(data).then((res) => {
        if (res.code === 0) {
          const { records, total } = res.data.callRecords;
          this.query.data = records.map((item) => {
            return {
              ...item,
              play: false,
            };
          });
          if(this.$refs.aplayer) {
            const index = this.query.data.findIndex(item=> item.id === this.params.row.id);
            if(index !== -1) {
              this.query.data[index].play = this.currentPlayState;
            }
          }
          this.query.totalCount = total;
        }
      });
    },
  },
  created() {
    this.getCustomerServiceList();
    this.byEmployeeIdGetCallRecords();
  },
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 16px;
}

.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
