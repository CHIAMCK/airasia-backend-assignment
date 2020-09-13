'use strict'

const Order = require('../model/order')
const Customer = require('../model/customer')
const Payment = require('../model/payment')
const uuid = require('uuid/v4')
const restfulFilter = require('restful-filter')

module.exports = {
  createOrder,
  listOrder
}

const filterer = restfulFilter({
  case_sensitive: false,
  per_page: 10
})

async function createOrder (ctx, next) {
  let order, customer
  const {
    hotelId, checkInDate, checkOutDate, name,
    email, phoneNumber, roomId, numberOfGuests, totalAmount
  } = ctx.request.body

  const customers = await Customer.query()
    .where('email', email)
    .limit(1)

  // if customer data doesn't exist in database, store it
  if (customers.length === 0) {
    try {
      customer = await Customer.query().insert({
        id: uuid(),
        name: name,
        email: email,
        phone_number: phoneNumber
      })
    } catch (e) {
      return ctx.throw(400, e)
    }
  }

  if (customers.length > 0) {
    customer = customers.shift()
  }

  // create payment
  let payment = await Payment.query().insert({
    id: uuid(),
    total_amount: totalAmount
  })

  try {
    order = await Order.query().insert({
      id: uuid(),
      hotel_id: hotelId,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      room_id: roomId,
      number_of_guests: numberOfGuests,
      customer_id: customer.id,
      payment_id: payment.id
    })
  } catch (e) {
    // if order is failed to create, delete the payment record
    await Payment.query().delete().where({
      id: payment.id
    })
    return ctx.throw(400, e)
  }
  ctx.status = 201
  ctx.body = order
  await next()
}

async function listOrder (ctx, next) {
  let order = []
  let orderQuery
  const queryParams = ctx.request.query

  if (queryParams.hotel) {
    // search by hotel name
    const allowedColumn = ['name']
    const searchParams = filterer.parse(queryParams, allowedColumn).filter

    orderQuery = Order.query()
      .select('check_in_date', 'check_out_date', 'name', 'hotel_order.id')
      .innerJoin('hotel', 'hotel_order.hotel_id', 'hotel.id')

    if (searchParams) {
      for (const searchParam of searchParams) {
        orderQuery.where(searchParam.column, searchParam.operatorSQL, searchParam.value)
      }
      order = await orderQuery
    }
  } else if (queryParams.customer) {
    // search by customer details
    const allowedColumn = ['name', 'email', 'phone_number']
    const searchParams = filterer.parse(queryParams, allowedColumn).filter

    orderQuery = Order.query()
      .select('name', 'email', 'phone_number', 'check_in_date', 'check_out_date', 'hotel_order.id')
      .innerJoin('customer', 'hotel_order.customer_id', 'customer.id')

    if (searchParams) {
      for (const searchParam of searchParams) {
        orderQuery.where(searchParam.column, searchParam.operatorSQL, searchParam.value)
      }
      order = await orderQuery
    }
  }
  ctx.body = order
  ctx.status = 200
  await next()
}
