import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

/**
 *  isTag 是否通过tag展示内容 true:是, false:否
 *  keepAlive 页面是否缓存 true:是, false:否
 */
/**
 * 员工管理
 */
const employeeManage = [{
        path: "/amiyaEmployee",
        name: "amiyaEmployee",
        meta: {
            title: "阿美雅员工",
            keepAlive: false,
            isTag: true,
            openName: ['员工管理'],
        },
        component: () =>
            import ("@/views/employeeManage/amiyaEmployee/amiyaEmployee.vue"),
    },
    {
        path: "/hospitalEmployee",
        name: "hospitalEmployee",
        meta: {
            title: "医院员工",
            keepAlive: false,
            isTag: true,
            openName: ['员工管理'],
        },
        component: () =>
            import ("@/views/employeeManage/hospitalEmployee/hospitalEmployee.vue"),
    },
    {
        path: "/iPAccount",
        name: "iPAccount",
        meta: {
            title: "主播ip账户",
            keepAlive: false,
            isTag: true,
            openName: ['员工管理'],
        },
        component: () =>
            import ("@/views/employeeManage/iPAccount/iPAccount.vue"),
    },
    {
        path: "/anchorWechat",
        name: "anchorWechat",
        meta: {
            title: "主播微信号",
            keepAlive: false,
            isTag: true,
            openName: ['员工管理'],
        },
        component: () =>
            import ("@/views/employeeManage/anchorWechat/anchorWechat.vue"),
    },
    {
        path: "/anchor",
        name: "anchor",
        meta: {
            title: "主播",
            keepAlive: false,
            isTag: true,
            openName: ['员工管理'],
        },
        component: () =>
            import ("@/views/employeeManage/anchor/anchor.vue"),
    },
];

/**
 * 轮播图管理
 */
const carouselManage = [{
    path: "/carousel",
    name: "carousel",
    meta: {
        title: "轮播图",
        keepAlive: false,
        isTag: true,
        openName: ['轮播图管理'],
    },
    component: () =>
        import ("@/views/carouselManage/carousel.vue"),
}, ];

/**
 * 职位管理
 */
const positionManage = [{
        path: "/amiyaPosition",
        name: "amiyaPosition",
        meta: {
            title: "阿美雅职列表",
            keepAlive: false,
            isTag: true,
            openName: ['组织结构'],
        },
        component: () =>
            import ("@/views/positionManage/amiyaPosition.vue"),
    },
    {
        path: "/hospitalPostion",
        name: "hospitalPostion",
        meta: {
            title: "医院职位列表",
            keepAlive: false,
            isTag: true,
            openName: ['组织结构'],
        },
        component: () =>
            import ("@/views/positionManage/hospitalPostion/hospitalPostion.vue"),
    },
];

/**
 * 项目管理
 */
const itemManage = [{
    path: "/itemList",
    name: "itemList",
    meta: {
        title: "项目列表",
        keepAlive: false,
        isTag: true,
        openName: ['项目管理'],
    },
    component: () =>
        import ("@/views/itemManage/itemList.vue"),
}, ];

/**
 * 医院管理
 */
