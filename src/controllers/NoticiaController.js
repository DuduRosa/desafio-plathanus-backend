const path = require("path");
const connection = require(path.join(__dirname, "../", "database", "index.js"));

module.exports = {
  //Traz varias noticias
  async getNoticias(req, res) {
    const response = await connection("noticias").select("*");
    res.json(response);
  },

  async postPesquisa(req, res) {
    const response = await connection("noticias")
      .where("titulo", "like", `%${req.body.titulo}%`)
      .orWhere("tag", "like", `%${req.body.titulo}%`);
    if (response) {
      res.json(response);
    } else {
      res.json({ pesquisa: false });
    }
  },

  async getNoticiasHome(req, res) {
    const response = await connection("noticias").select(
      "id_noticia",
      "titulo",
      "texto_noticia",
      "autor",
      "tag",
      "created_at"
    );
    res.json(response);
  },

  async postNoticiaHome(req, res) {
    const { id } = req.body;

    const response = await connection("noticias")
      .where({
        id_noticia: id,
      })
      .select();

    res.json(response);
  },

  async deleteNoticia(req, res) {
    console.log(req.body.id);
    await connection("noticias").where("id_noticia", req.body.id).del();
    res.send(true);
  },

  async putNoticia(req, res) {
    try {
      //Pesquisando o nome do autor atraves do ID vindo do frontend pela  var autor

      const response = await connection("autor")
        .where({
          id_autor: req.body.autor,
        })
        .select("nome");

      //Inserindo a noticia no banco
      await connection("noticias")
        .where({ id_noticia: req.body.id_noticia })
        .update({
          titulo: req.body.titulo,
          texto_noticia: req.body.texto,
          autor: response[0].nome,
          tag: req.body.tag,
          imagem_capa: req.body.capa,
          e_id_autor: req.body.autor,
        });

      res.send("Noticia Cadastrada");
    } catch (error) {
      console.log(error);
      res.send("Erro na criação");
    }
  },

  //Traz apenas a noticia escolhida pelo ID
  async getNoticia(req, res) {
    const { id } = req.params;
    console.log(id);
    const response = await connection("noticias")
      .where({
        id_noticia: id,
      })
      .select("*");

    res.json(response);
  },

  //Insere uma noticia
  async postNoticia(req, res) {
    //Inserindo Usuario no BD
    try {
      //Pesquisando o nome do autor atraves do ID vindo do frontend pela  var autor
      const response = await connection("autor")
        .where({
          id_autor: req.body.autor,
        })
        .select("nome");

      //Inserindo a noticia no banco
      await connection("noticias").insert({
        titulo: req.body.titulo,
        texto_noticia: req.body.texto,
        autor: response[0].nome,
        tag: req.body.tag,
        imagem_capa: req.body.capa,
        e_id_autor: req.body.autor,
      });

      res.send("Noticia Cadastrada");
    } catch (error) {
      console.log(error);
      res.send("Erro na criação");
    }
  },
};
