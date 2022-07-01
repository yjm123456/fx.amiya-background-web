<template>
  <div>
    <Drawer
      title="追踪回访记录"
      v-model="controlModal"
      class-name="ivu-drawer-wrap"
      width="470px"
      @on-visible-change="handleVisibleChange"
    >
      <aplayer :music.sync="music" ref="aplayer" v-if="flag"></aplayer>
      <div @scroll="scrollEvent($event)" class="scroll_wrap" v-if="list.length">
        <Timeline>
          <TimelineItem v-for="(item,index) in list" color="green" :key="item.id">
            <div class="time">
              <span>主题： <span v-if="item.trackPlan">({{item.trackPlan}})</span> {{ item.trackTheme }}</span>
            </div>
            <div style="margin-left:5px">{{item.trackDate | formatDate}}</div>
            <div class="content" >
              <span>追踪工具：{{ item.trackToolName }}</span>
              <span style="margin-left:10px">追踪类型：{{ item.trackTypeName }}</span>
              <span 
                v-show="item.isConnect"
                style="margin-left:10px;color:#559DF9;font-size:18px"
                :class="item.play ? 'iconfont icon-zantingtingzhi' : 'iconfont icon-bofang'"
                @click="play(item,index)"
                ></span>
            </div>
            <p class="content">
              <span>是否下次回访：{{ item.isPlanTrack ? '是' : '否' }}</span>
              <span style="margin-left:10px" v-show="item.isPlanTrack">下次回访主题：{{ item.planTrackTheme }}</span>
            </p>
            <p class="content">
              <span>追踪人：{{ item.employeeName }}</span>
            </p>
            <p class="content_footer">{{ item.trackContent }}</p>
          </TimelineItem>
        </Timeline>
        <Divider v-show="nextPage === false">暂无更多数据</Divider>
      </div>
      <Divider v-else>暂无数据</Divider>
    </Drawer>
  </div>
</template>
<script>
import * as common from "@/api/common";
import { parseTime } from "@/utils/util.js";
import aplayer from "vue-aplayer";
import { callRecordBaseUrl } from "@/http/baseUrl";

export default {
  components:{
    aplayer
  },
  props: {
    controlTrackRetrunVisitRecordModal: Boolean,
    encryptPhone: String,
  },
  data() {
    return {
      controlModal: false,

      pageNum: 1,

      pageSize: 10,

      nextPage: true,

      isScrolling: false,

      list: [],

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
    getTrackRetrunVisitRecord(callback) {
      const data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        encryptPhone: this.encryptPhone,
      };
      common.byEncryptPhoneGetReturnVisitList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.trackRecord;
          // this.list = list
          this.pageNum++;
          callback && callback();
          this.matcCallRecord(list,() =>{
            if (this.list.length === totalCount) {
              this.nextPage = false;
            }
          })
        }
      });
    },

    // 触底加载
    scrollEvent(e) {
      const { scrollTop, offsetHeight, scrollHeight } = e.srcElement;
      if (scrollTop + offsetHeight === scrollHeight) {
        if (this.nextPage) {
          if (this.isScrolling === true) return;
          this.isScrolling = true;
          this.getTrackRetrunVisitRecord(() => {
            this.isScrolling = false;
          });
        }
      }
    },

    // 匹配通话录音
    matcCallRecord(list,callBack) {
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
          this.list = [...this.list,...list.map((item) => {
            return {
              ...item,
              play: false,
            };
          })]
          callBack && callBack()
        }
      })
    },
    
    // 播放
    play(params,index) {
      this.playParams = params;
      const url = `${callRecordBaseUrl}/callrecords/voiceDataById/${params.callRecordId}`;
      if(this.music.url !== url){
        this.music = {
          artist: " ",
          title: " ",
          url,
        }
        this.flag = true;
        this.list.map((item) => {
          if (item.callRecordId !== params.callRecordId) {
            item.play = false;
          }
        });
        if (this.list[index].play === false) {
          this.$nextTick(()=>{
            this.$refs.aplayer.play();
            this.list[index].play = true;
          })
        } 
      } else if(this.$refs.aplayer && this.music.url === url && this.list[index].play === true) {
        this.$refs.aplayer.pause();
        this.list[index].play = false;
      } else if(this.$refs.aplayer && this.music.url === url && this.list[index].play === false) {
        this.$refs.aplayer.play();
        this.list[index].play = true;
      }

      const self = this;
      this.$nextTick(()=>{
        // 播放完毕
        this.$refs.aplayer.audio.onended = function() {
          self.flag = false;
          const index = self.list.findIndex(item=> item.callRecordId === params.callRecordId);
          if(index !== -1) {
            self.list[index].play = false;
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
          const index = self.list.findIndex(item=> item.callRecordId === params.callRecordId);
          if(index !== -1) {
            self.list[index].play = false;
          }
          self.currentPlayState = false;
        };
        // 继续播放
        this.$refs.aplayer.audio.onplaying = function() {
          const index = self.list.findIndex(item=> item.callRecordId === params.callRecordId);
          if(index !== -1) {
            self.list[index].play = true;
          }
          self.currentPlayState = true;
        };
      })
    },

    handleVisibleChange(value) {
      if (!value) {
        this.pageNum = 1;
        this.nextPage = true;
        this.list = [];
        this.$emit("handleTrackRetrunVisitRecordModalChange");
      }
    },
  },
  watch: {
    controlTrackRetrunVisitRecordModal(controlTrackRetrunVisitRecordModal) {
      if (controlTrackRetrunVisitRecordModal) {
        this.controlModal = controlTrackRetrunVisitRecordModal;
        this.getTrackRetrunVisitRecord();
      }
    },
  },
  filters: {
    formatDate(time) {
      return parseTime(time, "{y}年{m}月{d} {h}:{i}");
    },
  },
};
</script>
<style lang="less" scoped>
/deep/ .ivu-drawer-wrap {
  z-index: 9999;
}
.time {
  font-size: 14px;
  font-weight: bold;
}
.content {
  padding-left: 5px;
  color: rgba(0, 0, 0, 0.45);
}
.content_footer {
  padding-left: 5px;
}
.scroll_wrap {
  height: 100%;
  overflow-y: auto;
}
</style>
