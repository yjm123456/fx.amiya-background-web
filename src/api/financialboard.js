import http from "../http/http";

// 医院维度
export const getHospitalBoard = (params) => {
    return http({
        url: "/amiyabg/Financialboard/hospitalBoard",
        method: "get",
        params
    });
};

// 子公司维度
export const getSubsidiaryBoard = (params) => {
    return http({
        url: "/amiyabg/Financialboard/subsidiaryBoard",
        method: "get",
        params
    });
};
// 主播业绩
export const getLiveAnchorBoardData = (data) => {
    return http({
        url: "/amiyabg/Financialboard/liveAnchorBoardData",
        method: "post",
        data
    });
};
// 客服录入成交单业绩
export const getCustomerServiceBoardData = (params) => {
    return http({
        url: "/amiyabg/Financialboard/customerServiceBoardData",
        method: "get",
        params
    });
};
// 归属客服业绩
export const customerServiceBelongBoardData = (params) => {
    return http({
        url: "/amiyabg/Financialboard/customerServiceBelongBoardData",
        method: "get",
        params
    });
};
// 医院对账业绩
export const hospitalDealPriceBoard = (params) => {
    return http({
        url: "/amiyabg/Financialboard/hospitalDealPriceBoard",
        method: "get",
        params
    });
};