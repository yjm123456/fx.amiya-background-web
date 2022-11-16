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

// 添加机构运营提升计划  post
export const addHospitalImprovePlan = (data) => {
    return http({
        url: `/amiyabg/HospitalImprovePlan`,
        method: "post",
        data,
    });
};
// 编辑机构运营提升计划
export const editHospitalImprovePlans = (data) => {
    return http({
        url: `/amiyabg/HospitalImprovePlan`,
        method: "put",
        data,
    });
};
// 根据主题编号回去机构运营提升计划信息
export const byIdHospitalImprovePlan = (params) => {
    return http({
        url: `/amiyabg/HospitalImprovePlan`,
        method: "get",
        params
    });
};

// 修改机构运营提升计划   put
export const editHospitalImprovePlan = (data) => {
    return http({
        url: `/amiyabg/HospitalImprovePlan`,
        method: "put",
        data,
    });
};

// 删除机构运营提升计划   delete
export const deleteHospitalImprovePlan = (id) => {
    return http({
        url: `/amiyabg/HospitalImprovePlan/${id}`,
        method: "delete",
    });
};


// 获取机构网咨运营数据分析信息列表
export const getHospitalNetWorkConsulationOperationData = (params) => {
    return http({
        url: `/amiyabg/HospitalNetWorkConsulationOperationData/list`,
        method: "get",
        params,
    });
};
// 添加机构网咨运营数据分析信息  post
export const addHospitalNetWorkConsulationOperationDatas = (data) => {
    return http({
        url: `/amiyabg/HospitalNetWorkConsulationOperationData`,
        method: "post",
        data,
    });
};

// 根据主题编号回去机构网咨运营数据分析信息信息
export const byIdHospitalNetWorkConsulationOperationDatas = (id) => {
    return http({
        url: `/amiyabg/HospitalNetWorkConsulationOperationData/byId/${id}`,
        method: "get",
    });
};

// 修改机构网咨运营数据分析信息   put
export const editHospitalNetWorkConsulationOperationDatas = (data) => {
    return http({
        url: `/amiyabg/HospitalNetWorkConsulationOperationData`,
        method: "put",
        data,
    });
};

// 删除机构网咨运营数据分析信息   delete
export const deleteHospitalNetWorkConsulationOperationDatas = (id) => {
    return http({
        url: `/amiyabg/HospitalNetWorkConsulationOperationData/${id}`,
        method: "delete",
    });
};
// 添加优秀机构运营指标批注
export const addAmiyaRemark = (data) => {
    return http({
        url: `/amiyabg/api/Remark/addAmiyaRemark`,
        method: "post",
        data,
    });
};
// 获取优秀机构运营健康啊美雅批注
export const getAmiyaRemark = (params) => {
    return http({
        url: `/amiyabg/api/Remark/getAmiyaRemark`,
        method: "get",
        params,
    });
};
// 添加机构运营数据批注
export const addHospitalOperationRemark = (data) => {
    return http({
        url: `/amiyabg/api/Remark/addHospitalOperationRemark`,
        method: "post",
        data,
    });
};
// 获取机构运营数据批注
export const getHospitalOperationRemark = (params) => {
    return http({
        url: `/amiyabg/api/Remark/getHospitalOperationRemark`,
        method: "get",
        params,
    });
};
// 添加机构网咨运营数据分析批注
export const addHospitalOnlineConsultRemark = (data) => {
    return http({
        url: `/amiyabg/api/Remark/addHospitalOnlineConsultRemark`,
        method: "post",
        data,
    });
};
// 获取机构网咨运营数据分析批注
export const getHospitalOnlineConsultRemark = (params) => {
    return http({
        url: `/amiyabg/api/Remark/getHospitalOnlineConsultRemark`,
        method: "get",
        params,
    });
};


