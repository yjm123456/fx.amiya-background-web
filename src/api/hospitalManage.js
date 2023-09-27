import http from "../http/http";

/**
 * 医院
 */

// 获取医院列表
export const HospitalInfo = (params) => {
    return http({
        url: "/amiyabg/HospitalInfo/listWithPage",
        method: "get",
        params
    });
};

// 根据类型取标签列表
export const TagInfonameList = (params) => {
    return http({
        url: "/amiyabg/TagInfo/nameList",
        method: "get",
        params
    });
};

// 添加医院
export const addHospitalInfo = (data) => {
    return http({
        url: "/amiyabg/HospitalInfo/add",
        method: "post",
        data
    });
};

// 根据医院编号获取医院信息
export const byIdGetHospitalInfo = (id) => {
    return http({
        url: `/amiyabg/HospitalInfo/byId/${id}`,
        method: "get",
    });
};

// 修改医院
export const updateHospitalInfo = (data) => {
    return http({
        url: `/amiyabg/HospitalInfo`,
        method: "put",
        data
    });
};

// 根据医院编号删除医院
export const deleteHospitalInfo = (id) => {
    return http({
        url: `/amiyabg/HospitalInfo/${id}`,
        method: "delete",
    });
};
// 获取有效的合作医院城市列表
export const cityListy = () => {
    return http({
        url: "/amiyabg/CooperativeHospitalCity/validList",
        method: "get"
    });
};

/**
 * 医院标签
 */

// 获取所有标签列表分页
export const TagInfo = (params) => {
    return http({
        url: "/amiyabg/TagInfo/listWithPage",
        method: "get",
        params
    });
};

// 添加医院标签
export const addTagInfo = (data) => {
    return http({
        url: "/amiyabg/TagInfo/add",
        method: "post",
        data
    });
};

// 根据标签编号获取标签信息
export const byIdGetTagInfo = (id) => {
    return http({
        url: `/amiyabg/TagInfo/byId/${id}`,
        method: "get",
    });
};

// 修改医院标签信息
export const updateTagInfo = (data) => {
    return http({
        url: `/amiyabg/TagInfo`,
        method: "put",
        data
    });
};

// 删除医院标签
export const deleteTagInfo = (id) => {
    return http({
        url: `/amiyabg/TagInfo/${id}`,
        method: "delete",
    });
};

/**
 * 医生
 */

// 获取医生信息列表 分页
export const Doctor = (params) => {
    return http({
        url: "/amiyabg/Doctor/listWithPage",
        method: "get",
        params
    });
};

// 获取医院名称列表
export const HospitalInfonameList = () => {
    return http({
        url: "/amiyabg/HospitalInfo/nameList",
        method: "get",
    });
};

// 添加医生信息
export const addDoctor = (data) => {
    return http({
        url: "/amiyabg/Doctor",
        method: "post",
        data
    });
};

// 根据医生编号获取医生信息
export const byIdGetDoctor = (id) => {
    return http({
        url: `/amiyabg/Doctor/byId/${id}`,
        method: "get",
    });
};

// 修改医生信息
export const updateDoctor = (data) => {
    return http({
        url: `/amiyabg/Doctor`,
        method: "put",
        data
    });
};

// 删除医生信息
export const deleteDoctor = (id) => {
    return http({
        url: `/amiyabg/Doctor/${id}`,
        method: "delete",
    });
};

/**
 * 医院推荐
 */

// 获取医院推荐列表 分页
export const RecommendHospital = (params) => {
    return http({
        url: "/amiyabg/RecommendHospital/listWithPage",
        method: "get",
        params
    });
};

// 添加医院推荐
export const addRecommendHospital = (data) => {
    return http({
        url: "/amiyabg/RecommendHospital",
        method: "post",
        data
    });
};

// 根据编号获取医院推荐信息
export const byIdGetRecommendHospital = (id) => {
    return http({
        url: `/amiyabg/RecommendHospital/byId/${id}`,
        method: "get",
    });
};

// 修改医院推荐信息
export const updateRecommendHospital = (data) => {
    return http({
        url: `/amiyabg/RecommendHospital`,
        method: "put",
        data
    });
};

// 删除医院推荐信息
export const deleteRecommendHospital = (id) => {
    return http({
        url: `/amiyabg/RecommendHospital/${id}`,
        method: "delete",
    });
};

/**
 * 医院可预约人数
 */

// 获取医院可预约人数列表 分页
export const HospitalAppointmentQuantity = (params) => {
    return http({
        url: "/amiyabg/HospitalAppointmentQuantity/listWithPage",
        method: "get",
        params
    });
};

// 添加医院可预约人数
export const addHospitalAppointmentQuantity = (data) => {
    return http({
        url: "/amiyabg/HospitalAppointmentQuantity",
        method: "post",
        data
    });
};

// 根据编号获取可预约人数
export const byIdGetHospitalAppointmentQuantity = (id) => {
    return http({
        url: `/amiyabg/HospitalAppointmentQuantity/byId/${id}`,
        method: "get",
    });
};

// 修改医院可预约人数
export const updateHospitalAppointmentQuantity = (data) => {
    return http({
        url: `/amiyabg/HospitalAppointmentQuantity`,
        method: "put",
        data
    });
};

// 删除医院可预约人数
export const deleteHospitalAppointmentQuantity = (id) => {
    return http({
        url: `/amiyabg/HospitalAppointmentQuantity/${id}`,
        method: "delete",
    });
};

