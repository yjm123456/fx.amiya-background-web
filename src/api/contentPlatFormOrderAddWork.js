import http from "../http/http";
// 录单申请列表分页
export const ContentPlatFormOrderAddWork = (params) => {
    return http({
        url: `/amiyabg/ContentPlatFormOrderAddWork/listWithPage`,
        method: "get",
        params
    });
};
// 添加录单申请
export const addContentPlatFormOrderAddWork = (data) => {
    return http({
        url: `/amiyabg/ContentPlatFormOrderAddWork/add`,
        method: "post",
        data
    });
};
// 根据录单申请编号获取录单申请信息
export const byIdContentPlatFormOrderAddWork = (id) => {
    return http({
        url: `/amiyabg/ContentPlatFormOrderAddWork/byId/${id}`,
        method: "get",
    });
};
// 修改录单申请信息
export const editContentPlatFormOrderAddWork = (data) => {
    return http({
        url: `/amiyabg/ContentPlatFormOrderAddWork/update`,
        method: "put",
        data
    });
};
// 审核录单申请信息
export const check = (data) => {
    return http({
        url: `/amiyabg/ContentPlatFormOrderAddWork/check`,
        method: "put",
        data
    });
};
// 作废录单申请
export const deleteContentPlatFormOrderAddWork = (id) => {
    return http({
        url: `/amiyabg/ContentPlatFormOrderAddWork/${id}`,
        method: "delete",
    });
};
// 转移录单申请信息
export const updateAcceptBy = (data) => {
    return http({
        url: `/amiyabg/ContentPlatFormOrderAddWork/updateAcceptBy`,
        method: "put",
        data
    });
};
// 获取申请类型
export const getContentPlatformOrderAddWorkTypeList = () => {
    return http({
        url: `/amiyabg/ContentPlatFormOrderAddWork/getContentPlatformOrderAddWorkTypeList`,
        method: "get",
    });
};
// 获取录单申请历史数据
export const historyData = (params) => {
    return http({
        url: `/amiyabg/ContentPlatFormOrderAddWork/historyData`,
        method: "get",
        params
    });
};