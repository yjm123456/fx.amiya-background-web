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