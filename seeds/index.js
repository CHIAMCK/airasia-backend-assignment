const Customer = require('../model/customer')
const Hotel = require('../model/hotel')
const Payment = require('../model/payment')
const Room = require('../model/room')

const customerFixture = require('./fixtures/customer.json')
const hotelFixture = require('./fixtures/hotel.json')
const paymentFixture = require('./fixtures/payment.json')
const roomFixture = require('./fixtures/room.json')

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  await knex('hotel').del()
  await knex('customer').del()
  await knex('room').del()
  await knex('payment').del()

  await Hotel.query(knex).insert(
    hotelFixture
  )

  await Customer.query(knex).insert(
    customerFixture
  )

  await Room.query(knex).insert(
    roomFixture
  )

  await Payment.query(knex).insert(
    paymentFixture
  )
}
