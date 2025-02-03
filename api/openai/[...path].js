const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = async (req, res) => {
  // 1. 验证访问密码
  const authHeader = req.headers.authorization;
  if (authHeader !== process.env.ACCESS_PASSWORD) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  // 2. 构建代理中间件
  const proxy = createProxyMiddleware({
    target: 'https://api.openai.com',
    changeOrigin: true,
    pathRewrite: { '^/api/openai': '' }, // 移除路径前缀
    onProxyReq: (proxyReq) => {
      // 添加 OpenAI API Key
      proxyReq.setHeader('Authorization', `Bearer ${process.env.OPENAI_API_KEY}`);
    },
    logLevel: 'debug', // 可选：开启调试日志，便于排查问题
  });

  // 3. 包装代理调用以捕获异步错误
  return new Promise((resolve, reject) => {
    proxy(req, res, (result) => {
      if (result instanceof Error) {
        console.error('代理请求出错:', result);
        reject(result);
      } else {
        resolve();
      }
    });
  });
};
