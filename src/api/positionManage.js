import http from "../http/http";

// 获取职位列表
export const AmiyaPositionInfo = () => {
    return http({
        url: "/amiyabg/AmiyaPositionInfo/list",
        method: "get",
    });
};

// 添加职位
export const addAmiyaPositionInfo = (data) => {
    return http({
        url: "/amiyabg/AmiyaPositionInfo/add",
        method: "post",
        data
    });
};

// 根据职位编号获取职位信息
export const byIdGetAmiyaPositionInfo = (id) => {
    return http({
        url: `/amiyabg/AmiyaPositionInfo/byId/${id}`,
        method: "get",
    });
};

// 修改职位
export const updateAmiyaPositionInfo = (data) => {
    return http({
        url: `/amiyabg/AmiyaPositionInfo`,
        method: "put",
        data
    });
};

// 根据职位编号删除职位
export const deleteAmiyaPositionInfo = (id) => {
    return http({
        url: `/amiyabg/AmiyaPositionInfo/${id}`,
        method: "delete",
    });
};

// 获取有效的部门名称列表  get
export const getAmiyaDepartment = () => {
    return http({
        url: `/amiyabg/AmiyaDepartment/nameList`,
        method: "get",
    });
};

// ​根据职位获取菜单/PermissionModule​/permissionMenuModuleList
export const getPermissionMenu = (positionId) => {
    return http({
        url: `/amiyabg/PermissionModule/permissionMenuModuleList/${positionId}`,
        method: "get",
    });
};
// 根据职位id获取默认首页/PermissionModule​/getDefaultRoute

export const getDefaultRoute = (params) => {
    return http({
        url: "/amiyabg/PermissionModule/getDefaultRoute",
        method: "get",
        params
    });
};
// 分配权限​/PermissionModule​/updateAmyPositionAuth
export const updateAmyPositionAuth = (data) => {
    return http({
        url: `/amiyabg/PermissionModule/updateAmyPositionAuth`,
        method: "put",
        data
    });
};
// 首页置换（更改登陆之后默认首页）
export const updateAmyPositionIndex = (params) => {
    return http({
        url: `/amiyabg/PermissionModule/updateAmyPositionIndex`,
        method: "put",
        params
    });
};
// 获取有效的按钮权限列表
export const getSimplePermissionList = () => {
    return http({
        url: `/amiyabg/PermissionModule/simplePermissionList`,
        method: "get",
    });
};
// 根据职位获取按钮权限
export const getPermissionsById = (positionId) => {
    return http({
        url: `/amiyabg/Permission/getPermissionsById/${positionId}`,
        method: "get",
    });
};

// 修改阿美雅职位按钮权限​/Permission​/updatePermissions
export const updatePermissions = (data) => {
    return http({
        url: `/amiyabg/Permission/updatePermissions`,
        method: "put",
        data
    });
};


/**
 * 医院职位列表
 */

// 获取医院职位列表
export const HospitalPositionInfo = () => {
    return http({
        url: "/amiyabg/HospitalPositionInfo/list",
        method: "get",
    });
};

// 添加医院职位
export const addHospitalPositionInfo = (data) => {
    return http({
        url: "/amiyabg/HospitalPositionInfo/add",
        method: "post",
        data,
    });
};

// 根据医院职位编号获取职位信息
export const byIdGetHospitalPositionInfo = (id) => {
    return http({
        url: `/amiyabg/HospitalPositionInfo/byId/${id}`,
        method: "get",
    });
};

// 修改医院职位
export const updateHospitalPositionInfo = (data) => {
    return http({
        url: `/amiyabg/HospitalPositionInfo`,
        method: "put",
        data
    });
};

// 根据医院职位编号删除职位
export const deleteHospitalPositionInfo = (id) => {
    return http({
        url: `/amiyabg/HospitalPositionInfo/${id}`,
        method: "delete",
    });
};