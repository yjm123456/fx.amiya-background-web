import http from "../http/http";
// 获取供应商商品品类列表（分页）  get
export const getSupplierCategory = (params) => {
    return http({
        url: "/amiyabg/SupplierCategory/listWithPage",
        method: "get",
        params,
    });
};

// 添加供应商商品品类  post
export const addSupplierCategory = (data) => {
    return http({
        url: "/amiyabg/SupplierCategory",
        method: "post",
        data
    });
};
// 根据编号获取供应商商品品类
export const byIdSupplierCategory = (id) => {
    return http({
        url: `/amiyabg/SupplierCategory/byId/${id}`,
        method: "get",
    });
};
// 修改供应商商品品类   put
export const updateSupplierCategory = (data) => {
    return http({
        url: `/amiyabg/SupplierCategory/update`,
        method: "put",
        data
    });
};

// 删除供应商商品品类  delete
export const deleteSupplierCategory = (id) => {
    return http({
        url: `/amiyabg/SupplierCategory/${id}`,
        method: "delete",
    });
};
// 根据供应商商品品类id获取供应商品类
export const getSupplierCategoryListByBrandId = (params) => {
    return http({
        url: "/amiyabg/SupplierCategory/getSupplierCategoryListByBrandId",
        method: "get",
        params
    });
};