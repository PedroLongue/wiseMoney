import React, { useEffect, useState } from "react";
import { HomeContainer } from "./styles";
import Graph from "../../components/Graph";

import { fetchExpenses, processExpenses } from "../../services/expenseService";
import { Box, Typography } from "@mui/material";

const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const loadData = async () => {
      const expenses = await fetchExpenses();
      const processedData = processExpenses(expenses);
      const labels = processedData.map((item) => item.name);
      const values = processedData.map((item) => item.value);

      setChartData({
        labels,
        datasets: [
          {
            label: "Despesas Mensais",
            data: values,
            borderColor: "#15b858",
            backgroundColor: "#121212",
            tension: 0.4,
          },
        ],
      });
    };

    loadData();
  }, []);

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
      </Box>
    </HomeContainer>
  );
};

export default Home;
