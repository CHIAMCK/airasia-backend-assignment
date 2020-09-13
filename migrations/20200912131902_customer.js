const TABLE_NAME = 'customer'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.uuid('id').notNullable().primary()
    table.string('name').notNullable()
    table.string('email').notNullable().unique()
    table.string('phone_number').notNullable()

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('deleted_at').nullable()
    table.timestamp('updated_at').nullable()

    table.index('name')
    table.index('email')
    table.index('phone_number')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
