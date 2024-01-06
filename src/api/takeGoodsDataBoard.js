import http from "../http/http";
// 获取GMV看板数据
export const gmvData = (params) => {
        return http({
            url: "/amiyabg/TakeGoodsDataBoard/gmvData",
            method: "get",
            params
        })
    }
    // 获取件数看板数据
export const gmvPackagesData = (params) => {
        return http({
            url: "/amiyabg/TakeGoodsDataBoard/packagesData",
            method: "get",
            params
        })
    }
    // 获取件单价看板数据
export const gmvSinglePriceData = (params) => {
        return http({
            url: "/amiyabg/TakeGoodsDataBoard/singlePriceData",
            method: "get",
            params
        })
    }
    // 获取业绩趋势看板数据
export const gmvDataBrokenLineData = (params) => {
        return http({
            url: "/amiyabg/TakeGoodsDataBoard/gmvDataBrokenLineData",
            method: "get",
            params
        })
    }
    // 获取品类看板分析数据
export const categoryAnalizeData = (params) => {
        return http({
            url: "/amiyabg/TakeGoodsDataBoard/categoryAnalizeData",
            method: "get",
            params
        })
    }
    // 获取品牌看板分析数据
export const brandAnalizeData = (params) => {
        return http({
            url: "/amiyabg/TakeGoodsDataBoard/brandAnalizeData",
            method: "get",
            params
        })
    }
    // 获取品项看板分析数据
export const itemDetailsAnalizeData = (params) => {
    return http({
        url: "/amiyabg/TakeGoodsDataBoard/itemDetailsAnalizeData",
        method: "get",
        params
    })
}