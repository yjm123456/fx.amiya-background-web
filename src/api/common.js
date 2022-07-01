import http from "../http/http";
import {
    callRecordBaseUrl
} from "../http/baseUrl";

// 根据用户编号获取客户详情
export const byUserIdGetCustomerDetail = (userId) => {
    return http({
        url: `/amiyabg/Customer/byUserId/${userId}`,
        method: "get",
    });
};

// 根据加密手机号获取订单列表
export const byEncryptPhoneGetOrderList = (params) => {
    return http({
        url: `/amiyabg/Order/listByEncryptPhone`,
        method: "get",
        params
    });
};

// 根据加密手机号获取预约列表
export const byEncryptPhoneGetAppointmentList = (params) => {
    return http({
        url: `/amiyabg/Appointment/listByEncryptPhone`,
        method: "get",
        params
    });
};

// 根据员工编号数组获取员工姓名
export const getEmployeeNameList = (data) => {
    return http({
        url: `/amiyabg/AmiyaEmployee/getEmployeeNameList`,
        method: "post",
        data
    });
};

// 根据加密电话文本获取回访记录列表（分页）
export const byEncryptPhoneGetReturnVisitList = (params) => {
    return http({
        url: `/amiyabg/Track/recordListByEncryptPhone`,
        method: "get",
        params,
    });
};

// 根据手机号加密文本获取领取礼品列表
export const byEncryptPhoneGetUserAlreadyReceiveGift = (params) => {
    return http({
        url: `/amiyabg/Gift/receiveGiftListByEncryptPhone`,
        method: "get",
        params,
    });
};

// 获取有效的回访工具列表
export const getTrackReturnVisitToolList = () => {
    return http({
        url: `/amiyabg/Track/toolList`,
        method: "get",
    });
};

// 获取有效的回访类型列表
export const getTrackReturnVisitTypeList = () => {
    return http({
        url: `/amiyabg/Track/typeList`,
        method: "get",
    });
};

// 添加回访记录
export const addTrackRecord = (data) => {
    return http({
        url: `/amiyabg/Track/trackRecord`,
        method: "post",
        data,
    });
};

// 根据通话编号集合获取通话记录列表  post
export const byIdGetCallRecords = (data) => {
    return http({
        url: `${callRecordBaseUrl}/CallRecords/getListByIds`,
        method: "post",
        data,
    });
};

// 根据回访类型编号获取回访主题名称列表
export const byTrackTypeIdGetTrackThemeList = (trackTypeId) => {
    return http({
        url: `/amiyabg/TrackTheme/nameListByTrackTypeId/${trackTypeId}`,
        method: "get",
    });
};

// 根据加密电话获取客户详细信息
export const byEncryptPhoneGetCustomerInfo = (params) => {
    return http({
        url: `/amiyabg/Customer/detailInfoByEncryptPhone`,
        method: "get",
        params
    });
};
// 根据加密电话获取内容平台订单列表
export const byContentOrderList = (params) => {
    return http({
        url: `/amiyabg/ContentPlateFormOrder/listByEncryptPhone`,
        method: "get",
        params
    });
};