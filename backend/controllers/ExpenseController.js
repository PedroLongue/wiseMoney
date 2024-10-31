const Expense = require("../models/Expense");

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

module.exports = { expenseEntries };