// 获取咨询师运营数据分析信息列表
export const getHospitalConsulationOperationData = (params) => {
    return http({
        url: `/amiyabg/HospitalConsulationOperationData/list`,
        method: "get",
        params,
    });
};
// 添加咨询师运营数据分析信息  post
export const addHospitalConsulationOperationData = (data) => {
    return http({
        url: `/amiyabg/HospitalConsulationOperationData`,
        method: "post",
        data,
    });
};

// 根据主题编号回去咨询师运营数据分析信息信息
export const byIdHospitalConsulationOperationData = (id) => {
    return http({
        url: `/amiyabg/HospitalConsulationOperationData/byId/${id}`,
        method: "get",
    });
};

// 修改咨询师运营数据分析信息   put
export const editHospitalConsulationOperationData = (data) => {
    return http({
        url: `/amiyabg/HospitalConsulationOperationData`,
        method: "put",
        data,
    });
};

// 删除咨询师运营数据分析信息   delete
export const deleteHospitalConsulationOperationData = (id) => {
    return http({
        url: `/amiyabg/HospitalConsulationOperationData/${id}`,
        method: "delete",
    });
};

// 添加机构咨询师运营分析批注
export const addHospitalConsultRemark = (data) => {
    return http({
        url: `/amiyabg/api/Remark/addHospitalConsultRemark`,
        method: "post",
        data,
    });
};
// 获取机构咨询师运营分析批注
export const getHospitalConsultRemark = (params) => {
    return http({
        url: `/amiyabg/api/Remark/getHospitalConsultRemark`,
        method: "get",
        params,
    });
};


// 获取医生运营数据分析列表
export const getHospitalDoctorOperation = (params) => {
    return http({
        url: `/amiyabg/HospitalDoctorOperation/list`,
        method: "get",
        params,
    });
};
// 添加医生运营数据分析  post
export const addHospitalDoctorOperation = (data) => {
    return http({
        url: `/amiyabg/HospitalDoctorOperation`,
        method: "post",
        data,
    });
};

// 根据主题编号回去医生运营数据分析信息
export const byIdHospitalDoctorOperation = (id) => {
    return http({
        url: `/amiyabg/HospitalDoctorOperation/byId/${id}`,
        method: "get",
    });
};

// 修改医生运营数据分析   put
export const editHospitalDoctorOperation = (data) => {
    return http({
        url: `/amiyabg/HospitalDoctorOperation`,
        method: "put",
        data,
    });
};

// 删除医生运营数据分析   delete
export const deleteHospitalDoctorOperation = (id) => {
    return http({
        url: `/amiyabg/HospitalDoctorOperation/${id}`,
        method: "delete",
    });
};
// 添加医生运营数据分析批注
export const addHospitalDoctorRemark = (data) => {
    return http({
        url: `/amiyabg/api/Remark/addHospitalDoctorRemark`,
        method: "post",
        data,
    });
};
// 获取医生运营数据分析批注
export const getHospitalDoctorRemark = (params) => {
    return http({
        url: `/amiyabg/api/Remark/getHospitalDoctorRemark`,
        method: "get",
        params,
    });
};


// 获取成交品项分析列表
export const getHospitalDealItemOperation = (params) => {
    return http({
        url: `/amiyabg/HospitalDealItemOperation/list`,
        method: "get",
        params,
    });
};
// 添加成交品项分析  post
export const addHospitalDealItemOperation = (data) => {
    return http({
        url: `/amiyabg/HospitalDealItemOperation`,
        method: "post",
        data,
    });
};

// 根据主题编号回去成交品项分析信息
export const byIdHospitalDealItemOperation = (id) => {
    return http({
        url: `/amiyabg/HospitalDealItemOperation/byId/${id}`,
        method: "get",
    });
};

// 修改成交品项分析   put
export const editHospitalDealItemOperation = (data) => {
    return http({
        url: `/amiyabg/HospitalDealItemOperation`,
        method: "put",
        data,
    });
};

