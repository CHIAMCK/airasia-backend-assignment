'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')

const Payment = require('../model/payment')

chai.use(chaiHttp)
chai.should()

describe('#auth', () => {
  let server = null
  beforeEach(() => {
    const app = require('../')
    server = chai.request(app)
  })

  it('should be able to check status of payment and return 200', () => {
    return server
      .get('/v1/payments/5457b794-f585-11ea-adc1-0242ac120002')
      .then(res => {
        res.body.status.should.eql('Unpaid')
        res.status.should.eql(200)
      })
  })

  it('should be able to update a payment and return 200', () => {
    return server
      .post('/v1/payments/5457b794-f585-11ea-adc1-0242ac120002/checkout')
      .then(async res => {
        const payments = await Payment.query().where({
          id: '5457b794-f585-11ea-adc1-0242ac120002'
        })
        const payment = payments.shift()
        payment.status.should.eql('Paid')
        res.status.should.eql(200)
      })
  })
})