/**
 * 合作医院城市列表
 */

// 获取合作医院城市列表（分页）
export const getCooperativeHospitalCity = (params) => {
    return http({
        url: "/amiyabg/CooperativeHospitalCity/listWithPage",
        method: "get",
        params
    });
};

// 添加合作医院城市 post
export const addCooperativeHospitalCity = (data) => {
    return http({
        url: "/amiyabg/CooperativeHospitalCity",
        method: "post",
        data
    });
};

// 根据编号获取合作医院城市
export const byIdCooperativeHospitalCity = (id) => {
    return http({
        url: `/amiyabg/CooperativeHospitalCity/byId/${id}`,
        method: "get",
    });
};

// 修改合作医院城市 put
export const updateCooperativeHospitalCity = (data) => {
    return http({
        url: `/amiyabg/CooperativeHospitalCity`,
        method: "put",
        data
    });
};

// 根据编号删除合作医院城市
export const deleteCooperativeHospitalCity = (id) => {
    return http({
        url: `/amiyabg/CooperativeHospitalCity/${id}`,
        method: "delete",
    });
};
// 医院端获取医院资料
export const byIdHospitalInfo = (id) => {
    return http({
        url: `/amiyabg/HospitalInfo/detailsById/${id}`,
        method: "get",
    });
};
// 医院端修改医院信息
export const UpdateHospitalInfo = (data) => {
    return http({
        url: `/amiyabg/HospitalInfo/HospitalUpdate`,
        method: "put",
        data
    });
};
/**
 * 医院资料审核
 */
// 获取医院资料审核情况列表
export const hospitalCheckWithPage = (params) => {
    return http({
        url: `/amiyabg/HospitalInfo/hospitalCheckWithPage`,
        method: "get",
        params
    });
};
//审核医院资料
export const hospitalInfoCheck = (data) => {
    return http({
        url: `/amiyabg/HospitalInfo/hospitalInfoCheck`,
        method: "put",
        data
    });
};
// 获取资料审核通过医院名称列表
export const checkPassedNameList = (params) => {
    return http({
        url: "/amiyabg/HospitalInfo/checkPassedNameList",
        method: "get",
        params
    });
};
// 根据编号获取医院资料
export const detailsById = (id) => {
    return http({
        url: `/amiyabg/HospitalInfo/detailsById/${id}`,
        method: "get",
    });
};
// 医院获取派单未处理信息条数
export const getNotRepeatedSendOrder = () => {
    return http({
        url: "/amiyabg/ContentPlateFormSendOrder/getNotRepeatedSendOrder",
        method: "get",
    });
};
// 医院获取今日未处理数据
export const getTodayNotRepeatedSendOrder = () => {
    return http({
        url: "/amiyabg/HospitalIndexData/getTodayNotRepeatedSendOrder",
        method: "get",
    });
};
// 首页机构数据
export const getHospitalIndexDataHospitalData = () => {
    return http({
        url: "/amiyabg/HospitalIndexData/hospitalData",
        method: "get",
    });
};
// 首页机构数据比例数据
export const gethospitalDataRatio = () => {
    return http({
        url: "/amiyabg/HospitalIndexData/hospitalDataRatio",
        method: "get",
    });
};
// 
// 修改医生在职状态
export const updateDoctorStatus = (data) => {
    return http({
        url: `/amiyabg/Doctor/updateDoctorStatus`,
        method: "put",
        data
    });
};
// 获取接收消息信息
export const getHospitalMessageRecieve = () => {
    return http({
        url: "/amiyabg/api/HospitalMessageRecieve",
        method: "get",
    });
};
// 修改接收消息信息
export const updateHospitalMessageRecieve = (data) => {
    return http({
        url: `/amiyabg/api/HospitalMessageRecieve`,
        method: "put",
        data
    });
};
// 派单顺序名称列表
export const sendOrderList = () => {
    return http({
        url: "/amiyabg/HospitalInfo/sendOrderList",
        method: "get",
    });
};
// 年费或保证金缴纳状态列表
export const payStatusList = () => {
    return http({
        url: "/amiyabg/HospitalInfo/payStatusList",
        method: "get",
    });
};
// 供应商派单指南
export const getAmiyaTotalSendHospitalInstructions = (params) => {
    return http({
        url: "/amiyabg/HospitalInfo/getAmiyaTotalSendHospitalInstructions",
        method: "get",
        params
    });
};
// 修改医院合同信息
export const UpdateContractUrl = (data) => {
    return http({
        url: `/amiyabg/HospitalInfo/UpdateContractUrl`,
        method: "put",
        data
    });
};
/**
 *医院合同
 */
// 根据医院id获取合同列表
export const getContractList = (params) => {
    return http({
        url: "/amiyabg/HospitalInfo/getContractList",
        method: "get",
        params
    });
};
// 添加合同
export const addContract = (data) => {
    return http({
        url: `/amiyabg/HospitalInfo/addContract`,
        method: "post",
        data
    });
};
// 修改合同
export const UpdateContract = (data) => {
    return http({
        url: `/amiyabg/HospitalInfo/UpdateContract`,
        method: "put",
        data
    });
};
// 根据合同id获取合同详情
export const getInfoByContractId = (params) => {
    return http({
        url: "/amiyabg/HospitalInfo/getInfoByContractId",
        method: "get",
        params
    });
};
// 删除合同
export const deleteById = (params) => {
    return http({
        url: `/amiyabg/HospitalInfo/deleteById`,
        method: "delete",
        params
    });
};