// 'use strict'

// const Account = require('../model/account')

// module.exports = {
//   login,
//   validate,
//   list
// }

// async function login (ctx, next) {
//   const { email, password } = ctx.state

//   // get the account record from db
//   // to access db from terminal, docker-compose exec db psql api-database --user=username
//   // to list all DB, /l
//   //  to list all tables, /dt
//   // explain table,  \d+ account
//   const accounts = await Account.query()
//     .where('email', email)
//     .whereNull('deleted_at')
//     .limit(1)

//   ctx.assert(accounts.length === 1, 401, 'Unauthorized ')

//   // compare password
//   const account = accounts.shift()
//   const correct = await account.comparePassword(password)
//   ctx.assert(correct === true, 401, 'Unauthorized')

//   delete account.password

//   // set session and store it in redis
//   // the key will be the session id, value will be the account instance without password field
//   // session is stored in redis, to access it docker-compose exec redis redis-cli, KEYS*, GET <keyname>
//   // create a cookie on client's browser with session id, cookie name is the session key in envrc
//   // browser will pass the cookie to server in subsequent requests
//   ctx.session.account = account

//   ctx.status = 201
// }

// // valiate login payload
// // payload must consist of email and password
// async function validate (ctx, next) {
//   const payload = ctx.request.body
//   ctx.assert(payload && payload.email && payload.password, 401, 'Unauthorized')
//   ctx.state = payload
//   await next()
// }

// async function list (ctx, next) {

//   ctx.body = {
//     total: 2
//   }
//   ctx.status = 200
// }
