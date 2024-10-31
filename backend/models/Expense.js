const mongoose = require("mongoose");

const Expense = mongoose.model("Expense", {
    userId: mongoose.Schema.Types.ObjectId,
    expenseTitle: String,
    expenseValue: Number,
    expenseType: String,
    expenseDate: Date
})

module.exports = Expense