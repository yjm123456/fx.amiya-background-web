import http from "../http/http";
// 获取粉丝见面会列表  分页
export const getFansMeeting = (params) => {
    return http({
        url: `/amiyabg/FansMeeting/listWithPage`,
        method: "get",
        params,
    });
};
// 添加粉丝见面会信息
export const addFansMeeting = (data) => {
    return http({
        url: `/amiyabg/FansMeeting/add`,
        method: "post",
        data,
    });
};
// 修改粉丝见面会信息/api/Permission/byId/{id}
export const editFansMeeting = (data) => {
    return http({
        url: `/amiyabg/FansMeeting`,
        method: "put",
        data,
    });
};
//   根据粉丝见面会编号获取粉丝见面会信息/api/
export const byIdFansMeeting = (id) => {
    return http({
        url: `/amiyabg/FansMeeting/byId/${id}`,
        method: "get",
    });
};
// 根据id删除粉丝见面会   delete
export const deleteFansMeeting = (id) => {
    return http({
        url: `/amiyabg/FansMeeting/${id}`,
        method: "delete",
    });
};
// 获取有效的粉丝见面会信息 下拉框
export const getValidKeyAndValue = () => {
    return http({
        url: `/amiyabg/FansMeeting/ValidKeyAndValue`,
        method: "get",
    });
};