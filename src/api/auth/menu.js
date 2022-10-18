import request from "../axios";

const api = {
  get(params) {
    return request({
      url: "/auth/menu/list",
      method: "get",
      params: params,
    });
  },

  addmenu(data) {
    return request({
      url: "/auth/menu/add",
      method: "post",
      data: data,
    });
  },

  updatemenu(data) {
    return request({
      url: "/auth/menu/update",
      method: "post",
      data: data,
    });
  },

  remove(data) {
    return request({
      url: "/auth/menu/remove",
      method: "post",
      data: data,
    });
  },
  //获取实体
  getmodel(data) {
    return request({
      url: "/auth/menu/model",
      method: "get",
      params: data,
    });
  },
};

export default api;
