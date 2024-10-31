const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Cadastro de Despesas",
      version: "1.0.0",
      description: "API para gerenciar despesas de usuários",
    },
    servers: [
      {
        url: "http://localhost:3000/",
        description: "Servidor de Desenvolvimento",
      },
    ],
  },
  apis: ["./routes/*.js"], // Caminho para os arquivos de rota onde as APIs estão documentadas
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
module.exports = swaggerDocs;
