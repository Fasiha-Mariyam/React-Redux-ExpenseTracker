import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


export default function TableCard({transaction}) {
  return (
    <Card
      sx={{
        minWidth: 275,
        background:
          "linear-gradient(to right, rgb(118 127 137), rgb(25 118 210))",
        color: "white",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14, color: "white" }}
          color="text.secondary"
          gutterBottom
        >
        {transaction.data.type}
        </Typography>
        <Typography variant="h5" component="div">
        {transaction.data.category}
        </Typography>
        <Typography sx={{ mb: 1.5, color: "white" }} color="text.secondary">
        {transaction.data.date}
        </Typography>
        <Typography sx={{ mb: 1.5, color: "white" }} color="text.secondary">
        {transaction.data.account}
        </Typography>
        <Typography variant="h6">Amount : {transaction.data.amount}</Typography>
      </CardContent>
    </Card>
  );
}
