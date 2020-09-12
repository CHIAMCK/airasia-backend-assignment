const { Model } = require('objection')

class Customer extends Model {
  static get tableName () {
    return 'customer'
  }
}
module.exports = Customer
