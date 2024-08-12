import http from "../http/http";
// 获取粉丝见面会详情列表  分页
export const getFansMeetingDetails = (params) => {
    return http({
        url: `/amiyabg/FansMeetingDetails/listWithPage`,
        method: "get",
        params,
    });
};
// 医院端 获取粉丝见面会详情列表  分页
export const getFansMeetingDetailsHospital = (params) => {
    return http({
        url: `/amiyabg/FansMeetingDetails/listWithPageByHospital`,
        method: "get",
        params,
    });
};
// 添加粉丝见面会详情信息
export const addFansMeetingDetails = (data) => {
    return http({
        url: `/amiyabg/FansMeetingDetails/add`,
        method: "post",
        data,
    });
};
// 修改粉丝见面会详情信息/api/Permission/byId/{id}
export const editFansMeetingDetails = (data) => {
    return http({
        url: `/amiyabg/FansMeetingDetails`,
        method: "put",
        data,
    });
};
//   根据粉丝见面会详情编号获取粉丝见面会详情信息/api/
export const byIdFansMeetingDetails = (id) => {
    return http({
        url: `/amiyabg/FansMeetingDetails/byId/${id}`,
        method: "get",
    });
};
// 根据id删除粉丝见面会详情   delete
export const deleteFansMeetingDetails = (id) => {
    return http({
        url: `/amiyabg/FansMeetingDetails/${id}`,
        method: "delete",
    });
};
// 是否参加粉丝见面会
export const getFansMeetingDetailsisAttend = (params) => {
    return http({
        url: `/amiyabg/FansMeetingDetails/isAttend`,
        method: "get",
        params,
    });
};
// 导出粉丝见面会详情
export const ExportByHospital = (params) => {
    return http({
        url: "/amiyabg/FansMeetingDetails/ExportByHospital",
        method: "get",
        params,
        responseType: 'blob'
    });
};