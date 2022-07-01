import axios from 'axios';
import { baseUrl } from './evn';
import { throwErr, fromDataTrim, alertMessage, urlencode } from './myUtil';

//  过滤请求
axios.interceptors.request.use(
  config => {
    config.baseURL = baseUrl;
    config.timeout = 15 * 1000;// 请求响应时间;
    config.headers['X-Token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTA2NzYxNDUsInVzZXJuYW1lIjoiTGksIEdlZmVpIChMTkctQ09OKSIsImVtYWlsIjoiZ2VmZWkubGlAbGV4aXNuZXhpcy5jb20iLCJsZGFwdXNlcl9wcmluY2lwYWxfbmFtZSI6ImxpZzMifQ.Ol_vHzu_Q_BSjdOkwo-ObcTeeFkzMmJ1QbKBuYZ7ztk'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response.data);
    } else {
      alertMessage(response.data.title,'warning')
      return Promise.reject(response.data)
    }
  },
  error => {
    if (error && error.response) {
      let res = {}
      res.code = error.response.status
      res.msg = throwErr(error.response.status, error.response) // throwErr 捕捉服务端的http状态码 定义在utils工具类的方法
      alertMessage(res.msg,'warning')
      return Promise.reject(res)
    }
    let tip = error.message;
    if (error.message === 'Network Error') tip = '网络错误，请稍后再试';
    if (error.message.indexOf('timeout') !== -1) tip = '请求超时，请稍后再试';
    alertMessage(tip,'warning');
    return Promise.reject(error)
  }
);
// --------暴露 request 给我们好API 管理--------
export default function request(dataParams, dataType = "json") {
  let { method, url, data, params } = dataParams;
  if (dataType == "fromData") { // fromData类型
    data = fromDataTrim(data);
  }
  // 发送请求 封装 RESTful API的各种请求方式
  method = method.toLocaleLowerCase();
  var sendAxios = null;
  switch (method) {
    case "post":
      sendAxios = axios.post(url, data);
      break;
    case "posturl":
      sendAxios = axios.post(url + '?' + urlencode(data)); // 后端要求 post请求要求参数拼接在url上<-_->
      break;
    case "delete":
      sendAxios = axios.delete(url, { params });
      break;
    case "put":
      sendAxios = axios.put(url, data);
      break;
    case "getblob":
      sendAxios = axios.get(url, { params, responseType:'blob' }); // 导出数据必须返回类型改为blob
      break;
    default: // 默认get请求
      sendAxios = axios.get(url, { params });
      break;
  }
  return sendAxios;
}