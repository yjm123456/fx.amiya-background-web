import http from "../http/http";
// 获取机构平台编码列表（分页）
export const thirdHospitalContentplatformCode = (params) => {
    return http({
        url: "/amiyabg/HospitalContentplatformCode/listWithPage",
        method: "get",
        params
    });
};

// 添加机构平台编码
export const addThirdHospitalContentplatformCode = (data) => {
    return http({
        url: "/amiyabg/HospitalContentplatformCode/add",
        method: "post",
        data
    });
};
// 编辑机构平台编码
export const editThirdHospitalContentplatformCode = (data) => {
    return http({
        url: "/amiyabg/HospitalContentplatformCode",
        method: "put",
        data
    });
};
// 根据三方平台编号获取机构平台编码
export const byIdThirdHospitalContentplatformCode = (id) => {
    return http({
        url: `/amiyabg/HospitalContentplatformCode/byId/${id}`,
        method: "get",
    });
};
// 删除机构平台编码
export const deleteThirdHospitalContentplatformCode = (id) => {
    return http({
        url: `/amiyabg/HospitalContentplatformCode/${id}`,
        method: "delete",
    });
};