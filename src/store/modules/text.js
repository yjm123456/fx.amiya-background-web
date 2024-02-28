import * as api from "../../api/user";

const textBanner = {
    // 用于在全局引用此文中的方法时标识这一个的文件名
    namespaced: true,

    state: {
        // 在这里定义获取数据的变量
        contentText: ''
    },
    mutations: {
        // 获取消息数据
        textSwiper(state) {
            // 获取年月日
            let today = new Date();
            let year = today.getFullYear();
            let month = String(today.getMonth() + 1).padStart(2, '0');
            let day = String(today.getDate()).padStart(2, '0');
            let currentDate = year + '-' + month + '-' + day;

            return api.bannerList({
                noticeType: 5,
                startDate: currentDate,
                endDate: currentDate,
            }).then(res => {
                if (res.code == 0) {
                    const { messageNoticeInfo } = res.data
                    state.contentText = messageNoticeInfo.map(item => { return ' 【' + item.noticeTypeText + '】' + '  ' + item.noticeContent + '    ' + '\xa0' + '\xa0' + '\xa0' + '\xa0' + '\xa0' + '\xa0' + '\xa0' + '\xa0' }).join(' ,   ').replace(/,/g, '   ')
                } else if (res.code == 401) {
                    sessionStorage.clear()
                }
            })
        },
    },
    actions: {
        textSwiper: ({
            commit
        }, msg) => commit("textSwiper"),
    },
};
export default textBanner;