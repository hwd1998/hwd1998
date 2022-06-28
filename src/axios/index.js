/**
 * 全站http配置
 *
 * header参数说明
 * serialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from "axios";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";

axios.defaults.timeout = 30000;
// 返回其他状态吗
// axios.defaults.validateStatus = function (status) {
//   return status // 默认的
// }
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
// NProgress Configuration
NProgress.configure({
  showSpinner: false,
});

// HTTPrequest拦截
axios.interceptors.request.use(
  (config) => {
    NProgress.start(); // start progress bar
    //   const isToken = (config.headers || {}).isToken === false
    //   let token = store.getters.access_token
    //   if (token && !isToken) {
    //     config.headers['Authorization'] = 'Bearer ' + token// token
    //   }
    //   return config
  },
  (error) => {
    //   return Promise.reject(error)
  }
);
// HTTPresponse拦截
axios.interceptors.response.use(
  (res) => {
    NProgress.done();
    //   const status = Number(res.status) || 200
    //   const message = res.data.msg || errorCode[status] || errorCode['default']
    //   if (status === 401 && res.data.data === 'invalid_token') {
    //     Message({
    //       message: '登录过期，请重新登录',
    //       type: 'error'
    //     })
    //     store.dispatch('FedLogOut').then(() => {
    //       this.$router.push({ path: '/login' })
    //     })
    //     return
    //   }

    //   if (status !== 200 || res.data.code === 1) {
    //     Message({
    //       message: message,
    //       type: 'error'
    //     })
    //     return Promise.reject(new Error(message))
    //   }

    return res;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(new Error(error));
  }
);

export default axios;
