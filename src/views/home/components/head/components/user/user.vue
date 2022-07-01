<template>
  <div class="wrapper">
    <div>
      <Dropdown @on-click="handleClick">
        <div class="title">
          <Avatar icon="ios-person" size="default">下拉菜单</Avatar>
          <span class="ivu-icon ivu-icon-md-arrow-dropdown"></span>
        </div>
        <DropdownMenu slot="list" class="dropdownMenu">
          <DropdownItem name="hospitalInformation" v-if="this.employeeType === 'hospitalEmployee'">医院资料</DropdownItem>
          <DropdownItem name="logout">退出登录</DropdownItem>
          <DropdownItem name="editPassword">修改密码</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div>
      <editPassword
        :controlEditPasswordModal="controlEditPasswordModal"
        :isColse="isColse"
        @handleEditPasswordModalChange="controlEditPasswordModal = false"
      ></editPassword>
    </div>
    <div>
      <hospitalInformation
        :controlHospitalInformationModel="controlHospitalInformationModel"
        @handleEditHospitalInfoModalChange="controlHospitalInformationModel = false"
      ></hospitalInformation>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import editPassword from "@/components/editPassword/editPassword";
import hospitalInformation from "@/components/hospitalInformation/hospitalInformation"
import * as user from "@/api/user";
export default {
  components: {
    editPassword,
    hospitalInformation
  },
  data() {
    return {
      isColse:true,

      controlEditPasswordModal: false,

      controlHospitalInformationModel : false,

      userName: sessionStorage.getItem("un"),

      positionName: sessionStorage.getItem("positionName"),

      employeeName: sessionStorage.getItem("employeeName"),

      employeeType: sessionStorage.getItem("employeeType"),
    };
  },
  methods: {
    ...mapActions(["clearTag"]),

    logout() {
      if (this.employeeType === "amiyaEmployee") {
        this.$router.push("/amiyaLogin");
      }
      if (this.employeeType === "hospitalEmployee") {
        this.$router.push("/hospitalLogin");
      }
      sessionStorage.clear();
      // 关闭聊天
      this.$store.commit("chat/closeWebSocket");
      this.$store.dispatch("chat/resetGetChatUserListParams");
      // 关闭电话
      this.$store.dispatch("callCenter/control", false);
      this.$store.dispatch("callCenter/closeWebSocket");
    },

    handleClick(name) {
      switch (name) {
        
        case "logout":
          this.clearTag();
          this.logout();
          break;
        case "editPassword":
          this.controlEditPasswordModal = true;
          return
        case  "hospitalInformation":
          this.controlHospitalInformationModel = true;
          return
      }
    }
  },
  created() {
    // 检测当前密码是否合法
    user.checkPassword(sessionStorage.getItem("pd")).then((res) => {
      if (res.code === 0) {
        const { islegitimate } = res.data;
        if (!islegitimate) {
          this.$Message.info({
            content: "密码不合法,请修改密码",
            duration: 5,
          });
          this.controlEditPasswordModal = true;
          this.isColse = false;
        }
      }
    });
  },
};
</script>
<style lang="less" scoped>
.title {
  cursor: pointer;
}
</style>
