import http from "../http/http";
/**
 * 复盘基础信息
 */
// 根据条件获取复盘基础信息
export const getLiveReplay = (params) => {
    return http({
        url: "/amiyabg/LiveReplay/getLiveReplay",
        method: "get",
        params
    });
};
// 添加复盘基础  post
export const addLiveReplay = (data) => {
    return http({
        url: "/amiyabg/LiveReplay",
        method: "post",
        data
    });
};
// 根据编号获取复盘基础
export const byIdLiveReplay = (id) => {
    return http({
        url: `/amiyabg/LiveReplay/getById/${id}`,
        method: "get",
    });
};
// 修改复盘基础   put
export const updateLiveReplay = (data) => {
    return http({
        url: `/amiyabg/LiveReplay`,
        method: "put",
        data
    });
};

// 删除复盘基础  delete
export const deleteLiveReplay = (params) => {
    return http({
        url: `/amiyabg/LiveReplay`,
        method: "delete",
        params
    });
};
/**
 * 直播复盘 成交数据
 */
// 添加直播复盘 成交数据  post
export const addLiveReplayProductDealData = (data) => {
    return http({
        url: "/amiyabg/LiveReplayProductDealData",
        method: "post",
        data
    });
};
// 根据条件获取直播复盘 成交数据信息
export const getLiveReplayProductDealData = (params) => {
    return http({
        url: "/amiyabg/LiveReplayProductDealData/getListWithPage",
        method: "get",
        params
    });
};
// 删除直播复盘成交数据  delete
export const deleteLiveReplayProductDealData = (params) => {
    return http({
        url: `/amiyabg/LiveReplayProductDealData`,
        method: "delete",
        params
    });
};
// 根据直播主播id获取成交数据自动填写
export const LiveReplayProductDealData = (params) => {
    return http({
        url: "/amiyabg/LiveReplayProductDealData",
        method: "get",
        params
    });
};
/**
 * 直播分析-流量优化
 */
// 添加直播分析-流量优化  post
export const addLiveReplayFlowOptimize = (data) => {
    return http({
        url: "/amiyabg/LiveReplayFlowOptimize",
        method: "post",
        data
    });
};
// 根据条件获取直播分析-流量优化信息
export const getLiveReplayFlowOptimize = (params) => {
    return http({
        url: "/amiyabg/LiveReplayFlowOptimize/getListWithPage",
        method: "get",
        params
    });
};
// 删除直播分析-流量优化数据  delete
export const deleteLiveReplayFlowOptimize = (params) => {
    return http({
        url: `/amiyabg/LiveReplayFlowOptimize`,
        method: "delete",
        params
    });
};
// 根据直播主播id获取直播分析-流量优化自动填写
export const LiveReplayFlowOptimize = (params) => {
    return http({
        url: "/amiyabg/LiveReplayFlowOptimize",
        method: "get",
        params
    });
};
/**
 * 直播分析-话术内容
 */
// 添加直播分析-话术内容优化  post
export const addLiveReplayWordAnalyse = (data) => {
    return http({
        url: "/amiyabg/LiveReplayWordAnalyse",
        method: "post",
        data
    });
};
// 根据条件获取直播分析-话术内容优化信息
export const getLiveReplayWordAnalyse = (params) => {
    return http({
        url: "/amiyabg/LiveReplayWordAnalyse/getListWithPage",
        method: "get",
        params
    });
};

// 删除直播分析-话术内容优化数据  delete
export const deleteLiveReplayWordAnalyse = (params) => {
    return http({
        url: `/amiyabg/LiveReplayWordAnalyse`,
        method: "delete",
        params
    });
};
/**
 * 直播复盘-互动数据
 */
// 添加直播复盘-互动数据  post
export const addLiveReplayInteractionlData = (data) => {
    return http({
        url: "/amiyabg/LiveReplayInteractionlData",
        method: "post",
        data
    });
};
// 根据条件获取直播复盘-互动数据信息
export const getLiveReplayInteractionlData = (params) => {
    return http({
        url: "/amiyabg/LiveReplayInteractionlData/getListWithPage",
        method: "get",
        params
    });
};

// 删除直播复盘-互动数据数据  delete
export const deleteLiveReplayInteractionlData = (params) => {
    return http({
        url: `/amiyabg/LiveReplayInteractionlData`,
        method: "delete",
        params
    });
};
// 根据直播主播id获取直播复盘-互动数据自动填写
export const LiveReplayInteractionlData = (params) => {
    return http({
        url: "/amiyabg/LiveReplayInteractionlData",
        method: "get",
        params
    });
};
/**
 * 直播复盘-单品top10数据
 * 
 */
export const addLiveReplayMerchandiseTopData = (data) => {
    return http({
        url: "/amiyabg/LiveReplayMerchandiseTopData",
        method: "post",
        data
    });
};
// 根据条件获取单品top10数据信息
export const getLiveReplayMerchandiseTopData = (params) => {
    return http({
        url: "/amiyabg/LiveReplayMerchandiseTopData/getListWithPage",
        method: "get",
        params
    });
};

// 删除单品top10数据数据  delete
export const deleteLiveReplayMerchandiseTopData = (params) => {
    return http({
        url: `/amiyabg/LiveReplayMerchandiseTopData`,
        method: "delete",
        params
    });
};
// 根据直播主播id获取单品top10数据自动填写
export const LiveReplayMerchandiseTopData = (params) => {
    return http({
        url: "/amiyabg/LiveReplayMerchandiseTopData",
        method: "get",
        params
    });
};