import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "./plugins/iview.js";
import ViewUI from "view-design";
import VueClipboard from 'vue-clipboard2'
import './styles/index.less'
import VueParticles from 'vue-particles'
import pdf from 'vue-pdf'

Vue.use(pdf);
Vue.use(VueParticles);
Vue.use(VueClipboard);
Vue.config.productionTip = false;

/**
 * 解决 Vue 重复点击相同路由，出现 Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation 问题
 */
import VueRouter from 'vue-router'
const originalPush = VueRouter.prototype.push  
VueRouter.prototype.push = function push(location) {  
    return originalPush.call(this, location).catch(err => err)
}

/**
 * 日期1
 */
import moment from "moment";
Vue.prototype.$moment = moment;

/**
 * echarts
 */
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts;

/**
 * v-viewer
 */
import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";
Vue.use(Viewer);
Viewer.setDefaults({
    Options: {
        inline: true,
        button: true,
        navbar: true,
        title: true,
        toolbar: true,
        tooltip: true,
        movable: true,
        zoomable: true,
        rotatable: true,
        scalable: true,
        transition: true,
        fullscreen: true,
        keyboard: true,
        url: "data-source",
    },
});

/**
 * video.js
 */
import Video from "video.js";
import "video.js/dist/video-js.css";
Vue.prototype.$video = Video;

/**
 * 自定义指令实现权限控制（按钮级）
 */
Vue.directive("has", {
    bind: function(el, binding) {
        Vue.nextTick(function() {
            let role = binding.value.role;
            if (!Vue.prototype.$_has(role)) {
                el.parentNode.removeChild(el);
            }
        });
    },
});
Vue.prototype.$_has = function(role) {
    let currentRole = JSON.parse(sessionStorage.getItem("permissions"));
    if (!currentRole) {
        currentRole = [];
    }
    if (Array.isArray(role)) {
        return currentRole.some(function(ele) {
            return role.indexOf(ele) >= 0;
        });
    } else {
        return currentRole.indexOf(role) >= 0;
    }
};

/**
 * 用户手动刷新页面，这时路由会被重设，要重新新增
 */
if (sessionStorage.getItem("token") && sessionStorage.getItem("routes")) {
    let routes = JSON.parse(sessionStorage.getItem("routes"));
    store.dispatch("addRoutes", routes);
}

/**
 * 用户手动刷新页面，需要重新连接websocket
 */
if (sessionStorage.getItem("token")) {
    // 连接聊天
    store.commit("chat/initWebsocket");
    // 连接电话
    store.dispatch("callCenter/connect");
    store.dispatch("callCenter/control", true)
}

router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    if (sessionStorage.getItem("token")) {
        if (to.meta.isTag) store.dispatch("addTag", to);
        next();
    } else {
        if (to.path === "/amiyaLogin" || to.path === "/hospitalLogin") {
            next();
        } else {
            next({
                path: "/amiyaLogin"
            });
        }
    }
});
router.afterEach((route) => {
    ViewUI.LoadingBar.finish();
});

const vue = new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
export default vue;