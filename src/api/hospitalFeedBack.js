import http from "../http/http";

// 获取医院投诉与反馈信息列表（分页）
export const HospitalFeedBack = (params) => {
    return http({
        url: "/amiyabg/HospitalFeedBack/listWithPage",
        method: "get",
        params
    });
};


// 添加医院投诉与反馈信息
export const addHospitalFeedBack = (data) => {
    return http({
        url: "/amiyabg/HospitalFeedBack",
        method: "post",
        data
    });
};
// 编辑医院投诉与反馈信息
export const editHospitalFeedBack = (data) => {
    return http({
        url: "/amiyabg/HospitalFeedBack",
        method: "put",
        data
    });
};
// 根据医院投诉与反馈编号获取医院投诉与反馈信
export const byIdHospitalFeedBack = (id) => {
    return http({
        url: `/amiyabg/HospitalFeedBack/byId/${id}`,
        method: "get",
    });
};
// 删除医院投诉与反馈信息
export const deleteHospitalFeedBack = (id) => {
    return http({
        url: `/amiyabg/HospitalFeedBack/${id}`,
        method: "delete",
    });
};