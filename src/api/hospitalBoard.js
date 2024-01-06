import http from "../http/http";

// 订单数据看板
export const getOrderData = (params) => {
    return http({
        url: "/amiyabg/HospitalBoard/orderData",
        method: "get",
        params
    });
};
// 运营数据看板
export const getOperationData = (params) => {
    return http({
        url: "/amiyabg/HospitalBoard/operationData",
        method: "get",
        params
    });
};
// 成交看板业绩数据
export const getDealPerformance = (params) => {
    return http({
        url: "/amiyabg/HospitalBoard/dealPerformance",
        method: "get",
        params
    });
};
// 获取科室排名数据
export const getDepartmentRankList = (params) => {
    return http({
        url: "/amiyabg/HospitalBoard/departmentRankList",
        method: "get",
        params
    });
};
// 获取邀约数据
export const getConsultantRankList = (params) => {
    return http({
        url: "/amiyabg/HospitalBoard/consultantRankList",
        method: "get",
        params
    });
};
// 获取接诊数据
export const getSceneConsultantRankList = (params) => {
    return http({
        url: "/amiyabg/HospitalBoard/sceneConsultantRankList",
        method: "get",
        params
    });
};
// 获取机构排名数据
export const getRankData = (params) => {
    return http({
        url: "/amiyabg/HospitalBoard/rankData",
        method: "get",
        params
    });
};