const hospitalManage = [{
        path: "/hospital",
        name: "hospital",
        meta: {
            title: "医院",
            keepAlive: false,
            isTag: true,
            openName: ['医院管理'],
        },
        component: () =>
            import ("@/views/hospitalManage/hospital/hospital.vue"),
    },
    {
        path: "/hospitalTag",
        name: "hospitalTag",
        meta: {
            title: "医院标签",
            keepAlive: false,
            isTag: true,
            openName: ['医院管理'],
        },
        component: () =>
            import ("@/views/hospitalManage/hospitalTag/hospitalTag.vue"),
    },
    {
        path: "/doctor",
        name: "doctor",
        meta: {
            title: "医生",
            keepAlive: false,
            isTag: true,
            openName: ['医院管理'],
        },
        component: () =>
            import ("@/views/hospitalManage/doctor/doctor.vue"),
    },
    {
        path: "/hospitalRecommend",
        name: "hospitalRecommend",
        meta: {
            title: "医院推荐",
            keepAlive: false,
            isTag: true,
            openName: ['医院管理'],
        },
        component: () =>
            import ("@/views/hospitalManage/hospitalRecommend/hospitalRecommend.vue"),
    },
    {
        path: "/hospitalAppointmenrQuantity",
        name: "hospitalAppointmenrQuantity",
        meta: {
            title: "医院可预约人数",
            keepAlive: false,
            isTag: true,
            openName: ['医院管理'],
        },
        component: () =>
            import (
                "@/views/hospitalManage/hospitalAppointmenrQuantity/hospitalAppointmenrQuantity.vue"
            ),
    },
    {
        path: "/cooperativeHospitalCity",
        name: "cooperativeHospitalCity",
        meta: {
            title: "合作医院城市列表",
            keepAlive: false,
            isTag: true,
            openName: ['医院管理'],
        },
        component: () =>
            import (
                "@/views/hospitalManage/cooperativeHospitalCity/cooperativeHospitalCity.vue"
            ),
    },
    {
        path: "/hospitalDataReview",
        name: "hospitalDataReview",
        meta: {
            title: "医院资料审核",
            keepAlive: false,
            isTag: true,
            openName: ['医院管理'],
        },
        component: () =>
            import (
                "@/views/hospitalManage/hospitalDataReview/hospitalDataReview.vue"
            ),
    },
    {
        path: "/hospitalInformation",
        name: "hospitalInformation",
        meta: {
            title: "医院资料",
            keepAlive: false,
            isTag: true,
            openName: ['医院管理'],
        },
        component: () =>
            import (
                "@/views/hospitalManage/hospitalInformation/hospitalInformation.vue"
            ),
    },
    {
        path: "/hospitalComplaintFeedback",
        name: "hospitalComplaintFeedback",
        meta: {
            title: "医院投诉反馈",
            keepAlive: false,
            isTag: true,
            openName: ['医院管理'],
        },
        component: () =>
            import (
                "@/views/hospitalManage/hospitalComplaintFeedback/hospitalComplaintFeedback.vue"
            ),
    },
];

/**
 * 预约
 */
const appointment = [{
    path: "/appointmentList",
    name: "appointmentList",
    meta: {
        title: "预约列表",
        keepAlive: false,
        isTag: true,
        openName: ['预约'],
    },
    component: () =>
        import ("@/views/appointment/appointmentList.vue"),
}, ];


/**
 * 客服
 */
const customerService = [{
        path: "/chat",
        name: "chat",
        meta: {
            title: "客服",
            keepAlive: false,
            isTag: true,
            openName: ['客服'],
        },
        component: () =>
            import ("@/views/customerService/chat.vue"),
    },
    {
        path: "/leaveMessageList",
        name: "leaveMessageList",
        meta: {
            title: "留言板",
            keepAlive: false,
            isTag: true,
            openName: ['客服'],
        },
        component: () =>
            import ("@/views/customerService/leaveMessageList/leaveMessageList.vue"),
    },
    {
        path: "/chatRecord",
        name: "chatRecord",
        meta: {
            title: "聊天记录",
            keepAlive: false,
            isTag: true,
            openName: ['客服'],
        },
        component: () =>
            import ("@/views/customerService/chatRecord/chatRecord.vue"),
    },
];

/**
 * 订单管理
 */
