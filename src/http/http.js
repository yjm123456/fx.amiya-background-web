import axios from "axios";
import { baseUrl } from "./baseUrl";
import context from "../main.js";
import router from "../router/index.js";
import store from "../store/index.js";
import ViewUI from "view-design";
import * as user from "./../api/user";
// 创建一个axios实例
const instance = axios.create({
    baseURL: baseUrl,
    // timeout: 20000 // 设置请求超时时间
});

// 给实例添加一个setToken方法，用于登录后将最新token动态添加到header，同时将token保存在sessionStorage中
instance.setToken = (token, refreshToken) => {
    instance.defaults.headers["Authorization"] = token;
    window.sessionStorage.setItem("token", token);
    window.sessionStorage.setItem("refreshToken", refreshToken);
};

// 重置登录信息
function resetLogin() {
    const employeeType = window.sessionStorage.getItem("employeeType");
    // 清空标签页
    store.dispatch("clearTag");
    if (employeeType === "amiyaEmployee") {
        router.push("/amiyaLogin");
    }
    if (employeeType === "hospitalEmployee") {
        router.push("/hospitalLogin");
    }
    sessionStorage.clear();
    // 关闭聊天
    store.commit("chat/closeWebSocket");
    store.dispatch("chat/resetGetChatUserListParams");
    // 关闭电话
    store.dispatch("callCenter/control", false);
    store.dispatch("callCenter/closeWebSocket");
}

// 添加请求拦截器
instance.interceptors.request.use((config) => {
    ViewUI.LoadingBar.start();
    let token = sessionStorage.getItem("token");
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
}, (error) => {
    ViewUI.LoadingBar.finish();
    return Promise.reject(error);
});

// 是否正在刷新的标记
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
let requests = [];

// 添加响应拦截器
instance.interceptors.response.use((response) => {
    const { code } = response.data;
    if (code == -1) {
        context.$Message.info({
            content: response.data.msg,
            duration: 5,
        });
    }
    if (code === 401) {
        resetLogin();
    }
    ViewUI.LoadingBar.finish();
    return response.data;
}, (error) => {
    if (error.response) {
        const { status } = error.response;
        if (status === 401) {
            const config = error.config;
            if (!isRefreshing) {
                isRefreshing = true;
                const employeeType = window.sessionStorage.getItem("employeeType");
                return user.refreshToken(employeeType).then((res) => {
                    if (res.code === 0) {
                        const { token, refreshToken } = res.data.tokenData;
                        instance.setToken(token, refreshToken);
                        config.headers["Authorization"] = token;
                        // 已经刷新了token，将所有队列中的请求进行重试
                        requests.forEach((cb) => cb(token));
                        requests = [];
                        return instance(config);
                    }
                }).catch((err) => {
                    resetLogin();
                }).finally(() => {
                    isRefreshing = false;
                });
            } else {
                // 正在刷新token，将返回一个未执行resolve的promise
                return new Promise((resolve) => {
                    // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
                    requests.push((token) => {
                        config.headers["Authorization"] = token;
                        resolve(instance(config));
                    });
                });
            }
        } else if (status === 500) {
            router.push("/500");
        } else if (status === 504) {
            // error.response && error.response.status
            context.$Message.warning({
                content: '当前数据计算量较大，请等待系统计算完毕后在操作日志中确认是否操作成功',
                duration: 3,
            });
        }
    }
    ViewUI.LoadingBar.finish();
    return Promise.reject(error);
});
export default instance;