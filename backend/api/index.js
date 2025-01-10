//imports
require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("../swagger.js"); // Importa a configuração do Swagger
const cors = require("cors");

const port = process.env.PORT;

const app = express();

//Config JSON response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuração do CORS
app.use(
  cors({
    credentials: true, // Permite cookies e headers autenticados
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://wise-money-front-end-git-main-pedrolongues-projects.vercel.app/",
      "https://wise-money-blond.vercel.app",
    ], // Lista de origens permitidas
  })
);

// Permitir requisições preflight (método OPTIONS)
app.options("*", cors());

// Rota da documentação do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//routes
const router = require("../routes/Router.js");

app.use(router);

//DB connextion
require("../config/db.js");

app.listen(port, () => {
  console.log(`rodando na porta ${port}`);
});