const orderManage = [{
        path: "/order",
        name: "order",
        meta: {
            title: "订单列表",
            keepAlive: false,
            isTag: true,
            openName: ['订单管理'],
        },
        component: () =>
            import ("@/views/orderManage/order/order.vue"),
    },
    {
        path: "/sendOrderList",
        name: "sendOrderList",
        meta: {
            title: "派单列表",
            keepAlive: false,
            isTag: true,
            openName: ['订单管理'],
        },
        component: () =>
            import ("@/views/orderManage/sendOrderList/sendOrderList.vue"),
    },
    {
        path: "/bindCustmerServiceList",
        name: "bindCustmerServiceList",
        meta: {
            title: "绑定客服列表",
            keepAlive: false,
            isTag: true,
            openName: ['订单管理'],
        },
        component: () =>
            import (
                "@/views/orderManage/bindCustmerServiceList/bindCustmerServiceList.vue"
            ),
    },
    {
        path: "/hospitalSendOrderList",
        name: "hospitalSendOrderList",
        meta: {
            title: "医院派单列表",
            keepAlive: false,
            isTag: true,
            openName: ['订单管理'],
        },
        component: () =>
            import (
                "@/views/orderManage/hospitalSendOrderList/hospitalSendOrderList.vue"
            ),
    },
    {
        path: "/orderData",
        name: "orderData",
        meta: {
            title: "订单数据",
            keepAlive: false,
            isTag: true,
            openName: ['订单管理'],
        },
        component: () =>
            import (
                "@/views/orderManage/orderData/orderData.vue"
            ),
    },
    {
        path: "/updateJdRefundOrder",
        name: "updateJdRefundOrder",
        meta: {
            title: "京东退款订单",
            keepAlive: false,
            isTag: true,
            openName: ['订单管理'],
        },
        component: () =>
            import (
                "@/views/orderManage/updateJdRefundOrder/updateJdRefundOrder.vue"
            ),
    },
    {
        path: "/miniProgramMaterialOrderList",
        name: "miniProgramMaterialOrderList",
        meta: {
            title: "小程序实物订单",
            keepAlive: false,
            isTag: true,
            openName: ['订单管理'],
        },
        component: () =>
            import (
                "@/views/orderManage/miniProgramMaterialOrderList/miniProgramMaterialOrderList.vue"
            ),
    },
    {
        path: "/orderWriteOff",
        name: "orderWriteOff",
        meta: {
            title: "订单核销",
            keepAlive: false,
            isTag: true,
            openName: ['订单管理'],
        },
        component: () =>
            import (
                "@/views/orderManage/orderWriteOff/orderWriteOff.vue"
            ),
    },
    {
        path: "/orderReport",
        name: "orderReport",
        meta: {
            title: "订单报表",
            keepAlive: false,
            isTag: true,
            openName: ['订单管理'],
        },
        component: () =>
            import (
                "@/views/orderManage/orderReport/orderReport.vue"
            ),
    },
    {
        path: "/orderContent",
        name: "orderContent",
        meta: {
            title: "内容平台列表",
            keepAlive: false,
            isTag: true,
            openName: ['订单管理'],
        },
        component: () =>
            import (
                "@/views/orderManage/orderContent/orderContent.vue"
            ),
    },
    {
        path: "/contentPlatformDispatch",
        name: "contentPlatformDispatch",
        meta: {
            title: "内容平台派单列表",
            keepAlive: false,
            isTag: true,
            openName: ['订单管理'],
        },
        component: () =>
            import (
                "@/views/orderManage/contentPlatformDispatch/contentPlatformDispatch.vue"
            ),
    },
    {
        path: "/hospitalContentPlatform",
        name: "hospitalContentPlatform",
        meta: {
            title: "医院内容平台派单列表",
            keepAlive: false,
            isTag: true,
            openName: ['订单管理'],
        },
        component: () =>
            import (
                "@/views/orderManage/hospitalContentPlatform/hospitalContentPlatform.vue"
            ),
    },
    {
        path: "/pointRefund",
        name: "pointRefund",
        meta: {
            title: "积分退款",
            keepAlive: false,
            isTag: true,
            openName: ['订单管理'],
        },
        component: () =>
            import (
                "@/views/orderManage/pointRefund/pointRefund.vue"
            ),
    },
    {
        path: "/closedOrderList",
        name: "closedOrderList",
        meta: {
            title: "已成交订单列表",
            keepAlive: false,
            isTag: true,
            openName: ['订单管理'],
        },
        component: () =>
            import (
                "@/views/orderManage/closedOrderList/closedOrderList.vue"
            ),
    },
    {
        path: "/dataCenter",
        name: "dataCenter",
        meta: {
            title: "数据监控中心",
            keepAlive: false,
            isTag: true,
            openName: ['订单管理'],
        },
        component: () =>
            import (
                "@/views/orderManage/dataCenter/dataCenter.vue"
            ),
    },
    {
        path: "/smallYellowCarRegistration",
        name: "smallYellowCarRegistration",
        meta: {
            title: "小黄车登记列表",
            keepAlive: false,
            isTag: true,
            openName: ['订单管理'],
        },
        component: () =>
            import (
                "@/views/orderManage/smallYellowCarRegistration/smallYellowCarRegistration.vue"
            ),
    },
    {
        path: "/privateDomainOperationData",
        name: "privateDomainOperationData",
        meta: {
            title: "小黄车登记列表",
            keepAlive: false,
            isTag: true,
            openName: ['订单管理'],
        },
        component: () =>
            import (
                "@/views/orderManage/privateDomainOperationData/privateDomainOperationData.vue"
            ),
    },
    {
        path: "/hospitalCustomerOrder",
        name: "hospitalCustomerOrder",
        meta: {
            title: "医院客户订单",
            keepAlive: false,
            isTag: true,
            openName: ['订单管理'],
        },
        component: () =>
            import (
                "@/views/orderManage/hospitalCustomerOrder/hospitalCustomerOrder.vue"
            ),
    },
];

