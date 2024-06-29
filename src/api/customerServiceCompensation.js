import http from "../http/http";
// 获取助理薪资单列表  分页
export const getCustomerServiceCompensation = (params) => {
    return http({
        url: `/amiyabg/CustomerServiceCompensation/listWithPage`,
        method: "get",
        params,
    });
};
// 添加助理薪资单信息
export const addCustomerServiceCompensation = (data) => {
    return http({
        url: `/amiyabg/CustomerServiceCompensation/add`,
        method: "post",
        data,
    });
};
// 修改助理薪资单信息/api/Permission/byId/{id}
export const editCustomerServiceCompensation = (data) => {
    return http({
        url: `/amiyabg/CustomerServiceCompensation`,
        method: "put",
        data,
    });
};
//   根据助理薪资单编号获取助理薪资单信息/api/
export const byIdCustomerServiceCompensation = (id) => {
    return http({
        url: `/amiyabg/CustomerServiceCompensation/byId/${id}`,
        method: "get",
    });
};
// 根据id删除助理薪资单   delete
export const deleteCustomerServiceCompensation = (id) => {
    return http({
        url: `/amiyabg/CustomerServiceCompensation/${id}`,
        method: "delete",
    });
};

// 根据派单人和派单时间获取供应链达人派单和上门数据
export const getCooperationLiveAnchorSendAndVisitNum = (params) => {
    return http({
        url: `/amiyabg/ContentPlateFormOrder/getCooperationLiveAnchorSendAndVisitNum`,
        method: "get",
        params,
    });
};
// 根据创建人和登记时间获取医美/带货客资加v量
export const getAddWechatNumByCreateEmpInfoAndDate = (params) => {
    return http({
        url: `/amiyabg/ShoppingCartRegistration/getAddWechatNumByCreateEmpInfoAndDate`,
        method: "get",
        params,
    });
};
// 获取助理目标完成率和新客上门人数
export const getNewCustomerToHospiatlAndTargetComplete = (params) => {
    return http({
        url: `/amiyabg/ReconciliationDocumentsSettle/getNewCustomerToHospiatlAndTargetComplete`,
        method: "get",
        params,
    });
};