import request from "@/utils/request";
// 获取style列表
export const getStyleList = (params: object) => {
    return request({ url: `/api/sentence`, params, method: 'GET' })
}