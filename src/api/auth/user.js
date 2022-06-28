import { request, baseUrl } from "./axios";

export function register(data) {
  return request({
    url: baseUrl + "users/register",
    method: "post",
    data: data,
  });
}
