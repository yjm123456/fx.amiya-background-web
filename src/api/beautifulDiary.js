import http from "../http/http";
/**
 * 日记模块
 */
// 标签列表（分页）
export const getBeautyDiaryTagInfolistWithPage = (params) => {
    return http({
        url: `/amiyabg/BeautyDiaryTagInfo/listWithPage`,
        method: "get",
        params,
    });
};
// 添加日记标签/amiyabg/BeautyDiaryTagInfo​/add
export const addBeautyDiary = (data) => {
    return http({
        url: `/amiyabg/BeautyDiaryTagInfo/add`,
        method: "post",
        data,
    });
};
// 编辑日记标签
export const editBeautyDiaryTag = (data) => {
    return http({
        url: `/amiyabg/BeautyDiaryTagInfo`,
        method: "put",
        data,
    })
};
// 删除日记标签
export const deleteBeautyDiaryTag = (id) => {
    return http({
        url: `/amiyabg/BeautyDiaryTagInfo/${id}`,
        method: "delete",
    });
};
// 根据标签编号获取标签信息
export const byIdBeautyDiaryTagInfo = (id) => {
    return http({
        url: `/amiyabg/BeautyDiaryTagInfo/byId/${id}`,
        method: "get"
    });
};

// 获取可用的标签列表id和name/amiyabg​/BeautyDiaryTagInfo​/nameList
export const getnameList = () => {
    return http({
        url: `/amiyabg/BeautyDiaryTagInfo/nameList`,
        method: "get",
    });
};
/**
 * 日记管理
 */
// 获取日记列表（分页）
export const getBeautyDiaryManageList = (params) => {
    return http({
        url: `/amiyabg/BeautyDiaryManage/list`,
        method: "get",
        params,
    });
};
// 添加日记信息
export const addBeautiful = (data) => {
    return http({
        url: `/amiyabg/BeautyDiaryManage`,
        method: "post",
        data,
    });
};

// 修改日记信息
export const editBeautiful = (data) => {
    return http({
        url: `/amiyabg/BeautyDiaryManage`,
        method: "put",
        data,
    })
};
// 修改日记信息是否发布
export const editUpdateReleaseState = (data) => {
    return http({
        url: `/amiyabg/BeautyDiaryManage/UpdateReleaseState/${data.id}/${data.releaseState}`,
        method: "put",
        data,
    })
};
// 删除日记
export const deleteBeauty = (id) => {
    return http({
        url: `/amiyabg/BeautyDiaryManage/${id}`,
        method: "delete",
    });
};
// 根据编号获取日记详细信息
export const byIdBeauty = (id) => {
    return http({
        url: `/amiyabg/BeautyDiaryManage/${id}`,
        method: "get"
    });
};