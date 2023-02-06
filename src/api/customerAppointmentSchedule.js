import http from "../http/http";
// 获取客户预约日程信息列表（分页）  get
export const getCustomerAppointmentSchedule = (params) => {
    return http({
        url: "/amiyabg/CustomerAppointmentSchedule/listWithPage",
        method: "get",
        params,
    });
};
// 获取客户预约日程信息列表（分页）  get
export const getlistByCalendar = (params) => {
    return http({
        url: "/amiyabg/CustomerAppointmentSchedule/listByCalendar",
        method: "get",
        params,
    });
};
// 添加客户预约日程信息  post
export const addCustomerAppointmentSchedule = (data) => {
    return http({
        url: "/amiyabg/CustomerAppointmentSchedule",
        method: "post",
        data
    });
};
// 根据编号获取客户预约日程信息
export const byIdCustomerAppointmentSchedule = (id) => {
    return http({
        url: `/amiyabg/CustomerAppointmentSchedule/byId/${id}`,
        method: "get",
    });
};
// 修改客户预约日程信息   put
export const updateCustomerAppointmentSchedule = (data) => {
    return http({
        url: `/amiyabg/CustomerAppointmentSchedule`,
        method: "put",
        data
    });
};

// 删除客户预约日程信息  delete
export const deleteCustomerAppointmentSchedule = (id) => {
    return http({
        url: `/amiyabg/CustomerAppointmentSchedule/${id}`,
        method: "delete",
    });
};
// 获取预约类型
export const getAppointmentTypeList = () => {
    return http({
        url: "/amiyabg/CustomerAppointmentSchedule/getAppointmentTypeList",
        method: "get",
    });
};
// 消息通知列表
export const MessageNoticelist = (params) => {
    return http({
        url: `/amiyabg/MessageNotice/list`,
        method: "get",
        params
    });
};
// 修改消息通知信息
export const updateMessageNotice = (data) => {
    return http({
        url: `/amiyabg/MessageNotice`,
        method: "put",
        data
    });
};
// 获取未读消息条数
export const getMyUnReadCount = () => {
    return http({
        url: `/amiyabg/MessageNotice/getMyUnReadCount`,
        method: "get",
    });
};
// 获取通知类型
export const getMessageNoticeTypeList = () => {
    return http({
        url: `/amiyabg/MessageNotice/getMessageNoticeTypeList`,
        method: "get",
    });
};