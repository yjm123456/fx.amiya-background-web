import http from "../http/http";

// 获取小黄车登记信息列表（分页）
export const shoppingCartRegistrationList = (params) => {
    return http({
        url: "/amiyabg/ShoppingCartRegistration/listWithPage",
        method: "get",
        params
    });
};

// 添加小黄车登记信息
export const addShoppingCartRegistration = (data) => {
    return http({
        url: `/amiyabg/ShoppingCartRegistration`,
        method: "post",
        data,
    });
};

// 修改小黄车登记信息
export const editShoppingCartRegistration = (data) => {
    return http({
        url: `/amiyabg/ShoppingCartRegistration`,
        method: "put",
        data,
    });
};
// 根据小黄车登记编号获取小黄车登记信息
export const byIdShoppingCartRegistration = (id) => {
    return http({
        url: `/amiyabg/ShoppingCartRegistration/byId/${id}`,
        method: "get",
    });
};
export const detelShoppingCartRegistration = (id) => {
    return http({
        url: `/amiyabg/ShoppingCartRegistration/${id}`,
        method: "delete",
    });
};
// 紧急程度列表下拉框
export const emergencyLevels = () => {
    return http({
        url: "/amiyabg/ShoppingCartRegistration/emergencyLevels",
        method: "get",
    });
};
// 指派给
export const ShoppingCartRegistrationAssign = (data) => {
    return http({
        url: `/amiyabg/ShoppingCartRegistration/assign`,
        method: "put",
        data,
    });
};
// 批量指派给
export const ShoppingCartRegistrationassignList = (data) => {
    return http({
        url: `/amiyabg/ShoppingCartRegistration/assignList`,
        method: "put",
        data,
    });
};