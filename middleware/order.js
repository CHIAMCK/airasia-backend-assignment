'use strict'

const Order = require('../model/order')
const Customer = require('../model/customer')

module.exports = {
  createOrder,
  validate
}

async function createOrder (ctx, next) {
  const {
    hotelId, checkInDate, checkOutDate, name,
    email, phoneNumber, roomId, numberOfGuests, totalAmount
  } = ctx.request.body

  const customers = await Customer.query()
    .where('email', email)
    .limit(1)

  if (customers.length === 1) {
    Customer.query().insert({
      name: name,
      email: email,
      phoneNumber: phoneNumber
    })
  }

  const customer = customers.shift()

  Order.query().insert({
    hotelId: hotelId,
    checkInDate: checkInDate,
    checkOutDate: checkOutDate,
    roomId: roomId,
    totalAmount: totalAmount,
    numberOfGuests: numberOfGuests,
    customerId: customer.uuid
  })

  ctx.status = 201
  await next()
}

// valiate login payload
// payload must consist of email and password
async function validate (ctx, next) {
  const payload = ctx.request.body
  ctx.assert(payload && payload.email && payload.password, 401, 'Unauthorized')
  ctx.state = payload
  await next()
}
