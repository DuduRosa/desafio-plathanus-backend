const express = require("express");
const jwt = require("jsonwebtoken");
const SECRET_API = process.env.SECRET_API;

module.exports = {
  Assinar(id, usuario) {
    const token = jwt.sign({ id, usuario }, SECRET_API);
    return token;
  },
};
