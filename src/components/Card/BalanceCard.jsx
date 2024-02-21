import React from "react";
import { ArrowCircleUp as ArrowUpIcon, ArrowCircleDown as ArrowDownIcon } from '@mui/icons-material';
import { Paper, Typography, Box, Icon } from "@mui/material";

export default function BalanceCard({ Amount, IncomeTotal, ExpenseTotal }) {
  const createTotalWithArrow = (label, total, comparisonTotal) => (
    <Box style={{ marginBottom: "10px" }}>
      <Typography variant="body1">
        <span style={{ marginRight: "10px" }}>
          {label}: {total}
        </span>
        {total > comparisonTotal ? (
          <Icon color="success" style={{ fontSize: 30 }}>
            <ArrowUpIcon />
          </Icon>
        ) : (
          <Icon color="error" style={{ fontSize: 30 }}>
            <ArrowDownIcon />
          </Icon>
        )}
      </Typography>
    </Box>
  );

  return (
    <Paper
      elevation={3}
      style={{
        margin: "20px",
        padding: "20px",
        marginBottom: "10px",
        textAlign: "center",
        background:
          "linear-gradient(to right, rgb(2, 178, 175), rgb(46 150 255))",
        color: "white",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Total Balance <br />
        <Typography variant="h4">{Amount}</Typography>
      </Typography>
      {/* income expense values */}
      <Box display="flex" justifyContent="space-between">
      {createTotalWithArrow("Income", IncomeTotal, ExpenseTotal)}
      
      {/* Display expense total with arrow icon */}
      {createTotalWithArrow("Expense", ExpenseTotal, IncomeTotal)}
    </Box>
    </Paper>
  );
}
