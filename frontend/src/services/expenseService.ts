import { format, parseISO } from "date-fns";

export const fetchExpenses = async () => {
  const backendData = [
    {
      _id: "6744ec21f5930a0eed7db8f1",
      userId: "6742391739940df26db8b61f",
      expenseTitle: "Conta de luz",
      expenseValue: 130,
      expenseType: "Débito",
      expenseDate: "2024-10-31T00:00:00.000Z",
      __v: 0,
    },
    {
      _id: "6744ec21f5930a0eed7db8b61f",
      userId: "6742391739940df26db8b61f",
      expenseTitle: "Aluguel",
      expenseValue: 1000,
      expenseType: "Débito",
      expenseDate: "2024-10-01T00:00:00.000Z",
      __v: 0,
    },
    {
      _id: "6744ec21f5930a0eed7db8b61f",
      userId: "6742391739940df26db8b61f",
      expenseTitle: "Internet",
      expenseValue: 200,
      expenseType: "Débito",
      expenseDate: "2025-10-10T00:00:00.000Z",
      __v: 0,
    },
    {
      _id: "6744ec21f5930a0eed7db8b61f",
      userId: "6742391739940df26db8b61f",
      expenseTitle: "Internet",
      expenseValue: 500,
      expenseType: "Débito",
      expenseDate: "2025-09-10T00:00:00.000Z",
      __v: 0,
    },
    {
      _id: "6744ec21f5930a0eed7db8b61f",
      userId: "6742391739940df26db8b61f",
      expenseTitle: "Internet",
      expenseValue: 350,
      expenseType: "Débito",
      expenseDate: "2025-08-10T00:00:00.000Z",
      __v: 0,
    },
    {
      _id: "6744ec21f5930a0eed7db8b61f",
      userId: "6742391739940df26db8b61f",
      expenseTitle: "Internet",
      expenseValue: 1000,
      expenseType: "Débito",
      expenseDate: "2025-07-10T00:00:00.000Z",
      __v: 0,
    },
  ];

  return backendData;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const processExpenses = (expenses: any[]) => {
  const monthlyExpenses: { [key: string]: number } = {};

  expenses.forEach((expense) => {
    const date = parseISO(expense.expenseDate);
    const monthYear = format(date, "MMM yyyy");
    if (!monthlyExpenses[monthYear]) {
      monthlyExpenses[monthYear] = 0;
    }
    monthlyExpenses[monthYear] += expense.expenseValue;
  });

  return Object.entries(monthlyExpenses).map(([monthYear, value]) => ({
    name: monthYear,
    value,
  }));
};
