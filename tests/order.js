'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)
chai.should()

describe('#order', () => {
  let server = null
  beforeEach(() => {
    const app = require('../')
    server = chai.request(app)
  })

  it('should create order and return 201', () => {
    return server
      .post('/v1/orders')
      .send({
        hotelId: "391e36f0-f4e6-11ea-adc1-0242ac120002",
        hotelName: "genting hotel",
        checkInDate: "2020-09-12",
        checkOutDate: "2020-09-15",
        name: "hi",
        email: "test@gmail.com",
        phoneNumber: "123123123",
        roomId: "391e33ee-f4e6-11ea-adc1-0242ac120002",
        roomName: "room 1",
        numberOfGuests: 3,
        totalAmount: 30.00
      })
      .then(res => {
        res.body.should.include.all.keys('id', 'hotel_id', 'check_in_date',
        'check_out_date', 'room_id', 'number_of_guests', 'payment_id',
        'customer_id')
        res.status.should.eql(201)
      })
  })

  it('should be able to filter the order and return 200', () => {
    return server
      .get('/v1/orders?hotel=true&name__eq=test hotel')
      .then(res => {
        res.body.length.should.eql(1)
        res.status.should.eql(200)
      })
  })

  it('should be able to filter the order, no match and return 200', () => {
    return server
      .get('/v1/orders?hotel=true&name__eq=test')
      .then(res => {
        res.body.length.should.eql(0)
        res.status.should.eql(200)
      })
  })

  it('should be able to search order and return 200', () => {
    return server
      .get('/v1/orders?hotel=true&name__like=test%')
      .then(res => {
        res.body.length.should.eql(1)
        res.status.should.eql(200)
      })
  })
})
