import http from "../http/http";

// 获取抵用券名称列表
export const getConsumptionVoucherNameList = () => {
    return http({
        url: "/amiyabg/api/ConsumptionVoucher/nameList",
        method: "get",
    });
};

// 根据抵用券列表（分页）
export const getConsumptionVoucher = (params) => {
    return http({
        url: "/amiyabg/api/ConsumptionVoucher/list",
        method: "get",
        params
    });
};

// 添加抵用券
export const AddConsumptionVoucher = (data) => {
    return http({
        url: "/amiyabg/api/ConsumptionVoucher",
        method: "post",
        data
    });
};

// 修改抵用券
export const EditConsumptionVoucher = (data) => {
    return http({
        url: "/amiyabg/api/ConsumptionVoucher",
        method: "put",
        data
    });
};

// 获取抵用券类型列表
export const getConsumptionVoucherTypeList = () => {
    return http({
        url: "/amiyabg/api/ConsumptionVoucher/consumptionVoucherTypeList",
        method: "get",
    });
};
// 根据抵用券id获取抵用券信息
export const byIdConsumptionVoucher = (voucherId) => {
    return http({
        url: `/amiyabg/api/ConsumptionVoucher/byId/${voucherId}`,
        method: "get"
    });
};