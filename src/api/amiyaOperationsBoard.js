import http from "../http/http";
// 获取啊美雅运营看板数据
export const getCustomerData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getCustomerData",
        method: "get",
        params
    });
};
// 获取啊美雅运营看板时间进度和总业绩
export const getTotalAchievementAndDateSchedule = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getTotalAchievementAndDateSchedule",
        method: "get",
        params
    });
};

// 根据条件获取新老客业绩占比（分组）
export const getNewOrOldCustomerCompare = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getNewOrOldCustomerCompare",
        method: "get",
        params
    });
};
// 根据条件获取新老客业绩占比（助理与机构）
export const getNewOrOldCustomerCompareByEmployeeAndHospital = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getNewOrOldCustomerCompareByEmployeeAndHospital",
        method: "get",
        params
    });
};
//流量和客户转化情况
export const companyTransformData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/companyTransformData",
        method: "get",
        params
    });
};
// 助理流量和客户转化情况
export const assistantTransformData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/assistantTransformData",
        method: "get",
        params
    });
};
// 机构转化情况
export const hospitalTransformData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/hospitalTransformData",
        method: "get",
        params
    });
};
// 根据条件获取流量数据
export const getTotalFlowRateAndDateSchedule = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getTotalFlowRateAndDateSchedule",
        method: "get",
        params
    });
};

// 根据条件获取流量分析占比（分组）
export const getGroupFlowRateCompare = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getGroupFlowRateCompare",
        method: "get",
        params
    });
};

// 根据条件获取平台流量分析
export const getFlowRateByContentPlatform = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getFlowRateByContentPlatform",
        method: "get",
        params
    });
};

// 根据平台获取详细流量分析
export const getFlowRateDetailsByContentPlatform = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getFlowRateDetailsByContentPlatform",
        method: "get",
        params
    });
};
// 根据结束时间获取时间进度
export const getTimeSpan = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getTimeSpan",
        method: "get",
        params
    });
};













// 获取客户运营情况数据
export const getCustomerAnalizeData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getCustomerAnalizeData",
        method: "get",
        params
    });
};
// 获取客户指标转化数据
export const getCustomerIndexTransformationData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getCustomerIndexTransformationData",
        method: "get",
        params
    });
};
// 获取助理业绩分析数据
export const getEmployeePerformanceAnalizeData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getEmployeePerformanceAnalizeData",
        method: "get",
        params
    });
};


// 获取公司看板业绩情况数据
export const getcompanyPerformanceData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/companyPerformanceData",
        method: "get",
        params
    });
};
// 获取公司看板获客情况数据
export const getcompanyCustomerAcquisition = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/companyCustomerAcquisition",
        method: "get",
        params
    });
};
// 获取公司看板运营情况数据
export const getcompanyOperationsData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/companyOperationsData",
        method: "get",
        params
    });
};
// 获取公司看板指标转化情况数据
export const getcompanyIndicatorConversionData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/companyIndicatorConversionData",
        method: "get",
        params
    });
};
// 获取助理看板业绩情况数据
export const getassistantPerformanceData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/assistantPerformanceData",
        method: "get",
        params
    });
};
// 获取助理看板获客情况
export const getassistantCustomerAcquisition = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/assistantCustomerAcquisition",
        method: "get",
        params
    });
};
// 获取助理看板运营情况数据
export const getassistantOperationsData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/assistantOperationsData",
        method: "get",
        params
    });
};
// 获取助理看板指标转化情况数据
export const getassistantIndicatorConversionData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/assistantIndicatorConversionData",
        method: "get",
        params
    });
};
// 获取公司当月/历史新客分诊转化情况
export const companyNewCustomerConversionData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/companyNewCustomerConversionData",
        method: "get",
        params
    });
};
// 根据条件获取线索分析柱形图（助理和机构）
export const getCustomerFlowRateByEmployeeAndHospital = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getCustomerFlowRateByEmployeeAndHospital",
        method: "get",
        params
    });
};
// 获取助理业绩目标达成情况
export const assistantTargetCompleteData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/assistantTargetCompleteData",
        method: "get",
        params
    });
};



// 助理业绩看板
// 助理业绩 卡片数据
export const assistantPerformance = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/assistantPerformance",
        method: "get",
        params
    });
};
// 业绩趋势折线图
export const brokenLineData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/brokenLineData",
        method: "get",
        params
    });
};
// 新老客业绩转化漏斗图
export const assistantPerformanceFilterData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/assistantPerformanceFilterData",
        method: "get",
        params
    });
};
// 饼状图
export const analysisData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/analysisData",
        method: "get",
        params
    });
};
//  助理目标完成率和业绩占比  
export const assiatantTargetCompleteAndPerformanceRateData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/assiatantTargetCompleteAndPerformanceRateData",
        method: "get",
        params
    });
};
//  助理机构线索分析数据
export const assistantHospitalCluesData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/assistantHospitalCluesData",
        method: "get",
        params
    });
};
//  助理机构业绩分析数据 
export const assistantHospitalPerformanceData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/assistantHospitalPerformanceData",
        method: "get",
        params
    });
};
//  助理客资分诊数据
export const distributeConsulationData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/distributeConsulationData",
        method: "get",
        params
    });
};
//  助理客资分诊折线图
export const assistantDistributeConsulationBrokenLineData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/assistantDistributeConsulationBrokenLineData",
        method: "get",
        params
    });
};
//  行政客服客资数据
export const adminCustomerServiceCustomerTypeData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/adminCustomerServiceCustomerTypeData",
        method: "get",
        params
    });
};
//  行政客服个人加v后客资数据
export const adminCustomerServiceCustomerTypeAddWechatData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/adminCustomerServiceCustomerTypeAddWechatData",
        method: "get",
        params
    });
};
//  行政客服客资折线图
export const adminCustomerServiceCustomerTypeBrokenLineData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/adminCustomerServiceCustomerTypeBrokenLineData",
        method: "get",
        params
    });
};
//  行政客服漏斗图数据
export const adminCustomerFilterData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/adminCustomerFilterData",
        method: "get",
        params
    });
};
//  行政客服饼状图数据
export const adminCustomerAnalysisData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/adminCustomerAnalysisData",
        method: "get",
        params
    });
};
//  行政客服分诊加v率柱状图数据
export const adminCustomerAssistantDisAndAddVData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/adminCustomerAssistantDisAndAddVData",
        method: "get",
        params
    });
};
//  周期转化
export const getAssistantTransformCycleData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getAssistantTransformCycleData",
        method: "get",
        params
    });
};
//  运营看板周期转化
export const getTransformCycleData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getTransformCycleData",
        method: "get",
        params
    });
};
//  助理看板有效/潜在线索
export const effOrPotDistributeConsulationData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/effOrPotDistributeConsulationData",
        method: "get",
        params
    });
};
//  助理看板有效潜在折线图
export const assistantEffOrPotBrokenLineData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/assistantEffOrPotBrokenLineData",
        method: "get",
        params
    });
};


