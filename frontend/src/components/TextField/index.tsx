import React from "react";
import TextField from "@mui/material/TextField";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
}) => {
  return (
    <TextField
      id={id}
      label={label}
      // multiline
      variant="outlined"
      type={type}
      value={value}
      onChange={onChange}
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
      }}
    />
  );
};

export default InputField;
