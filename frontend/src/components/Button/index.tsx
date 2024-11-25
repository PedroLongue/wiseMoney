import React from "react";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';

export interface SubmitButtonProps {
  text: string;
  onClick?: () => void; 
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, onClick }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      endIcon={<SendIcon />}
      sx={{ background: "#15b858", width: "144px" }}
      onClick={onClick} 
    >
      {text}
    </Button>
  );
};

export default SubmitButton;
