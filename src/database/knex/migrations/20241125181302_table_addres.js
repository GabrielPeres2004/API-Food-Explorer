exports.up = knex => knex.schema.createTable("address", table => {
    table.increments("id");
    table.text("city").notNullable();
    table.text("neighborhood").notNullable();
    table.text("street").notNullable();
    table.text("number").notNullable();
    table.text("complement").nullable();
    table.text("cep").nullable();


    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("id").inTable("users").onDelete("CASCADE")

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("address");
