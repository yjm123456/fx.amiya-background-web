import http from "../http/http";
// 获取三方平台信息列表（分页）
export const thirdPartContentplatformInfo = (params) => {
    return http({
        url: "/amiyabg/ThirdPartContentplatformInfo/listWithPage",
        method: "get",
        params
    });
};

// 添加三方平台信息
export const addThirdPartContentplatformInfo = (data) => {
    return http({
        url: "/amiyabg/ThirdPartContentplatformInfo/add",
        method: "post",
        data
    });
};
// 编辑三方平台信息
export const editThirdPartContentplatformInfo = (data) => {
    return http({
        url: "/amiyabg/ThirdPartContentplatformInfo",
        method: "put",
        data
    });
};
// 根据三方平台编号获取三方平台信息
export const byIdThirdPartContentplatformInfo = (id) => {
    return http({
        url: `/amiyabg/ThirdPartContentplatformInfo/byId/${id}`,
        method: "get",
    });
};
// 删除三方平台信息
export const deleteThirdPartContentplatformInfo = (id) => {
    return http({
        url: `/amiyabg/ThirdPartContentplatformInfo/${id}`,
        method: "delete",
    });
};
// 获取有效的三方平台信息 下拉框
export const ValidKeyAndValue = (params) => {
    return http({
        url: "/amiyabg/ThirdPartContentplatformInfo/ValidKeyAndValue",
        method: "get",
        params
    });
};
// 根据医院获取有效的三方平台信息 下拉框
export const HospitalContentplatformCodeValidKeyAndValue = (params) => {
    return http({
        url: "/amiyabg/HospitalContentplatformCode/ValidKeyAndValue",
        method: "get",
        params
    });
};
// 管理端根据医院id和三方平台id进行查重-朗姿
export const getIsRepeateByHospitalIdAndThirdPartIdToLangZi = (params) => {
    return http({
        url: "/amiyabg/HospitalContentplatformCode/getIsRepeateByHospitalIdAndThirdPartIdToLangZi",
        method: "get",
        params
    });
};