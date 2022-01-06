/**
 * 路由规则
 * @description 除了静态页面外的访问路径在这里定义
 */
const express = require('express')
const router = express.Router()

// 一个接口
router.get('/api/helloWorld', (req, res) => {
  res.send({
    code: 200,
    data: 'Hello World!',
    msg: 'success',
  })
})

module.exports = router
