exports.up = knex => knex.schema.createTable("dish", table => {
    table.increments("id");
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");

    table.text("name").notNullable();
    table.text("description").notNullable();
    table.text("category").notNullable();
    table.decimal("price", 8, 2).notNullable();
    table.boolean("active").default(true);

    table.text("imageDish").default(null);

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("dish");