// 删除成交品项分析   delete
export const deleteHospitalDealItemOperation = (id) => {
    return http({
        url: `/amiyabg/HospitalDealItemOperation/${id}`,
        method: "delete",
    });
};
// 添加成交品项分析批注
export const addHospitalDealRemark = (data) => {
    return http({
        url: `/amiyabg/api/Remark/addHospitalDealRemark`,
        method: "post",
        data,
    });
};
// 获取成交品项分析批注
export const getHospitalDealRemark = (params) => {
    return http({
        url: `/amiyabg/api/Remark/getHospitalDealRemark`,
        method: "get",
        params,
    });
};



// 获取优秀机构数据填报列表
export const getHGreatHospitalDataWrite = (params) => {
    return http({
        url: `/amiyabg/GreatHospitalDataWrite/list`,
        method: "get",
        params,
    });
};
// 添加优秀机构数据填报  post
export const addGreatHospitalDataWrite = (data) => {
    return http({
        url: `/amiyabg/GreatHospitalDataWrite`,
        method: "post",
        data,
    });
};

// 根据主题编号回去优秀机构数据填报信息
export const byIdGreatHospitalDataWrite = (id) => {
    return http({
        url: `/amiyabg/GreatHospitalDataWrite/byId/${id}`,
        method: "get",
    });
};

// 修改优秀机构数据填报   put
export const editGreatHospitalDataWrite = (data) => {
    return http({
        url: `/amiyabg/GreatHospitalDataWrite`,
        method: "put",
        data,
    });
};

// 删除优秀机构数据填报   delete
export const deleteHGreatHospitalDataWrite = (id) => {
    return http({
        url: `/amiyabg/GreatHospitalDataWrite/${id}`,
        method: "delete",
    });
};

// 机构网咨运营数据分析模板导出
export const exportHospitalNetWorkConsulationOperationData = () => {
    return http({
        url: "/amiyabg/HospitalNetWorkConsulationOperationData/exportHospitalNetWorkConsulationOperationData",
        method: "get",
        responseType: 'blob'
    });
};
// 机构咨询师运营数据分析模板导出
export const exportHospitalConsulationOperationData = () => {
    return http({
        url: "/amiyabg/HospitalConsulationOperationData/exportHospitalConsulationOperationData",
        method: "get",
        responseType: 'blob'
    });
};
// 机构医生运营数据分析模板导出
export const exportHospitaDoctorOperationOperationData = () => {
    return http({
        url: "/amiyabg/HospitalDoctorOperation/exportHospitaDoctorOperationOperationData",
        method: "get",
        responseType: 'blob'
    });
};
// 机构成交品相运营数据分析模板导出
export const exportHospitalDealItemOperationData = () => {
    return http({
        url: "/amiyabg/HospitalDealItemOperation/exportHospitalDealItemOperationData",
        method: "get",
        responseType: 'blob'
    });
};
//导入机构网咨运营数据分析
export const hospitalNetWorkConsulationOperationDataInPort = (data) => {
    return http({
        url: `/amiyabg/HospitalNetWorkConsulationOperationData/hospitalNetWorkConsulationOperationDataInPort`,
        method: "put",
        data,
    });
};
//导入机构咨询师运营数据分析
export const hospitalConsulationOperationDataInPort = (data) => {
    return http({
        url: `/amiyabg/HospitalConsulationOperationData/hospitalConsulationOperationDataInPort`,
        method: "put",
        data,
    });
};
//导入机构医生运营数据分析
export const hospitalDoctorOperationDataInPort = (data) => {
    return http({
        url: `/amiyabg/HospitalDoctorOperation/hospitalDoctorOperationDataInPort`,
        method: "put",
        data,
    });
};
//导入机构成交品相运营数据分析
export const hospitalDealItemOperationDataInPort = (data) => {
    return http({
        url: `/amiyabg/HospitalDealItemOperation/hospitalDealItemOperationDataInPort`,
        method: "put",
        data,
    });
};