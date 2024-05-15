import http from "../http/http";
// 获取健康值列表（分页）  get
export const getHealthValueList = (params) => {
    return http({
        url: "/amiyabg/HealthValue/list",
        method: "get",
        params,
    });
};

// 添加健康值  post
export const addHealthValue = (data) => {
    return http({
        url: "/amiyabg/HealthValue",
        method: "post",
        data
    });
};
// 根据编号获取健康值
export const byIdTrack = (id) => {
    return http({
        url: `/amiyabg/HealthValue/getById/${id}`,
        method: "get",
    });
};
// 修改健康值   put
export const updateHealthValue = (data) => {
    return http({
        url: `/amiyabg/HealthValue`,
        method: "put",
        data
    });
};

// 删除健康值  delete
export const deleteHealthValue = (params) => {
    return http({
        url: `/amiyabg/HealthValue`,
        method: "delete",
        params
    });
};
// 获取健康值列表（分页）  get
export const getHealthValid = (params) => {
    return http({
        url: "/amiyabg/HealthValue/valid",
        method: "get",
        params,
    });
};