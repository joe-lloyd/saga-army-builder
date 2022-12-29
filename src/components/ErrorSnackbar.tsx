import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { ErrorContext } from "../contexts/errorContext";

const ErrorSnackbar = () => {
  const { errorMessage, clearError } = React.useContext(ErrorContext);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    clearError();
  };

  return (
    <Snackbar
      key={errorMessage}
      open={!!errorMessage}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      sx={{ top: { xs: "64px", sm: "80px" } }}
    >
      <Alert severity="error">{errorMessage}</Alert>
    </Snackbar>
  );
};

export { ErrorSnackbar };
