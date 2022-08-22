import http from "../http/http";
// 阿美雅业绩看板
export const totalPerformance = (params) => {
    return http({
        url: "/amiyabg/AmiyaAchievement/totalPerformance",
        method: "get",
        params
    });
};
// 派单成交业绩
export const sendAndDealPerformance = (params) => {
    return http({
        url: "/amiyabg/AmiyaAchievement/sendAndDealPerformance",
        method: "get",
        params
    });
};
// 明细
export const getSendAndDealPerformanceDetailList = (params) => {
    return http({
        url: "/amiyabg/AmiyaAchievement/getSendAndDealPerformanceDetailList",
        method: "get",
        params
    });
};
// 分组业绩
export const groupPerformance = (params) => {
    return http({
        url: "/amiyabg/AmiyaAchievement/groupPerformance",
        method: "get",
        params
    });
};