import http from "../http/http";
// 获取供应商品项列表（分页）  get
export const getSupplierItemDetails = (params) => {
    return http({
        url: "/amiyabg/SupplierItemDetails/listWithPage",
        method: "get",
        params,
    });
};

// 添加供应商品项  post
export const addSupplierItemDetails = (data) => {
    return http({
        url: "/amiyabg/SupplierItemDetails",
        method: "post",
        data
    });
};
// 根据编号获取供应商品项
export const byIdSupplierItemDetails = (id) => {
    return http({
        url: `/amiyabg/SupplierItemDetails/byId/${id}`,
        method: "get",
    });
};
// 修改供应商品项   put
export const updateSupplierItemDetails = (data) => {
    return http({
        url: `/amiyabg/SupplierItemDetails/update`,
        method: "put",
        data
    });
};

// 删除供应商品项  delete
export const deleteSupplierItemDetails = (id) => {
    return http({
        url: `/amiyabg/SupplierItemDetails/${id}`,
        method: "delete",
    });
};
// 根据供应商品项id获取供应商品类
export const getSupplierItemDetailsListByBrandId = (params) => {
    return http({
        url: "/amiyabg/SupplierItemDetails/getSupplierItemDetailsListByBrandId",
        method: "get",
        params
    });
};