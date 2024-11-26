/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { HomeContainer } from "./styles";
import Graph from "../../components/Graph";
import { AuthContext } from "../../contexts/auth";
import { format, parseISO } from "date-fns";

import {
  deleteExpensesById,
  getExpensesByUserId,
  processExpenses,
  saveExpense,
} from "../../services/expenseService";
import { Box, Typography } from "@mui/material";
import SubmitButton from "../../components/Button";
import ExpenseModal from "../../components/ExpenseModal";
import ExpenseList from "../../components/ExpenseList";

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const [expenses, setExpenses] = useState<
    { id: string; name: string; value: string; date: string; type: string }[]
  >([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const userId = currentUser?._id;
    if (userId) {
      fetchAndSetExpenses(userId);
      console.log("userId:", userId);
    } else {
      console.error("UserId não encontrado no localStorage.");
    }
  }, [currentUser]);

  const fetchAndSetExpenses = async (userId: string) => {
    try {
      const data = await getExpensesByUserId(userId);
      console.log(data);

      const formattedExpenses = data.map((item: any) => ({
        id: item._id,
        name: item.expenseTitle,
        value: item.expenseValue,
        date: format(parseISO(item.expenseDate), "dd/MM/yyyy"),
        type: item.expenseType,
      }));

      setExpenses(formattedExpenses);

      const processedExpenses = processExpenses(data);

      const labels = processedExpenses.map((item) => item.name);
      const values = processedExpenses.map((item) => item.value);

      setChartData({
        labels,
        datasets: [
          {
            label: "Despesas Mensais",
            data: values,
            borderColor: "#15b858",
            backgroundColor: "#fff",
            tension: 0.4,
          },
        ],
      });
    } catch (error) {
      console.error("Erro ao buscar despesas:", error);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      await deleteExpensesById(id);
      console.log(`Despesa com ID ${id} deletada com sucesso.`);

      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );

      const userId = currentUser?._id;
      if (userId) {
        await fetchAndSetExpenses(userId);
      }
    } catch (error) {
      console.error("Erro ao deletar despesa:", error);
    }
  };

  const handleSaveExpense = async (expense: {
    name: string;
    value: string;
    date: string;
    type: string;
  }) => {
    try {
      const expenseData = {
        expenseTitle: expense.name,
        expenseValue: parseFloat(expense.value),
        expenseType: expense.type,
        expenseDate: expense.date,
      };

      await saveExpense(expenseData);

      console.log("Despesa salva com sucesso no backend.");

      const userId = currentUser?._id;
      if (userId) {
        await fetchAndSetExpenses(userId);
      }
    } catch (error) {
      console.error("Erro ao salvar despesa:", error);
    }
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  return (
    <HomeContainer>
      <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Typography
          variant="h4"
          color="#fff"
          sx={{ fontWeight: 400, marginBottom: "20px" }}
        >
          Visão Geral
        </Typography>

        <Graph
          data={chartData}
          options={chartOptions}
          title="Despesas Mensais"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "20px 0px",
          }}
        >
          <Typography variant="body1" color="#fff" fontWeight={400}>
            Lançamentos recentes
          </Typography>
          <SubmitButton text={"Adicionar"} onClick={handleOpen} addExpense />
        </Box>
        <ExpenseList
          expenses={expenses}
          onSaveExpense={handleSaveExpense}
          onDeleteExpense={handleDeleteExpense}
        />
      </Box>
      <ExpenseModal
        open={open}
        handleClose={handleClose}
        onSave={handleSaveExpense}
      />
    </HomeContainer>
  );
};

export default Home;
