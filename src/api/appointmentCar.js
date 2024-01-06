import http from "../http/http";

// 获取预约叫车列表（分页）
export const getAppointmentCar = (params) => {
    return http({
        url: "/amiyabg/AppointmentCar/list",
        method: "get",
        params
    });
};

// 获取预约叫车状态列表
export const appointmentCarTypeList = (params) => {
    return http({
        url: "/amiyabg/AppointmentCar/appointmentCarTypeList",
        method: "get",
        params
    });
};

// 修改预约叫车信息
export const editAppointmentCar = (data) => {
    return http({
        url: "/amiyabg/AppointmentCar",
        method: "put",
        data
    });
};
// 根据ID获取预约叫车信息
export const byIdAppointmentCar = (id) => {
    return http({
        url: `/amiyabg/AppointmentCar/getById/${id}`,
        method: "get",
    });
};
// 修改预约叫车状态
export const updateStaus = (data) => {
    return http({
        url: "/amiyabg/AppointmentCar/updateStaus",
        method: "put",
        data
    });
};