/**
 * 客户管理
 */
const customerManage = [{
        path: "/customerList",
        name: "customerList",
        meta: {
            title: "客户列表",
            keepAlive: false,
            isTag: true,
            openName: ['客户管理'],
        },
        component: () =>
            import ("@/views/customerManage/customerList/customerList.vue"),
    },
    {
        path: "/callRecord",
        name: "callRecord",
        meta: {
            title: "电话录音",
            keepAlive: false,
            isTag: true,
            openName: ['客户管理'],
        },
        component: () =>
            import ("@/views/customerManage/callRecord/callRecord.vue"),
    },
    {
        path: "/customerTrackList",
        name: "customerTrackList",
        meta: {
            title: "客户追踪回访列表",
            keepAlive: false,
            isTag: true,
            openName: ['客户管理'],
        },
        component: () =>
            import ("@/views/customerManage/customerTrackList/customerTrackList.vue"),
    },
    {
        path: "/hospitalCustomerList",
        name: "hospitalCustomerList",
        meta: {
            title: "医院获取客户列表",
            keepAlive: false,
            isTag: true,
            openName: ['客户管理'],
        },
        component: () =>
            import ("@/views/customerManage/hospitalCustomerList/hospitalCustomerList.vue"),
    },
    {
        path: "/customerConsumeTrackList",
        name: "customerConsumeTrackList",
        meta: {
            title: "客户消费追踪",
            keepAlive: false,
            isTag: true,
            openName: ['客户管理'],
        },
        component: () =>
            import ("@/views/customerManage/customerConsumeTrackList/customerConsumeTrackList.vue"),
    },
    {
        path: "/customerConsumptionList",
        name: "customerConsumptionList",
        meta: {
            title: "客户消费列表",
            keepAlive: false,
            isTag: true,
            openName: ['客户管理'],
        },
        component: () =>
            import ("@/views/customerManage/customerConsumptionList/customerConsumptionList.vue"),
    },
    {
        path: "/customerReturnVisitList",
        name: "customerReturnVisitList",
        meta: {
            title: "客户回访列表",
            keepAlive: false,
            isTag: true,
            openName: ['客户管理'],
        },
        component: () =>
            import ("@/views/customerManage/customerReturnVisitList/customerReturnVisitList.vue"),
    },
    {
        path: "/followUpAndReport",
        name: "followUpAndReport",
        meta: {
            title: "追踪回访提报",
            keepAlive: false,
            isTag: true,
            openName: ['客户管理'],
        },
        component: () =>
            import ("@/views/customerManage/followUpAndReport/followUpAndReport.vue"),
    },
    {
        path: "/customerReturnVisitList",
        name: "customerReturnVisitList",
        meta: {
            title: "协助追踪回访",
            keepAlive: false,
            isTag: true,
            openName: ['客户管理'],
        },
        component: () =>
            import ("@/views/customerManage/customerReturnVisitList/customerReturnVisitList.vue"),
    },
    {
        path: "/assistInfollowUp",
        name: "assistInfollowUp",
        meta: {
            title: "追踪回访提报",
            keepAlive: false,
            isTag: true,
            openName: ['客户管理'],
        },
        component: () =>
            import ("@/views/customerManage/assistInfollowUp/assistInfollowUp.vue"),
    },
    {
        path: "/hospitalClients",
        name: "hospitalClients",
        meta: {
            title: "三方医院客户",
            keepAlive: false,
            isTag: true,
            openName: ['客户管理'],
        },
        component: () =>
            import ("@/views/customerManage/hospitalClients/hospitalClients.vue"),
    },
];

