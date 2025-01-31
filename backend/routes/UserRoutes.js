const express = require("express");
const router = express.Router();
const authGuard = require("../middleware/authGuard");

const {
  login,
  register,
  getCurrentUser,
} = require("../controllers/UsersController");

/**
 * @swagger
 * /users/currentUser:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     description: Endpoint para obter as informações do usuário atualmente autenticado.
 *     tags:
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                   example: "Pedro"
 *                 email:
 *                   type: string
 *                   example: "pedro@example.com"
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Usuário não encontrado."
 *       500:
 *         description: Erro no servidor
 */
router.get("/currentUser", authGuard, getCurrentUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Autentica um usuário
 *     description: Endpoint para realizar login e obter um token de autenticação.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "pedro@example.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 msg:
 *                   type: string
 *                   example: "Autenticação realizada com sucesso!"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       404:
 *         description: Usuário não encontrado
 *       422:
 *         description: Erro de validação
 *       500:
 *         description: Erro no servidor
 */
router.post("/login", login);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registra um novo usuário
 *     description: Endpoint para criar uma nova conta de usuário.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Pedro"
 *               email:
 *                 type: string
 *                 example: "pedro@example.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *               confirmPassword:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 msg:
 *                   type: string
 *                   example: "Usuário criado com sucesso!"
 *       422:
 *         description: Erro de validação
 *       500:
 *         description: Erro no servidor
 */
router.post("/register", register);

module.exports = router;
