import request from "../axios";

const api = {
    //登录
    login(data) {
        return request({
          url: "/auth/user/login",
          method: "post",
          data: data,
        });
      },
  //注册
  register(data) {
    return request({
      url: "/auth/user/register",
      method: "post",
      data: data,
    });
  },
  //列表
  getlist(params) {
    return request({
      url: "/auth/user/list",
      method: "get",
      params: params,
    });
  },
  //删除
  deletelist(data) {
    return request({
      url: "/auth/user/delete",
      method: "post",
      data: data,
    });
  },
  //获取实体
  getmodel(data) {
    return request({
      url: "/auth/user/model",
      method: "get",
      params: data,
    });
  },
  //更新
  update(data) {
    return request({
      url: "/auth/user/update",
      method: "post",
      data: data,
    });
  },
};

export default api;
