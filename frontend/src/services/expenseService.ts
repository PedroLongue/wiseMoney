import { format, parseISO } from "date-fns";

import api from "./api";

interface Expense {
  expenseTitle: string;
  expenseValue: number;
  expenseType: string;
  expenseDate: string;
}

export const saveExpense = async (expense: Expense): Promise<void> => {
  try {
    const response = await api.post("/expenseEntries", expense);
    console.log("Despesa cadastrada com sucesso:", response.data);
  } catch (error) {
    console.error("Erro ao cadastrar despesa:", error);
    throw error;
  }
};

export const getExpensesByUserId = async (userId: string) => {
  try {
    const response = await api.get(`/expenseEntries/getExpenses/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar despesas:", error);
    throw error;
  }
};

export const deleteExpensesById = async (expenseId: string) => {
  try {
    const response = await api.delete(`/expenseEntries/${expenseId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar despesas:", error);
    throw error;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const processExpenses = (expenses: any[]) => {
  const monthlyExpenses: { [key: string]: { total: number; rawDate: Date } } =
    {};

  expenses.forEach((expense) => {
    const date = parseISO(expense.expenseDate);
    const monthYear = format(date, "MMM yyyy");

    if (!monthlyExpenses[monthYear]) {
      monthlyExpenses[monthYear] = {
        total: 0,
        rawDate: new Date(date.getFullYear(), date.getMonth(), 1),
      };
    }

    monthlyExpenses[monthYear].total += expense.expenseValue;
  });

  // Converte o objeto para um array e ordena pelas datas reais (rawDate)
  const sortedExpenses = Object.entries(monthlyExpenses)
    .map(([monthYear, { total, rawDate }]) => ({
      name: monthYear,
      value: total,
      rawDate,
    }))
    .sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime()); // Ordena cronologicamente

  return sortedExpenses.map(({ name, value }) => ({ name, value })); // Remove `rawDate` no retorno
};
