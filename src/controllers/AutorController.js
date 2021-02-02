const path = require("path");
const connection = require(path.join(__dirname, "../", "database", "index.js"));
const bcrypt = require("bcrypt");

const Auth = require(path.join(__dirname, "../", "database", "Auth.js"));

module.exports = {
  async getAutores(req, res) {
    const response = await connection("autor").select("nome", "id_autor");
    res.json(response);
  },

  //Fazer verificação de login e retornar token
  async getUser(req, res) {
    //selecionando usuarios que sejam iguais ao inserido no formulario
    try {
      const response = await connection("autor")
        .where({
          usuario: req.body.usuario,
        })
        .select("*");

      //Criação de variavel auxiliar para senha do BD, para o ID e usuario ir junto ao payload do JWT
      let senhaBD = null;
      let userID = null;
      let username = req.body.usuario;

      //Retirando o json da resposta de dentro do Array
      response.forEach((response) => {
        senhaBD = response.senha;
        userID = response.id;
      });

      //Comparando a senha vinda do formulario e a senha do banco
      bcrypt.compare(req.body.senha, senhaBD, function (err, result) {
        //Chamando a função de Autenticação JWT passando o id para o payload
        if (result == true) {
          const token = Auth.Assinar(userID, username);
          res.send(token);
        } else {
          res.send(result);
        }
      });
    } catch (error) {
      res.send(error);
    }
  },

  async postUser(req, res) {
    //Gerando Saltos ou numeros aleatorios para embaralhamento com a senha
    var salt = bcrypt.genSaltSync(10);

    //Encriptando ou embaralhando a senha vindo do form com os numeros do salto
    const cryptPassword = bcrypt.hashSync(req.body.senha, salt, (error) => {
      console.log(error);
    });

    //Inserindo Usuario no BD
    try {
      await connection("autor").insert({
        nome: req.body.nome,
        usuario: req.body.usuario,
        senha: cryptPassword,
      });

      res.send("Conta Criada");
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
};
