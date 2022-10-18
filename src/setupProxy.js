
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(
      // match含有users前缀的请求，转发给target
      "/auth",
      {
        target: "http://10.20.116.7:3001",
        changeOrigin: true,
        // 是否去除前缀，根据业务场景去除
        // pathRewrite: {'^/account': ''}
      }
    )
  );
};