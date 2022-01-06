/**
 * Rewirte 规则
 * @description 主要用来进行301重定向，只针对相对链接有效
 */
module.exports = {
  rewrites: [
    {
      from: /\/old$/,
      to: '/',
    },
  ],
}
