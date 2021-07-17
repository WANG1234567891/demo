import request from '@/utils/request'
//查询列表
export function fetchList(params) {
  return request({
    url:'/api-zt/slUserMeb/umlist',
    method:'get',
    params:params
  })
}
//停用恢复
export function createMember(data) {
  return request({
    url:'/api-zt/slUserMeb/userHd',
    method:'post',
    data:data
  })
}
export function updateShowStatus(data) {
  return request({
    url:'/api-member/ums/UmsMember/update/showStatus',
    method:'post',
    data:data
  })
}

export function updateFactoryStatus(data) {
  return request({
    url:'/api-member/ums/UmsMember/update/factoryStatus',
    method:'post',
    data:data
  })
}

export function deleteMember(id) {
  return request({
    url:'/api-member/ums/UmsMember/delete/'+id,
    method:'get',
  })
}

export function getMember(id) {
  return request({
    url:'/api-member/ums/UmsMember/'+id,
    method:'get',
  })
}

export function updateMember(id,data) {
  return request({
    url:'/api-member/ums/UmsMember/update/'+id,
    method:'post',
    data:data
  })
}

export function fetchBlanceList(id) {
  return request({
    url:'/api-member/ums/UmsMember/fetchBlanceList/'+id,
    method:'get',
  })
}
