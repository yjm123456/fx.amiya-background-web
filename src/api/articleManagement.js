import http from "../http/http";

// 获取微信公众号消息列表
export const getWechatlist = (params) => {
    return http({
        url: "/amiyabg/BeautyDiaryManage/wechatlist",
        method: "get",
        params
    });
};



// 根据用户编号集合获取昵称头像列表
export const updateWechatDiary = (data) => {
    return http({
        url: "/amiyabg/BeautyDiaryManage/updateWechatDiary",
        method: "put",
        data
    });
};