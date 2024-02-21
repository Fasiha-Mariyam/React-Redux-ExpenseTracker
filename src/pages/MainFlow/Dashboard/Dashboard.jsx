import TableCard from "../../../components/Card/TableCard";
import { Grid, Button, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DonutChart from "../../../components/Chart/DonutChart";
import { useState, useEffect } from "react";
import BalanceCard from "../../../components/Card/BalanceCard";
import { getSortedTransactions } from "../../../firebase/Transaction";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Loader = useSelector((state) => state.transactions.isLoading);
  const transactions = useSelector((state) => state.transactions.transaction);
  const firstThreeTransactions = transactions.slice(0,3);

  // total amount
  const totalAmount = transactions.reduce(
    (accumulator, currentTransaction) => {
      const transactionAmount = parseFloat(currentTransaction.data.amount);
      return accumulator + transactionAmount;
    },
    0
  );

  // total Income
  const totalIncome = transactions.reduce((accumulator, currentTransaction) => {
    if (currentTransaction.data.type === "Income") {
      const transactionAmount = parseFloat(currentTransaction.data.amount);
      return accumulator + transactionAmount;
    }
    return accumulator;
  }, 0);

  // total Expense
  const totalExpense = transactions.reduce(
    (accumulator, currentTransaction) => {
      if (currentTransaction.data.type === "Expense") {
        const transactionAmount = parseFloat(currentTransaction.data.amount);
        return accumulator + transactionAmount;
      }
      return accumulator;
    },
    0
  );

  const handleAddMoreClick = () => {
    navigate("/addTransaction");
  };

  const handleSeeMoreClick = () => {
    navigate("/allTransaction");
  };

  return (
    <>
      {Loader ? (
       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
       <CircularProgress />
     </div>
      ) : (
        <div style={{ padding: "0 20px", marginTop: "20px" }}>
          <Grid container justifyContent="space-between" spacing={2}>
            {/* First Grid item for the DonutChart */}
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={8}
              style={{ display: "flex", marginBottom: "20px" }}
            >
              <div style={{ flex: 1 }}>
                <DonutChart
                  ExpenseTotal={totalExpense}
                  IncomeTotal={totalIncome}
                />
              </div>
            </Grid>
            {/* Second Grid item for the "Add More" button */}
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "20px",
              }}
            >
              <div style={{ flex: 1, textAlign: "right" }}>
                <BalanceCard
                  Amount={totalAmount + " Pkr"}
                  ExpenseTotal={totalExpense}
                  IncomeTotal={totalIncome}
                />
              </div>
            </Grid>
          </Grid>
        </div>
      )}

      {/* recent transactions */}
      {!Loader && (
        <div
          style={{
            padding: "0 20px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Grid container justifyContent="space-between">
            <Typography variant="h4">Recent Transactions</Typography>
            <Button variant="contained" onClick={handleAddMoreClick}>
              Add More
            </Button>
          </Grid>
          <br />
          {firstThreeTransactions.length > 0 ? (
            <Grid container spacing={2} justifyContent="center">
              {firstThreeTransactions.map((transaction, index) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                  <TableCard transaction={transaction} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <p>No transactions available.</p>
          )}
          <Grid
            container
            justifyContent="space-between"
            style={{ marginTop: "20px" }}
          >
            <Grid item>
              <Button variant="contained" onClick={handleSeeMoreClick}>
                See More
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}
