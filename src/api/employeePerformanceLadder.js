import http from "../http/http";
// 获取助理业绩提点阶梯列表（分页）  get
export const getEmployeePerformanceLadder = (params) => {
    return http({
        url: "/amiyabg/EmployeePerformanceLadder/listWithPage",
        method: "get",
        params,
    });
};

// 添加助理业绩提点阶梯  post
export const addEmployeePerformanceLadder = (data) => {
    return http({
        url: "/amiyabg/EmployeePerformanceLadder/add",
        method: "post",
        data
    });
};
// 根据编号获取助理业绩提点阶梯
export const byIdEmployeePerformanceLadder = (id) => {
    return http({
        url: `/amiyabg/EmployeePerformanceLadder/byId/${id}`,
        method: "get",
    });
};
// 修改助理业绩提点阶梯   put
export const updateEmployeePerformanceLadder = (data) => {
    return http({
        url: `/amiyabg/EmployeePerformanceLadder`,
        method: "put",
        data
    });
};

// 删除助理业绩提点阶梯  delete
export const deleteEmployeePerformanceLadder = (id) => {
    return http({
        url: `/amiyabg/EmployeePerformanceLadder/${id}`,
        method: "delete",
    });
};
// 获取有效的助理业绩提点阶梯信息 下拉框  get
export const ValidKeyAndValue = (params) => {
    return http({
        url: "/amiyabg/EmployeePerformanceLadder/ValidKeyAndValue",
        method: "get",
        params,
    });
};