import http from "../http/http";

/**
 * 商品分类
 */

// 获取商品分类列表
export const getGoodsCategoryList = (params) => {
    return http({
        url: "/amiyabg/GoodsCategory/list",
        method: "get",
        params,
    });
};

// 添加商品分类   post
export const addGoodsCategory = (data) => {
    return http({
        url: "/amiyabg/GoodsCategory",
        method: "post",
        data,
    });
};

// 根据编号获取商品分类信息
export const byIdGetGoodsCategory = (id) => {
    return http({
        url: `/amiyabg/GoodsCategory/${id}`,
        method: "get",
    });
};

// 修改商品分类    put
export const modifyGoodsCategory = (data) => {
    return http({
        url: "/amiyabg/GoodsCategory",
        method: "put",
        data,
    });
};

// 删除商品分类   delete
export const deleteGoodsCategory = (id) => {
    return http({
        url: `/amiyabg/GoodsCategory/${id}`,
        method: "delete",
    });
};
// 获取展示方向
export const getexchangeTypeList = () => {
    return http({
        url: "/amiyabg/GoodsCategory/exchangeTypeList",
        method: "get"
    });
};
// 置顶/置底
export const topToBottomClass = (data) => {
    return http({
        url: "/amiyabg/GoodsCategory/movetopordown",
        method: "put",
        data,
    });
};
// 向上/向下
export const moveUpAndDown = (data) => {
    return http({
        url: "/amiyabg/GoodsCategory/move",
        method: "put",
        data,
    });
};
/**
 * 商品
 */

// 获取所有商品列表
export const getGoodsInfoList = (params) => {
    return http({
        url: "/amiyabg/GoodsInfo/list",
        method: "get",
        params,
    });
};

// 获取所有的分类名称列表
export const getAllGoodsCategory = () => {
    return http({
        url: "/amiyabg/GoodsCategory/allNameList",
        method: "get",
    });
};

// 获取有效的分类名称列表
export const getValidGoodsCategory = () => {
    return http({
        url: "/amiyabg/GoodsCategory/validNameList",
        method: "get",
    });
};

// 获取交易类型列表
export const getExchangeTypeList = () => {
    return http({
        url: "/amiyabg/GoodsInfo/exchangeTypeList",
        method: "get",
    });
};

// 添加商品信息    post
export const addGoodsInfo = (data) => {
    return http({
        url: "/amiyabg/GoodsInfo",
        method: "post",
        data,
    });
};

// 根据编号获取商品信息
export const byIdGetGoodsInfo = (id) => {
    return http({
        url: `/amiyabg/GoodsInfo/${id}`,
        method: "get",
    });
};

// 修改商品信息    post
export const modifyGoodsInfo = (data) => {
    return http({
        url: "/amiyabg/GoodsInfo",
        method: "put",
        data,
    });
};

// 城市选择
export const getcityList = () => {
    return http({
        url: "/amiyabg/CooperativeHospitalCity/allList",
        method: "get"
    });
};

// 选择医院、门店
export const getHospitalnameList = () => {
    return http({
        url: "/amiyabg/HospitalInfo/nameList",
        method: "get"
    });
};