/**
 * 项目报价管理
 */
const itemQuotedPriceManage = [{
        path: "/quotedPriceActivityList",
        name: "quotedPriceActivityList",
        meta: {
            title: "报价信息列表",
            keepAlive: false,
            isTag: true,
            openName: ['项目报价管理'],
        },
        component: () =>
            import (
                "@/views/itemQuotedPriceManage/quotedPriceActivityList/quotedPriceActivityList.vue"
            ),
    },
    {
        path: "/itemPublish",
        name: "itemPublish",
        meta: {
            title: "项目报价",
            keepAlive: false,
            isTag: true,
            openName: ['项目报价管理'],
        },
        component: () =>
            import ("@/views/itemQuotedPriceManage/itemPublish/itemPublish.vue"),
    },
    {
        path: "/hospitalPartakeItemList",
        name: "hospitalPartakeItemList",
        meta: {
            title: "医院参与项目列表",
            keepAlive: false,
            isTag: true,
            openName: ['项目报价管理'],
        },
        component: () =>
            import ("@/views/itemQuotedPriceManage/hospitalPartakeItemList/hospitalPartakeItemList.vue"),
    },
    {
        path: "/hospitalBrandRegistration",
        name: "hospitalBrandRegistration",
        meta: {
            title: "医院品牌报名",
            keepAlive: false,
            isTag: true,
            openName: ['项目报价管理'],
        },
        component: () =>
            import ("@/views/itemQuotedPriceManage/hospitalBrandRegistration/hospitalBrandRegistration.vue"),
    },
];

/**
 * 礼品管理
 */
const giftManage = [{
        path: "/giftList",
        name: "giftList",
        meta: {
            title: "礼品列表",
            keepAlive: false,
            isTag: true,
            openName: ['礼品管理'],
        },
        component: () =>
            import ("@/views/giftManage/giftList/giftList.vue"),
    },
    {
        path: "/receiveGiftList",
        name: "receiveGiftList",
        meta: {
            title: "已领取礼品列表",
            keepAlive: false,
            isTag: true,
            openName: ['礼品管理'],
        },
        component: () =>
            import ("@/views/giftManage/receiveGiftList/receiveGiftList.vue"),
    },
];

/**
 * 基础数据维护
 */