// 获取直播前客资和业绩数据
export const getBeforeLiveClueAndPerformanceData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getBeforeLiveClueAndPerformanceData",
        method: "get",
        params
    });
};
// 获取直播前线索和业绩折线图数据
export const getBeforeLiveClueAndPerformanceBrokenData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getBeforeLiveClueAndPerformanceBrokenData",
        method: "get",
        params
    });
};
// 获取直播前漏斗图数据
export const getBeforeLiveFilterData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getBeforeLiveFilterData",
        method: "get",
        params
    });
};
// 获取直播前转化周期
export const getBeforeLiveTransformCycleData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getBeforeLiveTransformCycleData",
        method: "get",
        params
    });
};
// 获取直播前业绩占比数据
export const getBeforeLivePerformanceRate = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getBeforeLivePerformanceRate",
        method: "get",
        params
    });
};
// 获取直播前线索目标完成率数据
export const getBeforeLiveTargetCompleteRate = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getBeforeLiveTargetCompleteRate",
        method: "get",
        params
    });
};
// 获取直播前部门平台线索占比数据
export const getBeforeLiveDepartmentContentPlatformClueRate = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getBeforeLiveDepartmentContentPlatformClueRate",
        method: "get",
        params
    });
};
// 获取直播前部门平台业绩占比数据
export const getBeforeLiveDepartmentContentPlatformPerformanceRate = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getBeforeLiveDepartmentContentPlatformPerformanceRate",
        method: "get",
        params
    });
};
// 获取部门详情 
export const getBeforeLiveLiveanchorIPData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getBeforeLiveLiveanchorIPData",
        method: "get",
        params
    });
};
// 获取部门详情 
export const operatingConsultingNameList = () => {
    return http({
        url: "/amiyabg/AmiyaEmployee/operatingConsultingNameList",
        method: "get",
    });
};
//医美业绩趋势
export const getTotalAchievementByYear = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getTotalAchievementByYear",
        method: "get",
        params
    });
};
//医美流量趋势
export const getTotalCluesByYear = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getTotalCluesByYear",
        method: "get",
        params
    });
};
//客服主管看板-转化-助理业绩趋势
export const getTotalAssistantAchievementByYear = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getTotalAssistantAchievementByYear",
        method: "get",
        params
    });
};
//客服主管看板-转化-流量和客户转化情况
export const companyTransformNewData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/companyTransformNewData",
        method: "get",
        params
    });
};
//客服主管看板-转化-助理流量和客户转化情况
export const AmiyaOperationsBoardassistantTransformData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/assistantTransformData",
        method: "get",
        params
    });
};
//助理运营看板-转化-助理月度业绩目标达成情况（助理看板转化）
export const getAssistantTotalAchievementByYear = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/getAssistantTotalAchievementByYear",
        method: "get",
        params
    });
};
//助理运营看板-转化-助理月度线索转化情况（助理看板转化）
export const assistantYearTransformData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/assistantYearTransformData",
        method: "get",
        params
    });
};
//名索看板-转化-名索医美业绩趋势
export const AmiyaMingSuoOperationBoardgetTotalAchievementByYear = (params) => {
    return http({
        url: "/amiyabg/AmiyaMingSuoOperationBoard/getTotalAchievementByYear",
        method: "get",
        params
    });
};
//名索看板-转化-名索医美线索趋势
export const getMingSuoTotalCluesByYear = (params) => {
    return http({
        url: "/amiyabg/AmiyaMingSuoOperationBoard/getMingSuoTotalCluesByYear",
        method: "get",
        params
    });
};
//名索看板-转化-机构转化情况
export const AmiyaMingSuoOperationBoardMingSuoHospitalTransformData = (params) => {
    return http({
        url: "/amiyabg/AmiyaMingSuoOperationBoard/mingSuoHospitalTransformData",
        method: "get",
        params
    });
};
//直播前月度线索转化情况
export const BeforeLivingYearTransformDataa = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/BeforeLivingYearTransformData",
        method: "get",
        params
    });
};
//行政客服月度线索转化情况
export const adminCustomerMonthTransformData = (params) => {
    return http({
        url: "/amiyabg/AmiyaOperationsBoard/adminCustomerMonthTransformData",
        method: "get",
        params
    });
};