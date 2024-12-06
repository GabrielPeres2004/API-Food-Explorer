exports.up = knex => knex.schema.createTable("order", table => {
    table.increments("id");
    table.enum("paymentType", ["creditCard", "pix"], { useNative: true, enumName: "typesOfPayments" }).notNullable();
    table.enum("deliveryType", ["withdrawal", "delivery"], { useNative: true, enumName: "typesOfDelivery" }).notNullable();
    table.enum("orderCompleted", ['pending', 'completed', 'cancelled'], { useNative: true, enumName: "typesOfStatus" }).defaultTo('pending').notNullable();
    table.float("payment");
    table.integer("numberInstallments").default(null);
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("id").inTable("users").onDelete("CASCADE")
    table.timestamp('created_at').defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("order");