const baseDataMaintenance = [{
        path: "/trackTypeManage",
        name: "trackTypeManage",
        meta: {
            title: "回访类型管理",
            keepAlive: false,
            isTag: true,
            openName: ['基础数据维护'],
        },
        component: () =>
            import ("@/views/baseDataMaintenance/trackTypeManage/trackTypeManage.vue"),
    },
    {
        path: "/trackToolManage",
        name: "trackToolManage",
        meta: {
            title: "回访工具管理",
            keepAlive: false,
            isTag: true,
            openName: ['基础数据维护'],
        },
        component: () =>
            import ("@/views/baseDataMaintenance/trackToolManage/trackToolManage.vue"),
    },
    {
        path: "/trackThemeManage",
        name: "trackThemeManage",
        meta: {
            title: "回访主题管理",
            keepAlive: false,
            isTag: true,
            openName: ['基础数据维护'],
        },
        component: () =>
            import ("@/views/baseDataMaintenance/trackThemeManage/trackThemeManage.vue"),
    },
    {
        path: "/expressManage",
        name: "expressManage",
        meta: {
            title: "物流公司",
            keepAlive: false,
            isTag: true,
            openName: ['基础数据维护'],
        },
        component: () =>
            import ("@/views/baseDataMaintenance/expressManage/expressManage.vue"),
    },
    {
        path: "/goodsDemand",
        name: "goodsDemand",
        meta: {
            title: "商品需求管理",
            keepAlive: false,
            isTag: true,
            openName: ['基础数据维护'],
        },
        component: () =>
            import ("@/views/baseDataMaintenance/goodsDemand/goodsDemand.vue"),
    },
    {
        path: "/hospitalDepartment",
        name: "hospitalDepartment",
        meta: {
            title: "医院科室",
            keepAlive: false,
            isTag: true,
            openName: ['基础数据维护'],
        },
        component: () =>
            import ("@/views/baseDataMaintenance/hospitalDepartment/hospitalDepartment.vue"),
    },
    {
        path: "/province",
        name: "province",
        meta: {
            title: "省份管理",
            keepAlive: false,
            isTag: true,
            openName: ['基础数据维护'],
        },
        component: () =>
            import ("@/views/baseDataMaintenance/province/province.vue"),
    },
    {
        path: "/MenuManage",
        name: "MenuManage",
        meta: {
            title: "菜单管理",
            keepAlive: false,
            isTag: true,
            openName: ['基础数据维护'],
        },
        component: () =>
            import ("@/views/baseDataMaintenance/menuManage/menuManage.vue"),
    },
    {
        path: "/platformList",
        name: "platformList",
        meta: {
            title: "平台列表",
            keepAlive: false,
            isTag: true,
            openName: ['基础数据维护'],
        },
        component: () =>
            import ("@/views/baseDataMaintenance/platformList/platformList.vue"),
    },
    {
        path: "/buttonManage",
        name: "buttonManage",
        meta: {
            title: "按钮管理",
            keepAlive: false,
            isTag: true,
            openName: ['基础数据维护'],
        },
        component: () =>
            import ("@/views/baseDataMaintenance/buttonManage/buttonManage.vue"),
    },
    {
        path: "/consumptionGrade",
        name: "consumptionGrade",
        meta: {
            title: "消费等级",
            keepAlive: false,
            isTag: true,
            openName: ['基础数据维护'],
        },
        component: () =>
            import ("@/views/baseDataMaintenance/consumptionGrade/consumptionGrade.vue"),
    },
    {
        path: "/hospitalEnvironment",
        name: "hospitalEnvironment",
        meta: {
            title: "医院环境",
            keepAlive: false,
            isTag: true,
            openName: ['基础数据维护'],
        },
        component: () =>
            import ("@/views/baseDataMaintenance/hospitalEnvironment/hospitalEnvironment.vue"),
    },
    {
        path: "/warehouseName",
        name: "warehouseName",
        meta: {
            title: "仓库名称",
            keepAlive: false,
            isTag: true,
            openName: ['基础数据维护'],
        },
        component: () =>
            import ("@/views/baseDataMaintenance/warehouseName/warehouseName.vue"),
    },
];

/**
 * 直播需求管理
 */
const liveRequirementManage = [{
        path: "/liveRequirementList",
        name: "liveRequirementList",
        meta: {
            title: "需求列表",
            keepAlive: false,
            isTag: true,
            openName: ['直播间需求管理'],
        },
        component: () =>
            import ("@/views/liveRequirementManage/liveRequirementList/liveRequirementList.vue"),
    },
    {
        path: "/liveRequirementResponseList",
        name: "liveRequirementResponseList",
        meta: {
            title: "响应列表",
            keepAlive: false,
            isTag: true,
            openName: ['直播间需求管理'],
        },
        component: () =>
            import ("@/views/liveRequirementManage/liveRequirementResponseList/liveRequirementResponseList.vue"),
    },
    {
        path: "/liveRequirementDecideList",
        name: "liveRequirementDecideList",
        meta: {
            title: "评判列表",
            keepAlive: false,
            isTag: true,
            openName: ['直播间需求管理'],
        },
        component: () =>
            import ("@/views/liveRequirementManage/liveRequirementDecideList/liveRequirementDecideList.vue"),
    },
    {
        path: "/liveRequirementExecuteList",
        name: "liveRequirementExecuteList",
        meta: {
            title: "执行列表",
            keepAlive: false,
            isTag: true,
            openName: ['直播间需求管理'],
        },
        component: () =>
            import ("@/views/liveRequirementManage/liveRequirementExecuteList/liveRequirementExecuteList.vue"),
    }
];

/**
 * 会员卡管理
 */
const memberCardManage = [{
    path: "/memberRankList",
    name: "memberRankList",
    meta: {
        title: "会员级别",
        keepAlive: false,
        isTag: true,
        openName: ['会员卡管理'],
    },
    component: () =>
        import ("@/views/memberCardManage/memberRankList/memberRankList.vue"),
}];

/**
 * 商品管理
 */
