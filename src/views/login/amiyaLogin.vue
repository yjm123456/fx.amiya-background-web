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
import { amiyaEmployeeLogin, permission } from "./../../api/user";
export default {
  components: {
    loginForm,
  },
  data() {
    return {};
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
        const amiyaEmployeeLoginRes = await amiyaEmployeeLogin(data);
        const {
          amiyaPositionId,
          amiyaPositionName,
          employeeId,
          employeeType,
          employeeName,
          token,
          refreshToken
        } = amiyaEmployeeLoginRes.data.token;
        sessionStorage.setItem("positionId", amiyaPositionId);
        sessionStorage.setItem("positionName", amiyaPositionName);
        sessionStorage.setItem("employeeId", employeeId);
        sessionStorage.setItem("employeeType", employeeType);
        sessionStorage.setItem("employeeName", employeeName);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("refreshToken", refreshToken);
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
