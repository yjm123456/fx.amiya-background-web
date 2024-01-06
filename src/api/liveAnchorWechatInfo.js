import http from "../http/http";


// 获取主播微信账号列表
export const getLiveAnchorWechatInfo = (params) => {
    return http({
        url: "/amiyabg/LiveAnchorWechatInfo/list",
        method: "get",
        params,
    });
};

// 添加主播微信账号
export const addLiveAnchorWechatInfo = (data) => {
    return http({
        url: "/amiyabg/LiveAnchorWechatInfo",
        method: "post",
        data,
    });
};

// 修改主播微信账号信息  put
export const editLiveAnchorWechatInfo = (data) => {
    return http({
        url: "/amiyabg/LiveAnchorWechatInfo",
        method: "put",
        data,
    });
};

// 根据编号获取主播微信账号
export const byIdGetLiveAnchorWechatInfoInfo = (id) => {
    return http({
        url: `/amiyabg/LiveAnchorWechatInfo/byId/${id}`,
        method: "get",
    });
};

// 删除主播微信号
export const deleteLiveAnchorWechatInfo = (id) => {
    return http({
        url: `/amiyabg/LiveAnchorWechatInfo/${id}`,
        method: "delete",
    });
};

// 获取有效的主播微信账号列表
export const getLiveAnchorWechatInfoValid = () => {
    return http({
        url: "/amiyabg/LiveAnchorWechatInfo/valid",
        method: "get",
    });
};
//根据主播获取有效的主播微信账号列表
export const getvalidList = (params) => {
    return http({
        url: "/amiyabg/LiveAnchorWechatInfo/validList",
        method: "get",
        params,
    });
};