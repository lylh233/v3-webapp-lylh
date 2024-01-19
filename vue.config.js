module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8801/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}