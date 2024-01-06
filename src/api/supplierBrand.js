import http from "../http/http";
// 获取供应商品牌列表（分页）  get
export const getSupplierBrand = (params) => {
    return http({
        url: "/amiyabg/SupplierBrand/listWithPage",
        method: "get",
        params,
    });
};

// 添加供应商品牌  post
export const addSupplierBrand = (data) => {
    return http({
        url: "/amiyabg/SupplierBrand",
        method: "post",
        data
    });
};
// 根据编号获取供应商品牌
export const byIdSupplierBrand = (id) => {
    return http({
        url: `/amiyabg/SupplierBrand/byId/${id}`,
        method: "get",
    });
};
// 修改供应商品牌   put
export const updateSupplierBrand = (data) => {
    return http({
        url: `/amiyabg/SupplierBrand/update`,
        method: "put",
        data
    });
};

// 删除供应商品牌  delete
export const deleteSupplierBrand = (id) => {
    return http({
        url: `/amiyabg/SupplierBrand/${id}`,
        method: "delete",
    });
};
// 根据供应商品牌id获取供应商品类
export const getSupplierBrandList = () => {
    return http({
        url: "/amiyabg/SupplierBrand/getSupplierBrandList",
        method: "get",
    });
};