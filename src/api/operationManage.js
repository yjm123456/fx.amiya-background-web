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