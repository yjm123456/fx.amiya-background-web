<template>
  <div>
    <aplayer class="container" :music.sync="music" ref="aplayer" v-if="flag"></aplayer>
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
    <!-- 查看回访截图 -->
    <visitImg :visitParams="visitParams" :viewPicModel.sync="viewPicModel"/>
  </div>
</template>

<script>
import * as api from "@/api/customerManage";
import aplayer from "vue-aplayer";
import { callRecordBaseUrl } from "./../../../../http/baseUrl";
import visitImg from "@/components/visitImg/visitImg"
export default {
  components: {
    aplayer,
    visitImg
  },
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
          title: "回访时间",
          key: "trackDate",
          minWidth:180,
          align:'center',
          render: (h, params) => {
            return h(
              "div",
              this.$moment(params.row.trackDate).format("YYYY-MM-DD HH:mm:ss")
            );
          },
        },
        {
          title: "回访主题",
          key: "trackPlan",
          tooltip:true,
          minWidth:180,
          
        },
        {
          title: "客户类型",
          key: "trackTheme",
          minWidth:200,
          tooltip:true,
        },
        {
          title: "电话号",
          key: "phone",
          minWidth:150,
          align:'center',
        },
        
        {
          title: "回访内容",
          key: "trackContent",
          tooltip:true,
          minWidth:200,
        },
        {
          title: "回访目的",
          key: "trackTypeName",
          minWidth:180,
          align:'center',
        },
        {
          title: "回访工具",
          key: "trackToolName",
          minWidth:150,
          align:'center',
        },
        {
          title: "回访人",
          key: "employeeName",
          minWidth:180,
          align:'center',
        },
        {
          title: "是否有效",
          key: "valid",
          minWidth:120,
          align:'center',
          render: (h, params) => {
            if (params.row.valid == true) {
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
          minWidth:180,
          render: (h, params) => {
            if (params.row.isConnect) {
              return h("div", [
                h("Icon", {
                  props: {
                    custom:params.row.play === false ? "iconfont icon-bofang" : "iconfont icon-zantingtingzhi",
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
    // 获取已追踪回访记录
    getAlreadyReturnVisitList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { keyword, startDate, endDate, employeeId } = this.params;
      const { pageNum, pageSize } = this;
      const data = { 
        keyword, 
        startDate:this.$moment(new Date(startDate)).format("YYYY-MM-DD"),
        endDate:this.$moment(new Date(endDate)).format("YYYY-MM-DD"),
        employeeId, 
        pageNum, 
        pageSize 
      };
      api.getAlreadyReturnVisitList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.trackRecord;
          // this.matcCallRecord(list,totalCount)
          this.data = list
          this.totalCount = totalCount
        }
      });
    },  

    // 匹配通话录音
    matcCallRecord(list,totalCount,callBack) {
      const callRecordIds = list.map(item=> item.callRecordId);
      // 根据通话编号集合获取通话记录列表
      api.byIdGetCallRecords(callRecordIds).then(res=>{
        if(res.code === 0) {
          const {callRecord} = res.data;
          list.forEach(item=>{
            callRecord.forEach(i=>{
              if(item.callRecordId === i.id) {
                item.isConnect = true;
              }
            })
          })
          this.data = list.map((item) => {
            return {
              ...item,
              play: false,
            };
          });
          this.totalCount = totalCount;
          callBack && callBack()
        }
      })
    },

    // 获取已追踪回访记录（分页）
    handlePageChange(pageNum) {
      const { keyword, startDate, endDate, employeeId } = this.params;
      const { pageSize } = this;
      const data = { 
        keyword, 
        startDate:this.$moment(new Date(startDate)).format("YYYY-MM-DD"),
        endDate:this.$moment(new Date(endDate)).format("YYYY-MM-DD"),
        employeeId, 
        pageNum, 
        pageSize 
      };
      api.getAlreadyReturnVisitList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.trackRecord;
          this.data = list
          this.totalCount = totalCount
          // this.matcCallRecord(list,totalCount,()=>{
          //   if(this.$refs.aplayer) {
          //     const index = this.data.findIndex(item=> item.callRecordId === this.playParams.row.callRecordId);
          //     if(index !== -1) {
          //       this.data[index].play = this.currentPlayState;
          //     }
          //   }
          // })
        }
      });
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
        this.data.map((item) => {
          if (item.callRecordId !== row.callRecordId) {
            item.play = false;
          }
        });
        if (this.data[index].play === false) {
          this.$nextTick(()=>{
            this.$refs.aplayer.play();
            this.data[index].play = true;
          })
        } 
      } else if(this.$refs.aplayer && this.music.url === url && this.data[index].play === true) {
        this.$refs.aplayer.pause();
        this.data[index].play = false;
      } else if(this.$refs.aplayer && this.music.url === url && this.data[index].play === false) {
        this.$refs.aplayer.play();
        this.data[index].play = true;
      }

      const self = this;
      this.$nextTick(()=>{
        // 播放完毕
        this.$refs.aplayer.audio.onended = function() {
          self.flag = false;
          const index = self.data.findIndex(item=> item.callRecordId === row.callRecordId);
          if(index !== -1) {
            self.data[index].play = false;
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
          const index = self.data.findIndex(item=> item.callRecordId === row.callRecordId);
          if(index !== -1) {
            self.data[index].play = false;
          }
          self.currentPlayState = false;
        };
        // 继续播放
        this.$refs.aplayer.audio.onplaying = function() {
          const index = self.data.findIndex(item=> item.callRecordId === row.callRecordId);
          if(index !== -1) {
            self.data[index].play = true;
          }
          self.currentPlayState = true;
        };
      })
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
