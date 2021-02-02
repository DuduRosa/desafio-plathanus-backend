const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv/config");
const Routes = require(path.join(__dirname, "routes.js"));

const app = express();

app.use(cors());
app.use(express.json());
app.use(Routes);

app.listen(3333);
