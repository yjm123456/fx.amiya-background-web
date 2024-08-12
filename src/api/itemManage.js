import http from "../http/http";

// 获取项目列表 （分页）
export const ItemInfo = (params) => {
    return http({
        url: "/amiyabg/ItemInfo/listWithPage",
        method: "get",
        params
    });
};

// 添加项目
export const addItemInfo = (data) => {
    return http({
        url: "/amiyabg/ItemInfo/add",
        method: "post",
        data
    });
};

// 根据项目编号获取项目信息
export const byIdGetItemInfo = (id) => {
    return http({
        url: `/amiyabg/ItemInfo/byId/${id}`,
        method: "get",
    });
};

// 修改项目信息
export const updateItemInfo = (data) => {
    return http({
        url: `/amiyabg/ItemInfo`,
        method: "put",
        data
    });
};

// 根据项目编号删除项目信息
export const deleteItemInfo = (id) => {
    return http({
        url: `/amiyabg/ItemInfo/${id}`,
        method: "delete",
    });
};
// 获取科室 
export const getDepartment = () => {
    return http({
        url: `/amiyabg/AmiyaHospitalDepartment/getAmiyaHospitalDepartmentList`,
        method: "get",
    });
};
// 导入带货商品列表
export const importItemInfo = (data) => {
    return http({
        url: `/amiyabg/ItemInfo/import`,
        method: "put",
        data,
    });
};