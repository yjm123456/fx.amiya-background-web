import http from "../http/http";
// 获取短视频数据
export const shortVideoData = (params) => {
    return http({
        url: "/amiyabg/FeishuMultidimensionalTable/shortVideoData",
        method: "get",
        params
    });
};