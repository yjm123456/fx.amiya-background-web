import http from "../http/http";

// 获取预约列表
export const Appointment = (params) => {
    return http({
        url: "/amiyabg/Appointment",
        method: "get",
        params
    });
};
// 修改预约信息/amiyabg​/Appointment​/updateAppointment
export const editAppointment = (data) => {
    return http({
        url: `/amiyabg/Appointment/updateAppointment`,
        method: "put",
        data,
    });
};
// 派单至对应医院/amiyabg​​/Appointment​/sendToHospital
export const editsendToHospital = (data) => {
    return http({
        url: `/amiyabg/Appointment/sendToHospital`,
        method: "put",
        data,
    });
};
// 确认完成/amiyabg​​/Appointment/confirmFinish/${data}
export const editconfirmFinish = (data) => {
    return http({
        url: `/amiyabg/Appointment/confirmFinish?id=${data.id}`,
        method: "put"
    });
};
// 根据编号获取预约信息
export const byIdAppointment = (id) => {
    return http({
        url: `/amiyabg/Appointment/byId/${id}`,
        method: "get"
    });
};
// 修改预约信息备注
export const editRemark = (data) => {
    return http({
        url: `/amiyabg/Appointment/updateAppointmentRemark`,
        method: "put",
        data
    });
};
// 医院获取派单未处理信息条数
export const getNotRepeatedSendOrder = () => {
    return http({
        url: `/amiyabg/ContentPlateFormSendOrder/getNotRepeatedSendOrder`,
        method: "get",
    });
};