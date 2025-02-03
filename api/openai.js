// 基于 Vercel Serverless Function 的 OpenAI 代理
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  // 验证访问密码
  const authHeader = req.headers.authorization;
  if (authHeader !== process.env.ACCESS_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // 创建代理中间件
  createProxyMiddleware({
    target: 'https://api.openai.com', // OpenAI API 地址
    changeOrigin: true,
    pathRewrite: { '^/api/openai': '' }, // 移除代理路径前缀
    onProxyReq: (proxyReq) => {
      // 注入 OpenAI API Key
      proxyReq.setHeader('Authorization', `Bearer ${process.env.OPENAI_API_KEY}`);
    },
  })(req, res);
};
