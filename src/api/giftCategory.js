import http from "../http/http";


// 获取礼品分类列表（分页）
export const getGiftCategoryList = (params) => {
    return http({
        url: "/amiyabg/GiftCategory/listWithPage",
        method: "get",
        params,
    });
};

// 添加礼品分类
export const addGiftCategory = (data) => {
    return http({
        url: "/amiyabg/GiftCategory",
        method: "post",
        data,
    });
};

// 修改礼品分类信息  put
export const editGiftCategory = (data) => {
    return http({
        url: "/amiyabg/GiftCategory",
        method: "put",
        data,
    });
};

// 根据礼品分类编号获取礼品分类信息
export const byIdGiftCategory = (id) => {
    return http({
        url: `/amiyabg/GiftCategory/getById/${id}`,
        method: "get",
    });
};

// 根据礼品分类编号获取礼品信息
export const deleteGiftCategory = (id) => {
    return http({
        url: `/amiyabg/GiftCategory/${id}`,
        method: "delete",
    });
};
// 获取礼品名称列表
export const getGiftCategoryNameList = () => {
    return http({
        url: "/amiyabg/GiftCategory/nameList",
        method: "get",
    });
};