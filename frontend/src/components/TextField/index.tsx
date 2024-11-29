import React from "react";
import TextField from "@mui/material/TextField";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean; // Propriedade para exibir o estado de erro
  helperText?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  error,
  helperText
}) => {
  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      type={type}
      value={value}
      onChange={onChange}
      error={error} 
      helperText={helperText}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#29382e", // Cor de fundo
          color: "#fff", // Cor do texto
        },
        "& .MuiOutlinedInput-root:hover": {
          backgroundColor: "#29382e", // Cor de fundo ao passar o mouse
        },
        "& .MuiOutlinedInput-root.Mui-focused": {
          backgroundColor: "#29382e", // Cor de fundo quando focado
          borderColor: "#000", // Cor da borda quando focado
        },
        "& .MuiInputLabel-root": {
          color: "#fff", // Cor do label
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#fff", // Cor do label quando focado
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: "transparent", // Remove a borda azul ao focar
          },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent", // Cor da borda ao passar o mouse
        },
        width: "100%",
      }}
    />
  );
};

export default InputField;
