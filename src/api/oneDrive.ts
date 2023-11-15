import request from '@/utils/request'
// 获取OneDrive code
export const getCode = () => {
    return request({
        url: `/api/oneDrive/getCode`, method: 'GET'
    })
}
//获取OneDrive Token
export const searchToken = (code: string) => {
    return request({
        url: `/api/oneDrive/searchToken`, params: { code }, method: 'GET'
    })
}
//刷新OneDrive Token
export const refreshToken = (refresh_token: string) => {
    return request({
        url: `/api/oneDrive/refreshToken`, params: { refresh_token }, method: 'GET'
    })
}
// 更新OneDeive Token
export const uploadToken = (onedrive: object) => {
    return request({
        url: `/api/oneDrive/uploadToken`, params: onedrive, method: 'GET'
    })
}
// 查询OneDrive Token
export const getToken = () => {
    return request({
        url: `/api/oneDrive/getToken`, method: 'GET'
    })
}
// 检查OneDrive Token是否过期
export const checkToken = () => {
    return request({
        url: `/me/drive/root/children`, method: 'GET', oneDriveHttp: true
    })
}
export const getFileChildren = (itemId:string) => {
    return request({
        url: `/me/drive/items/${itemId}/children`, method: 'GET', oneDriveHttp: true
    })
}