import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { SuccessContext } from "../contexts/successContext";

const SuccessSnackbar = () => {
  const { successMessage, clearSuccess } = React.useContext(SuccessContext);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    clearSuccess();
  };

  return (
    <Snackbar
      key={successMessage}
      open={!!successMessage}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
    >
      <Alert severity="success">{successMessage}</Alert>
    </Snackbar>
  );
};

export { SuccessSnackbar };
