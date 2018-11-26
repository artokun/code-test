const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/auth', {
      target: process.env.REACT_APP_API_URL || 'http://localhost:8080/'
    })
  )
  app.use(
    proxy('/api', {
      target: process.env.REACT_APP_API_URL || 'http://localhost:8080/'
    })
  )
  app.use(
    proxy('/graphql', {
      target: process.env.REACT_APP_API_URL || 'http://localhost:8080/'
    })
  )
}
