import http from "../http/http";
import {
    callRecordBaseUrl
} from "../http/baseUrl";
/**
 * 客户管理
 */

// 获取绑定客服的客户列表  get
export const getBindCustomerServerList = (params) => {
    return http({
        url: "/amiyabg/Customer/bindCustomerServerList",
        method: "get",
        params
    });
};

// 获取客服姓名列表
export const getCustomerServiceList = (params) => {
    return http({
        url: "/amiyabg/AmiyaEmployee/customerServiceNameList",
        method: "get",
        params
    });
};

// 获取会员卡级别名称列表
export const getMemberRankLevelList = () => {
    return http({
        url: "/amiyabg/MemberRankInfo/nameList",
        method: "get",
    });
};

// 获取微信客户列表   get
export const getWeChatCustomerList = (params) => {
    return http({
        url: "/amiyabg/Customer/list",
        method: "get",
        params
    });
};

// 获取有效的会员等级列表  get
export const getMemberRankInfoList = () => {
    return http({
        url: "/amiyabg/MemberRankInfo/validList",
        method: "get"
    });
};

// 手动发放会员卡   post
export const sendMemberCard = (data) => {
    return http({
        url: "/amiyabg/MemberCard/issue",
        method: "post",
        data
    });
};
// 根据加密电话号获取客户基础信息    get
export const getBaseInfoByEncryptPhone = (params) => {
    return http({
        url: "/amiyabg/Customer/baseInfoByEncryptPhone",
        method: "get",
        params
    });
};


/**
 * 电话录音
 */

// 根据员工编号获取电话记录
export const byEmployeeIdGetCallRecords = (params) => {
    return http({
        url: `${callRecordBaseUrl}/CallRecords/byEmployeeId`,
        method: "get",
        params
    });
};

// 获取已追踪回访记录（分页）
export const getAlreadyReturnVisitList = (params) => {
    return http({
        url: "/amiyabg/Track/recordListWithPage",
        method: "get",
        params,
    });
};

// 获取待追踪回访列表（分页）
export const getstayReturnVisitList = (params) => {
    return http({
        url: "/amiyabg/Track/waitTrackListWithPage",
        method: "get",
        params,
    });
};

// 根据通话编号集合获取通话记录列表  post
export const byIdGetCallRecords = (data) => {
    return http({
        url: `${callRecordBaseUrl}/CallRecords/getListByIds`,
        method: "post",
        data,
    });
};

/**
 * 医院获取客户列表
 */

// 医院获取客户列表
export const hospitalGetCustomerList = (params) => {
    return http({
        url: "/amiyabg/Customer/listOfHospital",
        method: "get",
        params,
    });
};

// 编辑客户基础信息   put
export const editCustomerBaseInfo = (data) => {
    return http({
        url: `/amiyabg/Customer/baseInfo`,
        method: "put",
        data,
    });
};

// 医院根据加密电话获取派给该医院的订单列表
export const hospitalByEncryptPhoneGetSendHospitalOrders = (params) => {
    return http({
        url: "/amiyabg/SendOrderInfo/customerHospitalOrders",
        method: "get",
        params,
    });
};

// 添加客户在医院的消费信息   post
export const addCustomerHospitalConsume = (data) => {
    return http({
        url: `/amiyabg/CustomerHospitalConsume`,
        method: "post",
        data,
    });
};

// 根据加密电话获取客户消费追踪列表  get
export const byEncryptPhoneGetCustomerConsumptionTrackList = (params) => {
    return http({
        url: "/amiyabg/CustomerHospitalConsume/listByEncryptPhone",
        method: "get",
        params,
    });
};
// 医院端 医院客户列表 接单客户（所有客户）
export const allCustomerListWithPage = (params) => {
    return http({
        url: "/amiyabg/HospitalCustomer/allCustomerListWithPage",
        method: "get",
        params,
    });
};
// 医院端 医院客户列表 我的客户
export const myFollowListWithPage = (params) => {
    return http({
        url: "/amiyabg/HospitalCustomer/myFollowListWithPage",
        method: "get",
        params,
    });
};
// 医院端 医院客户列表 （待查重客户，重单客户）
export const waitingConfirmCustomerHospital = (params) => {
    return http({
        url: "/amiyabg/ContentPlateFormSendOrder/waitingConfirmCustomerHospital",
        method: "get",
        params,
    });
};
/**
 * 客户消费追踪
 */

// 获取所有医院名称列表
export const getAllHospitalList = (params) => {
    return http({
        url: `/amiyabg/HospitalInfo/allNameList`,
        method: "get",
        params,
    });
};

