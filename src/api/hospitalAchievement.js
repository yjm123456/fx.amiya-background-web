import http from "../http/http";
// 全国机构运营当日数据
export const getHospitalOperationDailyData = () => {
    return http({
        url: "/amiyabg/HospitalAchievement/getHospitalOperationDailyData",
        method: "get",
    });
};
// 全国机构运营当年数据
export const getHospitalOperationYearData = (params) => {
    return http({
        url: "/amiyabg/HospitalAchievement/getHospitalOperationYearData",
        method: "get",
        params
    });
};
//根据医院id与年份获取派单折线图
export const getHospitalSendOrderBrokenLine = (params) => {
    return http({
        url: "/amiyabg/HospitalAchievement/getHospitalSendOrderBrokenLine",
        method: "get",
        params
    });
};
//根据医院id与年份获取上门数折线图
export const getHospitalVisitBrokenLine = (params) => {
    return http({
        url: "/amiyabg/HospitalAchievement/getHospitalVisitBrokenLine",
        method: "get",
        params
    });
};
//根据医院id与年份获取上门率折线图
export const getHospitalVisitRateBrokenLine = (params) => {
    return http({
        url: "/amiyabg/HospitalAchievement/getHospitalVisitRateBrokenLine",
        method: "get",
        params
    });
};
//根据医院id与年份获取新客成交数折线图
export const getHospitalNewCustomerDealBrokenLine = (params) => {
    return http({
        url: "/amiyabg/HospitalAchievement/getHospitalNewCustomerDealBrokenLine",
        method: "get",
        params
    });
};
//根据医院id与年份获取新客成交率折线图
export const getHospitalNewCustomerDealRateBrokenLine = (params) => {
    return http({
        url: "/amiyabg/HospitalAchievement/getHospitalNewCustomerDealRateBrokenLine",
        method: "get",
        params
    });
};
//根据医院id与年份获取新客业绩折线图
export const getHospitalNewCustomerPerformanceBrokenLine = (params) => {
    return http({
        url: "/amiyabg/HospitalAchievement/getHospitalNewCustomerPerformanceBrokenLine",
        method: "get",
        params
    });
};
//根据医院id与年份获取新客客单价折线图
export const getHospitalNewCustomerUnitPriceBrokenLine = (params) => {
    return http({
        url: "/amiyabg/HospitalAchievement/getHospitalNewCustomerUnitPriceBrokenLine",
        method: "get",
        params
    });
};
//根据医院id与年份获取老客成交数折线图
export const getHospitalOldCustomerDealBrokenLine = (params) => {
    return http({
        url: "/amiyabg/HospitalAchievement/getHospitalOldCustomerDealBrokenLine",
        method: "get",
        params
    });
};
//根据医院id与年份获取老客业绩折线图
export const getHospitalOldCustomerPerformanceBrokenLine = (params) => {
    return http({
        url: "/amiyabg/HospitalAchievement/getHospitalOldCustomerPerformanceBrokenLine",
        method: "get",
        params
    });
};
//根据医院id与年份获取老客客单价折线图
export const getHospitalOldCustomerUnitPriceBrokenLine = (params) => {
    return http({
        url: "/amiyabg/HospitalAchievement/getHospitalOldCustomerUnitPriceBrokenLine",
        method: "get",
        params
    });
};
// 全国合作机构top10运营数据占比
export const topTenHospitalPerformanceData = () => {
    return http({
        url: "/amiyabg/HospitalAchievement/topTenHospitalPerformanceData",
        method: "get",
    });
};
// 全国城市top10运营数据占比
export const topTenCityPerformanceData = () => {
    return http({
        url: "/amiyabg/HospitalAchievement/topTenCityPerformanceData",
        method: "get",
    });
};
// 全国机构/城市运营当月数据
export const getHospitalOperationMonthlyData = (params) => {
    return http({
        url: "/amiyabg/HospitalAchievement/getHospitalOperationMonthlyData",
        method: "get",
        params
    });
};
//根据医院id与年份获取总业绩折线图
export const getHospitalTotalPriceBrokenLine = (params) => {
    return http({
        url: "/amiyabg/HospitalAchievement/getHospitalTotalPriceBrokenLine",
        method: "get",
        params
    });
};