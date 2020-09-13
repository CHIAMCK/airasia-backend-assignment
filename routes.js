'use strict'

// const login = require('./middleware/login')
// const logout = require('./middleware/logout')
// const signup = require('./middleware/signup')
const order = require('./middleware/order')
const payment = require('./middleware/payment')
const {validateOrderRequest} = require('./middleware/validate')


module.exports = (router) => {
  // router.post('/login', login.validate, login.login)
  // router.post('/logout', logout.logout)
  // router.get('/list', login.list)
  // router.post('/signup', signup.validate, signup.signup)
  router.post('/v1/orders', validateOrderRequest, order.createOrder)
  router.get('/v1/orders', order.listOrder)
  router.get('/v1/payments/:id', payment.getStatus)
  router.post('/v1/payments/:id/checkout', payment.checkout)
}
