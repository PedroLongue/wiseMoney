//imports
require("dotenv").config();
const express = require("express");

const port = process.env.PORT;

const app = express();

//Config JSON response
app.use(express.json());

//routes
const router = require("./routes/Router.js");

app.use(router);

//DB connextion
require("./config/db.js");

app.listen(port, () => {
    console.log(`rodando na porta ${port}`);
});


