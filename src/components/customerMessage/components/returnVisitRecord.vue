<!-- 回访记录 -->
<template>
  <div>
    <aplayer :music.sync="music" ref="aplayer" v-if="flag"></aplayer>
    <div class="returnVisitRecord">
      <Table
        border
        :columns="returnVisitRecord.columns"
        :data="returnVisitRecord.data"
        height="185"
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
       <!-- 查看回访截图 -->
    <visitImg :visitParams="visitParams" :viewPicModel.sync="viewPicModel"/>
    </div>
  </div>
</template>

<script>
import * as common from "@/api/common";
import aplayer from "vue-aplayer";
import { callRecordBaseUrl } from "./../../../http/baseUrl";
import visitImg from "@/components/visitImg/visitImg"

export default {
  components:{
    aplayer,
    visitImg
  },
  data() {
    return {
      returnVisitRecord: {
        columns: [
          {
            title: "回访时间",
            key: "trackDate",
            minWidth: 200,
            render: (h, params) => {
              return h("div",this.$moment(params.row.trackDate).format("YYYY-MM-DD HH:mm:ss"));
            },
          },
          {
            title: "回访计划",
            key: "trackPlan",
            minWidth: 200,
          },
          {
            title: "回访主题",
            key: "trackTheme",
            minWidth: 200,
          },
          {
            title: "回访内容",
            key: "trackContent",
            minWidth: 200,
            tooltip:true
          },
          {
            title: "回访类型",
            key: "trackTypeName",
            minWidth: 200,
          },
          {
            title: "回访工具",
            key: "trackToolName",
            minWidth: 200,
          },
          {
            title: "回访人",
            key: "employeeName",
            minWidth: 200,
          },
          {
            title: "是否有效",
            key: "valid",
            minWidth: 200,
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
            title: "录音文件",
            key: "play",
            align: "center",
            minWidth: 200,
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
          {
            title: "操作",
            align: "center",
            minWidth: 140,
            fixed: "right",
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
                        const { trackPicture1,trackPicture2,trackPicture3 } = params.row;
                        this.visitParams.trackPicture1 = trackPicture1;
                        this.visitParams.trackPicture2 = trackPicture2;
                        this.visitParams.trackPicture3 = trackPicture3;
                        this.viewPicModel = true
                        
                      },
                    },
                  },
                  "查看回访截图"
                ),
              ])
            }
          },
        ],
        data: [],
        encryptPhone: "",
        pageNum: 1,
        pageSize: 3,
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
      // 回访截图
      visitParams:{
        trackPicture1:'',
        trackPicture2:'',
        trackPicture3:'',
      },
      // 回访截图model
      viewPicModel:false
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
          // this.matcCallRecord(list, totalCount)
          this.returnVisitRecord.data = list;
          this.returnVisitRecord.totalCount = totalCount;
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
          this.returnVisitRecord.data = list;
          this.returnVisitRecord.totalCount = totalCount;
          // this.matcCallRecord(list,totalCount,()=>{
          //   if(this.$refs.aplayer) {
          //     const index = this.returnVisitRecord.data.findIndex(item=> item.callRecordId === this.playParams.row.callRecordId);
          //     if(index !== -1) {
          //       this.returnVisitRecord.data[index].play = this.currentPlayState;
          //     }
          //   }
          // })
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
  height: 240px;
  overflow: auto;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
