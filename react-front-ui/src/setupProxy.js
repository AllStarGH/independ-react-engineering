/*解决react跨域发送请求问题*/

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use('/api',
        createProxyMiddleware({
            target: "http://localhost:1100",
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                '^/api': '',
            },
        }))
}