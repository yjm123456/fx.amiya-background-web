import http from "../http/http";

/**
 * 订单列表
 */

// 获取下单平台列表
export const getAppTypeList = () => {
    return http({
        url: "/amiyabg/Order/appTypeList",
        method: "get",
    });
};

// 获取天猫订单信息列表 （分页）
export const orderInfo = (params) => {
    return http({
        url: "/amiyabg/Order/tmallOrderLlistWithPage",
        method: "get",
        params
    });
};
// 根据筛选条件 导出订单列表
export const exportTmallOrderLlist = (params) => {
    return http({
        url: "/amiyabg/Order/exportTmallOrderLlist",
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 获取商品名称和id （下拉框） 
export const getgetAmiyaHospitalDepartmentList = (params) => {
    return http({
        url: `/amiyabg/AmiyaGoodsDemand/getAmiyaGoodsDemandList`,
        method: "get",
        params
    });
};
// 获取有效的医院列表
export const getHospitalList = () => {
    return http({
        url: `/amiyabg/HospitalInfo/nameList`,
        method: "get",
    });
};
// 获取交易类型
export const getExchanType = () => {
    return http({
        url: `/amiyabg/GoodsInfo/exchangeTypeList`,
        method: "get",
    });
};

// 补单
export const orderAddOrder = (data) => {
    return http({
        url: "/amiyabg/Order/AddOrder",
        method: "post",
        data
    });
};
// 录单/amiyabg​/Order​/EntryOrder
export const EntryOrder = (data) => {
    return http({
        url: "/amiyabg/Order/EntryOrder",
        method: "post",
        data
    });
};

// 记录订单最终核销医院
export const UpdateOrderFinalConsumptionHospital = (params) => {
    return http({
        url: "/amiyabg/Order/UpdateOrderFinalConsumptionHospital",
        method: "put",
        params
    });
};
// 录单修改（订单状态为咨询/定金可进行修改）
export const UpdateOrder = (data) => {
    return http({
        url: "/amiyabg/Order/UpdateOrder",
        method: "put",
        data
    });
};
//  订单删除
export const deleteOrder = (id) => {
    return http({
        url: `/amiyabg/Order/${id}`,
        method: "delete",
    });
};
// 补单
export const supplement = (data) => {
    return http({
        url: "/amiyabg/Order/AddOrder",
        method: "post",
        data
    });
};
// 补单 根据订单号查询要补单的信息
export const repairOrder = (data) => {
    return http({
        url: `/amiyabg/Order/repairOrder`,
        method: "post",
        data
    });
};
// 订单校对/amiyabg​/Order/CheckOrder
export const OrderProofreading = (data) => {
    return http({
        url: "/amiyabg/Order/CheckOrder",
        method: "post",
        data
    });
};
// 订单归属客服
export const LiveAnchorOrder = (data) => {
    return http({
        url: "/amiyabg/Order/LiveAnchorOrder",
        method: "post",
        data
    });
};
//  交易完成
export const transactionCompletion = (id) => {
    return http({
        url: `/amiyabg/Order/${id}`,
        method: "post",
    });
};
/**
 * 绑定客服列表
 */

// 获取客服列表
export const customerServiceList = (params) => {
    return http({
        url: "/amiyabg/AmiyaEmployee/customerServiceList",
        method: "get",
        params
    });
};

// 获取未绑定客服的订单列表
export const getUnBindCustomerServiceOrder = (params) => {
    return http({
        url: "/amiyabg/Order/unBindCustomerService",
        method: "get",
        params
    });
};

// 绑定客服 post
export const bindCustomerService = (data) => {
    return http({
        url: "/amiyabg/BindCustomerService",
        method: "post",
        data
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

// 获取已绑定了客服的订单列表
export const bindCustomerServieOrderList = (params) => {
    return http({
        url: "/amiyabg/Order/bindCustomerServieOrderList",
        method: "get",
        params
    });
};

// 修改绑定客服   put
export const editBindCustomerService = (data) => {
    return http({
        url: "/amiyabg/BindCustomerService",
        method: "put",
        data
    });
};
// 已绑定客服内容平台订单 
export const bindCustomerServieOrders = (params) => {
    return http({
        url: "/amiyabg/ContentPlateFormOrder/bindCustomerServieOrders",
        method: "get",
        params
    });
};
// 下单平台修改已绑定客服
export const OrderListBindCustomerService = (data) => {
    return http({
        url: "/amiyabg/BindCustomerService/OrderListBindCustomerService",
        method: "put",
        data
    });
};
// 内容平台修改已绑定客服
export const ContentPlatFormOrderListBindCustomerService = (data) => {
    return http({
        url: "/amiyabg/BindCustomerService/ContentPlatFormOrderListBindCustomerService",
        method: "put",
        data
    });
};
// 修改订单归属客服
export const BelongEmployeeOrder = (data) => {
    return http({
        url: "/amiyabg/Order/BelongEmployeeOrder",
        method: "post",
        data
    });
};
// 根据成交情况编号获取成交情况信息
export const ContentPlatFormOrderDealInfo = (id) => {
    return http({
        url: `/amiyabg/ContentPlatFormOrderDealInfo/byId/${id}`,
        method: "get",
    });
};

// 修改成交情况信息
export const updateContentPlatFormOrderDealInfo = (data) => {
    return http({
        url: "/amiyabg/ContentPlateFormOrder/updateFinishContentPlateFormOrderByEmployee",
        method: "put",
        data
    });
};

/**
 * 派单列表
 */

// 获取未派单订单列表
export const unSendOrderList = (params) => {
    return http({
        url: "/amiyabg/SendOrderInfo/unSendOrderList",
        method: "get",
        params
    });
};

// 获取派单信息列表
export const sendOrderInfo = (params) => {
    return http({
        url: "/amiyabg/SendOrderInfo/listWithPage",
        method: "get",
        params
    });
};

// 根据商品编号获取参与项目的医院名称列表
export const byGoodsIdGetpartakeItemHospitalList = (goodsId) => {
    return http({
        url: `/amiyabg/HospitalInfo/partakeItemHospitalList/${goodsId}`,
        method: "get",
    });
};

// 添加派单  post
export const sendOrder = (data) => {
    return http({
        url: `/amiyabg/SendOrderInfo`,
        method: "post",
        data
    });
};

// 修改派单   put
export const editSendOrder = (data) => {
    return http({
        url: `/amiyabg/SendOrderInfo`,
        method: "put",
        data
    });
};

// 根据编号获取简单的派单信息
export const byIdGetSendOrderInfo = (goodsId) => {
    return http({
        url: `/amiyabg/SendOrderInfo/simpleById/${goodsId}`,
        method: "get",
    });
};

// 根据派单信息编号获取派单留言板列表  get
export const bySendInfoIdGetSendMessageList = (params) => {
    return http({
        url: `/amiyabg/SendOrderInfo/messageBoardListById`,
        method: "get",
        params
    });
};

// 添加派单留言板  post
export const addSendMessageBoard = (data) => {
    return http({
        url: `/amiyabg/SendOrderInfo/messageBoard`,
        method: "post",
        data
    });
};
// 获取下单平台列表
export const getOrderPlatform = () => {
    return http({
        url: `/amiyabg/Order/appTypeList`,
        method: "get"
    });
};

/**
 * 医院派单列表 
 */

// 医院获取派单信息
export const hospitalSendOrderList = (params) => {
    return http({
        url: `/amiyabg/SendOrderInfo/listOfHospital`,
        method: "get",
        params
    });
};

/**
 * 订单数据
 */

export const getHeadOrderData = (params) => {
    return http({
        url: `/amiyabg/Order/headOrderData`,
        method: "get",
        params,
    });
};


// 订单状态分布
export const getOrderStatusData = (params) => {
    return http({
        url: `/amiyabg/Order/orderStatusData`,
        method: "get",
        params,
    });
};

// 根据员工编号获取订单列表
export const byEmployeeIdGetOrderList = (params) => {
    return http({
        url: `/amiyabg/Order/orderListByEmployeeId`,
        method: "get",
        params,
    });
};

// 获取今天订单状态发生改变的订单列表
export const getTodayStatusChangeOrderList = (params) => {
    return http({
        url: `/amiyabg/Order/todayStatusChangeList`,
        method: "get",
        params,
    });
};

// 医院查看电话号   post
export const hospitalSeePhone = (data) => {
    return http({
        url: `/amiyabg/HospitalCheckPhoneRecord`,
        method: "post",
        data,
    });
};

// 根据订单编号获取订单信息
export const byIdGetOrderInfo = (id) => {
    return http({
        url: `/amiyabg/Order/byId/${id}`,
        method: "get",
    });
};

// 修改京东退款成功的订单
export const editJDRefundSuccessOrder = (id) => {
    return http({
        url: `/amiyabg/Order/refundOfJd/${id}`,
        method: "put",
    });
};

// 反馈派单信息   put
export const feedback = (data) => {
    return http({
        url: `/amiyabg/SendOrderInfo/feedback`,
        method: "put",
        data,
    });
};
// ​订单性质/Order​/orderNatureList
export const getorderNatureList = () => {
    return http({
        url: `/amiyabg/Order/orderNatureList`,
        method: "get",
    });
};

/**
 * 小程序实物订单
 */

// 获取小程序订单交易列表
export const getMiniProgramMaterialOrderTradeList = (params) => {
    return http({
        url: `/amiyabg/Order/miniProgramMaterialOrderTradeList`,
        method: "get",
        params
    });
};

// 根据交易编号获取订单列表
export const byTradeIdGetOrderList = (tradeId) => {
    return http({
        url: `/amiyabg/Order/listByTradeId/${tradeId}`,
        method: "get",
    });
};

// 发货  post
export const sendGoods = (data) => {
    return http({
        url: `/amiyabg/Order/sendGoods`,
        method: "post",
        data
    });
};

// 获取物流公司id和名称（下拉框使用）
export const getLogisticsCompany = () => {
    return http({
        url: "/amiyabg/ExpressManage/getExpressList",
        method: "get",
    });
};
// 根据条件获取快递信息
export const giftExpressInfo = (params) => {
    return http({
        url: "/amiyabg/ExpressManage/giftExpressInfo",
        method: "get",
        params
    });
};
// 小程序订单交易列表导出​/Order​/exportMiniProgramOrderLlist
export const exportMiniProgramOrderLlist = (params) => {
    return http({
        url: `/amiyabg/Order/exportMiniProgramOrderLlist`,
        method: "get",
        params,
        responseType: 'blob'
    });
};
/**
 * 核销订单
 */

// 根据核销编号获取订单信息
export const getCodeList = (params) => {
    return http({
        url: `/amiyabg/Order/byWriteOffCode`,
        method: "get",
        params,
    });
};
// 核销订单   put
export const orderWriteOff = (params) => {
    return http({
        url: `/amiyabg/Order/WriteOff`,
        method: "put",
        params,
    });
};

// 获取所有医院名称列表
export const getAllHospitalList = (params) => {
    return http({
        url: `/amiyabg/HospitalInfo/allNameList`,
        method: "get",
        params,
    });
};
/**
 * 订单报表
 */
//  获取订单经营情况
export const getOrderOperationCondition = (params) => {
    return http({
        url: `/amiyabg/OrderReport/OrderOperationCondition`,
        method: "get",
        params,
    });
};
//  获取预约经营情况
export const getAppointmentOperationCondition = (params) => {
    return http({
        url: `/amiyabg/OrderReport/AppointmentOperationCondition`,
        method: "get",
        params,
    });
};
// 订单核销报表
export const getOrderWriteOffReport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/OrderWriteOffReport`,
        method: "get",
        params,
    });
};
// 订单核销报表导出
export const getOrderWriteOffReportExportt = (params) => {
    return http({
        url: `/amiyabg/OrderReport/OrderWriteOffReportExport`,
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 订单派单报表
export const getsendOrderReport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/sendOrderReport`,
        method: "get",
        params,
    });
};
// 订单派单报表导出
export const getsendOrderReportExport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/sendOrderReportExport`,
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 客户预约报表
export const getcustomerAppointmentReport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/customerAppointmentReport`,
        method: "get",
        params,
    });
};
// 客户预约报表导出
export const getcustomerAppointmentReportExport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/customerAppointmentReportExport`,
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 医院订单量报表
export const gethospitalOrderReport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/hospitalOrderReport`,
        method: "get",
        params,
    });
};
// 医院订单量报表导出
export const gethospitalOrderReportExport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/hospitalOrderReportExport`,
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 医院预约报表
export const gethospitalAppointmentReport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/hospitalAppointmentReport`,
        method: "get",
        params,
    });
};
// 医院预约报表导出
export const gethospitalAppointmentReportExport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/hospitalAppointmentReportExport`,
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 客户订单应收款统计报表​/OrderReport​/customerOrderReceivableReport
export const getcustomerOrderReceivableReport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/customerOrderReceivableReport`,
        method: "get",
        params,
    });
};
// 客户订单应收款统计报表导出
export const getcustomerOrderReceivableExport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/customerOrderReceivableExport`,
        method: "get",
        params,
        responseType: 'blob'
    });
};
//数据中台 可视化看板数据
export const getOrderCenterData = () => {
    return http({
        url: `/amiyabg/OrderReport/OrderCenterData`,
        method: "get",
    });
};
// 当前邮箱通知状态
export const getEmailNoticeControll = () => {
    return http({
        url: `/amiyabg/WxAppConfig/getEmailNoticeControll`,
        method: "get",
    });
};
// 是否启动邮箱通知
export const updateEmailNoticeControll = (params) => {
    return http({
        url: `/amiyabg/WxAppConfig/updateEmailNoticeControll`,
        method: "put",
        params,
    });
};
// 客户升单报表
export const getcustomerBuyAgainReport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/customerBuyAgainReport`,
        method: "get",
        params,
    });
};
// 客户升单报表导出
export const getcustomerBuyAgainReportExport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/customerBuyAgainReportExport`,
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 付款订单报表
export const getOrderBuyReport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/OrderBuyReport`,
        method: "get",
        params,
    });
};
// 付款订单报表导出
export const getOrderBuyReportExport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/OrderBuyReportExport`,
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 退款订单报表
export const getOrderCloseReport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/OrderCloseReport`,
        method: "get",
        params,
    });
};
// 退款订单报表导出
export const getOrderCloseReportExport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/OrderCloseReportExport`,
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 主播IP运营报表
export const getliveAnchorOperatingReport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/liveAnchorOperatingReport`,
        method: "get",
        params,
    });
};
// 主播IP运营报表导出
export const getliveAnchorOperatingReportExport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/liveAnchorOperatingReportExport`,
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 内容平台订单成交报表
export const ContentPlatFormOrderDealReport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/ContentPlatFormOrderDealReport`,
        method: "get",
        params,
    });
};
// 内容平台订单成交报表导出
export const ExportContentPlatFormOrderDealReport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/ExportContentPlatFormOrderDealReport`,
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 下单平台报表
export const OrderReport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/OrderReport`,
        method: "get",
        params,
    });
};
// 下单平台报表导出
export const OrderReportExport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/OrderReportExport`,
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 客服下单平台未派单报表
export const customerUnSendOrderReport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/customerUnSendOrderReport`,
        method: "get",
        params,
    });
};
// 客服下单平台未派单报表导出
export const customerUnSendOrderReportExport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/customerUnSendOrderReportExport`,
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 客服内容平台未派单报表
export const customerunContentPlatFormSendOrderList = (params) => {
    return http({
        url: `/amiyabg/OrderReport/customerunContentPlatFormSendOrderList`,
        method: "get",
        params,
    });
};
// 客服内容平台未派单报表导出
export const customerunContentPlatFormSendOrderListExport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/customerunContentPlatFormSendOrderListExport`,
        method: "get",
        params,
        responseType: 'blob'
    });
};

