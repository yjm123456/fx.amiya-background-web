import http from "../http/http";

// 阿美雅登录
export const amiyaEmployeeLogin = (params) => {
    return http({
        url: "/amiyabg/Auth/amiyaLogin",
        method: "get",
        params
    });
};

// 刷新账号token
export const refreshToken = (employeeType) => {
    return http({
        url: employeeType === "amiyaEmployee" ? "/amiyabg/Auth/amiyaRefreshToken" : "/amiyabg/Auth/hospitalRefreshToken",
        method: "get",
        params: {
            refreshToken: window.sessionStorage.getItem("refreshToken"),
        },
    });
};

// 医院登录
export const hospitalEmployeeLogin = (params) => {
    return http({
        url: "/amiyabg/Auth/hospitalLogin",
        method: "get",
        params
    });
};

// 权限
export const permission = () => {
    return http({
        url: `/amiyabg/Permission/collection`,
        method: "get",
    });
};

// 修改阿美雅员工密码
export const editAmiyaEmployeePassword = (data) => {
    return http({
        url: `/amiyabg/AmiyaEmployee/updatePassword`,
        method: "put",
        data
    });
};

// 修改医院员工密码
export const editHospitalEmployeePassword = (data) => {
    return http({
        url: `/amiyabg/HospitalEmployee/updatePassword`,
        method: "put",
        data
    });
};

// 检查密码是否合法
export const checkPassword = (password) => {
    return http({
        url: `/amiyabg/AmiyaEmployee/checkPassword/${password}`,
        method: "get",
    });
};

// 修改头像
export const updateAvatar = (data) => {
    return http({
        url: `/amiyabg/Auth/updateAvatar`,
        method: "put",
        data
    });
};
// 根据时间、消息类型、获取消息通知列表
export const bannerList = (params) => {
    return http({
        url: `/amiyabg/MessageNotice/bannerList`,
        method: "get",
        params
    });
};