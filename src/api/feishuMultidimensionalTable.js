import http from "../http/http";
// 获取短视频数据
export const shortVideoData = (params) => {
    return http({
        url: "/amiyabg/FeishuMultidimensionalTable/shortVideoData",
        method: "get",
        params
    });
};
// 刷新短视频数据
export const refreshData = (params) => {
    return http({
        url: "/amiyabg/FeishuMultidimensionalTable/refreshData",
        method: "get",
        params
    });
};