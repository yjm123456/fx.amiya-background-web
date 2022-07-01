<!-- 回访记录 -->
<template>
  <div>
    <aplayer :music.sync="music" ref="aplayer" v-if="flag"></aplayer>
    <div class="returnVisitRecord">
      <Table
        border
        :columns="returnVisitRecord.columns"
        :data="returnVisitRecord.data"
      ></Table>
      <div class="page_wrap">
        <Page
          ref="pages"
          :current="returnVisitRecord.pageNum"
          :page-size="returnVisitRecord.pageSize"
          :total="returnVisitRecord.totalCount"
          show-total
          show-elevator
          @on-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import * as common from "@/api/common";
import aplayer from "vue-aplayer";
import { callRecordBaseUrl } from "./../../../http/baseUrl";
export default {
  components:{
    aplayer
  },
  data() {
    return {
      returnVisitRecord: {
        columns: [
          {
            title: "回访时间",
            key: "trackDate",
            width: 200,
            render: (h, params) => {
              return h("div",this.$moment(params.row.trackDate).format("YYYY-MM-DD HH:mm:ss"));
            },
          },
          {
            title: "回访计划",
            key: "trackPlan",
            width: 200,
          },
          {
            title: "回访主题",
            key: "trackTheme",
            width: 200,
          },
          {
            title: "回访内容",
            key: "trackContent",
            width: 200,
            tooltip:true
          },
          {
            title: "回访类型",
            key: "trackTypeName",
            width: 200,
          },
          {
            title: "回访工具",
            key: "trackToolName",
            width: 200,
          },
          {
            title: "回访人",
            key: "employeeName",
            width: 200,
          },
          {
            title: "是否有效",
            key: "valid",
            width: 200,
            render: (h, params) => {
              if (params.row.valid === true) {
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
            key: "play",
            align: "center",
            width:200,
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
        encryptPhone: "",
        pageNum: 1,
        pageSize: 8,
        totalCount: 0,
      },

      flag: false,

      music: {
        title: " ",
        artist: " ",
        url: ""
      },

      playParams:null,

      currentPlayState:null,
    };
  },
  methods: {
    // 根据加密电话文本获取回访记录列表
    byEncryptPhoneGetReturnVisitList(encryptPhone) {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      this.returnVisitRecord.encryptPhone = encryptPhone;
      const { pageNum, pageSize } = this.returnVisitRecord;
      const data = {
        encryptPhone,
        pageNum,
        pageSize,
      };
      common.byEncryptPhoneGetReturnVisitList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.trackRecord;
          this.matcCallRecord(list, totalCount)
        }
      });
    },

    // 根据加密电话文本获取回访记录列表（分页）
    handlePageChange(pageNum) {
      const { encryptPhone, pageSize } = this.returnVisitRecord;
      const data = { encryptPhone, pageNum, pageSize };
      common.byEncryptPhoneGetReturnVisitList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.trackRecord;
          this.matcCallRecord(list,totalCount,()=>{
            if(this.$refs.aplayer) {
              const index = this.returnVisitRecord.data.findIndex(item=> item.callRecordId === this.playParams.row.callRecordId);
              if(index !== -1) {
                this.returnVisitRecord.data[index].play = this.currentPlayState;
              }
            }
          })
        }
      });
    },

    // 匹配通话录音
    matcCallRecord(list,totalCount,callBack) {
      const callRecordIds = list.map(item=> item.callRecordId);
      // 根据通话编号集合获取通话记录列表
      common.byIdGetCallRecords(callRecordIds).then(res=>{
        if(res.code === 0) {
          const {callRecord} = res.data;
          list.forEach(item=>{
            callRecord.forEach(i=>{
              if(item.callRecordId === i.id) {
                item.isConnect = true;
              }
            })
          })
          this.returnVisitRecord.data = list.map((item) => {
            return {
              ...item,
              play: false,
            };
          });
          this.returnVisitRecord.totalCount = totalCount;
          callBack && callBack()
        }
      })
    },
    
    // 播放
    play(params) {
      this.playParams = params;
      const { row, index } = params;
      const url = `${callRecordBaseUrl}/callrecords/voiceDataById/${row.callRecordId}`;
      if(this.music.url !== url){
        this.music = {
          artist: " ",
          title: " ",
          url,
        }
        this.flag = true;
        this.returnVisitRecord.data.map((item) => {
          if (item.callRecordId !== row.callRecordId) {
            item.play = false;
          }
        });
        if (this.returnVisitRecord.data[index].play === false) {
          this.$nextTick(()=>{
            this.$refs.aplayer.play();
            this.returnVisitRecord.data[index].play = true;
          })
        } 
      } else if(this.$refs.aplayer && this.music.url === url && this.returnVisitRecord.data[index].play === true) {
        this.$refs.aplayer.pause();
        this.returnVisitRecord.data[index].play = false;
      } else if(this.$refs.aplayer && this.music.url === url && this.returnVisitRecord.data[index].play === false) {
        this.$refs.aplayer.play();
        this.returnVisitRecord.data[index].play = true;
      }

      const self = this;
      this.$nextTick(()=>{
        // 播放完毕
        this.$refs.aplayer.audio.onended = function() {
          self.flag = false;
          const index = self.returnVisitRecord.data.findIndex(item=> item.callRecordId === row.callRecordId);
          if(index !== -1) {
            self.returnVisitRecord.data[index].play = false;
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
          const index = self.returnVisitRecord.data.findIndex(item=> item.callRecordId === row.callRecordId);
          if(index !== -1) {
            self.returnVisitRecord.data[index].play = false;
          }
          self.currentPlayState = false;
        };
        // 继续播放
        this.$refs.aplayer.audio.onplaying = function() {
          const index = self.returnVisitRecord.data.findIndex(item=> item.callRecordId === row.callRecordId);
          if(index !== -1) {
            self.returnVisitRecord.data[index].play = true;
          }
          self.currentPlayState = true;
        };
      })
    },
  }
};
</script>
<style lang="less" scoped>
.returnVisitRecord {
  height: 500px;
  overflow: auto;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
