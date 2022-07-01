<template>
  <div class="wrapper" ref="wrapper" :style="styleObj" v-drag>
    <!-- 电话图标 -->
    <div class="controlDevice" ref="controlDevice" @dblclick="handleControlDevice" >
      <i class="iconfont" :class="[isConnected ? nowDeviceState === 4 ? 'icon-ziyuan' : nowDeviceState === 3 ? 'icon-bochu' : 'icon-dianhua1' : 'icon-guanbidianhua']"></i>
    </div>
    <!-- 设备信息 -->
    <div class="deviceWrapper" ref="deviceWrapper" v-show="controlDevice" :style="{'width': nowDeviceState === 1 ? '360px':'548px','height':nowDeviceState === 1 ? '66px':'204px'}">
      <div class="close" @click="close">
        <i class="iconfont icon-x"></i>
      </div>
      <Card>
        <div class="default" :style="{'padding-bottom': nowDeviceState === 1 ? '':'10px'}">
          <span
            ><Select
              v-model="device"
              @on-change="switchDevice"
              style="width:200px"
              placeholder="设备列表"
              :disabled="nowDeviceState !== 1"
            >
              <Option
                v-for="item in callableList"
                :value="item.ID"
                :key="item.ID"
                >{{ item.Name }}</Option
              >
            </Select>
          </span>
          <span><Button type="primary" @click="setDefaultCallable">设为默认设备</Button></span>
        </div>
        <div class="callCenterList">
          <template v-for="(item, index) in callableList">
            <Card class="card" :key="index" v-if="item.Session">
              <div class="title">
                <span>设备名称：</span><span>{{ item.Name }}</span>
              </div>
              <div class="info">
                <div>
                  <p>
                    <span>设备状态</span><span>{{ item.Session.stateName }}</span>
                  </p>
                  <p>
                    <span>通话类型</span><span>{{item.Session.SessionType === 0 ? "拨入" : "播出"}}</span>
                  </p>
                  <p>
                    <span>连接状态</span><span>{{item.Session.IsConnected ? "已连接" : "未连接"}}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span>使用人</span><span>{{item.Session.UserInfo ? item.Session.UserInfo.EmployeeName : ""}}</span>
                  </p>
                  <p>
                    <span>电话号码</span><span>{{ item.Session.PhoneNumber }}</span>
                  </p>
                  <p><span>通话时长</span><span></span></p>
                </div>
                <div>
                  <div @click="answer(item.ID,item.Session.PhoneNumber)" v-show="item.Session.SessionType === 0 && item.Session.SessionType !== 5">
                    <span class="iconfont icon-weibiaoti-"></span>
                  </div>
                  <div @click="reject(item.ID,item.Session.PhoneNumber)">
                    <span class="iconfont icon-guaduandianhua"></span>
                  </div>
                </div>
              </div>
            </Card>
          </template>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      controlDevice: false,

      styleObj:{
        width:null,
        height:null
      }
    };
  },
  directives: {
    drag: {
      inserted: function(el, binding) {
        el.onmousedown = function(e) {
          e.stopPropagation();
          let disx = e.clientX  - el.offsetLeft;
          let disy = e.clientY  - el.offsetTop;
          document.onmousemove = function(e) {
            e.preventDefault();
            let left  = e.clientX  - disx;
            let top = e.clientY  - disy;

            if ( left < 0 ) {  
              left = 0;
            } else if ( left > document.documentElement.clientWidth - el.offsetWidth ) { 
              left = document.documentElement.clientWidth - el.offsetWidth;
            }
            
            if ( top < 0 ) { 
              top = 0;
            } else if ( top > document.documentElement.clientHeight - el.offsetHeight ) {
              top = document.documentElement.clientHeight - el.offsetHeight;
            }
            el.style.left = left + "px";
            el.style.top = top + "px";
          };
          document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
          };
        };
      },
    },
  },
  computed: {
    // 设备列表
    callableList() {
      return this.$store.state.callCenter.callableInfo.CallableList;
    },

    // 当前设备
    device: {
      get() {
        return this.$store.state.callCenter.callableInfo.SelectedCallableID;
      },
      set(value) {
        this.$store.dispatch("setNowSelectedCallableID", value);
      },
    },

    // 监听设备状态
    /** 
     * CallState值含义
      Unknown=0         //未知
      Free=1,           //空闲
      Callout=2,        //拨号
      Ringing=3,        //响铃
      CallIn=4,         //来电
      Talking=5,        //通话接通
      End =6,           //通话结束
      CallNotAnswer=7   //无人接听
      Hangup=8          //挂断电话
      Busy=9            //忙
      OffHook=10        //提机
      OnHook=11         //挂机
      SelfOnHook=12     //主动挂断电话
    */
    // 当前设备状态
    nowDeviceState() {
      let sessionState = 1;
      if (this.$store.state.callCenter.callableInfo.CallableList) {
        this.$store.state.callCenter.callableInfo.CallableList.forEach((item) => {
          if (item.Session) {
            sessionState = item.Session.SessionState;
          }
        });
      }
      return sessionState;
    },

    // 已连接
    isConnected() {
      return this.$store.state.callCenter.isConnected;
    }
  },
  methods: {
    // 切换设备
    switchDevice(callableId) {
      this.$store.dispatch("callCenter/changeSelectedCallable", {
        CallableID: callableId,
      });
    },

    // 接听
    answer(callableId,PhoneNumber) {
      this.$store.dispatch("callCenter/answer", {
        CallableID: callableId,
        PhoneNumber
      });
    },

    //拒接
    reject(callableId,PhoneNumber) {
      this.$store.dispatch("callCenter/reject", {
        CallableID: callableId,
        PhoneNumber
      });
    },

    // 设置默认设备
    setDefaultCallable() {
      this.$store.dispatch("callCenter/setDefaultCallable");
    },

    handleControlDevice() {
      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
      if (!this.isConnected) return;
      this.controlDevice = !this.controlDevice;
    },

    close() {
      this.controlDevice = false;
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.styleObj.width = `${this.$refs.controlDevice.offsetWidth}px`
      this.styleObj.height = `${this.$refs.controlDevice.offsetHeight}px`
    })
  },

  watch:{
    nowDeviceState: {
      handler(nowDeviceState) {
        if(this.controlDevice) {
          this.$nextTick(()=>{
            this.styleObj.width = `${this.$refs.deviceWrapper.offsetWidth}px`
            this.styleObj.height = `${this.$refs.deviceWrapper.offsetHeight+this.$refs.controlDevice.offsetHeight+20}px`
            this.$nextTick(()=>{
              // 屏幕可视宽度
              const clientWidth = document.documentElement.clientWidth;
              // 拖拽元素距离左侧的距离
              const elOffsetLeft = this.$refs.wrapper.offsetLeft;
              // 屏幕宽度 - div 距离左侧距离 = 屏幕还剩多少宽
              // 如果这个宽 < div的宽
              // 就让div的left = 屏幕的宽 - div距离左侧的宽
              if(clientWidth - elOffsetLeft < this.$refs.wrapper.offsetWidth) {
                this.$refs.wrapper.style.left = clientWidth - this.$refs.wrapper.offsetWidth + "px";
              }

              const clientHeight = document.documentElement.clientHeight;
              const elOffsetTop = this.$refs.wrapper.offsetTop;
              if(clientHeight - elOffsetTop < this.$refs.wrapper.offsetHeight) {
                this.$refs.wrapper.style.top = clientHeight - this.$refs.wrapper.offsetHeight + "px";
              }
            })
          })
        }
      },
      immediate: true,
    },
    controlDevice(controlDevice){
      if(controlDevice) {
        this.$nextTick(()=>{
          this.styleObj.width = `${this.$refs.deviceWrapper.offsetWidth}px`
          this.styleObj.height = `${this.$refs.deviceWrapper.offsetHeight+this.$refs.controlDevice.offsetHeight+20}px`
          this.$nextTick(()=>{
            // 屏幕可视宽度
            const clientWidth = document.documentElement.clientWidth;
            // 拖拽元素距离左侧的距离
            const elOffsetLeft = this.$refs.wrapper.offsetLeft;
            // 屏幕宽度 - div 距离左侧距离 = 屏幕还剩多少宽
            // 如果这个宽 < div的宽
            // 就让div的left = 屏幕的宽 - div距离左侧的宽
            if(clientWidth - elOffsetLeft < this.$refs.wrapper.offsetWidth) {
              this.$refs.wrapper.style.left = clientWidth - this.$refs.wrapper.offsetWidth + "px";
            }

            const clientHeight = document.documentElement.clientHeight;
            const elOffsetTop = this.$refs.wrapper.offsetTop;
            if(clientHeight - elOffsetTop < this.$refs.wrapper.offsetHeight) {
              this.$refs.wrapper.style.top = clientHeight - this.$refs.wrapper.offsetHeight + "px";
            }
          })
        })
      } else {
        this.$nextTick(()=>{
          this.styleObj.width = `${this.$refs.controlDevice.offsetWidth}px`
          this.styleObj.height = `${this.$refs.controlDevice.offsetHeight}px`
        })
      }
    },
    // 监听状态,关闭来电提示
    nowDeviceState(value) {
      if(value === 1) {
        this.$Notice.destroy()
      }
    }
  }
};
</script>

