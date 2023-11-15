import request from '@/utils/request'
// import * as masterData from './mes/masterData' // 业务接口
// 登录
export const login = () => { return request({ url: `/api/user/login`, method: 'GET' }) }
// 获取style数据
export const getStyleList = (params: object) => {
    return request({ url: `/api/style`, params, method: 'GET' })
}

// 获取style数据
export const getStyleDetail = (id: string) => {
    return request({ url: `/api/style/detail`, params: { id }, method: 'GET' })
}
