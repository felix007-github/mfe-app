
import request from '@/config/request';

export function getTableData(params) {
  return request({
    url: 'task/list',
    method: 'get',
    params
  })
}