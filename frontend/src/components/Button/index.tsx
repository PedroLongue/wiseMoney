import React from "react";
import Button from "@mui/material/Button";

export interface SubmitButtonProps {
  text: string;
  onClick?: () => void; // Adiciona a prop opcional onClick
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, onClick }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      sx={{ background: "#15b858", width: "144px" }}
      onClick={onClick} // Passa o onClick opcional
    >
      {text}
    </Button>
  );
};

export default SubmitButton;
