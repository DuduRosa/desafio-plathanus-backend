exports.up = async function (knex) {
  await knex.schema.createTable("noticias", function (table) {
    table.increments("id_noticia");
    table.string("titulo").notNullable();
    table.text("texto_noticia").notNullable();
    table.string("autor").notNullable();
    table.string("tag").notNullable();
    table.text("imagem_capa");
    table.integer("e_id_autor");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("noticias");
};
