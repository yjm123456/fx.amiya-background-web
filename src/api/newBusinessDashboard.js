import http from "../http/http";
// 直播前业绩看板数据
export const getBeforeLivingData = (params) => {
        return http({
            url: "/amiyabg/NewBusinessDashboard/getBeforeLivingData",
            method: "get",
            params
        })
    }
    // 直播前业绩趋势图
export const getBeforeLivingBrokenLineData = (params) => {
        return http({
            url: "/amiyabg/NewBusinessDashboard/getBeforeLivingBrokenLineData",
            method: "get",
            params
        })
    }
    // 直播中带货业绩数据
export const getLivingBusinessData = (params) => {
        return http({
            url: "/amiyabg/NewBusinessDashboard/getLivingBusinessData",
            method: "get",
            params
        })
    }
    // 直播中带货业绩趋势图
export const getLivingBusinessBrokenLineData = (params) => {
        return http({
            url: "/amiyabg/NewBusinessDashboard/getLivingBusinessBrokenLineData",
            method: "get",
            params
        })
    }
    // 直播中医美业绩看板数据
export const getLivingAestheticMedicineBusinessData = (params) => {
        return http({
            url: "/amiyabg/NewBusinessDashboard/getLivingAestheticMedicineBusinessData",
            method: "get",
            params
        })
    }
    // 直播中医美业绩趋势图
export const getLivingAestheticMedicineBusinessBrokenLineData = (params) => {
        return http({
            url: "/amiyabg/NewBusinessDashboard/getLivingAestheticMedicineBusinessBrokenLineData",
            method: "get",
            params
        })
    }
    // 直播后业绩看板数据
export const getAfterLivingBusinessData = (params) => {
        return http({
            url: "/amiyabg/NewBusinessDashboard/getAfterLivingBusinessData",
            method: "get",
            params
        })
    }
    // 直播后业绩趋势图
export const getAfterLivingBrokenData = (params) => {
    return http({
        url: "/amiyabg/NewBusinessDashboard/getAfterLivingBrokenData",
        method: "get",
        params
    })
}