import React from "react";
import TextField from "@mui/material/TextField";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, type, value, onChange }) => {
  return (
    <TextField
      id={id}
      label={label}
      variant="standard"
      type={type}
      value={value}
      onChange={onChange}
      sx={{
        "& .MuiInput-underline:after": {
          borderBottomColor: "#15b858",
        },
        "& .MuiFormLabel-root.Mui-focused": {
          color: "#15b858",
        },
      }}
    />
  );
};

export default InputField;
