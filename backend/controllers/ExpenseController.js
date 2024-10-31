const Expense = require("../models/Expense");
const mongoose = require("mongoose");

const expenseEntries = async (req, res) => {
  const { expenseTitle, expenseValue, expenseType, expenseDate } = req.body;

  // Validations
  if (!expenseTitle)
    return res.status(422).json({ msg: "O título da despesa é obrigatório!" });
  if (!expenseValue)
    return res.status(422).json({ msg: "O valor da despesa é obrigatório!" });
  if (!expenseType)
    return res.status(422).json({ msg: "O tipo é obrigatório!" });
  if (!expenseDate)
    return res.status(422).json({ msg: "A data é obrigatória!" });

  const expense = new Expense({
    userId: req.user._id,
    expenseTitle,
    expenseValue,
    expenseType,
    expenseDate,
  });

  try {
    await expense.save();
    res.status(201).json({ msg: "Despesa cadastrada com sucesso!", expense });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao cadastrar despesa", error });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;
  try {
    const expense = await Expense.findById(new mongoose.Types.ObjectId(id));

    if (!expense)
      return res.status(404).json({ msg: "Despesa não encontrada!" });

    //check if expense belongs to user
    if (!expense.userId.equals(reqUser._id)) {
      return res.status(422).json({
        msg: "Ocorreu um erro, por favor tente novamente mais tarde.",
      });
    }

    await Expense.findByIdAndDelete(expense._id);

    res
      .status(200)
      .json({ id: expense._id, message: "Despesa excluída com sucesso." });
  } catch (error) {
    console.log(error)
    return res.status(404).json({ msg: "Despesa não encontrada!" });
  }
};

module.exports = { expenseEntries, deleteExpense };
