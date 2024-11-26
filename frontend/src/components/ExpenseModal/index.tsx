import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import InputField from "../TextField";
import SubmitButton from "../Button";

interface ExpenseModalProps {
  open: boolean;
  handleClose: () => void;
  onSave: (expense: {
    name: string;
    value: string;
    date: string;
    type: string;
  }) => void;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({
  open,
  handleClose,
  onSave,
}) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseValue, setExpenseValue] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [expenseType, setExpenseType] = useState("credit");

  const handleSave = () => {
    onSave({
      name: expenseName,
      value: expenseValue,
      date: expenseDate,
      type: expenseType,
    });
    handleClose();
  };

  return (
    <Modal
      keepMounted
      open={open}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          bgcolor: "background.paper",
          background: "#101813",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-title" variant="h6" color="#fff">
          Cadastrar nova despesa
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            margin: "20px 0px",
          }}
        >
          <InputField
            id="expenseName"
            label="Título da despesa..."
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />
          <InputField
            id="expenseValue"
            label="Valor da despesa..."
            type="text"
            value={expenseValue}
            onChange={(e) => setExpenseValue(e.target.value)}
          />
          <RadioGroup
            row
            value={expenseType}
            onChange={(e) => setExpenseType(e.target.value)}
          >
            <FormControlLabel
              value="credit"
              control={<Radio />}
              label="Crédito"
              sx={{
                color: "#fff",
                "& .MuiRadio-root": {
                  color: "#fff",
                },
                "& .MuiRadio-root.Mui-checked": {
                  color: "#15b858",
                },
              }}
            />
            <FormControlLabel
              value="debit"
              control={<Radio />}
              label="Débito"
              sx={{
                color: "#fff",
                "& .MuiRadio-root": {
                  color: "#fff",
                },
                "& .MuiRadio-root.Mui-checked": {
                  color: "#15b858",
                },
              }}
            />
          </RadioGroup>
          <InputField
            id="expenseDate"
            label=""
            type="date"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
          />
        </Box>
        <SubmitButton text="Adicionar" onClick={handleSave} />
      </Box>
    </Modal>
  );
};

export default ExpenseModal;