<style scoped lang="less">
.wrapper{
  position: fixed;
  right: 100px;
  bottom: 50%;
  z-index: 9999;
}
// 电话图标
.controlDevice {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #000;
  opacity: 0.6;
  border-radius: 50%;
  i {
    font-size: 40px;
  }
  .icon-ziyuan:before {
    color: red;
  }
  .icon-dianhua1:before {
    color: rgb(85, 157, 249);
  }
  .icon-guanbidianhua:before {
    color: red;
  }
  .icon-bochu:before {
    color: rgb(85, 157, 249);
  }
}
// 设备信息
.deviceWrapper {
  position: relative;
  color: #fff;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  margin-top: 20px;
  .close {
    right: 3px;
    position: absolute;
    z-index: 9998;
    i{
      font-size: 10px;
    }
  }
  /deep/.ivu-card-bordered{
    background: #000!important;
    opacity: 0.6;
  }
  .default {
    > span:first-child {
      padding-right: 10px;
    }
  }
  .callCenterList {
    .title {
      padding-bottom: 10px;
    }
    .info {
      display: flex;
      width: 480px;
      > div {
        flex: 1;
        span:first-child {
          margin-right: 10px;
        }
      }
      > div:last-child {
        display: flex;
        > div {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          > span {
            font-size: 40px;
          }
        }
        > div:first-child {
          color: green;
        }
        > div:last-child {
          color: red;
        }
      }
    }
  }
}
</style>
