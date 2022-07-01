import http from "../http/http";

// 获取追踪回访提报信息列表（分页）
export const trackReported = (params) => {
    return http({
        url: "/amiyabg/TrackReported/listWithPage",
        method: "get",
        params
    });
};

// 添加追踪回访提报信息
export const addTrackReported = (data) => {
    return http({
        url: "/amiyabg/TrackReported",
        method: "post",
        data
    });
};
// 编辑追踪回访提报信息
export const editTrackReported = (data) => {
    return http({
        url: "/amiyabg/TrackReported",
        method: "put",
        data
    });
};
// 根据追踪回访提报编号获取追踪回访提报信息
export const byIdtrackReported = (id) => {
    return http({
        url: `/amiyabg/TrackReported/byId/${id}`,
        method: "get",
    });
};
// 删除追踪回访提报信息
export const deleteTrackReported = (id) => {
    return http({
        url: `/amiyabg/TrackReported/${id}`,
        method: "delete",
    });
};

// 医院端获取追踪回访提报信息列表（分页）--[待处理]
export const hospitalSendedListWithPage = (params) => {
    return http({
        url: "/amiyabg/TrackReported/hospitalSendedListWithPage",
        method: "get",
        params
    });
};
// 医院端获取追踪回访提报信息列表（分页）--[已处理]
export const hospitalDealedListWithPage = (params) => {
    return http({
        url: "/amiyabg/TrackReported/hospitalDealedListWithPage",
        method: "get",
        params
    });
};
// 获取提报状态列表
export const sendStatusText = () => {
    return http({
        url: "/amiyabg/TrackReported/sendStatusText",
        method: "get",
    });
};
// 根据手机号筛选合适的客户
export const bindCustomerService = (params) => {
    return http({
        url: "/amiyabg/BindCustomerService",
        method: "get",
        params
    });
};
// 医院确认是否跟进
export const hospitalConfirTrackRecord = (data) => {
    return http({
        url: "/amiyabg/TrackReported/hospitalConfirTrackRecord",
        method: "post",
        data
    });
};