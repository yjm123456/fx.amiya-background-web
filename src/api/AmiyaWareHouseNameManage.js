import http from "../http/http";
/**
 * 仓库名称
 */
// 获取仓库名称管理信息列表（分页）
export const AmiyaWareHouseNameManage = (params) => {
    return http({
        url: "/amiyabg/AmiyaWareHouseNameManage/listWithPage",
        method: "get",
        params
    });
};

// 添加仓库名称管理信息
export const addAmiyaWareHouseNameManage = (data) => {
    return http({
        url: "/amiyabg/AmiyaWareHouseNameManage",
        method: "post",
        data
    });
};
// 编辑仓库名称管理信息
export const editAmiyaWareHouseNameManage = (data) => {
    return http({
        url: "/amiyabg/AmiyaWareHouseNameManage",
        method: "put",
        data
    });
};
// 删除仓库名称
export const deleteAmiyaWareHouseNameManage = (id) => {
    return http({
        url: `/amiyabg/AmiyaWareHouseNameManage/${id}`,
        method: "delete",
    });
};
// 根据仓库名称管理编号获取仓库名称管理信息
export const byIdAmiyaWareHouseNameManage = (id) => {
    return http({
        url: `/amiyabg/AmiyaWareHouseNameManage/byId/${id}`,
        method: "get"
    });
};
// 获取仓库名称  （下拉框）
export const getIdAndName = () => {
    return http({
        url: "/amiyabg/AmiyaWareHouseNameManage/getIdAndName",
        method: "get",
    });
};
/**
 * 库存管理
 */
// 获取库存管理信息列表（分页）
export const AmiyaWareHouse = (params) => {
    return http({
        url: "/amiyabg/AmiyaWareHouse/listWithPage",
        method: "get",
        params
    });
};
// 添加库存管理信息
export const addAmiyaWareHouse = (data) => {
    return http({
        url: "/amiyabg/AmiyaWareHouse",
        method: "post",
        data
    });
};
// 编辑库存管理信息
export const editAmiyaWareHouse = (data) => {
    return http({
        url: "/amiyabg/AmiyaWareHouse/update",
        method: "put",
        data
    });
};
// 删除库存
export const deleteAmiyaWareHouse = (id) => {
    return http({
        url: `/amiyabg/AmiyaWareHouse/${id}`,
        method: "delete",
    });
};
// 根据库存管理编号获取库存管理信息
export const byIdAmiyaWareHouse = (id) => {
    return http({
        url: `/amiyabg/AmiyaWareHouse/byId/${id}`,
        method: "get"
    });
};
// 入库
export const InWareHouse = (data) => {
    return http({
        url: "/amiyabg/AmiyaWareHouse/InWareHouse",
        method: "put",
        data
    });
};
// 出库
export const OutWareHouse = (data) => {
    return http({
        url: "/amiyabg/AmiyaWareHouse/OutWareHouse",
        method: "put",
        data
    });
};
// 盘库
export const InventoryWareHouse = (data) => {
    return http({
        url: "/amiyabg/AmiyaWareHouse/InventoryWareHouse",
        method: "put",
        data
    });
};
// 获取盘库管理信息列表（分页）
export const InventoryList = (params) => {
    return http({
        url: "/amiyabg/InventoryList/listWithPage",
        method: "get",
        params
    });
};
// 入库列表
export const AmiyaInWarehouseList = (params) => {
    return http({
        url: "/amiyabg/AmiyaInWarehouse/listWithPage",
        method: "get",
        params
    });
};
// 出库列表
export const AmiyaOutWarehouseList = (params) => {
    return http({
        url: "/amiyabg/AmiyaOutWarehouse/listWithPage",
        method: "get",
        params
    });
};
// 库存列表导出
export const AmiyaWareHouseExport = (params) => {
    return http({
        url: "/amiyabg/AmiyaWareHouse/AmiyaWareHouseExport",
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 入库导出
export const AmiyaInWareHouseExport = (params) => {
    return http({
        url: "/amiyabg/AmiyaInWarehouse/AmiyaInWareHouseExport",
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 出库导出
export const AmiyaOutWareHouseExport = (params) => {
    return http({
        url: "/amiyabg/AmiyaOutWarehouse/AmiyaOutWareHouseExport",
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 盘库导出
export const InventoryListExport = (params) => {
    return http({
        url: "/amiyabg/InventoryList/InventoryListExport",
        method: "get",
        params,
        responseType: 'blob'
    });
};