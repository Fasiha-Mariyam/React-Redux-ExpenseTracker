import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { isValidName } from "../../utils";

export default function NameField({ value, onChange , label }) {

  const handleNameChange = (e) => {
    if (isValidName(e.target.value)) {
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
      name="name"
      label={label ? label : "Name"}
      type="name"
      fullWidth
      variant="standard"
      color="primary"
      value={value}
      onChange={handleNameChange}
    />
     </ThemeProvider>
  );
}
