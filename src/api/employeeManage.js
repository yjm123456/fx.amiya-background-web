import http from "../http/http";

/**
 * 阿美雅员工api
 */

// 获取职位列表
export const AmiyaPositionInfo = () => {
    return http({
        url: "/amiyabg/AmiyaPositionInfo/list",
        method: "get",
    });
};

// 添加阿美雅员工信息
export const addAmiyaEmployee = (data) => {
    return http({
        url: "/amiyabg/AmiyaEmployee/add",
        method: "post",
        data
    });
};

// 获取阿美雅员工列表
export const AmiyaEmployee = (params) => {
    return http({
        url: "/amiyabg/AmiyaEmployee/listWithPage",
        method: "get",
        params
    });
};

// 根据员工编号获取员工信息
export const byIdGetAmiyaEmployee = (id) => {
    return http({
        url: `/amiyabg/AmiyaEmployee/byId/${id}`,
        method: "get",
    });
};

// 修改员工信息
export const updateAmiyaEmployee = (data) => {
    return http({
        url: "/amiyabg/AmiyaEmployee/update",
        method: "put",
        data
    });
};

// 根据员工编号删除员工
export const deleteAmiyaEmployee = (id) => {
    return http({
        url: `/amiyabg/AmiyaEmployee/${id}`,
        method: "delete",
    });
};
// 获取有效的主播列表
export const liveAnchorValid = () => {
    return http({
        url: "/amiyabg/LiveAnchor/valid",
        method: "get",
    });
};
// 根据职位id获取人员
export const getEmployeeByPositionId = (params) => {
    return http({
        url: "/amiyabg/AmiyaEmployee/getEmployeeByPositionId",
        method: "get",
        params
    });
};
/**
 * 医院员工api
 */

// 获取医院名称列表
export const HospitalInfonameList = () => {
    return http({
        url: "/amiyabg/HospitalInfo/nameList",
        method: "get",
    });
};

// 添加医院员工信息
export const addHospitalEmployee = (data) => {
    return http({
        url: "/amiyabg/HospitalEmployee/add",
        method: "post",
        data
    });
};

// 获取医院员工列表
export const HospitalEmployee = (params) => {
    return http({
        url: "/amiyabg/HospitalEmployee/listWithPage",
        method: "get",
        params
    });
};

// 根据医院员工编号获取医院员工信息
export const byIdGetHospitalEmployee = (id) => {
    return http({
        url: `/amiyabg/HospitalEmployee/byId/${id}`,
        method: "get",
    });
};

// 修改医院员工信息
export const updateHospitalEmployee = (data) => {
    return http({
        url: "/amiyabg/HospitalEmployee/info",
        method: "put",
        data
    });
};

// 根据医院员工编号删除医院员工
export const deleteHospitalEmployee = (id) => {
    return http({
        url: `/amiyabg/HospitalEmployee/${id}`,
        method: "delete",
    });
};

// 医院职位列表
export const getHospitalPositionInfo = () => {
    return http({
        url: `/amiyabg/HospitalPositionInfo/list`,
        method: "get",
    });
};

// 管理员修改员工密码  put
export const updateAmiyaEmployeePassword = (data) => {
    return http({
        url: "/amiyabg/AmiyaEmployee/updatePasswordById",
        method: "put",
        data
    });
};

// 修改医院员工密码   put
export const updateHospitalEmployeePassword = (data) => {
    return http({
        url: "/amiyabg/HospitalEmployee/passwordById",
        method: "put",
        data
    });
};
// 医院职位列表 （新加的接口）
export const getbyIdAndName = () => {
    return http({
        url: `/amiyabg/HospitalPositionInfo/getbyIdAndName`,
        method: "get",
    });
};

/**
 * IP账户
 */
//  获取主播列表/amiyabg/LiveAnchor​/list
export const getLiveAnchor = (params) => {
    return http({
        url: "/amiyabg/LiveAnchor/list",
        method: "get",
        params
    });
};
// 添加主播账号/amiyabg​/LiveAnchor
export const AddLiveAnchor = (data) => {
    return http({
        url: `/amiyabg/LiveAnchor`,
        method: "post",
        data,
    });
};
// 修改主播账号信息/amiyabg​/LiveAnchor
export const editLiveAnchor = (data) => {
    return http({
        url: `/amiyabg/LiveAnchor`,
        method: "put",
        data,
    });
};
//   根据编号获取主播账号信息
export const byIdLiveAnchor = (id) => {
    return http({
        url: `/amiyabg/LiveAnchor/byId/${id}`,
        method: "get",
    });
};
// 删除主播账号信息  delete
export const deleteLiveAnchor = (id) => {
    return http({
        url: `/amiyabg/LiveAnchor/${id}`,
        method: "DELETE"
    })
}