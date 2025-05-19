import http from "../http/http";

// 获取润棠运营反馈列表（分页）  get
export const RunTangDateOperationListWithPage = (params) => {
    return http({
        url: "/amiyabg/RunTangDateOperation/listWithPage",
        method: "get",
        params,
    });
};

// 添加润棠运营反馈  post
export const addRunTangDateOperation = (data) => {
    return http({
        url: "/amiyabg/RunTangDateOperation/add",
        method: "post",
        data
    });
};
// 根据编号获取润棠运营反馈
export const byIdRunTangDateOperation = (id) => {
    return http({
        url: `/amiyabg/RunTangDateOperation/byId/${id}`,
        method: "get",
    });
};
// 修改润棠运营反馈   put
export const updateRunTangDateOperation = (data) => {
    return http({
        url: `/amiyabg/RunTangDateOperation`,
        method: "put",
        data
    });
};

// 删除润棠运营反馈  delete
export const deleteRunTangDateOperation = (id) => {
    return http({
        url: `/amiyabg/RunTangDateOperation/${id}`,
        method: "delete",
    });
};