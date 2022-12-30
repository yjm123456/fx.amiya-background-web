import http from "../http/http";

// 获取财务对账单信息列表（分页）（管理员和医院端公用）
export const getReconciliationDocuments = (params) => {
    return http({
        url: "/amiyabg/ReconciliationDocuments/list",
        method: "get",
        params
    });
};
// 添加财务对账单信息（机构端）
export const addReconciliationDocuments = (data) => {
    return http({
        url: "/amiyabg/ReconciliationDocuments",
        method: "post",
        data
    });
};
// 编辑财务对账单信息（机构端）
export const editReconciliationDocuments = (data) => {
    return http({
        url: "/amiyabg/ReconciliationDocuments",
        method: "put",
        data
    });
};
// 根据财务对账单编号获取对账单信息（管理员和机构端公用）
export const byIdReconciliationDocuments = (id) => {
    return http({
        url: `/amiyabg/ReconciliationDocuments/byId/${id}`,
        method: "get",
    });
};
// 标记对账单状态（管理员端和机构端）
export const tagReconciliationState = (data) => {
    return http({
        url: "/amiyabg/ReconciliationDocuments/tagReconciliationState",
        method: "put",
        data
    });
};
// 删除财务对账单信息（机构端）
export const deleteReconciliationDocuments = (data) => {
    return http({
        url: `/amiyabg/ReconciliationDocuments`,
        method: "delete",
        data
    });
};
// 财务对账单模版导出（机构）
export const exportReconciliationDocuments = (params) => {
    return http({
        url: "/amiyabg/ReconciliationDocuments/exportReconciliationDocuments",
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 导入财务对账单（机构）
export const importReconciliationDocuments = (data) => {
    return http({
        url: "/amiyabg/ReconciliationDocuments/importReconciliationDocuments",
        method: "put",
        data
    });
};
// 批量回款
export const reconciliationReturnBackPriceList = (data) => {
    return http({
        url: "/amiyabg/ReconciliationDocuments/reconciliationReturnBackPriceList",
        method: "put",
        data
    });
};
// 根据对账单id查看成交单
export const getContentPlatFormOrderDealInfoByReconciliationDocumentsId = (params) => {
    return http({
        url: "/amiyabg/ContentPlatFormOrderDealInfo/getContentPlatFormOrderDealInfoByReconciliationDocumentsId",
        method: "get",
        params
    });
};