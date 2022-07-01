import http from "../http/http";

// 根据员工编号获取聊天用户列表（分页）
export const getChatUserList = (params) => {
  return http({
    url: "/fximserver/fxim/Chat/chatUserListWithPage",
    method: "get",
    params
  });
};

// 根据用户编号获取聊天记录（分页）
export const getChatRecordList = (params) => {
  return http({
    url: "/fximserver/fxim/Chat/chatRecordListWithPage",
    method: "get",
    params
  });
};

// 根据用户编号集合获取昵称头像列表
export const getUserInfo = (data) => {
  return http({
    url: "/amiyabg/UserInfo/getNickNameList",
    method: "post",
    data
  });
};