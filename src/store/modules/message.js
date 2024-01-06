import * as api from "./../../api/customerAppointmentSchedule";

const message = {
    // 用于在全局引用此文中的方法时标识这一个的文件名
    namespaced: true,

    state: {
        // 在这里定义获取数据的变量
        myUnReadNoticeMessage: 0
    },
    mutations: {
        // 获取消息数据
        getMessage(state) {
            // 掉接口
            return api.getMyUnReadCount().then((res) => {
                if (res.code === 0) {
                    const { myUnReadNoticeMessage } = res.data
                    state.myUnReadNoticeMessage = myUnReadNoticeMessage
                } else if (res.code == 401) {
                    this.$router.push("/amiyaLogin")
                    sessionStorage.clear()
                }
            })
        },
    },
    actions: {
        getMessage: ({
            commit
        }, msg) => commit("getMessage"),
    },
};
export default message;