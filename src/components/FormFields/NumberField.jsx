import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { isValidAmount } from "../../utils";

export default function NumberField({ value, onChange }) {

  const handleNumberChange = (e) => {
    if (isValidAmount(e.target.value)) {
      onChange(e.target.name, e.target.value);
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#000",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <TextField
      required
      margin="dense"
      id="name"
      name="amount"
      label="Amount"
      type="number"
      fullWidth
      variant="standard"
      color="primary"
      value={value}
      onChange={handleNumberChange}
    />
     </ThemeProvider>
  );
}
