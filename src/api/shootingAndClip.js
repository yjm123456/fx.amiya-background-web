import http from "../http/http";
// 获取拍剪组数据信息列表分页
export const getShootingAndClip = (params) => {
    return http({
        url: `/amiyabg/ShootingAndClip/listWithPage`,
        method: "get",
        params,
    });
};

// 添加拍摄组数据  post
export const addShootingAndClip = (data) => {
    return http({
        url: `/amiyabg/ShootingAndClip`,
        method: "post",
        data,
    });
};

// 根据主题编号回去拍摄组数据信息
export const byIdShootingAndClip = (id) => {
    return http({
        url: `/amiyabg/ShootingAndClip/byId/${id}`,
        method: "get",
    });
};

// 修改拍摄组数据   put
export const editShootingAndClip = (data) => {
    return http({
        url: `/amiyabg/ShootingAndClip`,
        method: "put",
        data,
    });
};

// 删除拍摄组数据   delete
export const deleteShootingAndClip = (id) => {
    return http({
        url: `/amiyabg/ShootingAndClip/${id}`,
        method: "delete",
    });
};

// 根据职位id获取人员（非客服）
export const getEmployeeByPositionId = (params) => {
    return http({
        url: `/amiyabg/AmiyaEmployee/getEmployeeByPositionId`,
        method: "get",
        params,
    });
};
// 获取拍剪组视频类型
export const getVideoType = () => {
    return http({
        url: `/amiyabg/ShootingAndClip/getVideoType`,
        method: "get",
    });
};