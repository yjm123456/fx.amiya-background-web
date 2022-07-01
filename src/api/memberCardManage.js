import http from "../http/http";

// 获取所有会员等级  get
export const getMemberRankInfo = () => {
    return http({
        url: "/amiyabg/MemberRankInfo/list",
        method: "get",
    });
};

// 添加会员等级   post
export const addMemberRankInfo = (data) => {
    return http({
        url: "/amiyabg/MemberRankInfo",
        method: "post",
        data
    });
};

// 根据编号获取会员等级  get
export const getSingleMemberRankInfo = (id) => {
    return http({
        url: `/amiyabg/MemberRankInfo/${id}`,
        method: "get",
    });
};

// 修改会员等级    put
export const updateMemberRankInfo = (data) => {
    return http({
        url: "/amiyabg/MemberRankInfo",
        method: "put",
        data
    });
};