const t = require('tcomb-validation');
const validate = t.validate;

module.exports = {
  validateOrderRequest
}

const orderRequest = t.struct({
  hotelId: t.String,
  hotelId: t.String,
  checkInDate: t.String,
  checkOutDate: t.String,
  name: t.String,
  email: t.String,
  phoneNumber: t.String,
  roomId: t.String,
  roomName: t.String,
  numberOfGuests: t.Number,
  totalAmount: t.Number
})

async function validateOrderRequest (ctx, next){
  const payload = ctx.request.body
  const result = validate(payload, orderRequest)
  const error = result.firstError()

  ctx.assert(result.isValid(), 400, error ? error.message : null)
  await next()
}
