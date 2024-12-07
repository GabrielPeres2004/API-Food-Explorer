exports.up = knex => knex.schema.createTable("favoriteDishes", table => {
    table.increments("id");

    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");

    table.integer("dish_id").unsigned().notNullable();
    table.foreign("dish_id").references("id").inTable("dish").onDelete("CASCADE")

    table.timestamp('created_at').defaultTo(knex.fn.now());
})
exports.down = (knex) => knex.schema.dropTable("favoriteDishes")