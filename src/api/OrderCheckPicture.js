import http from "../http/http";
// 获取审核照片信息列表（分页）
export const OrderCheckPicture = (params) => {
    return http({
        url: "/amiyabg/OrderCheckPicture/listWithPage",
        method: "get",
        params
    });
};