// 客服下单平台已派单报表
export const customerSendOrderReport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/customerSendOrderReport`,
        method: "get",
        params,
    });
};
// 客服下单平台已派单报表导出
export const customerSendOrderReportExport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/customerSendOrderReportExport`,
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 客服内容平台已派单报表
export const customerSendContentPlatFormOrderReport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/customerSendContentPlatFormOrderReport`,
        method: "get",
        params,
    });
};
// 数据中心
export const OrderCenter = (params) => {
    return http({
        url: `/amiyabg/OrderReport/OrderCenter`,
        method: "get",
        params,
    });
};
// 客服内容平台已派单报表导出
export const customerSendContentPlatFormOrderExport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/customerSendContentPlatFormOrderExport`,
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 成交量折线图
export const OrderDealLine = (params) => {
    return http({
        url: `/amiyabg/OrderReport/OrderDealLine`,
        method: "get",
        params,
    });
};
// 对账业绩折线图
export const CheckForPerformance = (params) => {
    return http({
        url: `/amiyabg/OrderReport/CheckForPerformance`,
        method: "get",
        params,
    });
};
// 咨询达人业绩
export const LiveAnchorPerformanceInfo = (params) => {
    return http({
        url: `/amiyabg/OrderReport/LiveAnchorPerformanceInfo`,
        method: "get",
        params,
    });
};
// 达人助理业绩
export const ConsultationPerformanceInfo = (params) => {
    return http({
        url: `/amiyabg/OrderReport/ConsultationPerformanceInfo`,
        method: "get",
        params,
    });
};
// 行政客服业绩
export const CustomerServicePerformanceInfo = (params) => {
    return http({
        url: `/amiyabg/OrderReport/CustomerServicePerformanceInfo`,
        method: "get",
        params,
    });
};
// 小黄车登记报表
export const shoppingCartRegistrationReport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/ShoppingCartRegistrationReport`,
        method: "get",
        params,
    });
};
// 小黄车登记报表导出
export const shoppingCartRegistrationExport = (params) => {
    return http({
        url: `/amiyabg/OrderReport/ShoppingCartRegistrationExport`,
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 私域运营板块数据
export const GetPrivateDomainOrderDetailsInfo = (params) => {
    return http({
        url: `/amiyabg/OrderReport/GetPrivateDomainOrderDetailsInfo`,
        method: "get",
        params,
    });
};
/**
 * 内容平台列表   （录单模块）
 */
// 订单状态
export const contentPlateFormOrderStatusList = () => {
    return http({
        url: `/amiyabg/ContentPlateFormOrder/contentPlateFormOrderStatusList`,
        method: "get",
    });
};
// 根据平台id获取IP账号
export const getLiveValidList = (params) => {
    return http({
        url: `/amiyabg/LiveAnchor/validList`,
        method: "get",
        params
    })
}

//  获取平台内容列表
export const getContentPlateFormOrderLlistWithPage = (params) => {
    return http({
        url: "/amiyabg/ContentPlateFormOrder/contentPlateFormOrderLlistWithPage",
        method: "get",
        params
    });
};
// 添加（录单）
export const AddContentPlateFormAddOrder = (data) => {
    return http({
        url: `/amiyabg/ContentPlateFormOrder/contentPlateFormAddOrder`,
        method: "post",
        data,
    });
};
// 修改订单
export const editContentPlateFormOrder = (data) => {
    return http({
        url: `/amiyabg/ContentPlateFormOrder/updateContentPlateFormOrder`,
        method: "put",
        data,
    });
};
//   根据编号获取订单信息
export const byIdContentPlateForm = (id) => {
    return http({
        url: `/amiyabg/ContentPlateFormOrder/byId/${id}`,
        method: "get",
    });
};
// 删除订单  delete
export const deleteContentPlateFormOrder = (id) => {
        return http({
            url: `/amiyabg/ContentPlateFormOrder/${id}`,
            method: "DELETE"
        })
    }
    //获取已绑定客服的内容平台订单列表
export const getbindCustomerServieOrders = (params) => {
    return http({
        url: "/amiyabg/ContentPlateFormOrder/bindCustomerServieOrders",
        method: "get",
        params
    });
};
// 内容平台导出
export const exportContentPlateFormOrderLlistWithPage = (params) => {
    return http({
        url: "/amiyabg/ContentPlateFormOrder/exportContentPlateFormOrderLlistWithPage",
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 内容平台归属客服
export const BelongEmployeeContentPlatFormOrder = (data) => {
    return http({
        url: `/amiyabg/ContentPlateFormOrder/BelongEmployeeContentPlatFormOrder`,
        method: "post",
        data,
    });
};
//获取医院科室id和名称（下拉框使用）
export const getAmiyaHospitalDepartmentList = () => {
    return http({
        url: "/amiyabg/AmiyaHospitalDepartment/getAmiyaHospitalDepartmentList",
        method: "get",
    });
};
// 获取内容平台订单来源
export const contentPlateFormOrderSourceList = () => {
    return http({
        url: "/amiyabg/ContentPlateFormOrder/contentPlateFormOrderSourceList",
        method: "get",
    });
};
// 获取客户照片信息列表
export const ContentPlatFormCustomerPicture = (params) => {
    return http({
        url: "/amiyabg/ContentPlatFormCustomerPicture/listWithPage",
        method: "get",
        params
    });
};
// 喜报
export const orderProsperity = (id) => {
    return http({
        url: `/amiyabg/ContentPlateFormOrder/orderProsperity/${id}`,
        method: "get",
    });
};

/**
 * 内容平台派单列表
 */
//  获取平台内容未派单列表（分页）
export const getUnContentPlatFormSendOrderList = (params) => {
    return http({
        url: "/amiyabg/ContentPlateFormOrder/unContentPlatFormSendOrderList",
        method: "get",
        params
    });
};
//  获取平台内容已派单列表（分页）
export const getContentPlateFormSendOrder = (params) => {
        return http({
            url: "/amiyabg/ContentPlateFormSendOrder/list",
            method: "get",
            params
        })
    }
    // 内容平台 派单接口/amiyabg​/ContentPlateFormSendOrder
export const AddContentPlateFormSendOrder = (data) => {
    return http({
        url: `/amiyabg/ContentPlateFormOrder`,
        method: "post",
        data,
    });
};
// 内容平台 修改派单接口​/ContentPlateFormSendOrder
export const editContentPlateFormSendOrder = (data) => {
    return http({
        url: `/amiyabg/ContentPlateFormOrder`,
        method: "put",
        data,
    });
};
//   内容平台 根据编号获取派单信息
export const byIdContentPlateFormSendOrder = (id) => {
    return http({
        url: `/amiyabg/ContentPlateFormSendOrder/simpleById/${id}`,
        method: "get",
    });
};
//   重单截图
export const byselectRepeateOrderPic = (params) => {
    return http({
        url: `/amiyabg/ContentPlateFormOrder/selectRepeateOrderPic`,
        method: "get",
        params
    });
};
// 根据id获取修改的医院
export const simpleById = (id) => {
    return http({
        url: `/amiyabg/ContentPlateFormSendOrder/simpleById/${id}`,
        method: "get",
    });
};
// 客服完成订单
export const finishContentPlateFormOrderByEmployee = (data) => {
    return http({
        url: `/amiyabg/ContentPlateFormOrder/finishContentPlateFormOrderByEmployee`,
        method: "put",
        data,
    });
};
// 医院端  备注
export const contentPlateFormOrderRemark = (data) => {
    return http({
        url: `/amiyabg/ContentPlateFormSendOrder/contentPlateFormOrderRemark`,
        method: "put",
        data,
    });
};
// 管理员端 获取订单成交情况
export const contentPlatFormOrderDealInfo = (params) => {
    return http({
        url: `/amiyabg/ContentPlateFormSendOrder/contentPlatFormOrderDealInfo`,
        method: "get",
        params
    });
};
// 医院端获取订单成交情况
export const hospitalContentPlatFormOrderDealInfo = (params) => {
    return http({
        url: `/amiyabg/ContentPlateFormSendOrder/hospitalContentPlatFormOrderDealInfo`,
        method: "get",
        params
    });
};
// 医院接单
export const contentPlateFormOrderConfirm = (params) => {
    return http({
        url: `/amiyabg/ContentPlateFormOrder/contentPlateFormOrderConfirm`,
        method: "get",
        params
    });
};
// 医院重单打回
export const contentPlateFormOrderRepeates = (data) => {
    return http({
        url: `/amiyabg/ContentPlateFormOrder/contentPlateFormOrderRepeate`,
        method: "put",
        data,
    });
};
/**
 * 医院端派单列表
 */

// 医院内容平台派单列表
export const getHospitalContentPlateFormOrder = (params) => {
        return http({
            url: "/amiyabg/ContentPlateFormSendOrder/listOfHospital",
            method: "get",
            params
        })
    }
    // 医院完成订单
export const finishContentPlateFormOrder = (data) => {
    return http({
        url: `/amiyabg/ContentPlateFormOrder/finishContentPlateFormOrder`,
        method: "put",
        data,
    });
};
// 医院重单打回
export const contentPlateFormOrderRepeate = (data) => {
    return http({
        url: `/amiyabg/ContentPlateFormOrder/contentPlateFormOrderRepeate`,
        method: "put",
        data,
    });
};

// 添加内容平台订单的查看电话记录/HospitalCheckPhoneRecord​/contentPlatform
export const contentPlatformPhone = (data) => {
    return http({
        url: `/amiyabg/HospitalCheckPhoneRecord/contentPlatform`,
        method: "post",
        data,
    });
};
// 获取天气
export const getWeather_mini = (params) => {
        return http({
            url: "http://wthrcdn.etouch.cn/weather_mini",
            method: "get",
            params
        })
    }
    // 医院端下单平台派单 导出
export const exportOfHospital = (params) => {
    return http({
        url: "/amiyabg/SendOrderInfo/exportOfHospital",
        method: "get",
        params,
        responseType: 'blob'
    });
};
// 医院端 内容平台派单 导出
export const exportOfContentPlatFormHospital = (params) => {
    return http({
        url: "/amiyabg/ContentPlateFormSendOrder/exportOfContentPlatFormHospital",
        method: "get",
        params,
        responseType: 'blob'
    });
};
/**
 * 小程序积分退款板块
 */
export const getCustomerIntegralOrderRefund = (params) => {
        return http({
            url: "/amiyabg/CustomerIntegralOrderRefund/listWithPage",
            method: "get",
            params
        })
    }
    // 根据小程序积分退款编号获取小程序积分退款信息
export const CustomerIntegralOrderRefundById = (id) => {
    return http({
        url: `/amiyabg/CustomerIntegralOrderRefund/byId/${id}`,
        method: "get",
    });
};
// 客户积分订单退款审核
export const CustomerIntegralOrderRefundOrderId = (data) => {
    return http({
        url: `/amiyabg/CustomerIntegralOrderRefund/Refund`,
        method: "post",
        data
    });
};
// 删除小程序积分退款信息
export const detelCustomerIntegralOrderRefund = (id) => {
    return http({
        url: `/amiyabg/CustomerIntegralOrderRefund/${id}`,
        method: "delete",
    });
};
/**
 * 已成交订单列表
 */
// 内容平台已完成订单列表​
export const contentPlateFormOrderDealLlistWithPage = (params) => {
        return http({
            url: "/amiyabg/ContentPlateFormOrder/contentPlateFormOrderDealLlistWithPage",
            method: "get",
            params
        })
    }
    //内容平台审核订单
export const checkContentPlateFormOrder = (data) => {
    return http({
        url: `/amiyabg/ContentPlateFormOrder/checkContentPlateFormOrder`,
        method: "put",
        data,
    });
};
// 获取已完成未派单订单列表
export const tmallOrderFinishLlistWithPage = (params) => {
        return http({
            url: "/amiyabg/Order/tmallOrderFinishLlistWithPage",
            method: "get",
            params
        })
    }
    // 分配医院
export const DistributeToHospital = (data) => {
    return http({
        url: `/amiyabg/SendOrderInfo/DistributeToHospital`,
        method: "post",
        data
    });
};
// 获取面诊人员姓名列表
export const consultationNameList = () => {
    return http({
        url: `/amiyabg/AmiyaEmployee/consultationNameList`,
        method: "get",
    });
};
// 订单审核后回款
export const returnBackOrder = (data) => {
    return http({
        url: `/amiyabg/ContentPlateFormOrder/returnBackOrder`,
        method: "put",
        data,
    });
};
// 下单平台审核订单
export const checkOrder = (data) => {
    return http({
        url: `/amiyabg/Order/checkOrder`,
        method: "put",
        data,
    });
};
// 下单平台 订单审核后回款
export const orderReturnBackOrder = (data) => {
    return http({
        url: `/amiyabg/Order/returnBackOrder`,
        method: "put",
        data,
    });
};