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
import { Box, Typography, Tabs, Tab } from "@mui/material";
import SubmitButton from "../../components/Button";
import ExpenseModal from "../../components/ExpenseModal";
import ExpenseList from "../../components/ExpenseList";

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const [balanceData, setBalanceData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const [expenses, setExpenses] = useState<
    { id: string; name: string; value: string; date: string; type: string }[]
  >([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [tabValue, setTabValue] = useState(0);

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

      const debitExpenses = data.filter(
        (item: any) => item.expenseType === "debit"
      );
      const creditExpenses = data.filter(
        (item: any) => item.expenseType === "credit"
      );

      const formattedExpenses = data.map((item: any) => ({
        id: item._id,
        name: item.expenseTitle,
        value: item.expenseValue,
        date: format(parseISO(item.expenseDate), "dd/MM/yyyy"),
        type: item.expenseType,
      }));

      setExpenses(formattedExpenses);

      // Processar débitos para o gráfico de despesas
      const processedDebits = processExpenses(debitExpenses);
      const debitLabels = processedDebits.map((item) => item.name);
      const debitValues = processedDebits.map((item) => item.value);

      setChartData({
        labels: debitLabels,
        datasets: [
          {
            label: "Despesas Mensais",
            data: debitValues,
            borderColor: "#15b858",
            backgroundColor: "#fff",
            tension: 0.4,
          },
        ],
      });

      // Processar saldo para o gráfico de saldo mensal
      const monthlyBalances = processExpenses(
        creditExpenses.map((credit: any) => {
          const debit = debitExpenses.find(
            (debit: any) => debit.expenseDate === credit.expenseDate
          );
          return {
            ...credit,
            expenseValue: credit.expenseValue - (debit?.expenseValue || 0),
          };
        })
      );

      const balanceLabels = monthlyBalances.map((item) => item.name);
      const balanceValues = monthlyBalances.map((item) => item.value);

      setBalanceData({
        labels: balanceLabels,
        datasets: [
          {
            label: "Saldo Mensal",
            data: balanceValues,
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

        <Tabs
          value={tabValue}
          onChange={(event, newValue) => setTabValue(newValue)}
          textColor="inherit"
          indicatorColor="primary"
          sx={{
            marginBottom: "20px",
            "& .MuiTab-root": {
              color: "#fff", 
            },
            "& .Mui-selected": {
              color: "#15b858", 
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#15b858", 
            },
          }}
        >
          <Tab label="Despesas Mensais" />
          <Tab label="Saldo Mensal" />
        </Tabs>

        {tabValue === 0 && (
          <Graph
            data={chartData}
            options={chartOptions}
            title="Despesas Mensais"
          />
        )}
        {tabValue === 1 && (
          <Graph
            data={balanceData}
            options={chartOptions}
            title="Saldo Mensal"
          />
        )}

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
