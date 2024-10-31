//imports
require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger"); // Importa a configuração do Swagger

const port = process.env.PORT;

const app = express();

//Config JSON response
app.use(express.json());

// Rota da documentação do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//routes
const router = require("./routes/Router.js");

app.use(router);

//DB connextion
require("./config/db.js");

app.listen(port, () => {
    console.log(`rodando na porta ${port}`);
});