// 获取客户消费追踪列表
export const getCustomerHospitalConsume = (params) => {
    return http({
        url: `/amiyabg/CustomerHospitalConsume/list`,
        method: "get",
        params,
    });
};
//客户消息追踪  添加 
export const customerManageAdd = (data) => {
    return http({
        url: `/amiyabg/CustomerHospitalConsume/customerManageAdd`,
        method: "post",
        data,
    });
};
// 客户消息追踪 删除/amiyabg​/CustomerHospitalConsume
export const deleteCustomerHospitalConsume = (params) => {
    return http({
        url: "/amiyabg/CustomerHospitalConsume",
        method: "delete",
        params
    });
};
// 根据id去获取客户消息追踪信息
export const byCustomerHospitalConsume = (id) => {
    return http({
        url: `/amiyabg/CustomerHospitalConsume/byId/${id}`,
        method: "get",
    });
};
// 客户消息追踪编辑/amiyabg​/CustomerHospitalConsume​/customerManageUpdate
export const editCustomerManageUpdate = (data) => {
    return http({
        url: `/amiyabg/CustomerHospitalConsume/customerManageUpdate`,
        method: "put",
        data,
    });
};

// 获取升单类型
export const appTypeList = () => {
    return http({
        url: `/amiyabg/CustomerHospitalConsume/appTypeList`,
        method: "get",
    });
};
//导入消息追踪信息
export const customerManageInPort = (data) => {
    return http({
        url: `/amiyabg/CustomerHospitalConsume/customerManageInPort`,
        method: "put",
        data,
    });
};
// 获取审核情况（下拉框）
export const getCheckStateList = () => {
    return http({
        url: `/amiyabg/CustomerHospitalConsume/getCheckStateList`,
        method: "get",
    });
};
//审核客户在医院消费信息
export const customerManageCheck = (data) => {
    return http({
        url: `/amiyabg/CustomerHospitalConsume/customerManageCheck`,
        method: "put",
        data,
    });
};
// 获取升单渠道
export const appChannelList = () => {
    return http({
        url: `/amiyabg/CustomerHospitalConsume/appChannelList`,
        method: "get",
    });
};
// 客户积分过期
export const expiredCustomerIntergration = () => {
    return http({
        url: `/amiyabg/CustomerIntegralOrderRefund/expiredCustomerIntergration`,
        method: "get",
    });
};
// 获取主播IP（下拉框）
export const LiveAnchorValid = () => {
    return http({
        url: `/amiyabg/LiveAnchor/valid`,
        method: "get",
    });
};
// 客服确认客户在医院消费信息
export const customerServiceCheck = (params) => {
    return http({
        url: `/amiyabg/CustomerHospitalConsume/customerServiceCheck`,
        method: "get",
        params
    });
};
/**
 * 客户消费列表
 */
//获取绑定了客服的客户消费列表
export const bindCustomerConsumptionServerList = (params) => {
    return http({
        url: `/amiyabg/Customer/bindCustomerConsumptionServerList`,
        method: "get",
        params
    });
};
/**
 * 客户回访列表
 */
export const CustomerTrackServerList = (params) => {
    return http({
        url: `/amiyabg/Customer/CustomerTrackServerList`,
        method: "get",
        params
    });
};
//订单审核后回款
export const customerReturnBackOrder = (data) => {
    return http({
        url: `/amiyabg/CustomerHospitalConsume/returnBackOrder`,
        method: "put",
        data,
    });
};

/**
 * 医院客户接口
 */
// 获取医院客户信息列表 分页
export const getHospitalCustomerInfo = (params) => {
    return http({
        url: `/amiyabg/HospitalCustomerInfo/listWithPage`,
        method: "get",
        params
    });
};

// 根据客户编号获取消费记录分页
export const getOrderByCustomerIdlistWithPage = (params) => {
    return http({
        url: `/amiyabg/HospitalCustomerInfo/getOrderByCustomerIdlistWithPage`,
        method: "get",
        params
    });
};

// 获取医院客户信息列表分页
export const getOrderlistWithPage = (params) => {
    return http({
        url: `/amiyabg/HospitalCustomerInfo/GetOrderlistWithPage`,
        method: "get",
        params
    });
};
// 获取已配置对接订单客户的医院信息
export const getDockingHospitalInfo = () => {
    return http({
        url: `/amiyabg/HospitalCustomerInfo/GetDockingHospitalInfo`,
        method: "get",
    });
};
// 根据加密电话查询客户资料
export const getBaseAndBindCustomerInfoByEncryptPhone = (params) => {
    return http({
        url: `/amiyabg/Customer/getBaseAndBindCustomerInfoByEncryptPhone`,
        method: "get",
        params
    });
};
// 根据id编辑客户基础信息
export const updateById = (data) => {
    return http({
        url: `/amiyabg/Customer/updateById`,
        method: "put",
        data,
    });
};
// 客户赠送积分
export const addCustomerIntergration = (data) => {
    return http({
        url: `/amiyabg/Customer/addCustomerIntergration`,
        method: "put",
        data,
    });
};