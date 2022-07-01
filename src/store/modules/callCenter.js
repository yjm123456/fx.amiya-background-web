const CallCenter = require("./../../utils/callcenter");
import context from "./../../main";
import ViewUI from "view-design";
import notice from "./../../components/telephone/components/notice.vue";
const callCenter = {
  namespaced: true,
  state: {
    // 控制显示
    control: false,

    // 是否连接
    isConnected:false,

    callCenter: null,

    // 设备信息
    callableInfo: {},

    callSuccessMsg:null
  },
  mutations: {
    control(state, control) {
      state.control = control;
    },

    connect(state, userInfo) {
      state.callCenter = new CallCenter();
      state.callCenter.connect(userInfo);
      // 确认连接成功
      state.callCenter.event.addEventListener("confirm",()=>{
        state.isConnected = true;
      })

      // 设备信息
      state.callCenter.event.addEventListener(
        "callableComponentInfo",
        (callableInfo) => {
          state.callableInfo = callableInfo;
        }
      );

      // 监听选择设备
      state.callCenter.event.addEventListener(
        "selectedCallableChanged",
        (nowSelectedCallableID) => {
          state.callableInfo.SelectedCallableID = nowSelectedCallableID;
        }
      );
      
      // 呼叫成功
      state.callCenter.event.addEventListener("callSuccessConfirm",(callSuccessMsg)=>{
        state.callSuccessMsg = callSuccessMsg;
      })
      
      // 设备状态改变
      state.callCenter.event.addEventListener("callableStatusChanged",(status) => {
          state.callableInfo.CallableList.forEach((item, index) => {
            if (item.ID === status.ID) {
              item.CallState = status.CallState;
              item.Session = status.Session;
            }
            if (item.Session) {
              switch (item.Session.SessionState) {
                case 0:
                  item.Session.stateName = "未知";
                  break;
                case 1:
                  item.Session.stateName = "空闲";
                  break;
                case 2:
                  item.Session.stateName = "拨号";
                  break;
                case 3:
                  item.Session.stateName = "响铃";
                  break;
                case 4:
                  item.Session.stateName = "来电";
                  break;
                case 5:
                  item.Session.stateName = "通话接通";
                  break;
                case 6:
                  item.Session.stateName = "通话结束";
                  break;
                case 7:
                  item.Session.stateName = "无人接听";
                  break;
                case 8:
                  item.Session.stateName = "挂断电话";
                  break;
                case 9:
                  item.Session.stateName = "忙";
                  break;
                case 10:
                  item.Session.stateName = "提机";
                  break;
                case 11:
                  item.Session.stateName = "挂机";
                  break;
                default:
                  return "主动挂断电话";
              }
            }
          });
        }
      );

      // 监听来电
      state.callCenter.event.addEventListener("telComing", (data) => {
        const { PhoneNumber, CallableID } = data;
        ViewUI.Notice.info({
          title: "来电通知",
          name:PhoneNumber,
          duration: 0,
          render: (h) => {
            return h("div", [
              h(notice, {
                props: {
                  data: {
                    PhoneNumber,
                    CallableID
                  },
                },
              }),
            ]);
          },
        });
      });
      
      // 监听呼叫组件错误
      state.callCenter.event.addEventListener("exception",(exceptionString)=>{
        context.$Message.info({
          content: `${exceptionString}30秒后再试`,
          duration: 8,
        });
      })

      // 监听呼叫组件关闭
      state.callCenter.event.addEventListener("onClose",()=>{
        state.isConnected = false;
      })
    },

    changeSelectedCallable(state, callableId) {
      state.callCenter.changeSelectedCallable(callableId);
    },

    callOut(state, data) {
      state.callCenter.callOut(data);
    },

    answer(state, data) {
      state.callCenter.answer({CallableID:data.CallableID});
      ViewUI.Notice.close(data.PhoneNumber)
    },

    reject(state, data) {
      state.callCenter.hangOn({CallableID:data.CallableID});
      ViewUI.Notice.close(data.PhoneNumber)
    },

    setDefaultCallable(state) {
      state.callCenter.setDefaultCallable(state.callableInfo.SelectedCallableID);
    },

    closeWebSocket(state) {
      state.callCenter.close();
    },
    
    resetCallSuccessMsg(state) {
      state.callSuccessMsg = null;
    }
  },
  actions: {
    // 连接
    connect({ commit }) {
      const userInfo = {
        DepartmentID: sessionStorage.getItem("positionId"),
        DepartmentName: sessionStorage.getItem("positionName"),
        EmployeeID: sessionStorage.getItem("employeeId"),
        EmployeeName: sessionStorage.getItem("employeeName"),
        PositionID: sessionStorage.getItem("positionId"),
        PositionName: sessionStorage.getItem("positionName"),
      };
      commit("connect", userInfo);
    },

    // 切换设备
    changeSelectedCallable({ commit }, callableId) {
      commit("changeSelectedCallable", callableId);
    },
    
    // 拨号
    callOut({ commit }, data) {
      commit("callOut", data);
    },

    // 接听
    answer({ commit }, data) {
      commit("answer", data);
    },

    // 拒接
    reject({ commit }, data) {
      commit("reject", data);
    },

    // 设置默认设备
    setDefaultCallable({ commit }) {
      commit("setDefaultCallable");
    },

    // 控制电话显示隐藏
    control({ commit }, control) {
      commit("control", control);
    },

    //关闭WebSocket连接
    closeWebSocket({commit}) {
      commit("closeWebSocket");
    }
  },
};

export default callCenter;
