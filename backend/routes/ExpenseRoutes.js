const express = require("express");
const router = express.Router();
const {
  expenseEntries,
  deleteExpense,
  getUserExpense,
} = require("../controllers/ExpenseController");
const authGuard = require("../middleware/authGuard");

/**
 * @swagger
 * /users/expenseEntries/getExpenses/{id}:
 *   get:
 *     summary: Obtém as despesas do usuário
 *     description: Endpoint para obter todas as despesas de um usuário autenticado, ordenadas pela data de criação.
 *     tags:
 *       - Despesas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário cujas despesas serão buscadas
 *     responses:
 *       200:
 *         description: Lista de despesas do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   expenseTitle:
 *                     type: string
 *                     example: "Pagamento conta de luz"
 *                   expenseValue:
 *                     type: number
 *                     example: 150.5
 *                   expenseType:
 *                     type: string
 *                     example: "Débito"
 *                   expenseDate:
 *                     type: string
 *                     format: date
 *                     example: "2024-10-30"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Nenhuma despesa encontrada para o usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Nenhuma despesa encontrada para este usuário."
 *       500:
 *         description: Erro ao buscar despesas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Erro ao buscar despesas"
 */
router.get("/expenseEntries/getExpenses/:id", authGuard, getUserExpense);

/**
 * @swagger
 * /users/expense:
 *   post:
 *     summary: Cadastra uma nova despesa
 *     description: Endpoint para cadastrar uma nova despesa para o usuário autenticado.
 *     tags:
 *       - Despesas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               expenseTitle:
 *                 type: string
 *                 example: "Pagamento conta de luz"
 *               expenseValue:
 *                 type: number
 *                 example: 150.5
 *               expenseType:
 *                 type: string
 *                 example: "Débito"
 *               expenseDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-30"
 *     responses:
 *       201:
 *         description: Despesa cadastrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Despesa cadastrada com sucesso!"
 *                 expense:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     expenseTitle:
 *                       type: string
 *                     expenseValue:
 *                       type: number
 *                     expenseType:
 *                       type: string
 *                     expenseDate:
 *                       type: string
 *       422:
 *         description: Erro de validação
 *       500:
 *         description: Erro ao cadastrar despesa
 */

router.post("/expenseEntries", authGuard, expenseEntries);

/**
 * @swagger
 * /users/expenseEntries/{id}:
 *   delete:
 *     summary: Exclui uma despesa
 *     description: Endpoint para excluir uma despesa do usuário autenticado pelo ID.
 *     tags:
 *       - Despesas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da despesa a ser excluída
 *     responses:
 *       200:
 *         description: Despesa excluída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Despesa excluída com sucesso!"
 *       404:
 *         description: Despesa não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Despesa não encontrada."
 *       500:
 *         description: Erro ao excluir despesa
 */

router.delete("/expenseEntries/:id", authGuard, deleteExpense);

module.exports = router;
