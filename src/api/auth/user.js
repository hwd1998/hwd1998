import request from "../axios";

export function register(data) {
  return request({
    url: "/users/register",
    method: "post",
    data: data,
  });
}

export function getlist(params) {
    return request({
      url: "/users/list",
      method: "get",
      params: params,
    });
  }
  