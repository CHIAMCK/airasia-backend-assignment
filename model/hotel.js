const { Model } = require('objection')

class Hotel extends Model {
  static get tableName () {
    return 'hotel'
  }
}
module.exports = Hotel
