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
// 获取短视频粉丝数据
export const shortVideoFansData = (params) => {
    return http({
        url: "/amiyabg/FeishuMultidimensionalTable/shortVideoFansData",
        method: "get",
        params
    });
};
// 刷新短视频粉丝数据
export const refreshFansData = (params) => {
    return http({
        url: "/amiyabg/FeishuMultidimensionalTable/refreshFansData",
        method: "get",
        params
    });
};
// 获取短视频评论数据
export const shortVideoCommentsData = (params) => {
    return http({
        url: "/amiyabg/FeishuMultidimensionalTable/shortVideoCommentsData",
        method: "get",
        params
    });
};
// 刷新短视频评论数据
export const refreshCommentsData = (params) => {
    return http({
        url: "/amiyabg/FeishuMultidimensionalTable/refreshCommentsData",
        method: "get",
        params
    });
};