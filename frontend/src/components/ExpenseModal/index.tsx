import React from "react";
import {
  Box,
  Typography,
  Modal,
  FormControlLabel,
  Radio,
  RadioGroup,
  IconButton,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import InputField from "../TextField";
import SubmitButton from "../Button";
import CloseIcon from "@mui/icons-material/Close";

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
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      value: "",
      date: "",
      type: "credit",
    },
  });

  const onSubmit = (data: {
    name: string;
    value: string;
    date: string;
    type: string;
  }) => {
    onSave(data);
    handleClose();
    reset();
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
          width: { xs: "90%", sm: "600px", md: "800px" }, 
          bgcolor: "background.paper",
          background: "#101813",
          border: "2px solid #000",
          boxShadow: 24,
          p: { xs: 2, sm: 4 }, 
          borderRadius: 2,
        }}
      >
        <Typography id="modal-title" variant="h6" color="#fff">
          Cadastrar nova despesa
        </Typography>

        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#fff",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: "10px", sm: "20px" }, 
            margin: "20px 0px",
          }}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "Título da despesa é obrigatório" }}
            render={({ field, fieldState }) => (
              <Box>
                <InputField
                  {...field}
                  id="expenseName"
                  label="Título da despesa..."
                  type="text"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              </Box>
            )}
          />

          <Controller
            name="value"
            control={control}
            rules={{
              required: "Valor da despesa é obrigatório",
              validate: (value) =>
                !isNaN(parseFloat(value)) || "Insira um número válido",
            }}
            render={({ field, fieldState }) => (
              <Box>
                <InputField
                  {...field}
                  id="expenseValue"
                  label="Valor da despesa..."
                  type="text"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              </Box>
            )}
          />

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <RadioGroup row {...field}>
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
            )}
          />

          <Controller
            name="date"
            control={control}
            rules={{ required: "A data é obrigatória" }}
            render={({ field, fieldState }) => (
              <Box>
                <InputField
                  {...field}
                  id="expenseDate"
                  label=""
                  type="date"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              </Box>
            )}
          />

          <SubmitButton text="Adicionar" />
        </Box>
      </Box>
    </Modal>
  );
};

export default ExpenseModal;
