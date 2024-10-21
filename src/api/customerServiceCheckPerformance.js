import http from "../http/http";
// 获取助理提取业绩列表（分页）  get
export const getCustomerServiceCheckPerformance = (params) => {
    return http({
        url: "/amiyabg/CustomerServiceCheckPerformance/listWithPage",
        method: "get",
        params,
    });
};

// 添加助理提取业绩  post
export const addCustomerServiceCheckPerformance = (data) => {
    return http({
        url: "/amiyabg/CustomerServiceCheckPerformance/add",
        method: "post",
        data
    });
};
// 根据编号获取助理提取业绩
export const byIdCustomerServiceCheckPerformance = (id) => {
    return http({
        url: `/amiyabg/CustomerServiceCheckPerformance/byId/${id}`,
        method: "get",
    });
};
// 修改助理提取业绩   put
export const updateCustomerServiceCheckPerformance = (data) => {
    return http({
        url: `/amiyabg/CustomerServiceCheckPerformance`,
        method: "put",
        data
    });
};

// 删除助理提取业绩  delete
export const deleteCustomerServiceCheckPerformance = (id) => {
    return http({
        url: `/amiyabg/CustomerServiceCheckPerformance/${id}`,
        method: "delete",
    });
};