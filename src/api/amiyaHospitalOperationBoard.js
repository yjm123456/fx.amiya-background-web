import http from "../http/http";
// 机构业绩
export const hospitalPerformance = (params) => {
        return http({
            url: "/amiyabg/AmiyaHospitalOperationBoard/hospitalPerformance",
            method: "get",
            params
        });
    }
    // 机构上门
export const hospitalVisitData = (params) => {
        return http({
            url: "/amiyabg/AmiyaHospitalOperationBoard/hospitalVisitData",
            method: "get",
            params
        });
    }
    // 机构业绩折线图
export const hospitalPerformancebrokenLineData = (params) => {
        return http({
            url: "/amiyabg/AmiyaHospitalOperationBoard/hospitalPerformancebrokenLineData",
            method: "get",
            params
        });
    }
    // 机构上门客资折线图
export const hospitalVisitBrokenLineData = (params) => {
        return http({
            url: "/amiyabg/AmiyaHospitalOperationBoard/hospitalVisitBrokenLineData",
            method: "get",
            params
        });
    }
    // 机构新老客业绩漏斗图
export const hospitalPerformanceFilterData = (params) => {
        return http({
            url: "/amiyabg/AmiyaHospitalOperationBoard/hospitalPerformanceFilterData",
            method: "get",
            params
        });
    }
    // 机构周期转化
export const getHospitalTransformCycleData = (params) => {
        return http({
            url: "/amiyabg/AmiyaHospitalOperationBoard/getHospitalTransformCycleData",
            method: "get",
            params
        });
    }
    // 机构线索数据
export const hospitalHospitalCluesData = (params) => {
        return http({
            url: "/amiyabg/AmiyaHospitalOperationBoard/hospitalHospitalCluesData",
            method: "get",
            params
        });
    }
    // 机构业绩贡献占比柱形图
export const hospitalPerformanceRateData = (params) => {
    return http({
        url: "/amiyabg/AmiyaHospitalOperationBoard/hospitalPerformanceRateData",
        method: "get",
        params
    });
}