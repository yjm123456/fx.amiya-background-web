import http from "../http/http";

// 获取助理业绩目标列表（分页）
export const getEmployeePerformanceTarget = (params) => {
    return http({
        url: "/amiyabg/EmployeePerformanceTarget/listWithPage",
        method: "get",
        params
    });
};

// 添加助理业绩目标
export const addEmployeePerformanceTarget = (data) => {
    return http({
        url: "/amiyabg/EmployeePerformanceTarget/add",
        method: "post",
        data
    });
};
// 编辑助理业绩目标
export const editEmployeePerformanceTarget = (data) => {
    return http({
        url: "/amiyabg/EmployeePerformanceTarget",
        method: "put",
        data
    });
};
// 根据追踪回访提报编号获取助理业绩目标
export const byIdEmployeePerformanceTarget = (id) => {
    return http({
        url: `/amiyabg/EmployeePerformanceTarget/byId/${id}`,
        method: "get",
    });
};
// 删除助理业绩目标
export const deleteEmployeePerformanceTarget = (id) => {
    return http({
        url: `/amiyabg/EmployeePerformanceTarget/${id}`,
        method: "delete",
    });
};