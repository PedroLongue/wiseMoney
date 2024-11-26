import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";

type Expense = {
  id: string;
  name: string;
  value: string;
  date: string;
  type: string;
};

interface ExpenseListProps {
  expenses: Expense[];
  onSaveExpense: (expense: Expense) => void;
  onDeleteExpense: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  onDeleteExpense,
}) => {
  return (
    <>
      {expenses.map((expense) => (
        <>
          <Box
            key={expense.id}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{margin: "16px 0"}}
          >
            <Box display={"flex"} alignItems={"center"} gap={2}>
              <CurrencyExchangeIcon sx={{ color: "#fff", fontSize: "48px" }} />
              <Box>
                <Typography variant="h6" color="#fff">
                  {expense.name}
                </Typography>
                <Typography variant="body2" color="#fff" fontWeight={300}>
                  {expense.date.split("-").reverse().join("/")}
                </Typography>
              </Box>
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={2}>
              <Typography
                variant="h6"
                color={expense.type === "credit" ? "#15b858" : "#f14235"}
              >
                {expense.type === "credit" ? "+ " : "- "}R$ {expense.value}
              </Typography>
              <IconButton
                aria-label="delete"
                onClick={() => onDeleteExpense(expense.id)}
              >
                <DeleteIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Box>
          </Box>
          <Divider sx={{ backgroundColor: "#c2c2c2" }} />
        </>
      ))}
    </>
  );
};

export default ExpenseList;
