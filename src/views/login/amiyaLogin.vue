<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="getIp"></login-form>
          <p class="login-tip">啊美雅技术支持</p>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import loginForm from "./components/login-form";
import { amiyaEmployeeLogin, permission } from "./../../api/user";
import * as api from "@/api/customerAppointmentSchedule";
import multipleTicketsVue from '../financialStatementManage/amyAccountStatement/components/multipleTickets/multipleTickets.vue';
import axios from 'axios';

export default {
  components: {
    loginForm,
  },
  data() {
    return {
      // ip地址
      ip:'',
      // 主机名称
      hostName:''
    };
  },
  mounted(){
    // this.getIp()
  },
  methods: {
    // 读取操作系统
    getOperatingSystem() {
      const { userAgent } = navigator;
      // console.log(userAgent.indexOf("Win"))
      // console.log(userAgent.indexOf("Mac"))
      if (userAgent.indexOf("Win") !== -1) return "Windows";
      if (userAgent.indexOf("Mac") !== -1) return "MacOS";
      if (userAgent.indexOf("X11") !== -1) return "UNIX";
      if (userAgent.indexOf("Linux") !== -1) return "Linux";
      if (/Android/.test(userAgent)) return "Android";
      if (/like Mac OS X/.test(userAgent)) {
        const version = /CPU( iPhone)? OS ([0-9_]+) like Mac OS X/.exec(userAgent)
          .pop()
          .replace(/_/g, ".");
        return "iOS " + version;
      }
      return "Unknown";
    },
    getIp(value){
      sessionStorage.setItem("un",value.userName)
      sessionStorage.setItem("pd",value.password)
       // 判断是windows系统还是mac mac直接跳过插件丢失包验证
      if(this.getOperatingSystem() == 'Windows'){
        // 获取主机名 
        axios.get('http://localhost:5000/getMyComputerName').then(res=>{
            if(res.status == 200){
              const ip = res.data.split("\n",1);
              sessionStorage.setItem('hostName',ip[0])
              // 获取客户端IP 网络IP
              axios.get('https://myip.ipip.net/').then(res=>{
                  if(res.status == 200){
                    sessionStorage.setItem('ip',res.data)
                  }
              })
              setTimeout(()=>{
                this.handleSubmit()
              },2000)
              return
            }
            
        }).catch(error=>{
          this.$Message.warning('插件包丢失，登陆失败！')
        })
      }else{
        // mac只用获取IP地址
        // 获取客户端IP 网络IP
        axios.get('https://myip.ipip.net/').then(res=>{
          if(res.status == 200){
            sessionStorage.setItem('ip',res.data)
          }
        })
        setTimeout(()=>{
          this.handleSubmit()
        },2000)
      }
      
    },
    async handleSubmit() {
      
      // sessionStorage.setItem("un",userName)
      // sessionStorage.setItem("pd",password)
      const data = {
        password:  sessionStorage.getItem('pd'),
        userName: sessionStorage.getItem('un'),
        ip:sessionStorage.getItem("ip"),
        hostName:sessionStorage.getItem("hostName")
      };
      try {
        const amiyaEmployeeLoginRes = await amiyaEmployeeLogin(data);
        const {
          amiyaPositionId,
          amiyaPositionName,
          employeeId,
          employeeType,
          employeeName,
          token,
          refreshToken,
          isDirector,
          avatar,
          readDataCenter,
          isCustomerService
        } = amiyaEmployeeLoginRes.data.token;
        sessionStorage.setItem("positionId", amiyaPositionId);
        sessionStorage.setItem("positionName", amiyaPositionName);
        sessionStorage.setItem("employeeId", employeeId);
        sessionStorage.setItem("employeeType", employeeType);
        sessionStorage.setItem("employeeName", employeeName);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("refreshToken", refreshToken);
        sessionStorage.setItem("isDirector", isDirector);
        sessionStorage.setItem("avatar", avatar);
        sessionStorage.setItem("readDataCenter", readDataCenter);
        sessionStorage.setItem("isCustomerService", isCustomerService);
        // 权限
        const permissionRes = await permission();
        const {
          defaultPageRoutePage,
          routes,
          menus,
          permissions,
        } = permissionRes.data.permissions;
        // 默认跳转路径
        sessionStorage.setItem("defaultPageRoutePage", defaultPageRoutePage);
        // 路由表
        sessionStorage.setItem("routes", JSON.stringify(routes));
        // 菜单
        sessionStorage.setItem("menus", JSON.stringify(menus));
        // 按钮
        sessionStorage.setItem("permissions", JSON.stringify(permissions));
        // 判断是否是管理员 是管理员展示导出按钮 其他的不展示
        sessionStorage.setItem("amiyaPositionId", JSON.stringify(amiyaPositionId));
        // 动态添加路由表
        this.$store.dispatch("addRoutes", routes).then(() => {
          this.$router.push(defaultPageRoutePage);
          //  医院端登陆之后弹出
          if(sessionStorage.getItem("employeeType") == 'amiyaEmployee'){
            api.getMyUnReadCount().then((res) => {
                if(res.code === 0){
                  const {myUnReadNoticeMessage} = res.data
                  if(myUnReadNoticeMessage>0){
                    if(myUnReadNoticeMessage){
                      this.$Notice.info({
                          title: '动态未处理提示',
                          desc:'您当前有' +`<span style="color:red">${myUnReadNoticeMessage ? myUnReadNoticeMessage : 0}</span>` + '条' + '[' + "<span style='color:red'>动态数据未查看</span>" + ']' +'，请去系统管理-动态列表中查看！',
                          duration: 0,
                      });
                    }
                  }
                }
            })
          }
        });
        // 连接聊天
        this.$store.commit("chat/initWebsocket");
        // 连接电话
        this.$store.dispatch("callCenter/connect");
        this.$store.dispatch("callCenter/control", true);
      } catch (error) {}
    },
  },
};
</script>
<style lang="less" scoped>
@import "./login.less";
.login{
  background-image: url('../../assets/images/login_bg.jpg');
}
</style>
