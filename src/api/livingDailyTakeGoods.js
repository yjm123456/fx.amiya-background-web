import http from "../http/http";
// 获取供应商商品列表（分页）  get
export const getLivingDailyTakeGoods = (params) => {
    return http({
        url: "/amiyabg/LivingDailyTakeGoods/listWithPage",
        method: "get",
        params,
    });
};

// 添加供应商商品  post
export const addLivingDailyTakeGoods = (data) => {
    return http({
        url: "/amiyabg/LivingDailyTakeGoods",
        method: "post",
        data
    });
};
// 根据编号获取供应商商品
export const byIdLivingDailyTakeGoods = (id) => {
    return http({
        url: `/amiyabg/LivingDailyTakeGoods/byId/${id}`,
        method: "get",
    });
};
// 修改供应商商品   put
export const updateLivingDailyTakeGoods = (data) => {
    return http({
        url: `/amiyabg/LivingDailyTakeGoods/update`,
        method: "put",
        data
    });
};

// 删除供应商商品  delete
export const deleteLivingDailyTakeGoods = (id) => {
    return http({
        url: `/amiyabg/LivingDailyTakeGoods/${id}`,
        method: "delete",
    });
};
// 根据供应商商品id获取供应商品类
export const getTakeGoodsTypeText = () => {
    return http({
        url: "/amiyabg/LivingDailyTakeGoods/getTakeGoodsTypeText",
        method: "get",
    });
};
// 根据品牌品类id获取项目id和名称
export const getItemNameByBrandIdAndCategoryId = (params) => {
    return http({
        url: "/amiyabg/ItemInfo/getItemNameByBrandIdAndCategoryId",
        method: "get",
        params
    });
};