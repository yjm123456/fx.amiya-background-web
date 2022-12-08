import http from "../http/http";

// 获取客户消费凭证信息列表（分页）
export const getCustomerConsumptionCredentials = (params) => {
    return http({
        url: "/amiyabg/CustomerConsumptionCredentials/listWithPage",
        method: "get",
        params
    });
};

// 审核客户消费凭证信息
export const customerConsumptionCredentials = (data) => {
    return http({
        url: "/amiyabg/CustomerConsumptionCredentials",
        method: "put",
        data
    });
};