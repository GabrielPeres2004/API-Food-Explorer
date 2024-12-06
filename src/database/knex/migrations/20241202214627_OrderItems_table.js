exports.up = knex => knex.schema.createTable("orderItems", table => {
    table.increments("id"); table.integer("user_id").unsigned().notNullable();

    table.foreign("user_id").references("id").inTable("users")

    table.integer("dish_id").unsigned().notNullable();
    table.foreign("dish_id").references("id").inTable("dish").onDelete("CASCADE")

    table.integer("order_id").unsigned().notNullable();
    table.foreign("order_id").references("id").inTable("order").onDelete("CASCADE")

    table.integer("count")
    table.timestamp('created_at').defaultTo(knex.fn.now());
})
exports.down = (knex) => knex.schema.dropTable("orderItems")