const goodsManage = [{
        path: "/goodsCategoryList",
        name: "goodsCategoryList",
        meta: {
            title: "商品分类",
            keepAlive: false,
            isTag: true,
            openName: ['商品管理'],
        },
        component: () =>
            import ("@/views/goodsManage/goodsCategoryList/goodsCategoryList.vue"),
    },
    {
        path: "/goodsInfoList",
        name: "goodsInfoList",
        meta: {
            title: "商品列表",
            keepAlive: false,
            isTag: true,
            openName: ['商品管理'],
        },
        component: () =>
            import ("@/views/goodsManage/goodsInfoList/goodsInfoList.vue"),
    }
];
/**
 * 美丽管理
 */
const beautifulManage = [{
        path: "/beautyDiaryTagInfo",
        name: "beautyDiaryTagInfo",
        meta: {
            title: "日记标签",
            keepAlive: false,
            isTag: true,
            openName: ['美丽日记'],
        },
        component: () =>
            import ("@/views/beautifulManage/beautyDiaryTagInfo/beautyDiaryTagInfo.vue"),
    },
    {
        path: "/beautyDiaryManage",
        name: "beautyDiaryManage",
        meta: {
            title: "日记管理",
            keepAlive: false,
            isTag: true,
            openName: ['美丽日记'],
        },
        component: () =>
            import ("@/views/beautifulManage/beautyDiaryManage/beautyDiaryManage.vue"),
    },
];
/**
 * 运营管理
 */
const operationManage = [{
        path: "/anchorMonthlyTarget",
        name: "anchorMonthlyTarget",
        meta: {
            title: "主播IP月度运营目标",
            keepAlive: false,
            isTag: true,
            openName: ['运营管理'],
        },
        component: () =>
            import ("@/views/operationManage/anchorMonthlyTarget/anchorMonthlyTarget.vue"),
    },
    {
        path: "/anchorDayData",
        name: "anchorDayData",
        meta: {
            title: "主播IP日经营数据",
            keepAlive: false,
            isTag: true,
            openName: ['运营管理'],
        },
        component: () =>
            import ("@/views/operationManage/anchorDayData/anchorDayData.vue"),
    },
    {
        path: "/beforeLiveBroadcast",
        name: "beforeLiveBroadcast",
        meta: {
            title: "直播前",
            keepAlive: false,
            isTag: true,
            openName: ['运营管理'],
        },
        component: () =>
            import ("@/views/operationManage/beforeLiveBroadcast/beforeLiveBroadcast.vue"),
    },
    {
        path: "/liveBroadcast",
        name: "liveBroadcast",
        meta: {
            title: "直播中",
            keepAlive: false,
            isTag: true,
            openName: ['运营管理'],
        },
        component: () =>
            import ("@/views/operationManage/liveBroadcast/liveBroadcast.vue"),
    },
    {
        path: "/afterLiveBroadcast",
        name: "afterLiveBroadcast",
        meta: {
            title: "直播后",
            keepAlive: false,
            isTag: true,
            openName: ['运营管理'],
        },
        component: () =>
            import ("@/views/operationManage/afterLiveBroadcast/afterLiveBroadcast.vue"),
    },
];
/**
 * 财务对账单
 */
const financialStatementManage = [{
        path: "/hospitalFinancialStatement",
        name: "hospitalFinancialStatement",
        meta: {
            title: "医院对账单",
            keepAlive: false,
            isTag: true,
            openName: ['财务对账单'],
        },
        component: () =>
            import ("@/views/financialStatementManage/hospitalFinancialStatement/hospitalFinancialStatement.vue"),
    },
    {
        path: "/amyFinancialStatement",
        name: "amyFinancialStatement",
        meta: {
            title: "主播IP日经营数据",
            keepAlive: false,
            isTag: true,
            openName: ['财务对账单'],
        },
        component: () =>
            import ("@/views/financialStatementManage/amyFinancialStatement/amyFinancialStatement.vue"),
    },
    {
        path: "/statementRecord",
        name: "statementRecord",
        meta: {
            title: "对账单记录",
            keepAlive: false,
            isTag: true,
            openName: ['财务对账单'],
        },
        component: () =>
            import ("@/views/financialStatementManage/statementRecord/statementRecord.vue"),
    },
    {
        path: "/lTMAccountStatement",
        name: "lTMAccountStatement",
        meta: {
            title: "对账单记录",
            keepAlive: false,
            isTag: true,
            openName: ['财务对账单'],
        },
        component: () =>
            import ("@/views/financialStatementManage/lTMAccountStatement/lTMAccountStatement.vue"),
    },
];
/**
 * 阿美雅
 */
