import http from "../http/http";

// 根据条件获取发票信息
export const getBillList = (params) => {
    return http({
        url: "/amiyabg/Bill/listWithPage",
        method: "get",
        params
    });
};
// 添加发票  post
export const addBill = (data) => {
    return http({
        url: "/amiyabg/Bill/add",
        method: "post",
        data
    });
};
// 根据编号获取发票
export const byIdBill = (id) => {
    return http({
        url: `/amiyabg/Bill/byId/${id}`,
        method: "get",
    });
};
// 修改发票   put
export const updateBill = (data) => {
    return http({
        url: `/amiyabg/Bill`,
        method: "put",
        data
    });
};

// 删除发票  delete
export const deleteBill = (id) => {
    return http({
        url: `/amiyabg/Bill/${id}`,
        method: "delete",
    });
};
// 发票回款
export const returnBakcPriceAsync = (data) => {
    return http({
        url: `/amiyabg/Bill/returnBakcPriceAsync`,
        method: "put",
        data
    });
};
// 发票类型下拉框
export const getBillTypeList = () => {
    return http({
        url: "/amiyabg/Bill/billTypeList",
        method: "get",
    });
};
// 票据回款状态下拉框
export const billReturnBackStateList = () => {
    return http({
        url: "/amiyabg/Bill/billReturnBackStateList",
        method: "get",
    });
};
// 根据条件获取发票回款记录信息
export const getBillReturnBackPriceData = (params) => {
    return http({
        url: "/amiyabg/BillReturnBackPriceData/listWithPage",
        method: "get",
        params
    });
};
// 根据条件导出发票回款记录信息
export const exportBillReturnBackPriceDataList = (params) => {
    return http({
        url: "/amiyabg/BillReturnBackPriceData/exportBillReturnBackPriceDataList",
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 根据条件导出发票回款记录信息
export const exportBillList = (params) => {
    return http({
        url: "/amiyabg/Bill/exportBillList",
        method: "get",
        params,
        responseType: 'blob'
    });
};