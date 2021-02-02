const express = require("express");
const path = require("path");
const routes = express.Router();

const NoticiaController = require(path.join(
  __dirname,
  "controllers",
  "NoticiaController.js"
));

const AutorController = require(path.join(
  __dirname,
  "controllers",
  "AutorController.js"
));

routes.post("/login", AutorController.getUser);
routes.post("/cadastroautor", AutorController.postUser);
routes.get("/autores", AutorController.getAutores);

//Insere uma noticia
routes.post("/cadastrarnoticia", NoticiaController.postNoticia);
//Traz varias noticias
routes.get("/noticias", NoticiaController.getNoticias);
//Traz apenas a noticia escolhida pelo ID
routes.get("/visualizar/:id", NoticiaController.getNoticia);
//Editar Noticia
routes.put("/editar", NoticiaController.putNoticia);
//Apagar Noticia
routes.post("/excluir", NoticiaController.deleteNoticia);
//Traz as noticias para a home
routes.get("/noticiashome", NoticiaController.getNoticiasHome);
//traz noticia pelo id para a Home
routes.post("/noticias", NoticiaController.postNoticiaHome);

routes.post("/pesquisa", NoticiaController.postPesquisa)

module.exports = routes;
