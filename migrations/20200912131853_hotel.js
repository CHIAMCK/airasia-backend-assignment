const TABLE_NAME = 'hotel'

exports.up = function (knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.uuid('id').notNullable().primary()
    table.string('name').notNullable()

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('deleted_at').nullable()
    table.timestamp('updated_at').nullable()

    table.index('name')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
}
