const TABLE_NAME = 'payment'

exports.up = function (knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.uuid('id').notNullable().primary()
    table.decimal('total_amount').notNullable()
    table.enu('status', ['Paid', 'Unpaid', 'Failed']).defaultTo('Unpaid')

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('deleted_at').nullable()
    table.timestamp('updated_at').nullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
}
