import {
  Box,
  IconButton,
  Typography,
  Divider,
  Pagination,
} from "@mui/material";
import React, { useState } from "react";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedExpenses = expenses.slice(startIndex, endIndex);

  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  return (
    <Box>
      {paginatedExpenses.map((expense) => (
        <React.Fragment key={expense.id}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ margin: "16px 0" }}
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
        </React.Fragment>
      ))}
      {expenses.length > itemsPerPage && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_event, page) => setCurrentPage(page)}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#fff", // Cor padrão dos itens de paginação
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                color: "#fff", // Cor do texto no item selecionado
                backgroundColor: "#15b858", // Cor de fundo do item selecionado
              },
              "& .MuiPaginationItem-root:hover": {
                backgroundColor: "#15b858", // Cor de fundo ao passar o mouse
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ExpenseList;