const ameiyaMange = [{
    path: "/ameiya",
    name: "ameiya",
    meta: {
        title: "公司简介",
        keepAlive: false,
        isTag: true,
        openName: ['啊美雅'],
    },
    component: () =>
        import ("@/views/ameiyaMange/ameiya/ameiya.vue"),
}];
/**
 * 库存管理
 */
const stockMange = [{
        path: "/stockList",
        name: "stockList",
        meta: {
            title: "库存列表",
            keepAlive: false,
            isTag: true,
            openName: ['库存管理'],
        },
        component: () =>
            import ("@/views/stockMange/stockList/stockList.vue"),
    },
    {
        path: "/inventoryList",
        name: "inventoryList",
        meta: {
            title: "盘库列表",
            keepAlive: false,
            isTag: true,
            openName: ['库存管理'],
        },
        component: () =>
            import ("@/views/stockMange/inventoryList/inventoryList.vue"),
    },
    {
        path: "/stockInList",
        name: "stockInList",
        meta: {
            title: "入库列表",
            keepAlive: false,
            isTag: true,
            openName: ['库存管理'],
        },
        component: () =>
            import ("@/views/stockMange/stockInList/stockInList.vue"),
    },
    {
        path: "/issueList",
        name: "issueList",
        meta: {
            title: "出库列表",
            keepAlive: false,
            isTag: true,
            openName: ['库存管理'],
        },
        component: () =>
            import ("@/views/stockMange/issueList/issueList.vue"),
    },
];

export const dynamicRouter = [{
    path: "/home",
    name: "home",
    component: () =>
        import ("@/views/home/home.vue"),
    // 访问home页面，重定向到welcome页面，默认显示welcome页面
    redirect: {
        path: "/welcome"
    },
    children: [{
            path: "/welcome",
            name: "welcome",
            meta: {
                title: "首页",
                keepAlive: false,
                isTag: true,
            },
            component: () =>
                import ("@/views/welcome/welcome.vue"),
        },
        {
            path: "/details/:id",
            name: "details",
            meta: {
                title: (route) => route.query.title,
                keepAlive: false,
                isTag: true,
            },
            component: () =>
                import ("@/views/details/details.vue"),
        },
        ...employeeManage,
        ...carouselManage,
        ...positionManage,
        ...itemManage,
        ...hospitalManage,
        ...appointment,
        ...customerService,
        ...orderManage,
        ...customerManage,
        ...itemQuotedPriceManage,
        ...giftManage,
        ...baseDataMaintenance,
        ...liveRequirementManage,
        ...memberCardManage,
        ...goodsManage,
        ...beautifulManage,
        ...operationManage,
        ...financialStatementManage,
        ...ameiyaMange,
        ...stockMange
    ],
}, ];

const routes = [
    // 重定向，访问/路径，直接跳转到home页面
    {
        path: "/",
        redirect: {
            path: "/home"
        }
    },
    {
        path: "/amiyaLogin",
        name: "amiyaLogin",
        meta: {
            title: "阿美雅登录",
            keepAlive: false,
            isTag: false,
        },
        component: () =>
            import ("@/views/login/amiyaLogin.vue"),
    },
    {
        path: "/hospitalLogin",
        name: "hospitalLogin",
        meta: {
            title: "医院登录",
            keepAlive: false,
            isTag: false,
        },
        component: () =>
            import ("@/views/login/hospitalLogin.vue"),
    },
    {
        path: "*",
        name: "error_404",
        meta: {
            title: "error_404",
            keepAlive: false,
            isTag: false,
        },
        component: () =>
            import ("@/views/error-page/404.vue"),
    },
    {
        path: "/500",
        name: "error_500",
        meta: {
            title: "404",
            keepAlive: false,
            isTag: false,
        },
        component: () =>
            import ("@/views/error-page/500.vue"),
    },
];

const router = new VueRouter({
    routes,
});
export default router;