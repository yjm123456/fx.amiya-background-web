import http from "../http/http";

// 获取未对账订单列表（分页）
export const getUnCheckOrder = (params) => {
    return http({
        url: "/amiyabg/api/UnCheckOrder/listWithPage",
        method: "get",
        params
    });
};

// 添加未对账订单列表  post
export const addUnCheckOrder = (data) => {
    return http({
        url: "/amiyabg/api/UnCheckOrder",
        method: "post",
        data
    });
};
// 根据编号获取未对账订单列表
export const byIdUnCheckOrder = (params) => {
    return http({
        url: `/amiyabg/api/UnCheckOrder`,
        method: "get",
        params
    });
};
// 修改未对账订单列表   put
export const updateUnCheckOrder = (data) => {
    return http({
        url: `/amiyabg/api/UnCheckOrder`,
        method: "put",
        data
    });
};

// 删除未对账订单列表  delete
export const deleteUnCheckOrder = (data) => {
    return http({
        url: `/amiyabg/api/UnCheckOrder`,
        method: "delete",
        data
    });
};
// 指派医院   put
export const sendToHospital = (data) => {
    return http({
        url: `/amiyabg/api/UnCheckOrder/sendToHospital`,
        method: "put",
        data
    });
};