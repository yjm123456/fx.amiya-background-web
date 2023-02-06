import http from "../http/http";
// 获取操作日志记录
export const getOperationLog = (params) => {
        return http({
            url: "/amiyabg/OperationLog/list",
            method: "get",
            params
        })
    }
    // 获取请求类型名称列表
export const OperationLognameList = () => {
        return http({
            url: "/amiyabg/OperationLog/nameList",
            method: "get",
        })
    }
    // 获取请求来源名称列表
export const sourceNameList = () => {
    return http({
        url: "/amiyabg/OperationLog/sourceNameList",
        method: "get",
    })
}