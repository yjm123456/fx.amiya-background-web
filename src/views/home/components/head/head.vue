<template>
  <div>
    
    <Header class="header">
      <div class="left">
        <collapsedSider
          class="collapsedSider"
          :isCollapsed="isCollapsed"
          @toggleCollapse="toggleCollapse"
        ></collapsedSider>
      </div>
      <div class="right">
        <!-- 通知 -->
        <div class="notice" @click="noticeClick" v-if="isShow==true">
          <i class="iconfont icon-tongzhi tongzhi"  ></i>
          <div class="circle_con" v-if="myUnReadNoticeMessage > 0">
            <div class="circle" v-if="myUnReadNoticeMessage < 99">{{myUnReadNoticeMessage}}</div>
            <div class="circle2" v-else>99+</div>
          </div>
        </div>

        <news class="news"></news>
        <loginInfo class="loginInfo"></loginInfo>
        <user class="user"></user>
      </div>
    </Header>
  </div>
</template>
<script>
import * as api from "@/api/customerAppointmentSchedule";

import collapsedSider from "./components/collapsedSider/collapsedSider";
import news from "./components/news/news";
import loginInfo from "./components/loginInfo/loginInfo";
import user from "./components/user/user";
export default {
  props: ["isCollapsed"],
  components: {
    collapsedSider,
    news,
    loginInfo,
    user,
  },
  data(){
    return{
      myUnReadNoticeMessage:this.$store.state.message.myUnReadNoticeMessage,
       isShow:false,
       employeeType:sessionStorage.getItem('employeeType'),
       token:sessionStorage.getItem("token")
    }
  },
  methods: {
    toggleCollapse() {
      this.$emit("toggleCollapse");
      this.$forceUpdate();
    },
    noticeClick(){
      this.$router.push("/trends");
    },
    getMyUnReadCount(){
      // // 医院端不调用接口
      // if(this.employeeType == 'amiyaEmployee'){
      //   api.getMyUnReadCount().then((res) => {
      //       if(res.code === 0){
      //         const {myUnReadNoticeMessage} = res.data
      //         this.myUnReadNoticeMessage = myUnReadNoticeMessage
      //       }
      //   })
      // }
      this.$store.dispatch("message/getMessage")
    },
    // 获取动态权限(根据动态菜单权限判断是否显示小铃铛)
    getMenu(){
      let menus = sessionStorage.getItem("menus") ? JSON.parse(sessionStorage.getItem("menus")) : []
      menus.map(item=>{
        if(item.name == "systemSettingsManage"){
          item.subMenus.map(item2=>{
            // 线上id 133  测试145 （动态菜单id）
            if(item2.moduleId == 133){
              this.isShow = true
              return
            }
          })
        }
      })
    }
    
  },
  mounted(){
    this.getMyUnReadCount()
  },
  created(){
    if(this.token){
      this.getMenu()
      // 五分钟刷新一次接口
      setInterval(()=>{
          this.getMyUnReadCount()
      },300000)
    }
    
  },
  watch:{
    '$store.state.message.myUnReadNoticeMessage':{
      handler(value) {
        this.myUnReadNoticeMessage = value;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  padding-left: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  line-height: normal;
  .right {
    display: flex;
    align-items: center;
    .news,.loginInfo {
      margin-right: 20px;
    }
    .notice{
      position: relative;
      margin-right: 20px;
    }
    .tongzhi{
      margin-right: 10px;
      font-size: 30px;
      color: #2d8cf0;
    }
    .circle_con{
      position: absolute;
      top: 0px;
      right: 5px;
    }
    .circle{
      width: 18px;
      height: 18px;
      line-height: 18px;
      background: red;
      border-radius: 50%;
      color: #fff;
      text-align: center;
    }
    .circle2{
      width: 20px;
      height: 20px;
      line-height: 20px;
      background: red;
      border-radius: 50%;
      color: #fff;
      text-align: center;
      font-size: 12px;
    }
  }
}
</style>
