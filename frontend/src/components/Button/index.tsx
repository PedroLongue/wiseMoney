import React from "react";
import Button from "@mui/material/Button";

export interface SubmitButtonProps {
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      sx={{ background: "#15b858", width: "144px" }}
    >
      {text}
    </Button>
  );
};

export default SubmitButton;
