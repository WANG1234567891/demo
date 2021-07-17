import request from '@/utils/request'
//查询信息
export function fetchList(data) {
    return request({
        url: '/api-zt/slUserMeb/useAssets',
        method: 'post',
        data: data,
    })
}
//查看兑礼卷
export function createdjjBalanceClick(data) {
    return request({
        url: '/api-zt/slUserMeb/userDs',
        method: 'post',
        data: data
    })
}
//购物卷明细
export function deleteslUserMeb(data) {
    return request({
        url: '/api-zt/slUserMeb/userGs',
        method: 'post',
        data: data
    })
}
//积分明细
export function deletesUserJflUserMeb(data) {
    return request({
        url: '/api-zt/slUserMeb/userJf',
        method: 'post',
        data: data
    })
}
//和平村买卖记录
export function createHpcBusiness(data) {
    return request({
        url: '/api-zt/slUserMeb/bsRecords',
        method: 'post',
        data: data
    })
}
//充值记录
export function createRechargeRecord(data) {
    return request({
        url: '/api-zt/slUserMeb/topUpRecords',
        method: 'post',
        data: data
    })
}
//申请提现/打款记录
export function createRemits(data) {
    return request({
        url: '/api-zt/slUserMeb/remits',
        method: 'post',
        data: data
    })
}
//兑礼订单
export function createExList(data) {
    return request({
        url: '/api-zt/slUserMeb/exList',
        method: 'post',
        data: data
    })
}

export function minXi(data) {
    return request({
        url: '/api-zt/slUserMeb/releases',
        data,
        method: 'post'
    })
}

export function createSchool(data) {
    return request({
        url: '/api-member/sys/SysSchool/create',
        method: 'post',
        data: data
    })
}

export function deleteSchool(id) {
    return request({
        url: '/api-member/sys/SysSchool/delete/' + id,
        method: 'get',
    })
}

export function getSchool(id) {
    return request({
        url: '/api-member/sys/SysSchool/' + id,
        method: 'get',
    })
}

export function updateSchool(id, data) {
    return request({
        url: '/api-member/sys/SysSchool/update/' + id,
        method: 'post',
        data: data
    })
}