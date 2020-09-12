
exports.up = function(knex, Promise) {
  return knex.schema.createTable('order', (table) => {
    table.uuid('id').notNullable().primary()
    table.uuid('hotel_id').notNullable()
    table.uuid('room_id').notNullable()
    table.uuid('customer_id').notNullable()
    // table.uuid('payment_id').notNullable()
    table.decimal('total_amount').notNullable()

    table.timestamp('check_in_date').notNullable()
    table.timestamp('check_out_date').notNullable()
    table.timestamp('updated_at').nullable()

    table.foreign('hotel_id').references('hotel.id')
    table.foreign('customer_id').references('customer.id')
    table.foreign('room_id').references('room.id')
    // table.foreign('payment_id').references('payment.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('order')
};
