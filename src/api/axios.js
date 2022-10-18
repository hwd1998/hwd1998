import axios from "axios";
import NProgress from "nprogress"; // progress bar
import { message } from "antd";
import "nprogress/nprogress.css";

axios.defaults.withCredentials = true;
NProgress.configure({
  showSpinner: false,
});

// HTTPrequest拦截
axios.interceptors.request.use(
  (config) => {
    NProgress.start(); // start progress bar
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// HTTPresponse拦截
axios.interceptors.response.use(
  (res) => {
    NProgress.done();
    const status = Number(res.status) || 200;
    const msg = res.data.msg || "服务端错误";
    if (msg === 401 && res.data.data === "invalid_token") {
      message.error("登录过期，请重新登录");
      // store.dispatch('FedLogOut').then(() => {
      //   router.push({ path: '/login' })
      // })
      return;
    }
    if (status !== 200 || res.data.code === 0) {
      message.error(msg);
      return Promise.reject(new Error(msg));
    }
    return Promise.resolve(res.data);
  },
  (error) => {
    NProgress.done();
    return Promise.reject(new Error(error));
  }
);
//配置拦截器
export default axios;
