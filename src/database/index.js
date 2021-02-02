const path = require("path");
const knexfile = require(path.join(__dirname, "../", "../" , "knexfile.js"));
const connection = require("knex")(knexfile.development);
module.exports = connection;
