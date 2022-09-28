import http from "../http/http";
// 获取优秀机构健康指标信息列表分页
export const getGreatHospitalOperationHealth = (params) => {
    return http({
        url: `/amiyabg/GreatHospitalOperationHealth/list`,
        method: "get",
        params,
    });
};

// 添加优秀机构健康指标数据  post
export const addGreatHospitalOperationHealth = (data) => {
    return http({
        url: `/amiyabg/GreatHospitalOperationHealth`,
        method: "post",
        data,
    });
};

// 根据主题编号回去优秀机构健康指标数据信息
export const byIdGreatHospitalOperationHealth = (id) => {
    return http({
        url: `/amiyabg/GreatHospitalOperationHealth/byId/${id}`,
        method: "get",
    });
};

// 修改优秀机构健康指标数据   put
export const editGreatHospitalOperationHealth = (data) => {
    return http({
        url: `/amiyabg/GreatHospitalOperationHealth`,
        method: "put",
        data,
    });
};

// 删除优秀机构健康指标数据   delete
export const deleteGreatHospitalOperationHealth = (id) => {
    return http({
        url: `/amiyabg/GreatHospitalOperationHealth/${id}`,
        method: "delete",
    });
};
// 根据机构id获取上月与前月新客业绩
export const gethospitalNewCustomerAchievement = (params) => {
    return http({
        url: `/amiyabg/HospitalAchievement/gethospitalNewCustomerAchievement`,
        method: "get",
        params,
    });
};

// 机构运营指标信息列表分页
export const getHospitalOperationIndicator = (params) => {
    return http({
        url: `/amiyabg/HospitalOperationIndicator/listWithPage`,
        method: "get",
        params,
    });
};

// 添加机构运营指标  post
export const addHospitalOperationIndicator = (data) => {
    return http({
        url: `/amiyabg/HospitalOperationIndicator`,
        method: "post",
        data,
    });
};

// 根据主题编号回去机构运营指标信息
export const byIdHospitalOperationIndicator = (id) => {
    return http({
        url: `/amiyabg/HospitalOperationIndicator/byId/${id}`,
        method: "get",
    });
};

// 修改机构运营指标   put
export const editHospitalOperationIndicator = (data) => {
    return http({
        url: `/amiyabg/HospitalOperationIndicator`,
        method: "put",
        data,
    });
};

// 删除机构运营指标   delete
export const deleteHospitalOperationIndicator = (id) => {
    return http({
        url: `/amiyabg/HospitalOperationIndicator/${id}`,
        method: "delete",
    });
};
// 获取机构运营指标名称列表
export const getHospitalOperationIndicatorNameList = () => {
    return http({
        url: `/amiyabg/HospitalOperationIndicator/nameList`,
        method: "get",
    });
};
// 获取机构网咨运营数据分析信息列表
export const HospitalNetWorkConsulationOperationData = (params) => {
    return http({
        url: `/amiyabg/HospitalNetWorkConsulationOperationData/list`,
        method: "get",
        params,
    });
};
// 添加机构网咨运营数据分析信息  post
export const addHospitalNetWorkConsulationOperationData = (data) => {
    return http({
        url: `/amiyabg/HospitalNetWorkConsulationOperationData`,
        method: "post",
        data,
    });
};

// 根据主题编号回去机构网咨运营数据分析信息信息
export const byIdHospitalNetWorkConsulationOperationData = (id) => {
    return http({
        url: `/amiyabg/HospitalNetWorkConsulationOperationData/byId/${id}`,
        method: "get",
    });
};

// 修改机构网咨运营数据分析信息   put
export const editHospitalNetWorkConsulationOperationData = (data) => {
    return http({
        url: `/amiyabg/HospitalNetWorkConsulationOperationData`,
        method: "put",
        data,
    });
};

// 删除机构网咨运营数据分析信息   delete
export const deleteHospitalNetWorkConsulationOperationData = (id) => {
    return http({
        url: `/amiyabg/HospitalNetWorkConsulationOperationData/${id}`,
        method: "delete",
    });
};
// 获取机构填报数据列表
export const HospitalIndicatorFill = (params) => {
    return http({
        url: `/amiyabg/HospitalIndicatorFill/list`,
        method: "get",
        params,
    });
};
// 获取指标数据汇总列表
export const HospitalOperationIndicatorCollect = (params) => {
    return http({
        url: `/amiyabg/HospitalOperationIndicatorCollect/list`,
        method: "get",
        params,
    });
};
// 获取机构运营数据分析信息列表
export const getHospitalOperationData = (params) => {
    return http({
        url: `/amiyabg/HospitalOperationData/list`,
        method: "get",
        params,
    });
};
// 添加机构运营数据分析信息  post
export const addHospitalOperationData = (data) => {
    return http({
        url: `/amiyabg/HospitalOperationData`,
        method: "post",
        data,
    });
};

// 根据主题编号回去机构运营数据分析信息信息
export const byIdHospitalOperationData = (id) => {
    return http({
        url: `/amiyabg/HospitalOperationData/byId/${id}`,
        method: "get",
    });
};

// 修改机构运营数据分析信息   put
export const editHospitalOperationData = (data) => {
    return http({
        url: `/amiyabg/HospitalOperationData`,
        method: "put",
        data,
    });
};

// 删除机构运营数据分析信息   delete
export const deleteHospitalOperationData = (id) => {
    return http({
        url: `/amiyabg/HospitalOperationData/${id}`,
        method: "delete",
    });
};