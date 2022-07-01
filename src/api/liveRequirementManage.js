import http from "../http/http";

// 获取总览数据  get
export const getHeadCollectivityData = () => {
    return http({
        url: "/amiyabg/LiveRequirementInfo/headCollectivityData",
        method: "get",
    });
};

// 获取有效的直播类型名称列表
export const getLiveTypeList = () => {
    return http({
        url: "/amiyabg/LiveType/nameList",
        method: "get",
    });
};

// 获取有效的直播需求类型名称列表
export const getLiveRequirementType = () => {
    return http({
        url: "/amiyabg/LiveRequirementType/nameList",
        method: "get",
    });
};

// 获取有效的部门名称列表
export const getAmiyaDepartment = () => {
    return http({
        url: "/amiyabg/AmiyaDepartment/nameListOfRequirement",
        method: "get",
    });
};
//根据部门编号获取阿美雅职位信息 
export const byDepartmentId = (departmentId) => {
    return http({
        url: `/amiyabg/AmiyaPositionInfo/byDepartmentId/${departmentId }`,
        method: "get",
    });
};
// 获取直播需求信息列表（分页）
export const getLiveRequirementInfo = (params) => {
    return http({
        url: "/amiyabg/LiveRequirementInfo/listWithPage",
        method: "get",
        params,
    });
};

// 添加直播需求  post
export const addLiveRequirement = (data) => {
    return http({
        url: "/amiyabg/LiveRequirementInfo/add",
        method: "post",
        data,
    });
};

// 修改需求信息   put
export const editLiveRequirement = (data) => {
    return http({
        url: "/amiyabg/LiveRequirementInfo",
        method: "put",
        data,
    });
};

// 确定需求执行完成   put
export const confirmFinishLiveRequirement = (id) => {
    return http({
        url: `/amiyabg/LiveRequirementInfo/confirmFinish/${id}`,
        method: "put",
    });
};

// 获取需求进度  get
export const getLiveRequirementProgressBar = (id) => {
    return http({
        url: `/amiyabg/LiveRequirementInfo/progressBar/${id}`,
        method: "get"
    });
};

// 获取未确认完成的需求列表   get
export const getUnConfirmLiveRequirementList = (params) => {
    return http({
        url: `/amiyabg/LiveRequirementInfo/unConfirmList`,
        method: "get",
        params
    });
};

// 获取待响应的需求列表    get
export const getTobeRespondedLiveRequirementInfo = (params) => {
    return http({
        url: "/amiyabg/LiveRequirementInfo/unResponseList",
        method: "get",
        params,
    });
};

// 部门响应直播需求   put
export const judgeLiveRequirement = (data) => {
    return http({
        url: "/amiyabg/LiveRequirementInfo/response",
        method: "put",
        data,
    });
};

// 获取部门已拒绝的需求   get
export const getRejectedDemandList = (params) => {
    return http({
        url: "/amiyabg/LiveRequirementInfo/unRefuseList",
        method: "get",
        params,
    });
};

// 评判直播需求   put
export const decideDepartmentrejectLiveRequirement = (data) => {
    return http({
        url: "/amiyabg/LiveRequirementInfo/decide",
        method: "put",
        data,
    });
};

// 获取未处理的需求列表    Get
export const getUnTreatedList = (params) => {
    return http({
        url: "/amiyabg/LiveRequirementInfo/unTreatedList",
        method: "get",
        params,
    });
};

// 执行直播需求   put
export const executeLiveRequirementInfo = (data) => {
    return http({
        url: "/amiyabg/LiveRequirementInfo/execute",
        method: "put",
        data,
    });
};

// 获取有效的主播列表  get
export const getLiveAnchorList = (params) => {
    return http({
        url: "/amiyabg/LiveAnchor/validList",
        method: "get",
        params
    });
};