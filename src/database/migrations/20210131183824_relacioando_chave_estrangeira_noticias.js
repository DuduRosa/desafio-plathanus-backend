exports.up = async function (knex) {
  await knex.schema.alterTable("noticias", function (table) {
    table.foreign("e_id_autor").references("id_autor").inTable("autor");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropForeign("e_id_autor");
};
