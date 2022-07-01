<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <Tabs v-model="mode">
            <TabPane label="医院" name="医院">
              <login-form @on-success-valid="handleSubmit"></login-form>
            </TabPane>
            <TabPane label="阿美雅" name="阿美雅">
              <login-form @on-success-valid="handleSubmit"></login-form>
            </TabPane>
          </Tabs>
          <p class="login-tip">阿美技术支持</p>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import store from "../../store/index";
import loginForm from "./components/login-form";
import {
  amiyaEmployeeLogin,
  hospitalEmployeeLogin,
  permission,
} from "./../../api/user";
export default {
  components: {
    loginForm,
  },
  data() {
    return { mode: "医院" };
  },
  methods: {
    async handleSubmit({ userName, password }) {
      const data = {
        password: password,
        userName: userName,
      };
      try {
        // 登录
        if (this.mode === "阿美雅") {
          const res = await amiyaEmployeeLogin(data);
          const {
            amiyaPositionId,
            amiyaPositionName,
            employeeId,
            employeeType,
            employeeName,
            token,
          } = res.data.token;
          sessionStorage.setItem("positionId", amiyaPositionId);
          sessionStorage.setItem("positionName", amiyaPositionName);
          sessionStorage.setItem("employeeId", employeeId);
          sessionStorage.setItem("employeeType", employeeType);
          sessionStorage.setItem("employeeName", employeeName);
          sessionStorage.setItem("token", token);
        }
        if (this.mode === "医院") {
          const res = await hospitalEmployeeLogin(data);
          const {
            employeeId,
            employeeName,
            hospitalId,
            employeeType,
            hospitalName,
            token,
          } = res.data.token;
          // console.log(res.data.token);
          sessionStorage.setItem("employeeId", employeeId);
          sessionStorage.setItem("employeeType", employeeType);
          sessionStorage.setItem("employeeName", employeeName);
          sessionStorage.setItem("token", token);
        }
        // 权限
        const res = await permission();
        const {
          defaultPageRoutePage,
          routes,
          menus,
          permissions,
        } = res.data.permissions;
        // 默认跳转路径
        sessionStorage.setItem("defaultPageRoutePage", defaultPageRoutePage);
        // 路由表
        sessionStorage.setItem("routes", JSON.stringify(routes));
        // 菜单
        sessionStorage.setItem("menus", JSON.stringify(menus));
        // 按钮
        sessionStorage.setItem("permissions", JSON.stringify(permissions));
        // 动态添加路由表
        store.dispatch("addRoutes", routes).then(() => {
          this.$router.push(defaultPageRoutePage);
        });
        // 连接聊天
        this.$store.commit("chat/initWebsocket");
        // 连接电话
        this.$store.dispatch("callCenter/connect");
        this.$store.dispatch("callCenter/control",true)
      } catch (error) {
        // console.log(error);
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "./login.less";
</style>
