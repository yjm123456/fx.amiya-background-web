import http from "../http/http";
// 获取货架管理信息列表（分页）
export const AmiyaWareHouseStorageRacks = (params) => {
    return http({
        url: "/amiyabg/AmiyaWareHouseStorageRacks/listWithPage",
        method: "get",
        params
    });
};

// 添加货架管理信息
export const addAmiyaWareHouseStorageRacks = (data) => {
    return http({
        url: "/amiyabg/AmiyaWareHouseStorageRacks",
        method: "post",
        data
    });
};
// 编辑货架管理信息
export const editAmiyaWareHouseStorageRacks = (data) => {
    return http({
        url: "/amiyabg/AmiyaWareHouseStorageRacks/update",
        method: "put",
        data
    });
};
// 删除货架
export const deleteAmiyaWareHouseStorageRacks = (id) => {
    return http({
        url: `/amiyabg/AmiyaWareHouseStorageRacks/${id}`,
        method: "delete",
    });
};
// 根据货架管理编号获取货架管理信息
export const byIdAmiyaWareHouseStorageRacks = (id) => {
    return http({
        url: `/amiyabg/AmiyaWareHouseStorageRacks/byId/${id}`,
        method: "get"
    });
};
// 获取货架  （下拉框）
export const getAmiyawareHouseStorageRacks = (params) => {
    return http({
        url: "/amiyabg/AmiyaWareHouseStorageRacks/getAmiyawareHouseStorageRacks",
        method: "get",
        params
    });
};