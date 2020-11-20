// 只要修改了vue.config.js这个配置文件，都要重启项目
module.exports = {
    devServer: {
      // 用代理的方式来解决浏览器同源策略对ajax的限制
      proxy:{
        '/api':{
          target:'http://10.20.158.29:9000',//老师的地址
          changeOrigin:true
        }
      }
    }
  }
  