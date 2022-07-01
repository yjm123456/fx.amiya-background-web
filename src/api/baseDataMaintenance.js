import http from "../http/http";

// 获取回访类型列表（分页）  get
export const getTrackTypeList = (params) => {
    return http({
        url: "/amiyabg/Track/typeListWithPage",
        method: "get",
        params,
    });
};

// 添加回访类型  post
export const addTrackType = (data) => {
    return http({
        url: "/amiyabg/Track/type",
        method: "post",
        data
    });
};

// 修改回访类型   put
export const updateTrackType = (data) => {
    return http({
        url: `/amiyabg/Track/type`,
        method: "put",
        data
    });
};

// 删除回访类型  delete
export const deleteTrackType = (id) => {
    return http({
        url: `/amiyabg/Track/type/${id}`,
        method: "delete",
    });
};

// 获取回访工具列表（分页） get
export const getTrackToolList = (params) => {
    return http({
        url: "/amiyabg/Track/toolListWithPage",
        method: "get",
        params,
    });
};

// 添加回访工具  post
export const addTrackTool = (data) => {
    return http({
        url: "/amiyabg/Track/tool",
        method: "post",
        data,
    });
};

// 修改回访工具  put
export const updateTrackTool = (data) => {
    return http({
        url: `/amiyabg/Track/tool`,
        method: "put",
        data,
    });
};

// 删除回访工具   delete
export const deleteTrackTool = (id) => {
    return http({
        url: `/amiyabg/Track/tool/${id}`,
        method: "delete",
    });
};

// 获取回访主题列表（分页）
export const getTrackThemeList = (params) => {
    return http({
        url: `/amiyabg/TrackTheme/listWithPage`,
        method: "get",
        params,
    });
};

// 添加回访主题  post
export const addTrackTheme = (data) => {
    return http({
        url: `/amiyabg/TrackTheme`,
        method: "post",
        data,
    });
};

// 根据主题编号回去回访主题信息
export const byIdGetTrackTheme = (id) => {
    return http({
        url: `/amiyabg/TrackTheme/byId/${id}`,
        method: "get",
    });
};

// 修改回访主题   put
export const editTrackTheme = (data) => {
    return http({
        url: `/amiyabg/TrackTheme`,
        method: "put",
        data,
    });
};

// 删除回访主题   delete
export const deleteTrackTheme = (id) => {
    return http({
        url: `/amiyabg/TrackTheme/${id}`,
        method: "delete",
    });
};
/**
 * 物流公司
 */
// 获取物流公司列表  分页
export const getLogisticsCompanyList = (params) => {
    return http({
        url: `/amiyabg/ExpressManage/listWithPage`,
        method: "get",
        params,
    });
};
// 添加物流公司信息
export const addExpressManage = (data) => {
    return http({
        url: `/amiyabg/ExpressManage`,
        method: "post",
        data,
    });
};
// 修改物流公司信息/api/ExpressManage/byId/{id}
export const editExpressManage = (data) => {
    return http({
        url: `/amiyabg/ExpressManage`,
        method: "put",
        data,
    });
};
//   根据物流公司编号获取物流公司信息/api/
export const byIdExpressMange = (id) => {
    return http({
        url: `/amiyabg/ExpressManage/byId/${id}`,
        method: "get",
    });
};
// 根据id删除物流公司   delete
export const deleteExpressManage = (id) => {
    return http({
        url: `/amiyabg/ExpressManage/${id}`,
        method: "delete",
    });
};
/**
 * 医院科室
 */
// 获取医院科室列表  分页
export const getAmiyaHospitalDepartmentList = (params) => {
    return http({
        url: `/amiyabg/AmiyaHospitalDepartment/listWithPage`,
        method: "get",
        params,
    });
};
// 添加科室
export const AddAmiyaHospitalDepartment = (data) => {
    return http({
        url: `/amiyabg/AmiyaHospitalDepartment`,
        method: "post",
        data,
    });
};
// 修改科室信息
export const editAmiyaHospitalDepartment = (data) => {
    return http({
        url: `/amiyabg/AmiyaHospitalDepartment`,
        method: "put",
        data,
    });
};
//   根据医院科室编号获取医院科室信息
export const byIdAmiyaHospitalDepartment = (id) => {
    return http({
        url: `/amiyabg/AmiyaHospitalDepartment/byId/${id}`,
        method: "get",
    });
};
// 删除医院科室信息  delete
export const deleteAmiyaHospitalDepartment = (id) => {
    return http({
        url: `/amiyabg/AmiyaHospitalDepartment/${id}`,
        method: "delete",
    });
};
// 获取医院科室id和名称 （下拉框）
export const getgetAmiyaHospitalDepartmentList = (params) => {
    return http({
        url: `/amiyabg/AmiyaHospitalDepartment/getAmiyaHospitalDepartmentList`,
        method: "get",
        params
    });
};
// 置顶/置底
export const topToBottomClass = (data) => {
    return http({
        url: "/amiyabg/AmiyaHospitalDepartment/movetopordown",
        method: "put",
        data,
    });
};
// 向上/向下​/AmiyaHospitalDepartment​/move
export const moveUpAndDown = (data) => {
    return http({
        url: "/amiyabg/AmiyaHospitalDepartment/move",
        method: "put",
        data,
    });
};
/**
 * 商品需求管理
 */
