import http from "../http/http";
// 获取rfm客户列表（分页）  get
export const getListByPage = (params) => {
    return http({
        url: "/amiyabg/RFMCustomerInfo/getListByPage",
        method: "get",
        params,
    });
};

// 添加rfm客户  post
export const addRFMCustomerInfo = (data) => {
    return http({
        url: "/amiyabg/RFMCustomerInfo",
        method: "post",
        data
    });
};
// 根据编号获取rfm客户
export const byIdRFMCustomerInfo = (id) => {
    return http({
        url: `/amiyabg/RFMCustomerInfo/getById/${id}`,
        method: "get",
    });
};
// 修改rfm客户   put
export const updateRFMCustomerInfo = (data) => {
    return http({
        url: `/amiyabg/RFMCustomerInfo`,
        method: "put",
        data
    });
};

// 删除rfm客户  delete
export const deleteRFMCustomerInfo = (params) => {
    return http({
        url: `/amiyabg/RFMCustomerInfo`,
        method: "delete",
        params
    });
};
// rfm值名称列表
export const getRfmvalueNameList = (params) => {
    return http({
        url: "/amiyabg/RFMCustomerInfo/rfmvalueNameList",
        method: "get",
        params,
    });
};
// rfm值标签名称列表
export const getRfmtagNameList = (params) => {
    return http({
        url: "/amiyabg/RFMCustomerInfo/rfmtagNameList",
        method: "get",
        params,
    });
};
// 导入RFM客户信息
export const importRFMCustomerInfo = (data) => {
    return http({
        url: `/amiyabg/RFMCustomerInfo/importRFMCustomerInfo`,
        method: "put",
        data
    });
};