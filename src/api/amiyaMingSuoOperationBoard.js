import http from "../http/http";
// 根据条件获取名索数据运营看板
export const getMingSuoAchievementAndDateSchedule = (params) => {
    return http({
        url: "/amiyabg/AmiyaMingSuoOperationBoard/getMingSuoAchievementAndDateSchedule",
        method: "get",
        params
    });
};
// 获取名索漏斗图数据
export const getMingSuoFilterData = (params) => {
    return http({
        url: "/amiyabg/AmiyaMingSuoOperationBoard/getMingSuoFilterData",
        method: "get",
        params
    });
};
// 名索运营看板周期转化
export const getMingSuoTransformCycleData = (params) => {
    return http({
        url: "/amiyabg/AmiyaMingSuoOperationBoard/getMingSuoTransformCycleData",
        method: "get",
        params
    });
};
// 名索线索目标完成率
export const getMingSuoClueTargetData = (params) => {
    return http({
        url: "/amiyabg/AmiyaMingSuoOperationBoard/getMingSuoClueAndPerformanceTargetData",
        method: "get",
        params
    });
};
// 名索业绩目标完成率
export const getMingSuoPerformanceTargetData = (params) => {
    return http({
        url: "/amiyabg/AmiyaMingSuoOperationBoard/getMingSuoPerformanceTargetData",
        method: "get",
        params
    });
};
// 助理目标完成率和助理业绩占比柱形图
export const mingsuoAssiatantTargetCompleteAndPerformanceRateData = (params) => {
    return http({
        url: "/amiyabg/AmiyaMingSuoOperationBoard/mingsuoAssiatantTargetCompleteAndPerformanceRateData",
        method: "get",
        params
    });
};
// 名索账号获取占比
export const getMingSuoContentplatformClueData = (params) => {
    return http({
        url: "/amiyabg/AmiyaMingSuoOperationBoard/getMingSuoContentplatformClueData",
        method: "get",
        params
    });
};
// 名索账号业绩占比
export const getMingSuoContentplatformPerformanceData = (params) => {
    return http({
        url: "/amiyabg/AmiyaMingSuoOperationBoard/getMingSuoContentplatformPerformanceData",
        method: "get",
        params
    });
};