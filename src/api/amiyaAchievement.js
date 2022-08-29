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
// 刀刀组和吉娜组
// 分组总业绩
export const PerformanceByLiveAnchorName = (params) => {
    return http({
        url: "/amiyabg/AmiyaAchievement/PerformanceByLiveAnchorName",
        method: "get",
        params
    });
};
// 派单成交业绩
export const sendAndDealPerformanceByLiveAnchorName = (params) => {
    return http({
        url: "/amiyabg/AmiyaAchievement/sendAndDealPerformanceByLiveAnchorName",
        method: "get",
        params
    });
};
// 面诊业绩
export const consultationPerformanceByLiveAnchorName = (params) => {
    return http({
        url: "/amiyabg/AmiyaAchievement/consultationPerformanceByLiveAnchorName",
        method: "get",
        params
    });
};
// 根据年月与主播名字获取照片/视频面诊明细
export const getPictureOrVideoPerformanceList = (params) => {
    return http({
        url: "/amiyabg/AmiyaAchievement/getPictureOrVideoPerformanceList",
        method: "get",
        params
    });
};
// 独立协助业绩
export const independentOrAssistPerformanceByLiveAnchorName = (params) => {
    return http({
        url: "/amiyabg/AmiyaAchievement/independentOrAssistPerformanceByLiveAnchorName",
        method: "get",
        params
    });
};


// 经营看板
// 基础经营看板
export const baseBusinessPerformance = (params) => {
    return http({
        url: "/amiyabg/AmiyaAchievement/baseBusinessPerformance",
        method: "get",
        params
    });
};
// 客单价经营看板
export const GuestUnitPricePerformanceByLiveAnchorName = (params) => {
    return http({
        url: "/amiyabg/AmiyaAchievement/GuestUnitPricePerformanceByLiveAnchorName",
        method: "get",
        params
    });
};
//派单成交经营看板
export const sendAndDealNumPerformance = (params) => {
    return http({
        url: "/amiyabg/AmiyaAchievement/sendAndDealNumPerformance",
        method: "get",
        params
    });
};
//各版块占比看板
export const performanceCompleteRate = (params) => {
    return http({
        url: "/amiyabg/AmiyaAchievement/performanceCompleteRate",
        method: "get",
        params
    });
};