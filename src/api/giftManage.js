import http from "../http/http";

/**
 * giftList
 */

// 获取礼品列表（分页）
export const getGiftlist = (params) => {
    return http({
        url: "/amiyabg/Gift/listWithPage",
        method: "get",
        params,
    });
};

// 添加礼品
export const addGift = (data) => {
    return http({
        url: "/amiyabg/Gift",
        method: "post",
        data,
    });
};

// 修改礼品信息  put
export const editGift = (data) => {
    return http({
        url: "/amiyabg/Gift",
        method: "put",
        data,
    });
};

// 根据礼品编号获取礼品信息
export const byIdGetGiftInfo = (id) => {
    return http({
        url: `/amiyabg/Gift/byId/${id}`,
        method: "get",
    });
};

// 根据礼品编号获取礼品信息
export const deleteGift = (id) => {
    return http({
        url: `/amiyabg/Gift/${id}`,
        method: "delete",
    });
};

/**
 * receiveGiftList
 */

// 获取领取礼品列表（分页）
export const getReceiveGiftList = (params) => {
    return http({
        url: "/amiyabg/Gift/receiveGiftList",
        method: "get",
        params,
    });
};

// 礼品发货   post
export const giftDelivery = (data) => {
    return http({
        url: `/amiyabg/Gift/sendGoods`,
        method: "post",
        data,
    });
};

// 修改收货地址  put
export const editAddress = (data) => {
    return http({
        url: `/amiyabg/Gift/address`,
        method: "put",
        data,
    });
};

// 获取物流公司id和名称（下拉框使用） 
export const getLogisticsCompany = () => {
    return http({
        url: `/amiyabg/ExpressManage/getExpressList`,
        method: "get",
    });
};
// 导出领取礼品列表
export const exportReceiveGiftList = (params) => {
    return http({
        url: "/amiyabg/Gift/exportReceiveGiftList",
        method: "get",
        params,
        responseType: 'blob'
    });
};