// 获取商品需求列表  分页
export const getAmiyaGoodsDemandList = (params) => {
    return http({
        url: `/amiyabg/AmiyaGoodsDemand/listWithPage`,
        method: "get",
        params,
    });
};
// 添加商品需求信息
export const AddAmiyaGoodsDemand = (data) => {
    return http({
        url: `/amiyabg/AmiyaGoodsDemand`,
        method: "post",
        data,
    });
};
// 修改商品需求信息
export const editAmiyaGoodsDemand = (data) => {
    return http({
        url: `/amiyabg/AmiyaGoodsDemand`,
        method: "put",
        data,
    });
};
//   根据商品需求编号获取商品需求信息
export const byIdAmiyaGoodsDemand = (id) => {
    return http({
        url: `/amiyabg/AmiyaGoodsDemand/byId/${id}`,
        method: "get",
    });
};
// 删除商品需求信息  delete
export const deleteAmiyaGoodsDemand = (id) => {
    return http({
        url: `/amiyabg/AmiyaGoodsDemand/${id}`,
        method: "delete",
    });
};
/**
 * 省份管理
 */
// 添加省份
export const AddProvince = (data) => {
    return http({
        url: `/amiyabg/Province`,
        method: "post",
        data,
    });
};
// 修改省份/amiyabg​/Province
export const editProvince = (data) => {
    return http({
        url: `/amiyabg/Province`,
        method: "put",
        data,
    });
};
// 删除省份
export const deleteProvince = (id) => {
    return http({
        url: `/amiyabg/Province/${id}`,
        method: "delete",
    });
};

// 根据编号获取省份/amiyabg/Province​/byId/${id}
export const byIdpro = (id) => {
    return http({
        url: `/amiyabg/Province/byId/${id}`,
        method: "get"
    });
};
// 获取省份列表（分页）
export const getProvinceList = (params) => {
    return http({
        url: `/amiyabg/Province/listWithPage`,
        method: "get",
        params,
    });
};
// 获取有效的省份列表（下拉框）
export const getProvinceSelect = () => {
    return http({
        url: `/amiyabg/Province/validList`,
        method: "get",
    });
};
/**
 * 菜单管理
 */
// 获取菜单列表
export const menuModuleList = () => {
    return http({
        url: `/amiyabg/PermissionModule/menuModuleList`,
        method: "get",
    });
};
// 添加一级菜单
export const AddModuleCategory = (data) => {
    return http({
        url: `/amiyabg/PermissionModule/moduleCategory`,
        method: "post",
        data,
    });
};
// 根据编号获取一级菜单
export const byFirstModuleCategory = (moduleCategoryId) => {
    return http({
        url: `/amiyabg/PermissionModule/moduleCategory/${moduleCategoryId}`,
        method: "get"
    });
};
// 修改一级菜单
export const editModuleCategroy = (data) => {
    return http({
        url: `/amiyabg/PermissionModule/moduleCategroy`,
        method: "put",
        data,
    });
};
// 删除一级菜单
export const deleteModuleCategory = (id) => {
    return http({
        url: `/amiyabg/PermissionModule/moduleCategory/${id}`,
        method: "delete",
    });
};
// 向上向下移动一级菜单
export const firstMoveModuleCategory = (data) => {
    return http({
        url: "/amiyabg/PermissionModule/moveModuleCategory",
        method: "put",
        data,
    });
};
// 置顶/置底一级菜单
export const firstMovetopordownModuleCategory = (data) => {
    return http({
        url: "/amiyabg/PermissionModule/movetopordownModuleCategory",
        method: "put",
        data,
    });
};
// 向上向下移动二级菜单
export const secondMoveModuleCategory = (data) => {
    return http({
        url: "/amiyabg/PermissionModule/moveModule",
        method: "put",
        data,
    });
};
// 置顶/置底二级菜单
export const secondMovetopordownModuleCategory = (data) => {
    return http({
        url: "/amiyabg/PermissionModule/movetopordownModule",
        method: "put",
        data,
    });
};
// 添加二级菜单/PermissionModule​/module
export const AddSecondModuleCategory = (data) => {
    return http({
        url: `/amiyabg/PermissionModule/module`,
        method: "post",
        data,
    });
};
// 根据编号获取二级菜单
export const bySecondModuleCategory = (moduleId) => {
    return http({
        url: `/amiyabg/PermissionModule/${moduleId}`,
        method: "get"
    });
};
// 修改二级菜单
export const editSecondModuleCategroy = (data) => {
    return http({
        url: `/amiyabg/PermissionModule/module`,
        method: "put",
        data,
    });
};
// 删除二级菜单
export const deleteSecondModuleCategory = (id) => {
    return http({
        url: `/amiyabg/PermissionModule/module/${id}`,
        method: "delete",
    });
};
// 获取一级菜单 (下拉框)
export const getFirstMenu = () => {
    return http({
        url: `/amiyabg/PermissionModule/moduleCreateList`,
        method: "get",
    });
};

