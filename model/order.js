const { Model } = require('objection')

class Order extends Model {
  static get tableName () {
    return 'hotel_order'
  }
}

module.exports = Order
