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

  // after the payment is made, change the status to Paid
  await Payment.query().update({
    status: 'Paid'
  })
    .where({
      id: paymentId
    })

  ctx.status = 200
  await next()
}
