import React from "react";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Paper } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

export default function DonutChart({ExpenseTotal, IncomeTotal}) {
  const data = [
    { id: 0, value: IncomeTotal, label: "Income" },
    { id: 1, value: ExpenseTotal , label: "Expense" },
  ];
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      width={isSmallScreen ? 320 : 400}
      height={200}
    />
  );
}
