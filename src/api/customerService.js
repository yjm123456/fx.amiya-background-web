import http from "../http/http";

// 留言板列表
export const getLeaveMessage = (params) => {
    return http({
        url: `/amiyabg/LeaveMessage/list`,
        method: "get",
        params,
    });
};

// 添加留言回复 post
export const replyLeaveMessage = (data) => {
    return http({
        url: `/fximapi/fxim/LeaveMessage/reply`,
        method: "post",
        data,
    });
};

// 根据客服编号获取聊天用户列表
export const byCustomerServiceIdGetUChatserList = (params) => {
    return http({
        url: `/fximapi/fxim/Chat/chatUserDetailListByEmployeeId`,
        method: "get",
        params,
    });
};

// 根据用户编号和员工编号查询聊天记录
export const byUserIdAndCustomerServiceIdGetChatRecord = (params) => {
    return http({
        url: `/fximapi/fxim/Chat/recordListByEmployeeId`,
        method: "get",
        params,
    });
};
// 获取小程序自动回复列表
export const getMiniProgramAutoSendMessage = () => {
    return http({
        url: `/amiyabg/MiniProgramAutoSendMessage/list`,
        method: "get",
    });
};
// 修改小程序自动回复信息
export const editMiniProgramAutoSendMessage = (data) => {
    return http({
        url: "/amiyabg/MiniProgramAutoSendMessage",
        method: "put",
        data
    });
};