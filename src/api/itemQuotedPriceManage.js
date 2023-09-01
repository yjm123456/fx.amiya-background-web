import http from "../http/http";

// 获取报价活动列表（分页）
export const getActivityInfoList = (params) => {
    return http({
        url: "/amiyabg/Activity/infoListWithPage",
        method: "get",
        params
    });
};

// 添加报价活动信息 post
export const addActivityInfo = (data) => {
    return http({
        url: "/amiyabg/Activity/info",
        method: "post",
        data
    });
};

// 根据活动编号获取报价活动信息
export const byIdGetActivityInfo = (activityId) => {
    return http({
        url: `/amiyabg/Activity/infoById/${activityId}`,
        method: "get",
    });
};

// 修改报价活动 put
export const editActivityInfo = (data) => {
    return http({
        url: `/amiyabg/Activity/info`,
        method: "put",
        data
    });
};

// 删除报价活动  delete
export const deleteActivityInfo = (activityId) => {
    return http({
        url: `/amiyabg/Activity/info/${activityId}`,
        method: "delete",
    });
};

// 获取简单有效的项目列表（分页）
export const getItemInfo = (params) => {
    return http({
        url: `/amiyabg/ItemInfo/simpleWithPage`,
        method: "get",
        params
    });
};

// 批量添加活动报价项目  post
export const addActivityItem = (data) => {
    return http({
        url: `/amiyabg/Activity/detailList`,
        method: "post",
        data
    });
};

// 根据活动编号获取报价活动项目列表（分页）
export const byActivityIdGetItemList = (params) => {
    return http({
        url: `/amiyabg/Activity/detailListByActivityId`,
        method: "get",
        params
    });
};
// 根据品牌品类id，品项id获取项目id和名称
export const getItemNameByBrandIdAndCategoryId = (params) => {
    return http({
        url: `/amiyabg/ItemInfo/getItemNameByBrandIdAndCategoryId`,
        method: "get",
        params
    });
};

/**
 * 项目上架
 */

// 获取有效的活动信息列表
export const getValidActivityInfoList = (params) => {
    return http({
        url: `/amiyabg/Activity/validInfoList`,
        method: "get",
        params
    });
};

// 根据活动编号获取报价项目列表（分页）
export const byActivityIdGetOfferItemList = (params) => {
    return http({
        url: `/amiyabg/Activity/detailListByActivityIdWithPage`,
        method: "get",
        params,
    });
};

// 医院获取已参与过并且在该活动存在的项目编号集合   
export const theActivityExistenceOfItemList = (activityId) => {
    return http({
        url: `/amiyabg/HospitalPartakeItem/itemIds/${activityId}`,
        method: "get",
    });
};

// 医院参与报价项目    post
export const hospitalPartakeItem = (data) => {
    return http({
        url: `/amiyabg/HospitalPartakeItem`,
        method: "post",
        data
    });
};

// 获取医院参与过的活动列表  get
export const getHospitalPartakeActivityList = (params) => {
    return http({
        url: `/amiyabg/Activity/hospitalPartakeList`,
        method: "get",
        params
    });
};

// 根据活动编号获取医院参与的报价项目列表
export const byActivityIDgETHospitalPartakeItem = (params) => {
    return http({
        url: `/amiyabg/HospitalPartakeItem/listByActityId`,
        method: "get",
        params
    });
};

/**
 * 项目上架
 */

// 获取所有活动名称列表（分页）
export const getAllActivityList = (params) => {
    return http({
        url: `/amiyabg/Activity/nameList`,
        method: "get",
        params,
    });
};

// 项目

// 获取所有项目名称列表（分页）
export const getAllItemList = (params) => {
    return http({
        url: `/amiyabg/ItemInfo/allNameListWithPage`,
        method: "get",
        params,
    });
};

// 根据项目编号获取参与的医院列表（分页）
export const byItemIdGetPartakeHospitalList = (params) => {
    return http({
        url: `/amiyabg/HospitalPartakeItem/hospitalListByItemIdWithPage`,
        method: "get",
        params,
    });
};

// 根据项目编号导出参与的医院列表
export const byItemIdExportPartakeHospital = (params) => {
    return http({
        url: `/amiyabg/HospitalPartakeItem/exportHospitalListByItemId`,
        method: "get",
        params,
        responseType: 'blob'
    });
};

// 医院

// 获取所有医院名称列表
export const getAllHospitalList = (params) => {
    return http({
        url: `/amiyabg/HospitalInfo/allNameList`,
        method: "get",
        params,
    });
};

// 根据医院编号获取参与的项目列表（分页）
export const byHospitalIdGetPartakeItemList = (params) => {
    return http({
        url: `/amiyabg/HospitalPartakeItem/itemListByHospitalIdWithPage`,
        method: "get",
        params,
    });
};

// 根据医院编号导出参与的项目列表
export const byHospitalIdExportPartakeItem = (params) => {
    return http({
        url: `/amiyabg/HospitalPartakeItem/exportItemListByHospitalId`,
        method: "get",
        params,
        responseType: 'blob'
    });
};

// 城市

// 获取所有合作医院城市列表
export const getAllCooperativeHospitalCity = (params) => {
    return http({
        url: `/amiyabg/CooperativeHospitalCity/allList`,
        method: "get",
        params,
    });
};

// 根据城市和项目获取参与的医院列表（分页）
export const byCityIdAndItemIdGetPartakeHospitalList = (params) => {
    return http({
        url: `/amiyabg/HospitalPartakeItem/hospitalListByCityWithPage`,
        method: "get",
        params,
    });
};

// 根据城市和项目获取参与的医院列表（不分页） 导出
export const byCityAndItemExportPartakeHospital = (params) => {
    return http({
        url: `/amiyabg/HospitalPartakeItem/exportHospitalListByCity`,
        method: "get",
        params,
        responseType: 'blob'
    });
};
/**
 * 医院品牌报名
 */
// 获取医院品牌报名信息列表（分页）
export const getHospitalBrandApply = (params) => {
    return http({
        url: `/amiyabg/HospitalBrandApply/listWithPage`,
        method: "get",
        params,
    });
};
// 修改医院品牌报名信息 put
export const editHospitalBrandApply = (data) => {
    return http({
        url: `/amiyabg/HospitalBrandApply`,
        method: "put",
        data
    });
};
// 根据医院品牌报名编号获取医院品牌报名信息
export const byIdHospitalBrandApply = (id) => {
    return http({
        url: `/amiyabg/HospitalBrandApply/byId/${id}`,
        method: "get",
    });
};
// 删除医院品牌信息报名
export const deleteHospitalBrandApply = (id) => {
    return http({
        url: `/amiyabg/HospitalBrandApply/${id}`,
        method: "delete",
    });
};
// 导出医院品牌报名信息
export const exportHospitalBrandApply = (params) => {
    return http({
        url: "/amiyabg/HospitalBrandApply/Export",
        method: "get",
        params,
        responseType: 'blob'
    });
};
/**
 * 课程报名
 */
export const AmiyaLessonApply = (params) => {
    return http({
        url: `/amiyabg/AmiyaLessonApply/infoList`,
        method: "get",
        params,
    });
};