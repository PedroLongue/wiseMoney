import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";

export interface SubmitButtonProps {
  text: string;
  onClick?: () => void;
  addExpense?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, onClick, addExpense }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      endIcon={addExpense ? <AddIcon /> : <SendIcon />}
      sx={{ background: "#15b858", width: "144px" }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default SubmitButton;
