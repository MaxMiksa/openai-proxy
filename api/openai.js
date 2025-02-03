// 基于 Vercel Serverless Function 的 OpenAI 代理
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  // 1. 验证访问密码
  const authHeader = req.headers.authorization;
  if (authHeader !== process.env.ACCESS_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // 2. 代理到 OpenAI
  createProxyMiddleware({
    target: 'https://api.openai.com',
    changeOrigin: true,
    pathRewrite: { '^/api/openai': '' }, // 移除路径前缀
    onProxyReq: (proxyReq) => {
      proxyReq.setHeader('Authorization', `Bearer ${process.env.OPENAI_API_KEY}`);
    },
  })(req, res);
};
