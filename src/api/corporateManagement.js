import http from "../http/http";

// 获取公司信息列表（分页）  get
export const getCompanyBaseInfo = (params) => {
    return http({
        url: "/amiyabg/CompanyBaseInfo/list",
        method: "get",
        params,
    });
};

// 添加公司信息  post
export const addCompanyBaseInfo = (data) => {
    return http({
        url: "/amiyabg/CompanyBaseInfo",
        method: "post",
        data
    });
};
// 根据编号获取公司信息
export const byIdCompanyBaseInfo = (id) => {
    return http({
        url: `/amiyabg/CompanyBaseInfo/getById/${id}`,
        method: "get",
    });
};
// 修改公司信息   put
export const updateCompanyBaseInfo = (data) => {
    return http({
        url: `/amiyabg/CompanyBaseInfo`,
        method: "put",
        data
    });
};

// 删除公司信息  delete
export const deleteCompanyBaseInfo = (id) => {
    return http({
        url: `/amiyabg/CompanyBaseInfo/${id}`,
        method: "delete",
    });
};
// 获取公司名称列表
export const getCompanyBaseInfoNameList = () => {
    return http({
        url: "/amiyabg/CompanyBaseInfo/nameList",
        method: "get",
    });
};