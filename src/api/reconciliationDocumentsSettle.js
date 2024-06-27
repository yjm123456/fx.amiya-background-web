import http from "../http/http";

// 获取对账单审核记录（分页）
export const getReconciliationDocumentsSettle = (params) => {
    return http({
        url: "/amiyabg/ReconciliationDocumentsSettle/list",
        method: "get",
        params
    });
};
// 导出领取礼品列表
export const exportReconciliationDocumentsDetails = (params) => {
    return http({
        url: "/amiyabg/ReconciliationDocumentsSettle/ExportReconciliationDocumentsDetails",
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 分页获取对账单审核记录（助理薪资审核相关数据）
export const getListWithPageByCustomerCompensation = (params) => {
    return http({
        url: "/amiyabg/ReconciliationDocumentsSettle/GetListWithPageByCustomerCompensation",
        method: "get",
        params
    });
};
// 审核助理薪资
export const checkReconciliationDocumentsSettle = (data) => {
    return http({
        url: "/amiyabg/ReconciliationDocumentsSettle/CheckReconciliationDocumentsSettle",
        method: "put",
        data
    });
};
// 获取上传人名称列表
export const createEmpNameList = () => {
    return http({
        url: "/amiyabg/ReconciliationDocumentsSettle/createEmpNameList",
        method: "get",
    });
};
// 获取薪资审核类型列表
export const geReconciliationtCheckType = () => {
    return http({
        url: "/amiyabg/ReconciliationDocumentsSettle/geReconciliationtCheckType",
        method: "get",
    });
};
// 分页获取稽查业绩对账单审核记录（助理薪资审核相关数据）
export const getListWithPageByCustomerInspectData = (params) => {
    return http({
        url: "/amiyabg/ReconciliationDocumentsSettle/getListWithPageByCustomerInspectData",
        method: "get",
        params
    });
};
// 批量审核助理薪资
export const batchCheckReconciliationDocumentsSettle = (data) => {
    return http({
        url: "/amiyabg/ReconciliationDocumentsSettle/batchCheckReconciliationDocumentsSettle",
        method: "put",
        data
    });
};
// 批量审核财务稽查数据
export const batchCheckFinanceReconciliationDocumentsSettle = (data) => {
    return http({
        url: "/amiyabg/ReconciliationDocumentsSettle/batchCheckFinanceReconciliationDocumentsSettle",
        method: "put",
        data
    });
};
// 批量审核合作达人数据
export const batchCheckCooperationLiveAnchorsReconciliationDocumentsSettle = (data) => {
    return http({
        url: "/amiyabg/ReconciliationDocumentsSettle/batchCheckCooperationLiveAnchorsReconciliationDocumentsSettle",
        method: "put",
        data
    });
};