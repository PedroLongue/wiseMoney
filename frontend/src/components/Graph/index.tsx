import React from "react";
import { Box, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { ChartOptions, ChartData } from "chart.js";

interface GraphProps {
  data: ChartData<"line">;
  options?: ChartOptions<"line">;
  title: string;
}

const Graph: React.FC<GraphProps> = ({ data, options, title }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#121212",
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <Typography variant="h6" color="#fff" gutterBottom>
        {title}
      </Typography>
      <Line data={data} options={options} />
    </Box>
  );
};

export default Graph;