/**
 * 平台列表
 */

// 获取内容平台列表  分页
export const getContentPlatFormList = (params) => {
    return http({
        url: `/amiyabg/ContentPlatForm/listWithPage`,
        method: "get",
        params,
    });
};
// 添加内容平台
export const AddContentPlatForm = (data) => {
    return http({
        url: `/amiyabg/ContentPlatForm`,
        method: "post",
        data,
    });
};
// 修改内容平台信息
export const editContentPlatForm = (data) => {
    return http({
        url: `/amiyabg/ContentPlatForm`,
        method: "put",
        data,
    });
};
//   根据编号获取内容平台信息
export const byIdContentPlatForm = (id) => {
    return http({
        url: `/amiyabg/ContentPlatForm/byId/${id}`,
        method: "get",
    });
};
// 删除内容平台信息  delete
export const deleteContentPlatForm = (id) => {
    return http({
        url: `/amiyabg/ContentPlatForm/${id}`,
        method: "delete",
    });
};
// 获取有效的平台列表
export const getContentPlatFormValidList = () => {
    return http({
        url: `/amiyabg/ContentPlatForm/validList`,
        method: "get",
    });
};
/**
 * 按钮管理
 */
// 获取按钮管理列表  分页
export const getButtonlistWithPage = (params) => {
    return http({
        url: `/amiyabg/Permission/listWithPage`,
        method: "get",
        params,
    });
};
// 添加按钮管理信息
export const addPermission = (data) => {
    return http({
        url: `/amiyabg/Permission`,
        method: "post",
        data,
    });
};
// 修改按钮管理信息/api/Permission/byId/{id}
export const editPermission = (data) => {
    return http({
        url: `/amiyabg/Permission`,
        method: "put",
        data,
    });
};
//   根据按钮管理编号获取按钮管理信息/api/
export const byIdPermission = (id) => {
    return http({
        url: `/amiyabg/Permission/byId/${id}`,
        method: "get",
    });
};
// 根据id删除按钮管理   delete
export const deletePermission = (id) => {
    return http({
        url: `/amiyabg/Permission/${id}`,
        method: "delete",
    });
};
/**
 * 消费等级数据接口
 */
// 获取按钮管理列表  分页
export const getGradelistWithPage = (params) => {
    return http({
        url: `/amiyabg/ConsumptionLevel/listWithPage`,
        method: "get",
        params,
    });
};
// 添加按钮管理信息
export const addConsumptionLevel = (data) => {
    return http({
        url: `/amiyabg/ConsumptionLevel`,
        method: "post",
        data,
    });
};
// 修改按钮管理信息
export const editConsumptionLevel = (data) => {
    return http({
        url: `/amiyabg/ConsumptionLevel`,
        method: "put",
        data,
    });
};
//   根据按钮管理编号获取按钮管理信息/api/
export const byIdConsumptionLevel = (id) => {
    return http({
        url: `/amiyabg/ConsumptionLevel/byId/${id}`,
        method: "get",
    });
};
// 根据id删除按钮管理   delete
export const deleteConsumptionLevel = (id) => {
    return http({
        url: `/amiyabg/ConsumptionLevel/${id}`,
        method: "delete",
    });
};
// 获取消费等级id和名称
export const getConsumptionLevelList = () => {
    return http({
        url: `/amiyabg/ConsumptionLevel/getConsumptionLevelList`,
        method: "get",
    });
};
/**
 * 医院环境
 */
// 获取医院环境信息列表（分页）
export const getHospitalEnvironment = (params) => {
    return http({
        url: "/amiyabg/HospitalEnvironment/listWithPage",
        method: "get",
        params
    });
};

// 添加医院环境 post
export const addHospitalEnvironment = (data) => {
    return http({
        url: "/amiyabg/HospitalEnvironment",
        method: "post",
        data
    });
};

// 根据编号获取医院环境
export const byIdHospitalEnvironment = (id) => {
    return http({
        url: `/amiyabg/HospitalEnvironment/byId/${id}`,
        method: "get",
    });
};

// 修改医院环境 put
export const updateHospitalEnvironment = (data) => {
    return http({
        url: `/amiyabg/HospitalEnvironment`,
        method: "put",
        data
    });
};

// 根据编号删除医院环境
export const deleteHospitalEnvironment = (id) => {
    return http({
        url: `/amiyabg/HospitalEnvironment/${id}`,
        method: "delete",
    });
};
// 获取医院环境id和name
export const getHospitalEnvironmentList = () => {
    return http({
        url: "/amiyabg/HospitalEnvironment/getHospitalEnvironmentList",
        method: "get",
    });
};