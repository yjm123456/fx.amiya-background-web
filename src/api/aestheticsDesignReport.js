import http from "../http/http";
// 获取美学设计报告列表（分页）
export const AestheticsDesignReport = (params) => {
    return http({
        url: "/amiyabg/AestheticsDesignReport/list",
        method: "get",
        params
    });
};
// 添加美学设计
export const addAestheticsDesign = (data) => {
    return http({
        url: `/amiyabg/AestheticsDesignReport/addAestheticsDesign`,
        method: "post",
        data,
    });
};
// 根据美学设计报告id获取美学设计
export const getDesignByReportId = (params) => {
    return http({
        url: "/amiyabg/AestheticsDesignReport/getDesignByReportId",
        method: "get",
        params
    });
};
// 编辑美学设计
export const updateDesign = (data) => {
    return http({
        url: `/amiyabg/AestheticsDesignReport/updateDesign`,
        method: "put",
        data,
    });
};
// 美学设计报告状态名称列表
export const statuList = () => {
    return http({
        url: "/amiyabg/AestheticsDesignReport/statuList",
        method: "get",
    });
};
// 获取面部标签
export const faceTagNameList = () => {
    return http({
        url: "/amiyabg/CustomerTagInfo/faceTagNameList",
        method: "get",
    });
};
// 获取医院简称
export const simpleNameList = () => {
    return http({
        url: "/amiyabg/HospitalInfo/simpleNameList",
        method: "get",
    });
};