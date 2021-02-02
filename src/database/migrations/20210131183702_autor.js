exports.up = async function (knex) {
  await knex.schema.createTable("autor", function (table) {
    table.increments("id_autor");
    table.string("nome").notNullable();
    table.string("usuario").notNullable().unique();
    table.string("senha").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("autor");
};
