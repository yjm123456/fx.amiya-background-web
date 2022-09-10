import http from "../http/http";
/**
 * 主播月度运营目标接口
 */
// 获取主播月度运营目标情况
export const getLiveAnchorMonthlyTargetList = (params) => {
    return http({
        url: "/amiyabg/LiveAnchorMonthlyTarget/listWithPage",
        method: "get",
        params
    });
};
// 获取id和名称（下拉框使用）
export const getLiveAnchorMonthlyTarget = (params) => {
    return http({
        url: "/amiyabg/LiveAnchorMonthlyTarget/getLiveAnchorMonthlyTarget",
        method: "get",
        params
    });
};
// 添加主播月度运营目标情况
export const AddLiveAnchorMonthlyTarget = (data) => {
    return http({
        url: `/amiyabg/LiveAnchorMonthlyTarget`,
        method: "post",
        data,
    });
};
// 修改主播月度运营目标情况
export const editLiveAnchorMonthlyTarget = (data) => {
    return http({
        url: `/amiyabg/LiveAnchorMonthlyTarget`,
        method: "put",
        data,
    });
};
//   根据id获取主播月度运营目标情况
export const byIdLiveAnchorMonthlyTargets = (id) => {
    return http({
        url: `/amiyabg/LiveAnchorMonthlyTarget/byId/${id}`,
        method: "get",
    });
};
// 删除主播月度运营目标情况  delete
export const deleteLiveAnchorMonthlyTarget = (id) => {
        return http({
            url: `/amiyabg/LiveAnchorMonthlyTarget/${id}`,
            method: "DELETE"
        })
    }
    /**
     * 主播日运营
     */
    // 获取主播日运营目标情况
export const getLiveAnchorDailyTarget = (params) => {
    return http({
        url: "/amiyabg/LiveAnchorDailyTarget/listWithPage",
        method: "get",
        params
    });
};
// 添加主播日运营目标情况
export const AddLiveAnchorDailyTarget = (data) => {
    return http({
        url: `/amiyabg/LiveAnchorDailyTarget`,
        method: "post",
        data,
    });
};
// 修改主播日运营目标情况
export const editLiveAnchorDailyTarget = (data) => {
    return http({
        url: `/amiyabg/LiveAnchorDailyTarget`,
        method: "put",
        data,
    });
};
//   根据id获取主播日运营目标情况
export const byIdLiveAnchorDailyTarget = (id) => {
    return http({
        url: `/amiyabg/LiveAnchorDailyTarget/byId/${id}`,
        method: "get",
    });
};
// 删除主播月度运营目标情况  delete
export const deleteLiveAnchorDailyTarget = (id) => {
        return http({
            url: `/amiyabg/LiveAnchorDailyTarget/${id}`,
            method: "DELETE"
        })
    }
    // 运营（下拉框）
export const operatingConsultingNameList = () => {
    return http({
        url: "/amiyabg/AmiyaEmployee/operatingConsultingNameList",
        method: "get",
    });
};
// 网咨（下拉框）
export const netWorkConsultingNameList = () => {
    return http({
        url: "/amiyabg/AmiyaEmployee/netWorkConsultingNameList",
        method: "get",
    });
};
/**
 * 直播前
 */
// 添加直播前数据
export const AddBeforeLivingAdd = (data) => {
    return http({
        url: `/amiyabg/LiveAnchorDailyTarget/BeforeLivingAdd`,
        method: "post",
        data,
    });
};
// 修改直播前数据
export const editBeforeLivingUpdate = (data) => {
    return http({
        url: `/amiyabg/LiveAnchorDailyTarget/BeforeLivingUpdate`,
        method: "put",
        data,
    });
};
/**
 * 直播中
 */
// 添加直播中数据
export const livingAdd = (data) => {
    return http({
        url: `/amiyabg/LiveAnchorDailyTarget/livingAdd`,
        method: "post",
        data,
    });
};
// 修改直播中数据
export const livingUpdate = (data) => {
    return http({
        url: `/amiyabg/LiveAnchorDailyTarget/livingUpdate`,
        method: "put",
        data,
    });
};
/**
 * 直播后
 */
// 添加直播后数据
export const afterLivingAdd = (data) => {
    return http({
        url: `/amiyabg/LiveAnchorDailyTarget/afterLivingAdd`,
        method: "post",
        data,
    });
};
// 修改直播后数据
export const afterLivingUpdate = (data) => {
    return http({
        url: `/amiyabg/LiveAnchorDailyTarget/afterLivingUpdate`,
        method: "put",
        data,
    });
};
// 根据主播id自动生成业绩
export const getLiveAnchorPerformance = (params) => {
    return http({
        url: `/amiyabg/LiveAnchorDailyTarget/getLiveAnchorPerformance`,
        method: "get",
        params
    });
};
// 添加直播前抖音数据
export const BeforeTikTokLivingAdd = (data) => {
    return http({
        url: `/amiyabg/LiveAnchorDailyTarget/BeforeTikTokLivingAdd`,
        method: "post",
        data,
    });
};
// 修改直播前抖音数据
export const BeforeLivingTikTokUpdate = (data) => {
    return http({
        url: `/amiyabg/LiveAnchorDailyTarget/BeforeLivingTikTokUpdate`,
        method: "put",
        data,
    });
};
// 添加直播前知乎数据
export const BeforeZhihuLivingAdd = (data) => {
    return http({
        url: `/amiyabg/LiveAnchorDailyTarget/BeforeZhihuLivingAdd`,
        method: "post",
        data,
    });
};
// 修改直播前知乎数据
export const BeforeLivingZhihuUpdate = (data) => {
    return http({
        url: `/amiyabg/LiveAnchorDailyTarget/BeforeLivingZhihuUpdate`,
        method: "put",
        data,
    });
};
// 添加直播前微博数据
export const BeforeSinaWeiBoLivingAdd = (data) => {
    return http({
        url: `/amiyabg/LiveAnchorDailyTarget/BeforeSinaWeiBoLivingAdd`,
        method: "post",
        data,
    });
};
// 修改直播前微博数据
export const BeforeLivingSinaWeiBoUpdate = (data) => {
    return http({
        url: `/amiyabg/LiveAnchorDailyTarget/BeforeLivingSinaWeiBoUpdate`,
        method: "put",
        data,
    });
};
// 添加直播前小红书数据
export const BeforeXiaoHongShuLivingAdd = (data) => {
    return http({
        url: `/amiyabg/LiveAnchorDailyTarget/BeforeXiaoHongShuLivingAdd`,
        method: "post",
        data,
    });
};
// 修改直播前小红书数据
export const BeforeLivingXiaoHongShuUpdate = (data) => {
    return http({
        url: `/amiyabg/LiveAnchorDailyTarget/BeforeLivingXiaoHongShuUpdate`,
        method: "put",
        data,
    });
};
// 添加直播前微博数据
export const BeforeVideoLivingAdd = (data) => {
    return http({
        url: `/amiyabg/LiveAnchorDailyTarget/BeforeVideoLivingAdd`,
        method: "post",
        data,
    });
};
// 修改直播前微博数据
export const BeforeLivingVideoUpdate = (data) => {
    return http({
        url: `/amiyabg/LiveAnchorDailyTarget/BeforeLivingVideoUpdate`,
        method: "put",
        data,
    });
};