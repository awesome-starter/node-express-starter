// const fs = require('fs')
const http = require('http')
// const https = require('https')
const express = require('express')
const history = require('connect-history-api-fallback')
const rewrites = require('./rewrites')
const router = require('./router')
const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)
const getLocalIPAdress = require('./libs/getLocalIPAdress')

/**
 * 创建 Express 实例
 */
const app = express()
app
  // 强制无 3w
  // .use((req, res, next) => {
  //   if (req.headers.host.includes('www')) {
  //     res.redirect(301, 'https://example.com' + req.url)
  //   } else {
  //     return next()
  //   }
  // })
  // 重定向之后才可以启用路由
  .use(router)
  // 旧页面的 rewire 规则要放在路由后面
  .use(history(rewrites))
  // 静态资源要放在最后面
  .use('/', express.static(resolve('../page')))

/**
 * 创建 https 服务
 * @description 需要读取 SSL 证书
 */
// const httpsServer = https.createServer(
//   {
//     key: fs.readFileSync(resolve('cert/you-cery-file.key')),
//     cert: fs.readFileSync(resolve('cert/you-cery-file.pem')),
//   },
//   app
// )

/**
 * 创建 http 服务
 * @description 直接301重定向到https
 */
const httpServer = http.createServer(app)
// const httpServer = http.createServer((req, res) => {
//   res.writeHead(301, {
//     Location: 'https://example.com' + req.url,
//   })
//   res.end()
// })

/**
 * 启动服务
 */
const port = {
  http: 80,
  https: 443,
}
httpServer.listen(port.http, '0.0.0.0', () => {
  const ip = getLocalIPAdress()

  console.log(`Server running at:`)
  console.log()
  console.log(`> Network:  http://${ip}:${port.http}/`)
  console.log(`> Local:  http://localhost:${port.http}/`)
  console.log()
})
// httpsServer.listen(port.https, '0.0.0.0')
