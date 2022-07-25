import http from "../http/http";

// 获取成交情况列表
export const getContentPlatFormOrderDealInfo = (params) => {
    return http({
        url: "/amiyabg/ContentPlatFormOrderDealInfo/contentPlatFormOrderDealInfo",
        method: "get",
        params
    });
};
// 根据成交情况编号获取成交情况信息
export const byIdContentPlatFormOrderDealInfo = (id) => {
    return http({
        url: `/amiyabg/ContentPlatFormOrderDealInfo/byId/${id}`,
        method: "get",
    });
};