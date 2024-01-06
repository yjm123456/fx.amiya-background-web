import http from "../http/http";
// 获取tiktok订单列表
export const tikTokOrderLlistWithPage = (params) => {
    return http({
        url: `/amiyabg/TikTokOrder/tikTokOrderLlistWithPage`,
        method: "get",
        params
    });
};
// 用户信息解密
export const decryptUserInfo = (params) => {
    return http({
        url: `/amiyabg/TikTokOrder/decryptUserInfo`,
        method: "get",
        params
    });
};
// 根据订单号查询要补单的信息
export const repairOrder = (data) => {
    return http({
        url: "/amiyabg/TikTokOrder/repairOrder",
        method: "post",
        data,
    });
};
// 补单
export const AddOrder = (data) => {
    return http({
        url: "/amiyabg/TikTokOrder/AddOrder",
        method: "post",
        data,
    });
};