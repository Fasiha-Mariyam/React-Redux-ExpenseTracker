  import React, { useState } from "react";
  import TextField from "@mui/material/TextField";
  import CssBaseline from "@mui/material/CssBaseline";
  import { createTheme, ThemeProvider } from "@mui/material/styles";


  export default function EmailField({ value, onChange }) {
    const handleEmailChange = (e) => {
        onChange(e.target.name, e.target.value);
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
          id="email"
          name="email"
          label="Email"
          type="email"
          fullWidth
          variant="standard"
          color="primary"
          value={value}
          onChange={handleEmailChange}
        />
      </ThemeProvider>
    );
  }
