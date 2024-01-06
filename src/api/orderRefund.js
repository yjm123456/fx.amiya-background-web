import http from "../http/http";

// 获取退款订单列表
export const getOrderRefund = (params) => {
    return http({
        url: "/amiyabg/api/OrderRefund/listWithPage",
        method: "get",
        params
    });
};

// 获取审核状态下拉框
export const getCheckStateList = () => {
    return http({
        url: "/amiyabg/api/OrderRefund/getCheckStateList",
        method: "get",
    });
};
// 获取退款状态下拉框
export const getRefundStateList = () => {
    return http({
        url: "/amiyabg/api/OrderRefund/getRefundStateList",
        method: "get",
    });
};
// 订单退款审核
export const OrderRefundCheck = (data) => {
    return http({
        url: "/amiyabg/api/OrderRefund/check",
        method: "post",
        data
    });
};
// 订单退款
export const WechatPay = (id) => {
    return http({
        url: `/amiyabg/WechatPay/wechatRefund/${id}`,
        method: "post",
    });
};