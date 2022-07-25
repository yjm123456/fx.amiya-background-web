import http from "../http/http";

// 获取主播基础信息列表
export const getLiveAnchorBaseInfo = (params) => {
    return http({
        url: "/amiyabg/LiveAnchorBaseInfo/list",
        method: "get",
        params,
    });
};

// 添加主播基础信息账号
export const addLiveAnchorBaseInfo = (data) => {
    return http({
        url: "/amiyabg/LiveAnchorBaseInfo",
        method: "post",
        data,
    });
};

// 修改主播基础信息账号信息  put
export const editLiveAnchorBaseInfo = (data) => {
    return http({
        url: "/amiyabg/LiveAnchorBaseInfo",
        method: "put",
        data,
    });
};

// 根据编号获取主播基础信息账号
export const byIdGetLiveAnchorBaseInfoInfo = (id) => {
    return http({
        url: `/amiyabg/LiveAnchorBaseInfo/byId/${id}`,
        method: "get",
    });
};

// 删除主播基础信息
export const deleteLiveAnchorBaseInfo = (id) => {
    return http({
        url: `/amiyabg/LiveAnchorBaseInfo/${id}`,
        method: "delete",
    });
};
// 获取有效的主播基础信息列表
export const getLiveAnchorBaseInfoValid = (params) => {
    return http({
        url: "/amiyabg/LiveAnchorBaseInfo/valid",
        method: "get",
        params,
    });
};