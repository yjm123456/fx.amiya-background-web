<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">啊美雅技术支持</p>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import loginForm from "./components/login-form";
import * as api from "@/api/appointment";
import { hospitalEmployeeLogin, permission } from "./../../api/user";
export default {
  components: {
    loginForm,
  },
  data() {
    return {
      
    };
  },
  methods: {
    async handleSubmit({ userName, password }) {
      sessionStorage.setItem("un",userName)
      sessionStorage.setItem("pd",password)
      const data = {
        password: password,
        userName: userName,
      };
      try {
        const hospitalEmployeeLoginRes = await hospitalEmployeeLogin(data);
        const {
          hospitalPositionId,
          hospitalPositionName,
          employeeId,
          employeeType,
          employeeName,
          token,
          refreshToken,
          hospitalName,
          hospitalId
        } = hospitalEmployeeLoginRes.data.token;
        sessionStorage.setItem("positionId", hospitalPositionId);
        sessionStorage.setItem("positionName", hospitalPositionName);
        sessionStorage.setItem("employeeId", employeeId);
        sessionStorage.setItem("employeeType", employeeType);
        sessionStorage.setItem("employeeName", employeeName);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("refreshToken", refreshToken);
        sessionStorage.setItem("hospitalName", hospitalName);
        sessionStorage.setItem("hospitalId", hospitalId);

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
        // 动态添加路由表
        this.$store.dispatch("addRoutes", routes).then(() => {
          this.$router.push(defaultPageRoutePage);
          //  医院端登陆之后弹出
          if(sessionStorage.getItem("employeeType") == 'hospitalEmployee'){
            // console.log(sessionStorage.getItem("NotRepeatedSendOrder"))
            api.getNotRepeatedSendOrder().then((res) => {
                if(res.code === 0){
                  const {NotRepeatedSendOrder} = res.data
                  if(NotRepeatedSendOrder){
                    this.$Notice.info({
                        title: '派单未处理提示',
                        desc:'你当前有' +`<span style="color:red">${NotRepeatedSendOrder ? NotRepeatedSendOrder : 0}</span>` + '条' + '[' + "<span style='color:red'>已派单</span>" + ']' +'数据未处理，请去订单管理-医院派单列表中的内容平台列表处理',
                        duration: 0,
                    });
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
  created(){
   
  }
};
</script>
<style lang="less" scoped>
@import "./login.less";
.login{
  background-image: url('../../assets/images/hospitalLogin_bg.jpg');
}
</style>
