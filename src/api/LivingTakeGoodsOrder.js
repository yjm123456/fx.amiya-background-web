import http from "../http/http";
// 获取直播中带货订单列表（分页）  get
export const getLivingTakeGoodsOrder = (params) => {
    return http({
        url: "/amiyabg/LivingTakeGoodsOrder/list",
        method: "get",
        params,
    });
};

// 添加直播中带货订单  post
export const addLivingTakeGoodsOrder = (data) => {
    return http({
        url: "/amiyabg/LivingTakeGoodsOrder/add",
        method: "post",
        data
    });
};
// 根据编号获取直播中带货订单
export const byIdLivingTakeGoodsOrder = (params) => {
    return http({
        url: `/amiyabg/LivingTakeGoodsOrder/byId`,
        method: "get",
        params
    });
};
// 修改直播中带货订单   put
export const updateLivingTakeGoodsOrder = (data) => {
    return http({
        url: `/amiyabg/LivingTakeGoodsOrder/update`,
        method: "post",
        data
    });
};

// 删除直播中带货订单  delete
export const deleteLivingTakeGoodsOrder = (params) => {
    return http({
        url: `/amiyabg/LivingTakeGoodsOrder`,
        method: "delete",
        params
    });
};
// 获取订单状态列表
export const orderStatusList = () => {
    return http({
        url: `/amiyabg/LivingTakeGoodsOrder/orderStatusList`,
        method: "get",
    });
};