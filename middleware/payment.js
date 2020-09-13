'use strict'

const Payment = require('../model/payment')

module.exports = {
  getStatus,
  checkout
}

async function getStatus (ctx, next) {
  const paymentId = ctx.params.id
  const payments = await Payment.query()
  .select('status')
  .where({
    id: paymentId
  })

  const payment = payments.shift()
  ctx.body = payment
  ctx.status = 200
  await next()
}

async function checkout (ctx, next) {
  const paymentId = ctx.params.id
  const { customerId, cardNumber, securityCode, validThru} = ctx.request.body

  try {
    await mockPaymentGateway(customerId, cardNumber, securityCode, validThru)
    await Payment.query().update({
      status: 'Paid'
    })
    .where({
      id: paymentId
    })
  } catch (e) {
    console.log(e)
  }
  ctx.status = 200
  await next()
}

async function mockPaymentGateway (customerId, cardNumber, securityCode, validThru) {
  console.log(customerId)
  console.log(cardNumber)
  console.log(securityCode)
  console.log(validThru)
  return true
}
