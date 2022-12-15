import Vue from "vue";
import Vuex from "vuex";
// home
import home from "./modules/home";
// 标签页联动
import tag from "./modules/tag";
// 添加路由
import addRoute from "./modules/addRoute";
// 客服
import chat from "./modules/chat";
// 呼叫中心
import callCenter from "./modules/callCenter"
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        home,
        tag,
        addRoute,
        chat,
        callCenter
    },
});