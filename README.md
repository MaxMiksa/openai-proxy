# OpenAI-Proxy-Easy&Secure
A anonymized proxy service for OpenAI API designed by/for the Norstella Team at CMU Tepper, deployed on the Vercel platform.

卡内基梅隆大学 Tepper 商学院 Norstella 项目团队设计的 OpenAI API 匿名化代理服务，部署在 Vercel 平台上。

## **Index** | 目录

- [1. Project Overview | 项目简介](#1-project-overview--项目简介)
  - [1.1 Project Structure | 文件结构](#11-project-structure--文件结构)
  - [1.2 Features | 功能特点](#12-features--功能特点)
- [2. Comparison of API key protection methods | API 密钥保护方法对比](#2-comparison-of-api-key-protection-methods--api-密钥保护方法对比)
- [3. Deployment | 部署](#3-deployment--部署)
  - [3.1 Deployment Platform | 部署平台](#31-deployment-platform--部署平台)
  - [3.2 Environment Variable Configuration | 环境变量配置](#32-environment-variable-configuration--环境变量配置)
- [4. Usage | 使用方法](#4-usage--使用方法)
  - [4.1 API Call Examples | API 调用示例 (Python)](#41-api-call-examples--api-调用示例-python)
  - [4.2 Supported Models | 可用模型](#42-supported-models--可用模型)
- [5. Additional Info | 补充信息](#5-additional-info--补充信息)
  - [5.1 Security Notes | 安全性注意事项](#51-security-notes--安全性注意事项)
  - [5.2 Contribution Guidelines | 贡献指南](#52-contribution-guidelines--贡献指南)
  - [5.3 Contact | 联系方式](#53-contact--联系方式)
  
---
## **1. Project Overview** | 项目简介

This project has created a secure proxy service that can be quickly reused. It allows authorized users to access OpenAI's API through a single entry point without directly exposing the OpenAI API key. The proxy service protects access through password verification and forwards requests to OpenAI's official API.

这个项目创建了一个可被快速复用的安全代理服务，允许授权用户通过单一接入点访问 OpenAI 的 API，而无需直接暴露 OpenAI API 密钥。代理服务通过密码验证保护访问，并将请求转发到 OpenAI 的官方 API。

### **1.1 Project Structure** | 文件结构

- `api/openai/[...path].js` - API route handler containing request validation and proxy logic
- `vercel.json` - Vercel deployment configuration
- `package.json` - Project dependencies and configuration

### **1.2 Features** | 功能特点

- 🔒 **Access Control**: Protect API access through password verification mechanism
- 🔄 **Request Forwarding**: Seamlessly forward verified requests to the OpenAI API
- 🛡️ **API Key Protection**: Hide OpenAI API key to enhance security
- 📊 **Debug Logging**: Optional debug logging functionality for troubleshooting

- 🔒 **访问控制**：通过密码验证机制保护 API 访问
- 🔄 **请求转发**：将验证后的请求无缝转发到 OpenAI API
- 🛡️ **API 密钥保护**：隐藏 OpenAI API 密钥，增强安全性
- 📊 **调试日志**：可选的调试日志功能，便于问题排查
<p align="right"><a href="#index--目录">Back to Index | 返回目录 ⬆️</a></p>

---
## **2. Comparison of API key protection methods** | API 密钥保护方法对比


| Method | Learning Curve | Implementation Complexity | Security Level | Scalability | Maintenance Cost | Suitable Scenarios | Key Advantages | Potential Drawbacks |
|--------|---------------|--------------------------|---------------|-------------|-----------------|-------------------|----------------|---------------------|
| **Proxy Service** (This solution) | **Very Low** | **Very Low** | Medium | Medium | **Very Low**  | Small teams, rapid prototyping | Simple implementation, quick deployment | Limited functionality, security relies on single password |
| **Backend API Service** | Medium | Medium | High | High | Medium | Medium to large applications, custom logic needs | Complete control over request processing, complex authentication | Server maintenance required, higher development effort |
| **Serverless Functions** | Low-Medium | Low | Medium-High | High | Low | Fluctuating traffic, cost-sensitive projects | On-demand scaling, no server management, cost-effective | Cold start latency, execution time limits |
| **API Gateway** | Medium-High | Medium-High | High | High | Medium | Enterprise applications, multi-API management | Centralized API management, robust security and monitoring | Complex configuration, potential added latency |
| **Environment Variables/Config Management** | Low | Low | Medium-High | Medium | Low | Integration with existing CI/CD pipelines | Seamless integration with dev workflow, key rotation support | Only solves storage issues, needs combination with other methods |
| **Edge Computing Services** | Medium | Medium | Medium-High | High | Low-Medium | Globally distributed apps, low latency needs | Process requests close to users, excellent performance | Debugging challenges, platform limitations |
| **BaaS Platform** | Low-Medium | Low | Medium-High | Medium | Low | Rapid development, frontend focus | Fast development speed, built-in user management | Platform lock-in, customization limitations |
| **Middleware Proxy Services** | Medium | Low-Medium | Medium-High | Medium-High | Low-Medium | LLM-specific applications, multi-model integration | Optimized for LLMs, multi-provider support | May add dependency complexity, additional costs |
| **OAuth 2.0/API Tokens** | High | High | High | High | Medium-High | Multi-user systems, fine-grained access control | Industry-standard security protocol, granular access control | Complex implementation, requires additional infrastructure |
| **WebAssembly Modules** | High | High | Medium | Low | Medium-High | Client-side applications, frontend execution | Enhanced code protection, high performance | Only provides obfuscation rather than true security, steep learning curve |
| **Hybrid Solutions** | High | High | High | High | High | High-security requirements, enterprise applications | Multi-layered defense, maximum security | High complexity, significant development and maintenance costs |

| 方法 | 学习难度 | 实现复杂度 | 安全级别 | 可扩展性 | 维护成本 | 适用场景 | 主要优势 | 潜在缺点 |
|------|----------|------------|----------|----------|----------|----------|----------|----------|
| **代理服务** (本方案) | 极低 | 极低 | 中 | 中 | 低 | 小型团队、快速原型 | 实现简单，快速部署 | 功能相对有限，安全性依赖单一密码 |
| **后端 API 服务** | 中 | 中 | 高 | 高 | 中 | 中大型应用，需要自定义逻辑 | 完全控制请求处理流程，可实现复杂认证 | 需要维护服务器，开发工作量较大 |
| **无服务器函数** | 低-中 | 低 | 中-高 | 高 | 低 | 流量波动大，成本敏感型项目 | 按需扩展，无需服务器管理，成本效益高 | 冷启动延迟，执行时间限制 |
| **API 网关** | 中-高 | 中-高 | 高 | 高 | 中 | 企业级应用，多API管理 | 集中管理多个API，强大的安全和监控功能 | 配置复杂，可能增加请求延迟 |
| **环境变量/配置管理** | 低 | 低 | 中-高 | 中 | 低 | 与现有CI/CD流程集成 | 与开发工作流无缝集成，支持密钥轮换 | 仅解决存储问题，需结合其他方法 |
| **边缘计算服务** | 中 | 中 | 中-高 | 高 | 低-中 | 全球分布式应用，需低延迟 | 靠近用户处理请求，性能优异 | 调试较困难，平台限制 |
| **BaaS平台** | 低-中 | 低 | 中-高 | 中 | 低 | 快速开发，专注前端 | 开发速度快，内置用户管理 | 平台锁定，自定义受限 |
| **中间件代理服务** | 中 | 低-中 | 中-高 | 中-高 | 低-中 | LLM特定应用，多模型集成 | 专为LLM优化，支持多提供商 | 可能增加依赖复杂性，额外成本 |
| **OAuth 2.0/API令牌** | 高 | 高 | 高 | 高 | 中-高 | 多用户系统，需精细权限控制 | 行业标准安全协议，细粒度访问控制 | 实现复杂，需要额外基础设施 |
| **WebAssembly模块** | 高 | 高 | 中 | 低 | 中-高 | 客户端应用，需前端执行 | 增加代码保护，高性能 | 仅提供混淆而非真正安全，学习曲线陡峭 |
| **混合解决方案** | 高 | 高 | 高 | 高 | 高 | 高安全需求，企业级应用 | 多层防御，最大安全保障 | 复杂度高，开发和维护成本大 |
<p align="right"><a href="#index--目录">Back to Index | 返回目录 ⬆️</a></p>

---
## **3. Deployment** | 部署

### **3.1 Deployment Platform** | 部署平台

The project is deployed on the **Vercel** platform at: `https://openai-proxy-delta-ten.vercel.app`

项目部署在 **Vercel** 平台上，URL 为：`https://openai-proxy-delta-ten.vercel.app`

### **3.2 Environment Variable Configuration** | 环境变量配置

The following environment variables need to be set during deployment:

- `ACCESS_PASSWORD`: Password for accessing the proxy service
- `OPENAI_API_KEY`: True OpenAI API key

部署时需要设置以下环境变量：

- `ACCESS_PASSWORD`：访问代理服务的密码
- `OPENAI_API_KEY`：真实 OpenAI API 密钥
<p align="right"><a href="#index--目录">Back to Index | 返回目录 ⬆️</a></p>

---
## **4. Usage** | 使用方法

### **4.1 API Call Examples** | API 调用示例 (Python)

```python
import json
import requests
import textwrap

url = "https://openai-proxy-delta-ten.vercel.app/api/openai/v1/chat/completions"
headers = {
    "Authorization":  # Personalized ACCESS_PASSWORD
}

data = {
    "model": "o3-mini",  # Recommended model
    "messages": [{
        "role": "user", 
        "content": "***" # Ask questions here
    }]
}

response = requests.post(url, json=data, headers=headers)
result = response.json()
print(json.dumps(result, indent=2))
```

### **4.2 Supported Models** | 可用模型

- #### **Recommended Models** | 推荐模型
  - `o3-mini` (Recommended for daily use)
  - `gpt-4o-realtime-preview` (Recommended when real-time data is needed)
  
- #### **Backup Models** | 其他模型
  - `gpt-4o`
  - `gpt-4o-mini`
  - `gpt-4o-realtime-preview`
  - `o1` (Higher cost)
  - `o1-mini`
<p align="right"><a href="#index--目录">Back to Index | 返回目录 ⬆️</a></p>

---
## **5. Additional Info** | 补充信息
### **5.1 Security Notes** | 安全性注意事项
If want to use this project's way (to allow authorized users to access OpenAI's API through a single entry point without directly exposing the OpenAI API key), please focus on:
- Ensure that `ACCESS_PASSWORD` is strong enough and changed regularly
- Environment variables should be securely configured in the Vercel backend, avoiding hardcoding in the code
- Regularly check API usage to ensure there is no unauthorized access

如采用本项目的方式（允许授权用户通过单一入口点访问 OpenAI 的 API，而不直接暴露 OpenAI API 密钥），请专注于以下内容：
- 请确保 `ACCESS_PASSWORD` 足够强壮且定期更换
- 环境变量应当在 Vercel 后台安全配置，避免在代码中硬编码
- 定期检查 API 使用情况，确保没有未授权访问

### **5.2 Contribution Guidelines** | 贡献指南

To improve the project or fix issues, please follow these steps:

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

如需对项目进行改进或修复问题，请按照以下步骤：

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个 Pull Request

### **5.3 Contact** | 联系方式

For any questions or suggestions, please contact the Norstella Project Team at Tepper School of Business in Carnegie Mellon University.

如有任何问题或建议，请联系卡内基梅隆大学 Tepper 商学院的 Norstella 项目团队。

Max Kong: zheyuank@andrew.cmu.edu
<p align="right"><a href="#index--目录">Back to Index | 返回目录 ⬆️</a></p>
