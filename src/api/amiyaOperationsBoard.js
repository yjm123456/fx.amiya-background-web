import http from "../http/http";
// 获取啊美雅运营看板数据
export const getCustomerData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getCustomerData",
        method: "get",
        params
    });
};
// 获取啊美雅运营看板时间进度和总业绩
export const getTotalAchievementAndDateSchedule = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getTotalAchievementAndDateSchedule",
        method: "get",
        params
    });
};
// 获取客户运营情况数据
export const getCustomerAnalizeData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getCustomerAnalizeData",
        method: "get",
        params
    });
};
// 获取客户指标转化数据
export const getCustomerIndexTransformationData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getCustomerIndexTransformationData",
        method: "get",
        params
    });
};
// 获取助理业绩分析数据
export const getEmployeePerformanceAnalizeData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getEmployeePerformanceAnalizeData",
        method: "get",
        params
    });
};


// 获取公司看板业绩情况数据
export const getcompanyPerformanceData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/companyPerformanceData",
        method: "get",
        params
    });
};
// 获取公司看板获客情况数据
export const getcompanyCustomerAcquisition = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/companyCustomerAcquisition",
        method: "get",
        params
    });
};
// 获取公司看板运营情况数据
export const getcompanyOperationsData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/companyOperationsData",
        method: "get",
        params
    });
};
// 获取公司看板指标转化情况数据
export const getcompanyIndicatorConversionData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/companyIndicatorConversionData",
        method: "get",
        params
    });
};
// 获取助理看板业绩情况数据
export const getassistantPerformanceData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/assistantPerformanceData",
        method: "get",
        params
    });
};
// 获取助理看板获客情况
export const getassistantCustomerAcquisition = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/assistantCustomerAcquisition",
        method: "get",
        params
    });
};
// 获取助理看板运营情况数据
export const getassistantOperationsData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/assistantOperationsData",
        method: "get",
        params
    });
};
// 获取助理看板指标转化情况数据
export const getassistantIndicatorConversionData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/assistantIndicatorConversionData",
        method: "get",
        params
    });
};
// 获取公司当月/历史新客分诊转化情况
export const companyNewCustomerConversionData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/companyNewCustomerConversionData",
        method: "get",
        params
    });
};