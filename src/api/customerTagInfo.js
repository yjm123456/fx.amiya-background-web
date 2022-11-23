import http from "../http/http";

// 获取客户标签信息列表（分页）
export const getCustomerTagInfo = (params) => {
    return http({
        url: "/amiyabg/CustomerTagInfo/listWithPage",
        method: "get",
        params
    });
};


// 添加客户标签  post
export const addCustomerTagInfo = (data) => {
    return http({
        url: "/amiyabg/CustomerTagInfo",
        method: "post",
        data
    });
};
// 根据编号获取客户标签
export const byIdCustomerTagInfo = (id) => {
    return http({
        url: `/amiyabg/CustomerTagInfo/byId/${id}`,
        method: "get",
    });
};
// 修改客户标签   put
export const updateCustomerTagInfo = (data) => {
    return http({
        url: `/amiyabg/CustomerTagInfo`,
        method: "put",
        data
    });
};

// 删除客户标签  delete
export const deleteCustomerTagInfo = (id) => {
    return http({
        url: `/amiyabg/CustomerTagInfo/${id}`,
        method: "delete",
    });
};