import http from "../http/http";
// 直播中客资和新客业绩
export const getLivingCustomerAndPerformanceData = (params) => {
    return http({
        url: "/amiyabg/AmiyaLivingOperationBoard/getLivingCustomerAndPerformanceData",
        method: "get",
        params
    });
};
// 直播中客资和折线图
export const getLivingCustomerAndPerformanceBrokenLineData = (params) => {
    return http({
        url: "/amiyabg/AmiyaLivingOperationBoard/getLivingCustomerAndPerformanceBrokenLineData",
        method: "get",
        params
    });
};
// 直播中漏斗图
export const getLivingFilterData = (params) => {
    return http({
        url: "/amiyabg/AmiyaLivingOperationBoard/getLivingFilterData",
        method: "get",
        params
    });
};
// 直播中转化周期
export const getLivingCycleData = (params) => {
    return http({
        url: "/amiyabg/AmiyaLivingOperationBoard/getLivingCycleData",
        method: "get",
        params
    });
};
// 直播中线索目标完成率
export const getLivingClueTargetData = (params) => {
    return http({
        url: "/amiyabg/AmiyaLivingOperationBoard/getLivingClueTargetData",
        method: "get",
        params
    });
};
// 直播中业绩贡献占比
export const getLivingPerformanceRate = (params) => {
    return http({
        url: "/amiyabg/AmiyaLivingOperationBoard/getLivingPerformanceRate",
        method: "get",
        params
    });
};
// 直播中平台账号获客占比
export const getLivingContentplatformClueData = (params) => {
    return http({
        url: "/amiyabg/AmiyaLivingOperationBoard/getLivingContentplatformClueData",
        method: "get",
        params
    });
};
// 直播中平台账号业绩占比
export const getLivingContentplatformPerformanceData = (params) => {
    return http({
        url: "/amiyabg/AmiyaLivingOperationBoard/getLivingContentplatformPerformanceData",
        method: "get",
        params
    });
}