
exports.up = function(knex, Promise) {
  return knex.schema.createTable('customer', (table) => {
    table.uuid('id').notNullable().primary()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('phone_number').notNullable()

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('deleted_at').nullable()
    table.timestamp('updated_at').nullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('order')
};
