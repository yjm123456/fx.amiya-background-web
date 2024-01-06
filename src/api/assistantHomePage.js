import http from "../http/http";
// 获取订单数据
export const orderData = (params) => {
    return http({
        url: "/amiyabg/AssistantHomePage/orderData",
        method: "get",
        params
    });
};
// 获取今日到院数据
export const todayToHospitalData = (params) => {
    return http({
        url: "/amiyabg/AssistantHomePage/todayToHospitalData",
        method: "get",
        params
    });
};
// 获取今日预约数据
export const todayAppointmentData = (params) => {
    return http({
        url: "/amiyabg/AssistantHomePage/todayAppointmentData",
        method: "get",
        params
    });
};
// 获取月业绩完成情况数据
export const monthPerformanceData = (params) => {
    return http({
        url: "/amiyabg/AssistantHomePage/monthPerformanceData",
        method: "get",
        params
    });
};
// 获取今日回访数据
export const todayTrackData = (params) => {
    return http({
        url: "/amiyabg/AssistantHomePage/todayTrackData",
        method: "get",
        params
    });
};