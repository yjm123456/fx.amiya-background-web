import http from "../http/http";
// 获取合作达人业绩
export const cooperateLiveAnchorPerformanceData = (params) => {
    return http({
        url: "/amiyabg/CooperateLiveAnchorAchievement/cooperateLiveAnchorPerformanceData",
        method: "get",
        params
    });
};
// 机构排名
export const cooperatehospitalRank = (params) => {
    return http({
        url: "/amiyabg/CooperateLiveAnchorAchievement/cooperatehospitalRank",
        method: "get",
        params
    });
};